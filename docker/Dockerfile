FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Copy the build output from the previous stage. Ideally only the
# files that are needed to run the app are copied, but for now
# everything is copied to make things work.
COPY --from=build /app /app

EXPOSE 3000
