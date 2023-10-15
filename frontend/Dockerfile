FROM node:18
WORKDIR /code
COPY package.json package.json
RUN npm install
EXPOSE 5173
COPY . .
CMD ["npm", "run", "dev"]