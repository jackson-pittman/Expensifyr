import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ExpenseService {
  /**
   * Upload receipt image
   * @param {File} file - Receipt image file
   * @returns {Promise} API response
   */
  async uploadReceipt(file) {
    const formData = new FormData();
    formData.append('receipt', file);

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }

  /**
   * Get all expenses
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  async getExpenses(params = {}) {
    const response = await axios.get(`${API_BASE_URL}/expenses`, { params });
    return response.data;
  }

  /**
   * Get expense by ID
   * @param {string} id - Expense ID
   * @returns {Promise} API response
   */
  async getExpenseById(id) {
    const response = await axios.get(`${API_BASE_URL}/expenses/${id}`);
    return response.data;
  }

  /**
   * Delete expense
   * @param {string} id - Expense ID
   * @returns {Promise} API response
   */
  async deleteExpense(id) {
    const response = await axios.delete(`${API_BASE_URL}/expenses/${id}`);
    return response.data;
  }
}

export default new ExpenseService();
