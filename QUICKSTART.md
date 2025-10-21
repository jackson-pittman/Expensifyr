# Quick Start Guide

Get Expensifyr up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm installed
- (Optional) Google Cloud account for full OCR functionality

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jackson-pittman/Expensifyr.git
cd Expensifyr
```

### 2. Set Up Backend

```bash
cd backend
npm install
```

Create a `.env` file (optional for basic testing):
```bash
cp .env.example .env
```

Start the backend server:
```bash
npm start
```

The backend will be available at `http://localhost:8080`

### 3. Set Up Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file:
```bash
cp .env.example .env
```

Start the frontend development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Quick Test

### Without Google Cloud (Test Mode)

The app will run but OCR functionality requires Google Cloud setup. You can still:
- Test the UI
- Upload images (will fail at OCR step without credentials)
- Run automated tests

### With Google Cloud (Full Functionality)

1. Create a Google Cloud project
2. Enable Vision API and Firestore
3. Create a service account and download credentials JSON
4. Place the JSON file as `backend/service-account-key.json`
5. Restart the backend

Now you can:
- Upload receipt images
- See automatic OCR extraction
- Store and retrieve expenses from Firestore

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test -- --watchAll=false
```

### Integration Tests
```bash
cd backend
npm run test:integration
```

## Using the App

1. **Upload Receipt**:
   - Click "Choose a receipt image"
   - Select a receipt image (JPG, PNG, etc.)
   - Click "Upload and Process"

2. **View Expenses**:
   - Expenses appear automatically in the dashboard
   - See merchant, date, and amount for each

3. **Delete Expense**:
   - Click "Delete" button on any expense

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for cloud deployment
- Review [TESTING.md](TESTING.md) for testing guide

## Troubleshooting

### Backend won't start
- Check Node.js version: `node --version` (should be 18+)
- Delete `node_modules` and run `npm install` again
- Check port 8080 is not already in use

### Frontend won't start
- Check port 3000 is not already in use
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

### OCR not working
- Ensure Google Cloud credentials are configured
- Check Vision API is enabled in your project
- Verify service account has proper permissions

### Tests failing
- Run `npm install` to ensure all dependencies are present
- Check that you're in the correct directory (backend or frontend)
- Review [TESTING.md](TESTING.md) for detailed troubleshooting

## Development Tips

- Backend auto-restarts are not included - use `nodemon` if needed
- Frontend has hot reload enabled by default
- Check browser console for errors
- Use React Developer Tools for debugging components

## Common Commands

```bash
# Backend
npm start          # Start server
npm test          # Run tests
npm run dev       # Development mode

# Frontend  
npm start         # Start dev server
npm test          # Run tests
npm run build     # Production build
```

## Getting Help

- Check existing documentation
- Review test files for usage examples
- Open an issue on GitHub
- Check Google Cloud documentation for API setup

Happy coding! 🚀
