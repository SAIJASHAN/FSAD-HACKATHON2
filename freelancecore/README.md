# FreelanceCore — Backend (Spring Boot)

## Problem Statement 13: Freelancer Project Management System

---

## Setup Steps

### 1. Create the database in MySQL
```sql
CREATE DATABASE freelancecore_db;
```

### 2. Update credentials
Open `src/main/resources/application.properties` and change:
```
spring.datasource.username=root
spring.datasource.password=your_password_here
```

### 3. Run the project
```bash
mvn spring-boot:run
```
Server starts at: http://localhost:8080

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST   | /api/projects | Create project |
| GET    | /api/projects | Get all (paginated) |
| GET    | /api/projects/{id} | Get by ID |
| PUT    | /api/projects/{id} | Update project |
| DELETE | /api/projects/{id} | Delete project |
| GET    | /api/projects/search?client=X | Search by client |
| GET    | /api/projects/filter?status=X | Filter by status |
| GET    | /api/projects/analytics | Get project counts |

---

## Sample POST body
```json
{
  "clientName": "John Doe",
  "title": "E-commerce Website",
  "description": "Build a full stack shopping app",
  "status": "Not Started",
  "deadline": "2026-06-30",
  "budget": 50000
}
```

---

## Project Structure
```
src/main/java/com/freelancecore/
├── FreelancecoreApplication.java   <- Entry point
├── controller/
│   └── ProjectController.java      <- REST endpoints
├── service/
│   └── ProjectService.java         <- Business logic
├── repository/
│   └── ProjectRepository.java      <- DB queries (JPA)
├── model/
│   └── Project.java                <- Entity / Table
└── exception/
    ├── ProjectNotFoundException.java
    └── GlobalExceptionHandler.java
```
