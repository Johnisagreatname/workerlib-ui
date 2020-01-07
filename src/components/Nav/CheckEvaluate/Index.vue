<script lang="ts">
    import "@/assets/css/common.css";
    import CheckEvaluateStore from '../../../store/modules/CheckEvaluateStore';
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
    export default class CheckEvaluate extends Vue {
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        private options!: any;
        public addRate: boolean;
        public checkedArray: Array<any>;

        mounted() {
            this.store.getProjectType();
            this.store.search();
            this.store.getGrade();
            this.store.getCommtenGrade();
            this.checkedArray = [];
        }
        private store: any;
        constructor() {
            super();
            this.store = getModule(CheckEvaluateStore)
            this.addRate = false;
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
        handleCreate (type) {
            this.getType().push({
                value: type,
                label: type
            });
        }
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '在场', key: 1 },
                {value: '离场', key: 2 }

            ];
            return this.options;
        }
        onSelect(selection,row){
            var itemTrue = {};
            itemTrue['eafId'] = row.eafId;
            itemTrue['eafName'] = row.eafName;
            this.store.setCheckedUser(itemTrue);
            console.log(this.store.checkedUser)
        }
        onSelectCancel(selection,row){
            let index =  this.store.checkedUser.findIndex(x => x.eafId == row.eafId);
            this.store.checkedUser.splice(index, 1);
            console.log(this.store.checkedUser)
        }
        onSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                let row = selection[i];
                var itemTrue = {};
                let index =  this.store.checkedUser.findIndex(x => x.eafId == row.eafId);
                if(index > -1){
                    continue;
                }
                itemTrue['eafId'] = row.eafId;
                itemTrue['eafName'] = row.eafName;
                this.store.setCheckedUser(itemTrue)
            }
            console.log(this.store.checkedUser)
        }
        onSelectAllCancel(selection){
            for(let i= 0;i<this.store.rate.length;i++){
                let item = {};
                let row = this.store.rate[i];
                let index =  this.store.checkedUser.findIndex(x => x.eafId == row.eafId);
                if(index > -1){
                    this.store.checkedUser.splice(index, 1);
                }
            }
            console.log(this.store.checkedUser)
        }
        getCommtenGrade() : any {
            return this.store.commtenGrade;
        }
        getGrade() : any {
            return this.store.grades;
        }
        ok() : any{
            for(let i = 0;i<this.store.checkedUser.length;i++){
                let row = this.store.checkedUser[i];
                let item = {};
                item["userId"] = row.eafId;
                item["grade"] = this.store.grade;
                item["rank"] = this.store.rank;
                item["evaluateTime"]=
                    this.store.evaluateTime.getFullYear()+"-"+
                    (Number(this.store.evaluateTime.getMonth())+1)+"-"+
                    this.store.evaluateTime.getDay();
                this.store.setInsertUser(item)
            }
            this.store.insertArchives();
            this.store.clearCheckedUser();
            this.addRate = false;
        }
        cancel():any {
            this.addRate = false;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            return this.store.rate;
        }
        getType(){
            return this.store.projectType;
        }
        get checkedUser():any{
            return this.store.checkedUser;
        }
        get user(){
            return this.store.checkedUser.map(x => x.eafName);
        }
        get rank():string{
            return this.store.rank;
        }
        set rank(data:string){
            this.store.setRank(data)
        }
        get evaluateTime():Date{
            return this.store.evaluateTime;
        }
        set evaluateTime(data:Date){
            this.store.setEvaluateTime(data)
        }
        get grade():string{
            return this.store.grade;
        }
        set grade(data:string){
            this.store.setGrade(data);
        }
        set totalRecords(data:number){
            this.store.setPageTotal(data);
        }
        get totalRecords():number{
            return this.store.pageTotal;
        }
        set selectConstructionUit(data:string){
            this.store.setConstructionUit(data);
        }
        get selectConstructionUit():string{
            return this.store.selectConstructionUit;
        }
        set selectProjectName(data:string){
            this.store.setProjectName(data);
        }
        get selectProjectName():string{
            return this.store.selectProjectName;
        }
        set name(data:string){
            this.store.setName(data);
        }
        get name():string{
           return this.store.selectName;
        }
        set selectType(data:string){
            this.store.setType(data);
        }
        get selectType():string{
            return this.store.selectType;
        }
        set selectStatus(data:number){
            this.store.setStatus(data);
        }
        get selectStatus():number{
            return this.store.selectStatus;
        }
        set selectRate(data:string){
            this.store.setRate(data);
        }
        get selectRate():string{
            return this.store.selectRate;
        }
    }
</script>
<style scoped src="@/styles/checkEvaluate.css" />
<template lang="pug" src="@/views/checkEvaluate.pug" />
