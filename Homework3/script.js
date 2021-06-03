const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class BucketItem {
  constructor(itemName, itemPrice, itemId) {
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.itemId = itemId;

  }
  render() {
    return `
    <div class="bucket-item" itemId=${this.itemId}>
      <h3>${this.itemName}</h3>
      <p>${this.itemPrice}</p>
      <button class="bucket-item-delete">Х</button>
    </div>
    `;
  }

}


class BucketList {
  constructor(){
    this.goods = [];
  }
  addBucketHtml(){
    let header = document.querySelector('.header');
    header.insertAdjacentHTML('beforeend', `
    <div class="header-container">
      <div class="bucket-list">

      </div>
    </div>
    `);
  }
  initDelete(){
    const bucketList = new BucketList();
    bucketList.deleteBtn();
  }
  deleteBtn(){
    let btn = document.querySelector('.bucket-item-delete');
    
    btn.addEventListener('click', (e) => {
      e.target.parentNode.remove();
    });
  }
  render(itemId, itemName, itemPrice){
    let bucketHtml = "";
    const bucketItem = new BucketItem(
      this.title = itemName,
      this.price = itemPrice,
      this.id = itemId,
    );
    bucketHtml += bucketItem.render(itemId, itemName, itemPrice);
    document.querySelector(".bucket-list").insertAdjacentHTML('beforeend', bucketHtml);
    const bucketList = new BucketList();
    bucketList.initDelete();
  }

}

class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }
  render() {
    return `
    <div class="goods-item" itemId=${this.id}>
      <h3 class="good-name">${this.title}</h3>
      <p class="good-price">${this.price}</p>
      <button class="good-button">В корзину</button>
    </div>
    `;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  async fetchGoods() {
    const responce = await fetch(`${API_URL}/catalogData.json`);
    if (responce.ok) {
      const catalogItems = await responce.json();
      this.goods = catalogItems;
    } else {
      alert("Ошибка при соединении с сервером");
    }
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(
        good.product_name,
        good.price,
        good.id_product
      );
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  addToBucket(){
    const bucketList = new BucketList();
    let goods = document.querySelectorAll('.goods-list');
    goods.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if(e.target.className === 'good-button'){
          let itemId = e.target.parentNode.getAttribute('itemId');
          let itemName = e.target.parentNode.children[0].innerHTML;
          let itemPrice = e.target.parentNode.children[1].innerHTML;
          bucketList.render(itemId, itemName, itemPrice);
        }
      })
    });
  }
}

const init = async () => {
  const bucketList = new BucketList();
  bucketList.addBucketHtml();
  const list = new GoodsList();
  await list.fetchGoods();
  list.render();
  list.addToBucket();

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