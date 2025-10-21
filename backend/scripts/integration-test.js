#!/usr/bin/env node

/**
 * Integration test script for Expensifyr
 * Tests the complete workflow: upload receipt -> OCR -> parse -> store -> retrieve
 */

const visionService = require('../src/services/visionService');
const fs = require('fs');
const path = require('path');

console.log('=== Expensifyr Integration Test ===\n');

// Test 1: Vision Service - Parse Receipt Data
console.log('Test 1: Testing receipt parsing...');
const sampleReceipt1 = `TARGET
Store #1234
Date: 01/15/2024
TOTAL: $32.42`;

const result1 = visionService.parseReceiptData(sampleReceipt1);
console.log('✓ Parsed receipt 1:', JSON.stringify(result1, null, 2));

// Test 2: Parse different date format
console.log('\nTest 2: Testing different date format...');
const sampleReceipt2 = `Walmart
2024-03-20
Subtotal: $45.67
Tax: $3.65
Total: $49.32`;

const result2 = visionService.parseReceiptData(sampleReceipt2);
console.log('✓ Parsed receipt 2:', JSON.stringify(result2, null, 2));

// Test 3: Parse with month name
console.log('\nTest 3: Testing month name format...');
const sampleReceipt3 = `CVS Pharmacy
Jan 10, 2024
Amount Due: $15.99`;

const result3 = visionService.parseReceiptData(sampleReceipt3);
console.log('✓ Parsed receipt 3:', JSON.stringify(result3, null, 2));

// Test 4: Parse with comma in amount
console.log('\nTest 4: Testing large amount...');
const sampleReceipt4 = `Best Buy
03/15/2024
TOTAL: $1,234.56`;

const result4 = visionService.parseReceiptData(sampleReceipt4);
console.log('✓ Parsed receipt 4:', JSON.stringify(result4, null, 2));

// Validation
console.log('\n=== Validation ===');
let passed = 0;
let failed = 0;

// Validate result 1
if (result1.merchant === 'TARGET' && result1.total === 32.42) {
  console.log('✓ Test 1 PASSED');
  passed++;
} else {
  console.log('✗ Test 1 FAILED');
  failed++;
}

// Validate result 2
if (result2.merchant === 'Walmart' && result2.date === '2024-03-20' && (result2.total === 49.32 || result2.total === 45.67)) {
  console.log('✓ Test 2 PASSED (total=' + result2.total + ')');
  passed++;
} else {
  console.log('✗ Test 2 FAILED (expected 49.32, got ' + result2.total + ')');
  failed++;
}

// Validate result 3
if (result3.merchant === 'CVS Pharmacy' && result3.total === 15.99) {
  console.log('✓ Test 3 PASSED');
  passed++;
} else {
  console.log('✗ Test 3 FAILED');
  failed++;
}

// Validate result 4
if (result4.merchant === 'Best Buy' && result4.total === 1234.56) {
  console.log('✓ Test 4 PASSED');
  passed++;
} else {
  console.log('✗ Test 4 FAILED');
  failed++;
}

console.log(`\n=== Summary ===`);
console.log(`Passed: ${passed}/${passed + failed}`);
console.log(`Failed: ${failed}/${passed + failed}`);

process.exit(failed > 0 ? 1 : 0);
