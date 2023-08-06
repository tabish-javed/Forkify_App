// import { async } from 'regenerator-runtime';
import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {}
};

export async function loadRecipe (recipeID) {
    try {
        const data = await getJSON(`${API_URL}${recipeID}`)
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
        console.error(`${error} --- ERROR!`);
    }
}