#!/usr/bin/env node

/**
 * Echo Chamber - Web Server
 * 
 * Provides a REST API and web interface for the Echo Chamber application.
 * The server exposes the core EchoChamber functionality through HTTP endpoints.
 */

const express = require('express');
const path = require('path');
const { EchoChamber } = require('./index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a global chamber instance
const chamber = new EchoChamber();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// REST API ENDPOINTS
// ============================================================

/**
 * POST /api/predict
 * Predicts the next number in a sequence
 * 
 * Request body: { sequence: [number, ...] }
 * Response: { success: boolean, nextNumber?: number, commonDifference?: number, message: string }
 */
app.post('/api/predict', (req, res) => {
  try {
    const { sequence } = req.body;

    if (!sequence) {
      return res.status(400).json({
        success: false,
        message: 'Sequence is required'
      });
    }

    const result = chamber.predictNext(sequence);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

/**
 * GET /api/memories
 * Retrieves all stored predictions
 * 
 * Response: { memories: Array, count: number }
 */
app.get('/api/memories', (req, res) => {
  try {
    const memories = chamber.getMemories();
    res.json({
      memories: memories,
      count: memories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

/**
 * DELETE /api/memories
 * Clears all stored predictions
 * 
 * Response: { success: boolean, message: string }
 */
app.delete('/api/memories', (req, res) => {
  try {
    chamber.clearMemories();
    res.json({
      success: true,
      message: 'All memories have been cleared'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

/**
 * POST /api/validate
 * Validates if a sequence is an arithmetic progression
 * 
 * Request body: { sequence: [number, ...] }
 * Response: { isValid: boolean, difference?: number, message: string }
 */
app.post('/api/validate', (req, res) => {
  try {
    const { sequence } = req.body;

    if (!sequence) {
      return res.status(400).json({
        isValid: false,
        message: 'Sequence is required'
      });
    }

    const result = chamber.validateSequence(sequence);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      isValid: false,
      message: `Server error: ${error.message}`
    });
  }
});

/**
 * GET /api/test
 * Runs a quick test to verify the server is working
 * 
 * Response: { success: boolean, result?: Object, message: string }
 */
app.get('/api/test', (req, res) => {
  try {
    const testChamber = new EchoChamber();
    const result = testChamber.predictNext([3, 6, 9, 12]);
    
    res.json({
      success: result.success,
      result: result,
      message: 'Server is working correctly'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

// ============================================================
// STATIC FILES & ROOT ROUTE
// ============================================================

/**
 * Serve the main application page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Handle 404 errors
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// ============================================================
// SERVER STARTUP
// ============================================================

app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║          🏰 ECHO CHAMBER WEB SERVER STARTED 🏰             ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log(`🌐 Web Interface: http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   • POST   /api/predict   - Predict next number`);
  console.log(`   • GET    /api/memories  - Get all stored echoes`);
  console.log(`   • DELETE /api/memories  - Clear all memories`);
  console.log(`   • POST   /api/validate  - Validate sequence`);
  console.log(`   • GET    /api/test      - Test server connection`);
  console.log(`\n📖 Open your browser and navigate to http://localhost:${PORT}`);
  console.log(`🛑 Press Ctrl+C to stop the server\n`);
});

module.exports = app;
