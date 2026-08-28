// =========================================================
//  Home Page — Performance Marketing Academy
// =========================================================

import { useEffect, useState } from 'react';
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
    desc: 'Master 3-second hook formulas, creator briefing frameworks, and weekly iteration sandboxes that cut CAC in half.',
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

const DELIVERABLES = [
  { icon: '🎥', title: '4K Masterclass Video Library', desc: 'Over 40+ hours of step-by-step screen shares inside live $50k/day ad accounts.' },
  { icon: '📦', title: '25+ Notion Media Buying SOPs', desc: 'Plug-and-play testing protocols, creative review SOPs, and scaling rules.' },
  { icon: '📊', title: 'Live ROAS & MER Calculator', desc: 'Financial modeling spreadsheets to calculate contribution margins before spending.' },
  { icon: '🎬', title: '100+ UGC Hook & Script Swipe File', desc: 'Top-performing direct-response video scripts tested across TikTok and Meta.' },
  { icon: '👥', title: 'Live Weekly Account Teardowns', desc: 'Join Devon Vance every Thursday on Zoom for live campaign audits and Q&A.' },
  { icon: '📜', title: 'Verified Academy Certificate', desc: 'Shareable certificate of completion to verify your media buying credentials.' },
];

const REVIEWS = [
  {
    name: 'Karan Mehra',
    role: 'Founder @ D2C Apparel Brand',
    text: 'Before this blueprint, our Meta ROAS hovered around 1.9x with constant creative fatigue. Within 3 weeks of implementing the DCT sandbox and CBO rules, we scaled past ₹25 Lakh/month at a 4.1x blended ROAS.',
    metric: '1.9x ➔ 4.1x ROAS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Head of Media Buying @ Growth Agency',
    text: 'The server-side CAPI and First-Party Data module alone saved our agency accounts. The Notion SOPs are so clear that our junior buyers execute at a senior level now.',
    metric: '$180k/Mo Scaled',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  },
];

const STATS = [
  { value: '$45M+', label: 'Ad Spend Managed & Scaled' },
  { value: '4.85x', label: 'Average Student ROAS' },
  { value: '10,000+', label: 'Marketers & Founders Trained' },
  { value: '99.4%', label: 'Positive Outcome Rate' },
];

