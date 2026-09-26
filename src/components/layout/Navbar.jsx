import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, isAuthenticated } = useAuth();
  const { isEnrolled } = useCourseContext();

  const userHasAccess = isAuthenticated || isEnrolled('1');

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

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link
            to="/"
            className={[styles.navLink, location.pathname === '/' ? styles.navLinkActive : ''].join(' ')}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={[styles.navLink, location.pathname.startsWith('/courses') ? styles.navLinkActive : ''].join(' ')}
            id="nav-all-courses-link"
          >
            All Courses
          </Link>
          <a
            href="/#curriculum"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                const el = document.getElementById('curriculum') || document.getElementById('modules');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={styles.navLink}
          >
            Curriculum
          </a>
          <Link
            to="/my-learning"
            className={[styles.navLink, location.pathname.startsWith('/my-learning') ? styles.navLinkActive : ''].join(' ')}
          >
            My Learning
          </Link>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link to="/my-learning" className={styles.loginLink} id="nav-my-learning-link">
            <span>{currentUser?.name ? `👤 ${currentUser.name.split(' ')[0]}` : 'Student Access'}</span>
          </Link>

          {userHasAccess ? (
            <Link
              to="/course/1/learn"
              className={styles.resumeCtaBtn}
              id="nav-resume-learning-btn"
            >
              <span className={styles.playIcon}>▶</span>
              <span>Resume Masterclass</span>
            </Link>
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
}


