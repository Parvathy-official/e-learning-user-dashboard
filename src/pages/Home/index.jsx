// =========================================================
//  Home Page — Course Discovery
// =========================================================

import { useEffect } from 'react';
import { useCourseContext } from '../../hooks/useCourses';
import CourseCard from '../../components/course/CourseCard';
import { CourseCardSkeleton } from '../../components/common/LoadingSkeleton';
import { MOCK_COURSES } from '../../utils/mockData';
import styles from './Home.module.css';

export default function Home() {
  const { courses, coursesLoading, fetchCourses } = useCourseContext();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const allCourses = courses && courses.length > 0 ? courses : MOCK_COURSES;

  return (
    <div className={styles.page}>
      <div className="container">
        {/* ── Minimal Header ── */}
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Featured Masterclass
          </div>
          <h1 className={styles.headline}>
            Performance Marketing & Paid Media Buying
          </h1>
          <p className={styles.subtext}>
            Master campaign scaling, creative strategy, and ROAS optimization with step-by-step masterclasses.
          </p>
        </header>

        {/* ── Course Display ── */}
        <section className={styles.courseSection} aria-label="Available Courses">
          {coursesLoading ? (
            <div className={styles.courseGrid}>
              {[1].map((i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : allCourses.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>No courses currently available.</p>
            </div>
          ) : (
            <div className={allCourses.length === 1 ? styles.singleCourseWrap : styles.courseGrid}>
              {allCourses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

