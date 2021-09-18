//import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Cart = () => import('../views/cart/Cart');
const Profile = () => import('../views/profile/Profile');
const Detail = () => import('../views/detail/Detail');

// Vue.use(vueRouter);
//createApp(App).use(router)

const routes = [ 
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true //设置页面是否需要使用缓存
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      keepAlive: true
    }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  //去掉路径中间的#
  mode: 'history',
})

export default router