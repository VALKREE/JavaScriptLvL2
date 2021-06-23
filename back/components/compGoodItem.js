const compGoodItem = () => {
	Vue.component('goods-item', {
	  props: ['good'],
	  methods: {
	    async cartAddItem() {
	      const response = await fetch(`${API_URL}/cartAddItem`, {
	        method: 'POST', 
	        mode: 'cors',
	        headers: {
	          'Content-Type': 'application/json;charset=utf-8'
	        },
	        body: JSON.stringify(this.good) 
	      });
	    },
	    async cartDeleteItem(){
	      const response = await fetch(`${API_URL}/cartDeleteItem`, {
	        method: 'POST', 
	        mode: 'cors',
	        headers: {
	          'Content-Type': 'application/json;charset=utf-8'
	        },
	        body: JSON.stringify(this.good) 
	      });
	    }
	  },
	  template: `
	    <div class="goods-item">
	      <h3 class="goods-item-heading">{{ good.product_name }}</h3>
	      <p class="goods-item-desc">{{ good.price }}</p>
	      <button class="goods-item-button" @click=cartAddItem>Добавить в корзину</button>
	      <button class="goods-item-button" @click=cartDeleteItem>Удалить из корзины</button>
	    </div>
	  `
	});
}

export default {compGoodItem}