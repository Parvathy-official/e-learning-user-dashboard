// =========================================================
//  CourseGrid Component
// =========================================================

import CourseCard from './CourseCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import styles from './CourseGrid.module.css';

export default function CourseGrid({ courses = [], loading = false, error = null, onRetry, emptyTitle, emptyDescription }) {
  if (loading) {
    return <LoadingSkeleton count={6} type="card" />;
  }

  if (error) {
    return <ErrorState description={error} onRetry={onRetry} />;
  }

  if (!courses.length) {
    return (
      <EmptyState
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
        }
        title={emptyTitle || 'No courses found'}
        description={emptyDescription || 'Try adjusting your search or filters.'}
      />
    );
  }

  return (
    <div className={styles.grid}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
