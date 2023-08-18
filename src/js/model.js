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
    },
    bookmarks: [],
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

        if (state.bookmarks.some(bookmark => bookmark.id === recipeID))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

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
        state.search.page = 1;
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


function persistBookmarks () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}


export function addBookmark (recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
}


export function deleteBookmark (id) {
    // Delete bookmark
    const index = state.bookmarks.findIndex(element => element.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
}


export async function uploadRecipe (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') &&
                entry[1] !== '')
            .map(ingredient => {
                const ingredientArray = ingredient[1].replaceAll(' ', '').split(',');
                if (ingredientArray.length !== 3) throw new Error('Wrong ingredient format, please use the correct format');
                const [quantity, unit, description] = ingredientArray;
                return { quantity: quantity ? +quantity : null, unit, description };
                // Object properties are mentioned without value, as values are implicitly added.
                // this is is same as explicitly mentioning values in following code
                // return { quantity: quantity, unit: unit, description: description };
            });

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceURL,
            image_url: newRecipe.imageURL,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients
        };



    } catch (error) {
        console.error(error);
        throw error;
    }
}



function init () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}
init();


function clearBookmarks () {
    localStorage.clear('bookmarks');
}
// clearBookmarks()