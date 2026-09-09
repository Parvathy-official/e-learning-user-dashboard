// =========================================================
//  Navbar Component — Flair Academy
//  Clean, minimal header: Logo + "GET INSTANT ACCESS" CTA
// =========================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('pricing');
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav
      className={[styles.navbar, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={[styles.inner, 'container'].join(' ')}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Flair Academy home">
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#030708" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className={styles.brandText}>
            <span className={styles.logoText}>
              Flair <span className={styles.logoAccent}>Academy</span>
            </span>
            <span className={styles.logoSubtext}>Performance & AI Masterclass</span>
          </div>
        </Link>

        {/* Action Button: Get Instant Access */}
        <div className={styles.actions}>
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className={styles.staticCtaBtn}
            id="nav-instant-access-btn"
          >
            <span className={styles.ctaPulse} />
            <span className={styles.ctaText}>GET INSTANT ACCESS</span>
            <span className={styles.ctaPrice}>₹499</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

