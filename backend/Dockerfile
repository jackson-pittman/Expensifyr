# Use Node.js LTS version
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application code
COPY src ./src

# Expose port
EXPOSE 8080

# Set environment variable
ENV PORT=8080

# Start the application
CMD ["npm", "start"]
