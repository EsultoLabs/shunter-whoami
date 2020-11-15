FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

# Install app dependencies
COPY package.json /usr/src/app/package.json
RUN npm --only=production install && npm ls
RUN mv /usr/src/app/node_modules /node_modules

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD node .