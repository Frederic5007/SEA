import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Package, 
  Clock, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Navigation,
  BarChart3,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import './FloatingNav.css';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const FloatingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isDark, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleDropdownClick = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleClickOutside = (event) => {
    // Close dropdown when clicking outside
    if (!event.target.closest('.nav-item-wrapper') && !event.target.closest('.user-menu')) {
      setActiveDropdown(null);
    }
  };

  // Add click outside listener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const isDarkMode = isDark;

  const navigationItems = [
    {
      title: 'Live Tracking',
      icon: <MapPin size={18} />,
      path: '/tracking',
      subItems: [
        { title: 'Sign Up to Track', path: '/auth/signup', icon: <User size={16} /> },
        { title: 'Login to View', path: '/auth/login', icon: <User size={16} /> },
        { title: 'Demo Tracking', path: '/tracking/demo', icon: <Navigation size={16} /> }
      ]
    },
    {
      title: 'About',
      icon: <Package size={18} />,
      path: '/about',
      subItems: [
        { title: 'Our Mission', path: '/about/mission' },
        { title: 'Technology', path: '/about/technology' },
        { title: 'Team', path: '/about/team' }
      ]
    },
    {
      title: 'Account',
      icon: <User size={18} />,
      path: '/account',
      subItems: [
        { title: 'My Profile', path: '/account/profile' },
        { title: 'Track Shipments', path: '/account/shipments' },
        { title: 'Settings', path: '/account/settings' }
      ]
    }
  ];

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.nav 
      className={`floating-nav ${isScrolled ? 'scrolled' : ''}`}
      style={{ left: '50%' }}
      initial={{ y: -100, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%', scale: isScrolled ? 0.98 : 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="nav-logo">
            <MapPin className="logo-icon" size={28} />
            <span className="logo-text">SEA</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {navigationItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="nav-item-wrapper"
              whileHover={{ y: -2 }}
            >
              <div 
                className={`nav-item ${activeDropdown === index ? 'active' : ''}`}
                onClick={(e) => handleDropdownClick(index, e)}
                style={{ cursor: 'pointer' }}
              >
                {item.icon}
                <span>{item.title}</span>
                <motion.div
                  animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} className="dropdown-arrow" />
                </motion.div>
              </div>
              
              <AnimatePresence>
                {activeDropdown === index && (
                  <motion.div 
                    className="dropdown-menu"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <motion.div
                        key={subIndex}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: subIndex * 0.1 }}
                      >
                        <Link 
                          to={subItem.path} 
                          className="dropdown-item"
                        >
                          {subItem.icon && subItem.icon}
                          <span>{subItem.title}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          
          {/* User Menu / Auth */}
          {isLoggedIn ? (
            <motion.div 
              className="user-menu"
              whileHover={{ y: -2 }}
            >
              <div 
                className={`user-button ${activeDropdown === 'user' ? 'active' : ''}`}
                onClick={(e) => handleDropdownClick('user', e)}
                style={{ cursor: 'pointer' }}
              >
                <User size={18} />
                <span>{user?.name || 'User'}</span>
                <motion.div
                  animate={{ rotate: activeDropdown === 'user' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} className="dropdown-arrow" />
                </motion.div>
              </div>
              
              <AnimatePresence>
                {activeDropdown === 'user' && (
                  <motion.div 
                    className="dropdown-menu user-dropdown"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div variants={itemVariants} initial="hidden" animate="visible">
                      <Link to="/account/profile" className="dropdown-item">
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                      <Link to="/account/settings" className="dropdown-item">
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                      <button 
                        className="dropdown-item logout-item"
                        onClick={logout}
                      >
                        <User size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.button 
              className="auth-button"
              onClick={() => window.location.href = '/auth'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={18} />
              <span>Login</span>
            </motion.button>
          )}
          
          {/* Theme Toggle */}
          <motion.button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDarkMode ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-controls">
          <motion.button 
            className="theme-toggle mobile"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <motion.button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navigationItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="mobile-nav-item"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <button 
                    className="mobile-nav-header"
                    onClick={() => handleDropdownToggle(index)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown 
                        size={14} 
                        className={`dropdown-arrow ${activeDropdown === index ? 'rotated' : ''}`} 
                      />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div 
                        className="mobile-dropdown"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: subIndex * 0.1 }}
                          >
                            <Link 
                              to={subItem.path} 
                              className="mobile-dropdown-item"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.icon && subItem.icon}
                              <span>{subItem.title}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
