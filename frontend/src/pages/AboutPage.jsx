import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Satellite,
  Smartphone,
  BarChart3
} from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const stats = [
    { number: '1000+', label: 'Shipments Tracked', icon: <MapPin size={24} /> },
    { number: '99%', label: 'GPS Accuracy', icon: <Target size={24} /> },
    { number: '24/7', label: 'Live Tracking', icon: <Globe size={24} /> },
    { number: '100%', label: 'Transparency', icon: <Shield size={24} /> }
  ];

  const values = [
    {
      icon: <Zap size={32} />,
      title: 'Innovation',
      description: 'Pioneering GPS tracking technology to revolutionize transit monitoring and customer transparency.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Reliability',
      description: 'Secure and reliable tracking system ensuring uninterrupted monitoring of your transit shipments.'
    },
    {
      icon: <Users size={32} />,
      title: 'Transparency',
      description: 'Complete visibility into transit operations, providing peace of mind for our customers.'
    }
  ];

  const technology = [
    {
      icon: <Satellite size={24} />,
      title: 'Advanced GPS',
      description: 'Precision tracking with real-time location updates for all transit shipments.'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Access',
      description: 'Track your shipments anywhere, anytime through our mobile-friendly platform.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Live Monitoring',
      description: 'Real-time tracking data and status updates for complete shipment visibility.'
    }
  ];

  const team = [
    {
      name: 'Darrel',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Cameroonian entrepreneur who studied Finance in France. Leading SEA transit startup with vision for innovative product tracking solutions.'
    },
    {
      name: 'EBIMBE EKOGOLO',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Cameroonian technology expert who studied Cyber Security and Software Engineering at ICT University. Driving SEA\'s technical innovation.'
    }
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
    hidden: { y: 30, opacity: 0 },
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
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
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
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  const teamCardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="about-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            variants={itemVariants}
          >
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              Revolutionizing Transit Tracking
              <span className="gradient-text"> with GPS Technology</span>
            </motion.h1>
            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              SEA is a Cameroonian transit startup platform designed specifically for live product tracking. 
              We provide real-time GPS monitoring for products transported under our transit services, 
              ensuring complete visibility and transparency throughout the journey.
            </motion.p>
            <motion.div 
              className="hero-stats"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="stat-item"
                  variants={statVariants}
                  whileHover="hover"
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-visual"
            variants={itemVariants}
          >
            <div className="tech-showcase">
              <motion.div 
                className="tech-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <Satellite size={48} />
                <h3>GPS Technology</h3>
                <p>Advanced satellite tracking</p>
              </motion.div>
              <motion.div 
                className="tech-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <Smartphone size={48} />
                <h3>Mobile App</h3>
                <p>Real-time notifications</p>
              </motion.div>
              <motion.div 
                className="tech-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <BarChart3 size={48} />
                <h3>Analytics</h3>
                <p>Data-driven insights</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">Our Mission</h2>
            <p className="section-description">
              To provide transparent and reliable GPS tracking for products transported under our transit services, 
              ensuring customers have complete visibility into their shipments throughout the journey.
            </p>
          </motion.div>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="value-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="value-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">Our Technology</h2>
            <p className="section-description">
              Built on cutting-edge GPS and IoT technology for unparalleled tracking accuracy
            </p>
          </motion.div>
          <div className="tech-grid">
            {technology.map((tech, index) => (
              <motion.div 
                key={index} 
                className="tech-item"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="tech-icon"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  {tech.icon}
                </motion.div>
                <h3 className="tech-title">{tech.title}</h3>
                <p className="tech-description">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-description">
              Cameroonian professionals dedicated to advancing transit tracking technology
            </p>
          </motion.div>
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                className="team-card"
                variants={teamCardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="member-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={member.image} alt={member.name} />
                </motion.div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
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
                className="cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Track Shipment
                <ArrowRight size={20} />
              </motion.button>
              <motion.button 
                className="cta-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage; 