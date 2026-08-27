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
              <button onClick={() => navigate('/courses')} className={styles.breadLink}>Courses</button>
              <span>/</span>
              <span className={styles.breadCurrent}>{course.category}</span>
            </nav>

            {/* Header */}
            <div className={styles.header}>
              <Badge variant="primary">{course.category}</Badge>
              {course.is_bestseller && <Badge variant="bestseller">⭐ Bestseller</Badge>}
            </div>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.desc}>{course.description}</p>

            <div className={styles.metaRow}>
              <Rating value={course.rating} count={course.total_ratings} size="md" />
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>{formatCount(course.total_students)} students</span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>{course.total_lessons} lessons</span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>{course.duration}</span>
            </div>

            <div className={styles.instructorRow}>
              <img src={course.instructor_avatar} alt={course.instructor} className={styles.instructorAvatar} />
              <div>
                <p className={styles.instructorLabel}>Instructor</p>
                <p className={styles.instructorName}>{course.instructor}</p>
              </div>
            </div>

            {/* Thumbnail */}
            <div className={styles.thumbWrap}>
              <img src={course.thumbnail} alt={course.title} className={styles.thumb} />
              <div className={styles.thumbOverlay}>
                <div className={styles.playBtn}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className={styles.previewLabel}>Preview course</span>
              </div>
            </div>

            {/* What You'll Learn */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>What You'll Learn</h2>
              <div className={styles.learnGrid}>
                {course.what_youll_learn?.map((item, i) => (
                  <div key={i} className={styles.learnItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Course Curriculum</h2>
              <p className={styles.sectionSub}>{course.total_lessons} lessons · {course.duration} total</p>

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
                            <div key={lesson.id} className={styles.lesson}>
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
                                  <span className={styles.previewTag}>Preview</span>
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
                <h2 className={styles.sectionTitle}>Requirements</h2>
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
              <h2 className={styles.sectionTitle}>Your Instructor</h2>
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
                  {enrolled ? '▶ Continue Learning' : isAuthenticated ? '🔒 Enroll Now' : 'Login to Enroll'}
                </Button>

                {!enrolled && (
                  <p className={styles.guarantee}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    30-day money back guarantee
                  </p>
                )}

                <div className={styles.includes}>
                  <p className={styles.includesTitle}>This course includes:</p>
                  {[
                    `${course.total_lessons} on-demand video lessons`,
                    `${course.duration} of content`,
                    'Full lifetime access',
                    'Certificate of completion',
                    'Access on mobile & desktop',
                  ].map((item) => (
                    <div key={item} className={styles.includeItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" aria-hidden="true">
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
    </div>
  );
}
