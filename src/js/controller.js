// Internal imports
import 'core-js/stable';    // Added to Polyfill
import 'regenerator-runtime/runtime.js';    // Added to Polyfill

// External imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';

// const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//     return new Promise(function (_, reject) {
//         setTimeout(function () {
//             reject(new Error(`Request took too long! Timeout after ${s} second`));
//         }, s * 1000);
//     });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipes () {
    try {
        const recipeID = window.location.hash.slice(1);
        if (!recipeID) return;

        // Render spinner
        recipeView.renderSpinner();
        // Loading recipe
        await model.loadRecipe(recipeID);
        // Render recipe
        recipeView.render(model.state.recipe)

    } catch (error) {
        alert(error);
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
