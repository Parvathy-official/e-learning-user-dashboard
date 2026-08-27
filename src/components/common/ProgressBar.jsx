// =========================================================
//  ProgressBar Component
// =========================================================

import styles from './ProgressBar.module.css';

export default function ProgressBar({ value = 0, label, showPercent = false, variant = 'primary', size = 'md' }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={styles.wrapper}>
      {(label || showPercent) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showPercent && <span className={styles.percent}>{clamped}%</span>}
        </div>
      )}
      <div className={[styles.track, styles[size]].join(' ')} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={[styles.fill, styles[variant]].join(' ')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
