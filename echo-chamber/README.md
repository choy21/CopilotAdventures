# 🏰 Chamber of Echoes - Echo Chamber Application

A magical number sequence prediction puzzle application that teaches arithmetic progressions through interactive, fantasy-themed interfaces. Now with both **console** and **web** interfaces!

## Overview

The Chamber of Echoes is a Node.js application that helps users understand and predict patterns in arithmetic sequences. The application provides both an interactive console interface and a programmatic API for testing and integration.

## Features

✨ **Core Features:**
- 🔮 **Sequence Prediction**: Predicts the next number in arithmetic progressions
- 📜 **Echo Memory**: Stores and displays all previous predictions
- ✓ **Input Validation**: Validates sequences are valid arithmetic progressions
- 🧪 **Automated Tests**: Runs comprehensive test suite to verify functionality
- 💬 **Story-Driven Interfaces**: Fantasy-themed console and web experiences
- 🛡️ **Error Handling**: Comprehensive error handling for edge cases

## Interfaces

The application now supports **two interfaces**:

### 🖥️ **Console Interface** (Traditional)
- Interactive menu system
- Story-driven experience
- Built for terminal usage

### 🌐 **Web Interface** (Modern)
- Beautiful responsive design
- Real-time visualization
- REST API backend
- Mobile-friendly layout
- Built-in testing tools

## Installation

### Prerequisites
- Node.js (v12 or higher)
- npm (Node Package Manager)

### Setup

1. Navigate to the echo-chamber directory:
```bash
cd /workspaces/CopilotAdventures/echo-chamber
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Running the Console Application

```bash
npm start
# or
node index.js
```

This starts the interactive Chamber of Echoes experience. You'll be presented with a menu where you can:

1. **Predict the Next Number**: Input a sequence to predict the next number
2. **View Stored Echoes**: See all previous predictions and their details
3. **Run Automated Tests**: Execute the built-in test suite
4. **Clear Memories**: Reset all stored predictions
5. **Exit**: Leave the chamber

### Running the Web Interface

```bash
npm run web
# or
node server.js
```

Then open your browser and navigate to:
```
http://localhost:3000
```

The web interface features:
- 🎨 Beautiful, responsive design
- 🔮 Interactive sequence prediction
- 📜 Real-time memory display
- 🧪 Built-in test runner
- 📚 Example sequences library
- 🔗 REST API backend

### Example Session

```bash
$ npm run web

🏰 ECHO CHAMBER WEB SERVER STARTED 🏰

🌐 Web Interface: http://localhost:3000
📡 API Endpoints:
   • POST   /api/predict   - Predict next number
   • GET    /api/memories  - Get all stored echoes
   • DELETE /api/memories  - Clear all memories
   • POST   /api/validate  - Validate sequence
   • GET    /api/test      - Test server connection
```

Then open your browser to `http://localhost:3000`

### Programmatic Usage

You can also use the EchoChamber class directly in your own code:

```javascript
const { EchoChamber } = require('./index.js');

// Create a new chamber instance
const chamber = new EchoChamber();

// Predict the next number in a sequence
const result = chamber.predictNext([3, 6, 9, 12]);

if (result.success) {
  console.log(`Next number: ${result.nextNumber}`);
  console.log(`Common difference: ${result.commonDifference}`);
}

// View all stored memories
const memories = chamber.getMemories();
console.log(memories);

// Display formatted memories
chamber.displayMemories();
```

## API Reference

### EchoChamber Class

#### Constructor
```javascript
const chamber = new EchoChamber();
```

#### Methods

##### `validateSequence(sequence)`
Validates if a sequence is a valid arithmetic progression.

**Parameters:**
- `sequence` (Array): Array of numbers to validate

**Returns:**
```javascript
{
  isValid: boolean,
  difference: number | null,
  message: string
}
```

**Example:**
```javascript
const validation = chamber.validateSequence([3, 6, 9, 12]);
// { isValid: true, difference: 3, message: '✓ Valid arithmetic progression detected!' }
```

##### `predictNext(sequence)`
Predicts the next number in an arithmetic sequence.

**Parameters:**
- `sequence` (Array): Array of numbers to predict from

**Returns:**
```javascript
{
  success: boolean,
  nextNumber: number | null,
  commonDifference: number,
  message: string
}
```

**Example:**
```javascript
const result = chamber.predictNext([3, 6, 9, 12]);
// { success: true, nextNumber: 15, commonDifference: 3, message: '✓ The next number in the sequence is: 15' }
```

##### `getMemories()`
Retrieves all stored predictions.

**Returns:** Array of memory objects

**Example:**
```javascript
const memories = chamber.getMemories();
// [
//   {
//     sequence: [3, 6, 9, 12],
//     nextNumber: 15,
//     commonDifference: 3,
//     timestamp: "10:30:45 AM",
//     predictionIndex: 1
//   }
// ]
```

##### `displayMemories()`
Displays all stored memories in a formatted way to the console.

##### `clearMemories()`
Clears all stored memories.

### EchoChamberUI Class

Interactive console interface for the application.

#### Constructor
```javascript
const ui = new EchoChamberUI();
```

#### Methods

##### `start()`
Launches the interactive console experience.

```javascript
const ui = new EchoChamberUI();
ui.start();
```

### REST API Endpoints

