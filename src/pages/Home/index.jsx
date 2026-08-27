// =========================================================
//  Home Page — Landing page
// =========================================================

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import CourseCard from '../../components/course/CourseCard';
import Button from '../../components/common/Button';
import { CourseCardSkeleton } from '../../components/common/LoadingSkeleton';
import styles from './Home.module.css';

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Learn at your own pace',
    desc: 'Access course content anytime, anywhere. No deadlines, no pressure — study when it suits you.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: 'High-quality video lessons',
    desc: 'Expert-crafted, production-quality videos that make complex concepts easy to grasp.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Lifetime access',
    desc: 'Pay once and own the course forever. Revisit lessons anytime as your knowledge deepens.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Track your progress',
    desc: 'Visual progress tracking across every course so you always know where you stand.',
  },
];

const STATS = [
  { value: '50,000+', label: 'Students enrolled' },
  { value: '120+', label: 'Expert courses' },
  { value: '4.8★', label: 'Average rating' },
  { value: '98%', label: 'Satisfaction rate' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { courses, coursesLoading, fetchCourses } = useCourseContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const featuredCourses = courses.filter((c) => c.is_featured).slice(0, 3);

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={['container', styles.heroInner].join(' ')}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>🚀 Start learning today</span>
            <h1 className={styles.heroHeadline}>
              Learn Skills That<br />
              <span className={styles.heroAccent}>Move You Forward</span>
            </h1>
            <p className={styles.heroSub}>
              Master practical, high-quality skills from industry professionals. Study on your schedule, from anywhere in the world.
            </p>
            <div className={styles.heroCtas}>
              <Button variant="primary" size="lg" onClick={() => navigate('/courses')}>
                Explore Courses
              </Button>
              {isAuthenticated ? (
                <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <Button variant="outline" size="lg" onClick={() => navigate('/signup')}>
                  Start Learning Free
                </Button>
              )}
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardThumb} />
              <div className={styles.heroCardBody}>
                <div className={styles.heroCardLine} style={{ width: '70%', height: 14, marginBottom: 8 }} />
                <div className={styles.heroCardLine} style={{ width: '50%', height: 11 }} />
                <div className={styles.heroProgressTrack}>
                  <div className={styles.heroProgressFill} />
                </div>
                <div className={styles.heroCardMeta}>
                  <span className={styles.heroCardBadge}>42% complete</span>
                </div>
              </div>
            </div>
            <div className={styles.heroBubble1}>
              <span>⭐ 4.9</span>
            </div>
            <div className={styles.heroBubble2}>
              <span>🎓 8,920 students</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
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

      {/* ── Featured Courses ── */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <span className="label">Featured Courses</span>
            <h2>Learn From the Best</h2>
            <p>Handpicked courses from our most highly-rated instructors, covering the most in-demand skills.</p>
          </div>

          {coursesLoading ? (
            <div className={styles.skeletonGrid}>
              {[1, 2, 3].map((i) => <CourseCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className={styles.featuredGrid}>
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className={styles.browseAll}>
            <Link to="/courses">
              <Button variant="outline" size="lg">
                Browse All Courses →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why LearnFlow ── */}
      <section className={[styles.section, styles.sectionAlt].join(' ')}>
        <div className="container">
          <div className="section-header">
            <span className="label">Why LearnFlow</span>
            <h2>Everything You Need to Succeed</h2>
            <p>We've built LearnFlow to be the learning platform we always wished existed.</p>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <span className={styles.ctaBadge}>Limited time offer</span>
            <h2 className={styles.ctaHeadline}>Ready to Level Up Your Skills?</h2>
            <p className={styles.ctaSub}>
              Join over 50,000 learners already advancing their careers with LearnFlow.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" size="lg" onClick={() => navigate('/courses')}>
                Browse Courses
              </Button>
              {!isAuthenticated && (
                <Link to="/signup" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  Create free account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
