import Vue from 'vue'
import VueRouter from 'vue-router'

// 自己跳自己
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

  const routes = [
    // 主页contact 
  {
    path: '/',
    name: 'index',
    component: () => import( '../views/index.vue')
  },
  // 促销
  {
    path: '/promotion',
    name: 'promotion',
    component: () => import( '../views/promotion.vue')
  },
  // 分类
  {
    path: '/classify',
    name: 'classify',
    component: () => import( '../views/classify.vue')
  },
  // 联系我们
  {
    path: '/contact',
    name: 'contact',
    component: () => import( '../views/contact.vue')
  },
  // 商品详情
  {
    path: '/particulars',
    name: 'particulars',
    component: () => import( '../views/particulars.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
