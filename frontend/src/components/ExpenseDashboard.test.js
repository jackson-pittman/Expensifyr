import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ExpenseDashboard from './ExpenseDashboard';
import expenseService from '../services/expenseService';

// Mock the expense service
jest.mock('../services/expenseService');

describe('ExpenseDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    expenseService.getExpenses.mockImplementation(() => new Promise(() => {}));
    
    render(<ExpenseDashboard />);
    expect(screen.getByText('Loading expenses...')).toBeInTheDocument();
  });

  it('renders empty state when no expenses', async () => {
    expenseService.getExpenses.mockResolvedValue({ expenses: [] });
    
    render(<ExpenseDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
    });
  });

  it('renders expenses list', async () => {
    const mockExpenses = [
      {
        id: '1',
        date: '2024-01-15',
        merchant: 'Walmart',
        total: 45.67
      },
      {
        id: '2',
        date: '2024-01-16',
        merchant: 'Target',
        total: 123.45
      }
    ];

    expenseService.getExpenses.mockResolvedValue({ expenses: mockExpenses });
    
    render(<ExpenseDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Walmart')).toBeInTheDocument();
      expect(screen.getByText('Target')).toBeInTheDocument();
      expect(screen.getByText('$45.67')).toBeInTheDocument();
      expect(screen.getByText('$123.45')).toBeInTheDocument();
    });
  });

  it('displays total amount', async () => {
    const mockExpenses = [
      { id: '1', date: '2024-01-15', merchant: 'Store A', total: 50 },
      { id: '2', date: '2024-01-16', merchant: 'Store B', total: 100 }
    ];

    expenseService.getExpenses.mockResolvedValue({ expenses: mockExpenses });
    
    render(<ExpenseDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Total: \$150\.00/)).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    expenseService.getExpenses.mockRejectedValue(new Error('Failed to load'));
    
    render(<ExpenseDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load expenses/i)).toBeInTheDocument();
    });
  });
});
