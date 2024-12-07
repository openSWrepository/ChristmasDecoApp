# Step 1: Build the frontend
FROM node:18 AS builder
WORKDIR /app

# 복사
COPY package.json package-lock.json ./
RUN npm install

# 프로젝트 복사 및 빌드
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
