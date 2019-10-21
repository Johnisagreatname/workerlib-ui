
import Vue from 'vue';
import Home from '@/components/Home.vue';

import Router from 'vue-router';
Vue.use(Router);

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
          path: '/',
          name: 'Home',
          component: Home
        }
      ]
})
