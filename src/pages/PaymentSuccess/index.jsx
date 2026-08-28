// =========================================================
//  PaymentSuccess Page — Simple Paid Online Course Platform
// =========================================================

import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCourseContext } from '../../hooks/useCourses';
import Button from '../../components/common/Button';
import styles from './PaymentSuccess.module.css';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');
  const orderId = searchParams.get('orderId');
  const { courses } = useCourseContext();
  const navigate = useNavigate();

  const currentCourse = courses.find((c) => String(c.id) === String(courseId));

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
          Thank you! You now have full lifetime access to {currentCourse ? <strong>{currentCourse.title}</strong> : 'your course'}.
        </p>

        {orderId && (
          <div style={{ background: '#080D12', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 16px', margin: '0 0 24px', display: 'inline-block' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Order Reference: </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace' }}>{orderId}</span>
          </div>
        )}

        <div className={styles.benefits}>
          {['Instant access to all lessons', 'Progress tracked automatically', 'Lifetime access & updates', 'Certificate upon completion'].map((b) => (
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
          <Link to="/my-learning">
            <Button variant="outline" size="lg">Go to My Learning</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
