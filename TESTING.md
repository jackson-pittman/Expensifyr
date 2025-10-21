# Testing Guide for Expensifyr

This guide explains how to run and understand the various tests in the Expensifyr project.

## Test Structure

### Backend Tests

Located in `backend/__tests__/`:

1. **api.test.js** - Integration tests for API endpoints
   - Health check endpoint
   - Expense listing and retrieval
   - Receipt upload functionality
   
2. **visionService.test.js** - Unit tests for receipt parsing logic
   - Date format parsing (MM/DD/YYYY, YYYY-MM-DD, month names)
   - Amount parsing with various formats
   - Merchant name extraction
   - Edge cases and default values

### Frontend Tests

Located in `frontend/src/components/`:

1. **App.test.js** - Main app component tests
2. **ReceiptUpload.test.js** - Upload component tests
3. **ExpenseDashboard.test.js** - Dashboard component tests

## Running Tests

### Backend

```bash
cd backend

# Run all tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

#### Expected Output

```
Test Suites: 2 passed, 2 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        2s
Coverage:    >50% across all metrics
```

### Frontend

```bash
cd frontend

# Run all tests
npm test -- --watchAll=false

# Run tests in watch mode
npm test
```

#### Expected Output

```
Test Suites: 3 passed, 3 total
Tests:       11 passed, 11 total
Snapshots:   0 total
```

## Test Coverage

### Backend Coverage

Current coverage targets:
- Statements: 50%
- Branches: 50%
- Functions: 40%
- Lines: 50%

Note: Lower thresholds are used because integration with Google Cloud services (Vision API and Firestore) are mocked in tests.

### Frontend Coverage

React Testing Library is used for component testing with:
- Component rendering tests
- User interaction simulation
- API integration testing with mocks

## Understanding Test Results

### Passing Tests

✓ Green checkmarks indicate passing tests
- All assertions passed
- No errors or timeouts
- Expected behavior confirmed

### Failing Tests

✗ Red X marks indicate failing tests
- Review error messages for details
- Check expected vs. actual values
- Verify test data matches expectations

### Coverage Reports

Coverage reports show:
- **Statements**: Percentage of code statements executed
- **Branches**: Percentage of conditional branches tested
- **Functions**: Percentage of functions called
- **Lines**: Percentage of code lines executed
- **Uncovered Lines**: Specific lines not covered by tests

## Writing New Tests

### Backend Test Example

```javascript
describe('My Feature', () => {
  it('should do something', async () => {
    // Arrange
    const input = 'test data';
    
    // Act
    const result = await myFunction(input);
    
    // Assert
    expect(result).toBe('expected value');
  });
});
```

### Frontend Test Example

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  const element = screen.getByText(/expected text/i);
  expect(element).toBeInTheDocument();
});
```

## Integration Testing

The integration test script (`backend/scripts/integration-test.js`) tests the complete receipt parsing workflow:

```bash
npm run test:integration
```

This validates:
1. Different date formats are parsed correctly
2. Various amount formats (with/without labels, thousands separators)
3. Merchant name extraction
4. Edge cases and defaults

## Mocking Strategy

### Backend Mocks

- **Firestore**: Mocked to avoid requiring actual database
- **Vision API**: Mocked for upload tests to avoid API calls
- **File uploads**: Uses memory buffers instead of actual files

### Frontend Mocks

- **Expense Service**: Mocked to avoid actual API calls
- **Axios**: Mocked at the module level
- **File uploads**: Simulated with test files

## Continuous Integration

When running in CI/CD:

```bash
# Backend
cd backend && npm test

# Frontend  
cd frontend && npm test -- --watchAll=false
```

Both should exit with code 0 (success) for the build to pass.

## Troubleshooting

### Tests Timing Out

- Increase Jest timeout in test files: `jest.setTimeout(10000)`
- Check for unresolved promises
- Ensure mocks are properly configured

### Coverage Not Meeting Threshold

- Add more test cases
- Test edge cases
- Ensure all code paths are exercised
- Adjust thresholds if using extensive mocking

### Import Errors

- Check mock locations match import paths
- Verify `__mocks__` directory structure
- Ensure Jest configuration includes necessary transforms

### Frontend Tests Failing

- Verify `setupTests.js` is configured correctly
- Check that Testing Library matchers are available
- Ensure async operations are properly awaited

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how
2. **Keep Tests Independent**: Each test should run in isolation
3. **Use Descriptive Names**: Test names should clearly describe what's being tested
4. **Mock External Dependencies**: Don't rely on external services in tests
5. **Test Edge Cases**: Include boundary conditions and error cases
6. **Maintain Test Data**: Keep test fixtures organized and documented

## Manual Testing

In addition to automated tests, perform manual testing:

1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm start`
3. Upload a test receipt image
4. Verify data appears in dashboard
5. Test delete functionality
6. Check browser console for errors

## Performance Testing

For production:
- Monitor API response times
- Check OCR processing duration
- Verify database query performance
- Test with various image sizes and formats

## Security Testing

- Validate file upload restrictions
- Test CORS configuration
- Verify API authentication (when implemented)
- Check for injection vulnerabilities
