// =========================================================
//  My Learning Page — Simple Paid Online Course Platform
// =========================================================

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCourseContext } from '../../hooks/useCourses';
import { MOCK_COURSES } from '../../utils/mockData';
import CourseProgress from '../../components/course/CourseProgress';
import EmptyState from '../../components/common/EmptyState';
import styles from './MyCourses.module.css';

export default function MyCourses() {
  const { enrollments, enrollmentsLoading, fetchEnrollments, courses } = useCourseContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const allCourses = courses.length > 0 ? courses : MOCK_COURSES;
  const enrolledCourses = allCourses.filter((c) =>
    enrollments.some((e) => String(e.course_id) === String(c.id))
  );

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>My Learning</h1>
          <p className={styles.sub}>
            Pick up right where you left off. All your purchased courses with automatic progress tracking.
          </p>
        </div>

        {enrollmentsLoading ? (
          <div className={styles.loading}>
            {[1, 2].map((i) => (
              <div key={i} className={styles.skeletonCard} aria-hidden="true">
                <div className={styles.skeletonThumb} />
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className={styles.skeletonLine} style={{ width: '70%', height: '16px' }} />
                  <div className={styles.skeletonLine} style={{ width: '50%', height: '12px' }} />
                  <div className={styles.skeletonLine} style={{ height: '6px' }} />
                  <div className={styles.skeletonLine} style={{ width: '80px', height: '12px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : enrolledCourses.length === 0 ? (
          <EmptyState
            icon={
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            }
            title="You haven't enrolled in any courses yet"
            description="Explore our available masterclasses to start learning practical, actionable skills today."
            actionLabel="Browse Available Courses"
            onAction={() => navigate('/')}
          />
        ) : (
          <div className={styles.coursesList}>
            {enrolledCourses.map((course) => {
              const enrollment = enrollments.find((e) => String(e.course_id) === String(course.id));
              return <CourseProgress key={course.id} course={course} enrollment={enrollment} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
