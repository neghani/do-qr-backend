
**Tech Stack Overview: Visitor Management System**

-   **Backend Framework**: Node.js with Express.js
-   **Database**: MySQL (via Sequelize ORM)
-   **Authentication**: JWT (JSON Web Tokens) for token-based authentication
-   **Password Hashing**: bcrypt for secure password hashing
-   **API Documentation**: Swagger (optional, if used for API documentation)
-   **Containerization**: Docker for containerization
-   **Environment Configuration**: Docker Compose for managing multi-container Docker applications
-   **Testing**: Postman for API testing and development
-   **Additional Libraries**:
    -   `sequelize` for ORM operations with MySQL
    -   `jsonwebtoken` for generating and verifying JWT tokens
    -   `bcrypt` for password hashing and validation


How to run your Docker-based Node.js application, including setting up Docker Compose for containerization, here's a step-by-step guide. This guide assumes you have already Docker and Docker Compose installed on your machine.

### 1\. Dockerfile

Ensure you have a Dockerfile in your project root to build your Node.js application image. Here's a basic example:

#### Dockerfile

dockerfile

Copy code

`# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]`

### 2\. Docker Compose Configuration

Create a `docker-compose.yml` file in your project root to define services, networks, and volumes. Include your Node.js application service and a MySQL service for the database, if applicable.

#### docker-compose.yml

yaml

Copy code

`version: '3'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      NODE_ENV: production
      MYSQL_HOST: db  # Replace with your MySQL host if needed
      MYSQL_USER: root
      MYSQL_PASSWORD: password
      MYSQL_DATABASE: mydatabase  # Replace with your database name
    depends_on:
      - db
    networks:
      - app-network
    volumes:
      - .:/usr/src/app

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydatabase  # Replace with your database name
    networks:
      - app-network
    volumes:
      - db-data:/var/lib/mysql

networks:
  app-network:
    driver: bridge

volumes:
  db-data:`

### 3\. Environment Variables

Ensure your application reads environment variables correctly, especially those passed through Docker Compose (`docker-compose.yml`). Modify your application's configuration to read these environment variables for database connection details, etc.

### 4\. Running the Application

To run your Docker-based Node.js application:

1.  **Build the Docker images**:

    bash

    Copy code

    `docker-compose build`

2.  **Start the services**:

    bash

    Copy code

    `docker-compose up`

    Add `-d` flag to run in detached mode:

    bash

    Copy code

    `docker-compose up -d`

3.  **Accessing the Application**:

    -   After starting, your Node.js application should be accessible at `http://localhost:3000`.
    -   Replace `localhost` with your Docker host IP if needed.

### 5\. Stopping the Application

To stop the application and services:

bash

Copy code

`docker-compose down`

# DB Models

The database models in a Node.js application using Sequelize, you can provide an overview of each model including its attributes and associations. Here's an example format for documenting each model:

### 1\. User Model

#### Attributes:

-   **id**: UUID (Primary Key)
-   **firstName**: String
-   **lastName**: String
-   **email**: String (Unique)
-   **mobile**: String (Unique)
-   **password**: String (Hashed)
-   **createdAt**: Date
-   **updatedAt**: Date

#### Associations:

-   None specified in the provided information.

### 2\. Property Model

#### Attributes:

-   **id**: UUID (Primary Key)
-   **propertyName**: String
-   **address**: String
-   **city**: String
-   **state**: String
-   **zipcode**: String
-   **createdAt**: Date
-   **updatedAt**: Date

#### Associations:

-   Has many Units

### 3\. Unit Model

#### Attributes:

-   **id**: UUID (Primary Key)
-   **unitNumber**: String
-   **propertyId**: UUID (Foreign Key)
-   **userId**: UUID (Foreign Key, Optional)
-   **floorNumber**: Integer
-   **squareFeet**: Integer
-   **numberOfBedrooms**: Integer
-   **numberOfBathrooms**: Integer
-   **occupied**: Boolean
-   **rentAmount**: Float
-   **leaseStart**: Date
-   **leaseEnd**: Date
-   **createdAt**: Date
-   **updatedAt**: Date

#### Associations:

-   Belongs to Property
-   Belongs to User (Optional, if occupied)

### 4\. Visit Model

#### Attributes:

-   **id**: UUID (Primary Key)
-   **visitorMobile**: String
-   **visitorEmail**: String
-   **employeeId**: UUID (Foreign Key, Optional)
-   **propertyId**: UUID (Foreign Key)
-   **unitId**: UUID (Foreign Key, Optional)
-   **visitDateTime**: Date
-   **purpose**: String
-   **status**: String
-   **checkInDateTime**: Date
-   **checkOutDateTime**: Date
-   **createdAt**: Date
-   **updatedAt**: Date

#### Associations:

-   Belongs to Property
-   Belongs to Unit (Optional)

### 5\. Permission Model

#### Attributes:

-   **id**: UUID (Primary Key)
-   **groupId**: UUID (Foreign Key)
-   **roleId**: UUID (Foreign Key)
-   **userId**: UUID (Foreign Key)
-   **createdAt**: Date
-   **updatedAt**: Date

#### Associations:

-   Belongs to Group
-   Belongs to Role
-   Belongs to User

### Documentation Notes:

-   **Data Types**: Ensure all data types (String, Integer, Float, Date, Boolean, UUID) are correctly mapped and documented.
-   **Associations**: Document how each model relates to others (hasOne, hasMany, belongsTo, etc.).
-   **Optional Attributes**: Clearly mark attributes that are optional (nullable).
-   **Foreign Keys**: Specify foreign key relationships and their constraints (onDelete, onUpdate).

### Usage:

-   Use this documentation as a reference for developers working on the project, especially for understanding database schema, relationships, and attribute definitions.
-   Update the documentation as the schema evolves to maintain accuracy.