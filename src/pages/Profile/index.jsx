// =========================================================
//  Profile Page
// =========================================================

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCourseContext } from '../../hooks/useCourses';
import userService from '../../services/userService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { getInitials } from '../../utils/helpers';
import toast from 'react-hot-toast';
import styles from './Profile.module.css';

export default function Profile() {
  const { currentUser, updateUser, logout } = useAuth();
  const { enrollments } = useCourseContext();

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'security'

  // General profile state
  const [name, setName] = useState(currentUser?.name || '');
  const [email] = useState(currentUser?.email || '');
  const [bio, setBio] = useState(currentUser?.bio || 'Passionate software learner & builder.');
  const [profileSaving, setProfileSaving] = useState(false);

  // Security state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSaving, setPasswordSaving] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    setProfileSaving(true);
    try {
      const updated = await userService.updateProfile({ name: name.trim(), bio });
      updateUser(updated);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!passwordForm.currentPassword) errs.currentPassword = 'Required';
    if (!passwordForm.newPassword) errs.newPassword = 'Required';
    else if (passwordForm.newPassword.length < 8) errs.newPassword = 'Must be at least 8 characters';
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errs).length > 0) {
      setPasswordErrors(errs);
      return;
    }

    setPasswordSaving(true);
    setPasswordErrors({});
    try {
      await userService.changePassword({
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword,
      });
      toast.success('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.sub}>Manage your personal information, security, and learning preferences.</p>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.userCard}>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className={styles.avatar} />
              ) : (
                <div className={styles.avatarFallback}>{getInitials(currentUser?.name)}</div>
              )}
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{currentUser?.name}</h2>
                <p className={styles.userEmail}>{currentUser?.email}</p>
                <span className={styles.badge}>Student Account</span>
              </div>
            </div>

            <div className={styles.navMenu} role="tablist">
              <button
                className={[styles.navBtn, activeTab === 'general' ? styles.navActive : ''].join(' ')}
                onClick={() => setActiveTab('general')}
                role="tab"
                aria-selected={activeTab === 'general'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                General Information
              </button>

              <button
                className={[styles.navBtn, activeTab === 'security' ? styles.navActive : ''].join(' ')}
                onClick={() => setActiveTab('security')}
                role="tab"
                aria-selected={activeTab === 'security'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Security & Password
              </button>
            </div>

            <div className={styles.statsSummary}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Enrolled Courses</span>
                <span className={styles.statVal}>{enrollments.length}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Member Since</span>
                <span className={styles.statVal}>{currentUser?.joined || 'March 2024'}</span>
              </div>
            </div>

            <button className={styles.logoutBtn} onClick={logout}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out
            </button>
          </aside>

          {/* Main content pane */}
          <main className={styles.content}>
            {activeTab === 'general' && (
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Profile Information</h2>
                <p className={styles.panelDesc}>Update your display name, bio, and contact preferences.</p>

                <form onSubmit={handleProfileSubmit} className={styles.form}>
                  <Input
                    id="profile-name"
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <Input
                    id="profile-email"
                    label="Email Address"
                    value={email}
                    disabled
                    hint="Email cannot be changed directly for security reasons."
                  />

                  <div className={styles.textareaGroup}>
                    <label htmlFor="profile-bio" className={styles.label}>
                      Bio
                    </label>
                    <textarea
                      id="profile-bio"
                      className={styles.textarea}
                      rows="4"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us a little about your learning journey..."
                    />
                  </div>

                  <div className={styles.formActions}>
                    <Button type="submit" variant="primary" loading={profileSaving}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Security & Password</h2>
                <p className={styles.panelDesc}>Ensure your account is using a long, random password to stay secure.</p>

                <form onSubmit={handlePasswordSubmit} className={styles.form}>
                  <Input
                    id="curr-pass"
                    type="password"
                    label="Current Password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    error={passwordErrors.currentPassword}
                    placeholder="Enter current password"
                    required
                  />

                  <Input
                    id="new-pass"
                    type="password"
                    label="New Password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    error={passwordErrors.newPassword}
                    placeholder="Min. 8 characters"
                    required
                  />

                  <Input
                    id="confirm-pass"
                    type="password"
                    label="Confirm New Password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    error={passwordErrors.confirmPassword}
                    placeholder="Repeat new password"
                    required
                  />

                  <div className={styles.formActions}>
                    <Button type="submit" variant="primary" loading={passwordSaving}>
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
