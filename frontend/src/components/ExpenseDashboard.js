import React, { useState, useEffect } from 'react';
import './ExpenseDashboard.css';

function ExpenseDashboard({ refreshTrigger }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadExpenses = async () => {
    setLoading(true);
    setError(null);

    try {
      const expenseService = require('../services/expenseService').default;
      const result = await expenseService.getExpenses({ limit: 100 });
      setExpenses(result.expenses || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      const expenseService = require('../services/expenseService').default;
      await expenseService.deleteExpense(id);
      loadExpenses();
    } catch (err) {
      alert('Failed to delete expense');
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return <div className="expense-dashboard loading">Loading expenses...</div>;
  }

  if (error) {
    return <div className="expense-dashboard error">Error: {error}</div>;
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + (expense.total || 0), 0);

  return (
    <div className="expense-dashboard">
      <div className="dashboard-header">
        <h2>Expense History</h2>
        <div className="total-amount">
          Total: {formatAmount(totalAmount)}
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="no-expenses">
          No expenses yet. Upload a receipt to get started!
        </div>
      ) : (
        <div className="expense-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{formatDate(expense.date)}</td>
                  <td>{expense.merchant}</td>
                  <td className="amount">{formatAmount(expense.total)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseDashboard;
