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
                Lesson {currentIdx + 1} of {allLessons.length}
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
