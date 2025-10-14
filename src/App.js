import React, { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import logo from "./logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import LogoLoop from "./logoloop";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./App.css";
//import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";


export default function App() {

  const images = [
    { src: "/images/im1.jpeg", alt: "Pipe bending machine" },
    { src: "/images/im2.jpeg", alt: "Pipe bending machine" },
    { src: "/images/im3.jpeg", alt: "Pipe bending machine" },
    { src: "/images/im4.jpeg", alt: "Pipe bending machine" },
    { src: "/images/im5.jpeg", alt: "Pipe bending machine" },
    { src: "/images/im6.jpeg", alt: "Pipe bending machine" },
    { src: "/images/im7.jpeg", alt: "Pipe bending machine" },
  ];

  useEffect(() => {
    ScrollReveal().reveal(
      ".stat-item, .about-section, .mission-section, .why-choose, .services-section,.proprietor-section, .address-section",
      {
        duration: 1000,
        distance: "50px",
        easing: "ease-in-out",
        origin: "bottom",
        reset: true,
        interval: 100,
      }
    );
  }, []);

  const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(255, 255, 255, 0.25)",
  }) => {
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      divRef.current.style.setProperty("--mouse-x", `${x}px`);
      divRef.current.style.setProperty("--mouse-y", `${y}px`);
      divRef.current.style.setProperty("--spotlight-color", spotlightColor);
    };

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        className={`card-spotlight ${className}`}
      >
        {children}
      </div>
    );
  };
