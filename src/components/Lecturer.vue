<script lang="ts">
    import "@/assets/css/common.css";
    import LecturerStore from '../store/modules/LecturerStore';
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

        private store: any;
        constructor() {
            super();
            this.store = getModule(LecturerStore)
        }
        getLecturer() : any{
            return this.store.lecturer;
        }
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;



    }
</script>
<style scoped src="@/styles/lecturer.css" />
<template lang="pug" src="@/views/lecturer.pug" />
