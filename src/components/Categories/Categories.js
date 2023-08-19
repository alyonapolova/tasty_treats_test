import axios from 'axios';
import debounce from 'lodash/debounce';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
//https://tasty-treats-backend.p.goit.global/api/areas;
// https://tasty-treats-backend.p.goit.global/api/categories;
// https://tasty-treats-backend.p.goit.global/api/recipes/

const categories = 'categories';
const time = 'recipes'; //треба взяти тут time
const area = 'areas';
const ingredients = 'ingredients';

const refs = {
  categoriesEl: document.querySelector('.categories-list'),
  inputEl: document.querySelector('.input-filter'),
  timeEl: document.querySelector('.time-select'),
  areaEl: document.querySelector('.area-select'),
  ingredientsEl: document.querySelector('.ingredients-select'),
};

function filtersData(filters) {
  return axios
    .get(`${BASE_URL}${filters}`)
    .then(response => {
      //console.log(`${filters}`, response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
// filtersData(categories);
// filtersData(time);
// filtersData(area);
// filtersData(ingredients);

filtersData(categories).then(categories => {
  //console.log('category', categories);
  categories.forEach(category => {
    const liEl = document.createElement('li');
    liEl.textContent = category.name;
    //console.log(category.name);
    liEl.setAttribute('data-id', category._id);
    liEl.classList.add('category-item');
    //console.log(category._id);
    refs.categoriesEl.append(liEl);
  });
});

filtersData(area).then(areas => {
  //console.log('areas', areas);
  areas.forEach(area => {
    const optionEl = document.createElement('option');
    optionEl.id = area._id;
    optionEl.value = area.name;
    optionEl.textContent = area.name;
    refs.areaEl.appendChild(optionEl);
  });
});

filtersData(ingredients).then(ingredients =>
  ingredients.forEach(ingredient => {
    const optionEl = document.createElement('option');
    optionEl.value = ingredient.name;
    optionEl.id = ingredient._id;
    optionEl.textContent = ingredient.name;
    refs.ingredientsEl.appendChild(optionEl);
  })
);

let allRecipes = [];
async function processAllPages(recipes) {
  const response = await filtersData('recipes?page=1');
  const totalPages = response.totalPages;

  // console.log(totalPages);

  allRecipes.push(...response.results);

  for (let page = 2; page <= totalPages; page += 1) {
    const pageResponse = await filtersData(`recipes?page=${page}`);
    const recipes = pageResponse.results;

    allRecipes.push(...recipes);
    //console.log(pageResponse);
  }

  return allRecipes;
}

//console.log(allRecipes);

processAllPages(time)
  .then(allRecipes => {
    allRecipes.forEach(recipe => {
      //console.log(recipe);
      const optionEl = document.createElement('option');
      optionEl.value = recipe.time;
      optionEl.id = recipe._id;
      optionEl.textContent = recipe.time + 'min';
      refs.timeEl.appendChild(optionEl);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

//Обєкт в який будуть додаватись значення

const params = {
  // page: 1,
  // limit: 6,
  categoryId: null,
  areaId: null,
  timeId: null,
  ingredientsId: null,
};

//Отримуємо обрані значення

refs.categoriesEl.addEventListener('click', handleCategory);

function handleCategory(e) {
  //console.log(e.target);
  if (e.target.classList.contains('category-item')) {
    const categoryId = e.target.getAttribute('data-id');

    params.categoryId = categoryId;
    console.log('categoryId:', categoryId);
  }
}

refs.inputEl.addEventListener('input', _.debounce(handleInputEl, 300));

function handleInputEl(e) {
  const inputValue = e.target.value;

  console.log('inputValue:', inputValue);
}

refs.areaEl.addEventListener('change', handleArea);

function handleArea(e) {
  const selectedAreaId = e.target.value;

  params.areaId = selectedAreaId;
  console.log('areaId:', selectedAreaId);
}

refs.timeEl.addEventListener('change', handleTime);

function handleTime(e) {
  const selectedTimeId = e.target.value;

  params.timeId = selectedTimeId;
  console.log('timeId:', selectedTimeId);
}

refs.ingredientsEl.addEventListener('change', handleIngredients);

function handleIngredients(e) {
  const selectedIngredientsId = e.target.value;

  params.ingredientsId = selectedIngredientsId;
  console.log('ingredientsId:', selectedIngredientsId);
}

console.log('params:', params);
