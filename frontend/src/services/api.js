const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('sea_auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  // Authentication methods
  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await this.handleResponse(response);
    
    // Store token
    if (data.token) {
      localStorage.setItem('sea_auth_token', data.token);
    }
    
    return data;
  }

  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    const data = await this.handleResponse(response);
    
    // Store token
    if (data.token) {
      localStorage.setItem('sea_auth_token', data.token);
    }
    
    return data;
  }

  async logout() {
    try {
      const response = await fetch(`${this.baseURL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        localStorage.removeItem('sea_auth_token');
        localStorage.removeItem('sea_auth_user');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Remove tokens even if server request fails
      localStorage.removeItem('sea_auth_token');
      localStorage.removeItem('sea_auth_user');
    }
  }

  async getProfile() {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  async updateProfile(profileData) {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData)
    });

    return this.handleResponse(response);
  }

  async verifyToken() {
    try {
      const response = await fetch(`${this.baseURL}/auth/verify`, {
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Token verification failed');
      }
    } catch (error) {
      // Remove invalid tokens
      localStorage.removeItem('sea_auth_token');
      localStorage.removeItem('sea_auth_user');
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('sea_auth_token');
    return !!token;
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('sea_auth_token');
  }

  // OAuth methods
  async googleAuth(accessToken) {
    const response = await fetch(`${this.baseURL}/oauth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken })
    });

    const data = await this.handleResponse(response);
    
    // Store token
    if (data.token) {
      localStorage.setItem('sea_auth_token', data.token);
    }
    
    return data;
  }

  async facebookAuth(accessToken) {
    const response = await fetch(`${this.baseURL}/oauth/facebook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken })
    });

    const data = await this.handleResponse(response);
    
    // Store token
    if (data.token) {
      localStorage.setItem('sea_auth_token', data.token);
    }
    
    return data;
  }

  async getOAuthConfig() {
    const response = await fetch(`${this.baseURL}/oauth/config`);
    return this.handleResponse(response);
  }
}

export default new ApiService();
