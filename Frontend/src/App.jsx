import React, { useEffect, useState, useCallback } from "react";
import SeatGrid from "./components/SeatGrid";
import BookingPanel from "./components/BookingPanel";
import BookingDetails from "./components/BookingDetails";
import { initializeEvent, getSeats, bookSeats } from "./services/api";
import "./App.css";

const App = () => {
  // seats: [ { id: 1, status: "available"|"booked", bookedBy: "Alice"|null }, … ]
  const [seats, setSeats] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // ---------- helpers ----------
  const bookedCount = seats.filter((s) => s.status === "booked").length;

  const fetchSeats = useCallback(async () => {
    try {
      const res = await getSeats();
      const data = res.data;
      let seatList;
      let serverBookedCount;

      if (data.seats && Array.isArray(data.seats)) {
        // Backend format: { seats: [{ seatId, status, bookedBy }], totalSeatsSold }
        seatList = data.seats.map((s) => ({
          id: s.seatId ?? s.id,
          status: s.status.toLowerCase(),
          bookedBy: s.bookedBy || null,
        }));
        serverBookedCount = data.totalSeatsSold;
      } else if (Array.isArray(data)) {
        seatList = data.map((s) => ({
          id: s.seatId ?? s.id,
          status: (s.status || "available").toLowerCase(),
          bookedBy: s.bookedBy || null,
        }));
      } else if (typeof data === "object") {
        seatList = Object.entries(data).map(([id, status]) => ({
          id: Number(id),
          status: typeof status === "string" ? status.toLowerCase() : status,
          bookedBy: null,
        }));
      }
      seatList.sort((a, b) => a.id - b.id);
      setSeats(seatList);
    } catch (err) {
      setError("Failed to fetch seats. Is the backend running?");
    }
  }, []);

  // ---------- lifecycle ----------
  useEffect(() => {
    fetchSeats();
  }, [fetchSeats]);

  // ---------- handlers ----------
  const handleToggleSeat = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setMessage(null);
    setError(null);
  };

  const handleInitialize = async () => {
    try {
      setLoading(true);
      await initializeEvent();
      setSelectedIds(new Set());
      setMessage("Event initialized – 100 seats are now available.");
      setError(null);
      await fetchSeats();
    } catch (err) {
      setError("Failed to initialize the event.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async () => {
    if (!userName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (selectedIds.size === 0) {
      setError("Please select at least one seat.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const seatIds = [...selectedIds].sort((a, b) => a - b);
      const res = await bookSeats(seatIds, userName.trim());
      const totalPrice =
        res.data.totalPrice ?? res.data.total ?? res.data.price ?? "N/A";
      setMessage(
        `Booking confirmed! Seats ${seatIds.join(", ")} booked for ${userName.trim()}. Total: $${totalPrice}`
      );
      setSelectedIds(new Set());
      await fetchSeats();
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        "Booking failed. Some seats may already be taken.";
      setError(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {handleInitialize()}, []); // Auto-initialize on first load

  // ---------- render ----------
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎟️ Dynamic Event Ticketing</h1>
        <button className="init-btn" onClick={handleInitialize} disabled={loading}>
          {loading ? "Working…" : "Reset Bookings"}
        </button>
      </header>

      {message && <div className="toast success">{message}</div>}
      {error && <div className="toast error">{error}</div>}

      <main className="app-body">
        <SeatGrid
          seats={seats}
          selectedIds={selectedIds}
          onToggleSeat={handleToggleSeat}
        />
        <BookingPanel
          selectedIds={selectedIds}
          bookedCount={bookedCount}
          userName={userName}
          onUserNameChange={setUserName}
          onBuy={handleBuy}
          loading={loading}
        />
      </main>

      <BookingDetails seats={seats} />
    </div>
  );
};

export default App;
