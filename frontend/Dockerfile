# -------------------------------------------------------------------#
# Stage 1: Build the React app
# -------------------------------------------------------------------#
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# -------------------------------------------------------------------#
# Stage 2: Serve the React app with Nginx(a lightweight web server to serve the static files)
# -------------------------------------------------------------------#
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
