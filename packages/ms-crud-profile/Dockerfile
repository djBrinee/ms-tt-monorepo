# using node image for v20
FROM node:20

# Setting work directory in the container
WORKDIR /app

# Copying dependencies and config files and code

# First, root tsconfig file and rename it
COPY tsconfig.base.json ./tsconfig.base.json

# Then, copying service specific file
COPY packages/ms-crud-profile/package.json ./package.json
COPY packages/ms-crud-profile/tsconfig.json ./tsconfig.json
COPY packages/ms-crud-profile/src ./src



# Installing dependencies
RUN npm install

# Building the app
RUN npm run build

# Exposing service port
EXPOSE 3002

# Runnning the app
CMD ["node", "dist/server.js"]