import { useState, useMemo } from 'react';
import { ChefHat, Clock, Users, Sparkles } from 'lucide-react';
import { FridgeItem } from '../App';

interface RecipesScreenProps {
  fridgeItems: FridgeItem[];
  onUpdateFridgeItems: (items: FridgeItem[]) => void;
}

interface Recipe {
  id: string;
  name: string;
  image: string;
  time: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  matchPercentage: number;
}

export function RecipesScreen({ fridgeItems, onUpdateFridgeItems }: RecipesScreenProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCookRecipe = (recipe: Recipe) => {
    // Deduct ingredients from fridge
    const updatedFridgeItems = fridgeItems.map(item => {
      const itemNameLower = item.name.toLowerCase();
      const usedIngredient = recipe.ingredients.find(ingredient =>
        itemNameLower.includes(ingredient) || ingredient.includes(itemNameLower)
      );

      if (usedIngredient) {
        // Reduce quantity or remove if quantity becomes 0 or negative
        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) {
          return null; // Mark for removal
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter((item): item is FridgeItem => item !== null);

    onUpdateFridgeItems(updatedFridgeItems);
    setShowConfirmation(true);
    
    // Auto-close confirmation after 2 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedRecipe(null);
    }, 2000);
  };

  const recipes: Recipe[] = useMemo(() => {
    const fridgeIngredients = fridgeItems.map(item => item.name.toLowerCase());

    const allRecipes = [
      {
        id: '1',
        name: 'Classic Omelet',
        image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400',
        time: 10,
        servings: 2,
        ingredients: ['eggs', 'milk', 'cheese', 'butter'],
        instructions: [
          'Beat eggs with milk in a bowl',
          'Heat butter in a pan over medium heat',
          'Pour egg mixture into the pan',
          'Add cheese when eggs are halfway cooked',
          'Fold and serve hot'
        ],
      },
      {
        id: '2',
        name: 'Chicken Salad',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        time: 20,
        servings: 4,
        ingredients: ['chicken breast', 'lettuce', 'tomatoes', 'cheese', 'olive oil'],
        instructions: [
          'Grill chicken breast until fully cooked',
          'Chop lettuce and tomatoes',
          'Slice the cooked chicken',
          'Mix all ingredients in a bowl',
          'Drizzle with olive oil and season to taste'
        ],
      },
      {
        id: '3',
        name: 'Tomato Soup',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
        time: 30,
        servings: 4,
        ingredients: ['tomatoes', 'onion', 'garlic', 'chicken breast', 'milk'],
        instructions: [
          'Chop tomatoes and onion',
          'Sauté onion and garlic until fragrant',
          'Add tomatoes and cook until soft',
          'Blend until smooth',
          'Add milk and simmer for 10 minutes'
        ],
      },
      {
        id: '4',
        name: 'Grilled Cheese Sandwich',
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400',
        time: 10,
        servings: 1,
        ingredients: ['bread', 'cheese', 'butter'],
        instructions: [
          'Butter one side of each bread slice',
          'Place cheese between bread slices',
          'Grill in a pan until golden brown on both sides',
          'Cut diagonally and serve hot'
        ],
      },
      {
        id: '5',
        name: 'Caprese Salad',
        image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400',
        time: 5,
        servings: 2,
        ingredients: ['tomatoes', 'cheese', 'olive oil', 'basil'],
        instructions: [
          'Slice tomatoes and cheese',
          'Arrange alternating slices on a plate',
          'Drizzle with olive oil',
          'Add fresh basil leaves',
          'Season with salt and pepper'
        ],
      },
    ];

    return allRecipes.map(recipe => {
      const matchingIngredients = recipe.ingredients.filter(ingredient =>
        fridgeIngredients.some(fridgeIng => 
          fridgeIng.includes(ingredient) || ingredient.includes(fridgeIng)
        )
      );
      const matchPercentage = Math.round((matchingIngredients.length / recipe.ingredients.length) * 100);

      return {
        ...recipe,
        matchPercentage,
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [fridgeItems]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-gray-900 dark:text-white mb-2">Recipes for You</h1>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Sparkles className="w-5 h-5" />
          <p>AI-powered recipe suggestions based on your fridge</p>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="space-y-4">
        {recipes.map(recipe => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex gap-4">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-32 h-32 object-cover flex-shrink-0"
              />
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900 dark:text-white">{recipe.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      recipe.matchPercentage >= 80
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : recipe.matchPercentage >= 50
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {recipe.matchPercentage}% match
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {recipe.ingredients.length} ingredients
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-gray-900 dark:text-white">{selectedRecipe.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedRecipe.matchPercentage >= 80
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : selectedRecipe.matchPercentage >= 50
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {selectedRecipe.matchPercentage}% match
                </span>
              </div>

              <div className="flex items-center gap-6 mb-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{selectedRecipe.time} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{selectedRecipe.servings} servings</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-900 dark:text-white mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => {
                    const hasIngredient = fridgeItems.some(item =>
                      item.name.toLowerCase().includes(ingredient) ||
                      ingredient.includes(item.name.toLowerCase())
                    );
                    return (
                      <li
                        key={index}
                        className={`flex items-center gap-2 ${
                          hasIngredient
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            hasIngredient ? 'bg-green-600' : 'bg-gray-400'
                          }`}
                        ></div>
                        <span className="capitalize">{ingredient}</span>
                        {hasIngredient && (
                          <span className="text-xs text-green-600 dark:text-green-400">
                            (in fridge)
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 dark:text-white mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-gray-600 dark:text-gray-400"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-[#007057] text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <button
                onClick={() => setSelectedRecipe(null)}
                className="w-full mt-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => handleCookRecipe(selectedRecipe)}
                disabled={showConfirmation}
                className="w-full mt-3 py-3 bg-[#007057] hover:bg-[#005a45] disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ChefHat className="w-5 h-5" />
                {showConfirmation ? 'Ingredients Deducted!' : 'Cook This Recipe'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}