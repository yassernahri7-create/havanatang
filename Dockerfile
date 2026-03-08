# Production-ready Dockerfile
FROM node:18-alpine

# Install system dependencies if needed (e.g., for certain npm packages)
RUN apk add --no-cache curl

# Create app directory and data persistence directory
WORKDIR /app
RUN mkdir -p /app/data/uploads

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --production

# Copy remaining source code
COPY . .

# Set robust paths for persistence
ENV PORT=3000
ENV NODE_ENV=production
ENV DATA_FILE=/app/data/data.json
ENV UPLOADS_DIR=/app/data/uploads

# Expose port
EXPOSE 3000

# Healthcheck to verify server is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Run as non-root user for security
RUN chown -R node:node /app
USER node

# Start the application
CMD ["node", "server.js"]
