FROM node:12.18.1
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install
COPY . .
CMD ["npm", "run","dev"]


# FROM node:14

# ADD package.json /tmp/package.json

# ADD yarn.lock /tmp/yarn.lock

# RUN rm -rf build

# RUN cd /tmp && yarn install

# ADD ./ /src

# RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

# WORKDIR /src

# # RUN yarn build

# CMD ["node", "build/src/app.js"]













# FROM node:10.22.0
# WORKDIR /usr/app
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install
# COPY ./ ./
# EXPOSE 3001
# CMD ["node", "server.js"]