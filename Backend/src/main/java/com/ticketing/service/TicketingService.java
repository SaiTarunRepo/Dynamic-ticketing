package com.ticketing.service;
import com.ticketing.model.BookingResponse;
import com.ticketing.model.Seat;
import com.ticketing.model.TicketDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
@Service
public class TicketingService {
    private static final Logger log = LoggerFactory.getLogger(TicketingService.class);
    private final List<Seat> seats = Collections.synchronizedList(new ArrayList<>());
    private final AtomicInteger totalSeatsSold = new AtomicInteger(0);
    public List<Seat> initializeEvent() {
        log.info("Initializing event with 100 seats");

        seats.clear();
        for (int i = 1; i <= 100; i++) {
            seats.add(new Seat(i));
        }
        totalSeatsSold.set(0);
        log.info("Event initialized. Total seats: {}, seats sold reset to 0", seats.size());
        return getAllSeats();
    }
    public List<Seat> getAllSeats() {
        synchronized (seats) {
            return new ArrayList<>(seats);
        }
    }
    public int getTotalSeatsSold() {
        return totalSeatsSold.get();
    }
    public BookingResponse bookSeats(List<Integer> seatIds, String userName) {
        log.info("Attempting to book seats {} for user '{}'", seatIds, userName);

        if (userName == null || userName.trim().isEmpty()) {
            log.warn("Booking rejected - user name is empty");
            return BookingResponse.error("User name is required");
        }
        if (seatIds == null || seatIds.isEmpty()) {
            log.warn("Booking rejected - no seats provided");
            return BookingResponse.error("No seats provided");
        }
        
        // Validate event is initialized and seat IDs are valid
        if (seats.isEmpty()) {
            log.warn("Booking rejected - event not initialized");
            return BookingResponse.error("Event has not been initialized. Call POST /initialize first.");
        }
        
        for (int seatId : seatIds) {
            if (seatId < 1 || seatId > 100) {
                log.warn("Booking rejected - invalid seat ID: {}", seatId);
                return BookingResponse.error("Invalid seat ID: " + seatId);
            }
        }
        
        // Check if seats are available (individual operations are synchronized by synchronizedList)
        for (int seatId : seatIds) {
            Seat seat = seats.get(seatId - 1);
            if ("booked".equals(seat.getStatus())) {
                log.warn("Booking rejected - seat {} is already booked", seatId);
                return BookingResponse.error("Seat " + seatId + " is already booked");
            }
        }
        
        // Book all seats atomically - use synchronized block here because we need multiple operations as one unit
        synchronized (seats) {
            // Double-check after acquiring lock (check-then-act pattern)
            for (int seatId : seatIds) {
                Seat seat = seats.get(seatId - 1);
                if ("booked".equals(seat.getStatus())) {
                    log.warn("Booking rejected - seat {} was booked by another user", seatId);
                    return BookingResponse.error("Seat " + seatId + " is already booked");
                }
            }
            
            List<TicketDetail> ticketDetails = new ArrayList<>();
            double totalPrice = 0;
            for (int seatId : seatIds) {
                int orderNumber = totalSeatsSold.incrementAndGet();
                double price = calculatePrice(orderNumber);
                totalPrice += price;
                Seat seat = seats.get(seatId - 1);
                seat.setStatus("booked");
                seat.setBookedBy(userName.trim());
                ticketDetails.add(new TicketDetail(seatId, orderNumber, price));
                log.debug("Booked seat {} (order #{}) at ${}", seatId, orderNumber, price);
            }
            log.info("Booking successful for user '{}' - {} seats booked, totalPrice=${}", userName, seatIds.size(), totalPrice);
            return BookingResponse.success(totalPrice, ticketDetails);
        }
    }
    private double calculatePrice(int bookingOrder) {
        double price;
        if (bookingOrder <= 50) {
            price = 50.0;
        } else if (bookingOrder <= 80) {
            price = 75.0;
        } else {
            price = 100.0;
        }
        log.debug("Calculated price for booking order {}: ${}", bookingOrder, price);
        return price;
    }
}
