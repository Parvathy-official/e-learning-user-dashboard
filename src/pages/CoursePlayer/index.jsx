// =========================================================
//  CoursePlayer Page — Simple Paid Online Course Platform
// =========================================================

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  const { isAuthenticated, currentUser } = useAuth();
  const { isEnrolled, enrollments, updateLessonProgress } = useCourseContext();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastProgressSave = useRef(0);

  const enrollment = enrollments.find((e) => String(e.course_id) === String(courseId));
  const completedLessons = enrollment?.completed_lessons || [];
  const enrolled = isEnrolled(courseId);

  // Load course data
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await courseService.getCourseById(courseId);
        setCourse(data);

        const allLessons = data.modules?.flatMap((m) => m.lessons) || [];
        let initial;
        if (lessonId) {
          initial = allLessons.find((l) => String(l.id) === String(lessonId)) || allLessons[0];
        } else if (enrollment?.last_watched_lesson) {
          initial = allLessons.find((l) => String(l.id) === String(enrollment.last_watched_lesson)) || allLessons[0];
        } else {
          initial = allLessons[0];
        }

        // Access check: If not enrolled and lesson is not preview, block access
        if (!enrolled && !initial?.is_preview) {
          setAccessDenied(true);
          setLoading(false);
          return;
        }

        if (initial) setCurrentLesson(initial);
      } catch {
        toast.error('Failed to load course');
        navigate('/my-learning');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId, lessonId, enrolled, enrollment?.last_watched_lesson, navigate]);

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
        toast.error('Failed to load lesson video');
      } finally {
        setVideoLoading(false);
      }
    };
    fetchVideo();
  }, [currentLesson, courseId, accessDenied]);

  const handleLessonSelect = useCallback((lesson) => {
    if (!enrolled && !lesson.is_preview) {
      toast('Please purchase this course to unlock this lesson.', { icon: '🔒' });
      return;
    }
    setCurrentLesson(lesson);
    navigate(`/course/${courseId}/learn/${lesson.id}`, { replace: true });
    setSidebarOpen(false);
  }, [courseId, enrolled, navigate]);

  const handleMarkComplete = () => {
    if (!currentLesson) return;
    updateLessonProgress(courseId, currentLesson.id, 0, 0, true);
    toast.success(`Completed: ${currentLesson.title} ✓`);
  };

  const handleTimeUpdate = (currentTime, duration) => {
    if (!currentLesson || !duration) return;
    const now = Date.now();
    // Throttle progress updates to every 4 seconds
    if (now - lastProgressSave.current > 4000) {
      lastProgressSave.current = now;
      const isComplete = currentTime / duration >= 0.9;
      updateLessonProgress(courseId, currentLesson.id, currentTime, duration, isComplete);
    }
  };

  const handleNext = () => {
    if (!course) return;
    const allLessons = course.modules?.flatMap((m) => m.lessons) || [];
    const idx = allLessons.findIndex((l) => String(l.id) === String(currentLesson?.id));
    if (idx < allLessons.length - 1) {
      const nextLesson = allLessons[idx + 1];
      if (enrolled || nextLesson.is_preview) {
        handleLessonSelect(nextLesson);
      } else {
        toast('Next lesson is locked. Please purchase the course for full access.', { icon: '🔒' });
      }
    } else {
      toast.success('🎉 You have completed all lessons in this course!');
    }
  };

  const handlePrev = () => {
    if (!course) return;
    const allLessons = course.modules?.flatMap((m) => m.lessons) || [];
    const idx = allLessons.findIndex((l) => String(l.id) === String(currentLesson?.id));
    if (idx > 0) handleLessonSelect(allLessons[idx - 1]);
  };

  const allLessons = course?.modules?.flatMap((m) => m.lessons) || [];
  const currentIdx = allLessons.findIndex((l) => String(l.id) === String(currentLesson?.id));
  const isCurrentLessonComplete = currentLesson && completedLessons.includes(String(currentLesson.id));

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
          <h2 className={styles.accessTitle}>Course Enrollment Required</h2>
          <p className={styles.accessDesc}>
            {!isAuthenticated
              ? 'Please log in and purchase this course to access the lessons.'
              : 'You have not enrolled in this course yet. Purchase once for lifetime access.'}
          </p>
          <div className={styles.accessActions}>
            {!isAuthenticated ? (
              <Button variant="primary" size="lg" onClick={() => navigate('/login', { state: { from: { pathname: `/checkout/${courseId}` } } })}>
                Log In & Buy Course
              </Button>
            ) : (
              <Button variant="primary" size="lg" onClick={() => navigate(`/checkout/${courseId}`)}>
                Buy Course Now
              </Button>
            )}
            <Button variant="outline" size="md" onClick={() => navigate(`/courses/${courseId}`)}>
              View Course Syllabus
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner} aria-label="Loading course…" />
        <p>Loading course player…</p>
      </div>
    );
  }

  if (!course) return null;

  // Enriched modules with completion state
  const enrichedModules = course.modules?.map((m) => ({
    ...m,
    lessons: m.lessons.map((l) => ({
      ...l,
      is_completed: completedLessons.includes(String(l.id)),
      is_locked: !enrolled && !l.is_preview,
    })),
  })) || [];

  return (
    <div className={styles.page}>
      {/* Top Navigation Bar */}
      <div className={styles.topBar}>
        <Link to={`/courses/${courseId}`} className={styles.backBtn} aria-label="Back to course details">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className={styles.backText}>{course.title}</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {enrollment && (
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {enrollment.progress_percentage || 0}% completed
            </span>
          )}

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

      {/* Main Distraction-Free Layout */}
      <div className={styles.layout}>
        {/* Left Video Column */}
        <div className={styles.videoCol}>
          {videoLoading ? (
            <div className={styles.videoPlaceholder}>
              <div className={styles.spinner} aria-label="Loading video…" />
            </div>
          ) : (
            <VideoPlayer
              videoUrl={videoUrl}
              lessonTitle={currentLesson?.title}
              initialTime={enrollment?.last_position_seconds || 0}
              onEnded={handleNext}
              onTimeUpdate={handleTimeUpdate}
            />
          )}

          {/* Lesson Controls */}
          <div className={styles.lessonControls}>
            <div className={styles.lessonInfo}>
              <p className={styles.lessonTitle}>{currentLesson?.title}</p>
              <p className={styles.lessonProgress}>
                Lesson {currentIdx >= 0 ? currentIdx + 1 : 1} of {allLessons.length} • {currentLesson?.duration}
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
                Previous
              </Button>

              <Button
                variant={isCurrentLessonComplete ? 'primary' : 'outline'}
                size="sm"
                onClick={handleMarkComplete}
                leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
              >
                {isCurrentLessonComplete ? '✓ Completed' : 'Mark as Complete'}
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={currentIdx >= allLessons.length - 1}
                rightIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>}
              >
                Next Lesson
              </Button>
            </div>
          </div>

          {/* Lesson Description & Resources Card */}
          <div style={{ background: '#0B1116', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', marginTop: 20 }}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-dark)', margin: '0 0 8px' }}>
              About this lesson
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 16px' }}>
              Follow along with the video, review the key points, and apply the frameworks in your own ad accounts. When finished, mark the lesson as complete or let automatic tracking mark it for you.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', background: '#080D12', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                ⏱️ Duration: {currentLesson?.duration}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', background: '#080D12', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                {isCurrentLessonComplete ? '✅ Status: Completed' : '⏳ Status: In Progress'}
              </span>
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
