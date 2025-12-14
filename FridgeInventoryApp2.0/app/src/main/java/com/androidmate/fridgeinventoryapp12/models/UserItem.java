package com.example.fridgeinventoryapp12.models;

public class UserItem {
    private String user_items_id;
    private String user_id;
    private String item_id;
    private int user_items_quantity;
    private String user_items_unit;
    private String user_items_expiry_date;
    private long user_items_added_at;
    private String user_items_status;

    public UserItem() {} // Required for Firestore

    public UserItem(String user_items_id, String user_id, String item_id,
                    int quantity, String unit, String expiry_date,
                    long added_at, String status) {
        this.user_items_id = user_items_id;
        this.user_id = user_id;
        this.item_id = item_id;
        this.user_items_quantity = quantity;
        this.user_items_unit = unit;
        this.user_items_expiry_date = expiry_date;
        this.user_items_added_at = added_at;
        this.user_items_status = status;
    }

    // Getters and Setters
    public String getUser_items_id() { return user_items_id; }
    public void setUser_items_id(String id) { this.user_items_id = id; }

    public String getUser_id() { return user_id; }
    public void setUser_id(String id) { this.user_id = id; }

    public String getItem_id() { return item_id; }
    public void setItem_id(String id) { this.item_id = id; }

    public int getUser_items_quantity() { return user_items_quantity; }
    public void setUser_items_quantity(int qty) { this.user_items_quantity = qty; }

    public String getUser_items_unit() { return user_items_unit; }
    public void setUser_items_unit(String unit) { this.user_items_unit = unit; }

    public String getUser_items_expiry_date() { return user_items_expiry_date; }
    public void setUser_items_expiry_date(String date) { this.user_items_expiry_date = date; }

    public long getUser_items_added_at() { return user_items_added_at; }
    public void setUser_items_added_at(long time) { this.user_items_added_at = time; }

    public String getUser_items_status() { return user_items_status; }
    public void setUser_items_status(String status) { this.user_items_status = status; }
}