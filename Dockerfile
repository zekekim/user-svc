FROM node:14-alpine

WORKDIR /usr/src/user-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

