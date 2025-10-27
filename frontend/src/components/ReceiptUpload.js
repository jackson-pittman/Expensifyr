import React, { useState } from 'react';
import './ReceiptUpload.css';

function ReceiptUpload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const expenseService = require('../services/expenseService').default;
      const result = await expenseService.uploadReceipt(selectedFile);
      
      // Clear form
      setSelectedFile(null);
      setPreview(null);
      
      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload receipt');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="receipt-upload">
      <h2>Upload Receipt</h2>
      
      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          id="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          {selectedFile ? selectedFile.name : 'Choose a receipt image'}
        </label>
      </div>

      {preview && (
        <div className="preview">
          <img src={preview} alt="Receipt preview" />
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="upload-button"
      >
        {uploading ? 'Processing...' : 'Upload and Process'}
      </button>
    </div>
  );
}

export default ReceiptUpload;