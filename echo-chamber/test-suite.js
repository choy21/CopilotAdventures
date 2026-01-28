#!/usr/bin/env node

/**
 * Comprehensive Test Suite for Echo Chamber Application
 * 
 * This file demonstrates all functionality of the Echo Chamber application
 * and runs a complete test suite to verify correct behavior.
 */

const { EchoChamber, EchoChamberUI } = require('./index.js');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║                                                            ║');
console.log('║      🏰 ECHO CHAMBER - COMPREHENSIVE TEST SUITE 🏰         ║');
console.log('║                                                            ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// ============================================================
// PART 1: BASIC FUNCTIONALITY TESTS
// ============================================================

console.log('📋 PART 1: BASIC FUNCTIONALITY TESTS');
console.log('═══════════════════════════════════════════════════════════\n');

const chamber1 = new EchoChamber();
let testsPassed = 0;
let testsFailed = 0;

// Test 1.1: Sample sequence from requirements
console.log('1.1 - Sample Sequence [3, 6, 9, 12] → 15');
const test1_1 = chamber1.predictNext([3, 6, 9, 12]);
if (test1_1.success && test1_1.nextNumber === 15) {
  console.log('     ✓ PASSED');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 1.2: Decreasing sequence
console.log('\n1.2 - Decreasing Sequence [20, 15, 10, 5] → 0');
const test1_2 = chamber1.predictNext([20, 15, 10, 5]);
if (test1_2.success && test1_2.nextNumber === 0) {
  console.log('     ✓ PASSED');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 1.3: Large differences
console.log('\n1.3 - Large Differences [0, 100, 200, 300] → 400');
const test1_3 = chamber1.predictNext([0, 100, 200, 300]);
if (test1_3.success && test1_3.nextNumber === 400) {
  console.log('     ✓ PASSED');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// ============================================================
// PART 2: INPUT VALIDATION TESTS
// ============================================================

console.log('\n\n📋 PART 2: INPUT VALIDATION TESTS');
console.log('═══════════════════════════════════════════════════════════\n');

const chamber2 = new EchoChamber();

// Test 2.1: Non-array input
console.log('2.1 - Non-array Input (should reject)');
const test2_1 = chamber2.predictNext('not an array');
if (!test2_1.success) {
  console.log('     ✓ PASSED (correctly rejected)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 2.2: Empty array
console.log('\n2.2 - Empty Array (should reject)');
const test2_2 = chamber2.predictNext([]);
if (!test2_2.success) {
  console.log('     ✓ PASSED (correctly rejected)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 2.3: Single element
console.log('\n2.3 - Single Element (should reject)');
const test2_3 = chamber2.predictNext([42]);
if (!test2_3.success) {
  console.log('     ✓ PASSED (correctly rejected)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 2.4: Non-numeric values
console.log('\n2.4 - Non-numeric Values (should reject)');
const test2_4 = chamber2.predictNext([1, 'hello', 3]);
if (!test2_4.success) {
  console.log('     ✓ PASSED (correctly rejected)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 2.5: NaN values
console.log('\n2.5 - NaN Values (should reject)');
const test2_5 = chamber2.predictNext([1, NaN, 3]);
if (!test2_5.success) {
  console.log('     ✓ PASSED (correctly rejected)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// ============================================================
// PART 3: ARITHMETIC PROGRESSION VALIDATION TESTS
// ============================================================

console.log('\n\n📋 PART 3: ARITHMETIC PROGRESSION VALIDATION TESTS');
console.log('═══════════════════════════════════════════════════════════\n');

const chamber3 = new EchoChamber();

// Test 3.1: Valid arithmetic progression
console.log('3.1 - Valid Arithmetic Progression [2, 4, 6, 8]');
const test3_1 = chamber3.validateSequence([2, 4, 6, 8]);
if (test3_1.isValid && test3_1.difference === 2) {
  console.log('     ✓ PASSED (difference = 2)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 3.2: Invalid progression (geometric)
console.log('\n3.2 - Invalid Progression [1, 2, 4, 8] (geometric, not arithmetic)');
const test3_2 = chamber3.validateSequence([1, 2, 4, 8]);
if (!test3_2.isValid) {
  console.log('     ✓ PASSED (correctly identified as invalid)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 3.3: Invalid progression (random)
console.log('\n3.3 - Invalid Progression [1, 3, 4, 10] (random numbers)');
const test3_3 = chamber3.validateSequence([1, 3, 4, 10]);
if (!test3_3.isValid) {
  console.log('     ✓ PASSED (correctly identified as invalid)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// ============================================================
// PART 4: EDGE CASE TESTS
// ============================================================

console.log('\n\n📋 PART 4: EDGE CASE TESTS');
console.log('═══════════════════════════════════════════════════════════\n');

const chamber4 = new EchoChamber();

// Test 4.1: Negative numbers
console.log('4.1 - Negative Numbers [-10, -5, 0, 5] → 10');
const test4_1 = chamber4.predictNext([-10, -5, 0, 5]);
if (test4_1.success && test4_1.nextNumber === 10) {
  console.log('     ✓ PASSED');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 4.2: Floating point numbers
console.log('\n4.2 - Floating Point [0.5, 1.5, 2.5, 3.5] → 4.5');
const test4_2 = chamber4.predictNext([0.5, 1.5, 2.5, 3.5]);
if (test4_2.success && test4_2.nextNumber === 4.5) {
  console.log('     ✓ PASSED');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 4.3: Zero difference
console.log('\n4.3 - Zero Difference (Constant) [7, 7, 7, 7] → 7');
const test4_3 = chamber4.predictNext([7, 7, 7, 7]);
if (test4_3.success && test4_3.nextNumber === 7) {
  console.log('     ✓ PASSED');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 4.4: Two-element sequence
console.log('\n4.4 - Two Elements [5, 10] → 15');
const test4_4 = chamber4.predictNext([5, 10]);
if (test4_4.success && test4_4.nextNumber === 15) {
  console.log('     ✓ PASSED');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// Test 4.5: Very large numbers
console.log('\n4.5 - Very Large Numbers [1000000, 2000000, 3000000] → 4000000');
const test4_5 = chamber4.predictNext([1000000, 2000000, 3000000]);
if (test4_5.success && test4_5.nextNumber === 4000000) {
  console.log('     ✓ PASSED');
  testsPassed++;
} else {
  console.log('     ✗ FAILED');
  testsFailed++;
}

// ============================================================
// PART 5: MEMORY TRACKING TESTS
// ============================================================

console.log('\n\n📋 PART 5: MEMORY TRACKING TESTS');
console.log('═══════════════════════════════════════════════════════════\n');

const chamber5 = new EchoChamber();

console.log('5.1 - Testing Memory Storage');
chamber5.predictNext([1, 2, 3]);
chamber5.predictNext([10, 20, 30]);
chamber5.predictNext([5, 5, 5]);

const memories = chamber5.getMemories();
if (memories.length === 3) {
  console.log('     ✓ PASSED (3 memories stored)');
  testsPassed++;
} else {
  console.log(`     ✗ FAILED (expected 3 memories, got ${memories.length})`);
  testsFailed++;
}

console.log('\n5.2 - Testing Memory Content');
if (memories[0].sequence &&
    memories[0].nextNumber &&
    memories[0].commonDifference !== undefined &&
    memories[0].timestamp &&
    memories[0].predictionIndex === 1) {
  console.log('     ✓ PASSED (all memory fields present)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED (incomplete memory data)');
  testsFailed++;
}

console.log('\n5.3 - Testing Clear Memories');
chamber5.clearMemories();
const memoriesAfterClear = chamber5.getMemories();
if (memoriesAfterClear.length === 0) {
  console.log('     ✓ PASSED (memories cleared)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED (memories not cleared)');
  testsFailed++;
}

// ============================================================
// PART 6: API METHODS TESTS
// ============================================================

console.log('\n\n📋 PART 6: API METHODS TESTS');
console.log('═══════════════════════════════════════════════════════════\n');

const chamber6 = new EchoChamber();

console.log('6.1 - Testing predictNext() return structure');
const testResult = chamber6.predictNext([2, 4, 6]);
if (testResult.success !== undefined &&
    testResult.nextNumber !== undefined &&
    testResult.commonDifference !== undefined &&
    testResult.message !== undefined) {
  console.log('     ✓ PASSED (all required fields present)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED (missing required fields)');
  testsFailed++;
}

console.log('\n6.2 - Testing validateSequence() return structure');
const validationResult = chamber6.validateSequence([1, 2, 3]);
if (validationResult.isValid !== undefined &&
    validationResult.difference !== undefined &&
    validationResult.message !== undefined) {
  console.log('     ✓ PASSED (all required fields present)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED (missing required fields)');
  testsFailed++;
}

console.log('\n6.3 - Testing getMemories() returns array');
const testMemories = chamber6.getMemories();
if (Array.isArray(testMemories)) {
  console.log('     ✓ PASSED (returns array)');
  testsPassed++;
} else {
  console.log('     ✗ FAILED (does not return array)');
  testsFailed++;
}

// ============================================================
// FINAL SUMMARY
// ============================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║                     TEST SUMMARY                           ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

const totalTests = testsPassed + testsFailed;
const successRate = totalTests > 0 ? Math.round((testsPassed / totalTests) * 100) : 0;

console.log(`📊 Total Tests: ${totalTests}`);
console.log(`✓ Passed: ${testsPassed}`);
console.log(`✗ Failed: ${testsFailed}`);
console.log(`📈 Success Rate: ${successRate}%`);

if (testsFailed === 0) {
  console.log('\n🎉 ALL TESTS PASSED! The Echo Chamber is ready for adventure!\n');
} else {
  console.log('\n⚠️  Some tests failed. Please review the output above.\n');
}

console.log('═══════════════════════════════════════════════════════════\n');
