import { async } from 'regenerator-runtime';

export const state = {
    recipe: {}
};

export async function loadRecipe (recipeID) {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}`);
        const data = await response.json();

        if (!response.ok) throw new Error(`${data.message} (${response.status})`);

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url,
            imageURL: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(state.recipe);

    } catch (error) {
        alert(error);
    }
}