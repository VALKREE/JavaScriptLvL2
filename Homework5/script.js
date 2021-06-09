const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    bucketGoods: [],
    searchLine: '',
    isVisibleCart: false,
  },

  methods:{
    async getProducts() {
      const response = await fetch(`${API_URL}/catalogData.json`);
      if (response.ok) {
        const catalogItems = await response.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        alert("Ошибка при соединении с сервером");
      }
    },
    filterGoods(){
      const regExp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));
      function timeout1(){
        if(document.querySelector('.goods-list').children.length === 0){
          document.querySelector('.goods-list').insertAdjacentHTML('afterbegin', '<p class="noData">Нет данных</p>');
        }else{ //нужен как заглушка, иначе спамин ошибку в консоль
          if(document.querySelector('.noData') !== null){
            document.querySelector('.noData').remove();
          }
        }
      }
      setTimeout(timeout1, 0);
      /*function timeout1(){
        if(document.querySelector('.goods-list').children.length === 0){
          console.log([document.querySelector('.goods-list')]);
          document.querySelector('.goods-list').insertAdjacentHTML('afterbegin', '<p>Нет данных</p>')
        }else{
          document.querySelector('.goods-list').children[0].remove();
        }
      }
      setTimeout(timeout1, 0);*/
    },
    addToBucket(){ // не смог найти, как получить good.name\price
      this.bucketGoods.push(event.target.parentNode);
    },
    removeToBucket(){
      event.target.parentNode.remove();
    },
  },

  async mounted(){
    await this.getProducts();     
  }
});