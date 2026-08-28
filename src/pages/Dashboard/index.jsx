// =========================================================
//  Dashboard Page
// =========================================================

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import { MOCK_COURSES, MOCK_RECENT_ACTIVITY } from '../../utils/mockData';
import StatCard from '../../components/dashboard/StatCard';
import CourseProgress from '../../components/course/CourseProgress';
import ProgressBar from '../../components/common/ProgressBar';
import { overallProgress } from '../../utils/helpers';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { enrollments, enrollmentsLoading, fetchEnrollments } = useCourseContext();

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const enrolledCourses = MOCK_COURSES.filter((c) =>
    enrollments.some((e) => e.course_id === c.id)
  );
  const completed = enrollments.filter((e) => e.progress_percentage === 100).length;
  const inProgress = enrollments.filter((e) => e.progress_percentage > 0 && e.progress_percentage < 100).length;
  const progress = overallProgress(enrollments);

  return (
    <div className={styles.page}>
      <div className="container">

        {/* Welcome Banner */}
        <div className={styles.welcome}>
          <div className={styles.welcomeLeft}>
            <h1 className={styles.welcomeTitle}>
              Welcome back, {currentUser?.name?.split(' ')[0]} 👋
            </h1>
            <p className={styles.welcomeSub}>
              You're mastering high-ROAS media buying & growth engineering.
            </p>
          </div>
          <div className={styles.welcomeProgress}>
            <p className={styles.progressLabel}>Curriculum Progress</p>
            <ProgressBar value={progress} showPercent size="lg" />
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
            label="Programs Enrolled"
            value={enrollments.length}
            sub="Active masterclasses"
            color="primary"
          />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            label="In Progress"
            value={inProgress}
            sub="Active learning modules"
            color="warning"
          />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}
            label="Completed"
            value={completed}
            sub="Graduated tracks"
            color="success"
          />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>}
            label="Overall Progress"
            value={`${progress}%`}
            sub="Across all masterclasses"
            color="primary"
          />
        </div>

        {/* Continue Learning */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Continue Learning</h2>
            <Link to="/my-courses" className={styles.seeAll}>View all →</Link>
          </div>

          {enrollmentsLoading ? (
            <div className={styles.loadingText}>Loading your programs…</div>
          ) : enrolledCourses.length === 0 ? (
            <div className={styles.emptyState}>
              <p>You haven't enrolled in any programs yet.</p>
              <Link to="/courses" className={styles.exploreLink}>Explore Flagship Programs →</Link>
            </div>
          ) : (
            <div className={styles.coursesList}>
              {enrolledCourses.map((course) => {
                const enrollment = enrollments.find((e) => e.course_id === course.id);
                return <CourseProgress key={course.id} course={course} enrollment={enrollment} />;
              })}
            </div>
          )}
        </section>

        {/* Recent Activity */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
          </div>

          <div className={styles.activityList}>
            {MOCK_RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityLesson}>{item.lesson_title}</p>
                  <p className={styles.activityCourse}>{item.course_title}</p>
                </div>
                <span className={styles.activityTime}>{item.watched_at}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
