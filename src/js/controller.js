// import { createRequire } from 'module';
// const require = createRequire(import.meta.url)
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime?/runtime';
import { loadSearchResults } from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView';
// import { fc } from 'fraction-calculator';
// console.log(model.makeRandomExamples(20));

// if (module.hot) {
//   module.hot.accept();
// }
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPerpage());

    // load Recipe
    await model.loadRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);
    recipeView.togglehidden();

    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const contolSearchExamples = function () {
  resultsView.renderExamples(model.makeRandomExamples(20));
  // console.log(model.makeRandomExamples(20).join(", "));
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPerpage());

    paginationView.render(model.state.search);
  } catch (err) {
    // recipeView.renderError();
    resultsView.renderError();
  }
};

const controlPagination = function (goto) {
  resultsView.render(model.getSearchResultsPerpage(goto));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or Remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

// const controlAddRecipe = async function (newRecipe) {
//   try {
//     // console.log(newRecipe);
//     await model.uploadRecipe(newRecipe);
//   } catch (err) {
//     console.error(err);
//     addRecipeView.renderError(err);
//   }
// };

const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerControlBookmarks(controlAddBookmark);
  searchView.addHandler(controlSearchResults);
  paginationView.addHandler(controlPagination);
  recipeView.addSearcExamples(contolSearchExamples);
  // addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
