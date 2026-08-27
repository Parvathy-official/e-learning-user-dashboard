// =========================================================
//  LoadingSkeleton Component
// =========================================================

import styles from './LoadingSkeleton.module.css';

export function SkeletonBox({ width, height, className = '' }) {
  return (
    <div
      className={[styles.skeleton, className].filter(Boolean).join(' ')}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className={styles.card}>
      <SkeletonBox className={styles.thumb} />
      <div className={styles.body}>
        <SkeletonBox className={styles.line} width="40%" height="14px" />
        <SkeletonBox className={styles.line} height="20px" />
        <SkeletonBox className={styles.line} width="80%" height="16px" />
        <SkeletonBox className={styles.line} width="60%" height="14px" />
        <div className={styles.row}>
          <SkeletonBox width="80px" height="14px" />
          <SkeletonBox width="60px" height="14px" />
        </div>
        <SkeletonBox className={styles.price} width="100px" height="24px" />
      </div>
    </div>
  );
}

export function CourseDetailSkeleton() {
  return (
    <div className={styles.detailWrapper}>
      <SkeletonBox className={styles.detailThumb} />
      <div className={styles.detailBody}>
        <SkeletonBox height="36px" width="80%" />
        <SkeletonBox height="20px" width="50%" />
        <SkeletonBox height="20px" width="40%" />
        <SkeletonBox height="48px" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  if (type === 'card') {
    return (
      <div className={styles.grid}>
        {Array.from({ length: count }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return <CourseDetailSkeleton />;
}
