const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/users', (req, res) => {
  res.json({
    message: 'Get all users',
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]
  });
});

// GET /api/users/:id
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Get user with id: ${id}`,
    data: { id: parseInt(id), name: 'John Doe', email: 'john@example.com' }
  });
});

// POST /api/users
router.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    message: 'User created successfully',
    data: { id: 3, name, email }
  });
});

// PUT /api/users/:id
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({
    message: `User ${id} updated successfully`,
    data: { id: parseInt(id), name, email }
  });
});

// DELETE /api/users/:id
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} deleted successfully`
  });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({
    status: 'API is running',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api/users',
      'GET /api/users/:id',
      'POST /api/users',
      'PUT /api/users/:id',
      'DELETE /api/users/:id'
    ]
  });
});

module.exports = router;
