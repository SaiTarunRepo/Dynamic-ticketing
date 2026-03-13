package com.ticketing.controller;
import com.ticketing.model.BookingRequest;
import com.ticketing.model.BookingResponse;
import com.ticketing.model.Seat;
import com.ticketing.service.TicketingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@CrossOrigin(origins = "*")
public class TicketingController {
    private static final Logger log = LoggerFactory.getLogger(TicketingController.class);
    private final TicketingService ticketingService;
    public TicketingController(TicketingService ticketingService) {
        this.ticketingService = ticketingService;
    }
    @PostMapping("/initialize")
    public ResponseEntity<Map<String, Object>> initialize() {
        log.info("POST /initialize - Initializing event");
        List<Seat> seats = ticketingService.initializeEvent();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Event initialized with " + seats.size() + " seats.");
        response.put("seats", seats);
        log.info("Event initialized successfully with {} seats", seats.size());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/seats")
    public ResponseEntity<?> getSeats() {
        log.info("GET /seats - Fetching all seats");
        try {
            List<Seat> seats = ticketingService.getAllSeats();
            Map<String, Object> response = new HashMap<>();
            response.put("seats", seats);
            response.put("totalSeatsSold", ticketingService.getTotalSeatsSold());
            log.info("Returning {} seats, totalSeatsSold={}", seats.size(), ticketingService.getTotalSeatsSold());
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            log.error("Error fetching seats: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    @PostMapping("/book")
    public ResponseEntity<BookingResponse> bookSeats(@RequestBody BookingRequest request) {
        log.info("POST /book - Booking seats {} for user '{}'", request.getSeatIds(), request.getUserName());
        BookingResponse response = ticketingService.bookSeats(request.getSeatIds(), request.getUserName());
        if (response.isSuccess()) {
            log.info("Booking successful - totalPrice={}", response.getTotalPrice());
            return ResponseEntity.ok(response);
        } else {
            log.warn("Booking failed - {}", response.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}