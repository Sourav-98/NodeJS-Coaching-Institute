FROM node:latest
WORKDIR /usr/src/courserus
COPY . .
RUN npm install
EXPOSE 9000
CMD ["node", "app.js"]