#------------------------------------------------------------------------------
# Builder Image
#------------------------------------------------------------------------------
FROM node:12 as builder

ARG BUILD_NUMBER=local

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install 2>&1 && rm -f .npmrc

# Build app
COPY . .
RUN npm run build 2>&1

#------------------------------------------------------------------------------
# Result Image
#------------------------------------------------------------------------------
FROM node:12.16.1-alpine3.11

# Create app directory
WORKDIR /usr/src/app

# Copy artifacts from the builder image
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/server ./server
COPY --from=builder /usr/src/app/internals ./internals
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/package-lock.json .

# Install app's run-time dependencies
RUN npm install --production 2>&1

# Run app
EXPOSE 9000
CMD [ "npm", "run", "start:prod" ]
