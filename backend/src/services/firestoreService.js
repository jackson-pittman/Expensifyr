const { Firestore } = require('@google-cloud/firestore');

class FirestoreService {
  constructor() {
    // Initialize Firestore
    // In production, credentials will be automatically detected from environment
    this.db = new Firestore();
    this.collection = 'expenses';
  }

  /**
   * Store expense in Firestore
   * @param {Object} expenseData - Expense data to store
   * @returns {Promise<Object>} Stored expense with ID
   */
  async storeExpense(expenseData) {
    try {
      const expense = {
        ...expenseData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await this.db.collection(this.collection).add(expense);
      
      return {
        id: docRef.id,
        ...expense
      };
    } catch (error) {
      console.error('Firestore store error:', error);
      throw new Error('Failed to store expense');
    }
  }

  /**
   * Get all expenses
   * @param {Object} options - Query options (limit, orderBy, etc.)
   * @returns {Promise<Array>} Array of expenses
   */
  async getExpenses(options = {}) {
    try {
      const { limit = 100, orderBy = 'createdAt', direction = 'desc' } = options;
      
      let query = this.db.collection(this.collection)
        .orderBy(orderBy, direction);
      
      if (limit) {
        query = query.limit(limit);
      }

      const snapshot = await query.get();
      
      const expenses = [];
      snapshot.forEach(doc => {
        expenses.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return expenses;
    } catch (error) {
      console.error('Firestore get error:', error);
      throw new Error('Failed to retrieve expenses');
    }
  }

  /**
   * Get expense by ID
   * @param {string} id - Expense ID
   * @returns {Promise<Object>} Expense data
   */
  async getExpenseById(id) {
    try {
      const doc = await this.db.collection(this.collection).doc(id).get();
      
      if (!doc.exists) {
        throw new Error('Expense not found');
      }

      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error('Firestore get by ID error:', error);
      throw error;
    }
  }

  /**
   * Delete expense by ID
   * @param {string} id - Expense ID
   * @returns {Promise<void>}
   */
  async deleteExpense(id) {
    try {
      await this.db.collection(this.collection).doc(id).delete();
    } catch (error) {
      console.error('Firestore delete error:', error);
      throw new Error('Failed to delete expense');
    }
  }
}

module.exports = new FirestoreService();
