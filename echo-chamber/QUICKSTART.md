# 🏰 Echo Chamber - Quick Start Guide

Welcome to the Chamber of Echoes! This guide will help you get started quickly.

## 📦 What You've Received

Your Echo Chamber project includes:

```
echo-chamber/
├── index.js          # Main application with all functionality
├── test-suite.js     # Comprehensive test suite (22 tests)
├── README.md         # Full documentation
└── QUICKSTART.md     # This file
```

## ⚡ Quick Start - 30 Seconds

### 1. Run the Interactive Application
```bash
cd echo-chamber
node index.js
```

Then:
- Choose option 1 to predict sequences
- Choose option 3 to run automated tests
- Choose option 5 to exit

### 2. Test with the Sample Sequence
When prompted, type: `demo`

Expected output: `The next number in the sequence is: 15`

### 3. Run the Full Test Suite
```bash
node test-suite.js
```

You should see: `🎉 ALL TESTS PASSED! The Echo Chamber is ready for adventure!`

## 🔮 How It Works

### Understanding Arithmetic Progressions

An arithmetic progression is a sequence where each number increases or decreases by the same amount.

**Example:** `[3, 6, 9, 12]`
- Difference: 3 (each number is 3 more than the previous)
- Next number: 12 + 3 = **15**

### Try These Sequences

1. **Ascending:** `2,4,6,8` → Next: `10`
2. **Descending:** `10,7,4,1` → Next: `-2`
3. **Negative:** `-5,-3,-1,1` → Next: `3`
4. **Large:** `100,200,300,400` → Next: `500`

### Invalid Sequences (Will Be Rejected)

- `1,2,4,8` - Not arithmetic (differences are 1, 2, 4)
- `1,1,2,3,5` - Fibonacci, not arithmetic
- `hello,world` - Not numbers

## 📚 Programmatic Usage

Use the Echo Chamber in your own code:

```javascript
const { EchoChamber } = require('./echo-chamber/index.js');

const chamber = new EchoChamber();

// Predict the next number
const result = chamber.predictNext([3, 6, 9, 12]);
console.log(result.nextNumber);  // Output: 15

// Check memories
chamber.displayMemories();

// Get memories as data
const memories = chamber.getMemories();
```

## 🧪 Testing

### Run Automated Tests
```bash
node test-suite.js
```

### Run Built-in Tests
```bash
node index.js
# Select option 3: Run automated tests
```

### Test Coverage (22 Tests)

✓ Basic arithmetic progressions
✓ Input validation (5 types of invalid input)
✓ Arithmetic progression detection
✓ Edge cases (negative, floating point, very large numbers)
✓ Memory tracking and clearing
✓ API method validation

**Success Rate: 100%**

## 📖 Features Implemented

✅ Sequence predictor for arithmetic progressions
✅ Input validation for valid sequences
✅ Memory storage of previous predictions
✅ Story-driven console interface
✅ Comprehensive error handling
✅ Floating-point number support
✅ Automated test suite
✅ Full JSDoc documentation
✅ Programmatic API

## 🚀 Next Steps

1. **Explore the Interface:** Run `node index.js` and experiment
2. **Read the Code:** Check [index.js](index.js) for implementation details
3. **Review Tests:** Look at [test-suite.js](test-suite.js) for usage examples
4. **Full Documentation:** See [README.md](README.md) for complete API reference

## 🎓 Learning Concepts

This application teaches:

- 🔢 Pattern recognition with arithmetic progressions
- ✅ Input validation and error handling
- 📦 Object-oriented programming with classes
- 🧪 Comprehensive testing practices
- 📚 API design and documentation
- 💬 User-friendly console interfaces

## ❓ Common Questions

**Q: What if the sequence isn't arithmetic?**
A: The application will reject it with a clear error message.

**Q: Can it handle decimal numbers?**
A: Yes! Try: `1.5, 3.0, 4.5, 6.0`

**Q: Are there limits to sequence size?**
A: No! Test with as many numbers as you want.

**Q: Can I use negative numbers?**
A: Absolutely! Example: `-10, -5, 0, 5`

## 📊 Test Results Summary

```
Total Tests: 22
✓ Passed: 22
✗ Failed: 0
📈 Success Rate: 100%
```

## 💡 Pro Tips

1. **Type "demo"** when prompted for a sequence to use the sample
2. **View Echoes** (option 2) to see all your previous predictions
3. **Clear Memories** (option 4) to start fresh
4. **Run Tests** (option 3) to see more examples

## 🏰 The Story

You've entered a magical chamber where numbers form patterns. Your quest is to understand these arithmetic progressions and predict the next number in each sequence. The chamber remembers every echo of your predictions!

---

**Ready to explore? Start with:** `node index.js`

Happy predicting! 🔮
