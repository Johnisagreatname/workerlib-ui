<script lang="ts">
    import "@/assets/css/common.css";
    import ProjectStore from '../store/modules/ProjectStore';
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
    export default class Project extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(ProjectStore)
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
                { value: '离场', key: '0' },
                { value: '在场', key: '1' }
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
<style scoped src="@/styles/project.css" />
<template lang="pug" src="@/views/project.pug" />
