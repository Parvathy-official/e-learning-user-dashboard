// =========================================================
//  CourseCard Component
// =========================================================

import { Link } from 'react-router-dom';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import { formatPrice, discountPercent } from '../../utils/helpers';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  const {
    id,
    title,
    description,
    thumbnail,
    instructor,
    category,
    price,
    discounted_price,
    rating,
    total_ratings,
    total_lessons,
    duration,
    level,
    is_bestseller,
  } = course;

  const discount = discountPercent(price, discounted_price);

  return (
    <Link to={`/courses/${id}`} className={styles.card} aria-label={`View ${title}`}>
      {/* Thumbnail */}
      <div className={styles.thumbWrap}>
        <img src={thumbnail} alt={title} className={styles.thumb} loading="lazy" />
        {is_bestseller && (
          <div className={styles.bestsellerBadge}>
            <Badge variant="bestseller">⭐ Flagship Masterclass</Badge>
          </div>
        )}
        {discount > 0 && (
          <div className={styles.discountBadge}>
            <span className={styles.discountText}>-{discount}%</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <p className={styles.instructor}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          {instructor} • <span style={{ color: 'var(--primary)', fontWeight: 600 }}>$35M+ Verified</span>
        </p>

        <div className={styles.meta}>
          <Rating value={rating} count={total_ratings} size="sm" />
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {total_lessons} lessons
          </span>
          <span className={styles.stat}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            {duration}
          </span>
          {level && (
            <span className={styles.stat}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />
              </svg>
              {level}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, margin: '6px 0 12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', background: '#080D12', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
            📁 25+ SOPs
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', background: '#080D12', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
            📜 Certificate
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', background: '#080D12', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
            💬 Live Q&A
          </span>
        </div>

        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>{formatPrice(discounted_price || price)}</span>
            {discounted_price && discounted_price < price && (
              <span className={styles.originalPrice}>{formatPrice(price)}</span>
            )}
          </div>
          <span className={styles.cta}>Explore Syllabus & Enroll →</span>
        </div>
      </div>
    </Link>
  );
}
