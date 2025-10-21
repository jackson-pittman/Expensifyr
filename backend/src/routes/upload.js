const express = require('express');
const multer = require('multer');
const visionService = require('../services/visionService');
const firestoreService = require('../services/firestoreService');

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

/**
 * POST /api/upload
 * Upload and process receipt image
 */
router.post('/', upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text from image using Vision API
    const extractedText = await visionService.extractText(req.file.buffer);

    // Parse receipt data
    const receiptData = visionService.parseReceiptData(extractedText);

    // Store in Firestore
    const expense = await firestoreService.storeExpense({
      merchant: receiptData.merchant,
      date: receiptData.date,
      total: receiptData.total,
      rawText: receiptData.rawText,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype
    });

    res.status(201).json({
      success: true,
      expense
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to process receipt',
      message: error.message 
    });
  }
});

module.exports = router;
