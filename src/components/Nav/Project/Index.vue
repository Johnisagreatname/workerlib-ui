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
        public viewProjectPeople: boolean;
        public selectWorkType:Array<any>;
        public noProjectPeople:Array<any>;
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
            this.noProjectPeople = [];
            this.viewPeoples = false;
            this.viewProjectPeople = false;
            this.store = getModule(ProjectStore);

        }
        loading = true;
        mounted() {
            this.store.getWorkType();
            this.store.search();
            this.store.getProjectType();
            this.store.searchProjectPeople();
        }
        search() {
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
            debugger
            let list = this.store.projectPeoples.filter(a => a.project_id ==this.store.projectId && a.leave == 1).map(b=>b.archives_id);
            let lList = this.store.projectPeoples.filter(a => a.project_id ==this.store.projectId && a.leave == 2);
            this.noProjectPeople = this.store.peopleId.filter(a=>list.indexOf(a.eafId)>-1);
            if(!this.noProjectPeople.length) {
                for(let i = 0;i<this.store.peopleId.length;i++){
                    let insert = {};
                    let people = this.store.peopleId[i];
                    if(lList.filter(x => x.archives_id == people.eafId).length>0) {
                        this.store.setUpdateList(lList.filter(x => x.archives_id == people.eafId)[0].id);
                    }else {
                        if(this.selectWorkType.filter(x => x.eafId ==  people.eafId).length>0){
                            insert["work_type"] = this.selectWorkType.filter(x => x.eafId ==  people.eafId)[0].work_type;
                        }else {
                            insert["work_type"] = null;
                        }

                        insert["project_id"] = this.store.projectId;
                        insert["archives_id"] = people.eafId;

                        insert["unit_id"] = people.unit_id;
                        insert["leave"] = 1;
                        this.store.setInsertList(insert);
                    }
                }
                if(this.store.insertList.length>0){
                    this.store.insert();
                }
                if(this.store.updateList.length>0){
                    this.store.setLeave(1);
                    this.store.update();
                }
                this.store.clearUpdateList();
                this.addPeoples = false;
            }else {
                setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    })
                }, 1000)
                this.viewProjectPeople = true;
            }
        }
        updatePeople() : any{
            for(let i = 0;i<this.store.checkeds.length;i++){
                this.store.setUpdateList(this.store.checkeds[i].id);
            }
            this.store.setLeave(2);
            this.store.update();
            this.viewPeoples = false;
        }
        cancelAdd():any {
            this.addPeoples = false;
        }
        okView():any{
            this.store.clearUpdateList();
            this.viewPeoples = false;
        }
        cancelView():any {
            this.store.clearUpdateList();
            this.viewPeoples = false
        }
        okProjectPeople():any{
            this.viewProjectPeople = false
        }
        cancelProjectPeople():any {
            this.viewProjectPeople = false
        }

        change(name){
            this.store.setProjectId( name.split('_')[1]);
            if(name.split('_')[0] == 'add') {
                this.store.searchPeople();

                this.addPeoples = true;
            }else {
                this.store.setViewProjectId(this.store.projectId);
                this.store.searchViewPeople();
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
            this.store.setUplodId(item);

        }
        handleSelectRowCancel(selection,row){

            let index =  this.store.uplodId.findIndex(x => x.project_id == row.project_id);
            this.store.uplodId.splice(index, 1);
        }
        handleSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                let item = {};
                let row = selection[i];
                let index =  this.store.uplodId.findIndex(x => x.project_id == row.project_id);
                if(index > -1){
                    continue;
                }
                item["project_id"] = row.project_id;
                this.store.setUplodId(item);
            }
        }
        handleSelectAllCancel(selection){
            for(let i = 0;i < this.store.project.length;i++) {
                if(this.store.uplodId.findIndex(x => x.project_id == this.store.project[i].project_id) > -1){
                    let index =  this.store.uplodId.findIndex(x => x.project_id == this.store.project[i].project_id);
                    this.$set(this.store.project[i], '_checked', false);
                    this.store.uplodId.splice(index, 1);
                }

            }
        }
        getData() : any{
            for(let i = 0;i < this.store.project.length;i++) {
                if(this.store.uplodId.filter(a => a.project_id == this.store.project[i].project_id).length > 0){
                    this.$set(this.store.project[i], '_checked', true)
                }
            }
            return this.store.project;
        }
        getPeopleData() : any{
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peopleId.filter(a => a.eafId == this.store.peoples[i].eafId ).length > 0){
                    this.$set(this.store.peoples[i], '_checked', true)
                }
            }
            return this.store.peoples;
        }
        getViewPeoples(): any{
            for(let i = 0;i < this.store.viewPeople.length;i++) {
                if(this.store.checkeds.filter(a => a.archives_id == this.store.viewPeople[i].archives_id ).length > 0){
                    this.$set(this.store.viewPeople[i], '_checked', true)
                }
            }
            return this.store.viewPeople;
        }
        handleSelectRowPeople(selection, row) {
            let item = {};
            item["eafId"] = row.eafId;
            item["eafName"] = row.eafName;
            this.store.setPeoplesId(item);
        }
        handleSelectRowCancelPeople(selection,row){
            let index =  this.store.peopleId.findIndex(x => x.eafId == row.eafId);
            this.store.peopleId.splice(index, 1);
            console.log(this.store.peopleId)
        }
        handleSelectAllPeople(selection) {
            for(let i= 0;i<selection.length;i++){
                let item = {};
                let row = selection[i];
                let index =  this.store.peopleId.findIndex(x => x.eafId == row.eafId);
                if(index > -1){
                    continue;
                }
                item["eafId"] = row.eafId;
                item["eafName"] = row.eafName;
                this.store.setPeoplesId(item);
            }
        }
        handleSelectAllCancelPeople(selection){
            for(let i = 0;i < this.store.peoples.length;i++) {
                if(this.store.peopleId.findIndex(x => x.eafId == this.store.peoples[i].eafId) > -1){
                    let index =  this.store.peopleId.findIndex(x => x.eafId == this.store.peoples[i].eafId);
                    this.$set(this.store.peoples[i], '_checked', false);
                    this.store.peopleId.splice(index, 1);
                }

            }
            console.log(this.store.peopleId)
        }

        handleSelectRowProject(selection, row) {
            let item = {};
            item["archives_id"] = row.archives_id;
            item["eafName"] = row.eafName;
            item["project_id"] = row.project_id;
            item["id"] = row.id;
            this.store.setChecked(item);
            console.log(this.store.checkeds)
        }
        handleSelectRowCancelProject(selection,row){
            let index =  this.store.checkeds.findIndex(x => x.id == row.id);
            this.store.checkeds.splice(index, 1);
            console.log(this.store.checkeds)
        }
        handleSelectAllProject(selection) {
            debugger
            for(let i= 0;i<selection.length;i++){
                let item = {};
                let row = selection[i];
                let index =  this.store.checkeds.findIndex(x => x.id == row.id);
                if(index > -1){
                    continue;
                }
                item["id"] = row.id;
                item["archives_id"] = row.archives_id;
                item["eafName"] = row.eafName;
                item["project_id"] = row.project_id;
                this.store.setChecked(item);
            }
            console.log(this.store.checkeds)
        }
        handleSelectAllCancelProject(selection){
            debugger
            for(let i = 0;i < this.store.viewPeople.length;i++) {
                if(this.store.checkeds.findIndex(x => x.id == this.store.viewPeople[i].id) > -1){
                    let index =  this.store.checkeds.findIndex(x => x.id == this.store.viewPeople[i].id);
                    this.$set(this.store.viewPeople[i], '_checked', false);
                    this.store.checkeds.splice(index, 1);
                }

            }
            console.log(this.store.checkeds)
        }


        selectChange(list) {
            if (list) {
                let item = {};
                let work = [];
                this.selectWorkType = new Array<any>();
                for(let i=0;i<list.length;i++){
                    let name = list[i];
                    work.push(name.split('_')[0]);
                }
                item["eafId"] = list[0].split('_')[1];
                item["work_type"] = work.join(",");
                this.selectWorkType.push(item);
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
        getUserWorkTypeMenus(workType) : any {
            if(!workType){
                return new Array();
            }
            let workTypeList = workType.split(",");
            let list = this.store.workType.filter(a => workTypeList.indexOf(a.name)>-1);
            if(!list) {
                list = new Array();
            }
            return list;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getPeopleColumns() : any{
            return this.store.peopleColumns;
        }
        getPeopleProjectColumns() : any{
            return this.store.peopleProjectColumns;
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
        onPageSizeProjectChange(pageSize){
            this.store.setProjectPageSize(pageSize);
            this.store.setProjectPageIndex(1);
            this.onPageIndexProjectChange(1);
        }
        onPageIndexProjectChange(pageIndex){
            this.store.setProjectPageIndex(pageIndex);
            this.store.searchViewPeople();
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
        set pageProjectTotal(data:number){
            this.store.setProjectPageTotal(data);
        }
        get pageProjectTotal():number{
            return this.store.pageProjectTotal;
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
