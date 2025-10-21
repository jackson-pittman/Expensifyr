const vision = require('@google-cloud/vision');

class VisionService {
  constructor() {
    // Initialize Vision API client
    // In production, credentials will be automatically detected from environment
    this.client = new vision.ImageAnnotatorClient();
  }

  /**
   * Extract text from image using Google Vision API
   * @param {Buffer} imageBuffer - Image file buffer
   * @returns {Promise<string>} Extracted text
   */
  async extractText(imageBuffer) {
    try {
      const [result] = await this.client.textDetection(imageBuffer);
      const detections = result.textAnnotations;
      
      if (!detections || detections.length === 0) {
        throw new Error('No text detected in image');
      }

      // First annotation contains the full text
      return detections[0].description;
    } catch (error) {
      console.error('Vision API error:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  /**
   * Parse receipt data from extracted text
   * @param {string} text - Raw text from OCR
   * @returns {Object} Parsed receipt data
   */
  parseReceiptData(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let merchant = null;
    let date = null;
    let total = null;

    // Extract merchant (usually first line or most prominent text)
    if (lines.length > 0) {
      merchant = lines[0];
    }

    // Extract date (look for common date patterns)
    const datePatterns = [
      /(\d{4}-\d{2}-\d{2})/,  // YYYY-MM-DD format (ISO)
      /(\d{1,2}\/\d{1,2}\/\d{2,4})/,  // MM/DD/YYYY or similar
      /(\d{1,2}-\d{1,2}-\d{4})/,  // MM-DD-YYYY
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}/i,
      /(\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4})/i
    ];

    for (const line of lines) {
      for (const pattern of datePatterns) {
        const match = line.match(pattern);
        if (match) {
          date = match[0];
          break;
        }
      }
      if (date) break;
    }

    // Extract total (look for amount patterns, prefer ones labeled as total/amount)
    const amountPatterns = [
      /(?:total|amount|balance|sum)[\s:]*\$?(\d+(?:,\d{3})*[.,]\d{2})/i,
      /\$(\d+(?:,\d{3})*[.,]\d{2})/g
    ];

    // First try to find labeled total
    for (const line of lines) {
      const match = line.match(amountPatterns[0]);
      if (match) {
        // Remove commas used as thousands separators, then convert to float
        total = parseFloat(match[1].replace(/,(\d{3})/g, '$1').replace(',', '.'));
        break;
      }
    }

    // If no labeled total found, look for amounts and pick the largest
    if (total === null) {
      const amounts = [];
      for (const line of lines) {
        let match;
        const regex = amountPatterns[1];
        while ((match = regex.exec(line)) !== null) {
          // Remove commas used as thousands separators, then convert to float
          amounts.push(parseFloat(match[1].replace(/,(\d{3})/g, '$1').replace(',', '.')));
        }
      }
      if (amounts.length > 0) {
        total = Math.max(...amounts);
      }
    }

    // If no date found, use current date
    if (!date) {
      date = new Date().toISOString().split('T')[0];
    }

    return {
      merchant: merchant || 'Unknown',
      date: date || new Date().toISOString().split('T')[0],
      total: total || 0,
      rawText: text
    };
  }
}

module.exports = new VisionService();
