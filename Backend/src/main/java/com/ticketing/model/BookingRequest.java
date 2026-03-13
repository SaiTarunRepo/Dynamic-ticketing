package com.ticketing.model;
import java.util.List;
public class BookingRequest {
    private List<Integer> seatIds;
    private String userName;
    public BookingRequest() {
    }
    public BookingRequest(List<Integer> seatIds, String userName) {
        this.seatIds = seatIds;
        this.userName = userName;
    }
    public List<Integer> getSeatIds() {
        return seatIds;
    }
    public void setSeatIds(List<Integer> seatIds) {
        this.seatIds = seatIds;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
}