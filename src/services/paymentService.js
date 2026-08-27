// =========================================================
//  Payment Service — Designed for Razorpay + Django backend
// =========================================================

import api from './api';
import { delay } from '../utils/helpers';

const USE_MOCK = true;

const paymentService = {
  /**
   * POST /api/payments/create-order/
   * Creates a payment order on the backend (Razorpay order ID)
   */
  async createOrder(courseId) {
    if (USE_MOCK) {
      await delay(800);
      return {
        order_id: `mock_order_${Date.now()}`,
        amount: 199900, // in paise (₹1999)
        currency: 'INR',
        key: 'rzp_test_mock',
      };
    }
    const { data } = await api.post('/payments/create-order/', { course_id: courseId });
    return data;
  },

  /**
   * POST /api/payments/verify/
   * Verifies payment signature with the backend
   * Backend must confirm payment; never trust the frontend alone
   */
  async verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature, course_id }) {
    if (USE_MOCK) {
      await delay(1000);
      // Simulate successful verification
      return { success: true, enrollment_id: `enroll_${Date.now()}` };
    }
    const { data } = await api.post('/payments/verify/', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      course_id,
    });
    return data;
  },

  /**
   * GET /api/payments/status/:orderId/
   * Checks payment status from backend
   */
  async getPaymentStatus(orderId) {
    if (USE_MOCK) {
      await delay(400);
      return { status: 'paid', course_id: '1' };
    }
    const { data } = await api.get(`/payments/status/${orderId}/`);
    return data;
  },

  /**
   * Opens Razorpay checkout modal
   * options must include: key, amount, currency, name, description, order_id, prefill, theme
   * handler is called with { razorpay_payment_id, razorpay_order_id, razorpay_signature }
   */
  openRazorpay(options) {
    return new Promise((resolve, reject) => {
      if (USE_MOCK) {
        // In mock mode, simulate a successful payment
        setTimeout(() => {
          resolve({
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_order_id: options.order_id,
            razorpay_signature: 'mock_signature',
          });
        }, 1500);
        return;
      }

      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded. Add the script tag to index.html.'));
        return;
      }
      const rzp = new window.Razorpay({
        ...options,
        handler: (response) => resolve(response),
      });
      rzp.on('payment.failed', (response) => reject(new Error(response.error.description)));
      rzp.open();
    });
  },
};

export default paymentService;
