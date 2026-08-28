// =========================================================
//  Home Page — Performance Marketing Academy
// =========================================================

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import CourseCard from '../../components/course/CourseCard';
import Button from '../../components/common/Button';
import { CourseCardSkeleton } from '../../components/common/LoadingSkeleton';
import styles from './Home.module.css';

const PILLARS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Unit Economics & Margin Math',
    desc: 'Calculate true Break-Even ROAS, MER, CAC, and LTV. Never scale an ad campaign into negative cash flow.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: 'Creative Engine & UGC Playbooks',
    desc: 'Master the 3-second hook formulas, UGC scripting templates, and creative iteration sandboxes that cut CAC in half.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Meta 2.0 & Google PMax Scaling',
    desc: 'Consolidated account structures, CBO/ASC scaling protocols, and high-intent Google search harvesting.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
    title: 'Server-Side CAPI & Attribution',
    desc: 'Recover lost signal post-iOS 14.5 with server-side Meta CAPI, GA4 Measurement Protocol, and TripleWhale multi-touch modeling.',
  },
];

const STATS = [
  { value: '$45M+', label: 'Ad Spend Managed & Scaled' },
  { value: '4.8x', label: 'Average Student ROAS' },
  { value: '10,000+', label: 'Marketers & Founders Trained' },
  { value: '99.4%', label: 'Positive Outcome Rate' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { courses, coursesLoading, fetchCourses } = useCourseContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className={styles.page}>

      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={['container', styles.heroInner].join(' ')}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4', display: 'inline-block', boxShadow: '0 0 8px #06B6D4' }} />
              Performance Marketing & Paid Media Blueprint
            </span>
            <h1 className={styles.heroHeadline}>
              Scale Meta & Google Ads With <br />
              <span className={styles.heroAccent}>Predictable High ROAS</span>
            </h1>
            <p className={styles.heroSub}>
              Stop burning ad budget on outdated tactics. Master full-funnel media buying, algorithmic bidding, viral UGC creative engines, and server-side tracking engineered to scale from $500/day to $10,000+/day profitably.
            </p>
            <div className={styles.heroCtas}>
              <Button variant="primary" size="lg" onClick={() => navigate('/courses')}>
                Explore Flagship Programs →
              </Button>
              {isAuthenticated ? (
                <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <Button variant="outline" size="lg" onClick={() => navigate('/signup')}>
                  Join Masterclass Cohort
                </Button>
              )}
            </div>
          </div>

          {/* Hero Live Performance Dashboard Mockup */}
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6, 182, 212, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Meta CBO Engine</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700, background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: 9999 }}>Active Scale</span>
              </div>
              <div className={styles.heroCardBody}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div style={{ background: '#080D12', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Ad Spend</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: 2 }}>$48,250</div>
                  </div>
                  <div style={{ background: '#080D12', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6,182,212,0.25)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600 }}>Blended ROAS</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginTop: 2 }}>4.85x</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Scaling Progress</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>$10k/day Target Reached</span>
                </div>
                <div className={styles.heroProgressTrack} style={{ margin: '0 0 16px' }}>
                  <div className={styles.heroProgressFill} style={{ width: '88%' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Revenue Generated</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10B981' }}>+$234,012</span>
                </div>
              </div>
            </div>

            <div className={styles.heroBubble1}>
              <span>📈 4.85x Scaled ROAS</span>
            </div>
            <div className={styles.heroBubble2}>
              <span>⭐ 4.98/5 (1,420 Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature Programs Spotlight ── */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <span className="label">Signature Masterclasses</span>
            <h2>The 2 Flagship Performance Marketing Programs</h2>
            <p>Direct, zero-fluff frameworks engineered to transform media buyers and brands into 8-figure growth powerhouses.</p>
          </div>

          {coursesLoading ? (
            <div className={styles.skeletonGrid}>
              {[1, 2].map((i) => <CourseCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className={styles.featuredGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className={styles.browseAll}>
            <Link to="/courses">
              <Button variant="outline" size="lg">
                View Full Syllabus & Compare Programs →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── The 4-Pillar Performance Framework ── */}
      <section className={[styles.section, styles.sectionAlt].join(' ')}>
        <div className="container">
          <div className="section-header">
            <span className="label">The Scaling Engine</span>
            <h2>Built on Real Ad Spend, Not Theory</h2>
            <p>Every tactic taught in these programs is tested with tens of millions of dollars in live ad accounts.</p>
          </div>

          <div className={styles.featuresGrid}>
            {PILLARS.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final High-Converting CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <span className={styles.ctaBadge}>Enrollment Open • Limited Cohort Seats</span>
            <h2 className={styles.ctaHeadline}>Ready to Scale Your ROAS to 4x+?</h2>
            <p className={styles.ctaSub}>
              Get instant lifetime access to the masterclasses, 25+ Notion SOPs, high-converting creative swipe files, and ROAS calculators.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" size="lg" onClick={() => navigate('/courses')}>
                Enroll in Flagship Programs
              </Button>
              {!isAuthenticated && (
                <Link to="/signup" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  Create student account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
