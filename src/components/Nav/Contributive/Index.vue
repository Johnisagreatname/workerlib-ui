<script lang="ts">
    import "@/assets/css/common.css";
    import ContributiveStore from '../../../store/modules/ContributiveStore';
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
    export default class Contributive extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(ContributiveStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        rowClassName (row, index) : string {

            if(index == 0) {
                return 'table-header'
            }

            return '';
        }

        mounted() {
            this.store.search()
            console.log('mounted')
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
            return this.store.contributive;
        }


    }
</script>
<style scoped src="@/styles/contributive.css" />
<template lang="pug" src="@/views/contributive.pug" />
