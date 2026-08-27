// =========================================================
//  StatCard Component (Dashboard)
// =========================================================

import styles from './StatCard.module.css';

export default function StatCard({ icon, label, value, sub, color = 'primary' }) {
  return (
    <div className={styles.card}>
      <div className={[styles.iconWrap, styles[color]].join(' ')} aria-hidden="true">
        {icon}
      </div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
        {sub && <p className={styles.sub}>{sub}</p>}
      </div>
    </div>
  );
}
