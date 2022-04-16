FROM node:16.14.0

WORKDIR /Backend
COPY package*.json /Backend/
RUN npm install

COPY . /Backend/

EXPOSE 8080

CMD ["npm", "start"]