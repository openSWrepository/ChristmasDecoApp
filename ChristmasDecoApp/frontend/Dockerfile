# Step 1: Build the frontend
FROM node:18 AS builder
WORKDIR /app

# Install dependencies and build
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install
RUN npm install @vitejs/plugin-react --save-dev

COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
