FROM node:18.12.1-alpine as build

WORKDIR /app

# ENV PORT 8080
# ENV HOST 0.0.0.0

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run","start"]

# FROM nginx:1.19

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/build /usr/share/nginx/html

# FROM node:19-alpine as build
# WORKDIR .
# COPY package*.json ./
# RUN npm install --silent
# RUN npm install react-scripts --save
# EXPOSE 3000
# CMD ["npm", "run","start"]
