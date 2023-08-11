// import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE
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


export function getSearchResultsPage (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage; // 0;
    const end = page * state.search.resultsPerPage; // 9;

    return state.search.results.slice(start, end);
}


export function updateServings (servings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = ingredient.quantity * servings / state.recipe.servings;
    });

    state.recipe.servings = servings;
}