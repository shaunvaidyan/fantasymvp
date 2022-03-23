FROM node:17-alpine3.14
RUN apk update && apk add bash
# ENV NODE_ENV production
WORKDIR /app/

# Install app dependencies
COPY package*.json ./
RUN npm install
# RUN npm ci --only=production && npm cache clean --force

# Bundle app source
COPY . .


CMD npm start

EXPOSE 3000