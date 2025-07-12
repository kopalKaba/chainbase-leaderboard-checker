# Use lightweight Node.js base image
FROM node:18-slim

# Install Puppeteer dependencies (for Chromium)
RUN apt-get update && apt-get install -y \
  ca-certificates fonts-liberation libappindicator1 libasound2 libatk1.0-0 libc6 \
  libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgconf-2-4 \
  libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 \
  libpangocairo-1.0-0 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
  libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
  libxtst6 wget xdg-utils xvfb --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Create app folder
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Run the backend
CMD ["node", "server/index.js"]
