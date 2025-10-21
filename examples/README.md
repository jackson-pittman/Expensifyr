# Example Receipts

This directory contains sample receipt images for testing the Expensifyr application.

## Sample Receipt

**File**: `sample_receipt.jpg`

This is a synthetic receipt created for testing purposes with the following data:
- **Merchant**: TARGET
- **Date**: 01/15/2024
- **Total**: $32.42
- **Items**: Milk, Bread, Eggs, Chicken, Vegetables

## Using Sample Receipts

### Web Interface

1. Start the application (see [QUICKSTART.md](../QUICKSTART.md))
2. Navigate to `http://localhost:3000`
3. Click "Choose a receipt image"
4. Select `examples/sample_receipt.jpg`
5. Click "Upload and Process"

### API Testing

Using curl:
```bash
curl -X POST http://localhost:8080/api/upload \
  -F "receipt=@examples/sample_receipt.jpg"
```

Using Postman:
1. Create a new POST request to `http://localhost:8080/api/upload`
2. In Body tab, select "form-data"
3. Add key "receipt" with type "File"
4. Select `examples/sample_receipt.jpg`
5. Send the request

## Expected Results

When processing the sample receipt, you should receive:

```json
{
  "success": true,
  "expense": {
    "id": "auto-generated-id",
    "merchant": "TARGET",
    "date": "01/15/2024",
    "total": 32.42,
    "rawText": "TARGET\n...",
    "fileName": "sample_receipt.jpg",
    "mimeType": "image/jpeg",
    "createdAt": "2024-01-15T...",
    "updatedAt": "2024-01-15T..."
  }
}
```

## Creating Your Own Test Receipts

You can create test receipts with various formats to test different parsing scenarios:

### Date Formats
- MM/DD/YYYY: `01/15/2024`
- YYYY-MM-DD: `2024-01-15`
- Month Day, Year: `Jan 15, 2024`

### Amount Formats
- With label: `Total: $32.42`
- Without label: `$32.42`
- With thousands separator: `$1,234.56`

### Best Practices for Test Receipts

1. **Clear Text**: Use legible fonts and high contrast
2. **Proper Structure**: Include merchant, date, and total
3. **Realistic Layout**: Follow typical receipt format
4. **Various Formats**: Test different date and amount formats
5. **Image Quality**: Use clear, well-lit images (300+ DPI recommended)

## Real Receipt Testing

When testing with real receipts:

1. **Privacy**: Remove or blur any sensitive information (credit card numbers, personal details)
2. **Quality**: Ensure good lighting and focus
3. **Format**: JPG, PNG, or other common image formats
4. **Size**: Keep under 5MB (enforced by upload limits)
5. **Orientation**: Portrait orientation works best

## Troubleshooting

### Receipt Not Parsing Correctly

If the OCR or parsing doesn't work as expected:

1. **Check Image Quality**: Ensure text is clear and readable
2. **Lighting**: Avoid shadows and glare
3. **Angle**: Take photos straight-on, not at an angle
4. **Resolution**: Higher resolution generally produces better results
5. **Format**: Some formats may not have clear date/total labels

### Supported Receipt Types

The parser works best with:
- Standard retail receipts
- Restaurant bills
- Gas station receipts
- Grocery store receipts

May have difficulty with:
- Handwritten receipts
- Thermal receipts (faded)
- Non-English text
- Complex multi-page receipts

## Contributing Examples

To contribute additional test receipts:

1. Create synthetic receipts (don't use real personal receipts)
2. Document the expected parsing results
3. Submit via pull request
4. Include description of what the receipt tests

## License

Sample receipts in this directory are provided for testing purposes only and are part of the Expensifyr project under GPL-3.0.
