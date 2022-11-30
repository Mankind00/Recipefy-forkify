import { async } from 'regenerator-runtime';
import { API_FETCH } from './config';
import { getJSON, sendJSON } from './helper';
import { RESULT_PER_PAGE } from './config';
import numericQuantity from 'numeric-quantity';
import { Fraction } from 'fractional';

// import { forEach } from 'core-js/core/array';
export const state = {
  recipe: {
    servings: 4,
  },
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULT_PER_PAGE,
    totalPages: 0,
  },
  bookmarks: [],
};

export const searchExamples = [
  'carrot',
  'broccoli',
  'asparagus',
  'cauliflower',
  'corn',
  'cucumber',
  'green pepper',
  'lettuce',
  'mushrooms',
  'onion',
  'potato',
  'pumpkin',
  'red pepper',
  'tomato',
  'beetroot',
  'brussel sprouts',
  'peas',
  'zucchini',
  'radish',
  'sweet potato',
  'artichoke',
  'leek',
  'cabbage',
  'celery',
  'chili',
  'garlic',
  'basil',
  'coriander',
  'parsley',
  'dill',
  'rosemary',
  'oregano',
  'cinnamon',
  'saffron',
  'green bean',
  'bean',
  'chickpea',
  'lentil',
  'apple',
  'apricot',
  'avocado',
  'banana',
  'blackberry',
  'blackcurrant',
  'blueberry',
  'boysenberry',
  'cherry',
  'coconut',
  'fig',
  'grape',
  'grapefruit',
  'kiwifruit',
  'lemon',
  'lime',
  'lychee',
  'mandarin',
  'mango',
  'melon',
  'nectarine',
  'orange',
  'papaya',
  'passion fruit',
  'peach',
  'pear',
  'pineapple',
  'plum',
  'pomegranate',
  'quince',
  'raspberry',
  'strawberry',
  'watermelon',
  'salad',
  'pizza',
  'pasta',
  'popcorn',
  'lobster',
  'steak',
  'bbq',
  'pudding',
  'hamburger',
  'pie',
  'cake',
  'sausage',
  'tacos',
  'kebab',
  'poutine',
  'seafood',
  'chips',
  'fries',
  'masala',
  'paella',
  'som tam',
  'chicken',
  'toast',
  'marzipan',
  'tofu',
  'ketchup',
  'hummus',
  'chili',
  'maple syrup',
  'parma ham',
  'fajitas',
  'champ',
  'lasagna',
  'poke',
  'chocolate',
  'croissant',
  'arepas',
  'bunny chow',
  'pierogi',
  'donuts',
  'rendang',
  'sushi',
  'ice cream',
  'duck',
  'curry',
  'beef',
  'goat',
  'lamb',
  'turkey',
  'pork',
  'fish',
  'crab',
  'bacon',
  'ham',
  'pepperoni',
  'salami',
  'ribs',
];

export const makeRandomExamples = function (x) {
  const shuffledArray = searchExamples.sort(() => 0.5 - Math.random());
  const results = shuffledArray.slice(0, x);

  return results;
};

const quantityUpdate = function (servings) {
  // console.log(numericQuantity('1 1/2'));
  customIngObj = {};
  state.recipe.myIngredients = [];

  state.recipe.ingredients.forEach(ing => {
    ing.split(' ').forEach((item, i, arr) => {
      let newQuantity;
      let processedNum;
      let stringLength;
      if (
        i === 0 &&
        !item.includes('/') &&
        !arr.at(1).includes('/') &&
        /^[\d\/]+$/.test(item)
      ) {
        processedNum = numericQuantity(`${item}`);
        newQuantity = (processedNum * servings) / state.recipe.servings;

        state.recipe.myIngredients.push({
          quantity: newQuantity,
          description: ing.slice(arr.at(0).length),
        });
        // console.log(state.recipe.myIngredients);
      }
      if (i === 0 && item.includes('/')) {
        // let prevNum = i - 1;
        processedNum = numericQuantity(`${item}`);

        newQuantity = (processedNum * servings) / state.recipe.servings;

        state.recipe.myIngredients.push({
          quantity: newQuantity,
          description: ing.slice(arr.at(0).length),
        });

        return;
      }

      if (i === 1 && item.includes('/')) {
        processedNum = numericQuantity(`${arr.at(0)} ${item}`);

        newQuantity = (processedNum * servings) / state.recipe.servings;

        stringLength = arr.at(0).length + arr.at(1).length + 1;
        state.recipe.myIngredients.push({
          quantity: newQuantity,
          description: ing.slice(stringLength),
        });
      }
      if (i === 0 && !item.includes('/') && /^[a-zA-Z]+$/.test(arr.at(0))) {
        state.recipe.myIngredients.push({ quantity: '', description: ing });
      }
    });
  });
  // state.recipe.servings = servings;
  // console.log(state.recipe.servings);
};

export const loadRecipe = async function (id) {
  try {
    // if (!res.ok) throw new Error(`${data.error} ${res.status}`);
    const data = await getJSON(`${API_FETCH}get?rId=${id}`);
    // console.log(data.recipe.servings);
    // console.log(data);

    let { recipe } = data;
    // state.ingredients.quantity;
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      myIngredients: recipe.myIngredients,
    };
    // state.recipe.myIngredients = [];
    if (state.bookmarks.some(bookmark => bookmark.id == id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    state.recipe.servings = 4;
    quantityUpdate(state.recipe.servings);
    // console.log(state.recipe);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_FETCH}search?q=${query}`);
    // console.log(data);

    state.search.results = data.recipes;
    // console.log(state.recipe);

    state.search.results.map(rec => {
      return {
        id: rec.recipe_id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

// loadSearchResults('pizza');
export const getSearchResultsPerpage = function (page = state.search.page) {
  state.search.page = page;
  const starter = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  state.search.totalPages = Math.ceil(
    state.search.results.length / state.search.resultsPerPage
  );


  return state.search.results.slice(starter, end);
};

export const updateServings = function (newServings) {
  // console.log(numericQuantity('1 1/2'));
  customIngObj = {};
  // console.log(state.recipe.myIngredients);

  state.recipe.myIngredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();
};

export const deleteBookmark = function (id) {
  // Deletes bookmark

  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Marks current recipe as NOT BOOKMARKED

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};

const init = function () {
  const storage = localStorage.getItem('bookmark');

  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmark');
};

// clearBookmarks()

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');

        if (ingArr.length !== 3) {
          throw new Error(
            'Wrong Ingredients format!, Please use the correct format :)'
          );
        }

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    sendJSON(API_FETCH);
  } catch (err) {
    throw err;
  }
  // console.log(Object.entries(newRecipe));
};
