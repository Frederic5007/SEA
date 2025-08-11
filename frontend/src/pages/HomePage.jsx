import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Package, 
  Clock, 
  Shield, 
  Smartphone, 
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  Navigation,
  BarChart3,
  Globe,
  Zap
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: <Navigation size={32} />,
      title: 'Real-Time GPS Tracking',
      description: 'Track your products in real-time with precise GPS coordinates and live location updates.'
    },
    {
      icon: <MapPin size={32} />,
      title: 'Interactive Maps',
      description: 'Visualize product routes and delivery progress on detailed interactive maps.'
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile Notifications',
      description: 'Get instant alerts about product location changes, delivery status, and arrival confirmations.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure Tracking',
      description: 'Enterprise-grade security ensures your product tracking data is protected and confidential.'
    }
  ];

  const services = [
    {
      icon: <Package size={24} />,
      title: 'Product Tracking',
      description: 'Complete visibility for individual products and bulk shipments',
      routes: '24/7 Monitoring'
    },
    {
      icon: <Globe size={24} />,
      title: 'Global Coverage',
      description: 'Worldwide GPS tracking coverage for international product shipments',
      routes: '190+ Countries'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analytics & Reports',
      description: 'Detailed insights into product movement patterns and delivery performance',
      routes: 'Real-time Data'
    }
  ];

  const stats = [
    { number: '50M+', label: 'Products Tracked' },
    { number: '99.9%', label: 'GPS Accuracy' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Support Available' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div 
      className="homepage"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            variants={itemVariants}
          >
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              Track Your Products
              <span className="gradient-text"> Anywhere, Anytime</span>
            </motion.h1>
            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              Advanced GPS tracking technology for complete product visibility. 
              Monitor your products in real-time with precise location data, 
              delivery estimates, and instant status updates.
            </motion.p>
            <motion.div 
              className="hero-actions"
              variants={itemVariants}
            >
              <motion.button 
                className="cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Tracking
                <ArrowRight size={20} />
              </motion.button>
              <motion.button 
                className="cta-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Demo
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-visual"
            variants={itemVariants}
          >
            <motion.div 
              className="hero-card"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="card-header">
                <Package className="card-icon" size={24} />
                <span>Product #SEA-2024-001</span>
              </div>
              <div className="card-content">
                <div className="arrival-time">
                  <span className="time">2.5 hrs</span>
                  <span className="label">Est. delivery</span>
                </div>
                <div className="route-info">
                  <div className="stop">Warehouse</div>
                  <div className="arrow">→</div>
                  <div className="stop">Customer Location</div>
                </div>
                <div className="tracking-status">
                  <div className="status-indicator active"></div>
                  <span>In Transit - Live GPS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-item"
              variants={statVariants}
              whileHover={{ scale: 1.1 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">Why Choose SEA GPS Tracking?</h2>
            <p className="section-description">
              Advanced technology and reliable service for complete product visibility
            </p>
          </motion.div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">Our GPS Tracking Services</h2>
            <p className="section-description">
              Comprehensive GPS tracking solutions for product monitoring
            </p>
          </motion.div>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="service-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="service-header">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <div className="service-badge">{service.routes}</div>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <motion.button 
                  className="service-link"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <motion.div 
            className="cta-content"
            variants={itemVariants}
          >
            <h2 className="cta-title">Ready to Track Your Transit Shipments?</h2>
            <p className="cta-description">
              Experience transparent and reliable GPS tracking for all your transit shipments
            </p>
            <div className="cta-actions">
              <motion.button 
                className="cta-primary large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Track Shipment
                <ArrowRight size={20} />
              </motion.button>
              <motion.button 
                className="cta-secondary large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
          <motion.div 
            className="cta-features"
            variants={itemVariants}
          >
            <motion.div 
              className="cta-feature"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle size={20} />
              <span>Real-time GPS tracking</span>
            </motion.div>
            <motion.div 
              className="cta-feature"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle size={20} />
              <span>Complete transparency</span>
            </motion.div>
            <motion.div 
              className="cta-feature"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle size={20} />
              <span>24/7 live monitoring</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
