// =========================================================
//  Helper Utilities
// =========================================================

/**
 * Format price in INR
 */
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate discount percentage
 */
export const discountPercent = (original, discounted) => {
  if (!original || !discounted) return 0;
  return Math.round(((original - discounted) / original) * 100);
};

/**
 * Truncate text to given word count
 */
export const truncateText = (text = '', maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
};

/**
 * Format duration string (e.g. "38h 20m")
 */
export const formatDuration = (duration) => duration || '—';

/**
 * Format a number with k/M suffix
 */
export const formatCount = (n = 0) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
};

/**
 * Get total enrolled lessons count from enrollment
 */
export const getCompletedCount = (enrollment) =>
  enrollment?.completed_lessons?.length ?? 0;

/**
 * Compute overall progress across multiple enrollments
 */
export const overallProgress = (enrollments = []) => {
  if (!enrollments.length) return 0;
  const total = enrollments.reduce((sum, e) => sum + (e.progress_percentage || 0), 0);
  return Math.round(total / enrollments.length);
};

/**
 * Get first letters for avatar fallback
 */
export const getInitials = (name = '') =>
  name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

/**
 * Delay utility
 */
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Generate a random ID (for optimistic UI, not production IDs)
 */
export const uid = () => Math.random().toString(36).slice(2);
