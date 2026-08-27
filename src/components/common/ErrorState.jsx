// =========================================================
//  ErrorState Component
// =========================================================

import Button from './Button';
import styles from './ErrorState.module.css';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred. Please try again.',
  onRetry,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon} aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="md">
          Try Again
        </Button>
      )}
    </div>
  );
}
