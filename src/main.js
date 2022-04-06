import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//三级联动菜单
import TypeNav from '@/components/TypeNav'
//引入vuex
import store from '@/store'
//引入mock
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//引入轮播图组件
import Carousel from '@/components/Carousel'
//引入分页组件
import Pagination from '@/components/Pagnation'
//引入懒加载插件
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
//全局组件，第一个参数是全局组件的名字，第二个是组件名
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//导入图片
import photo from '@/assets/111.jpg'
//引入表单验证
import "@/plugins/validate" 
//引入API借口
import * as API from '@/api';
//使用插件
Vue.use(VueLazyLoad,{
  //懒加载默认的图片
  loading: photo
})
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
