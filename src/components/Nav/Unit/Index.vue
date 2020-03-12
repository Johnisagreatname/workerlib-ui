<script lang="ts">
    import "@/assets/css/common.css";
    import UnitStore from '../../../store/modules/UnitStore';
	import WorkerStore from '../../../store/modules/WorkerStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
	import router from '../../../router/.invoke/router';
    import { Message } from 'iview';

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
    export default class Unit extends Vue {
        mounted() {
            this.store.search();
            this.store.getProject();
            this.store.getUnitType();
        }



        public addUnit: boolean;
        private store: any;
        private workerStore: any;

        constructor() {
            super();
            this.addUnit = false;
            this.store = getModule(UnitStore);
			this.workerStore = getModule(WorkerStore);
        }
        loading = true;
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        rowClassName (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
        }
        private options!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '在场', key: "00" },
                { value: '离场', key: "01"}
            ];
            return this.options;
        }
        handleSelectRow(selection, row) {
            let item = {};
            item["unit_id"] = row.unit_id;
            this.store.setUplodId(item);

        }
        handleSelectRowCancel(selection,row){
            for(let i = 0;i < this.store.unit.length;i++) {
                if(this.store.unit.filter(a => a.unit_id == row.unit_id ).length > 0){
                    this.$set(this.store.unit[i], '_checked', false)
                }
            }
            let index =  this.store.uplodId.findIndex(x => x.unit_id == row.unit_id);
            this.store.uplodId.splice(index, 1);
        }
        handleSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                let item = {};
                let row = selection[i];
                let index =  this.store.uplodId.findIndex(x => x.unit_id == row.unit_id);
                if(index > -1){
                    continue;
                }
                item["unit_id"] = row.unit_id;
                this.store.setUplodId(item);
            }
        }
        handleSelectAllCancel(selection){
            for(let i = 0;i < this.store.unit.length;i++) {
                if(this.store.uplodId.findIndex(x => x.unit_id == this.store.unit[i].unit_id) > -1){
                    let index =  this.store.uplodId.findIndex(x => x.unit_id == this.store.unit[i].unit_id);
                    this.$set(this.store.unit[i], '_checked', false);
                    this.store.uplodId.splice(index, 1);
                }
            }
        }

        getType() : any {
            return this.store.unitType;
        }

        getProjectNameList():any{
            return this.store.projectNameList;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            for(let i = 0;i < this.store.unit.length;i++) {
                if(this.store.uplodId.filter(a => a.unit_id == this.store.unit[i].unit_id).length > 0){
                    this.$set(this.store.unit[i], '_checked', true)
                }
            }
            return this.store.unit;
        }
        messageWarningFn (text) {
            let alert: any = Message;
            alert.warning(text);
            setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                })
            }, 1000)
        }
        ok() : any{
            if(!this.store.project_license){
                this.messageWarningFn('请输入施工许可证！');
                return;
            }
            if(!this.store.unit_name){
                this.messageWarningFn('请输入参建单位名称！');
                return;
            }
            if(!this.store.unit_number){
                this.messageWarningFn('请输入参建单位编号！');
                return;
            }
            if(!this.store.people_number){
                this.messageWarningFn('请输入当前人数！');
                return;
            }
            if(!this.store.entrance_time){
                this.messageWarningFn('请选择入场日期！');
                return;
            }
            if(!this.store.principal){
                this.messageWarningFn('请输入负责人！');
                return;
            }
            if(!this.store.status){
                this.messageWarningFn('请选择在场状态！');
                return;
            }
            if(!this.store.unit_type){
                this.messageWarningFn('请选择单位类型！');
                return;
            }
            this.store.insertUnit();
            this.addUnit = false;
        }
        cancel():any {
            this.addUnit = false;
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

        public search() {
            this.store.search();
        }
        synchronization(){
            this.store.synchronization();
        }
        
		userCount(unit_id) {
            this.workerStore.setSelectContractors(unit_id);
            router.push({path:'/nav/worker'});
        }

        set project_name(data:string){
            this.store.setProject_name(data);
        }

        get project_name() : string {
            return this.store.project_name;
        }

        set principal(data:string){
            this.store.setPrincipal(data);
        }

        get principal() : string {
            return this.store.principal;
        }

        set unit_type(data:number){
            this.store.setUnit_type(data);
        }

        get unit_type() : number {
            return this.store.unit_type;
        }

        set people_number(data:string){
            this.store.setPeople_number(data);
        }

        get people_number() : string {
            return this.store.people_number;
        }

        set entrance_time(data:Date){
            this.store.setEntrance_time(data);
        }

        get entrance_time() : Date {
            return this.store.entrance_time;
        }

        set unit_name(data:string){
            this.store.setUnit_name(data);
        }

        get unit_name() : string {
            return this.store.unit_name;
        }

        set unit_number(data:string){
            this.store.setUnit_number(data);
        }

        get unit_number() : string {
            return this.store.unit_number;
        }

        set project_license(data:string){
            this.store.setProject_license(data);
        }

        get project_license() : string {
            return this.store.project_license;
        }

        set project_id(data:number){
            this.store.setProject_id(data);
        }

        get project_id() : number {
            return this.store.project_id;
        }

        set id(data:number){
            this.store.setId(data);
        }

        get id() : number {
            return this.store.id;
        }

        set unit(data:any){
            this.store.setUnit(data);
        }
        get unit() : any {
            return this.store.unit;
        }

        get selectProjectName():string{
            return this.store.sProjectName;
        }
        set selectProjectName(data:string){
            this.store.selectProjectName(data);
        }
        get selectStatus():number{
            return this.store.sStatus;
        }
        set selectStatus(data:number){
            if(!data) {
                this.store.selectStatus(0);
                return;
            }
            this.store.selectStatus(data);
        }
        get selectUnitName():number{
            return this.store.sUnitName;
        }
        set selectUnitName(data:number){
            this.store.selectUnitName(data);
        }

        set sUnitName(data:string){
            this.store.setSUnitName(data);
        }

        get sUnitName() : string {
            return this.store.sUnitName;
        }

        set sStatus(data:number){
            this.store.setSStatus(data);
        }

        get sStatus() : number {
            return this.store.sStatus;
        }

        set sProjectName(data:string){
            this.store.setSProjectName(data);
        }

        get sProjectName() : string {
            return this.store.sProjectName;
        }


        set pageTotal(data:number){
            this.store.setPageTotal(data);
        }

        get pageTotal() : number {
            return this.store.pageTotal;
        }

        set pageSize(data: number){
            this.store.setPageSize(data);
        }

        get pageSize() :  number {
            return this.store.pageSize;
        }

        set pageIndex(data: number){
            this.store.setPageIndex(data);
        }

        get pageIndex() :  number {
            return this.store.pageIndex;
        }

        set status(data:number){
            if(!data) {
                this.store.selectStatus(0);
                return;
            }
            this.store.setStatus(data);
        }

        get status() : number {
            return this.store.status;
        }

        set projectNameList(data:any){
            this.store.setProjectNameList(data);
        }

        get projectNameList() : any {
            return this.store.projectNameList;
        }
}
</script>
<style scoped src="@/styles/unit.css" />
<template lang="pug" src="@/views/unit.pug" />