/*
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    renderMode: "performance",
    slides: { perView: 1.2, spacing: 30 },
    centered: true,
  });*/

  useEffect(() => {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);



  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Adityaa Auto Products" />
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#mission">Mission</a>
          <a href="#services">Services</a>
        </div>
        <a href="tel:+919876543210" className="contact-button"> 📞 Contact Us </a>
      </nav>

      {/* Hero Slideshow */}
      <div className="slideshow-container" id="home">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={1000}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className="slide-image-wrapper">
              <img src="/images/bg2.png" alt="Slide 1" className="slide-image" />
              <div className="slide-shine"></div>
            </div>
            <div className="slide-content">
              <h1>Precision Pipe Bending Solutions</h1>
              <h4>
                Serving Automotive & Manufacturing Industries with Excellence
              </h4>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-image-wrapper">
              <img src="/images/bg1.png" alt="Slide 2" className="slide-image" />
              <div className="slide-shine"></div>
            </div>
            <div className="slide-content">
              <h1>Precision Pipe Bending Solutions</h1>
              <h4>
                Serving Automotive & Manufacturing Industries with Excellence
              </h4>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <SpotlightCard className="stat-item">
          <h2>CNC</h2>
          <p>Precision Machines</p>
        </SpotlightCard>
        <SpotlightCard className="stat-item">
          <h2>Custom</h2>
          <p>Solutions</p>
        </SpotlightCard>
        <SpotlightCard className="stat-item">
          <h2>Fast</h2>
          <p>Turnaround</p>
        </SpotlightCard>
        <SpotlightCard className="stat-item">
          <h2>100%</h2>
          <p>Quality Assured</p>
        </SpotlightCard>
      </div>

      {/* About Us */}
      <section className="about-section" id="about">
        <div className="about-image">
          <img src="/about-image.jpg" alt="About Adityaa Auto Products" />
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            At ADITYAA AUTO PRODUCTS, we are a trusted provider of high-quality
            pipe bending solutions for the automotive and manufacturing sectors.
            With over 15 years of expertise and skilled professionals, we
            deliver precision-engineered results that meet the most stringent
            specifications.
          </p>
          <p>
            Our services include CNC and manual pipe bending, fabrication, and
            custom solutions. By blending technology with craftsmanship, we
            ensure products that meet the highest standards of quality and
            reliability.
          </p>
          <p>
            Recognized for precision, quick turnaround, and customer-first
            approach, ADITYAA AUTO PRODUCTS is your reliable partner for
            excellence and innovation.
          </p>
        </div>
      </section>

      <div className="blank-container"></div>

      {/* Logo Loop */}
      <LogoLoop
        logos={images}
        speed={100}
        direction="left"
        logoHeight={140}
        gap={20}
        fadeOut={true}
        fadeOutColor="#fff"
        scaleOnHover={true}
        ariaLabel="Product images"
      />

      {/* Mission */}
      <section id="mission" className="mission-section">
        <div className="mission-content">
          <h2 className="mission-title">🌟 Our Mission</h2>
          <p className="mission-intro">
            To revolutionize pipe bending with cutting-edge technology,
            uncompromising quality, and customer-driven innovation.
          </p>

          <div className="mission-grid">
            <SpotlightCard className="mission-card">
              <span>🛡️</span>
              <h4>Quality Assured</h4>
              <p>Every product meets international standards.</p>
            </SpotlightCard>
            <SpotlightCard className="mission-card">
              <span>⚡</span>
              <h4>Fast Turnaround</h4>
              <p>On-time delivery without compromise.</p>
            </SpotlightCard>
            <SpotlightCard className="mission-card">
              <span>🎯</span>
              <h4>Expert Solutions</h4>
              <p>Tailored to meet diverse industry needs.</p>
            </SpotlightCard>
            <SpotlightCard className="mission-card">
              <span>👨‍🔧</span>
              <h4>Skilled Team</h4>
              <p>Driven by passion, powered by expertise.</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="choose" className="why-choose">
        <h3>Why Choose Us?</h3>
        <div className="choose-grid">
          <SpotlightCard className="choose-card">
            <p>✨ Unparalleled quality and precision</p>
          </SpotlightCard>
          <SpotlightCard className="choose-card">
            <p>⚡ Fast turnaround times and competitive pricing</p>
          </SpotlightCard>
          <SpotlightCard className="choose-card">
            <p>👨‍🔧 Experienced team with proven track record</p>
          </SpotlightCard>
          <SpotlightCard className="choose-card">
            <p>🛡️ Commitment to safety and customer satisfaction</p>
          </SpotlightCard>
        </div>
      </section>
{/*Services Section */}
<section className="services-section" id="services">
  <h2>Our Services</h2>
  <div className="services-container">

    {/*Card 1 */}
    <div className="service-card">
      <div className="card-inner">
        <div className="card-front">
          <h3>CNC Pipe Bending</h3>
        </div>
        <div className="card-back">
          <p>
            Precision pipe bending using state-of-the-art CNC machines for accurate and consistent results.
          </p>
        </div>
      </div>
    </div>

    {/*Card 2 */}
    <div className="service-card">
      <div className="card-inner">
        <div className="card-front">
          <h3>Manual Bending</h3>
        </div>
        <div className="card-back">
          <p>
            Expert craftsmanship in manual bending, providing flexibility for unique and custom requirements.
          </p>
        </div>
      </div>
    </div>

    {/*Card 3 */}
    <div className="service-card">
      <div className="card-inner">
        <div className="card-front">
          <h3>Custom Solutions</h3>
        </div>
        <div className="card-back">
          <p>
            Tailored bending and fabrication services designed to meet your exact industrial needs.
          </p>
        </div>
      </div>
    </div>

  </div>
</section>


{/* Address Section */}
<section className="address-section" id="contact">
  <h2>📍 Our Locations</h2>

  <div className="address-cards-container">

    {/* Factory Address Card */}
    <div className="address-card">
      <iframe
        title="Factory Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.576849369259!2d77.816!3d12.725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae7126c98f7d13%3A0xfda118a26edbbd31!2sZuzuvadi%2C%20Hosur%20635126!5e0!3m2!1sen!2sin!4v1693920400000!5m2!1sen!2sin"
        width="100%"
        height="250"
        style={{ border: "0", borderRadius: "12px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="address-text">
        <h3>🏭 Factory Address</h3>
        <p>Ground floor, plot no 6</p>
        <p>Thulasiamman Street</p>
        <p>Kamaraj Nagar, Zuzuvadi</p>
        <p>Hosur – 635126</p>
      </div>
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=Ground+floor,+plot+no+6,+Thulasiamman+Street,+Kamaraj+Nagar,+Zuzuvadi,+Hosur+635126"
        target="_blank"
        rel="noopener noreferrer"
        className="directions-btn"
      >
        🗺️ Get Directions
      </a>
    </div>

    {/* Office Address Card */}
    <div className="address-card">
      <iframe
        title="Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.576849369259!2d77.832!3d12.735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae7100cf1c1b2b%3A0x6b7a5b4b0d6c2e2f!2sAlasanatham+Rd,+Hosur,+Tamil+Nadu+635109!5e0!3m2!1sen!2sin!4v1693920500000!5m2!1sen!2sin"
        width="100%"
        height="250"
        style={{ border: "0", borderRadius: "12px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="address-text">
        <h3>🏢 Office Address</h3>
        <p>No.65, Vaagai Homes</p>
        <p>Alasanatham Road</p>
        <p>Near Vasthusala</p>
        <p>Hosur – 635109</p>
      </div>
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=No.65,+Vaagai+Homes,+Alasanatham+Road,+Near+Vasthusala,+Hosur+635109"
        target="_blank"
        rel="noopener noreferrer"
        className="directions-btn"
      >
        🗺️ Get Directions
      </a>
    </div>

  </div>
</section>
{/* Proprietor Section */}
<section className="proprietor-section">
  <h2>👤 Guided By Expertise</h2>
  <div className="proprietor-card">
    <div className="proprietor-image">
      <img src="/images/proprietor.jpeg" alt="Proprietor" />
    </div>
    <div className="proprietor-details">
      <h3>Mr. Saravanakumar</h3>
      <p>Founder & Proprietor, Adityaa Auto Products</p>
      <p>📞 +91 98765 43210</p>
      <p>✉️ info@adityaaauto.com</p>
      <a href="tel:+919876543210" className="proprietor-btn">Call Now</a>
      <a href="mailto:info@adityaaauto.com" className="proprietor-btn">Email</a>
    </div>
  </div>
</section>

<footer className="footer-section">
  <div className="footer-container">
    <div className="footer-about">
      <h3>Adityaa Auto Products</h3>
      <p>
        Delivering precision and reliability through high-quality
        manufacturing and engineering solutions since 1995.
      </p>
    </div>

    <div className="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>

    <div className="footer-contact">
      <h4>Contact</h4>
      <p><strong>Address:</strong> Ground floor, plot no 6,Thulasiamman Street,Kamaraj Nagar, Zuzuvadi,Hosur – 635126</p>
      <p><strong>Email:</strong> info@adityaaauto.com</p>
      <p><strong>Phone:</strong> +91 98765 43210</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} Adityaa Auto Products. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
}
