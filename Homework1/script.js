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
      <p>${price}</p>
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
function deleteText(){
  document.querySelector('.goods-list').innerHTML = '';
} 
//window.onload = init;
let btn = document.querySelector('.cart-button');
btn.addEventListener('click',function(){
  if(document.querySelector('.goods-list').children.length === 0){
    init();
    btn.style.backgroundColor = 'red';
  }else{
    deleteText()
    btn.style.backgroundColor = 'rgba(92,155,240,1)';
  }
});


