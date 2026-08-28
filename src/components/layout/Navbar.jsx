// =========================================================
//  Navbar Component — Simple Paid Online Course Platform
// =========================================================

import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';
import Button from '../common/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={[styles.navbar, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')} role="navigation" aria-label="Main navigation">
      <div className={[styles.inner, 'container'].join(' ')}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="LearnFlow home">
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#030708" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <span className={styles.logoText}>LearnFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <NavLink to="/" end className={({ isActive }) => [styles.navLink, isActive ? styles.active : ''].join(' ')}>
            Courses
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/my-learning" className={({ isActive }) => [styles.navLink, isActive ? styles.active : ''].join(' ')}>
                My Learning
              </NavLink>
              <NavLink to="/purchase-history" className={({ isActive }) => [styles.navLink, isActive ? styles.active : ''].join(' ')}>
                Purchase History
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop Auth Actions */}
        <div className={styles.actions}>
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <button
                className={styles.avatarBtn}
                onClick={() => setDropdownOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="User menu"
              >
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className={styles.avatar} />
                ) : (
                  <div className={styles.avatarFallback}>{getInitials(currentUser?.name)}</div>
                )}
                <span className={styles.userName}>{currentUser?.name?.split(' ')[0]}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  <div className={styles.dropdownOverlay} onClick={() => setDropdownOpen(false)} />
                  <div className={styles.dropdown} role="menu">
                    <div className={styles.dropdownHeader}>
                      <p className={styles.dropdownName}>{currentUser?.name}</p>
                      <p className={styles.dropdownEmail}>{currentUser?.email}</p>
                    </div>
                    <div className={styles.dropdownDivider} />
                    <Link to="/my-learning" className={styles.dropdownItem} role="menuitem" onClick={() => setDropdownOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
                      My Learning
                    </Link>
                    <Link to="/purchase-history" className={styles.dropdownItem} role="menuitem" onClick={() => setDropdownOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                      Purchase History
                    </Link>
                    <Link to="/profile" className={styles.dropdownItem} role="menuitem" onClick={() => setDropdownOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      Profile Settings
                    </Link>
                    <div className={styles.dropdownDivider} />
                    <button className={[styles.dropdownItem, styles.logoutItem].join(' ')} role="menuitem" onClick={handleLogout}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign up</Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className={[styles.hamburgerLine, menuOpen ? styles.open1 : ''].join(' ')} />
            <span className={[styles.hamburgerLine, menuOpen ? styles.open2 : ''].join(' ')} />
            <span className={[styles.hamburgerLine, menuOpen ? styles.open3 : ''].join(' ')} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Mobile navigation">
          <NavLink to="/" end className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Courses
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/my-learning" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                My Learning
              </NavLink>
              <NavLink to="/purchase-history" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                Purchase History
              </NavLink>
              <NavLink to="/profile" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                Profile
              </NavLink>
              <button className={styles.mobileLogout} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/signup" className={[styles.mobileLink, styles.mobilePrimary].join(' ')} onClick={() => setMenuOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
