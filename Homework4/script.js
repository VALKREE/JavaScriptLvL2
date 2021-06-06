const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class BucketItem {}

class BucketList {}

class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }
  render() {
    return `<div class="goods-item" itemId=${this.id}><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }
 
  /*async fetchGoods() {
    const responce = await fetch(`${API_URL}/catalogData.json`);
    if (responce.ok) {
      const catalogItems = await responce.json();
      this.goods = catalogItems;
      this.filteredGoods = catalogItems
    } else {
      alert("Ошибка при соединении с сервером");
    }
  }*/

  filterGoods(value) {
    const regExp = new RegExp(value, 'i')
    this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name))
    this.render()
  }


  render() {
    let listHtml = "";
    this.filteredGoods.forEach((good) => {
      const goodItem = new GoodsItem(
        good.product_name,
        good.price,
        good.id_product
      );
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
}

class BusketItems {

}

class HomeWork4{
  constructor(){

  }
  task1(){
    document.querySelector('.homework4-1').innerHTML = document.querySelector('.homework4-1').innerHTML.replace(/'/gmi, '"');
  }
  task2(){
    document.querySelector('.homework4-2').innerHTML = document.querySelector('.homework4-2').innerHTML.replace(/\B'\B/gmi, '"');
  }
  task3(){
    let str = '';
    let submitBtn = document.querySelector('.form__button');
    let nameRegExp = /[a-zA-Zа-яА-Я]{3,25}/gmi;
    let phoneRegExp1 = /[+]\d{11}/gmi;
    let phoneRegExp2 = /\d{11}/gmi;
    let emailRegExp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    let textRegExp = /[a-zA-Zа-яА-Я0-9_+-=*/!.,?:%"'()]{3,300}/gmi;
    let inputList = document.querySelectorAll('.form__input');
    submitBtn.addEventListener('click', () => {
      inputList.forEach((item) => {
        if(item.id === 'Name'){
          if(nameRegExp.test(item.value) === true){
            console.log(item.value);
          }else{
            item.style.backgroundColor = 'pink';
            item.style.borderColor = 'red'; 
            alert("Введи имя правильно! Можно использовать либо буквы от а-я, либо буквы a-z от 3 до 25 символов.");
          }
          
        }
        if(item.id === 'Phone'){
          if(phoneRegExp1.test(item.value) === true || phoneRegExp2.test(item.value) === true){
            console.log(item.value);
          }else{
            item.style.backgroundColor = 'pink';
            item.style.borderColor = 'red'; 
            alert("Введи телефон правильно! Можно использовать только + и цифры от 0-9");
          }
        }
        if(item.id === 'Email'){
          if(emailRegExp.test(item.value)  === true){
            console.log(item.value);
          }else{
            item.style.backgroundColor = 'pink';
            item.style.borderColor = 'red'; 
            alert("Введи email правильно! Можно использовать буквы от a-z, цифра 0-9, _ и -");
          }
        }
      });
      let txtarea = document.querySelector('.form__textarea');
      if(txtarea.id  === 'Textarea'){
        if(textRegExp.test(txtarea.value)  === true){
          console.log(txtarea.value);
        }else{
          txtarea.style.backgroundColor = 'pink';
          txtarea.style.borderColor = 'red'; 
          alert("Введи сообщение правильно! Можно использовать цифры и буквы, а также сиволы: _+-=*/!.,?:%"'(). миниальное сообщение от 3-х сиволов до 300-та символов.");
        }
      }
    })
  }
}

const init = async () => {
  const list = new GoodsList();
  const busket = new BusketItems();
  //await list.fetchGoods();

  list.render();


  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.goods-search');

  searchButton.addEventListener('click', () => {
    list.filterGoods(searchInput.value);
  });

  const homeWork4 = new HomeWork4();
  homeWork4.task1();
  homeWork4.task2();
  homeWork4.task3();
};

window.onload = init;

// const init = () => {
//   setTimeout(() => {
//     console.log('Hi')
//   }, 5000)
// setInterval(() => {
//   console.log("Назойливый popup");
// }, 2000);
// };

// window.onload = init;