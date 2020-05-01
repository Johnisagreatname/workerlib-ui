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
        private loading = false;
        public store: any;

        private subCompanyList :Array<any>;
        private showProject: boolean;
        private addProject: boolean;

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
            this.addProject = false;
        }
        mounted() {
            this.store.getCompany("");

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
            if(checked.type=="project"){
                this.showProject = true;
                this.store.setSelectProjectName(checked.title);
                this.store.getProjectParticulars();
            }
        }
        clickAddProject(){
            this.store.getCompanyList();
            this.store.getUnitTypeList();
            this.addProject = !this.addProject;
        }
        getCompanyList(){
            return this.store.companyProjectList;
        }
        addProjectOk(){
            if(!this.store.insertUnitName){
                this.messageWarningFn("请输入单位名称！");
                return;
            }
            if(!this.store.insertUnitType){
                this.messageWarningFn("请选择单位类型！");
                return;
            }
            if(!this.store.insertProjectLicense){
                this.messageWarningFn("请输入信用代码！");
                return;
            }
            if(!this.store.insertPrincipal){
                this.messageWarningFn("请输入法人代表！");
                return;
            }
            if(!this.store.insertAddress){
                this.messageWarningFn("请输入单位地址！");
                return;
            }
            this.store.insertUnit();
        }
        addProjectCancel(){

        }
        getUnitTypeList(){
            return this.store.unitTypeList;
        }

        set insertPid(data: boolean){
            this.store.setInsertPid(data);
        }
        get insertPid(): boolean{
            return this.store.insertPid;
        }
        set insertUnitName(data: boolean){
            this.store.setInsertUnitName(data);
        }
        get insertUnitName(): boolean{
            return this.store.insertUnitName;
        }
        set insertProjectLicense(data: boolean){
            this.store.setInsertProjectLicense(data);
        }
        get insertProjectLicense(): boolean{
            return this.store.insertProjectLicense;
        }
        set insertUnitType(data: boolean){
            this.store.setInsertUnitType(data);
        }
        get insertUnitType(): boolean{
            return this.store.insertUnitType;
        }
        set insertPrincipal(data: boolean){
            this.store.setInsertPrincipal(data);
        }
        get insertPrincipal(): boolean{
            return this.store.insertPrincipal;
        }
        set insertAddress(data: boolean){
            this.store.setInsertAddress(data);
        }
        get insertAddress(): boolean{
            return this.store.insertAddress;
        }
    }
</script>
<style scoped src="@/styles/project.css" />
<template lang="pug" src="@/views/project.pug" />
