# syntax=docker/dockerfile:1
FROM node:20

WORKDIR /app

COPY . .

RUN bash -c "npm install"

EXPOSE 5000

CMD ["npm", "run", "dev"]
