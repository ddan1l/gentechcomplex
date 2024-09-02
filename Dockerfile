############ INSTALL DEPENDENCIES ############
FROM node:18.0 as vendor

COPY package.json package-lock.json /app/
WORKDIR /app

RUN npm install



############ BUILD APP ############
FROM node:18.0 as app

COPY --from=vendor /app/ /app/
COPY package.json package-lock.json vite.config.js main.js .env /app/
COPY assets/ /app/assets
COPY handlers/ /app/handlers
COPY pages/ /app/pages
COPY services/ /app/services
COPY templates/ /app/templates


WORKDIR /app

RUN /app/node_modules/.bin/vite build


CMD [ "node", "main.js" ]

