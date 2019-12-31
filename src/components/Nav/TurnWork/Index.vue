<script lang="ts">
    import "@/assets/css/common.css";
    import TurnWorkStore from '../../../store/modules/TurnWorkStore';
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
    export default class TurnWork extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(TurnWorkStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '离场', key: '0' },
                { value: '在场 ', key: '1' }
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
<style scoped src="@/styles/turnWork.css" />
<template lang="pug" src="@/views/turnWork.pug" />
