const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// OAuth configuration (you'll need to set these in your .env file)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

// In-memory user storage (same as auth.js - in production, use a shared database)
let users = [];

// Function to find or create user
const findOrCreateUser = (profile) => {
  let user = users.find(u => u.email === profile.email);
  
  if (!user) {
    user = {
      id: users.length + 1,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      provider: profile.provider,
      providerId: profile.providerId,
      joinedAt: new Date().toISOString(),
      role: 'user'
    };
    users.push(user);
  }
  
  return user;
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

// Google OAuth
router.post('/google', async (req, res) => {
  try {
    const { accessToken } = req.body;
    
    if (!accessToken) {
      return res.status(400).json({ error: 'Google access token is required' });
    }

    // Verify the token with Google
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );

    const { sub, name, email, picture } = googleResponse.data;

    // Find or create user
    const user = findOrCreateUser({
      name,
      email,
      avatar: picture,
      provider: 'google',
      providerId: sub
    });

    // Generate JWT token
    const token = generateToken(user);

    // Return user data and token
    const { ...userWithoutPassword } = user;
    res.json({
      message: 'Google authentication successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
});

// Facebook OAuth
router.post('/facebook', async (req, res) => {
  try {
    const { accessToken } = req.body;
    
    if (!accessToken) {
      return res.status(400).json({ error: 'Facebook access token is required' });
    }

    // Verify the token with Facebook
    const facebookResponse = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );

    const { id, name, email, picture } = facebookResponse.data;

    // Find or create user
    const user = findOrCreateUser({
      name,
      email,
      avatar: picture?.data?.url,
      provider: 'facebook',
      providerId: id
    });

    // Generate JWT token
    const token = generateToken(user);

    // Return user data and token
    const { ...userWithoutPassword } = user;
    res.json({
      message: 'Facebook authentication successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Facebook OAuth error:', error);
    res.status(500).json({ error: 'Facebook authentication failed' });
  }
});

// Get OAuth configuration for frontend
router.get('/config', (req, res) => {
  res.json({
    google: {
      clientId: GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback/google'
    },
    facebook: {
      appId: FACEBOOK_APP_ID,
      scope: 'email,public_profile',
      redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/auth/callback/facebook'
    }
  });
});

module.exports = router;