When running the web server with `npm run web`, the following REST API endpoints are available:

#### POST `/api/predict`
Predicts the next number in a sequence.

**Request:**
```json
{
  "sequence": [3, 6, 9, 12]
}
```

**Response:**
```json
{
  "success": true,
  "nextNumber": 15,
  "commonDifference": 3,
  "message": "✓ The next number in the sequence is: 15"
}
```

#### GET `/api/memories`
Retrieves all stored predictions.

**Response:**
```json
{
  "memories": [
    {
      "sequence": [3, 6, 9, 12],
      "nextNumber": 15,
      "commonDifference": 3,
      "timestamp": "10:30:45 AM",
      "predictionIndex": 1
    }
  ],
  "count": 1
}
```

#### DELETE `/api/memories`
Clears all stored predictions.

**Response:**
```json
{
  "success": true,
  "message": "All memories have been cleared"
}
```

#### POST `/api/validate`
Validates if a sequence is an arithmetic progression.

**Request:**
```json
{
  "sequence": [2, 4, 6, 8]
}
```

**Response:**
```json
{
  "isValid": true,
  "difference": 2,
  "message": "✓ Valid arithmetic progression detected!"
}
```

#### GET `/api/test`
Tests the server connection.

**Response:**
```json
{
  "success": true,
  "result": { ... },
  "message": "Server is working correctly"
}
```

## Test Cases

The application includes comprehensive test cases covering:

1. **Simple Arithmetic Progression**: `[3, 6, 9, 12]` → `15`
2. **Negative Differences**: `[10, 7, 4, 1]` → `-2`
3. **Large Numbers**: `[100, 200, 300, 400]` → `500`
4. **Negative Numbers**: `[-5, -3, -1, 1]` → `3`
5. **Single Difference**: `[1, 2]` → `3`
6. **Invalid Sequence**: `[1, 2, 4, 8]` → Rejected (not arithmetic)

### Running Tests

**Console Tests:**
```bash
npm test
# or
node test-suite.js
```

**Web Interface Tests:**
1. Run `npm run web`
2. Open http://localhost:3000
3. Click the "🧪 Run Test" button

**Built-in Tests (Console):**
```bash
npm start
# Then select option 3 (Run automated tests)
```

## Error Handling

The application includes robust error handling for:

- **Invalid Input Types**: Non-array inputs
- **Insufficient Data**: Sequences with fewer than 2 numbers
- **Non-Numeric Values**: Sequences containing non-numeric elements
- **Invalid Progressions**: Sequences that aren't arithmetic progressions
- **NaN Values**: Handling of Not-a-Number inputs

**Example Error Handling:**

```javascript
const result = chamber.predictNext([1, 2, 4, 8]);
if (!result.success) {
  console.log(result.message);
  // ❌ Error: This is not an arithmetic progression. 
  //    The differences between consecutive numbers are not constant.
}
```

## How Arithmetic Progressions Work

An **arithmetic progression** (or arithmetic sequence) is a sequence of numbers where the difference between consecutive terms is constant. This constant is called the **common difference**.

### Examples:

| Sequence | Difference | Next Number |
|----------|-----------|------------|
| [3, 6, 9, 12] | 3 | 15 |
| [10, 7, 4, 1] | -3 | -2 |
| [2, 2, 2, 2] | 0 | 2 |
| [5, 10, 15, 20] | 5 | 25 |

### Formula:

For an arithmetic sequence with first term `a₁` and common difference `d`:
- `aₙ = a₁ + (n-1)d`
- Next term = Last term + Common difference

## Project Structure

```
echo-chamber/
├── index.js          # Main application file with all logic
├── README.md         # This file
└── package.json      # (Optional) For publishing to npm
```

## Code Organization

The `index.js` file is organized into three main classes:

1. **EchoChamber**: Core logic for sequence validation and prediction
2. **EchoChamberUI**: Interactive console interface
3. **Module Exports**: Programmatic API for external use

Each class and method includes comprehensive JSDoc comments explaining functionality, parameters, and return values.

## Running Without the Interactive Menu

If you just want to use the API programmatically without the interactive interface:

```javascript
const { EchoChamber } = require('./echo-chamber/index.js');

const chamber = new EchoChamber();
const result = chamber.predictNext([3, 6, 9, 12]);
console.log(result.nextNumber); // Output: 15
```

## Educational Value

This application teaches:

- 🎓 **Pattern Recognition**: Identifying arithmetic progressions
- 🎓 **Mathematical Thinking**: Understanding sequences and series
- 🎓 **Input Validation**: Checking data before processing
- 🎓 **Error Handling**: Gracefully managing errors
- 🎓 **Code Organization**: Structuring code into reusable classes
- 🎓 **Interactive CLI**: Building user-friendly console applications

## Future Enhancements

Potential extensions to the application:

- [ ] Support for geometric progressions
- [ ] Support for Fibonacci sequences
- [ ] Visualization of sequences
- [ ] File I/O for saving/loading memories
- [ ] Web interface version
- [ ] Different difficulty levels
- [ ] Scoring system

## License

This project is part of CopilotAdventures and follows the same license.

## Support

For issues, questions, or suggestions, please refer to the main CopilotAdventures repository.

---

**🏰 Welcome to the Chamber of Echoes! May your predictions be ever accurate! 🔮**
