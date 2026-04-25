# Quick Start for Local Development

## Installation

```bash
# Install all dependencies
npm run install-all

# Or manually:
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

## Development

Run both backend and frontend simultaneously:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:backend
# In another terminal:
npm run dev:frontend
```

## Production Build

```bash
npm run build
```

This will:
1. Build the React frontend to `frontend/dist`
2. Prepare the backend for production
3. Backend will serve the static frontend files

## Start Production Server

```bash
npm start
```

The application will run on `http://localhost:5000` (or the port specified in `.env`)

## Environment Variables

Create a `.env` file in the `backend` folder with:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Project Structure

```
jobPortal-1/
├── backend/              # Express server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── index.js     # Main server file
│   └── package.json
├── frontend/            # React app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── package.json         # Root package with scripts
├── render.yaml          # Render deployment config
└── RENDER_DEPLOYMENT_GUIDE.md
```

## Notes

- Frontend is built with Vite (builds to `frontend/dist`)
- Backend serves static files from `frontend/dist`
- All API requests go to `/api/v1/*` endpoints
- CORS is configured to accept requests from the frontend URL
