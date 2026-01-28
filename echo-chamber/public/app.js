/**
 * Echo Chamber - Web Application JavaScript
 * 
 * Handles all client-side logic for the web interface including:
 * - API communication
 * - UI updates
 * - Event handling
 * - Memory management
 */

// ============================================================
// API COMMUNICATION
// ============================================================

/**
 * Make a POST request to predict the next number
 * @param {Array<number>} sequence - The sequence to predict
 * @returns {Promise<Object>} - The prediction result
 */
async function apiPredict(sequence) {
  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sequence })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: `Error connecting to server: ${error.message}`
    };
  }
}

/**
 * Fetch all stored memories from the server
 * @returns {Promise<Object>} - The memories data
 */
async function apiGetMemories() {
  try {
    const response = await fetch('/api/memories');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      memories: [],
      count: 0,
      error: error.message
    };
  }
}

/**
 * Clear all memories on the server
 * @returns {Promise<Object>} - The result
 */
async function apiClearMemories() {
  try {
    const response = await fetch('/api/memories', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error.message}`
    };
  }
}

/**
 * Validate a sequence on the server
 * @param {Array<number>} sequence - The sequence to validate
 * @returns {Promise<Object>} - The validation result
 */
async function apiValidate(sequence) {
  try {
    const response = await fetch('/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sequence })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      isValid: false,
      message: `Error: ${error.message}`
    };
  }
}

/**
 * Test the server connection
 * @returns {Promise<Object>} - The test result
 */
async function apiTest() {
  try {
    const response = await fetch('/api/test');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error.message}`
    };
  }
}

// ============================================================
// UI FUNCTIONS
// ============================================================

/**
 * Parse a comma-separated string into an array of numbers
 * @param {string} input - The input string
 * @returns {Array<number>|null} - The parsed array or null if invalid
 */
function parseSequence(input) {
  if (!input || input.trim() === '') {
    return null;
  }

  try {
    const numbers = input
      .split(',')
      .map(num => {
        const parsed = parseFloat(num.trim());
        if (isNaN(parsed)) {
          throw new Error(`Invalid number: ${num.trim()}`);
        }
        return parsed;
      });

    return numbers.length > 0 ? numbers : null;
  } catch (error) {
    return null;
  }
}

/**
 * Format numbers for display
 * @param {Array<number>} sequence - The sequence to format
 * @returns {string} - Formatted sequence
 */
function formatSequence(sequence) {
  if (!Array.isArray(sequence)) return '';
  return `[${sequence.join(', ')}]`;
}

/**
 * Show result in the UI
 * @param {Object} result - The prediction result
 */
function showResult(result) {
  const resultContainer = document.getElementById('resultContainer');
  const resultContent = document.getElementById('resultContent');
  const errorContainer = document.getElementById('errorContainer');

  if (result.success) {
    errorContainer.style.display = 'none';
    resultContent.innerHTML = `
      <div class="result-header">✓ ${result.message}</div>
      <div class="result-details">
        <div class="result-detail">
          <div class="result-detail-label">Next Number</div>
          <div class="result-detail-value">${result.nextNumber}</div>
        </div>
        <div class="result-detail">
          <div class="result-detail-label">Common Difference</div>
          <div class="result-detail-value">${result.commonDifference}</div>
        </div>
      </div>
    `;
    resultContainer.style.display = 'block';
  } else {
    resultContainer.style.display = 'none';
    document.getElementById('errorContent').innerHTML = `
      <strong>❌ Error:</strong> ${result.message}
    `;
    errorContainer.style.display = 'block';
  }
}

/**
 * Update the memories display
 */
