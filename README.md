# Expensifyr

A cloud-based Expense Analyzer application that uses AI-powered OCR to automatically extract expense information from receipt images. Built with Node.js, React, Google Vision API, and Firestore.

## Features

- 📸 **Receipt Upload**: Upload receipt images through an intuitive web interface
- 🤖 **AI-Powered OCR**: Automatic text extraction using Google Vision API
- 📊 **Smart Parsing**: Automatically extracts merchant name, date, and total amount from receipts
- 💾 **Cloud Storage**: Stores structured expense data in Google Firestore
- 📈 **Expense Dashboard**: View all expenses in a clean, organized dashboard
- 🗑️ **Expense Management**: Delete expenses with a single click
- ☁️ **Cloud-Ready**: Designed for deployment on Google Cloud Run

## Architecture

### Backend (Node.js + Express)
- **Express Server**: RESTful API with CORS support
- **Google Vision API**: OCR service for text extraction from images
- **Google Firestore**: NoSQL database for expense storage
- **Multer**: File upload handling with validation
- **Smart Parser**: Custom receipt parsing logic with multiple date and amount formats

### Frontend (React)
- **React Components**: Modular component architecture
- **File Upload**: Drag-and-drop ready receipt upload
- **Real-time Dashboard**: Automatic refresh on new uploads
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
Expensifyr/
├── backend/
│   ├── src/
│   │   ├── index.js              # Express server setup
│   │   ├── routes/
│   │   │   ├── upload.js         # Upload endpoint
│   │   │   └── expenses.js       # Expense CRUD endpoints
│   │   └── services/
│   │       ├── visionService.js  # Google Vision API integration
│   │       └── firestoreService.js # Firestore database operations
│   ├── __tests__/                # Backend tests
│   ├── Dockerfile                # Container configuration
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ReceiptUpload.js  # Upload component
    │   │   └── ExpenseDashboard.js # Dashboard component
    │   ├── services/
    │   │   └── expenseService.js # API client
    │   └── App.js                # Main application
    ├── public/
    └── package.json
```

## Installation

### Prerequisites
- Node.js 18+ and npm
- Google Cloud account with billing enabled
- Google Cloud project with Vision API and Firestore enabled

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Google Cloud credentials:
   - Create a service account in Google Cloud Console
   - Download the service account key JSON file
   - Save it as `service-account-key.json` in the backend directory

4. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Upload
- `POST /api/upload` - Upload and process receipt image
  - Body: `multipart/form-data` with `receipt` field
  - Returns: Processed expense data

### Expenses
- `GET /api/expenses` - Get all expenses
  - Query params: `limit`, `orderBy`, `direction`
- `GET /api/expenses/:id` - Get single expense
- `DELETE /api/expenses/:id` - Delete expense

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Deploy to Google Cloud Run

1. Build the Docker image:
   ```bash
   cd backend
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/expensifyr
   ```

2. Deploy to Cloud Run:
   ```bash
   gcloud run deploy expensifyr \
     --image gcr.io/YOUR_PROJECT_ID/expensifyr \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

3. Set environment variables in Cloud Run:
   - The service account will be automatically configured
   - No manual credentials needed when running on GCP

### Deploy Frontend

1. Build the production bundle:
   ```bash
   cd frontend
   REACT_APP_API_URL=https://your-backend-url.run.app/api npm run build
   ```

2. Deploy to Firebase Hosting, Cloud Storage, or any static hosting service

## Usage

1. **Upload a Receipt**:
   - Click "Choose a receipt image" or drag and drop an image
   - Click "Upload and Process"
   - Wait for the OCR processing to complete

2. **View Expenses**:
   - All expenses appear in the dashboard automatically
   - See merchant name, date, and amount for each expense
   - View total amount at the top

3. **Manage Expenses**:
   - Click "Delete" to remove an expense
   - Refresh occurs automatically after actions

## Receipt Parsing

The system can parse various receipt formats and automatically extracts:

- **Merchant Name**: First line of the receipt (usually the store name)
- **Date**: Supports multiple formats:
  - MM/DD/YYYY
  - YYYY-MM-DD
  - Month Day, Year (e.g., Jan 15, 2024)
- **Total Amount**: Searches for labeled totals or picks the largest amount

## Development

### Code Style
- ESLint for JavaScript linting
- Prettier for code formatting
- Jest for testing

### Git Workflow
1. Create a feature branch
2. Make changes and write tests
3. Run tests locally
4. Submit pull request

## Technologies Used

- **Backend**: Node.js, Express, Multer
- **Frontend**: React, Axios
- **Cloud Services**: Google Vision API, Google Firestore, Google Cloud Run
- **Testing**: Jest, Supertest, React Testing Library
- **Containerization**: Docker

## License

GNU General Public License v3.0

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues or questions, please open a GitHub issue.