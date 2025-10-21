const visionService = require('../src/services/visionService');

describe('VisionService', () => {
  describe('parseReceiptData', () => {
    it('should parse merchant from first line', () => {
      const text = 'Walmart\n123 Main St\n01/15/2024\nTotal: $45.67';
      const result = visionService.parseReceiptData(text);
      
      expect(result.merchant).toBe('Walmart');
    });

    it('should parse date in MM/DD/YYYY format', () => {
      const text = 'Store Name\n01/15/2024\nTotal: $45.67';
      const result = visionService.parseReceiptData(text);
      
      expect(result.date).toBe('01/15/2024');
    });

    it('should parse date in YYYY-MM-DD format', () => {
      const text = 'Store Name\n2024-01-15\nTotal: $45.67';
      const result = visionService.parseReceiptData(text);
      
      expect(result.date).toBe('2024-01-15');
    });

    it('should parse date with month name', () => {
      const text = 'Store Name\nJan 15, 2024\nTotal: $45.67';
      const result = visionService.parseReceiptData(text);
      
      expect(result.date).toMatch(/Jan.*15.*2024/i);
    });

    it('should parse total with label', () => {
      const text = 'Store Name\n01/15/2024\nTotal: $45.67';
      const result = visionService.parseReceiptData(text);
      
      expect(result.total).toBe(45.67);
    });

    it('should parse total without label', () => {
      const text = 'Store Name\n01/15/2024\n$45.67';
      const result = visionService.parseReceiptData(text);
      
      expect(result.total).toBe(45.67);
    });

    it('should handle comma in amount', () => {
      const text = 'Store Name\n01/15/2024\nTotal: $1,234.56';
      const result = visionService.parseReceiptData(text);
      
      expect(result.total).toBe(1234.56);
    });

    it('should pick largest amount when multiple found', () => {
      const text = 'Store Name\n01/15/2024\n$10.50\n$25.30\n$100.00';
      const result = visionService.parseReceiptData(text);
      
      expect(result.total).toBe(100.00);
    });

    it('should use default values for missing data', () => {
      const text = '';
      const result = visionService.parseReceiptData(text);
      
      expect(result.merchant).toBe('Unknown');
      expect(result.date).toBeTruthy();
      expect(result.total).toBe(0);
    });

    it('should preserve raw text', () => {
      const text = 'Store Name\n01/15/2024\nTotal: $45.67';
      const result = visionService.parseReceiptData(text);
      
      expect(result.rawText).toBe(text);
    });
  });
});
