import Vue from 'vue'
import App from './App.vue'

import router from './router'

//防止重复点击的全局指令
Vue.directive('preventReClick', {
  inserted: function (el, binding) {
      console.log(el,'el')
      el.addEventListener('click', () => {
          if (!el.disabled) {
              el.disabled = true
              setTimeout(() => {
                  el.disabled = false
              }, binding.value || 3000)
          }
      })
  }
});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
