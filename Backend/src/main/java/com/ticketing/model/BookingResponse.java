package com.ticketing.model;
import java.util.List;
public class BookingResponse {
    private boolean success;
    private String message;
    private double totalPrice;
    private List<TicketDetail> ticketDetails;
    public BookingResponse() {
    }
    public static BookingResponse error(String message) {
        BookingResponse response = new BookingResponse();
        response.setSuccess(false);
        response.setMessage(message);
        response.setTotalPrice(0);
        return response;
    }
    public static BookingResponse success(double totalPrice, List<TicketDetail> ticketDetails) {
        BookingResponse response = new BookingResponse();
        response.setSuccess(true);
        response.setMessage("Booking confirmed");
        response.setTotalPrice(totalPrice);
        response.setTicketDetails(ticketDetails);
        return response;
    }
    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
    public List<TicketDetail> getTicketDetails() {
        return ticketDetails;
    }
    public void setTicketDetails(List<TicketDetail> ticketDetails) {
        this.ticketDetails = ticketDetails;
    }
}