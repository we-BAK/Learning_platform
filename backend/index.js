// File: backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const registrationRoutes = require('./Routes/registration');
const assignTherapistRoutes = require('./Routes/assigneTherapist');
const myStudentsRoutes = require('./Routes/myStudents');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Register routes
app.use('/api', registrationRoutes);
app.use('/api', assignTherapistRoutes);
app.use('/api', myStudentsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 4000;

// Check if required environment variables are set
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- POST /api/assign_therapist');
  console.log('- GET /api/my_students');
  console.log('- Health check: /health');
});
