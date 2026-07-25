# User Management System

A full-stack user management app with an Angular frontend, a NestJS backend, and a PostgreSQL database.

This project uses Docker only for the database. The frontend and backend run locally on your machine.

## 1. Clone the repository

```bash
git clone https://github.com/Abed-Taha/user-management-system.git
cd user-management-system
```

## 2. Start the database in Docker

Make sure Docker Desktop is running, then start PostgreSQL:

```bash
cd backend
docker compose up -d
```

Verify the container is running:

```bash
docker ps
```

## 3. Backend setup

In backend folder:

```bash
npm install
```

Create a `.env` file in the backend folder:

```env
UI_HOST=localhost
UI_PORT=4200

HOST=0.0.0.0
PORT=8000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=devUser
DB_PASSWORD=devUser123
DB_NAME=user_management
```

If your backend uses NestJS config with `process.env`, adjust these values to match your app configuration.

Start the backend:

```bash
npm run start:dev
```

The API should now be available at:

```text
http://localhost:8000
```

### Seed the database (optional)

If the project includes a seed script, run:
at 

```bash
npm run seed
```

This will create sample 10 users such as:
and run it again to create 10+
with password : 1234567

- User0@test.com
- User1@test.com
- ...

## 4. Frontend setup

Open a new terminal and go to the frontend folder:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:

```env
NODE_ENV=development
APP_NAME=user-management-frontend
FRONTEND_HOST=localhost
FRONTEND_PORT=4400
```

The frontend currently expects the backend API at:

```ts
src / env / env.ts;
```

Default value:

```ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:8000",
};
```

If needed, update the `apiUrl` to match your backend URL.

Start the frontend:

```bash
npm start
```

The app should open at:

```text
http://localhost:4200
```

## 5. Useful commands

### Docker

```bash
docker compose up -d db
docker compose down
docker ps
docker logs <container_name>
```

### Backend

```bash
cd backend
npm run start:dev
npm run build
npm run seed
```

### Frontend

```bash
cd frontend
npm start
npm run build
```

## 6. Notes

- Only the database runs inside Docker.
- Frontend and backend are started locally.
- If you change the database credentials, make sure the backend `.env` file and Docker environment values match.
- If the backend cannot connect to PostgreSQL, verify that the Docker container is running and that the database host/port values are correct.
