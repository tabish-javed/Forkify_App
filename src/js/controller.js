import 'dotenv/config';
import 'core-js/stable';    // Added to Polyfill
import 'regenerator-runtime/runtime.js';    // Added to Polyfill

import { renderRecipe, renderSpinner } from './renderer.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function showRecipe () {
    renderSpinner(recipeContainer);

    try {
        const recipeID = window.location.hash.slice(1)
        if (!recipeID) return

        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}`);
        const data = await response.json();

        if (!response.ok) throw new Error(`${data.message} (${response.status})`);

        let { recipe } = data.data;

        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url,
            imageURL: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };

        const markup = renderRecipe(recipe);

        recipeContainer.innerHTML = '';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);

    } catch (error) {
        alert(error);
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, showRecipe))
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
