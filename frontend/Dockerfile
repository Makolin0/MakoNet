FROM node:22
# RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 5173
CMD [ "npm", "run", "dev" ]