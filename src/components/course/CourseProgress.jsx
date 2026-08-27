// =========================================================
//  CourseProgress Component (for enrolled course cards)
// =========================================================

import { Link } from 'react-router-dom';
import ProgressBar from '../common/ProgressBar';
import styles from './CourseProgress.module.css';

export default function CourseProgress({ course, enrollment }) {
  const { id, title, thumbnail, instructor, total_lessons } = course;
  const { progress_percentage, completed_lessons, last_watched_lesson } = enrollment;
  const completedCount = completed_lessons?.length ?? 0;

  return (
    <div className={styles.card}>
      <div className={styles.thumbWrap}>
        <img src={thumbnail} alt={title} className={styles.thumb} loading="lazy" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.instructor}>{instructor}</p>

        {last_watched_lesson && (
          <p className={styles.lastLesson}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            Last watched: <em>{last_watched_lesson.title}</em>
          </p>
        )}

        <div className={styles.progressArea}>
          <ProgressBar value={progress_percentage} showPercent size="sm" />
          <p className={styles.lessonCount}>
            {completedCount} / {total_lessons} lessons completed
          </p>
        </div>

        <Link to={`/course/${id}/learn`} className={styles.continueBtn}>
          {progress_percentage === 0 ? 'Start Learning' : 'Continue Learning'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
