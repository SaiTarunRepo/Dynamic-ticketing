import React from "react";
import Seat from "./Seat";

/**
 * 10×10 visual grid of seats.
 * Props:
 *  - seats        : array of { id, status } (length 100)
 *  - selectedIds  : Set of seat ids the user has selected
 *  - onToggleSeat : callback(id)
 */
const SeatGrid = ({ seats, selectedIds, onToggleSeat }) => {
  return (
    <div className="seat-grid-wrapper">
      <h2>Select Your Seats</h2>
      <div className="screen-label">STAGE</div>
      <div className="seat-grid">
        {seats.map((seat) => (
          <Seat
            key={seat.id}
            id={seat.id}
            status={seat.status}
            selected={selectedIds.has(seat.id)}
            onToggle={onToggleSeat}
            bookedBy={seat.bookedBy}
          />
        ))}
      </div>
      <div className="legend">
        <span className="legend-item">
          <span className="seat-box available" /> Available
        </span>
        <span className="legend-item">
          <span className="seat-box selected" /> Selected
        </span>
        <span className="legend-item">
          <span className="seat-box booked" /> Booked
        </span>
      </div>
    </div>
  );
};

export default SeatGrid;
