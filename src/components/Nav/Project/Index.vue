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
        loading = true;
        public store: any;

        private subCompanyList :Array<any>;
        private showProject: boolean;
        private addUnit: boolean;
        private addProject: boolean;
        private deleteCompany: boolean;

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
            this.store = getModule(ProjectStore);
            this.subCompanyList = [];
            this.showProject = false;
            this.addUnit = false;
            this.addProject = false;
            this.deleteCompany = false;
        }
        mounted() {
            this.store.getCompany("");
            this.store.getCompanyList();

        }
        getProjectList(){
            return this.store.companyList;
        }
        loadData (item, callback) {
            this.store.getCompany(item.id);
            setTimeout(() => {
                callback(this.store.subCompanyList);
            }, 1000);
        }
        set pullDown(data: boolean){
            this.store.setPullDown(data);
        }
        get pullDown(): boolean{
            return this.store.pullDown;
        }
        switchTo(){
            this.store.switchPullDown();

        }
        treeChange(checkedList,checked){
            this.store.setUploadPid(checked.id);
            this.store.setDeleteCompanyId(checked.id);
            if(checked.type=="project"){
                this.showProject = true;
                this.store.setSelectProjectName(checked.title);
                this.store.getProjectParticulars();
            }
        }
        clickAddUnit(){
            this.store.getUnitTypeList();
            this.addUnit = true;
        }
        getCompanyList(){
            return this.store.companyProjectList;
        }
        addUnitOk(){
            if(!this.store.insertUnitName){
                this.messageWarningFn("请输入单位名称！");
                return;
            }
            if(!this.store.insertUnitType){
                this.messageWarningFn("请选择单位类型！");
                return;
            }
            if(!this.store.insertUnitProjectLicense){
                this.messageWarningFn("请输入信用代码！");
                return;
            }
            if(!this.store.insertUnitPrincipal){
                this.messageWarningFn("请输入法人代表！");
                return;
            }
            if(!this.store.insertUnitAddress){
                this.messageWarningFn("请输入单位地址！");
                return;
            }
            this.store.insertUnit();
        }
        addUnitCancel(){
            this.addUnit = false;
        }
        getUnitTypeList(){
            return this.store.unitTypeList;
        }

        set insertPid(data: string){
            this.store.setInsertPid(data);
        }
        get insertPid(): string{
            return this.store.insertPid;
        }
        set insertUnitName(data: string){
            this.store.setInsertUnitName(data);
        }
        get insertUnitName(): string{
            return this.store.insertUnitName;
        }
        set insertUnitLicense(data: string){
            this.store.setInsertUnitLicense(data);
        }
        get insertUnitLicense(): string{
            return this.store.insertUnitLicense;
        }
        set insertUnitType(data: number){
            this.store.setInsertUnitType(data);
        }
        get insertUnitType(): number{
            return this.store.insertUnitType;
        }
        set insertUnitPrincipal(data: string){
            this.store.setInsertUnitPrincipal(data);
        }
        get insertUnitPrincipal(): string{
            return this.store.insertUnitPrincipal;
        }
        set insertUnitAddress(data: string){
            this.store.setInsertUnitAddress(data);
        }
        get insertUnitAddress(): string{
            return this.store.insertUnitAddress;
        }
        clickAddProject(){
            this.store.getProjectStatusList();
            this.addProject = true;
        }
        addProjectOk(){
            if(!this.store.insertProjectName){
                this.messageWarningFn("请输入工程名称！");
                return;
            }
            if(!this.store.insertProjectBrief){
                this.messageWarningFn("请输入工程简称！");
                return;
            }
            if(!this.store.insertProjectBuilderLicense){
                this.messageWarningFn("请输入施工许可证！");
                return;
            }
            if(!this.store.insertProjectStatus){
                this.messageWarningFn("请选择状态！");
                return;
            }
            if(!this.store.insertProjectStartTime){
                this.messageWarningFn("请选择开工时间！");
                return;
            }
            if(!this.store.insertProjectEndTime){
                this.messageWarningFn("请选择合同竣工时间！");
                return;
            }
            if(!this.store.insertProjectAddress){
                this.messageWarningFn("请输入工程地址！");
                return;
            }
            this.store.insertProject();
        }
        addProjectCancel(){
            this.addProject = false;
        }
        getProjectStatusList(){
            return this.store.projectStatusList;
        }

        set insertProjectPid(data: string){
            this.store.setInsertProjectPid(data);
        }
        get insertProjectPid(): string{
            return this.store.insertProjectPid;
        }
        set insertProjectName(data: string){
            this.store.setInsertProjectName(data);
        }
        get insertProjectName(): string{
            return this.store.insertProjectName;
        }
        set insertProjectBrief(data: string){
            this.store.setInsertProjectBrief(data);
        }
        get insertProjectBrief(): string{
            return this.store.insertProjectBrief;
        }
        set insertProjectStatus(data: string){
            this.store.setInsertProjectStatus(data);
        }
        get insertProjectStatus(): string{
            return this.store.insertProjectStatus;
        }
        set insertProjectBuilderLicense(data: string){
            this.store.setInsertProjectBuilderLicense(data);
        }
        get insertProjectBuilderLicense(): string{
            return this.store.insertProjectBuilderLicense;
        }

        set insertProjectAddress(data: string){
            this.store.setInsertProjectAddress(data);
        }
        get insertProjectAddress(): string{
            return this.store.insertProjectAddress;
        }

        set insertProjectStartTime(data: Date){
            this.store.setInsertProjectStartTime(data);
        }
        get insertProjectStartTime(): Date{
            return this.store.insertProjectAddress;
        }
        set insertProjectEndTime(data: Date){
            this.store.setInsertProjectEndTime(data);
        }
        get insertProjectEndTime(): Date{
            return this.store.insertProjectEndTime;
        }
        clickUploadProjectCompany(){
            debugger
            if(!this.store.uploadPid){
                let alert: any = Message;
                alert.warning("请选择要导出的数据！");
            }else{
                this.store.uploadProjectCompany();
            }

        }
        clickDeleteProjectCompany(){
            if(!this.store.deleteCompanyId){
                let alert: any = Message;
                alert.warning("请选择要删除的数据！");
            }else{
                this.deleteCompany = true;
            }
        }
        deleteCompanyOk(){
            this.store.deleteProjectCompanyId();
            this.deleteCompany = false;
        }
        deleteCompanyCancel(){
            this.deleteCompany = false;
        }
    }
</script>
<style scoped src="@/styles/project.css" />
<template lang="pug" src="@/views/project.pug" />
