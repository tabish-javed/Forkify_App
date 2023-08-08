// import { async } from 'regenerator-runtime';
import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
};


export async function loadRecipe (recipeID) {
    try {
        const data = await getJSON(`${API_URL}${recipeID}`);
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
    } catch (error) {
        throw error;
    }
}


export async function loadSearchResults (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                imageURL: recipe.image_url,
            };
        });
    } catch (error) {
        throw error;
    }
}