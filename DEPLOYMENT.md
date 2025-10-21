# Deployment Guide for Expensifyr

This guide walks you through deploying Expensifyr to Google Cloud Platform.

## Prerequisites

1. Google Cloud account with billing enabled
2. `gcloud` CLI installed and configured
3. Docker installed locally

## Step 1: Set Up Google Cloud Project

1. Create a new project or use an existing one:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

2. Enable required APIs:
   ```bash
   gcloud services enable vision.googleapis.com
   gcloud services enable firestore.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   ```

3. Create Firestore database:
   ```bash
   gcloud firestore databases create --region=us-central1
   ```

## Step 2: Deploy Backend to Cloud Run

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build and push the container image:
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/expensifyr-backend
   ```

3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy expensifyr-backend \
     --image gcr.io/YOUR_PROJECT_ID/expensifyr-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --memory 512Mi \
     --cpu 1 \
     --max-instances 10
   ```

4. Note the service URL that's displayed (e.g., `https://expensifyr-backend-xxx.run.app`)

## Step 3: Deploy Frontend

### Option A: Cloud Run (Recommended)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Update the environment variable in the Dockerfile or use a build arg:
   ```bash
   docker build --build-arg REACT_APP_API_URL=https://YOUR-BACKEND-URL.run.app/api \
     -t gcr.io/YOUR_PROJECT_ID/expensifyr-frontend .
   docker push gcr.io/YOUR_PROJECT_ID/expensifyr-frontend
   ```

3. Deploy:
   ```bash
   gcloud run deploy expensifyr-frontend \
     --image gcr.io/YOUR_PROJECT_ID/expensifyr-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Option B: Firebase Hosting

1. Build the production bundle:
   ```bash
   cd frontend
   REACT_APP_API_URL=https://YOUR-BACKEND-URL.run.app/api npm run build
   ```

2. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

3. Initialize Firebase:
   ```bash
   firebase init hosting
   ```

4. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

## Step 4: Configure CORS (if needed)

If you're experiencing CORS issues, update the backend CORS configuration in `backend/src/index.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.run.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Step 5: Set Up Monitoring

1. Enable Cloud Logging:
   ```bash
   gcloud logging read "resource.type=cloud_run_revision" --limit 50
   ```

2. Set up alerts in Google Cloud Console for:
   - Error rate
   - Response time
   - Cost anomalies

## Step 6: Configure Custom Domain (Optional)

1. Map a custom domain to Cloud Run:
   ```bash
   gcloud run domain-mappings create --service expensifyr-backend --domain api.yourdomain.com
   gcloud run domain-mappings create --service expensifyr-frontend --domain yourdomain.com
   ```

2. Update DNS records as instructed by Cloud Run

## Security Best Practices

1. **Service Accounts**: Cloud Run automatically uses a service account. Ensure it has minimal permissions:
   ```bash
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
     --role="roles/datastore.user"
   ```

2. **API Keys**: Never commit API keys or service account files to version control

3. **HTTPS Only**: Cloud Run provides HTTPS by default. Ensure frontend makes HTTPS requests

4. **Authentication**: Consider adding user authentication with Firebase Auth or Cloud Identity Platform

## Cost Optimization

1. Set maximum instances to control costs:
   ```bash
   gcloud run services update expensifyr-backend --max-instances 10
   ```

2. Use Cloud Run's always-free tier (2 million requests/month)

3. Monitor costs in Google Cloud Console

## Troubleshooting

### Backend won't start
- Check logs: `gcloud run logs read --service expensifyr-backend`
- Verify Vision API is enabled
- Ensure service account has Firestore access

### Frontend can't connect to backend
- Check CORS configuration
- Verify API URL is correct
- Check backend is publicly accessible

### OCR not working
- Verify Vision API is enabled
- Check service account permissions
- Review logs for API errors

## Rollback

To rollback to a previous version:
```bash
gcloud run services update-traffic expensifyr-backend --to-revisions=PREVIOUS_REVISION=100
```

## Automated Deployment with GitHub Actions

See `.github/workflows/deploy.yml` for CI/CD configuration (to be created).

## Support

For issues, check the main README.md or open a GitHub issue.
