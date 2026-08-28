// =========================================================
//  Checkout Page
// =========================================================

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import courseService from '../../services/courseService';
import paymentService from '../../services/paymentService';
import Button from '../../components/common/Button';
import { formatPrice, discountPercent } from '../../utils/helpers';
import toast from 'react-hot-toast';
import styles from './Checkout.module.css';

export default function Checkout() {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const { addEnrollment, addPurchase } = useCourseContext();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    courseService.getCourseById(courseId).then(setCourse).catch(() => navigate('/')).finally(() => setLoading(false));
  }, [courseId, navigate]);

  const handlePayment = async () => {
    setPaying(true);
    try {
      // Step 1: Create order on backend / mock
      const order = await paymentService.createOrder(courseId);

      // Step 2: Open payment modal
      const paymentResult = await paymentService.openRazorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: 'LearnFlow',
        description: course?.title,
        order_id: order.order_id,
        prefill: { name: currentUser?.name, email: currentUser?.email },
        theme: { color: '#06B6D4' },
      });

      // Step 3: Verify payment
      const verification = await paymentService.verifyPayment({
        razorpay_order_id: paymentResult.razorpay_order_id,
        razorpay_payment_id: paymentResult.razorpay_payment_id,
        razorpay_signature: paymentResult.razorpay_signature,
        course_id: courseId,
      });

      if (verification.success) {
        const orderRef = `LF-${Date.now().toString().slice(-6)}`;
        const finalPrice = course?.discounted_price || course?.price || 4999;

        // Step 4: Record purchase in state & localStorage
        addPurchase({
          id: orderRef,
          course_id: courseId,
          course_title: course?.title,
          purchase_date: new Date().toISOString(),
          amount: finalPrice,
          status: 'paid',
          payment_method: 'Card / Online Payment',
        });

        // Step 5: Update enrollment state
        addEnrollment({
          course_id: courseId,
          progress_percentage: 0,
          completed_lessons: [],
          last_watched_lesson: course?.modules?.[0]?.lessons?.[0]?.id || '101',
          last_position_seconds: 0,
        });

        toast.success('Payment successful! Access granted! 🎉');
        navigate(`/payment-success?course=${courseId}&orderId=${orderRef}`);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err) {
      toast.error(err.message || 'Payment failed. Please try again.');
      navigate(`/payment/failed?course=${courseId}`);
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!course) return null;

  const discount = discountPercent(course.price, course.discounted_price);
  const final = course.discounted_price || course.price;
  const savings = course.price - final;

  return (
    <div className={styles.page}>
      <div className={['container', styles.layout].join(' ')}>

        {/* Order Summary */}
        <div className={styles.summary}>
          <h1 className={styles.heading}>Order Summary</h1>
          <div className={styles.courseCard}>
            <img src={course.thumbnail} alt={course.title} className={styles.thumb} />
            <div className={styles.courseInfo}>
              <p className={styles.courseCategory}>{course.category}</p>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.courseInstructor}>by {course.instructor}</p>
              <div className={styles.courseMeta}>
                <span>{course.total_lessons} lessons</span>
                <span>•</span>
                <span>{course.duration}</span>
                <span>•</span>
                <span>{course.level}</span>
              </div>
            </div>
          </div>

          <div className={styles.priceBreakdown}>
            <div className={styles.priceRow}>
              <span>Original price</span>
              <span className={styles.strikethrough}>{formatPrice(course.price)}</span>
            </div>
            {discount > 0 && (
              <div className={[styles.priceRow, styles.discount].join(' ')}>
                <span>Discount ({discount}% off)</span>
                <span>- {formatPrice(savings)}</span>
              </div>
            )}
            <div className={[styles.priceRow, styles.total].join(' ')}>
              <span>Total</span>
              <span>{formatPrice(final)}</span>
            </div>
          </div>
        </div>

        {/* Payment Panel */}
        <div className={styles.paymentPanel}>
          <h2 className={styles.paymentTitle}>Complete Payment</h2>

          <div className={styles.userInfo}>
            <p className={styles.userInfoLabel}>Purchasing as</p>
            <p className={styles.userName}>{currentUser?.name}</p>
            <p className={styles.userEmail}>{currentUser?.email}</p>
          </div>

          <div className={styles.totalBox}>
            <span className={styles.totalLabel}>Amount to pay</span>
            <span className={styles.totalAmount}>{formatPrice(final)}</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={paying}
            onClick={handlePayment}
            id="pay-now-btn"
          >
            {paying ? 'Processing…' : `Pay ${formatPrice(final)}`}
          </Button>

          <div className={styles.guarantees}>
            {[
              { icon: '🔒', text: 'Secure payment processing' },
              { icon: '↩️', text: '30-day money-back guarantee' },
              { icon: '♾️', text: 'Lifetime access after purchase' },
            ].map((g) => (
              <div key={g.text} className={styles.guarantee}>
                <span>{g.icon}</span>
                <span>{g.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
