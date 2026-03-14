# Dynamic Event Ticketing System
A Spring Boot backend application that simulates a single event with 100 seats, featuring dynamic pricing based on booking order.
## About the Application
This is a ticketing system where:
- An event has exactly **100 seats**
- Users can **book seats** with dynamic pricing
- Prices increase as more seats are sold:
  - **$50** per ticket for seats 1-50
  - **$75** per ticket for seats 51-80
  - **$100** per ticket for seats 81-100
- All operations are **thread-safe**
## Prerequisites
- JDK 11 or higher
- Maven 3.6.0 or higher
## How to Run
### 1. Build the Project
```bash
mvn clean install
```
### 2. Run the Application
```bash
mvn spring-boot:run
```
Or directly run:
```bash
java -jar target/ticketing-0.0.1-SNAPSHOT.jar
```
The server starts at **http://localhost:8080**
## API Endpoints
### 1. Initialize Event
```
POST /initialize
```
Initializes the event with 100 seats.
### 2. Get All Seats
```
GET /seats
```
Returns all seats and total sold count.
### 3. Book Seats
```
POST /book
```
Books seats for a user with dynamic pricing.
## Example Usage
```bash
# Initialize event
curl -X POST http://localhost:8080/initialize
# Book seats
curl -X POST http://localhost:8080/book \
  -H "Content-Type: application/json" \
  -d '{"seatIds": [1, 2], "userName": "Alice"}'
# Check seats
curl http://localhost:8080/seats
```

