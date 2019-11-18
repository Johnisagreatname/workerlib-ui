<script lang="ts">
    import "@/assets/css/common.css";
    import CoursewareStore from '../../../store/modules/CoursewareStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';

    @Component({
        components:{
        },
        directives: { // 自定义指令
        },
        mounted() {
        },
        computed: {
            menuitemClasses: () => {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    })
    export default class Courseware extends Vue {
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        public addCourseware: boolean;
        private store: any;
        constructor() {
            super();
            this.addCourseware = false;
            this.store = getModule(CoursewareStore)
        }
        coursewareList='light';
        ok() : any{
            this.addCourseware = false;
        }
        cancel():any {
            this.addCourseware = false;
        }

        getCourseware() : any{
            return this.store.courseware;
        }


    }
</script>
<style scoped src="@/styles/courseware.css" />
<template lang="pug" src="@/views/courseware.pug" />
