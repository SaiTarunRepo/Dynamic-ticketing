# 🎟️ Dynamic Event Ticketing — Frontend

A React-based seat booking UI for a dynamic-pricing event ticketing system. Users can view a 10×10 seat grid, select available seats, and book them with tiered pricing that increases as more seats are sold.

## Tech Stack

- **React 19** — UI library
- **Vite 5** — Dev server & bundler (HMR)
- **Axios** — HTTP client
- **Plain CSS** — Styling (no framework)

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Backend** running at `http://localhost:8080` (Spring Boot)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**.

> **Note:** The backend must be running at `http://localhost:8080` for API calls to work. Without it, the app will show a "Failed to fetch seats" error.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Root component (state & logic)
├── App.css                  # All component styles
├── index.css                # Global resets & body styles
├── components/
│   ├── Seat.jsx             # Single seat cell (React.memo)
│   ├── SeatGrid.jsx         # 10×10 CSS Grid of seats
│   ├── BookingPanel.jsx     # Checkout sidebar with price preview
│   └── BookingDetails.jsx   # Booking history table by user
└── services/
    └── api.js               # Axios instance & API functions
```

## API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/initialize` | Reset all 100 seats to available |
| `GET` | `/seats` | Fetch current seat statuses |
| `POST` | `/book` | Book selected seats for a user |

## Dynamic Pricing

Ticket prices increase based on booking order:

| Booking # | Price per Seat |
|-----------|---------------|
| 1 – 50 | $50 |
| 51 – 80 | $75 |
| 81 – 100 | $100 |