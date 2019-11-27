<script lang="ts">
    import "@/assets/css/common.css";
    import ProjectStore from '../../../store/modules/ProjectStore';
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
    export default class WorkClass extends Vue {
        public addProject: boolean;
        private store: any;
        private options!: Array<any>;

        constructor() {
            super();
            this.addProject = false;
            this.store = getModule(ProjectStore);
        }

        mounted() {
            this.store.search();

        }
        public search() {
            this.store.search();
        }
        ok() : any{
            this.store.insertProject();
            this.addProject = false;
        }
        cancel():any {
            this.addProject = false;
        }

        onPageSizeChange(pageSize){

            this.store.pageSize(pageSize);
            this.store.pageIndex(1);
            this.onPageIndexChange(1);
        }

        onPageIndexChange(pageIndex){

            console.log(pageIndex)

            this.store.pageIndex(pageIndex);
            this.store.search();
        }

        rowClassName (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
        }

        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '待开工', key: '0' },
                { value: '开工', key: '1' },
                { value: '停工', key: '2' },
                { value: '完工', key: '3' }
            ];
            return this.options;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            return this.store.project;
        }

        get totalRecords():number{
            return this.store.pageInfo.totalRecords;
        }

        set totalRecords(data:number){
            this.store.setPageTotal(data);
        }

        get pageIndex():number{
            return this.store.pageInfo.pageIndex;
        }
        set pageIndex(data:number){
            this.store.pageIndex(data);
        }
        get pageSize():number{
            return this.store.pageInfo.pageSize;
        }
        set pageSize(data:number){
            this.store.pageSize(data);
        }
        get id(): number{
            return this.store.projectInfo.id;
        }
        set id(data:number){
            this.store.id(data);
        }
        get projectName(): string {
            return this.store.projectInfo.project_name;
        }
        set projectName(data: string) {
            this.store.projectName(data);
        }
        get projectBrief():string{
            return this.store.projectInfo.project_brief;
        }
        set projectBrief(data:string){
            this.store.projectBrief(data);
        }
        get builderLicense():string{
            return this.store.projectInfo.builder_license;
        }
        set builderLicense(data:string){
            this.store.builderLicense(data);
        }
        get startTime():Date{
            return this.store.projectInfo.start_time;
        }
        set startTime(data:Date){
            this.store.startTime(data);
        }
        get endTime():Date{
            return this.store.projectInfo.end_time;
        }
        set endTime(data:Date){
            this.store.endTime(data);
        }
        get construction():string{
            return this.store.projectInfo.construction;
        }
        set construction(data:string){
            this.store.construction(data);
        }
        get organization():string{
            return this.store.projectInfo.organization;
        }
        set organization(data:string){
            this.store.organization(data);
        }
        get supervising():string{
            return this.store.projectInfo.supervising;
        }
        set supervising(data:string){
            this.store.supervising(data);
        }
        get projectSupervision():string{
            return this.store.projectInfo.project_supervision;
        }
        set projectSupervision(data:string){
            this.store.projectSupervision(data);
        }
        get projectAddress():string{
            return this.store.projectInfo.project_address;
        }
        set projectAddress(data:string){
            this.store.projectAddress(data);
        }
        get status():number{
            return this.store.projectInfo.status;
        }
        set status(data:number){
            let key = this.options.filter(a=>a.value == data)[0].key
            this.store.status(key);
        }

        get selectOrganization():string{
            return this.store.projectInfo.selectOrganization;
        }
        set selectOrganization(data:string){
            this.store.selectOrganization(data);
        }

        get selectProjectAddress():string{
            return this.store.projectInfo.selectProjectAddress;
        }
        set selectProjectAddress(data:string){
            this.store.selectProjectAddress(data);
        }

        get selectProjectName():string{
            return this.store.projectInfo.selectProjectName;
        }
        set selectProjectName(data:string){
            this.store.selectProjectName(data);
        }
        get selectStatus():number{
            return this.store.projectInfo.selectStatus;
        }
        set selectStatus(data:number){
            let key = this.options.filter(a=>a.value == data)[0].key
            this.store.selectStatus(key);
        }

    }
</script>
<style scoped src="@/styles/workclass.css" />
<template lang="pug" src="@/views/workclass.pug" />