async function updateMemories() {
  const data = await apiGetMemories();
  const container = document.getElementById('memoriesContainer');

  if (data.count === 0) {
    container.innerHTML = '<p class="empty-state">No echoes stored yet. Make a prediction!</p>';
    return;
  }

  let html = '';
  data.memories.forEach((memory, index) => {
    html += `
      <div class="memory-item">
        <div class="memory-header">
          <span class="memory-title">Echo #${memory.predictionIndex}</span>
          <span class="memory-time">${memory.timestamp}</span>
        </div>
        <div class="memory-content">
          <strong>Sequence:</strong> ${formatSequence(memory.sequence)}<br>
          <strong>Next:</strong> ${memory.nextNumber}<br>
          <strong>Difference:</strong> ${memory.commonDifference}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Main predict sequence function
 */
async function predictSequence() {
  const input = document.getElementById('sequenceInput').value;
  const sequence = parseSequence(input);

  if (!sequence) {
    showResult({
      success: false,
      message: 'Please enter valid numbers separated by commas (e.g., 3, 6, 9, 12)'
    });
    return;
  }

  // Disable button while processing
  const btn = document.getElementById('predictBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Predicting...';

  try {
    const result = await apiPredict(sequence);
    showResult(result);
    
    // Update memories if prediction was successful
    if (result.success) {
      await updateMemories();
    }
  } finally {
    // Re-enable button
    btn.disabled = false;
    btn.textContent = '🔮 Predict';
  }
}

/**
 * Clear all memories
 */
async function clearMemories() {
  if (!confirm('Are you sure you want to clear all stored echoes? This cannot be undone.')) {
    return;
  }

  const result = await apiClearMemories();

  if (result.success) {
    await updateMemories();
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
    showNotification('All memories have been cleared!');
  } else {
    showNotification(`Error: ${result.message}`, 'error');
  }
}

/**
 * Fill the input with demo sequence
 */
function fillDemoSequence() {
  document.getElementById('sequenceInput').value = '3, 6, 9, 12';
  document.getElementById('sequenceInput').focus();
}

/**
 * Load an example sequence
 */
function loadExample(sequence) {
  document.getElementById('sequenceInput').value = sequence.join(', ');
  document.getElementById('sequenceInput').focus();
  // Auto-predict after a short delay
  setTimeout(() => {
    predictSequence();
  }, 100);
}

/**
 * Show examples section
 */
function showExamples() {
  const section = document.getElementById('examplesSection');
  if (section.style.display === 'none') {
    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    section.style.display = 'none';
  }
}

/**
 * Show about modal
 */
function showAbout() {
  document.getElementById('aboutModal').style.display = 'block';
}

/**
 * Close about modal
 */
function closeAbout() {
  document.getElementById('aboutModal').style.display = 'none';
}

/**
 * Test server connection
 */
async function testConnection() {
  const result = await apiTest();

  if (result.success) {
    showNotification('✓ Server is working correctly!');
  } else {
    showNotification('✗ Server connection failed', 'error');
  }
}

/**
 * Run demo test with sample sequences
 */
async function runDemoTest() {
  const testModal = document.getElementById('testModal');
  const container = document.getElementById('testResultsContainer');

  testModal.style.display = 'block';
  container.innerHTML = '<p>🧪 Running tests...</p>';

  const testCases = [
    { sequence: [3, 6, 9, 12], name: 'Simple Progression' },
    { sequence: [10, 7, 4, 1], name: 'Decreasing' },
    { sequence: [100, 200, 300, 400], name: 'Large Numbers' },
    { sequence: [-5, -3, -1, 1], name: 'Negative Numbers' },
    { sequence: [1.5, 3.0, 4.5, 6.0], name: 'Floating Point' },
    { sequence: [1, 2, 4, 8], name: 'Invalid (Geometric)' }
  ];

  let passed = 0;
  let failed = 0;
  let html = '';

  for (const testCase of testCases) {
    const result = await apiPredict(testCase.sequence);
    const status = result.success ? '✓ PASSED' : '✓ Rejected';
    const statusClass = result.success ? 'success' : 'warning';

    if (!result.success && testCase.name.includes('Invalid')) {
      passed++;
    } else if (result.success && !testCase.name.includes('Invalid')) {
      passed++;
    } else {
      failed++;
    }

    html += `
      <div style="margin-bottom: 1rem; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
        <strong>${testCase.name}</strong><br>
        Input: [${testCase.sequence.join(', ')}]<br>
        ${result.success ? `Output: ${result.nextNumber}<br>` : ''}
        <span style="color: ${result.success ? '#10b981' : '#ef4444'};">${status}</span>
      </div>
    `;
  }

  html += `
    <hr style="margin: 1.5rem 0;">
    <p><strong>Results:</strong> ${passed} passed, ${failed} failed out of ${testCases.length} tests</p>
  `;

  container.innerHTML = html;
}

/**
 * Close test modal
 */
function closeTestModal() {
  document.getElementById('testModal').style.display = 'none';
}

/**
 * Show a temporary notification
 * @param {string} message - The message to show
 * @param {string} type - The notification type (success, error, info)
 */
function showNotification(message, type = 'success') {
  // Simple notification using alert for now
  // In a production app, this would be a toast notification
  alert(message);
}

// ============================================================
// EVENT LISTENERS
// ============================================================

// Allow Enter key to trigger prediction
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('sequenceInput');

  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      predictSequence();
    }
  });

  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
    const aboutModal = document.getElementById('aboutModal');
    const testModal = document.getElementById('testModal');

    if (event.target === aboutModal) {
      aboutModal.style.display = 'none';
    }

    if (event.target === testModal) {
      testModal.style.display = 'none';
    }
  });

  // Load initial memories
  updateMemories();

  // Auto-update memories every 5 seconds
  setInterval(updateMemories, 5000);
});
