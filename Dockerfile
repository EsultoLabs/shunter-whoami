FROM node:lts-alpine

WORKDIR /usr/sources/app

COPY package*.json ./

RUN npm --only=production install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]