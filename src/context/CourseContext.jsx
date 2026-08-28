// =========================================================
//  CourseContext — Course browsing, enrollment & progress state
// =========================================================

import { createContext, useState, useCallback, useEffect } from 'react';
import courseService from '../services/courseService';
import { MOCK_ENROLLMENTS, MOCK_PURCHASES } from '../utils/mockData';

const CourseContext = createContext(null);

const STORAGE_ENROLLMENTS_KEY = 'learnflow_enrollments';
const STORAGE_PURCHASES_KEY = 'learnflow_purchases';

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ENROLLMENTS_KEY);
      return saved ? JSON.parse(saved) : MOCK_ENROLLMENTS;
    } catch {
      return MOCK_ENROLLMENTS;
    }
  });
  const [purchases, setPurchases] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PURCHASES_KEY);
      return saved ? JSON.parse(saved) : MOCK_PURCHASES;
    } catch {
      return MOCK_PURCHASES;
    }
  });

  const [coursesLoading, setCoursesLoading] = useState(false);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [coursesError, setCoursesError] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ENROLLMENTS_KEY, JSON.stringify(enrollments));
    } catch {}
  }, [enrollments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PURCHASES_KEY, JSON.stringify(purchases));
    } catch {}
  }, [purchases]);

  const fetchCourses = useCallback(async (params = {}) => {
    setCoursesLoading(true);
    setCoursesError(null);
    try {
      const data = await courseService.getCourses(params);
      setCourses(data.results || data);
      return data;
    } catch (err) {
      setCoursesError(err.message || 'Failed to load courses');
      throw err;
    } finally {
      setCoursesLoading(false);
    }
  }, []);

  const fetchEnrollments = useCallback(async () => {
    setEnrollmentsLoading(true);
    try {
      const data = await courseService.getMyEnrollments();
      if (data && data.length > 0) {
        setEnrollments((prev) => {
          const merged = [...prev];
          data.forEach((d) => {
            if (!merged.some((m) => m.course_id === d.course_id)) {
              merged.push(d);
            }
          });
          return merged;
        });
      }
      return enrollments;
    } catch {
      return enrollments;
    } finally {
      setEnrollmentsLoading(false);
    }
  }, [enrollments]);

  const isEnrolled = useCallback(
    (courseId) => enrollments.some((e) => e.course_id === courseId),
    [enrollments]
  );

  const getEnrollment = useCallback(
    (courseId) => enrollments.find((e) => e.course_id === courseId) || null,
    [enrollments]
  );

  const addEnrollment = useCallback((enrollment) => {
    setEnrollments((prev) => {
      const exists = prev.some((e) => e.course_id === enrollment.course_id);
      if (exists) return prev;
      return [...prev, enrollment];
    });
  }, []);

  const addPurchase = useCallback((purchase) => {
    setPurchases((prev) => [purchase, ...prev]);
  }, []);

  const updateLessonProgress = useCallback((courseId, lessonId, currentTime = 0, duration = 0, isComplete = false) => {
    setEnrollments((prev) => {
      return prev.map((e) => {
        if (e.course_id !== courseId) return e;

        const completedSet = new Set(e.completed_lessons || []);
        const shouldMarkComplete = isComplete || (duration > 0 && currentTime / duration >= 0.9);

        if (shouldMarkComplete) {
          completedSet.add(lessonId);
        }

        const completedArr = Array.from(completedSet);
        // Estimate progress percentage (assuming 12 lessons per course default or computed)
        const totalLessonsCount = e.total_lessons || 12;
        const progressPercentage = Math.min(100, Math.round((completedArr.length / totalLessonsCount) * 100));

        return {
          ...e,
          completed_lessons: completedArr,
          progress_percentage: progressPercentage,
          last_watched_lesson_id: lessonId,
          last_position_seconds: currentTime,
          last_updated: new Date().toISOString(),
        };
      });
    });
  }, []);

  const value = {
    courses,
    enrollments,
    purchases,
    coursesLoading,
    enrollmentsLoading,
    coursesError,
    fetchCourses,
    fetchEnrollments,
    isEnrolled,
    getEnrollment,
    addEnrollment,
    addPurchase,
    updateLessonProgress,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export default CourseContext;
