import React from "react";

/**
 * Single seat cell.
 * Props:
 *  - id        : seat number (1-100)
 *  - status    : "available" | "booked"
 *  - selected  : boolean – user has clicked it
 *  - onToggle  : callback(id)
 *  - bookedBy  : string | null – name of the person who booked
 */
const Seat = ({ id, status, selected, onToggle, bookedBy }) => {
  const isBooked = status === "booked";

  const handleClick = () => {
    if (!isBooked) onToggle(id);
  };

  let className = "seat";
  if (isBooked) className += " booked";
  else if (selected) className += " selected";
  else className += " available";

  const tooltip = isBooked && bookedBy
    ? `Seat ${id} — Booked by ${bookedBy}`
    : `Seat ${id}`;

  return (
    <div className={className} onClick={handleClick} title={tooltip}>
      {id}
    </div>
  );
};

export default React.memo(Seat);
