<script lang="ts">
    import "@/assets/css/common.css";
    import CultivateStore from '../../../store/modules/CultivateStore';
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
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        rowClassName (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
        }
        mounted() {
            this.store.getStudyType();
            this.store.search();
        }
        loading = true;
        private store: any;
        public startTraining:boolean;
        public onDelete:boolean;
        public checkAllGroup :Array<any>;
        constructor() {
            super();
            this.store = getModule(CultivateStore);
            this.startTraining = false;
            this.onDelete = false;
            this.checkAllGroup = [];
        }
        rowClass(row, index) {
            return "rowClasses"
        }
        search(){
            this.store.searchInfo();
        }
        getDateFormat (d: number) : string {
            let date = new Date(d);
            return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        }
        getStudy() : any {
            return this.store.studyType;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getColumnsUp() : any{
            return this.store.columnsUp;
        }
        getData() : any{
            return this.store.cultivate;
        }

        getColumnsInfo() : any{
            return this.store.getColumnsInfo;
        }
        getDataInfo() : any{
            return this.store.cultivateArchives;
        }
        okStart() : any{

            this.startTraining = false;
        }
        cancelStart():any {
            this.startTraining = false;
        }
        change(name){
            this.store.setInfoId(name);
            this.store.searchInfo();
            this.startTraining = true;
        }
        toggle(name){
            if(name=="线上培训"){
                this.store.setSelectStatus(1);
                this.store.search();
                this.store.clearCheckedDelete();
            }else {
                this.store.setSelectStatus(2);
                this.store.search();
                this.store.clearCheckedDelete();
            }
        }
        deleteCultivate(){
            this.onDelete = true;
        }
        handleSelectRow(selection, row) {
            debugger
            var itemTrue = {};
            itemTrue['id'] = row.id;
            itemTrue['name'] = row.course_name;
            this.store.setCheckedDelete(itemTrue)

        }
        handleSelectRowCancel(selection,row){
            let index =  this.store.checkedDelete.findIndex(x => x.id == row.id);
            this.store.checkedDelete.splice(index, 1);
        }
        handleSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                let row = selection[i];
                var itemTrue = {};
                itemTrue['id'] = row.id;
                itemTrue['name'] = row.course_name;
                this.store.setCheckedDelete(itemTrue)
            }
        }

        handleSelectAllCancel(selection){
            debugger
            for(let i= 0;i<this.store.cultivate.length;i++){
                let item = {};
                let row = this.store.cultivate[i];
                let index =  this.store.checkedDelete.findIndex(x => x.id == row.id);
                if(index > -1){
                    this.store.checkedDelete.splice(index, 1);
                }
            }
            console.log(this.store.checkedDelete)
        }

        okDelete() : any{
            this.store.delete();
            this.onDelete = false;
        }
        cancelDelete():any {
            this.onDelete = false;
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

        onInPageSizeChange(pageSize){
            this.store.setInPageIndex(pageSize);
            this.store.setInPageIndex(1);
            this.onInPageIndexChange(1);
        }
        onInPageIndexChange(pageIndex){
            this.store.setInPageIndex(pageIndex);
            this.store.searchInvolvedProject();
        }
        set pageTotal(data:number){
            this.store.setPageToatl(data);
        }
        get pageTotal():number{
            return this.store.pageTotal;
        }

        set selectCourseName(data:number){
            this.store.setSelectCourseName(data);
        }
        get selectCourseName():number{
            return this.store.selectCourseName;
        }

        set selectState(data:number){
            this.store.setSelectState(data);
        }
        get selectState():number{
            return this.store.selectState;
        }

        set selectStartTime(data:Date){
            this.store.setSelectStartTime(data);
        }
        get selectStartTime():Date{
            return this.store.selectStartTime;
        }

        set inPageTotal(data:number){
            this.store.setInPageTotal(data);
        }
        get inPageTotal():number{
            return this.store.inPageTotal;
        }

        set infoId(data:number){
            this.store.setInfoId(data);
        }
        get infoId():number{
            return this.store.infoId;
        }

        set selectUserName(data:string){
            this.store.setSelectUserName(data);
        }
        get selectUserName():string{
            return this.store.selectUserName;
        }
    }
</script>
<style scoped src="@/styles/cultivate.css" />
<template lang="pug" src="@/views/cultivate.pug" />
