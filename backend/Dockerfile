# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy application code.
COPY . .

# Run the prisma generate command to generate Prisma Client
RUN npx prisma generate --schema=./models/prisma/schema.prisma

EXPOSE 3000

# Run the application.
CMD ["npm", "start"]
