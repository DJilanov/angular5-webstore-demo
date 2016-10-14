# Dockerfile (tag: v3)
FROM node:6.0
RUN npm install webpack -g
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
ENV NODE_ENV=production
ENV PORT=8080
CMD [ "/usr/local/bin/npm", "run", "develop" ]
EXPOSE 8080