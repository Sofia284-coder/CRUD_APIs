# Task API

A simple RESTful Task API built with Node.js, Express.js, and SQLite. The API supports creating, retrieving, updating, and deleting tasks (CRUD operations) with persistent data storage using the better-sqlite3 library. It also includes interactive API documentation using Swagger UI following the OpenAPI 3.0 specification.

---

## Technologies Used

- Node.js
- Express.js
- Express Router
- SQLite
- better-sqlite3
- Swagger UI Express
- OpenAPI 3.0
- Git & GitHub

---

## Project Structure

```text
CRUD_APIs/
│
├── images/
│   ├── curl_output.png
│   ├── swagger.png
│   └── sqlite_viewer.png
│
├── src/
│   ├── controllers/
│   │   └── CRUDcontrollers.js
│   │
│   ├── database/
│   │   └── database.js
│   │
│   ├── routes/
│   │   └── CRUDRoutes.js
│   │
│   ├── app.js
│   └── swagger.json
│
├── tasks.db
├── package.json
├── package-lock.json
└── README.md
```

---

## Why SQLite?

SQLite was chosen because it is a lightweight, serverless relational database.
It stores all data in a single file (`tasks.db`), making it simple to use for
small applications and coursework without requiring a separate database server.

## Database File

The application's database is stored in:

```text
tasks.db
```

---

# Getting Started

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- npm (comes with Node.js)

You can verify your installation by running:

```bash
node -v
npm -v
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sofia284-code/CRUD_APIs.git
```

### 2. Navigate to the project directory

```bash
cd CRUD_APIs
```

### 3. Install all project dependencies

```bash
npm install
```

This command automatically installs all required packages defined in `package.json`, including:

- Express
- Swagger UI Express
- better-sqlite3

No additional installations are required.

### 4. Start the server

```bash
node src/app.js
```

If the server starts successfully, you should see:

```text
Example app listening on port 3000
```

When the application starts for the first time, it automatically creates
`tasks.db` and initializes the database with three sample tasks.

---

# Running the API

Base URL

```
http://localhost:3000
```

Swagger Documentation

```
http://localhost:3000/docs
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Get API description |
| GET | `/health` | Check server health |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/{id}` | Retrieve a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/{id}` | Update an existing task |
| DELETE | `/tasks/{id}` | Delete a task |

---

# Example curl Request

Create a new task:

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
```

Example Response

```http
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40
ETag: W/"28-PpSBYV7i68cXyGc7AhjVpkZkY5Q"
Date: Mon, 27 Jul 2026 19:48:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":4,"title":"Buy milk","done":false}
```

---

# Screenshots

## Swagger UI

![Swagger UI](images/swagger.png)

---

## SQLite Database

![SQLite Database](images/sqlite_viewer.png)

## Example SQL Query

The following SQL query was executed in DB Browser for SQLite to retrieve all completed tasks:

```sql
SELECT * FROM tasks WHERE done = 1;
```

---

## curl Output

![curl Output](images/curl_output.png)



---

# HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Request completed successfully |
| 201 | Resource created successfully |
| 204 | Resource deleted successfully |
| 400 | Invalid request |
| 404 | Resource not found |

---

## Features

- Full CRUD REST API
- Persistent task storage using SQLite
- Automatic database creation
- Automatic sample data seeding
- Input validation
- Interactive Swagger documentation