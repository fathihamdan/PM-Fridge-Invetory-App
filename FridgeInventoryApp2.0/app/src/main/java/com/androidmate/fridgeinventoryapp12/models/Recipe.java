package com.example.fridgeinventoryapp12.models;

public class Recipe {
    private String recipe_id;
    private String user_id;
    private String recipe_name;
    private String recipe_instruction;

    public Recipe() {} // Required for Firestore

    public Recipe(String recipe_id, String user_id, String name, String instruction) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.recipe_name = name;
        this.recipe_instruction = instruction;
    }

    // Getters and Setters
    public String getRecipe_id() { return recipe_id; }
    public void setRecipe_id(String id) { this.recipe_id = id; }

    public String getUser_id() { return user_id; }
    public void setUser_id(String id) { this.user_id = id; }

    public String getRecipe_name() { return recipe_name; }
    public void setRecipe_name(String name) { this.recipe_name = name; }

    public String getRecipe_instruction() { return recipe_instruction; }
    public void setRecipe_instruction(String instruction) { this.recipe_instruction = instruction; }
}