import axios from 'axios';
import { axiosRecipes } from './axiosCards';

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
};

const axiosRecipesInstance = new axiosRecipes();
// Додаємо option

axiosRecipesInstance.getFilteredData(categoriesRef).then(categories => {
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
    optionEl.value = ingredient.name;
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

refs.categoriesEl.addEventListener('click', handleCategory);

function handleCategory(e) {
  //console.log(e.target);
  if (e.target.classList.contains('category-item')) {
    const categoryId = e.target.getAttribute('data-id');

    console.log('categoryId:', categoryId);
  }
}

refs.inputEl.addEventListener('input', _.debounce(handleInputEl, 300));
//refs.inputEl.addEventListener('input', handleInputEl);
function handleInputEl(e) {
  const inputValue = e.target.value;
  array.push(inputValue);
  //console.log('inputValue:', inputValue);
}

refs.areaEl.addEventListener('change', handleArea);

function handleArea(e) {
  const selectedAreaId = e.target.value;

  console.log('areaId:', selectedAreaId);
}

refs.timeEl.addEventListener('change', handleTime);

function handleTime(e) {
  const selectedTimeId = e.target.value;

  console.log('timeId:', selectedTimeId);
}

refs.ingredientsEl.addEventListener('change', handleIngredients);

function handleIngredients(e) {
  const selectedIngredientsId = e.target.value;

  console.log('ingredientsId:', selectedIngredientsId);
}
