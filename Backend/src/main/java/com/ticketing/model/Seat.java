package com.ticketing.model;
public class Seat {
    private int id;
    private String status;
    private String bookedBy;
    public Seat() {
    }
    public Seat(int id) {
        this.id = id;
        this.status = "available";
        this.bookedBy = null;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getBookedBy() {
        return bookedBy;
    }
    public void setBookedBy(String bookedBy) {
        this.bookedBy = bookedBy;
    }
}