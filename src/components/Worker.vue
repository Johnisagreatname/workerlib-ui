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
        public modal2: boolean;
        public particulars: boolean;
        public ee: boolean;
        constructor() {
            super();
            this.store = getModule(WorkerStore)
            this.modal2 = false;
            this.particulars = false;
            this.ee = false;
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;

        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '离线', key: '0' },
                {value: '在线', key: '1' }
            ];
            return this.options;
        }
        animal = '否'

        getPeoples() : any{
            return this.store.peoples;
        }
        ok() : any{
            this.modal2 = false;
        }
        cancel():any {
            this.modal2 = false;
        }
        particularsOk() : any{
            this.particulars = false;
        }
        particularsCancel():any {
            this.particulars = false;
        }

        close():any {
            this.particulars = false;
            this.ee=true;
        }
        eeOk() : any{
            this.ee = false;
            this.particulars = true;
        }
       eeCancel():any {
           this.ee = false;
           this.particulars = true;
        }
    }
</script>
<style scoped src="@/styles/worker.css" />
<template lang="pug" src="@/views/worker.pug" />
