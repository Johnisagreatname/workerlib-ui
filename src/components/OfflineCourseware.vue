<script lang="ts">
    import "@/assets/css/common.css";
    import OfflineCoursewareStore from '../store/modules/OfflineCoursewareStore';
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
    export default class OfflineCourseware extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(OfflineCoursewareStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        getOfflineCourseware() : any{
            return this.store.offlineCourseware;
        }


    }
</script>
<style scoped src="@/styles/offlineCourseware.css" />
<template lang="pug" src="@/views/offlineCourseware.pug" />
