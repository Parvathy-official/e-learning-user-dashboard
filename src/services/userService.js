// =========================================================
//  User Service — GET/PATCH /api/users/...
// =========================================================

import api from './api';
import { delay } from '../utils/helpers';
import { MOCK_USER, MOCK_RECENT_ACTIVITY } from '../utils/mockData';

const USE_MOCK = true;

const userService = {
  /**
   * GET /api/users/profile/
   */
  async getProfile() {
    if (USE_MOCK) {
      await delay(400);
      return MOCK_USER;
    }
    const { data } = await api.get('/users/profile/');
    return data;
  },

  /**
   * PATCH /api/users/profile/
   */
  async updateProfile(profileData) {
    if (USE_MOCK) {
      await delay(600);
      return { ...MOCK_USER, ...profileData };
    }
    const { data } = await api.patch('/users/profile/', profileData);
    return data;
  },

  /**
   * GET /api/users/activity/
   */
  async getRecentActivity() {
    if (USE_MOCK) {
      await delay(400);
      return MOCK_RECENT_ACTIVITY;
    }
    const { data } = await api.get('/users/activity/');
    return data;
  },

  /**
   * POST /api/users/change-password/
   */
  async changePassword({ current_password, new_password }) {
    if (USE_MOCK) {
      await delay(700);
      return { success: true };
    }
    const { data } = await api.post('/users/change-password/', {
      current_password,
      new_password,
    });
    return data;
  },
};

export default userService;
