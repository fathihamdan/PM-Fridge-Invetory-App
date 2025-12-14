package com.example.fridgeinventoryapp12.models;

public class RecipeIngredient {
    private String recipe_ingredients_id;
    private String recipe_id;
    private String item_id;
    private int ingredient_quantity;
    private String ingredient_unit;

    public RecipeIngredient() {} // Required for Firestore

    public RecipeIngredient(String id, String recipe_id, String item_id,
                            int quantity, String unit) {
        this.recipe_ingredients_id = id;
        this.recipe_id = recipe_id;
        this.item_id = item_id;
        this.ingredient_quantity = quantity;
        this.ingredient_unit = unit;
    }

    // Getters and Setters
    public String getRecipe_ingredients_id() { return recipe_ingredients_id; }
    public void setRecipe_ingredients_id(String id) { this.recipe_ingredients_id = id; }

    public String getRecipe_id() { return recipe_id; }
    public void setRecipe_id(String id) { this.recipe_id = id; }

    public String getItem_id() { return item_id; }
    public void setItem_id(String id) { this.item_id = id; }

    public int getIngredient_quantity() { return ingredient_quantity; }
    public void setIngredient_quantity(int qty) { this.ingredient_quantity = qty; }

    public String getIngredient_unit() { return ingredient_unit; }
    public void setIngredient_unit(String unit) { this.ingredient_unit = unit; }
}