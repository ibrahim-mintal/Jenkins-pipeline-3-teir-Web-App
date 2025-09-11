# 136MB image size
FROM node:18-alpine
WORKDIR /app
# Copy package.json
COPY package*.json .
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
