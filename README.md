# app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# vue3 app created using vue cli

# Login and Register pages created and vue-router installed

# tailwindcss added and pages updated

# Prisma added. MySQL integrated. Prisma used to create database and tables.

# API's added to send data from frontend to backend. Prisma used to create users.

# jsonwebtoken, redis and bcryptjs added to backend. Redis and JWT added to project.

# Docker added to file and composed. Redis server running on docker. ???

# There are errors -> mysql in docker (redis is connecting), redis in wsl

# after login or register it will navigate to discover page. user card features added for discover. you can change multiple images with clicks on right, left icons.

# notifications added when like a user. logout feature added after login or register.

# Added axios and faker for fake data.

# To create bulk test run this script in backend and create fake data "node scripts/bulkCreateUsers.js"

##### To Use

### BACKEND

1- cd backend

2- npm install

3- touch .env

## In .env add:

1- DATABASE_URL=mysql://user:password@localhost:3306/database

# Use this script in terminal to generate random jwt secret key

# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

2- JWT_SECRET=your_jwt_secret_key

3- REDIS_URL=redis://localhost:6379 (You don't need Redis, It does not work but no harm to add for future.)

4- cd models

## In models

1- npx prisma migrate deploy

# Get back to backend file

1- cd .. (to get back)

2- npm run dev (Start the server)

# To create bulk test run this script in backend and create fake data

while server running open a new terminal and go to backend file

1- cd backend
2- node scripts/bulkCreateUsers.js (This command will create the fake data, make sure you connect your database successfuly.)

### FRONTEND

# Get back to root and get in frontend file

1- cd ../frontend

2- npm install

3- npm run serve (Start to server)
