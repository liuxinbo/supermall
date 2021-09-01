//import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Cart = () => import('../views/cart/Cart');
const Profile = () => import('../views/profile/Profile');

// Vue.use(vueRouter);
//createApp(App).use(router)

const routes = [ 
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  //去掉路径中间的#
  mode: 'history',
})

export default router