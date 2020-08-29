import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import './assets/css/main.css'
App.mpType = 'app'

// api请求网址
Vue.prototype.ApiUrl="http://1x4849h005.iok.la:8899/"


const app = new Vue({
    ...App
})
app.$mount()
