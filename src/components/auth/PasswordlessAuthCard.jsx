// =========================================================
//  PasswordlessAuthCard — Reusable Passwordless Email OTP Form
// =========================================================

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';
import styles from './PasswordlessAuthCard.module.css';

export default function PasswordlessAuthCard({
  title = 'Verify Purchase Email',
  subtitle = 'Please verify the email you used during checkout to access your course.',
  initialEmail = '',
  actionText = 'Verify & Access Course',
  onSuccess,
}) {
  const { requestOtp, verifyOtp } = useAuth();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    setErrors({});

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrors({ email: 'Please enter your purchase email address' });
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    try {
      const res = await requestOtp(cleanEmail);
      toast.success(res?.message || 'Verification code sent to your email! ✉️');
      setStep(2);
      setResendTimer(60);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to send verification code. Please try again.';
      toast.error(msg);
      setErrors({ email: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setErrors({});

    const cleanOtp = otp.trim();
    if (!cleanOtp) {
      setErrors({ otp: 'Please enter the 6-digit verification code' });
      return;
    }
    if (cleanOtp.length < 4) {
      setErrors({ otp: 'Enter the full verification code' });
      return;
    }

    setLoading(true);
    try {
      const data = await verifyOtp({ email: email.trim().toLowerCase(), otp: cleanOtp });
      toast.success('Email verified successfully! 🎉');
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Invalid or expired verification code.';
      toast.error(msg);
      setErrors({ otp: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      </div>

      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleRequestOtp} className={styles.form} noValidate>
          <Input
            id="auth-card-email"
            label="Purchase Email Address"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({}); }}
            placeholder="e.g. alex@example.com"
            error={errors.email}
            required
            autoComplete="email"
            leftIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={loading}
            id="auth-card-request-btn"
          >
            Send Verification Code →
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className={styles.form} noValidate>
          <div className={styles.banner}>
            <span>Code sent to: <strong>{email}</strong></span>
            <button
              type="button"
              className={styles.changeBtn}
              onClick={() => { setStep(1); setOtp(''); setErrors({}); }}
            >
              Change
            </button>
          </div>

          <Input
            id="auth-card-otp"
            label="6-Digit Verification Code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); if (errors.otp) setErrors({}); }}
            placeholder="e.g. 123456"
            error={errors.otp}
            required
            autoFocus
            leftIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            }
          />

          <div className={styles.resendRow}>
            <span>Didn't receive code?</span>
            <button
              type="button"
              className={styles.resendBtn}
              disabled={resendTimer > 0 || loading}
              onClick={handleRequestOtp}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={loading}
            id="auth-card-verify-btn"
          >
            {actionText} →
          </Button>
        </form>
      )}

      <div className={styles.securityNote}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        <span>Passwordless 256-bit encrypted authentication</span>
      </div>
    </div>
  );
}
