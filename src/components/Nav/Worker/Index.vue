<script lang="ts">
    import  "@/assets/css/common.css";
    import WorkerStore from '../../../store/modules/WorkerStore';
    import CommentsStore from '../../../store/modules/CommentsStore';
    import { Component, Vue, Prop, Model, Watch} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import { Message } from 'iview';

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
        private rowCount: number;


        private checkedList : Array<any>;

        constructor() {
            super();
            this.store = getModule(WorkerStore);
            this.rowCount = 0;
            this.checkedList = [];


        }
        mounted() {
           this.store.searchUserList();     //人员列表
           this.store.searchProjectList();  //项目列表
           this.store.searchWorkTypeList();  //工种列表
           this.store.searchUnitList();  //参建单位列表
        }
        getUserColumns(){
            return this.store.userColumns;
        }
        getUserDate(){
            return this.store.userList;
        }
        onPageIndexChange(pageIndex){
            this.store.setUserPageIndex(pageIndex);
            this.store.searchUserList();
        }


        set selectProjectId(data: number){
            this.store.setSelectProjectId(data);
        }
        get selectProjectId(): number{
            return this.store.selectProjectId;
        }

        set selectUserName(data: string){
            this.store.setSelectUserName(data);
        }
        get selectUserName(): string{
            return this.store.selectUserName;
        }

        set selectUnitId(data:number){
            this.store.setSelectUnitId(data);
        }
        get selectUnitId():number{
            return this.store.selectUnitId;
        }

        set selectSex(data: string){
            this.store.setSelectSex(data);
        }
        get selectSex(): string{
            return this.store.selectSex;
        }

        set selectWorkType(data: string){
            this.store.setSelectWorkType(data);
        }
        get selectWorkType(): string{
            return this.store.selectWorkType;
        }

        set selectStatus(data: string){
            this.store.setSelectStatus(data);
        }
        get selectStatus(): string{
            return this.store.selectStatus;
        }

        set selectMinAge(data:number){
            this.store.setSelectMinAge(data);
        }
        get selectMinAge():number{
            return this.store.selectMinAge;
        }

        set selectMaxAge(data:number){
            this.store.setSelectMaxAge(data);
        }
        get selectMaxAge():number{
            return this.store.selectMaxAge;
        }

        set selectEafUserStatus(data:number){
            this.store.setSelectEafUserStatus(data);
        }
        get selectEafUserStatus():number{
            return this.store.selectEafUserStatus;
        }


        set selectUserId(data:number){
            this.store.setSelectUserId(data);
        }
        get selectUserId():number{
            return this.store.selectUserId;
        }

        set userPageSize(data:number){
            this.store.setUserPageSize(data);
        }
        get userPageSize():number{
            return this.store.userPageSize;
        }

        set userPageIndex(data:number){
            this.store.setUserPageIndex(data);
        }
        get userPageIndex():number{
            return this.store.userPageIndex;
        }

        set userPageTotal(data:number){
            this.store.setUserPageTotal(data);
        }
        get userPageTotal():number{
            return this.store.userPageTotal;
        }

        set pullDown(data: boolean){
            this.store.setPullDown(data);
        }
        get pullDown(): boolean{
            return this.store.pullDown;
        }

        getProjectList(){
            return this.store.projectList;
        }
        getUnitList(){
            return this.store.unitList;
        }
        getWorkTypeList(){
            return this.store.workTypeList;
        }
        getStatusList(){
            let statusList = [{"statusName":"在场","statusValue":1},{"statusName":"离场","statusValue":2}]
            return statusList;
        }
        getProjectName(){
            let projectName = this.store.projectList.filter(a => a.projectId == this.store.selectProjectId).map(b => b.projectName)[0];
            return projectName;
        }
        getUnitName(){
            debugger
            let unitName = this.store.unitList.filter(a => a.unitId == this.store.selectUnitId).map(b => b.unitName)[0];
            return unitName;
        }
        searchUserList(){
            this.store.searchUserList();
        }
        switchTo(){
            this.store.switchPullDown();
            if(this.store.pullDown){
                this.store.setUserPageSize(12);
            }else {
                this.store.setUserPageSize(15);
            }
            this.store.searchUserList();
        }
        reset(){
            this.store.setSelectProjectId(null);
            this.store.setSelectUserName(null);
            this.store.setSelectUnitId(null);
            this.store.setSelectSex(null);
            this.store.setSelectWorkType(null);
            this.store.setSelectStatus(null);
            this.store.setSelectMinAge(null);
            this.store.setSelectMaxAge(null);
            this.store.setSelectEafUserStatus(null);
            this.store.setSelectUserId(null);
        }
        clearProject(){
            this.store.setSelectProjectId(null);
        }
        clearUnit(){
            this.store.setSelectUnitId(null);
        }
        clearWorkType(){
            this.store.setSelectWorkType(null);
        }
        clearStatus(){
            this.store.setSelectStatus(null);
        }
        clearMinAge(){
            this.store.setSelectMinAge(null);
        }
        clearMaxAge(){
            this.store.setSelectMaxAge(null);
        }
        clearSex(){
            this.store.setSelectSex(null);
        }
        clearUserName(){
            this.store.setSelectUserName(null);
        }



    }
</script>
<style scoped src="@/styles/worker.css" />
<template lang="pug" src="@/views/worker.pug" />
