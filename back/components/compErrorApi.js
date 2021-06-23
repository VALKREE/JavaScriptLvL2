const compErrorApi = () => {
	Vue.component('errorapi', {
	  props: ['errorapi'],
	  template: `
	    <div class="errors_api" style="display:flex;">
	      <div class="errorapi__exit">X</div>
	      <h3 class="errorapi__heading">Ошибка запроса сервера.</h3>
	    </div>
	  `
	});
}

export default {compErrorApi}