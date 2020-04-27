<script lang="ts">
    import "@/assets/css/common.css";
    import Echart from 'echarts';
    import SpectacularsStore from '../../store/modules/SpectacularsStore';
    import IndexVideoStore from '../../store/modules/IndexVideoStore';
    import WorkerStore from '../../store/modules/WorkerStore';
    import LoginStore from '../../store/modules/LoginStore';
    import ProjectStore from '../../store/modules/ProjectStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    Vue.prototype.$echarts = Echart;
    import router from '../../router/.invoke/router'
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
    export default class Spectaculars extends Vue {
        @Model('isCollapsed', {type: Boolean}) private isCollapsed !: boolean;

        rowClassName(row, index): string {
            if (index == 0) {
                return 'table-header'
            }
            return '';
        }

        mounted() {
        }

        constructor(e) {
            super(e);

        }


    }
</script>
<style scoped src="@/styles/spectaculars.css" />
<template lang="pug" src="@/views/spectaculars.pug" />
