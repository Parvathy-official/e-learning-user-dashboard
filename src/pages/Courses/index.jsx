// =========================================================
//  Courses Page — Course Marketplace
// =========================================================

import { useEffect, useState } from 'react';
import { useCourseContext } from '../../hooks/useCourses';
import CourseGrid from '../../components/course/CourseGrid';
import { MOCK_CATEGORIES } from '../../utils/mockData';
import styles from './Courses.module.css';

const SORT_OPTIONS = [
  { value: '', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Courses() {
  const { courses, coursesLoading, coursesError, fetchCourses } = useCourseContext();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchCourses({ search: debouncedSearch, category, sort });
  }, [debouncedSearch, category, sort, fetchCourses]);

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.heading}>Browse Courses</h1>
          <p className={styles.sub}>Explore {courses.length}+ courses across all skill levels</p>
        </div>
      </div>

      <div className={['container', styles.content].join(' ')}>
        {/* Filters bar */}
        <div className={styles.filters}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="course-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, topics, instructors…"
              className={styles.searchInput}
              aria-label="Search courses"
            />
          </div>

          {/* Sort */}
          <div className={styles.selectWrap}>
            <label htmlFor="sort-select" className="sr-only">Sort courses</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={styles.select}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className={styles.categories} role="group" aria-label="Filter by category">
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={[styles.catPill, category === cat ? styles.catActive : ''].join(' ')}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!coursesLoading && (
          <p className={styles.resultCount}>
            {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
          </p>
        )}

        {/* Course Grid */}
        <CourseGrid
          courses={courses}
          loading={coursesLoading}
          error={coursesError}
          onRetry={() => fetchCourses({ search: debouncedSearch, category, sort })}
          emptyTitle="No courses found"
          emptyDescription="Try a different search term or category."
        />
      </div>
    </div>
  );
}
