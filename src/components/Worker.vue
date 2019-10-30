<script lang="ts">
    import "@/assets/css/common.css";
    import WorkerStore from '../store/modules/WorkerStore';
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
    export default class Worker extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(WorkerStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '离线', key: '0' },
                { value: '在线', key: '1' }
            ];
            return this.options;
        }

        private peoples!: any;
        getPeople() : any{
            if(this.peoples) return this.peoples;
            this.peoples = [
                {name:'裴浩杰',sex:'男',age:'25',phone:'13059267735',cards:'430***********8744',profession:'资料员',state:'在职'},
                {name:'范佳超',sex:'男',age:'28',phone:'15278953355',cards:'330***********5432',profession:'资料员',state:'在职'},
                {name:'林陆锐',sex:'男',age:'29',phone:'15977565653',cards:'462***********2518',profession:'资料员',state:'在职'},
                {name:'陈吕',sex:'男',age:'25',phone:'15688539953',cards:'356***********5686',profession:'资料员',state:'在职'}
            ];
            return this.peoples;
        }

    }
</script>
<style scoped src="@/styles/worker.css" />
<template lang="pug" src="@/views/worker.pug" />
