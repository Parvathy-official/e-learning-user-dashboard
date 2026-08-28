// =========================================================
//  CoursePlayer Page — Video learning interface
// =========================================================

import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import courseService from '../../services/courseService';
import VideoPlayer from '../../components/video/VideoPlayer';
import CurriculumSidebar from '../../components/video/CurriculumSidebar';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import styles from './CoursePlayer.module.css';

export default function CoursePlayer() {
  const { courseId, lessonId } = useParams();
  const { isAuthenticated } = useAuth();
  const { isEnrolled } = useCourseContext();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const enrolled = course ? isEnrolled(course.id) : false;

  // Load course data
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await courseService.getCourseById(courseId);
        setCourse(data);

        // Check access
        if (isAuthenticated) {
          const accessData = await courseService.checkCourseAccess(courseId);
          if (!accessData.has_access) {
            setAccessDenied(true);
            setLoading(false);
            return;
          }
        } else {
          setAccessDenied(true);
          setLoading(false);
          return;
        }

        // Select initial lesson
        const allLessons = data.modules?.flatMap((m) => m.lessons) || [];
        let initial;
        if (lessonId) {
          initial = allLessons.find((l) => l.id === lessonId) || allLessons[0];
        } else {
          initial = allLessons[0];
        }
        if (initial) setCurrentLesson(initial);
      } catch {
        toast.error('Failed to load course');
        navigate('/my-courses');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId, lessonId, isAuthenticated, navigate]);

  // Fetch video URL when lesson changes
  useEffect(() => {
    if (!currentLesson || accessDenied) return;
    const fetchVideo = async () => {
      setVideoLoading(true);
      setVideoUrl(null);
      try {
        const data = await courseService.getVideoUrl(courseId, currentLesson.id);
        setVideoUrl(data.url);
      } catch {
        toast.error('Failed to load video. Please try again.');
      } finally {
        setVideoLoading(false);
      }
    };
    fetchVideo();
  }, [currentLesson, courseId, accessDenied]);

  const handleLessonSelect = useCallback((lesson) => {
    setCurrentLesson(lesson);
    navigate(`/course/${courseId}/learn/${lesson.id}`, { replace: true });
    setSidebarOpen(false);
  }, [courseId, navigate]);

  const handleMarkComplete = async () => {
    if (!currentLesson) return;
    setMarkingComplete(true);
    try {
      await courseService.markLessonComplete(courseId, currentLesson.id);
      toast.success('Lesson marked as complete! ✓');
    } catch {
      toast.error('Failed to mark lesson. Please try again.');
    } finally {
      setMarkingComplete(false);
    }
  };

  const handleNext = () => {
    if (!course) return;
    const allLessons = course.modules?.flatMap((m) => m.lessons) || [];
    const idx = allLessons.findIndex((l) => l.id === currentLesson?.id);
    if (idx < allLessons.length - 1) handleLessonSelect(allLessons[idx + 1]);
  };

  const handlePrev = () => {
    if (!course) return;
    const allLessons = course.modules?.flatMap((m) => m.lessons) || [];
    const idx = allLessons.findIndex((l) => l.id === currentLesson?.id);
    if (idx > 0) handleLessonSelect(allLessons[idx - 1]);
  };

  const allLessons = course?.modules?.flatMap((m) => m.lessons) || [];
  const currentIdx = allLessons.findIndex((l) => l.id === currentLesson?.id);

  // Access denied state
  if (!loading && accessDenied) {
    return (
      <div className={styles.accessDenied}>
        <div className={styles.accessDeniedCard}>
          <div className={styles.lockIcon} aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <h2 className={styles.accessTitle}>Access Required</h2>
          <p className={styles.accessDesc}>
            {!isAuthenticated
              ? 'Please log in to access this course.'
              : 'You need to enroll in this course to access the video lessons.'}
          </p>
          <div className={styles.accessActions}>
            {!isAuthenticated ? (
              <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
                Log In to Continue
              </Button>
            ) : (
              <>
                <Button variant="primary" size="lg" onClick={() => navigate(`/checkout/${courseId}`)}>
                  Enroll Now
                </Button>
                <Button variant="outline" size="md" onClick={() => navigate(`/courses/${courseId}`)}>
                  View Course Details
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner} aria-label="Loading course…" />
        <p>Loading course…</p>
      </div>
    );
  }

  if (!course) return null;

  // Enriched modules with completion state
  const enrichedModules = course.modules?.map((m) => ({
    ...m,
    lessons: m.lessons.map((l) => ({
      ...l,
      is_locked: !enrolled && !l.is_preview,
    })),
  })) || [];

  const [activeTab, setActiveTab] = useState('overview');
  const [qaInput, setQaInput] = useState('');
  const [qaList, setQaList] = useState([
    {
      id: 'q1',
      author: 'Vikram Singh',
      role: 'Growth Lead @ E-Com Brand',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      time: '2 days ago',
      question: 'When setting up the Dynamic Creative Testing sandbox, what budget split do you recommend relative to the main CBO scaling campaign?',
      answer: 'Great question! We typically allocate 15% to 20% of your daily budget to the DCT Sandbox. Once a winning creative angle produces 3+ purchases at or below target CPA, graduate the Post ID directly into your scaling CBO.',
      instructor: 'Devon Vance',
    },
    {
      id: 'q2',
      author: 'Sophia Chen',
      role: 'Media Buyer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      time: '5 days ago',
      question: 'How do you prevent ASC campaigns from retargeting existing customers too heavily?',
      answer: 'Set an Existing Customer Budget Cap of 0% to 5% inside the Advantage+ Shopping settings. Always define your 180-day customer audience list in your Account Custom Audiences tab.',
      instructor: 'Devon Vance',
    },
  ]);

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!qaInput.trim()) return;
    setQaList([
      {
        id: `q-${Date.now()}`,
        author: currentUser?.name || 'Student',
        role: 'Cohort Member',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        time: 'Just now',
        question: qaInput.trim(),
        answer: null,
      },
      ...qaList,
    ]);
    setQaInput('');
    toast.success('Question submitted to the instructor!');
  };

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate(`/courses/${courseId}`)} aria-label="Back to course">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className={styles.backText}>{course.title}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-bg)', padding: '4px 10px', borderRadius: 9999, border: '1px solid rgba(6,182,212,0.25)' }}>
            🔥 3-Day Learning Streak
          </span>

          {/* Mobile sidebar toggle */}
          <button
            className={styles.sidebarToggle}
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle curriculum"
            aria-expanded={sidebarOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            Curriculum
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className={styles.layout}>

        {/* Video column */}
        <div className={styles.videoCol}>
          {videoLoading ? (
            <div className={styles.videoPlaceholder}>
              <div className={styles.spinner} aria-label="Loading video…" />
            </div>
          ) : (
            <VideoPlayer
              videoUrl={videoUrl}
              lessonTitle={currentLesson?.title}
              onEnded={handleNext}
            />
          )}

          {/* Lesson controls */}
          <div className={styles.lessonControls}>
            <div className={styles.lessonInfo}>
              <p className={styles.lessonTitle}>{currentLesson?.title}</p>
              <p className={styles.lessonProgress}>
                Lesson {currentIdx + 1} of {allLessons.length} • {currentLesson?.duration}
              </p>
            </div>

            <div className={styles.navButtons}>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentIdx <= 0}
                leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>}
              >
                Prev
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkComplete}
                loading={markingComplete}
                leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
              >
                Mark Complete
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={currentIdx >= allLessons.length - 1}
                rightIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Learning Platform Tabs */}
          <div style={{ background: '#0B1116', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#080D12' }}>
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  padding: '14px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'overview' ? '2px solid var(--primary)' : '2px solid transparent',
                  color: activeTab === 'overview' ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                📑 Overview & SOPs
              </button>
              <button
                onClick={() => setActiveTab('downloads')}
                style={{
                  padding: '14px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'downloads' ? '2px solid var(--primary)' : '2px solid transparent',
                  color: activeTab === 'downloads' ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                📥 Toolkits & Templates (3)
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                style={{
                  padding: '14px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'qa' ? '2px solid var(--primary)' : '2px solid transparent',
                  color: activeTab === 'qa' ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                💬 Student Q&A ({qaList.length})
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {activeTab === 'overview' && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', margin: '0 0 12px' }}>
                    Lesson Core Takeaways & Implementation Checklist
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 16 }}>
                    In this lesson, you will learn the exact framework used to test creatives, set bid caps, and avoid learning phase resets when scaling ad spend.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: '#080D12', padding: '16px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span>
                      <span>Establish true break-even CAC before setting campaign bid strategies.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span>
                      <span>Separate Creative Testing Sandboxes (DCT ABO) from the Main Scaling CBO.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span>
                      <span>Ensure Server-Side CAPI Event Match Quality is 8.2 or higher in Meta Events Manager.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'downloads' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                  <div style={{ padding: '16px', background: '#080D12', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.875rem' }}>📄 Notion Scale SOP</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>DCT Testing & Scaling Protocol</div>
                    </div>
                    <button style={{ padding: '6px 12px', background: 'var(--primary-bg)', color: 'var(--primary)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 6, fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer' }} onClick={() => toast.success('Downloaded SOP template!')}>
                      Download
                    </button>
                  </div>

                  <div style={{ padding: '16px', background: '#080D12', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.875rem' }}>📊 ROAS Calculator (Excel)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>MER & LTV Sensitivity Model</div>
                    </div>
                    <button style={{ padding: '6px 12px', background: 'var(--primary-bg)', color: 'var(--primary)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 6, fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer' }} onClick={() => toast.success('Downloaded ROAS Model!')}>
                      Download
                    </button>
                  </div>

                  <div style={{ padding: '16px', background: '#080D12', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.875rem' }}>🎬 UGC Brief Swipe File</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>15 High-Converting Hook Scripts</div>
                    </div>
                    <button style={{ padding: '6px 12px', background: 'var(--primary-bg)', color: 'var(--primary)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 6, fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer' }} onClick={() => toast.success('Downloaded UGC Briefs!')}>
                      Download
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div>
                  <form onSubmit={handlePostQuestion} style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                    <input
                      type="text"
                      value={qaInput}
                      onChange={(e) => setQaInput(e.target.value)}
                      placeholder="Ask the instructor a question about this lesson…"
                      style={{
                        flex: 1,
                        background: '#080D12',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '10px 14px',
                        color: 'var(--text-dark)',
                        fontSize: '0.875rem',
                        outline: 'none',
                      }}
                    />
                    <Button variant="primary" size="sm" type="submit">
                      Post Question
                    </Button>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {qaList.map((q) => (
                      <div key={q.id} style={{ background: '#080D12', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <img src={q.avatar} alt={q.author} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-dark)' }}>{q.author}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginLeft: 8 }}>{q.time}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', margin: '0 0 12px', lineHeight: 1.5 }}>
                          {q.question}
                        </p>

                        {q.answer && (
                          <div style={{ background: 'rgba(6,182,212,0.06)', borderLeft: '3px solid var(--primary)', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span>Instructor Response — {q.instructor}</span>
                              <span style={{ background: 'var(--primary)', color: '#030708', fontSize: '0.65rem', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>VERIFIED</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
                              {q.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Curriculum sidebar — desktop */}
        <div className={styles.sidebarCol}>
          <CurriculumSidebar
            modules={enrichedModules}
            currentLessonId={currentLesson?.id}
            isEnrolled={enrolled}
            onLessonSelect={handleLessonSelect}
          />
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <>
          <div className={styles.drawerOverlay} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          <div className={styles.drawer} role="dialog" aria-label="Course curriculum">
            <CurriculumSidebar
              modules={enrichedModules}
              currentLessonId={currentLesson?.id}
              isEnrolled={enrolled}
              onLessonSelect={handleLessonSelect}
            />
          </div>
        </>
      )}
    </div>
  );
}
