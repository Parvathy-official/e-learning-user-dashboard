// =========================================================
//  MyCourses Page
// =========================================================

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseContext } from '../../hooks/useCourses';
import { MOCK_COURSES } from '../../utils/mockData';
import CourseProgress from '../../components/course/CourseProgress';
import EmptyState from '../../components/common/EmptyState';
import styles from './MyCourses.module.css';

export default function MyCourses() {
  const { enrollments, enrollmentsLoading, fetchEnrollments } = useCourseContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const enrolledCourses = MOCK_COURSES.filter((c) =>
    enrollments.some((e) => e.course_id === c.id)
  );

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>My Programs</h1>
          <p className={styles.sub}>
            {enrolledCourses.length} {enrolledCourses.length === 1 ? 'masterclass' : 'masterclasses'} enrolled
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            }
            title="No enrolled programs yet"
            description="You haven't enrolled in any flagship masterclasses yet. Explore our performance marketing tracks to scale your media buying."
            actionLabel="Explore Programs"
            onAction={() => navigate('/courses')}
          />
        ) : (
          <div className={styles.coursesList}>
            {enrolledCourses.map((course) => {
              const enrollment = enrollments.find((e) => e.course_id === course.id);
              return <CourseProgress key={course.id} course={course} enrollment={enrollment} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
