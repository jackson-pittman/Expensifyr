# Project Overview - Expensifyr

## Summary

Expensifyr is a cloud-based expense analyzer application that automates the extraction and management of expense data from receipt images using AI-powered OCR technology.

## Key Features Implemented

### 1. Receipt Upload & Processing ✅
- File upload via web interface
- Image validation (type and size limits)
- Support for common image formats (JPG, PNG, etc.)
- Maximum file size: 5MB

### 2. OCR Integration ✅
- Google Vision API integration for text extraction
- Intelligent receipt parsing
- Support for multiple date formats:
  - MM/DD/YYYY
  - YYYY-MM-DD  
  - Month name formats (Jan 15, 2024)
- Support for various amount formats:
  - With/without labels (Total:, Amount:, etc.)
  - With thousands separators ($1,234.56)
  - Different decimal separators

### 3. Data Storage ✅
- Google Firestore integration
- Structured expense data storage
- Automatic timestamps (created/updated)
- Unique ID generation
- Query support (limit, orderBy, direction)

### 4. Frontend Dashboard ✅
- Modern React-based UI
- Responsive design
- Real-time expense list
- Upload progress indication
- Error handling and display
- Delete functionality
- Total amount calculation

### 5. Cloud Deployment Ready ✅
- Docker containerization
- Cloud Run compatible
- Environment-based configuration
- Production-ready Dockerfiles
- Nginx configuration for frontend

### 6. Comprehensive Testing ✅
- Backend: 16 unit/integration tests (100% passing)
- Frontend: 11 component tests (100% passing)
- Integration: 4 workflow tests (100% passing)
- Total: 31 automated tests
- Test coverage: >50% across all metrics

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **OCR**: Google Cloud Vision API 4.0.2
- **Database**: Google Cloud Firestore 7.1.0
- **File Upload**: Multer 2.0.2
- **Testing**: Jest 29.7.0, Supertest 6.3.3

### Frontend
- **Framework**: React 19.2.0
- **HTTP Client**: Axios 1.12.0
- **Styling**: CSS3
- **Testing**: React Testing Library, Jest

### Infrastructure
- **Containerization**: Docker
- **Web Server**: Nginx (production)
- **Deployment Target**: Google Cloud Run
- **CI/CD Ready**: GitHub Actions compatible

## Project Structure

```
Expensifyr/
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── index.js           # Express server
│   │   ├── routes/            # API endpoints
│   │   │   ├── upload.js      # Receipt upload
│   │   │   └── expenses.js    # Expense CRUD
│   │   └── services/          # Business logic
│   │       ├── visionService.js    # OCR & parsing
│   │       └── firestoreService.js # Database ops
│   ├── __tests__/             # Test suites
│   ├── scripts/               # Utility scripts
│   └── Dockerfile             # Container config
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ReceiptUpload.js
│   │   │   └── ExpenseDashboard.js
│   │   ├── services/          # API clients
│   │   └── App.js             # Main app
│   ├── public/                # Static assets
│   └── Dockerfile             # Container config
│
├── examples/                   # Sample receipts
├── docs/                       # Documentation
│   ├── README.md              # Main documentation
│   ├── QUICKSTART.md          # Quick start guide
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── TESTING.md             # Testing guide
│   └── CONTRIBUTING.md        # Contribution guide
│
└── docker-compose.yml         # Local dev setup
```

## API Endpoints

### Health Check
- `GET /health` - Server status

### Upload
- `POST /api/upload` - Upload and process receipt
  - Content-Type: multipart/form-data
  - Field: receipt (image file)

### Expenses
- `GET /api/expenses` - List all expenses
  - Query params: limit, orderBy, direction
- `GET /api/expenses/:id` - Get specific expense
- `DELETE /api/expenses/:id` - Delete expense

## Data Flow

```
1. User uploads receipt image
   ↓
2. Frontend sends to backend API
   ↓
3. Backend validates file
   ↓
4. Google Vision API extracts text
   ↓
5. Parser extracts merchant/date/total
   ↓
6. Data stored in Firestore
   ↓
7. Response sent to frontend
   ↓
8. Dashboard refreshes automatically
```

## Security Features

- File type validation
- File size limits (5MB)
- CORS protection
- Input sanitization
- Error message sanitization
- Service account authentication (GCP)

## Performance

- Lightweight Docker images
- Efficient data queries
- Optimized React rendering
- Lazy loading support
- Memory-efficient file handling

## Scalability

- Stateless backend (Cloud Run compatible)
- Horizontal scaling ready
- Cloud-native services
- Managed database (Firestore)
- CDN-ready frontend

## Test Coverage Summary

```
Backend:
- API endpoints: 6 tests
- Vision service parsing: 10 tests
- Integration workflows: 4 tests
Coverage: >50% statements, branches, functions, lines

Frontend:
- App component: 2 tests
- Upload component: 4 tests  
- Dashboard component: 5 tests
Coverage: Component testing with RTL

Total: 31 tests, 100% passing
```

## Documentation

- **README.md**: Complete project documentation
- **QUICKSTART.md**: 5-minute setup guide
- **DEPLOYMENT.md**: Cloud deployment instructions
- **TESTING.md**: Comprehensive testing guide
- **CONTRIBUTING.md**: Contribution guidelines
- **examples/README.md**: Sample receipt usage

## Environment Setup

### Development
1. Backend: `npm install && npm start`
2. Frontend: `npm install && npm start`
3. Tests: `npm test`

### Production
1. Build containers: `docker build`
2. Deploy to Cloud Run: `gcloud run deploy`
3. Configure environment variables
4. Enable Google Cloud APIs

## Future Enhancements

Potential areas for expansion:
- User authentication
- Multiple receipt images per expense
- Categories and tags
- Export to CSV/PDF
- Mobile app (React Native)
- Receipt image storage
- Advanced analytics
- Multi-currency support
- Recurring expense detection
- Budget tracking

## Known Limitations

- Requires Google Cloud account for full functionality
- OCR accuracy depends on image quality
- Parser optimized for English receipts
- Single-user design (no multi-tenancy)
- No offline support

## Maintenance

- Regular dependency updates via Dependabot
- Security scanning with npm audit
- Test coverage monitoring
- Performance monitoring (when deployed)
- Error tracking and logging

## License

GNU General Public License v3.0

## Contributors

See GitHub contributors page for full list.

## Support

- GitHub Issues for bug reports
- Pull requests welcome
- Documentation updates appreciated
- Community discussions encouraged

---

**Project Status**: ✅ Complete and ready for deployment

**Last Updated**: January 2025

**Version**: 1.0.0
