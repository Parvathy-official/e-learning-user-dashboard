// =========================================================
//  NotFound Page (404)
// =========================================================

import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.codeWrap}>
          <span className={styles.code}>404</span>
        </div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          The page you are looking for doesn't exist, was removed, or is temporarily unavailable.
        </p>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Link to="/courses">
            <Button variant="outline" size="md">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
