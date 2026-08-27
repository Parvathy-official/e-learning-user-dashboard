// =========================================================
//  PaymentFailed Page
// =========================================================

import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import styles from './PaymentFailed.module.css';

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.errorIcon} aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h1 className={styles.title}>Payment Failed</h1>
        <p className={styles.desc}>
          We couldn't process your transaction. No charges were made to your account.
        </p>

        <div className={styles.reasons}>
          <p className={styles.reasonsTitle}>Common reasons:</p>
          <ul>
            <li>Card limit exceeded or insufficient balance</li>
            <li>Authentication / OTP expired or cancelled</li>
            <li>Temporary bank server downtime</li>
          </ul>
        </div>

        <div className={styles.actions}>
          {courseId ? (
            <Button variant="primary" size="lg" onClick={() => navigate(`/checkout/${courseId}`)}>
              Retry Payment
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={() => navigate('/courses')}>
              Explore Courses
            </Button>
          )}
          <Link to="/courses">
            <Button variant="outline" size="md">Back to Catalog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
