# Deployment Guide - Havana Beach Club

This project is optimized for deployment on a self-hosted VPS (Virtual Private Server) using **Docker** and **Coolify**.

## Local Development (Docker)

1. **Rename `.env.example` to `.env`.**
2. **Build and start the container:**
   ```bash
   docker compose up -d --build
   ```
3. **Access the site:**
   - Website: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin` (User: `admin`, Pass: `6543210`)

## VPS Deployment (Coolify)

### 1. Repository Setup
Push the latest changes to your GitHub repository:
```bash
git add .
git commit -m "chore: setup docker deployment infrastructure"
git push origin main
```

### 2. Coolify Setup
1. Open your **Coolify Panel**.
2. Create a **New Resource** -> **Public/Private Repository**.
3. Point to your GitHub repository: `yassernahri7-create/havanatang`.
4. Coolify will automatically detect the `docker-compose.yml`.

### 3. Environment Variables
In the Coolify dashboard for your service, add the following variables:
- `PORT=3000`
- `NODE_ENV=production`
- `DATA_FILE=/app/data/data.json`
- `UPLOADS_DIR=/app/data/uploads`

### 4. Persistent Storage
Ensure Coolify maps a persistent volume to `/app/data` to prevent data loss on redeployment.

## Container Security
 - The application runs as a non-root user (`node`).
 - Includes health checks via `curl` to ensure uptime.
 - Uses Alpine Linux as a base for minimal vulnerabilities.
