#!/usr/bin/env node

/**
 * Echo Chamber - A Magical Number Sequence Prediction Puzzle
 * 
 * This application simulates the Chamber of Echoes adventure where users
 * must understand and predict arithmetic progression patterns in magical sequences.
 * 
 * Features:
 * - Sequence predictor for arithmetic progressions
 * - Input validation for valid sequences
 * - Memory tracking of previous predictions (echoes)
 * - Comprehensive error handling
 * - Interactive console interface with story context
 */

/**
 * EchoChamber Class - Encapsulates all sequence prediction logic
 */
class EchoChamber {
  constructor() {
    // Store memories of all echoes (previous predictions)
    this.echoMemories = [];
    // Track the number of predictions made
    this.predictionCount = 0;
  }

  /**
   * Validates if a sequence is a valid arithmetic progression
   * An arithmetic progression has a constant difference between consecutive elements
   * 
   * @param {number[]} sequence - The sequence to validate
   * @returns {Object} { isValid: boolean, difference: number, message: string }
   */
  validateSequence(sequence) {
    // Input validation
    if (!Array.isArray(sequence)) {
      return {
        isValid: false,
        difference: null,
        message: '❌ Error: Input must be an array'
      };
    }

    if (sequence.length < 2) {
      return {
        isValid: false,
        difference: null,
        message: '❌ Error: Sequence must contain at least 2 numbers'
      };
    }

    // Check if all elements are numbers
    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        difference: null,
        message: '❌ Error: All elements must be valid numbers'
      };
    }

    // Calculate the common difference
    const differences = [];
    for (let i = 1; i < sequence.length; i++) {
      differences.push(sequence[i] - sequence[i - 1]);
    }

    // Check if all differences are the same (arithmetic progression)
    const firstDifference = differences[0];
    const isArithmetic = differences.every(d => d === firstDifference);

    if (!isArithmetic) {
      return {
        isValid: false,
        difference: null,
        message: '❌ Error: This is not an arithmetic progression. The differences between consecutive numbers are not constant.'
      };
    }

    return {
      isValid: true,
      difference: firstDifference,
      message: '✓ Valid arithmetic progression detected!'
    };
  }

  /**
   * Predicts the next number in an arithmetic sequence
   * 
   * @param {number[]} sequence - The sequence to predict from
   * @returns {Object} { success: boolean, nextNumber: number | null, message: string }
   */
  predictNext(sequence) {
    // Validate the sequence first
    const validation = this.validateSequence(sequence);

    if (!validation.isValid) {
      return {
        success: false,
        nextNumber: null,
        message: validation.message
      };
    }

    // If valid, the next number is the last number plus the common difference
    const nextNumber = sequence[sequence.length - 1] + validation.difference;

    // Record this prediction in memory
    this.echoMemories.push({
      sequence: [...sequence],
      nextNumber: nextNumber,
      commonDifference: validation.difference,
      timestamp: new Date().toLocaleTimeString(),
      predictionIndex: this.predictionCount + 1
    });

    this.predictionCount++;

    return {
      success: true,
      nextNumber: nextNumber,
      commonDifference: validation.difference,
      message: `✓ The next number in the sequence is: ${nextNumber}`
    };
  }

  /**
   * Retrieves all memories from the Echo Chamber
   * 
   * @returns {Array} Array of all previous predictions
   */
  getMemories() {
    return this.echoMemories;
  }

  /**
   * Clears all memories from the Echo Chamber
   */
  clearMemories() {
    this.echoMemories = [];
    this.predictionCount = 0;
  }

  /**
   * Displays all stored memories in a formatted way
   */
  displayMemories() {
    if (this.echoMemories.length === 0) {
      console.log('📜 No echoes stored in the chamber yet.');
      return;
    }

    console.log('\n📜 ===== ECHO CHAMBER MEMORIES =====');
    this.echoMemories.forEach((memory, index) => {
      console.log(`\n🔮 Echo ${memory.predictionIndex}:`);
      console.log(`   Sequence: [${memory.sequence.join(', ')}]`);
      console.log(`   Common Difference: ${memory.commonDifference}`);
      console.log(`   Next Number: ${memory.nextNumber}`);
      console.log(`   Time: ${memory.timestamp}`);
    });
    console.log('\n===================================\n');
  }
}

/**
 * Interactive Console Interface
 * Provides a user-friendly experience for testing sequence predictions
 */
class EchoChamberUI {
  constructor() {
    this.chamber = new EchoChamber();
  }

  /**
   * Displays the welcome message and story context
   */
  showWelcome() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                                                            ║');
    console.log('║            🏰 WELCOME TO THE CHAMBER OF ECHOES 🏰          ║');
    console.log('║                                                            ║');
    console.log('║     A mystical chamber where magical numbers echo...      ║');
    console.log('║                                                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📖 THE STORY:');
    console.log('You have entered a magical chamber where numbers form patterns.');
    console.log('These patterns echo endlessly, and your task is to predict');
    console.log('the next number in each sequence. The chamber remembers every');
    console.log('echo, storing them in its mystical memory.\n');

