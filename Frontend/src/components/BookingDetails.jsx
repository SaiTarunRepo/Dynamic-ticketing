import React from "react";

/**
 * Pricing helper – same tiers used in BookingPanel.
 *   Bookings  1-50  → $50 each
 *   Bookings 51-80  → $75 each
 *   Bookings 81-100 → $100 each
 */
const priceForNth = (n) => {
  if (n <= 50) return 50;
  if (n <= 80) return 75;
  return 100;
};

/**
 * BookingDetails – shows a summary of all bookings grouped by user.
 * Props:
 *  - seats : array of { id, status, bookedBy }
 */
const BookingDetails = ({ seats }) => {
  // Only consider booked seats that have a bookedBy value
  const bookedSeats = seats.filter((s) => s.status === "booked" && s.bookedBy);

  if (bookedSeats.length === 0) return null;

  // Sort booked seats by ID to approximate booking order
  const sortedBooked = [...bookedSeats].sort((a, b) => a.id - b.id);

  // Build a map: seatId → booking order number (1-based)
  const orderMap = {};
  sortedBooked.forEach((s, idx) => {
    orderMap[s.id] = idx + 1;
  });

  // Group by user
  const byUser = {};
  bookedSeats.forEach((s) => {
    if (!byUser[s.bookedBy]) byUser[s.bookedBy] = [];
    byUser[s.bookedBy].push(s.id);
  });

  // Sort seat IDs within each user
  Object.values(byUser).forEach((ids) => ids.sort((a, b) => a - b));

  // Calculate amount paid per user
  const amountByUser = {};
  Object.entries(byUser).forEach(([user, ids]) => {
    amountByUser[user] = ids.reduce(
      (sum, id) => sum + priceForNth(orderMap[id]),
      0
    );
  });

  const users = Object.keys(byUser).sort();
  const totalAmount = Object.values(amountByUser).reduce((a, b) => a + b, 0);

  return (
    <section className="booking-details">
      <h2>Booking Details</h2>
      <p className="booking-summary">
        {bookedSeats.length} seat{bookedSeats.length !== 1 ? "s" : ""} booked by{" "}
        {users.length} user{users.length !== 1 ? "s" : ""} — Total revenue: ${totalAmount}
      </p>

      <table className="booking-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Seats</th>
            <th>Count</th>
            <th>Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user}>
              <td className="user-name">{user}</td>
              <td className="seat-list">
                {byUser[user].map((id) => (
                  <span key={id} className="seat-tag">
                    {id}
                  </span>
                ))}
              </td>
              <td className="seat-count">{byUser[user].length}</td>
              <td className="seat-amount">${amountByUser[user]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BookingDetails;
