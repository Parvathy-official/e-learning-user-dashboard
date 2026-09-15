// =========================================================
//  My Learning Page — Simple Paid Online Course Platform
// =========================================================

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import { MOCK_COURSES } from '../../utils/mockData';
import { getInitials } from '../../utils/helpers';
import CourseProgress from '../../components/course/CourseProgress';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import styles from './MyCourses.module.css';

export default function MyCourses() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { enrollments, enrollmentsLoading, fetchEnrollments, courses } = useCourseContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Failed to logout');
    }
  };

  const allCourses = courses.length > 0 ? courses : MOCK_COURSES;
  const enrolledCourses = allCourses.filter((c) =>
    enrollments.some((e) => String(e.course_id) === String(c.id))
  );

  return (
    <div className={styles.page}>
      <div className="container">
        {/* User Account Bar & Logout */}
        <div className={styles.userBar}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} />
              ) : (
                <span>{getInitials(currentUser?.name || currentUser?.email || 'User')}</span>
              )}
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userNameRow}>
                <span className={styles.userName}>{currentUser?.name || 'Student Account'}</span>
                <span className={styles.userBadge}>Active Student</span>
              </div>
              <span className={styles.userEmail}>{currentUser?.email || 'Logged in'}</span>
            </div>
          </div>

          <div className={styles.userActions}>
            <Link to="/" className={styles.homeBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Explore Masterclass</span>
            </Link>

            <button onClick={handleLogout} className={styles.logoutBtn} title="Sign Out of your account">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>

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

