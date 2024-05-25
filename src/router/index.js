import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    children: [
      {
        path: 'bar',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        // a meta field
        // meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/about1',
    name: 'about1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About1View.vue'),
    beforeEnter: (to, from, next) => {
      console.log("beforeEnter (to, from, next) :", to, from, next);
      next()
    },
    beforeRouteEnter(to, from, next) {
      console.log("beforeRouteEnter (to, from, next) :", to, from, next);
      // called before the route that renders this component is confirmed.
      // does NOT have access to `this` component instance,
      // because it has not been created yet when this guard is called!
      next()
    },
    beforeRouteUpdate(to, from, next) {
      console.log("beforeRouteUpdate (to, from, next) :", to, from, next);
      // called when the route that renders this component has changed.
      // This component being reused (by using an explicit `key`) in the new route or not doesn't change anything.
      // For example, for a route with dynamic params `/foo/:id`, when we
      // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
      // will be reused (unless you provided a `key` to `<router-view>`), and this hook will be called when that happens.
      // has access to `this` component instance.
      next()
    },
    beforeRouteLeave(to, from, next) {
      console.log("beforeRouteLeave (to, from, next) :", to, from, next);

      // called when the route that renders this component is about to
      // be navigated away from.
      // has access to `this` component instance.
      next()

    }

  },
  {
    path: '/popup1',
    name: 'popup1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Popup1View.vue')
  },
  // -----------------------------------------------
  { path: "*", component: () => import(/* webpackChunkName: "about" */ '../views/PageNotFound.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  console.group("router.beforeEach");
  console.log("to", to);
  console.log("from", from);
  console.log("next", next);
  console.groupEnd();
  next()
})
router.afterEach((to, from) => {
  console.group("router.afterEach");
  console.log("to", to);
  console.log("from", from);
  console.groupEnd();

})

export default router
