FROM node:25.2.1

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g @nestjs/cli

CMD npx prisma generate && npm run start
