// =========================================================
//  CourseProgress Component (for enrolled course cards)
// =========================================================

import { Link } from 'react-router-dom';
import ProgressBar from '../common/ProgressBar';
import styles from './CourseProgress.module.css';

export default function CourseProgress({ course, enrollment }) {
  const { id, title, thumbnail, instructor, total_lessons } = course;
  const progress = enrollment?.progress_percentage ?? 0;
  const completedLessons = enrollment?.completed_lessons ?? [];
  const completedCount = completedLessons.length;
  const lastLessonId = enrollment?.last_watched_lesson;

  const targetLink = lastLessonId
    ? `/course/${id}/learn/${lastLessonId}`
    : `/course/${id}/learn`;

  return (
    <div className={styles.card}>
      <div className={styles.thumbWrap}>
        <img src={thumbnail} alt={title} className={styles.thumb} loading="lazy" />
      </div>
      <div className={styles.body}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.instructor}>{instructor}</p>
          </div>
          {progress === 100 && (
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)', background: 'var(--success-bg)', border: '1px solid rgba(16,185,129,0.3)', padding: '2px 8px', borderRadius: 9999 }}>
              ✓ Completed
            </span>
          )}
        </div>

        <div className={styles.progressArea}>
          <ProgressBar value={progress} showPercent size="sm" />
          <p className={styles.lessonCount}>
            {completedCount} of {total_lessons} lessons completed ({progress}%)
          </p>
        </div>

        <Link to={targetLink} className={styles.continueBtn}>
          {progress === 0 ? 'Start Learning →' : progress === 100 ? 'Review Course →' : 'Continue Learning →'}
        </Link>
      </div>
    </div>
  );
}
