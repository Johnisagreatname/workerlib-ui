<script lang="ts">
    import "@/assets/css/common.css";
    import CoursewareStore from '../store/modules/CoursewareStore';
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

        private store: any;
        constructor() {
            super();
            this.store = getModule(CoursewareStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        getCourseware() : any{
            return this.store.courseware;
        }


    }
</script>
<style scoped src="@/styles/courseware.css" />
<template lang="pug" src="@/views/courseware.pug" />
