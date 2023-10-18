FROM node:18
WORKDIR /code
COPY package.json package.json
RUN npm install
EXPOSE 3000
COPY . .
CMD ["/bin/bash", "-c", "npm run test; npm run start"]
