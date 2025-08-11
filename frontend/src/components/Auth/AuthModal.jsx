import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, User, Mail, Lock, Github, Eye, EyeOff } from 'lucide-react';
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

function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

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
              <div className="auth-social">
                <button className="social-btn">
                  <span className="social-icon">
                    <img src="https://www.google.com/favicon.ico" alt="" width="16" height="16" />
                  </span>
                  Continue with Google
                </button>
                <button className="social-btn">
                  <span className="social-icon"><Github size={18} /></span>
                  Continue with GitHub
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
                    <SignUpForm showPassword={showPassword} setShowPassword={setShowPassword} onAuth={(payload) => { login(payload); onClose(); }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="login"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <LoginForm showPassword={showPassword} setShowPassword={setShowPassword} onAuth={(payload) => { login(payload); onClose(); }} />
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

function SignUpForm({ showPassword, setShowPassword, onAuth }) {
  return (
    <form className="auth-form" onSubmit={(e) => { e.preventDefault(); const form = e.currentTarget; const name = form.elements.namedItem('name')?.value; const email = form.elements.namedItem('email')?.value; onAuth({ name, email }); }}>
      <div className="form-field input-group">
        <label>Name</label>
        <span className="input-icon"><User size={16} /></span>
        <input name="name" type="text" placeholder="Enter your name" required />
      </div>
      <div className="form-field input-group">
        <label>Email</label>
        <span className="input-icon"><Mail size={16} /></span>
        <input name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="form-field input-group">
        <label>Password</label>
        <span className="input-icon"><Lock size={16} /></span>
        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" required />
        <button type="button" className="password-toggle" onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <button type="submit" className="auth-submit">Create Account</button>
      <p className="auth-hint">By continuing, you agree to our Terms and Privacy Policy.</p>
    </form>
  );
}

function LoginForm({ showPassword, setShowPassword, onAuth }) {
  return (
    <form className="auth-form" onSubmit={(e) => { e.preventDefault(); const form = e.currentTarget; const email = form.elements.namedItem('email')?.value; onAuth({ name: 'SEA User', email }); }}>
      <div className="form-field input-group">
        <label>Email</label>
        <span className="input-icon"><Mail size={16} /></span>
        <input name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="form-field input-group">
        <label>Password</label>
        <span className="input-icon"><Lock size={16} /></span>
        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Your password" required />
        <button type="button" className="password-toggle" onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <div className="form-row">
        <label className="checkbox">
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
        <button type="button" className="link-button">Forgot password?</button>
      </div>
      <button type="submit" className="auth-submit">Log In</button>
    </form>
  );
}

export default AuthModal;


