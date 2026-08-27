// =========================================================
//  PaymentSuccess Page
// =========================================================

import { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import styles from './PaymentSuccess.module.css';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');
  const navigate = useNavigate();

  // Auto redirect after 10 seconds
  useEffect(() => {
    if (!courseId) return;
    const timer = setTimeout(() => navigate(`/course/${courseId}/learn`), 10000);
    return () => clearTimeout(timer);
  }, [courseId, navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.successIcon} aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.desc}>
          Congratulations! You now have full access to this course. Start learning right away.
        </p>

        <div className={styles.benefits}>
          {['Lifetime access granted', 'Watch on any device', 'Track your progress', 'Certificate on completion'].map((b) => (
            <div key={b} className={styles.benefit}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {b}
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          {courseId && (
            <Button variant="primary" size="lg" onClick={() => navigate(`/course/${courseId}/learn`)}>
              Start Learning Now →
            </Button>
          )}
          <Link to="/dashboard">
            <Button variant="outline" size="md">Go to Dashboard</Button>
          </Link>
        </div>

        {courseId && (
          <p className={styles.redirectNote}>Redirecting to your course in 10 seconds…</p>
        )}
      </div>
    </div>
  );
}
