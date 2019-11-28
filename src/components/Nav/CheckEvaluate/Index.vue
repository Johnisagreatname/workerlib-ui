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
        private commtenGrade!: any;
        private grade!: any;
        public addRate: boolean;
        mounted() {
            this.store.getProjectType();
            this.store.search();
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
                {value: '在职', key: 1 },
                {value: '离职', key: 2 }

            ];
            return this.options;
        }
        handleSelectRow(selection, index) {
            console.log(selection);
        }
        getCommtenGrade() : any {
            if(this.commtenGrade) return this.commtenGrade;
            this.commtenGrade = [
                {value: '高级', key: '高级' },
                {value: '中级', key: '中级' },
                {value: '低级', key: '低级' }

            ];
            return this.commtenGrade;
        }

        getGrade() : any {
            if(this.grade) return this.grade;
            this.grade = [
                {value: '一级', key: '一级' },
                {value: '二级', key: '二级' },
                {value: '三级', key: '三级' },
                {value: '四级', key: '四级' },
                {value: '五级', key: '五级' },
                {value: '六级', key: '六级' },
                {value: '七级', key: '七级' },
                {value: '八级', key: '八级' },
                {value: '九级', key: '九级' }

            ];
            return this.commtenGrade;
        }
        ok() : any{
            //this.store.insertArchives();
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
