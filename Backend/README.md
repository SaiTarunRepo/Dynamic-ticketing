# Dynamic Event Ticketing System

A Spring Boot backend application that simulates a single event with 100 seats, featuring dynamic pricing based on booking order.

## Tech Stack

- **Java 11**
- **Spring Boot 2.7.18**
- **Maven**

## Prerequisites

- JDK 11 or higher installed
- Maven installed (or use the included Maven wrapper if available)

## How to Run Locally

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticketing
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```
   The server starts at **http://localhost:8080**

## API Endpoints

| Method | URL            | Description                        | Request Body                                      |
|--------|----------------|------------------------------------|---------------------------------------------------|
| POST   | `/initialize`  | Initialize the event with 100 seats | None                                              |
| GET    | `/seats`       | Get status of all seats            | None                                              |
| POST   | `/book`        | Book one or more seats             | `{ "seatIds": [1, 2, 3], "userName": "Alice" }`  |

### Usage Flow

1. Call `POST /initialize` to set up the event.
2. Call `GET /seats` to view all seat statuses.
3. Call `POST /book` with seat IDs and a user name to book seats.

### Example — Book Seats

**Request:**
```json
POST /book
{
  "seatIds": [45, 46, 47],
  "userName": "Alice"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking confirmed",
  "totalPrice": 150.0,
  "ticketDetails": [
    { "seatId": 45, "bookingOrder": 1, "price": 50.0 },
    { "seatId": 46, "bookingOrder": 2, "price": 50.0 },
    { "seatId": 47, "bookingOrder": 3, "price": 50.0 }
  ]
}
```

## Pricing Logic

Pricing is based on the **global booking order** (not the seat number):

| Booking Order | Price per Ticket |
|---------------|------------------|
| 1–50          | $50              |
| 51–80         | $75              |
| 81–100        | $100             |

> Example: If 49 seats have been sold and a user books 3 seats, the prices are $50 + $75 + $75 = **$200**.

## Running Tests

```bash
mvn test
```

