<script lang="ts">
    import "@/assets/css/common.css";
    import WorkerStore from '../../../store/modules/WorkerStore';
    import { Component, Vue, Prop, Model, Watch} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';

    @Component({
        components:{
        },
        directives: { // 自定义指令
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
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        animal = '否';
        private store: any;
        public addWorker: boolean;
        public particulars: boolean;
        public certificate: boolean;
        private sex: string;
        private options!: any;
        private now: Date;
        private year :any;
        private date:any

        constructor() {
            super();
            this.store = getModule(WorkerStore)
            this.addWorker = false;
            this.particulars = false;
            this.certificate = false;
        }

        mounted() {
            this.store.search()
            console.log('mounted');
        }

        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '离职', key: '0' },
                {value: '在职', key: '1' }
            ];
            return this.options;
        }
        //获取性别
        checkSex(idNumber): boolean {
            this.sex = idNumber.substring(16,17);
            if(this.sex=="1"||this.sex=="3"||this.sex=="5"||this.sex=="7"||this.sex=="9"){
                 return true;
            }else {
                return false;
            }
        }
        //获取年龄
        getAge(idNumber): number{
            this.now = new Date();
            this.year = this.now.getTime();
            this.date = new Date(idNumber.substring(6,10)+","+idNumber.substring(10,12)+","+idNumber.substring(12,14)).getTime();
            return Math.floor((this.year-this.date)/(1000*60*60*24*31*12));
        }
        ok() : any{
            this.addWorker = false;
        }
        cancel():any {
            this.addWorker = false;
        }
        particularsOk() : any{
            this.particulars = false;
        }
        particularsCancel():any {
            this.particulars = false;
        }
        certificateOpen():any {
            this.particulars = false;
            this.certificate=true;
        }
        certificateOk() : any{
            this.certificate = false;
            this.particulars = true;
        }
        certificateCancel():any {
           this.certificate = false;
           this.particulars = true;
        }

        onCheck(id: number): void{
            this.store.onCheck(id);
        }
    
        set state(data:number){
            this.store.setState(data);
        }

        get state() : number {
            return this.store.state;
        }

        set workType(data:string){
            this.store.setWorkType(data);
        }

        get workType() : string {
            return this.store.workType;
        }

        set name(data:string){
            this.store.setName(data);
        }

        get name() : string {
            return this.store.name;
        }

        set constructionUnit(data:string){
            this.store.setConstructionUnit(data);
        }

        get constructionUnit() : string {
            return this.store.constructionUnit;
        }

        set projectName(data:string){
            this.store.setProjectName(data);
        }

        get projectName() : string {
            return this.store.projectName;
        }
}
</script>
<style scoped src="@/styles/worker.css" />
<template lang="pug" src="@/views/worker.pug" />
