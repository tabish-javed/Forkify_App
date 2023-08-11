// Internal imports
import 'core-js/stable';    // Added to Polyfill
import 'regenerator-runtime/runtime.js';    // Added to Polyfill

// External imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

// if (module.hot) {
//     module.hot.accept();
// }

async function controlRecipes () {
    try {
        const recipeID = window.location.hash.slice(1);
        if (!recipeID) return;

        // Render spinner
        recipeView.renderSpinner();

        // Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());

        // Loading recipe
        await model.loadRecipe(recipeID);
        // Render recipe
        recipeView.render(model.state.recipe);

    } catch (error) {
        recipeView.renderErrorMessage();
    }
}


async function controlSearchResults () {
    try {
        resultsView.renderSpinner();

        // 1 - Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2 - Load search results
        await model.loadSearchResults(query);

        // 3 - Render search results
        resultsView.render(model.getSearchResultsPage());

        // 4 - Render initial pagination buttons
        paginationView.render(model.state.search);

    } catch (error) {
        console.log(error);
    }
}


function controlPagination (goToPage) {
    // 3 - Render NEW search results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 4 - Render NEW pagination buttons
    paginationView.render(model.state.search);
}


function controlServings (newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
}

function init () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerPageButtons(controlPagination);
}
init();