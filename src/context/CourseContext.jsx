// =========================================================
//  CourseContext — Course browsing & enrollment state
// =========================================================

import { createContext, useState, useCallback } from 'react';
import courseService from '../services/courseService';

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [coursesError, setCoursesError] = useState(null);

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
      setEnrollments(data);
      return data;
    } catch {
      setEnrollments([]);
    } finally {
      setEnrollmentsLoading(false);
    }
  }, []);

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

  const value = {
    courses,
    enrollments,
    coursesLoading,
    enrollmentsLoading,
    coursesError,
    fetchCourses,
    fetchEnrollments,
    isEnrolled,
    getEnrollment,
    addEnrollment,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export default CourseContext;