    console.log('🔮 YOUR QUEST:');
    console.log('Understand arithmetic progressions and predict the next');
    console.log('number in magical sequences. Test your pattern recognition!');
    console.log('═══════════════════════════════════════════════════════════\n');
  }

  /**
   * Shows the menu options
   */
  showMenu() {
    console.log('📋 CHOOSE YOUR ACTION:');
    console.log('1. Predict the next number in a sequence');
    console.log('2. View all stored echoes (memories)');
    console.log('3. Run automated tests');
    console.log('4. Clear all memories');
    console.log('5. Exit the chamber\n');
  }

  /**
   * Runs a series of predefined test cases
   */
  runTests() {
    console.log('\n🧪 Running Automated Tests...\n');

    const testCases = [
      {
        name: 'Simple Arithmetic Progression',
        sequence: [3, 6, 9, 12],
        expected: 15
      },
      {
        name: 'Negative Differences',
        sequence: [10, 7, 4, 1],
        expected: -2
      },
      {
        name: 'Large Numbers',
        sequence: [100, 200, 300, 400],
        expected: 500
      },
      {
        name: 'Negative Numbers',
        sequence: [-5, -3, -1, 1],
        expected: 3
      },
      {
        name: 'Single Difference',
        sequence: [1, 2],
        expected: 3
      },
      {
        name: 'Not an Arithmetic Progression',
        sequence: [1, 2, 4, 8],
        expected: null // This should fail
      }
    ];

    let passedTests = 0;
    let failedTests = 0;

    testCases.forEach(testCase => {
      const result = this.chamber.predictNext(testCase.sequence);

      console.log(`Test: ${testCase.name}`);
      console.log(`Input: [${testCase.sequence.join(', ')}]`);

      if (testCase.expected === null) {
        // Expecting validation to fail
        if (!result.success) {
          console.log('✓ PASSED (correctly rejected invalid sequence)');
          passedTests++;
        } else {
          console.log('✗ FAILED (should have rejected invalid sequence)');
          failedTests++;
        }
      } else {
        // Expecting successful prediction
        if (result.success && result.nextNumber === testCase.expected) {
          console.log(`Output: ${result.nextNumber}`);
          console.log('✓ PASSED');
          passedTests++;
        } else {
          console.log(`Expected: ${testCase.expected}, Got: ${result.nextNumber}`);
          console.log('✗ FAILED');
          failedTests++;
        }
      }
      console.log('');
    });

    console.log(`\n📊 TEST RESULTS: ${passedTests} passed, ${failedTests} failed`);
    console.log('═══════════════════════════════════════════════════════════\n');
  }

  /**
   * Interactive prediction mode - allows user to input a sequence
   */
  async predictMode() {
    console.log('\n🔮 PREDICTION MODE');
    console.log('Enter a sequence of numbers separated by commas (e.g., 3,6,9,12)');
    console.log('Or type "demo" to use the sample sequence [3, 6, 9, 12]:\n');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question('Enter sequence: ', (input) => {
        rl.close();

        let sequence;

        if (input.toLowerCase() === 'demo') {
          sequence = [3, 6, 9, 12];
          console.log(`\nUsing sample sequence: [${sequence.join(', ')}]`);
        } else {
          try {
            sequence = input.split(',').map(num => {
              const parsed = parseFloat(num.trim());
              if (isNaN(parsed)) {
                throw new Error(`Invalid number: ${num.trim()}`);
              }
              return parsed;
            });
          } catch (error) {
            console.log(`\n❌ Error parsing input: ${error.message}`);
            resolve();
            return;
          }
        }

        const result = this.chamber.predictNext(sequence);
        console.log(`\n${result.message}`);

        if (result.success) {
          console.log(`Common Difference: ${result.commonDifference}`);
        }

        console.log('═══════════════════════════════════════════════════════════\n');
        resolve();
      });
    });
  }

  /**
   * Main interactive loop
   */
  async start() {
    this.showWelcome();

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const askQuestion = (query) => {
      return new Promise((resolve) => {
        rl.question(query, resolve);
      });
    };

    let running = true;

    while (running) {
      this.showMenu();
      const choice = await askQuestion('Enter your choice (1-5): ');

      switch (choice.trim()) {
        case '1':
          await this.predictMode();
          break;
        case '2':
          this.chamber.displayMemories();
          break;
        case '3':
          this.runTests();
          break;
        case '4':
          this.chamber.clearMemories();
          console.log('\n✓ All memories have been cleared from the chamber.\n');
          break;
        case '5':
          console.log('\n👋 Thank you for visiting the Chamber of Echoes!\n');
          running = false;
          break;
        default:
          console.log('\n❌ Invalid choice. Please enter a number between 1 and 5.\n');
      }
    }

    rl.close();
  }
}

/**
 * Programmatic API for use in other modules
 */
module.exports = {
  EchoChamber,
  EchoChamberUI
};

/**
 * Main execution - runs the interactive UI if this is the main module
 */
if (require.main === module) {
  const ui = new EchoChamberUI();
  ui.start();
}
