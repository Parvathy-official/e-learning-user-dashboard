// =========================================================
//  CourseDetails Page
// =========================================================

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import courseService from '../../services/courseService';
import Rating from '../../components/common/Rating';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import ErrorState from '../../components/common/ErrorState';
import { CourseDetailSkeleton } from '../../components/common/LoadingSkeleton';
import { formatPrice, discountPercent, formatCount } from '../../utils/helpers';
import styles from './CourseDetails.module.css';

export default function CourseDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { isEnrolled } = useCourseContext();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModules, setOpenModules] = useState([0]);
  const [openFaq, setOpenFaq] = useState(null);
  const [previewLesson, setPreviewLesson] = useState(null);
  const enrolled = course ? isEnrolled(course.id) : false;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleCTA = () => {
    if (!isAuthenticated) { navigate('/login', { state: { from: { pathname: `/courses/${id}` } } }); return; }
    if (enrolled) { navigate(`/course/${id}/learn`); return; }
    navigate(`/checkout/${id}`);
  };

  const handleOpenPreview = (lesson) => {
    setPreviewLesson(lesson || course?.modules?.[0]?.lessons?.[0]);
  };

  const closePreview = () => setPreviewLesson(null);

  if (loading) return <div className={styles.page}><div className="container" style={{ paddingTop: 'calc(var(--navbar-height) + 40px)' }}><CourseDetailSkeleton /></div></div>;
  if (error) return <div className={styles.page}><ErrorState description={error} onRetry={() => window.location.reload()} /></div>;
  if (!course) return null;

  const discount = discountPercent(course.price, course.discounted_price);

  const toggleModule = (i) =>
    setOpenModules((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>

          {/* ── Left Column ── */}
          <div className={styles.left}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <button onClick={() => navigate('/courses')} className={styles.breadLink}>Programs</button>
              <span>/</span>
              <span className={styles.breadCurrent}>{course.category}</span>
            </nav>

            {/* Header */}
            <div className={styles.header}>
              <Badge variant="primary">{course.category}</Badge>
              {course.is_bestseller && <Badge variant="bestseller">⭐ Flagship Masterclass</Badge>}
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', padding: '2px 10px', borderRadius: 9999 }}>
                Cohort #14 Enrolling • 18 Seats Remaining
              </span>
            </div>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.desc}>{course.description}</p>

            <div className={styles.metaRow}>
              <Rating value={course.rating} count={course.total_ratings} size="md" />
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>{formatCount(course.total_students)} media buyers enrolled</span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>{course.total_lessons} lessons</span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>{course.duration}</span>
            </div>

            <div className={styles.instructorRow}>
              <img src={course.instructor_avatar} alt={course.instructor} className={styles.instructorAvatar} />
              <div>
                <p className={styles.instructorLabel}>Lead Instructor & Growth Architect</p>
                <p className={styles.instructorName}>{course.instructor} <span style={{ fontSize: '0.72rem', background: 'var(--primary)', color: '#030708', padding: '1px 6px', borderRadius: 4, fontWeight: 800, marginLeft: 6 }}>VERIFIED $35M+</span></p>
              </div>
            </div>

            {/* Thumbnail / Video Preview Trigger */}
            <div className={styles.thumbWrap} onClick={() => handleOpenPreview(course.modules?.[0]?.lessons?.[0])} style={{ cursor: 'pointer' }} role="button" aria-label="Watch free lesson preview">
              <img src={course.thumbnail} alt={course.title} className={styles.thumb} />
              <div className={styles.thumbOverlay}>
                <div className={styles.playBtn}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#030708">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className={styles.previewLabel}>Watch Free Lesson Preview (No Account Required)</span>
              </div>
            </div>

            {/* What You'll Learn */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>What You'll Master</h2>
              <div className={styles.learnGrid}>
                {course.what_youll_learn?.map((item, i) => (
                  <div key={i} className={styles.learnItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Capstone Project Deliverable */}
            <section className={styles.section} style={{ background: '#0B1116', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 'var(--radius-xl)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: '1.25rem' }}>🚀</span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>Included Capstone: Live Ad Scale Architecture</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px' }}>
                You won't just watch videos. By the end of this program, you will architect a complete live testing sandbox, implement server-side CAPI tracking, calculate your contribution margin matrix, and present your scaling roadmap for instructor feedback.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', background: '#080D12', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  📦 25+ Notion SOPs
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', background: '#080D12', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  📊 ROAS & MER Calculator
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', background: '#080D12', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  📜 Verified Certificate Included
                </span>
              </div>
            </section>

            {/* Curriculum */}
            <section className={styles.section}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-5)' }}>
                <div>
                  <h2 className={styles.sectionTitle} style={{ margin: '0 0 4px' }}>Comprehensive Curriculum</h2>
                  <p className={styles.sectionSub} style={{ margin: 0 }}>{course.total_lessons} lessons · {course.duration} total on-demand video</p>
                </div>
                <button
                  onClick={() => setOpenModules(openModules.length === course.modules?.length ? [] : course.modules?.map((_, i) => i) || [])}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  {openModules.length === course.modules?.length ? 'Collapse All' : 'Expand All Modules'}
                </button>
              </div>

              <div className={styles.curriculum}>
                {course.modules?.map((mod, idx) => (
                  <div key={mod.id} className={styles.module}>
                    <button
                      className={styles.moduleBtn}
                      onClick={() => toggleModule(idx)}
                      aria-expanded={openModules.includes(idx)}
                    >
                      <div className={styles.moduleBtnLeft}>
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          style={{ transform: openModules.includes(idx) ? 'rotate(90deg)' : '', transition: 'transform 0.2s' }}
                          aria-hidden="true"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span className={styles.moduleTitle}>{mod.title}</span>
                      </div>
                      <span className={styles.moduleMeta}>{mod.lessons.length} lessons</span>
                    </button>

                    {openModules.includes(idx) && (
                      <div className={styles.lessonList}>
                        {mod.lessons.map((lesson) => {
                          const canAccess = enrolled || lesson.is_preview;
                          return (
                            <div
                              key={lesson.id}
                              className={styles.lesson}
                              onClick={lesson.is_preview ? () => handleOpenPreview(lesson) : undefined}
                              style={{ cursor: lesson.is_preview ? 'pointer' : 'default' }}
                            >
                              <div className={styles.lessonLeft}>
                                {canAccess ? (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" aria-hidden="true">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                ) : (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" aria-hidden="true">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                                  </svg>
                                )}
                                <span className={[styles.lessonTitle, !canAccess ? styles.lessonLocked : ''].join(' ')}>
                                  {lesson.title}
                                </span>
                                {lesson.is_preview && (
                                  <span className={styles.previewTag}>▶ Free Preview</span>
                                )}
                              </div>
                              <span className={styles.lessonDuration}>{lesson.duration}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            {course.requirements?.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Prerequisites & Requirements</h2>
                <ul className={styles.requirementList}>
                  {course.requirements.map((r, i) => (
                    <li key={i} className={styles.requirementItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      {r}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Instructor */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Your Masterclass Instructor</h2>
              <div className={styles.instructorCard}>
                <img src={course.instructor_avatar} alt={course.instructor} className={styles.instructorBigAvatar} />
                <div>
                  <h3 className={styles.instructorCardName}>{course.instructor}</h3>
                  <p className={styles.instructorCardBio}>{course.instructor_bio}</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            {course.faqs?.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                <div className={styles.faqList}>
                  {course.faqs.map((faq, i) => (
                    <div key={i} className={styles.faqItem}>
                      <button
                        className={styles.faqBtn}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                      >
                        <span>{faq.q}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          style={{ transform: openFaq === i ? 'rotate(180deg)' : '', transition: 'transform 0.2s', flexShrink: 0 }}
                          aria-hidden="true">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {openFaq === i && (
                        <div className={styles.faqAnswer}>{faq.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Sticky Right Sidebar ── */}
          <aside className={styles.sidebar}>
            <div className={styles.stickyCard}>
              <div className={styles.sideThumbWrap}>
                <img src={course.thumbnail} alt={course.title} className={styles.sideThumb} />
              </div>
              <div className={styles.sideBody}>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{formatPrice(course.discounted_price || course.price)}</span>
                  {course.discounted_price < course.price && (
                    <>
                      <span className={styles.originalPrice}>{formatPrice(course.price)}</span>
                      <span className={styles.discountBadge}>-{discount}%</span>
                    </>
                  )}
                </div>

                <Button
                  variant={enrolled ? 'outline' : 'primary'}
                  size="lg"
                  fullWidth
                  onClick={handleCTA}
                  id="enroll-cta-btn"
                >
                  {enrolled ? '▶ Continue Learning' : isAuthenticated ? '🔒 Enroll in Program' : 'Login to Enroll'}
                </Button>

                {!enrolled && (
                  <p className={styles.guarantee}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    30-Day Money Back Guarantee • No Questions Asked
                  </p>
                )}

                <div className={styles.includes}>
                  <p className={styles.includesTitle}>This Masterclass includes:</p>
                  {[
                    `${course.total_lessons} on-demand video lessons`,
                    `${course.duration} of high-definition content`,
                    '25+ Notion Media Buying SOPs',
                    'ROAS & Break-Even MER Calculators',
                    'Full lifetime access & future updates',
                    'Verified Certificate of Completion',
                    'Access on mobile & desktop',
                  ].map((item) => (
                    <div key={item} className={styles.includeItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Free Video Preview Modal */}
      {previewLesson && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={closePreview}>
          <div style={{ width: '100%', maxWidth: 840, background: '#0B1116', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.95)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border)', background: '#080D12' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>Free Sample Lesson</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', margin: '2px 0 0' }}>{previewLesson.title}</h3>
              </div>
              <button onClick={closePreview} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.25rem', cursor: 'pointer', padding: 4 }}>✕</button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <video
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Ready to unlock all {course.total_lessons} lessons and the full SOP toolkit?</span>
                <Button variant="primary" size="md" onClick={handleCTA}>
                  Enroll in Masterclass →
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
