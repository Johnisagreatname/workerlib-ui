<script lang="ts">
    import "@/assets/css/common.css";
    import CultivateStore from '../store/modules/CultivateStore';
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
    export default class Cultivate extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(CultivateStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        rowClassName (row, index) : string {

            if(index == 0) {
                return 'table-header'
            }

            return '';
        }

        private options!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '待学习', key: '0' },
                { value: '学习中', key: '1' },
                { value: '学习完成', key: '2' }
            ];
            return this.options;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            return this.store.data;
        }


    }
</script>
<style scoped src="@/styles/cultivate.css" />
<template lang="pug" src="@/views/cultivate.pug" />
