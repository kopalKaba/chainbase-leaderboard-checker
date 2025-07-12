# Lightweight Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json ./
RUN npm install

# Copy all files
COPY . .

# Expose backend port
EXPOSE 3000

# Run the backend
CMD ["npm", "start"]
