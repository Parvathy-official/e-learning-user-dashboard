// =========================================================
//  Course Service — GET /api/courses/...
// =========================================================

import api from './api';
import { delay } from '../utils/helpers';
import { MOCK_COURSES, MOCK_ENROLLMENTS } from '../utils/mockData';

const USE_MOCK = true;

const courseService = {
  /**
   * GET /api/courses/
   * Returns list of all public courses
   */
  async getCourses(params = {}) {
    if (USE_MOCK) {
      await delay(600);
      let courses = [...MOCK_COURSES];
      if (params.category && params.category !== 'All' && params.category !== 'All Programs') {
        courses = courses.filter((c) => c.category === params.category);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        courses = courses.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.instructor.toLowerCase().includes(q)
        );
      }
      if (params.sort === 'price_asc') courses.sort((a, b) => a.discounted_price - b.discounted_price);
      if (params.sort === 'price_desc') courses.sort((a, b) => b.discounted_price - a.discounted_price);
      if (params.sort === 'rating') courses.sort((a, b) => b.rating - a.rating);
      return { results: courses, count: courses.length };
    }
    const { data } = await api.get('/courses/', { params });
    return data;
  },

  /**
   * GET /api/courses/:id/
   */
  async getCourseById(id) {
    if (USE_MOCK) {
      await delay(400);
      const course = MOCK_COURSES.find((c) => c.id === id);
      if (!course) throw new Error('Course not found');
      return course;
    }
    const { data } = await api.get(`/courses/${id}/`);
    return data;
  },

  /**
   * GET /api/courses/:id/access/
   * Returns whether the current user is enrolled
   */
  async checkCourseAccess(courseId) {
    if (USE_MOCK) {
      await delay(300);
      const enrollment = MOCK_ENROLLMENTS.find((e) => e.course_id === courseId);
      return { has_access: !!enrollment, enrollment: enrollment || null };
    }
    const { data } = await api.get(`/courses/${courseId}/access/`);
    return data;
  },

  /**
   * GET /api/courses/:courseId/lessons/:lessonId/video/
   * Returns a short-lived signed video URL — NEVER hardcode video URLs
   */
  async getVideoUrl(courseId, lessonId) {
    if (USE_MOCK) {
      await delay(500);
      // Mock: use a public sample video for development only
      return {
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
      };
    }
    const { data } = await api.get(`/courses/${courseId}/lessons/${lessonId}/video/`);
    return data;
  },

  /**
   * GET /api/enrollments/my/
   */
  async getMyEnrollments() {
    if (USE_MOCK) {
      await delay(500);
      return MOCK_ENROLLMENTS;
    }
    const { data } = await api.get('/enrollments/my/');
    return data;
  },

  /**
   * POST /api/courses/:courseId/lessons/:lessonId/complete/
   */
  async markLessonComplete(courseId, lessonId) {
    if (USE_MOCK) {
      await delay(200);
      return { success: true };
    }
    const { data } = await api.post(`/courses/${courseId}/lessons/${lessonId}/complete/`);
    return data;
  },
};

export default courseService;
