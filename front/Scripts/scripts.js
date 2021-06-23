// lesson7 - 01h:00min:00sec

const API_URL =
  "http://localhost:3000";


// --- HEADER BEGIN ---
Vue.component('search', {
	props: ['search'],
	template: `
		<div class='header__search'>
			<input type="text" class="header__search-input">
			<svg class="header__search-magnifer" enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
		</div>
	`
});
Vue.component('basket', {
  props: ['basket'],
  template: `
    <div class="header__basket">
      <svg class="header__basket-basket" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/>
        <g data-name="1" id="_1">
          <path d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z"/>
          <path d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z"/>
          <path d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z"/>
          <path d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z"/>
        </g>
      </svg>
      <div class="header__basket-badge">
        <p class="header__basket-count"></p>
      </div>
    </div>
  `
});
// --- HEADER END ---
// --- MAIN BEGIN ---
Vue.component('goods-list', {
	props: ['goods'],
	template: `
		<div class="goods-list">
	      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
	  `
});
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
// --- MAIN END ---
// --- FOOTER BEGIN ---
	
// --- FOOTER END ---


const app = new Vue({
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

//vanilla JS begin
function error_timeout(){
  if(document.querySelector('.errors_api') !== null){
    let errExit = document.querySelector('.errorapi__exit');
    errExit.addEventListener('click', () => {
      document.querySelector('.errors_api').style.display="none";
    })
  }
}
setTimeout(error_timeout, 0); //EventLoop

function basketTimeout(){
  let basketBadge = document.querySelector('.header__basket-badge');
  let basketCount = document.querySelector('.header__basket-count');
  if(basketCount.innerText !== '0' && basketCount.innerText > '0'){
    basketBadge.style.display="flex"
  }
}
setTimeout(basketTimeout, 0); //EventLoop
//vanilla JS end
Vue.component('errorapi', {
  props: ['errorapi'],
  template: `
    <div class="errors_api" style="display:flex;">
      <div class="errorapi__exit">X</div>
      <h3 class="errorapi__heading">Ошибка запроса сервера.</h3>
    </div>
  `
});

