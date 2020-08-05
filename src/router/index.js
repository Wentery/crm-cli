import Vue from 'vue'
import Router from 'vue-router'
import Vuex from '../store/index'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/login',
      name: 'LoginView',
      component: () => import('@/views/login/LoginView.vue')
    }, {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      // redirect: '/staging',
      // children: [
      //   {
      //     path: '/staging',
      //     name: 'StagingView',
      //     meta: {
      //       name: '个人工作台'
      //     }
      //   }, 
      //   {
      //     path: '/push/statics',
      //     name: 'PushStatics',
      //     meta: {
      //       name: '任务列表'
      //     }
      //   }, {
      //     path: '/the/message',
      //     name: 'TheMessage',meta: {
      //       name: '运营任务'
      //     }
      //   }
      // ]
    }, {
      path: '/error/502',
      name: 'BadGateWay',
      component: () => import('@/views/error/BadGateWay.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // console.log(to, from)
//   let tabs = Vuex.getters.getTabs;
//   const { name, path, params, meta } = to;
//   // console.log(name, path, params, meta)
//   console.log(tabs)
//   if(path !== '/login' && path !== '/home') {
//     tabs.push({
//       path, params,
//       label: params.id ? meta.name + id : meta.name,
//       component: name,
//       query: {}
//     })
//   }
//   Vuex.commit('setTabs', tabs)
  
//   next();
// })

export default router;


