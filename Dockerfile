ARG NODE_VERSION=22.9

FROM node:${NODE_VERSION}
SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY package.json package-lock.json ./
COPY . .
COPY .env /app/

RUN apt update; apt install -y postgresql-client

RUN npm install -g npm@11.1.0
RUN npm install
EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]