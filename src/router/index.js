import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutView from "../views/LayoutView.vue"
import TableDemo from "../views/main/TableDemo"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "LayoutView",
    component: LayoutView,
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
        meta: {
          isLogin: false
        },
        children: [
          {
            path: "/params",
            name: "paramsview",
            component: () => import("../views/main/ParamsView.vue"),
            meta: {
              isLogin: false
            }
          },
          {
            path: "/table",
            name: "TableDemo",
            component: TableDemo,
            meta: {
              isLogin: false
            }
          },
        ]
      },

      {
        path: "tree",
        name: "TreeDemo",
        component: () => import("../views/main/TreeDemo.vue"),
        meta: {
          isLogin: true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/LoginView.vue")
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
