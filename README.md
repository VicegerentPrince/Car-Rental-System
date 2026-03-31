# Car Rental System — DB Lab Assignment 1

A full-stack Car Rental Fleet Management System built with **Next.js 14**, **Express.js**, and **Microsoft SQL Server**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), Tailwind CSS, Lucide Icons |
| Backend | Node.js, Express.js |
| Database | Microsoft SQL Server |
| ORM/Driver | mssql (Tedious) |

---

## Project Structure

```
Lab Assignment 1/
├── backend/
│   ├── routes/
│   │   └── vehicles.js     # CRUD API routes
│   ├── db.js               # MSSQL connection pool
│   ├── server.js           # Express app entry point
│   ├── package.json
│   └── .env                # DB credentials (not committed)
│
└── frontend/
    ├── app/
    │   ├── layout.js               # Root layout with sidebar
    │   ├── page.js                 # Dashboard
    │   └── vehicles/
    │       ├── page.js             # All vehicles (search + filter)
    │       ├── add/page.js         # Add vehicle form
    │       └── [id]/
    │           ├── page.js         # Vehicle detail view
    │           └── edit/page.js    # Edit vehicle form
    ├── components/
    │   ├── Sidebar.js          # Navigation sidebar
    │   ├── VehicleCard.js      # Fleet grid card
    │   ├── VehicleForm.js      # Reusable add/edit form
    │   └── StatusBadge.js      # Colored status pill
    ├── lib/
    │   └── api.js              # Fetch helpers for the API
    ├── jsconfig.json
    ├── package.json
    └── .env.local              # API URL (not committed)
```

---

## Database Setup

Run the following in **SSMS** to create the database and table:

```sql
CREATE DATABASE CarRental;
GO

USE CarRental;
GO

CREATE TABLE Vehicles (
    vehicleId       CHAR(4)      PRIMARY KEY,
    make            VARCHAR(30),
    model           VARCHAR(30),
    manufactureYear CHAR(4),
    licensePlate    VARCHAR(10),
    color           VARCHAR(10),
    mileage         FLOAT,
    dailyRentRate   MONEY,
    status          VARCHAR(10),
    lastServiceDate DATE
);
```

### Enable TCP/IP on SQL Server

1. Open **SQL Server Configuration Manager**
   - Press `Win + R` and run: `SQLServerManager15.msc`
2. Go to **SQL Server Network Configuration → Protocols for MSSQLSERVER**
3. Right-click **TCP/IP** → **Enable**
4. Double-click **TCP/IP** → **IP Addresses** tab → scroll to **IPAll**
   - Clear **TCP Dynamic Ports**
   - Set **TCP Port** to `1433`
5. Go to **SQL Server Services** → right-click **SQL Server** → **Restart**

### Enable SQL Server Authentication

1. In SSMS, right-click the server → **Properties → Security**
2. Select **SQL Server and Windows Authentication mode**
3. Restart SQL Server

### Create a SQL Login (if needed)

```sql
CREATE LOGIN your_username WITH PASSWORD = 'your_password';
ALTER SERVER ROLE sysadmin ADD MEMBER your_username;
```

---

## Environment Configuration

### Backend — `backend/.env`

```env
DB_USER=your_sql_username
DB_PASSWORD=your_sql_password
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=CarRental
PORT=5000
```

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Running the App

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

> API runs on **http://localhost:5000**

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

> App runs on **http://localhost:3000**

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/vehicles` | Get all vehicles |
| `GET` | `/vehicles/:id` | Get a single vehicle |
| `POST` | `/vehicles` | Create a new vehicle |
| `PUT` | `/vehicles/:id` | Update a vehicle |
| `DELETE` | `/vehicles/:id` | Delete a vehicle |

### Vehicle Object

```json
{
  "vehicleId": "V001",
  "make": "Toyota",
  "model": "Camry",
  "manufactureYear": "2022",
  "licensePlate": "ABC-1234",
  "color": "White",
  "mileage": 15000,
  "dailyRentRate": 59.99,
  "status": "Available",
  "lastServiceDate": "2024-01-15"
}
```

> `status` must be one of: `Available`, `Rented`, `Service`

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Fleet stats and overview table |
| All Vehicles | `/vehicles` | Card grid with search and status filter |
| Add Vehicle | `/vehicles/add` | Form to register a new vehicle |
| Vehicle Detail | `/vehicles/:id` | Full details with edit/delete actions |
| Edit Vehicle | `/vehicles/:id/edit` | Pre-filled form to update a vehicle |
