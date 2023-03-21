import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main'
import bread from '../components/menu/breadList.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: [main,bread],
      meta:{
        name:['导航栏','test1','test2'],
        path:['/','/Lay','']
      },
    }
  ]
})