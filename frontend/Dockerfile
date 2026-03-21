# --- Build Stage ---
# Use Node.js 22 Alpine for consistent build environment
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies based on package-lock.json
COPY package*.json ./
RUN npm install

# Copy project files and build for production
COPY . .
# NEXT_PUBLIC_API_URL must be available at build time for client-side environment variables
ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# --- Runtime Stage ---
# Using a lightweight Node image for serving the app
FROM node:22-alpine

WORKDIR /app

# Copy production build and dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Documentation: Next.js default port is 3000
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
