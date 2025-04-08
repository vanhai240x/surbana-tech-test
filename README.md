# NestJS Locations API

A simple RESTful API built with NestJS, TypeScript, PostgreSQL, and TypeORM to manage locations with a tree structure.

## Requirements
- Node.js 16+
- PostgreSQL
- NestJS CLI

## Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd nestjs-locations-api
2. Install dependencies:
   ```bash
   npm install
3. Set up .env file (see .env.example):
   ```text
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=nestjs_locations
   PORT=3000
4. Run the application:
   ```bash
   npm run start:dev

## API Endpoints
- GET /locations: Retrieve all locations.
- GET /locations/:id: Retrieve a location by ID.
- GET /locations/tree: Retrieve locations as a tree.
- POST /locations: Create a new location (Body: { "building": "A", "locationName": "Car Park", "locationNumber": "A-CarPark", "area": 80.62, "parentId": - null }).
- PATCH /locations/:id: Update a location.
- DELETE /locations/:id: Delete a location.

## Features
- CRUD operations for locations.
- Tree structure support with parentId.
- Validation with class-validator.
- Exception handling with custom NotFoundException.
- Logging with Winston (console and file logs/app.log).

## Database
- PostgreSQL with TypeORM.
- Table: locations (id, building, locationName, locationNumber, area, parentId).

## Swagger API Documentation
- Access the Swagger UI at: `http://localhost:3000/api`
- Provides interactive documentation and testing for all endpoints.
  
<img width="1483" alt="Ảnh màn hình 2025-04-08 lúc 15 56 55" src="https://github.com/user-attachments/assets/600f5611-d728-40b8-babb-712f727e9a2d" />


