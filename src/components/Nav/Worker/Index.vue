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
            this.store.search();
            this.store.getProjectType();
        }
        getPeopleList():any{
            return this.store.peoples;
        }
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '在职', key: 1 },
                {value: '离职', key: 2 }

            ];
            return this.options;
        }
        handleCreate (type) {
            this.getType().push({
                value: type,
                label: type
            });
        }
        getType(){
            return this.store.projectType
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
        onPageSizeChange(pageSize){
            this.store.setPageSize(pageSize);
            this.store.setPageIndex(1);
            this.onPageIndexChange(1);
        }
        onPageIndexChange(pageIndex){
            this.store.setPageIndex(pageIndex);
            this.store.search();
        }

        set userName(data:string){
            this.store.setUserName(data);
        }
        get userName():string{
            return this.store.userName;
        }

        set card(data:string){
            this.store.setCard(data);
        }
        get card():string{
            return this.store.card;
        }

        set phone(data:number){
            this.store.setPhone(data);
        }
        get phone():number{
            return this.store.phone;
        }

        set type(data:number){
            this.store.setType(data);
        }
        get type():number{
            return this.store.type;
        }

        set project(data:string){
            this.store.setProject(data);
        }
        get project():string{
            return this.store.project;
        }

        set unit(data:string){
            this.store.setUnit(data);
        }
        get unit():string{
            return this.store.unit;
        }

        set animal(data:string){
            this.store.setAnimal(data);
        }
        get animal():string{
            return this.store.animal;
        }

        set pageTotal(data:number){
            this.store.setPageToatl(data);
        }
        get pageTotal():number{
            return this.store.pageTotal;
        }

        set selectProjectName(data:string){
            this.store.setSelectProjectName(data);
        }
        get selectProjectName():string{
            return this.store.selectProjectName;
        }
        set selectContractors(data:string){
            this.store.setSelectContractors(data);
        }
        get selectContractors():string{
            return this.store.selectContractors;
        }
        set selectUserName(data:string){
            this.store.setSelectUserName(data);
        }
        get selectUserName():string{
            return this.store.selectUserName;
        }
        set selectType(data:string){
            this.store.setSelectType(data);
        }
        get selectType():string{
            return this.store.selectType;
        }
        set selectStatus(data:number){
            this.store.setSelectStatus(data);
        }
        get selectStatus():number{
            return this.store.selectStatus;
        }


}
</script>
<style scoped src="@/styles/worker.css" />
<template lang="pug" src="@/views/worker.pug" />
