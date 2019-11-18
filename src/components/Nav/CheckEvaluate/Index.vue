<script lang="ts">
    import "@/assets/css/common.css";
    import CheckEvaluateStore from '../../../store/modules/CheckEvaluateStore';
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
    export default class CheckEvaluate extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(CheckEvaluateStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;




    }
</script>
<style scoped src="@/styles/checkEvaluate.css" />
<template lang="pug" src="@/views/checkEvaluate.pug" />
