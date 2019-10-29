
import Vue from 'vue';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Nav from '@/components/Nav.vue';
import Item from '@/components/Item.vue';

import Router from 'vue-router';
Vue.use(Router);

// @ts-ignore
export default new Router({

      // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
      scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
      },
      base: '/',
      routes: [
          {
              path: '/login',
              name: 'Login',
              component: Login
          },
          {
              path: '/',
              name: 'Nav',
              component: Nav,
              redirect: '/Home',
              children: [
                {path: '/Home', component: Home}
              ]
          },
      ],
})
