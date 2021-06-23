const compApp = () => {
  new Vue({
    el: '#app',
    data: {
      goods: [],
      filteredGoods: [],
      bucketGoods: [],
      searchLine: '',
      isVisibleCart: false,
    },
    methods: {
      async getProducts() {
        const responce = await fetch(`${API_URL}/catalogData`);
        if (responce.ok) {
          const catalogItems = await responce.json();
          this.goods = catalogItems;
          this.filteredGoods = catalogItems;
        } else {
          alert("Ошибка при соединении с сервером");
        }
      },
    },
    async mounted(){
      await this.getProducts();     
    }
  });
}

export default {
    compApp
}