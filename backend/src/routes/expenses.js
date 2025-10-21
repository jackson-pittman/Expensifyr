const express = require('express');
const firestoreService = require('../services/firestoreService');

const router = express.Router();

/**
 * GET /api/expenses
 * Get all expenses
 */
router.get('/', async (req, res) => {
  try {
    const { limit, orderBy, direction } = req.query;
    
    const expenses = await firestoreService.getExpenses({
      limit: limit ? parseInt(limit) : undefined,
      orderBy: orderBy || 'createdAt',
      direction: direction || 'desc'
    });

    res.status(200).json({
      success: true,
      expenses,
      count: expenses.length
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve expenses',
      message: error.message 
    });
  }
});

/**
 * GET /api/expenses/:id
 * Get expense by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const expense = await firestoreService.getExpenseById(req.params.id);
    
    res.status(200).json({
      success: true,
      expense
    });
  } catch (error) {
    console.error('Get expense error:', error);
    if (error.message === 'Expense not found') {
      res.status(404).json({ error: 'Expense not found' });
    } else {
      res.status(500).json({ 
        error: 'Failed to retrieve expense',
        message: error.message 
      });
    }
  }
});

/**
 * DELETE /api/expenses/:id
 * Delete expense by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    await firestoreService.deleteExpense(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ 
      error: 'Failed to delete expense',
      message: error.message 
    });
  }
});

module.exports = router;
