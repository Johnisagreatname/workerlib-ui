<script lang="ts">
    import "@/assets/css/common.css";
    import WorkerStore from '../../../store/modules/WorkerStore';
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
        loading = true;
        private store: any;
        public addWorker: boolean;
        public particulars: boolean;
        public onLeave: boolean;
        public certificate: boolean;
        private checkeds: Array<any>;
        private sex: string;
        private options!: any;
        private now: Date;
        private year :any;
        private date:any;
        constructor() {
            super();
            this.store = getModule(WorkerStore)
            this.addWorker = false;
            this.particulars = false;
            this.certificate = false;
            this.checkeds = new Array();
            this.onLeave = false;
        }

        mounted() {
            this.store.search();
            this.store.getProjectType();
            this.store.selectProject();
        }
        handleSuccessPhoto (res, file) {
            this.store.setPhoto(res.file);
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        handleSuccessIdCardfront (res, file) {
            this.store.setIdCardfront(res.file);
        }

        handleSuccessIdCardReverse (res, file) {
            this.store. setIdCardReverse(res.file);
        }

        handleSuccessCertificate (res, file) {
            this.store. setCertificate(res.file);
        }
        getPeopleList():any{
            return this.store.peoples;
        }
        selectUnit(){
            this.store.selectUnit();
        }
        getUnitList():any{
            return this.store.unitList;
        }
        getProjectList():any{
            return this.store.projectList;
        }
        getInvolvedProjectList():any{
            return this.store.involvedProjectInfo;
        }

        getDateFormat (d: number) : string {
            let date = new Date(d);
            return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        }

        viewData(id) {
            this.particulars=!this.particulars;
            this.store.setInfoId(id);
            this.store.searchInfo();
            this.store.searchInvolvedProject();
        }
        checkLeave() {
            this.onLeave=!this.onLeave;

        }

        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '在职', key: 1 },
                {value: '离职', key: 2 }

            ];

            return this.options;
        }

        handleCreate (type) {
            this.getType().push({
                value: type,
                label: type
            });
        }
        getType(){
            return this.store.projectType
        }
        //获取性别
        checkSex(idNumber): boolean {
            if(!idNumber) return;
            this.sex = idNumber.substring(16,17);
            if(this.sex=="1"||this.sex=="3"||this.sex=="5"||this.sex=="7"||this.sex=="9"){
                 return true;
            }else {
                return false;
            }
        }
        //获取年龄
        getAge(idNumber): number{
            if(!idNumber) return;
            this.now = new Date();
            this.year = this.now.getTime();
            this.date = new Date(idNumber.substring(6,10)+","+idNumber.substring(10,12)+","+idNumber.substring(12,14)).getTime();
            return Math.floor((this.year-this.date)/(1000*60*60*24*31*12));
        }
        messageWarningFn (text) {
            let alert: any = Message;
            alert.warning(text);
            setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                })
            }, 500)
        }
        ok() : any{
            // if(this.store.userName == "" || this.store.userName == null ){
            //     debugger
            //     this.messageWarningFn('请输入名称');
            //     return;
            // }
            this.store.insertArchives();
            this.addWorker = false;
        }
        cancel():any {
            this.addWorker = false;
        }
        particularsOk() : any{
            this.particulars = false;
        }
        particularsCancel():any {
            this.particulars = false;
        }
        certificateOpen():any {
            this.particulars = false;
            this.certificate=true;
        }
        certificateOk() : any{
            this.certificate = false;
            this.particulars = true;
        }
        certificateCancel():any {
           this.certificate = false;
           this.particulars = true;
        }

        onCheck(id: number,name:string): void {
            var item = {};
            if(this.checkeds.findIndex(x => x.id === id) > -1) {
                let index = this.checkeds.findIndex(x => x.id === id);
                this.checkeds.splice(index, 1);
                debugger
                return;
            }
            item['id'] = id;
            item['name'] = name;
            this.checkeds.push(item);
        }

        isChecked(id): boolean {
            if(this.checkeds.find(x => x.id === id)){
                return true;
            }

            return false;
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

        set infoId(data:number){
            this.store.setInfoId(data);
        }
        get infoId():number{
            return this.store.infoId;
        }
        set userName(data:string){
            this.store.setUserName(data);
        }
        get userName():string{
            return this.store.userName;
        }

        set card(data:string){
            this.store.setCard(data);
        }
        get card():string{
            return this.store.card;
        }

        set phone(data:number){
            this.store.setPhone(data);
        }
        get phone():number{
            return this.store.phone;
        }

        set type(data:number){
            this.store.setType(data);
        }
        get type():number{
            return this.store.type;
        }

        set project(data:string){
            this.store.setProject(data);
        }
        get project():string{
            return this.store.project;
        }

        set projectId(data:number){
            this.store.setProjectId(data);
        }
        get projectId():number{
            return this.store.projectId;
        }
        set unitId(data:number){
            this.store.setUnitId(data);
        }
        get unitId():number{
            return this.store.unitId;
        }
        set unit(data:string){
            this.store.setUnit(data);
        }
        get unit():string{
            return this.store.unit;
        }

        set animal(data:string){
            this.store.setAnimal(data);
        }
        get animal():string{
            return this.store.animal;
        }

        set startTime(data:Date){
            this.store.setStartTime(data);
        }
        get startTime():Date{
            return this.store.startTime;
        }

        set endTime(data:string){
            this.store.setEndTime(data);
        }
        get endTime():string{
            return this.store.endTime;
        }

        set pageTotal(data:number){
            this.store.setPageToatl(data);
        }
        get pageTotal():number{
            return this.store.pageTotal;
        }

        set inPageTotal(data:number){
            this.store.setInPageTotal(data);
        }
        get inPageTotal():number{
            return this.store.inPageTotal;
        }

        set selectProjectName(data:string){
            this.store.setSelectProjectName(data);
        }
        get selectProjectName():string{
            return this.store.selectProjectName;
        }
        set selectContractors(data:string){
            this.store.setSelectContractors(data);
        }
        get selectContractors():string{
            return this.store.selectContractors;
        }
        set selectUserName(data:string){
            this.store.setSelectUserName(data);
        }
        get selectUserName():string{
            return this.store.selectUserName;
        }
        set selectType(data:string){
            this.store.setSelectType(data);
        }
        get selectType():string{
            return this.store.selectType;
        }
        set selectStatus(data:number){
            this.store.setSelectStatus(data);
        }
        get selectStatus():number{
            return this.store.selectStatus;
        }
        set photo(data:string){
            this.store.setPhoto(data);
        }
        get photo():string{
            return this.store.photo;
        }

        set idCardfront(data:string){
            this.store.setIdCardfront(data);
        }
        get idCardfront():string{
            return this.store.idCardfront;
        }

        set idCardReverse(data:string){
            this.store.setIdCardReverse(data);
        }
        get idCardReverse():string{
            return this.store.idCardReverse;
        }

        set certificates(data:string){
            this.store.setCertificate(data);
        }
        get certificates():string{
            return this.store.certificate;
        }

        set grade(data:string){
            this.store.setGrade(data);
        }
        get grade():string{
            return this.store.grade;
        }
}
</script>
<style scoped src="@/styles/worker.css" />
<template lang="pug" src="@/views/worker.pug" />
