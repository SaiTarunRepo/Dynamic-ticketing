package com.ticketing.service;
import com.ticketing.model.BookingResponse;
import com.ticketing.model.Seat;
import com.ticketing.model.TicketDetail;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
class TicketingServiceTest {
    private TicketingService service;
    @BeforeEach
    void setUp() {
        service = new TicketingService();
        service.initializeEvent();
    }
    @Test
    void testInitializeEvent() {
        List<Seat> seats = service.getAllSeats();
        assertEquals(100, seats.size());
        for (Seat seat : seats) {
            assertEquals("available", seat.getStatus());
            assertNull(seat.getBookedBy());
        }
        assertEquals(0, service.getTotalSeatsSold());
    }
    @Test
    void testBookSeatsSuccess() {
        BookingResponse response = service.bookSeats(Arrays.asList(1, 2, 3), "Alice");
        assertTrue(response.isSuccess());
        assertEquals(150.0, response.getTotalPrice());
    }
    @Test
    void testBookSeatAlreadyBooked() {
        service.bookSeats(Arrays.asList(5), "Alice");
        BookingResponse response = service.bookSeats(Arrays.asList(5), "Bob");
        assertFalse(response.isSuccess());
        assertTrue(response.getMessage().contains("already booked"));
    }
    @Test
    void testPricingTierCrossover() {
        for (int i = 1; i <= 49; i++) {
            service.bookSeats(Arrays.asList(i), "User" + i);
        }
        BookingResponse response = service.bookSeats(Arrays.asList(50, 51, 52), "TestUser");
        assertTrue(response.isSuccess());
        List<TicketDetail> details = response.getTicketDetails();
        assertEquals(50.0, details.get(0).getPrice());
        assertEquals(75.0, details.get(1).getPrice());
        assertEquals(75.0, details.get(2).getPrice());
        assertEquals(200.0, response.getTotalPrice());
    }
    @Test
    void testReInitialize() {
        service.bookSeats(Arrays.asList(1, 2, 3), "Alice");
        assertEquals(3, service.getTotalSeatsSold());
        service.initializeEvent();
        assertEquals(0, service.getTotalSeatsSold());
    }
}