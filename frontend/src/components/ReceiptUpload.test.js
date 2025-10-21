import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReceiptUpload from './ReceiptUpload';
import expenseService from '../services/expenseService';

// Mock the expense service
jest.mock('../services/expenseService');

describe('ReceiptUpload Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders upload form', () => {
    render(<ReceiptUpload />);
    expect(screen.getByText('Upload Receipt')).toBeInTheDocument();
    expect(screen.getByText('Choose a receipt image')).toBeInTheDocument();
  });

  it('shows file name when file is selected', () => {
    render(<ReceiptUpload />);
    
    const file = new File(['test'], 'receipt.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose a receipt image/i);
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.getByText('receipt.jpg')).toBeInTheDocument();
  });

  it('disables upload button when no file selected', () => {
    render(<ReceiptUpload />);
    
    const button = screen.getByText('Upload and Process');
    expect(button).toBeDisabled();
  });

  it('handles upload error', async () => {
    expenseService.uploadReceipt.mockRejectedValue({
      response: { data: { message: 'Upload failed' } }
    });

    render(<ReceiptUpload />);
    
    const file = new File(['test'], 'receipt.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/choose a receipt image/i);
    
    fireEvent.change(input, { target: { files: [file] } });
    
    const button = screen.getByText('Upload and Process');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/upload failed/i)).toBeInTheDocument();
    });
  });
});
