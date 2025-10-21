const expenseService = {
  uploadReceipt: jest.fn().mockResolvedValue({ 
    success: true, 
    expense: { id: '1', merchant: 'Test', total: 10 } 
  }),
  getExpenses: jest.fn().mockResolvedValue({ 
    success: true, 
    expenses: [] 
  }),
  getExpenseById: jest.fn().mockResolvedValue({ 
    success: true, 
    expense: { id: '1', merchant: 'Test', total: 10 } 
  }),
  deleteExpense: jest.fn().mockResolvedValue({ 
    success: true 
  })
};

export default expenseService;
