# SyncBoard_FullStack
Full Stack Module Group Project

## Deployment

### Backend on Render

Create a Render Web Service from this repository, or use the included `render.yaml` blueprint:

- Root directory: `server`
- Build command: `npm ci`
- Start command: `npm start`
- Health check path: `/api/health`

Set these Render environment variables:

- `NODE_ENV=production`
- `CLIENT_URL=https://syncboard-group34.web.app,https://syncboard-group34.firebaseapp.com`
- `MONGO_URI` to your MongoDB connection string, with the database password URL-encoded
- `JWT_SECRET` to a long random secret; never reuse a committed or local development secret

After deployment, verify `https://<your-render-service>.onrender.com/api/health` returns JSON with `status` set to `ok`. Set `VITE_API_URL` in `Fullstack Project/client/.env.production` to that service URL plus `/api`, rebuild the client, and deploy the resulting `dist` directory to Firebase Hosting.
