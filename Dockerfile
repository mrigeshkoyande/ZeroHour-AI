# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 – Build
# Uses the official Node 20 Alpine image (minimal, ~50 MB) as the build stage
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies with exact lock file (no mutations)
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# Copy all source files
COPY . .

# Build the production bundle
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 – Serve
# Uses the official Nginx Alpine image (minimal, ~5 MB) for serving
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/zerohour.conf

# Copy built static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add a non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

USER appuser

# Cloud Run requires the container to listen on $PORT (default: 8080)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
