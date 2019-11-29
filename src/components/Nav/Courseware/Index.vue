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
        public checked: boolean;
        private store: any;
        constructor() {
            super();
            this.addCourseware = false;
            this.checked = true;
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
        //切换内部/外部讲师
        toggle():any{
            this.checked=!this.checked;
            if(this.checked==true){
                this.store.type(0);
            }else {
                this.store.type(1);
            }
          //  this.store.search();
        }
        private options!: any;
        getType() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '类型1', key: 1 },
                {value: '类型2', key: 2 }

            ];
            return this.options;
        }
    }
</script>
<style scoped src="@/styles/courseware.css" />
<template lang="pug" src="@/views/courseware.pug" />
