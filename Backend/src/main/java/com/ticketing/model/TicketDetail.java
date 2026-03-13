package com.ticketing.model;
public class TicketDetail {
    private int seatId;
    private int bookingOrder;
    private double price;
    public TicketDetail() {
    }
    public TicketDetail(int seatId, int bookingOrder, double price) {
        this.seatId = seatId;
        this.bookingOrder = bookingOrder;
        this.price = price;
    }
    public int getSeatId() {
        return seatId;
    }
    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }
    public int getBookingOrder() {
        return bookingOrder;
    }
    public void setBookingOrder(int bookingOrder) {
        this.bookingOrder = bookingOrder;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
}