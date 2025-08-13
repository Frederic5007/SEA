import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, User, Mail, Lock, Facebook, Eye, EyeOff } from 'lucide-react';
import './AuthModal.css';
import { useAuth } from '../../context/AuthContext';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.96 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
  exit: { y: 20, opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } }
};

const contentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } }
};

function AuthModal({ isOpen, onClose, navigate }) {
  const [activeTab, setActiveTab] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register, googleAuth, facebookAuth } = useAuth();

  const handleSuccessfulAuth = (user) => {
    onClose();
    // Redirect based on user role
    if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'employee') {
      navigate('/employee');
    } else {
      navigate('/account/profile');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="auth-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="auth-decor decor-1" />
            <div className="auth-decor decor-2" />
            <div className="auth-header">
              <div className="auth-title-wrap">
                <h3 className="auth-title">Welcome to SEA</h3>
                <p className="auth-subtitle">Sign up or log in to start tracking</p>
              </div>
              <button className="auth-close" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="auth-tabs" role="tablist">
              <button
                className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
                role="tab"
                aria-selected={activeTab === 'signup'}
              >
                Sign Up
                {activeTab === 'signup' && (
                  <motion.div layoutId="tab-underline" className="tab-underline" />
                )}
              </button>
              <button
                className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
                role="tab"
                aria-selected={activeTab === 'login'}
              >
                Log In
                {activeTab === 'login' && (
                  <motion.div layoutId="tab-underline" className="tab-underline" />
                )}
              </button>
            </div>

                          <div className="auth-body">
                {error && (
                  <div className="auth-error" style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    {error}
                  </div>
                )}
                
                <div className="auth-social">
                  <button 
                    className="social-btn" 
                    onClick={async () => {
                      setLoading(true);
                      setError('');
                      try {
                        // Initialize Google Sign-In
                        if (window.google) {
                          const auth2 = window.google.auth2.getAuthInstance();
                          if (!auth2) {
                            await window.google.auth2.init({
                              client_id: 'your-google-client-id' // Replace with your actual client ID
                            });
                          }
                          
                          const googleUser = await window.google.auth2.getAuthInstance().signIn();
                          const accessToken = googleUser.getAuthResponse().access_token;
                          
                          const result = await googleAuth(accessToken);
                          if (result.success) {
                            handleSuccessfulAuth(result.user);
                          } else {
                            setError(result.error);
                          }
                        } else {
                          setError('Google Sign-In not available. Please check your internet connection.');
                        }
                      } catch (error) {
                        setError('Google authentication failed. Please try again.');
                        console.error('Google auth error:', error);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                  >
                    <span className="social-icon">
                      <img src="https://www.google.com/favicon.ico" alt="" width="16" height="16" />
                    </span>
                    {loading ? 'Connecting...' : 'Continue with Google'}
                  </button>
                  <button 
                    className="social-btn" 
                    onClick={async () => {
                      setLoading(true);
                      setError('');
                      try {
                        // Initialize Facebook Login
                        if (window.FB) {
                          window.FB.login(async (response) => {
                            if (response.authResponse) {
                              const accessToken = response.authResponse.accessToken;
                              const result = await facebookAuth(accessToken);
                              if (result.success) {
                                handleSuccessfulAuth(result.user);
                              } else {
                                setError(result.error);
                              }
                            } else {
                              setError('Facebook login was cancelled.');
                            }
                            setLoading(false);
                          }, { scope: 'email,public_profile' });
                        } else {
                          setError('Facebook Login not available. Please check your internet connection.');
                          setLoading(false);
                        }
                      } catch (error) {
                        setError('Facebook authentication failed. Please try again.');
                        console.error('Facebook auth error:', error);
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                  >
                    <span className="social-icon"><Facebook size={18} /></span>
                    {loading ? 'Connecting...' : 'Continue with Facebook'}
                  </button>
                </div>

                <div className="divider">
                  <span>or</span>
                </div>

              <AnimatePresence mode="wait">
                {activeTab === 'signup' ? (
                  <motion.div
                    key="signup"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <SignUpForm 
                      showPassword={showPassword} 
                      setShowPassword={setShowPassword} 
                      loading={loading}
                      onAuth={async (payload) => {
                        setLoading(true);
                        setError('');
                        const result = await register(payload);
                        if (result.success) {
                          handleSuccessfulAuth(result.user);
                        } else {
                          setError(result.error);
                        }
                        setLoading(false);
                      }} 
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="login"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <LoginForm 
                      showPassword={showPassword} 
                      setShowPassword={setShowPassword} 
                      loading={loading}
                      onAuth={async (payload) => {
                        setLoading(true);
                        setError('');
                        const result = await login(payload);
                        if (result.success) {
                          handleSuccessfulAuth(result.user);
                        } else {
                          setError(result.error);
                        }
                        setLoading(false);
                      }} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SignUpForm({ showPassword, setShowPassword, loading, onAuth }) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear error when user starts typing
    if (passwordError) setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Clear error when user starts typing
    if (passwordError) setPasswordError('');
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const showSuccess = passwordsMatch && password.length >= 6;

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { strength: '', text: '' };
    if (pass.length < 6) return { strength: 'weak', text: 'Too short' };
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (score <= 2) return { strength: 'weak', text: 'Weak password' };
    if (score <= 3) return { strength: 'medium', text: 'Medium strength' };
    return { strength: 'strong', text: 'Strong password' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.namedItem('name')?.value;
    const email = form.elements.namedItem('email')?.value;
    const passwordValue = form.elements.namedItem('password')?.value;
    const confirmPass = form.elements.namedItem('confirmPassword')?.value;

    // Clear previous errors
    setPasswordError('');

    // Validate password length
    if (passwordValue.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    // Validate passwords match
    if (passwordValue !== confirmPass) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Additional password strength validation
    if (passwordStrength.strength === 'weak') {
      setPasswordError('Please choose a stronger password (include uppercase, lowercase, numbers, and special characters)');
      return;
    }

    onAuth({ name, email, password: passwordValue, confirmPassword: confirmPass });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-field input-group">
        <label>Name</label>
        <span className="input-icon"><User size={16} /></span>
        <input name="name" type="text" placeholder="Enter your name" required disabled={loading} />
      </div>
      <div className="form-field input-group">
        <label>Email</label>
        <span className="input-icon"><Mail size={16} /></span>
        <input name="email" type="email" placeholder="you@example.com" required disabled={loading} />
      </div>
      <div className="form-field input-group">
        <label>Password</label>
        <span className="input-icon"><Lock size={16} /></span>
        <input 
          name="password" 
          type={showPassword ? 'text' : 'password'} 
          placeholder="Create a password" 
          required 
          disabled={loading}
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="button" className="password-toggle" onClick={() => setShowPassword((s) => !s)} disabled={loading}>
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        {password && (
          <div className={`password-strength ${passwordStrength.strength}`}>
            {passwordStrength.text}
          </div>
        )}
      </div>
      <div className="form-field input-group">
        <label>Confirm Password</label>
        <span className="input-icon"><Lock size={16} /></span>
        <input 
          name="confirmPassword" 
          type={showPassword ? 'text' : 'password'} 
          placeholder="Confirm your password" 
          required 
          disabled={loading}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={showSuccess ? 'password-success' : passwordError ? 'password-error' : ''}
        />
        {showSuccess && (
          <span className="password-success-indicator" style={{
            position: 'absolute',
            right: '50px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#10b981',
            fontSize: '16px'
          }}>
            ✓
          </span>
        )}
      </div>
      {passwordError && (
        <div className="auth-error">
          {passwordError}
        </div>
      )}
      <button type="submit" className="auth-submit" disabled={loading || !showSuccess}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      <p className="auth-hint">By continuing, you agree to our Terms and Privacy Policy.</p>
    </form>
  );
}

function LoginForm({ showPassword, setShowPassword, loading, onAuth }) {
  return (
    <form className="auth-form" onSubmit={(e) => { 
      e.preventDefault(); 
      const form = e.currentTarget; 
      const email = form.elements.namedItem('email')?.value; 
      const password = form.elements.namedItem('password')?.value;
      onAuth({ email, password }); 
    }}>
      <div className="form-field input-group">
        <label>Email</label>
        <span className="input-icon"><Mail size={16} /></span>
        <input name="email" type="email" placeholder="you@example.com" required disabled={loading} />
      </div>
      <div className="form-field input-group">
        <label>Password</label>
        <span className="input-icon"><Lock size={16} /></span>
        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Your password" required disabled={loading} />
        <button type="button" className="password-toggle" onClick={() => setShowPassword((s) => !s)} disabled={loading}>
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <div className="form-row">
        <label className="checkbox">
          <input type="checkbox" disabled={loading} />
          <span>Remember me</span>
        </label>
        <button type="button" className="link-button" disabled={loading}>Forgot password?</button>
      </div>
      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? 'Logging In...' : 'Log In'}
      </button>
    </form>
  );
}

export default AuthModal;


