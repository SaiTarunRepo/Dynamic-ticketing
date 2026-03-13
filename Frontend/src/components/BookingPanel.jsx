import React from "react";

/**
 * Pricing helper – computes the dynamic price based on
 * how many seats have ALREADY been booked (globally).
 *
 * Pricing tiers are by booking ORDER, not seat number:
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
 * BookingPanel – sidebar showing selected seats, dynamic total, and Buy button.
 * Props:
 *  - selectedIds    : Set of selected seat ids
 *  - bookedCount    : number of seats already booked globally
 *  - userName       : string
 *  - onUserNameChange : callback(name)
 *  - onBuy          : callback()
 *  - loading        : boolean
 */
const BookingPanel = ({
  selectedIds,
  bookedCount,
  userName,
  onUserNameChange,
  onBuy,
  loading,
}) => {
  const selected = [...selectedIds].sort((a, b) => a - b);

  // Build line items with per-ticket price
  const lineItems = selected.map((seatId, idx) => {
    const orderNum = bookedCount + idx + 1; // nth booking overall
    const price = priceForNth(orderNum);
    return { seatId, orderNum, price };
  });

  const totalPrice = lineItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="booking-panel">
      <h2>Booking Summary</h2>

      <label className="input-label">
        Your Name
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => onUserNameChange(e.target.value)}
        />
      </label>

      {selected.length === 0 ? (
        <p className="hint">Click on available seats to select them.</p>
      ) : (
        <>
          <table className="line-items">
            <thead>
              <tr>
                <th>Seat</th>
                <th>Ticket #</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item) => (
                <tr key={item.seatId}>
                  <td>Seat #{item.seatId}</td>
                  <td>#{item.orderNum}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total">
            Total: <strong>${totalPrice}</strong>
          </div>

          <button
            className="buy-btn"
            disabled={loading || !userName.trim()}
            onClick={onBuy}
          >
            {loading ? "Booking…" : `Buy ${selected.length} Seat(s) — $${totalPrice}`}
          </button>
        </>
      )}
    </div>
  );
};

export default BookingPanel;
