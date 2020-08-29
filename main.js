import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import './assets/css/main.css'
App.mpType = 'app'

// api请求网址
Vue.prototype.ApiUrl="https://gzmss.iok.la/"


const app = new Vue({
    ...App
})
app.$mount()
