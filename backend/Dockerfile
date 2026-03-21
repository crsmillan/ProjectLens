# --- Build Stage ---
# Use Node.js 22 Alpine for a lightweight build environment
FROM node:22-alpine AS builder

WORKDIR /app

# Copy configuration files for dependency installation
COPY package*.json ./
RUN npm install

# Copy source code and build the application
COPY . .
RUN npm run build

# --- Runtime Stage ---
# Use a fresh slim image for the production environment
FROM node:22-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# Include src for the seed script (in a real prod app, we might bundle this differently)
COPY --from=builder /app/src/seed.ts ./src/seed.ts

# Documentation: Port 4000 is the default for our NestJS API
EXPOSE 4000

# Documentation: Port 4000 is the default for our NestJS API
EXPOSE 4000

# Documentation: Environment variables for MongoDB
ENV MONGODB_URI=mongodb://mongodb:27017/projectlens

# Start the application
CMD ["node", "dist/main"]
