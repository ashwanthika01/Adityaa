import React, {
  useCallback, useEffect, useMemo, useRef, useState, memo,
} from "react";
import "./logoloop.css";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value) =>
  typeof value === "number" ? `${value}px` : (value ?? undefined);

const useResizeObserver = (callback, elements, deps) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const onWinResize = () => callback();
      window.addEventListener("resize", onWinResize);
      callback();
      return () => window.removeEventListener("resize", onWinResize);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const ro = new ResizeObserver(callback);
      ro.observe(ref.current);
      return ro;
    });
    callback();
    return () => observers.forEach((o) => o?.disconnect());
  }, deps);
};

const useImageLoader = (seqRef, onLoad, deps) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remaining = images.length;
    const done = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };
    images.forEach((img) => {
      if (img.complete) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      });
    };
  }, deps);
};

const useAnimationLoop = (
  trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover
) => {
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }

    const animate = (ts) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;
      const k = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * k;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * dt;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 120,
  gap = 24,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = true,
  ariaLabel = "Partner images",
  className,
  style,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const [modal, setModal] = useState(null);
  const openModal = useCallback((item) => setModal(item), []);
  const closeModal = useCallback(() => setModal(null), []);

  const targetVelocity = useMemo(() => {
    const dir = direction === "left" ? 1 : -1;
    return Math.abs(speed) * dir;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerW = containerRef.current?.clientWidth ?? 0;
    const seqW = seqRef.current?.getBoundingClientRect?.().width ?? 0;
    if (seqW > 0) {
      const rounded = Math.ceil(seqW);
      setSeqWidth(rounded);
      const needed =
        Math.ceil(containerW / rounded) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, needed));
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

  const cssVars = useMemo(
    () => ({
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logoHeight": `${logoHeight}px`,
      ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
    }),
    [gap, logoHeight, fadeOutColor]
  );

  const rootClassName = useMemo(
    () =>
      [
        "logoloop",
        fadeOut && "logoloop--fade",
        scaleOnHover && "logoloop--scale-hover",
        className,
      ].filter(Boolean).join(" "),
    [fadeOut, scaleOnHover, className]
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsHovered(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsHovered(false);
  }, [pauseOnHover]);

  const renderItem = useCallback((item, key) => (
    <li className="logoloop__item" key={key}>
      <img
        src={item.src}
        alt={item.alt ?? ""}
        loading="lazy"
        decoding="async"
        draggable={false}
        onClick={() => openModal(item)}
      />
    </li>
  ), [openModal]);

  const lists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIdx) => (
        <ul
          className="logoloop__list"
          key={`copy-${copyIdx}`}
          aria-hidden={copyIdx > 0}
          ref={copyIdx === 0 ? seqRef : undefined}
        >
          {logos.map((item, i) => renderItem(item, `${copyIdx}-${i}`))}
        </ul>
      )),
    [copyCount, logos, renderItem]
  );

  const containerStyle = useMemo(
    () => ({ width: toCssLength(width) ?? "100%", ...cssVars, ...style }),
    [width, cssVars, style]
  );

  return (
    <>
      <div
        ref={containerRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="logoloop__track" ref={trackRef}>
          {lists}
        </div>

        {fadeOut && (
          <>
            <div className="logoloop__fade logoloop__fade--left" aria-hidden />
            <div className="logoloop__fade logoloop__fade--right" aria-hidden />
          </>
        )}
      </div>

      {modal && (
        <div className="image-modal" onClick={closeModal}>
          <img src={modal.src} alt={modal.alt ?? ""} />
        </div>
      )}
    </>
  );
});

export default LogoLoop;
