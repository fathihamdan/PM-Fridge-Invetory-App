
package com.example.fridgeinventoryapp12.models;

public class ItemMaster {
    private String item_id;
    private String item_code;
    private String item_name;
    private String item_category;
    private int item_default_shelf_life;

    public ItemMaster() {} // Required for Firestore

    public ItemMaster(String item_id, String item_code, String item_name,
                      String category, int shelf_life) {
        this.item_id = item_id;
        this.item_code = item_code;
        this.item_name = item_name;
        this.item_category = category;
        this.item_default_shelf_life = shelf_life;
    }

    // Getters and Setters
    public String getItem_id() { return item_id; }
    public void setItem_id(String id) { this.item_id = id; }

    public String getItem_code() { return item_code; }
    public void setItem_code(String code) { this.item_code = code; }

    public String getItem_name() { return item_name; }
    public void setItem_name(String name) { this.item_name = name; }

    public String getItem_category() { return item_category; }
    public void setItem_category(String category) { this.item_category = category; }

    public int getItem_default_shelf_life() { return item_default_shelf_life; }
    public void setItem_default_shelf_life(int days) { this.item_default_shelf_life = days; }
}