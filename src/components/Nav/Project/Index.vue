<script lang="ts">
    import "@/assets/css/common.css";
    import ProjectStore from '../../../store/modules/ProjectStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
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
    export default class Project extends Vue {
        public addProject: boolean;
        public addPeoples: boolean;
        public viewPeoples: boolean;
        public projectId:number;
        public selectWorkType:Array<any>;
        private store: any;
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
        constructor() {
            super();
            this.addProject = false;
            this.addPeoples = false;
            this.selectWorkType = [];
            this.viewPeoples = false;
            this.projectId = null;
            this.store = getModule(ProjectStore);

        }
        loading = true;
        mounted() {
            this.store.search();
            this.store.getProjectType();

        }
        public search() {
            this.store.pageSize(10);
            this.store.pageIndex(1);
            this.store.search();
        }
        ok() : any{
            if(!this.store.projectInfo.project_name){
                this.messageWarningFn('请输入项目名称！');
                return;
            }
            if(!this.store.projectInfo.project_brief){
                this.messageWarningFn('请输入项目简介！');
                return;
            }
            if(!this.store.projectInfo.builder_license){
                this.messageWarningFn('请输入施工许可证！');
                return;
            }
            if(!this.store.projectInfo.start_time){
                this.messageWarningFn('请选择开工时间！');
                return;
            }
            if(!this.store.projectInfo.end_time){
                this.messageWarningFn('请选择合同竣工时间！');
                return;
            }
            if(!this.store.projectInfo.construction){
                this.messageWarningFn('请输入建设单位！');
                return;
            }
            if(!this.store.projectInfo.organization){
                this.messageWarningFn('请输入施工单位！');
                return;
            }
            if(!this.store.projectInfo.supervising){
                this.messageWarningFn('请输入监理单位！');
                return;
            }
            if(!this.store.projectInfo.status){
                this.messageWarningFn('请选择项目状态！');
                return;
            }
            this.store.insertProject();
            this.addProject = false;
        }
        cancel():any {
            this.addProject = false;
        }

        okAdd() : any{

            this.addPeoples = false;
        }
        cancelAdd():any {
            this.addPeoples = false;
        }
        change(name){
                this.projectId= name.split('_')[1];
                if(name.split('_')[0] == 'add') {
                    this.store.getWorkType();
                    this.store.searchPeople();
                    this.addPeoples = true;
                }else {
                    this.viewPeoples = true;
                }

        }

        onPageSizeChange(pageSize){
            this.store.pageSize(pageSize);
            this.store.pageIndex(1);
            this.onPageIndexChange(1);
        }

        onPageIndexChange(pageIndex){
            this.store.pageIndex(pageIndex);
            this.store.search();
        }

        rowClassNastatusme (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
        }
        handleSelectRow(selection, row) {
            let item = {};
            item["project_id"] = row.project_id;
            item["archives_id"] = row.eafId
            this.store.setUplodId(item);
            console.log(this.store.uplodId)
        }
        handleSelectRowCancel(selection,row){
            let index =  this.store.uplodId.findIndex(x => x.archives_id == row.eafId);
            this.store.uplodId.splice(index, 1);
            console.log(this.store.uplodId)
        }
        handleSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                let item = {};
                let row = selection[i];
                let index =  this.store.uplodId.findIndex(x => x.archives_id == row.eafId);
                if(index > -1){
                    continue;
                }
                item["project_id"] = row.project_id;
                item["archives_id"] = row.eafId
                this.store.setUplodId(item);
            }
            console.log(this.store.uplodId)
        }
        handleSelectAllCancel(selection){
            debugger
            console.log("qqqqqqqqqqqq"+selection)
            for(let i = 0;i < this.store.project.length;i++) {
                if(this.store.uplodId.findIndex(x => x.archives_id == this.store.project[i].eafId) > -1){
                    let index =  this.store.uplodId.findIndex(x => x.archives_id == this.store.project[i].eafId);
                    this.$set(this.store.project[i], '_disabled', false);
                    this.$set(this.store.project[i], '_checked', false);
                    this.store.uplodId.splice(index, 1);
                }

            }
            console.log(this.store.uplodId)
        }

        handleSelectRowPeople(selection, row) {
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peoples[i].eafId == row.eafId){
                    if(this.store.peoples[i].project_id == row.project_id){
                        this.$set(this.store.peoples[i], '_checked', true);
                        let item = {};
                        item["eafId"] = row.eafId;
                        item["project_id"] = row.project_id;
                        for(let j = 0;j = this.selectWorkType.length;j++){
                            if(this.selectWorkType[i].eafId == row.eafId && this.selectWorkType[i].project_id == row.project_id){
                                item["workType"] = this.selectWorkType[i].workType;
                            }else {
                                item["workType"] = row.workType;
                            }
                        }
                        this.store.setPeoplesId(item);
                    }else {
                        this.$set(this.store.peoples[i], '_disabled', true);
                    }
                }
            }
            console.log(this.store.peopleId)
        }
        handleSelectRowCancelPeople(selection,row){

            let index =  this.store.peopleId.findIndex(x => x.eafId == row.eafId);
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peoples[i].eafId == row.eafId){
                    this.$set(this.store.peoples[i], '_disabled', false);
                    this.$set(this.store.peoples[i], '_checked', false);
                    debugger
                }
            }
            this.store.peopleId.splice(index, 1);
            console.log(this.store.peopleId)
        }
        handleSelectAllPeople(selection) {
            debugger
            for(let i= 0;i<selection.length;i++){
                let item = {};
                let row = selection[i];
                let index =  this.store.peopleId.findIndex(x => x.eafId == row.eafId);
                if(index > -1){
                    continue;
                }
                item["eafId"] = row.eafId;
                item["project_id"] = row.project_id;
                for(let j = 0;j = this.selectWorkType.length;j++){
                    if(this.selectWorkType[i].eafId == row.eafId && this.selectWorkType[i].project_id == row.project_id){
                        item["workType"] = this.selectWorkType[i].workType;
                    }else {
                        item["workType"] = row.workType;
                    }
                }
                this.store.setPeoplesId(item);
            }
            console.log(this.store.peopleId)
        }
        handleSelectAllCancelPeople(selection){
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peopleId.findIndex(x => x.eafId == this.store.peoples[i].eafId) > -1){
                    let index =  this.store.peopleId.findIndex(x => x.eafId == this.store.peoples[i].eafId);
                    this.$set(this.store.peoples[i], '_disabled', false);
                    this.$set(this.store.peoples[i], '_checked', false);
                    this.store.peopleId.splice(index, 1);
                }

            }

            console.log(this.store.peopleId)
        }

        selectChange(name) {
            if (name) {
                let index = this.selectWorkType.findIndex(x => x.eafId == name.split('_')[1] && x.project_Id == name.split('_')[2]);
                if (index > -1) {
                    this.selectWorkType.splice(index, 1);
                }
                let item = {};
                item["workType"] = name.split('_')[0];
                item["eafId"] = name.split('_')[1];
                item["project_Id"] = name.split('_')[2];
                this.selectWorkType.push(item);
                console.log(this.selectWorkType)
            }
        }

        searchPeople(){
            this.store.searchPeople();
        }
        getMenus() : any {
          return this.store.projectType;
        }
        getWorkTypeMenus() : any {
            return this.store.workType;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            for(let i = 0;i < this.store.project.length;i++) {
                if(this.store.uplodId.filter(a => a.project_id == this.store.project[i].project_id).length > 0){
                    this.$set(this.store.project[i], '_checked', true)
                }
            }
            return this.store.project;
        }
        getPeopleColumns() : any{
            return this.store.peopleColumns;
        }
        getPeopleData() : any{
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peopleId.filter(a => a.eafId == this.store.peoples[i].eafId ).length > 0){
                    this.$set(this.store.peoples[i], '_checked', true)
                }
                //peoplesProject
                if(this.store.peoples[i].project_id == this.projectId && this.store.peoples[i].leave == 1){
                    this.$set(this.store.peoples[i], '_disabled', true)
                }
            }

            return this.store.peoples;
        }
        onPageSizeInChange(pageSize){
            this.store.setInPageSize(pageSize);
            this.store.setInPageIndex(1);
            this.onPageIndexInChange(1);
        }
        onPageIndexInChange(pageIndex){
            this.store.setInPageIndex(pageIndex);
            this.store.searchPeople();
        }
        set selectUserName(data:string){
            this.store.setSelectUserName(data);
        }
        get selectUserName():string{
            return this.store.selectUserName;
        }

        set pageInTotal(data:number){
            this.store.setInPageTotal(data);
        }
        get pageInTotal():number{
            return this.store.pageInTotal;
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
            this.store.status(data);
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
            if(!data) {
                this.store.selectStatus(0);
                return;
            }
            this.store.selectStatus(data);
        }
}
</script>
<style scoped src="@/styles/project.css" />
<template lang="pug" src="@/views/project.pug" />
