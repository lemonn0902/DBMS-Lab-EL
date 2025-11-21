# BMTC (Bangalore Metropolitan Transport Corporation) Management System

A full-stack application for managing BMTC operations including drivers, buses, routes, shifts, complaints, and accident reports.

## Project Structure

```
bmtc/
├── bmtc-backend/     # Node.js/Express backend with Sequelize ORM
├── bmtc-ui/          # React frontend with Vite
└── sample_data.sql   # Sample database data
```

## Tech Stack

### Backend
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd bmtc-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `bmtc-backend/` with your database credentials:
   ```env
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASS=your_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

4. Create `config/config.json` for Sequelize migrations (optional):
   ```json
   {
     "development": {
       "username": "your_username",
       "password": "your_password",
       "database": "your_database_name",
       "host": "127.0.0.1",
       "dialect": "postgres",
       "port": 5432
     }
   }
   ```

5. Run database migrations (if available):
   ```bash
   npx sequelize-cli db:migrate
   ```

6. Seed the database (optional):
   ```bash
   npx sequelize-cli db:seed:all
   ```

7. Start the backend server:
   ```bash
   node src/server.js
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd bmtc-ui/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## API Endpoints

- `/api/drivers` - Driver management
- `/api/conductors` - Conductor management
- `/api/buses` - Bus management
- `/api/routes` - Route management
- `/api/shifts` - Shift management
- `/api/complaints` - Complaint management
- `/api/accidents` - Accident report management

## Features

- Driver and Conductor management
- Bus fleet management
- Route planning and management
- Shift scheduling
- Complaint tracking
- Accident report management

## Notes

- Make sure PostgreSQL is running before starting the backend
- The backend includes CORS middleware to allow frontend communication
- Environment variables are required for database connection

