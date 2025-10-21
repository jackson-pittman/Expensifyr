import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the expense service
jest.mock('./services/expenseService');

test('renders Expensifyr header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Expensifyr/i });
  expect(headerElement).toBeInTheDocument();
});

test('renders upload component', () => {
  render(<App />);
  const uploadHeader = screen.getByText(/Upload Receipt/i);
  expect(uploadHeader).toBeInTheDocument();
});
