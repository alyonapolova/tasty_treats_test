import axios from 'axios';
import { axiosRecipes } from './axiosFilters';
import { axiosCard } from './axiosCard';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const categoriesRef = 'categories';
const areaRef = 'areas';
const ingredientsRef = 'ingredients';

const refs = {
  categoriesEl: document.querySelector('.categories-list'),
  inputEl: document.querySelector('.input-filter'),
  timeEl: document.querySelector('.time-select'),
  areaEl: document.querySelector('.area-select'),
  ingredientsEl: document.querySelector('.ingredients-select'),
  btnAllCategoriesEl: document.querySelector('.btn-categories'),
  resetFilter: document.querySelector('.reset-filter'),
};

const axiosRecipesInstance = new axiosRecipes();
// Додаємо option

axiosRecipesInstance.getFilteredData(categoriesRef).then(categories => {
  //console.log('category', categories);
  categories.forEach(category => {
    const liEl = document.createElement('li');
    liEl.textContent = category.name;
    //console.log(category.name);
    liEl.setAttribute('value', category.name);
    liEl.classList.add('category-item');
    //console.log(category._id);
    refs.categoriesEl.append(liEl);
  });
});

axiosRecipesInstance.getFilteredData(areaRef).then(areas => {
  //console.log('areas', areas);
  areas.forEach(area => {
    const optionEl = document.createElement('option');
    optionEl.id = area._id;
    optionEl.value = area.name;
    optionEl.textContent = area.name;
    refs.areaEl.appendChild(optionEl);
  });
});

axiosRecipesInstance.getFilteredData(ingredientsRef).then(ingredients =>
  ingredients.forEach(ingredient => {
    const optionEl = document.createElement('option');
    optionEl.value = ingredient._id;
    optionEl.id = ingredient._id;
    optionEl.textContent = ingredient.name;
    refs.ingredientsEl.appendChild(optionEl);
  })
);

function selectTime() {
  for (let i = 5; i <= 120; i += 5) {
    const optionEl = document.createElement('option');
    optionEl.textContent = [i];
    optionEl.value = [i];
    refs.timeEl.appendChild(optionEl);
  }
}

selectTime();

//Отримуємо обрані значення
let selectedCategoryId;
let selectedAreaId;
let selectedIngredientsId;
let selectedTimeId;
let inputValue;

refs.categoriesEl.addEventListener('click', handleCategory);

function handleCategory(e) {
  if (e.target.classList.contains('category-item')) {
    selectedCategoryId = e.target.getAttribute('value');
    axiosCardInstance.category = selectedCategoryId;

    console.log(selectedCategoryId);
    axiosCardInstance.getCardData().then(data => {
      console.log('це рецепти', data);
    });
  }
}

refs.inputEl.addEventListener('input', _.debounce(handleInputEl, 300));

function handleInputEl(e) {
  inputValue = e.target.value;
  axiosCardInstance.title = inputValue;
  console.log(inputValue);
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
  });
}

refs.areaEl.addEventListener('change', handleArea);

function handleArea(e) {
  selectedAreaId = e.target.value;
  axiosCardInstance.area = selectedAreaId;
  console.log('areaId:', selectedAreaId);
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
  });
}

refs.timeEl.addEventListener('change', handleTime);

function handleTime(e) {
  selectedTimeId = e.target.value;
  axiosCardInstance.time = selectedTimeId;
  console.log('timeId:', selectedTimeId);
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
  });
}

refs.ingredientsEl.addEventListener('change', handleIngredients);

function handleIngredients(e) {
  selectedIngredientsId = e.target.value;
  console.log(e.target.value);
  axiosCardInstance.ingredients = selectedIngredientsId;
  console.log('ingredientsId:', selectedIngredientsId);
  axiosCardInstance.getCardData().then(data => {
    console.log('це рецепти', data);
  });
}

//Вибір рецепту по фільтрам
const axiosCardInstance = new axiosCard();
//console.log(axiosCardInstance);

axiosCardInstance.category = selectedCategoryId;
axiosCardInstance.page = 1;
axiosCardInstance.time = selectedTimeId;
axiosCardInstance.area = selectedAreaId;
axiosCardInstance.ingredients = selectedIngredientsId;
axiosCardInstance.title = inputValue;

axiosCardInstance.getCardData().then(data => {
  console.log('Обрані рецепти', data);
});

//Скинути категорії
refs.btnAllCategoriesEl.addEventListener('click', displayAllCategories);

function displayAllCategories(e) {
  console.log(e.target);
  axiosCardInstance.category = '';
  axiosCardInstance.time = selectedTimeId;
  axiosCardInstance.area = selectedAreaId;
  axiosCardInstance.ingredients = selectedIngredientsId;
  axiosCardInstance.title = inputValue;
  console.log(axiosCardInstance);
}

//Cкинути фільтри
refs.resetFilter.addEventListener('click', resetAllFilters);

function resetAllFilters() {
  axiosCardInstance.category = selectedCategoryId;
  axiosCardInstance.area = '';
  axiosCardInstance.time = '';
  axiosCardInstance.ingredients = '';
  axiosCardInstance.title = '';
  console.log(axiosCardInstance);
}
