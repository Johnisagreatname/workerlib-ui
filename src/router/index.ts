
import Vue from 'vue';
// import Home from '@/components/Home.vue';
// import Login from '@/components/Login.vue';
// import Nav from '@/components/Nav.vue';
// import Project from '@/components/Project.vue';
// import Worker from '@/components/Worker.vue';
// import Comments from '@/components/Comments.vue';
// import Contributive from '@/components/Contributive.vue';
// import TurnWork from '@/components/turnWork.vue';
// import ExaminationPaper from '@/components/examinationPaper.vue';
// import Courseware from '@/components/courseware.vue';
// import Cultivate from '@/components/cultivate.vue';
// import OfflineCourseware from '@/components/offlineCourseware.vue';
// import OfflineCultivate from '@/components/offlineCultivate.vue';
// import CheckEvaluate from '@/components/checkEvaluate.vue';
// import Lecturer from '@/components/lecturer.vue';
// import Unit from '@/components/unit.vue';
import Router from 'vue-router';
Vue.use(Router);


const Home = () => require('@/components/Home.vue');
const Login = () => require('@/components/Login.vue');
const Nav = () => require('@/components/Nav.vue');
const Project = () => require('@/components/Project.vue');
const Worker = () => require('@/components/Worker.vue');
const Comments = () => require('@/components/Comments.vue');
const Contributive = () => require('@/components/Contributive.vue');
const TurnWork = () => require('@/components/turnWork.vue');
const ExaminationPaper = () => require('@/components/examinationPaper.vue');
const Courseware = () => require('@/components/courseware.vue');
const Cultivate = () => require('@/components/cultivate.vue');
const OfflineCourseware = () => require('@/components/offlineCourseware.vue');
const OfflineCultivate = () => require('@/components/offlineCultivate.vue');
const CheckEvaluate = () => require('@/components/checkEvaluate.vue');
const Lecturer = () => require('@/components/lecturer.vue');
const Unit = () => require('@/components/unit.vue');
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
              name: 'login',
              component: async () : Promise<any> => {
                return await Login()
              }
          },
          {
              path: '/',
              name: 'nav',
              component: async () : Promise<any> => {
                return await Nav()
              },
              redirect: '/home',
              children: [
                {path: '/home', component: async () : Promise<any> => {
                  return await Home()
                }},
                {path: '/project', component: async () : Promise<any> => {
                  return await Project()
                }},
                {path: '/worker', component: async () : Promise<any> => {
                  return await Worker()
                }},
                {path: '/comments', component: async () : Promise<any> => {
                  return await Comments()
                }},
                {path: '/contributive', component: async () : Promise<any> => {
                  return await Contributive()
                }},
                {path: '/turnWork', component: async () : Promise<any> => {
                  return await TurnWork()
                }},
                {path: '/examinationPaper', component: async () : Promise<any> => {
                  return await ExaminationPaper()
                }},
                {path: '/courseWare', component: async () : Promise<any> => {
                  return await Courseware()
                }},
                {path: '/cultivate', component: async () : Promise<any> => {
                  return await Cultivate()
                }},
                {path: '/offlineCourseWare', component: async () : Promise<any> => {
                  return await OfflineCourseware()
                }},
                {path: '/offlineCultivate', component: async () : Promise<any> => {
                  return await OfflineCultivate()
                }},
                {path: '/checkEvaluate', component: async () : Promise<any> => {
                  return await CheckEvaluate()
                }},
                {path: '/lecturer', component: async () : Promise<any> => {
                  return await Lecturer()
                }},
                {path: '/unit', component: async () : Promise<any> => {
                  return await Unit()
                }}
              ]
          },
      ],
})
