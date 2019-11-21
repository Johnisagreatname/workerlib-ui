<script lang="ts">
    import "@/assets/css/common.css";
    import LecturerStore from '../../../store/modules/LecturerStore';
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
    export default class Lecturer extends Vue {
        public checkedInternal: boolean;
        private store: any;
        private
        mounted() {
            this.store.search();
        }
        constructor() {
            super();
            this.checkedInternal = true;
            this.store = getModule(LecturerStore)
        }
        //获取讲师数据
        getLecturer() : any{
            return this.store.lecturers;
        }

        //切换内部/外部讲师
        toggle():any{
            this.checkedInternal=!this.checkedInternal;
            if(this.checkedInternal==true){
                this.store.type(0);
            }else {
                this.store.type(1);
            }
            this.store.search();
        }
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;



    }
</script>
<style scoped src="@/styles/lecturer.css" />
<template lang="pug" src="@/views/lecturer.pug" />
