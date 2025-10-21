const request = require('supertest');
const app = require('../src/index');

// Mock the services
jest.mock('../src/services/firestoreService', () => ({
  getExpenses: jest.fn().mockResolvedValue([]),
  getExpenseById: jest.fn().mockResolvedValue({ id: '1', merchant: 'Test', total: 10 }),
  deleteExpense: jest.fn().mockResolvedValue(),
  storeExpense: jest.fn().mockResolvedValue({ id: '1', merchant: 'Test', total: 10 })
}));

jest.mock('../src/services/visionService', () => ({
  extractText: jest.fn().mockResolvedValue('Test receipt text'),
  parseReceiptData: jest.fn().mockReturnValue({
    merchant: 'Test Store',
    date: '2024-01-15',
    total: 50.00,
    rawText: 'Test receipt text'
  })
}));

describe('Server Health Check', () => {
  it('should return healthy status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'healthy' });
  });
});

describe('API Endpoints', () => {
  describe('GET /api/expenses', () => {
    it('should return expenses list', async () => {
      const response = await request(app)
        .get('/api/expenses')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('expenses');
      expect(Array.isArray(response.body.expenses)).toBe(true);
    });

    it('should accept query parameters', async () => {
      const response = await request(app)
        .get('/api/expenses?limit=10&orderBy=createdAt&direction=desc')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success');
    });
  });

  describe('POST /api/upload', () => {
    it('should reject request without file', async () => {
      const response = await request(app)
        .post('/api/upload')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should reject non-image files', async () => {
      const response = await request(app)
        .post('/api/upload')
        .attach('receipt', Buffer.from('test'), {
          filename: 'test.txt',
          contentType: 'text/plain'
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });

    it('should accept image files', async () => {
      const response = await request(app)
        .post('/api/upload')
        .attach('receipt', Buffer.from('fake-image-data'), {
          filename: 'receipt.jpg',
          contentType: 'image/jpeg'
        })
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('expense');
    });
  });
});
