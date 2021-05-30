// ---------Lesson 1 begin---------
const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];
/*const goods = [
  { title: '', price: ''},
];*/
const renderGoodsItem = (title, price) => {
  /*if(title != "" && (price != NaN || price != undefined || price != "")){
    return `
    <div class="goods-item">
      <img src="./images/img.png" alt="картинка"></img>
      <h3>${title}</h3>
      <p>${price}</p>
      <button>Добавить</button>
    </div>`;
  }else{
    return;
  }*/
  title = title !== 'undefined' && title !==  '' ? title : 'нет наименования'; // значение по умолчанию для аргумента title функции
  price = price !== 'undefined' && price !== '' ? price : 0; // значение по умолчанию для аргумента price функции
  return (`
    <div class="goods-item">
      <img src="./images/img.png" alt="картинка"></img>
      <h3>${title}</h3>
      <p class="goods-price">${price}</p>
      <button>Добавить</button>
    </div>`);
}

const renderGoodsList = list => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));

  //   const goodsListDiv = document.querySelector('.goods-list')
  //   goodsListDiv.innerHTML = goodsList

  document.querySelector('.goods-list').insertAdjacentHTML('afterbegin', goodsList);

}

const init = () => {
  renderGoodsList(goods);
}
/*function deleteText(){
  document.querySelector('.goods-list').innerHTML = '';
} 
let btn = document.querySelector('.cart-button');
btn.addEventListener('click',function(){
  if(document.querySelector('.goods-list').children.length === 0){
    init();
    btn.style.backgroundColor = 'red';
  }else{
    deleteText()
    btn.style.backgroundColor = 'rgba(92,155,240,1)';
  }
});*/

// ---------Lesson 1 end---------

// ---------Lesson 2 begin---------
  /*1. Добавьте пустые классы для корзины товаров
   и элемента корзины товаров. Продумайте, какие методы понадобятся
    для работы с этими сущностями. */
class EmptyGoodsList{ // пустой класс корзины
  deleteGood(){} // удалить товар
}
class EmptyGoodsItem{ // пустой класс элемента корзины
  changeColor(){} // сменить цвет
  changeSize(){} // сменить размер
}
  /*2. Добавьте для GoodsList метод, 
  определяющий суммарную стоимость всех товаров.*/
class GoodsList {
  constructor() {
  }

  get summary() {
    let summary = []; 
    for(let i=0; i < goods.length; i++){
     summary.push(+(goods[i].price));
    }
    return summary.reduce((partial_sum, a) => partial_sum + a,0);
  }
}

const Summary = new GoodsList(0);

console.log(`Сумма всей корзины: ${Summary.summary}`);
  /*
  3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
  ### Маленький (50 рублей, 20 калорий).
  ### Большой (100 рублей, 40 калорий). 
  ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
  ### С сыром (+10 рублей, +20 калорий).
  ### С салатом (+20 рублей, +5 калорий).
  ### С картофелем (+15 рублей, +10 калорий). 
  ### Дополнительно гамбургер можно посыпать приправой 
  (+15 рублей, +0 калорий) и полить майонезом 
  (+20 рублей, +5 калорий). 
  ### 3Напишите программу, 
  рассчитывающую стоимость и калорийность гамбургера. 
  Можно использовать примерную архитектуру класса из методички, 
  но можно использовать и свою.
  */

const Size = [
  {size: 'little', price: 50, calories: 20},
  {size: 'big', price: 100, calories: 40},
]
//console.log(Size);
const Filling = [
  {filling: 'cheese', price: 10, calories: 20},
  {filling: 'salad', price: 5, calories: 5},
  {filling: 'potatoes', price: 15, calories: 10},
]
//console.log(Filling);
const Additionally = [
  {additionally: 'seasoning', price: 15, calories: 0},
  {additionally: 'mayonnaise', price: 20, calories: 5},
]
//console.log(Additionally);
class Burgers {
  constructor(Size, Filling, Аdditionally){
    this.Size = Size;
    this.Filling = Filling;
    this.Additionally = Additionally;
  }
  get program(){
    // переменные размера
    let sizeSize = '';
    let sizePrice = 0;
    let sizeCalories = 0;
    // переменные наполнения
    let fillingFilling = '';
    let fillingPrice = 0;
    let fillingCalories = 0;
    //переменные добавок
    let additionallyAdditionally = '';
    let additionallyPrice = 0;
    let additionallyCalories = 0;
    let burgerPriceSummary = []; // массив для цен
    let burgerCaloriesSummary = []; // массив для калорий
    let burgerFillingSummary = []; // массив для наименований размера, начинки и допов бургера
    // переменные для удобвства вставки в return, принимают сумму
    let burgerPrice = 0;
    let burgerFilling = '';
    let burgerCalories = 0;
    // Цикл для создания бургеров всех типов
    for(let i = 0; i < Size.length; i++){
      sizeSize = Size[i].size; // Размер бургера
      sizePrice = Size[i].price; // Цена за бургер(без всего)
      sizeCalories = Size[i].calories; // Калории (без всего)
      burgerPriceSummary.push(+(Size[i].price));
      burgerCaloriesSummary.push(+(Size[i].calories));
      burgerFillingSummary.push(Size[i].size);
      for(let i = 0; i < Filling.length; i++){
        fillingFilling = Filling[i].filling; // наполнение
        fillingPrice = Filling[i].price; // цена за наполнение
        fillingCalories= Filling[i].calories; // калории наполнения
        burgerPriceSummary.push(+(Filling[i].price));
        burgerCaloriesSummary.push(+(Filling[i].calories));
        burgerFillingSummary.push(Filling[i].filling);
      }
      for(let i = 0; i < Additionally.length; i++){
        additionallyAdditionally = Additionally[i].additionally;
        additionallyPrice = Additionally[i].price;
        additionallyCalories = Additionally[i].calories;
        burgerPriceSummary.push(+(Additionally[i].price));
        burgerCaloriesSummary.push(+(Additionally[i].calories));
        burgerFillingSummary.push(Additionally[i].additionally);
      }
      
      burgerPrice = burgerPriceSummary.reduce((partial_sum, a) => partial_sum + a,0);
      burgerFilling = burgerFillingSummary.reduce((partial_sum, a) => partial_sum + a,0);
      burgerCalories = burgerCaloriesSummary.reduce((partial_sum, a) => partial_sum + a,0);
    }

    return (`Размер бургера: ${sizeSize}, его начинка: ${burgerFilling}, его цена: ${burgerPrice}, его калории: ${burgerCalories}`);
  }
}
const burgers1 = new Burgers();
console.log(`Бургеры: ${burgers1.program}`);
/* 
TODO: программа работает, 
но нужно переосмыслить его функциональность, 
возможно нужно запихивать все 
в новый массив, где будет создаваться бургер, 
а так же возможно нужно добавить массив[0] = ничего
*/
window.onload = init;


// ---------Lesson 2 end---------