const HERO_LESSONS = [
  { id: 1, title: 'Break-Even ROAS Math', tag: 'Module 1', duration: '24m', spend: '$48,250', roas: '4.85x', revenue: '+$234,012' },
  { id: 2, title: 'DCT Creative Testing Sandbox', tag: 'Module 2', duration: '38m', spend: '$12,400', roas: '5.20x', revenue: '+$64,480' },
  { id: 3, title: 'Meta Advantage+ ASC Scale', tag: 'Module 3', duration: '35m', spend: '$85,900', roas: '4.40x', revenue: '+$377,960' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { courses, coursesLoading, fetchCourses } = useCourseContext();
  const [selectedHeroLesson, setSelectedHeroLesson] = useState(0);
  const [activeSyllabusTab, setActiveSyllabusTab] = useState('1');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const activeCourse = courses.find((c) => c.id === activeSyllabusTab) || courses[0];

  return (
    <div className={styles.page}>

      {/* ── Live Learning Announcement Bar ── */}
      <div style={{ background: 'linear-gradient(90deg, #081721 0%, #0B2533 50%, #081721 100%)', borderBottom: '1px solid rgba(6,182,212,0.25)', padding: '10px 16px', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block', boxShadow: '0 0 8px #EF4444' }} />
        <span><strong>NEXT LIVE SESSION:</strong> Advanced Meta ASC & CBO Scaling Teardown — Thursday 8:00 PM EST</span>
        <Link to="/courses/1" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', marginLeft: 4 }}>
          Reserve Cohort Seat →
        </Link>
      </div>

      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={['container', styles.heroInner].join(' ')}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4', display: 'inline-block', boxShadow: '0 0 8px #06B6D4' }} />
              The Performance Marketing Academy
            </span>
            <h1 className={styles.heroHeadline}>
              Scale Meta & Google Ads With <br />
              <span className={styles.heroAccent}>Predictable High ROAS</span>
            </h1>
            <p className={styles.heroSub}>
              The complete masterclass curriculum to master full-funnel media buying, viral UGC creative engines, server-side CAPI tracking, and unit economics engineered to scale from $500/day to $10,000+/day profitably.
            </p>
            <div className={styles.heroCtas}>
              <Button variant="primary" size="lg" onClick={() => navigate('/courses')}>
                Explore Flagship Programs →
              </Button>
              {isAuthenticated ? (
                <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
                  Go to Student Hub
                </Button>
              ) : (
                <Button variant="outline" size="lg" onClick={() => navigate('/signup')}>
                  Join Masterclass Cohort
                </Button>
              )}
            </div>
          </div>

          {/* Interactive Hero Masterclass Terminal */}
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#080D12' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interactive Learning Terminal</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#06B6D4', fontWeight: 700, background: 'rgba(6,182,212,0.15)', padding: '2px 8px', borderRadius: 9999 }}>Lesson Preview</span>
              </div>

              {/* Lesson Switcher Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.5)' }}>
                {HERO_LESSONS.map((l, idx) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedHeroLesson(idx)}
                    style={{
                      flex: 1,
                      padding: '10px 8px',
                      background: selectedHeroLesson === idx ? 'rgba(6,182,212,0.12)' : 'none',
                      border: 'none',
                      borderBottom: selectedHeroLesson === idx ? '2px solid var(--primary)' : '2px solid transparent',
                      color: selectedHeroLesson === idx ? 'var(--primary)' : 'var(--text-tertiary)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Lesson {l.id}
                  </button>
                ))}
              </div>

              <div className={styles.heroCardBody}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {HERO_LESSONS[selectedHeroLesson].tag} • {HERO_LESSONS[selectedHeroLesson].duration}
                  </span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: '2px 0 0' }}>
                    {HERO_LESSONS[selectedHeroLesson].title}
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                  <div style={{ background: '#080D12', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Ad Spend</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: 2 }}>{HERO_LESSONS[selectedHeroLesson].spend}</div>
                  </div>
                  <div style={{ background: '#080D12', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6,182,212,0.25)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: 600 }}>Scaled ROAS</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: 2 }}>{HERO_LESSONS[selectedHeroLesson].roas}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Lesson Completion</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Attached: Notion SOP + Sheet</span>
                </div>
                <div className={styles.heroProgressTrack} style={{ margin: '0 0 14px' }}>
                  <div className={styles.heroProgressFill} style={{ width: selectedHeroLesson === 0 ? '45%' : selectedHeroLesson === 1 ? '75%' : '90%' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Verified Revenue</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#10B981' }}>{HERO_LESSONS[selectedHeroLesson].revenue}</span>
                </div>
              </div>
            </div>

            <div className={styles.heroBubble1}>
              <span>📈 4.85x Blended ROAS</span>
            </div>
            <div className={styles.heroBubble2}>
              <span>⭐ 4.98/5 (1,420 Media Buyers)</span>
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
            <span className="label">Flagship Programs</span>
            <h2>Masterclasses Built for High-Growth Media Buyers</h2>
            <p>Two comprehensive learning tracks designed to take you from foundational unit economics to $10,000+/day profitable scaling.</p>
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
        </div>
      </section>

      {/* ── Interactive Syllabus Explorer ── */}
      {activeCourse && (
        <section className={styles.section} style={{ background: '#050A0E', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div className="section-header">
              <span className="label">Curriculum Inspector</span>
              <h2>Explore the Masterclass Syllabus</h2>
              <p>Click through the modules to see every video lesson, screen share breakdown, and downloadable SOP.</p>
            </div>

            {/* Track Switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
              <button
                onClick={() => setActiveSyllabusTab('1')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: activeSyllabusTab === '1' ? '1px solid var(--primary)' : '1px solid var(--border)',
                  background: activeSyllabusTab === '1' ? 'var(--primary-bg)' : '#080D12',
                  color: activeSyllabusTab === '1' ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Track 1: Meta & Google Ads Blueprint
              </button>
              <button
                onClick={() => setActiveSyllabusTab('2')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: activeSyllabusTab === '2' ? '1px solid var(--primary)' : '1px solid var(--border)',
                  background: activeSyllabusTab === '2' ? 'var(--primary-bg)' : '#080D12',
                  color: activeSyllabusTab === '2' ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Track 2: E-Com Funnel & CRO Masterclass
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {activeCourse.modules?.map((mod, i) => (
                <div key={mod.id} style={{ background: '#0B1116', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>Module {i + 1}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{mod.lessons.length} Lessons</span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: '0 0 12px' }}>{mod.title}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {mod.lessons.slice(0, 3).map((l) => (
                      <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                          <span style={{ color: l.is_preview ? 'var(--primary)' : 'var(--text-tertiary)', fontSize: '0.75rem' }}>{l.is_preview ? '▶' : '🔒'}</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', flexShrink: 0, marginLeft: 10 }}>{l.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link to={`/courses/${activeSyllabusTab}`}>
                <Button variant="primary" size="md">
                  View Full {activeCourse.title.split(':')[0]} Curriculum & Enroll →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── What's Included in Your Student Portal ── */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <span className="label">The Learning Experience</span>
            <h2>What You Receive as an Academy Student</h2>
            <p>Every tool, template, and live feedback loop required to scale high-ROAS paid media.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {DELIVERABLES.map((d, i) => (
              <div key={i} style={{ background: '#0B1116', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', transition: 'transform 0.2s, border-color 0.2s' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{d.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)', margin: '0 0 8px' }}>{d.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real Student Case Studies ── */}
      <section className={[styles.section, styles.sectionAlt].join(' ')}>
        <div className="container">
          <div className="section-header">
            <span className="label">Verified Outcomes</span>
            <h2>Real Media Buyers. Real Ad Scale.</h2>
            <p>See how students scaled profitable revenue using our CBO testing frameworks and CRO playbooks.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: '#0B1116', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={r.avatar} alt={r.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>{r.name}</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', margin: 0 }}>{r.role}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10B981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', padding: '4px 10px', borderRadius: 9999 }}>
                    {r.metric}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final High-Converting CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <span className={styles.ctaBadge}>Cohort #14 Enrolling • 18 Seats Remaining</span>
            <h2 className={styles.ctaHeadline}>Ready to Master Performance Marketing?</h2>
            <p className={styles.ctaSub}>
              Get instant lifetime access to both signature masterclasses, 25+ Notion SOPs, live weekly account audits, and private mastermind community.
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
