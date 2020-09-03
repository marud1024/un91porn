import Vue from 'vue'
import App from './App'
import 'weapp-cookie'

Vue.config.productionTip = false

Vue.prototype.$host = 'https://www.marud.cn/';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
