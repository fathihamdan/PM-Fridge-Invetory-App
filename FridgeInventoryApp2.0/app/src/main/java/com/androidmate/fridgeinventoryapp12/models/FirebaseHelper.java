package com.example.fridgeinventoryapp12;

import com.example.fridgeinventoryapp12.models.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import java.util.HashMap;
import java.util.Map;

public class FirebaseHelper {

    private static FirebaseFirestore db = FirebaseFirestore.getInstance();
    private static FirebaseAuth auth = FirebaseAuth.getInstance();

    // Create User in Firestore
    public static void createUser(String userId, String name, String email,
                                  OnCompleteListener listener) {
        Map<String, Object> user = new HashMap<>();
        user.put("user_id", userId);
        user.put("user_name", name);
        user.put("user_email", email);

        db.collection("users").document(userId)
                .set(user)
                .addOnSuccessListener(aVoid -> listener.onSuccess())
                .addOnFailureListener(e -> listener.onFailure(e.getMessage()));
    }

    // Add Item to User's Fridge
    public static void addUserItem(UserItem item, OnCompleteListener listener) {
        String docId = db.collection("user_items").document().getId();
        item.setUser_items_id(docId);

        db.collection("user_items").document(docId)
                .set(item)
                .addOnSuccessListener(aVoid -> listener.onSuccess())
                .addOnFailureListener(e -> listener.onFailure(e.getMessage()));
    }

    // Add Item to Master List
    public static void addItemMaster(ItemMaster item, OnCompleteListener listener) {
        String docId = db.collection("item_master").document().getId();
        item.setItem_id(docId);

        db.collection("item_master").document(docId)
                .set(item)
                .addOnSuccessListener(aVoid -> listener.onSuccess())
                .addOnFailureListener(e -> listener.onFailure(e.getMessage()));
    }

    // Create Recipe
    public static void createRecipe(Recipe recipe, OnCompleteListener listener) {
        String docId = db.collection("recipe").document().getId();
        recipe.setRecipe_id(docId);

        db.collection("recipe").document(docId)
                .set(recipe)
                .addOnSuccessListener(aVoid -> listener.onSuccess())
                .addOnFailureListener(e -> listener.onFailure(e.getMessage()));
    }

    // Add Recipe Ingredient
    public static void addRecipeIngredient(RecipeIngredient ingredient,
                                           OnCompleteListener listener) {
        String docId = db.collection("recipe_ingredients").document().getId();
        ingredient.setRecipe_ingredients_id(docId);

        db.collection("recipe_ingredients").document(docId)
                .set(ingredient)
                .addOnSuccessListener(aVoid -> listener.onSuccess())
                .addOnFailureListener(e -> listener.onFailure(e.getMessage()));
    }

    // Callback interface
    public interface OnCompleteListener {
        void onSuccess();
        void onFailure(String error);
    }
}