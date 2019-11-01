import Vue from 'vue';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Nav from '@/components/Nav.vue';
import Project from '@/components/Project.vue';
import Worker from '@/components/Worker.vue';
import Comments from '@/components/Comments.vue';
import Contributive from '@/components/Contributive.vue';
import Router from 'vue-router';
Vue.use(Router);
// @ts-ignore
export default new Router({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: function (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        else {
            return { x: 0, y: 0 };
        }
    },
    base: '/',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'nav',
            component: Nav,
            redirect: '/home',
            children: [
                { path: '/home', component: Home },
                { path: '/project', component: Project },
                { path: '/worker', component: Worker },
                { path: '/comments', component: Comments },
                { path: '/contributive', component: Contributive }
            ]
        },
    ],
});
//# sourceMappingURL=index.js.map