# Project Setup and Usage Guide

This documentation will help you set up, run, and access the services in this project.

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- Node.js and npm (for backend/frontend local development)

## Running the Project

### 1. Start All Services
From the project root directory, run:

```sh
docker-compose up --build
```
This will build and start all services defined in `docker-compose.yml`.

### 2. Stopping Services
To stop all running containers:

```sh
docker-compose down
```

## Database Access (Postgres)

To access the PostgreSQL shell inside the running container, use:

```sh
docker compose exec postgres psql -U myuser -d mydatabase
```
- Replace `myuser` and `mydatabase` with your actual username and database name if different.

## Backend (bmtc-backend)

- The backend is located in the `bmtc-backend/` directory.
- Configuration: `bmtc-backend/config/config.json`
- Main entry: `bmtc-backend/src/server.js`
- To run backend locally (outside Docker):
  1. Install dependencies:
     ```sh
     cd bmtc-backend
     npm install
     ```
  2. Start the server:
     ```sh
     npm start
     ```

## Frontend (bmtc-ui/frontend)

- The frontend is located in `bmtc-ui/frontend/`.
- To run locally:
  1. Install dependencies:
     ```sh
     cd bmtc-ui/frontend
     npm install
     ```
  2. Start the dev server:
     ```sh
     npm run dev
     ```
  3. The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

## Sample Data

- You can load sample data into the database using `sample_data.sql`:
  ```sh
  docker compose exec postgres psql -U myuser -d mydatabase -f /path/to/sample_data.sql
  ```
  Adjust the path and credentials as needed.

## Troubleshooting
- Ensure all environment variables and config files are set up as required.
- For database issues, check container logs:
  ```sh
  docker compose logs postgres
  ```

---

For further details, refer to the README files in the respective backend and frontend directories.
