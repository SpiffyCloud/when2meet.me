FROM node:lts-alpine

ENV NODE_ENV=development

# Install dependencies

WORKDIR /app

COPY --chown=node:node ./frontend/package*.json ./

RUN npm install @vue/cli &&\
    npm install 

# Prepare the dynamic development environment

EXPOSE 8080
VOLUME ["/app"]

# Run the server

CMD ["npm", "run", "serve"]
