<script lang="ts">
    import "@/assets/css/common.css";
    import WorkerStore from '../../../store/modules/WorkerStore';
    import CommentsStore from '../../../store/modules/CommentsStore';
    import ProjectStore from '../../../store/modules/ProjectStore';
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
        private projectStore: any;

        private addUser: boolean;
        public particulars: boolean;

        private storeComm: any;
        private checkedList : Array<any>;

        public sex: string;
        public now: Date;
        public year :any;
        public date:any;

        public onUpload:boolean;
        public onUploadIdCardFront:boolean;
        public onUploadIdCardReverse:boolean;
        public onUploadCertificate:boolean;

        public importSalary:boolean;
        public statisticalWork:boolean;
        public statisticalWorkInfo:boolean;
        public repeatPersonnel:boolean;

        constructor() {
            super();
            this.store = getModule(WorkerStore);
            this.storeComm = getModule(CommentsStore);
            this.projectStore = getModule(ProjectStore);
            this.checkedList = [];
            this.addUser = false;
            this.particulars = false;
            this.onUpload = false;
            this.onUploadIdCardFront = false;
            this.onUploadIdCardReverse = false;
            this.onUploadCertificate = false;
            this.importSalary = false;
            this.statisticalWork = false;
            this.statisticalWorkInfo = false;
            this.repeatPersonnel = false;

        }
        mounted() {
           this.store.searchUserList();     //人员列表
           this.store.searchProjectList();  //项目列表

           this.store.searchWorkTypeList();  //工种列表
           this.store.searchUnitList();  //参建单位列表

            this.projectStore.getCompany("");
            this.projectStore.getCompanyList();
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

        okUpdateUpload(){
            this.store.updateHead();
            this.onUpload = false;
            this.particulars = false;
        }
        cancelUpdateUpload(){
            this.store.setUpdatePhoto(null);
            this.onUpload = false;
        }
        getCompanyList(){
            return this.projectStore.companyProjectList;
        }
        set selectParentName(data: string){
            this.store.setSelectParentName(data);
        }
        get selectParentName(): string{
            return this.store.selectParentName;
        }

        set selectProjectId(data: string){
            this.store.setSelectProjectId(data);
        }
        get selectProjectId(): string{
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
        clearSelectParentName(){
            this.store.setSelectParentName(null);
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
        checked(sex){
            this.store.setSelectSex(sex);
        }
        checkedAddUser(){
            this.addUser = !this.addUser;
        }
        viewData(id,idNum) {
            this.particulars=!this.particulars;
            this.store.setSelectUserId(id);
            this.store.searchUserInfo();
            this.store.getEvaluateList();


            // this.store.setInfoId(id);
            // this.store.setInfoIdNumber(idNum);
            //
            // this.store.searchInfo();
            // this.store.searchInvolvedProject();
            // this.store.selectCultivate();
            // this.store.selectCheckWorkce();
            // this.store.selectCheckWorkceMonth();
            // this.store.selectSalary();
            // this.store.selectComments();
            //
            //
            // this.storeComm.setPunishmentsId(id);
            // this.storeComm.searchCommentSparticulars();
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
            // return Math.floor((this.year)/(1000*60*60*24));
            return Math.floor((this.year-this.date)/(1000*60*60*24*31*12));
        }
        getInvolvedProjectList():any{
            return this.store.involvedProjectInfo;
        }
        getCultivateList():any{
            return this.store.cultivateList;
        }
        getCommentSparticularsList():any{
            return this.storeComm.commentSparticularsList;
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
        set inPageTotal(data:number){
            this.store.setInPageTotal(data);
        }
        get inPageTotal():number{
            return this.store.inPageTotal;
        }
        particularsOk() : any{
            this.particulars = false;
        }
        particularsCancel():any {
            this.particulars = false;
        }
        getDateFormat (d: number) : string {
            let date = new Date(d);
            return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        }
        onUploadHead(){
            this.onUpload = true;
        }
        handleSuccessUpdatePhoto (res, file) {
            this.store.setUpdatePhoto(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }

        handleSuccessIdCardfront (res, file) {
            this.store.setInsertIdCardFront(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }
        handleSuccessIdCardReverse (res, file) {
            this.store.setInsertIdCardReverse(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }
        handleSuccessCertificate (res, file) {
            this.store.setInsertCertificate(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }
        handleSuccessContract (res, file) {
            this.store.setInsertServiceContract(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.error(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        //新增
        addWorker(){
            this.addUser = true;
        }
        okAddUser(){
            this.addUser = false;
            this.store.insertUser();
        }
        cancelAddUser(){
            this.addUser = false;
        }
        handleSuccessPhoto (res, file) {
            this.store.setInsertPhoto(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }
        set insertUserName(data:string){
            this.store.setInsertUserName(data);
        }
        get insertUserName():string{
            return this.store.insertUserName;
        }
        set insertUnitId(data:string){
            this.store.setInsertUnitId(data);
        }
        get insertUnitId():string{
            return this.store.insertUnitId;
        }
        set insertProjectId(data:string){
            this.store.setInsertProjectId(data);
        }
        get insertProjectId():string{
            return this.store.insertProjectId;
        }
        set insertWorkType(data:string){
            this.store.setInsertWorkType(data);
        }
        get insertWorkType():string{
            return this.store.insertWorkType;
        }
        set insertStartTime(data:string){
            this.store.setInsertStartTime(data);
        }
        get insertStartTime():string{
            return this.store.insertStartTime;
        }
        set insertEndTime(data:string){
            this.store.setInsertEndTime(data);
        }
        get insertEndTime():string{
            return this.store.insertEndTime;
        }
        set insertPhone(data:string){
            this.store.setInsertPhone(data);
        }
        get insertPhone():string{
            return this.store.insertPhone;
        }
        set insertIdNum(data:string){
            this.store.setInsertIdNum(data);
        }
        get insertIdNum():string{
            return this.store.insertIdNum;
        }
        handleSuccessUploadIdCardFront (res, file) {
            this.store.setAmendIdCardFront(res.file);
        }
        uploadIdCardFront(){
            this.onUploadIdCardFront = true;
        }
        okUploadIdCardFront(){
            this.store.updateIdCardFront();
            this.onUploadIdCardFront = false;
            this.particulars = false;
        }
        cancelUploadIdCardFront(){
            this.onUploadIdCardFront = false;
        }
        handleSuccessUploadIdCardReverse (res, file) {
            this.store.setAmendIdCardReverse(res.file);
        }
        uploadIdCardReverse(){
            this.onUploadIdCardReverse = true;
        }

        okUploadIdCardReverse(){
            this.onUploadIdCardReverse = false;
            this.particulars = false;
            this.store.updateIdCardReverse();

        }
        cancelUploadIdCardReverse(){
            this.onUploadIdCardReverse = false;
        }

        handleSuccessUploadCertificate (res, file) {
            this.store.setAmendCertificate(res.file);
        }
        //导出
        uploadCertificate(){
            this.onUploadCertificate = true;
        }
        okUploadCertificate(){
            this.particulars = false;
            this.onUploadCertificate = false;
            this.store.updateCertificate();
        }
        cancelUploadCertificate(){
            this.onUploadCertificate = false;
        }
        handleSelectRow(selection, row) {
            let item = {};
            item["id"] = row.id;
            this.store.setUploadIdList(item);

        }
        handleSelectRowCancel(selection,row){
            for(let i = 0;i < this.store.userList.length;i++) {
                if(this.store.tableData.filter(a => a.id == row.id ).length > 0){
                    this.$set(this.store.userList[i], '_checked', false)
                }
            }
            let index =  this.store.uploadIdList.findIndex(x => x.id == row.id);
            this.store.uploadIdList.splice(index, 1);
        }
        handleSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                let item = {};
                let row = selection[i];
                let index =  this.store.uploadIdList.findIndex(x => x.id == row.id);
                if(index > -1){
                    continue;
                }
                item["id"] = row.id;
                this.store.setUploadIdList(item);
            }
        }
        handleSelectAllCancel(selection){
            for(let i = 0;i < this.store.userList.length;i++) {
                if(this.store.uploadIdList.findIndex(x => x.id == this.store.userList[i].id) > -1){
                    let index =  this.store.uploadIdList.findIndex(x => x.id == this.store.userList[i].id);
                    this.$set(this.store.userList[i], '_checked', false);
                    this.store.uploadIdList.splice(index, 1);
                }
            }
        }
        uploadWorker(){
            this.store.uploadUser();
        }
        //导入薪资
        clickImportSalary(){
            this.importSalary = true;
        }
        okImportSalary(){
            this.importSalary = false;
        }
        cancelImportSalary(){
            this.importSalary = false;
        }
        handleSuccessExcel (res, file) {
            if(res.status == 0){
                let alert: any = Message;
                alert.success('上传成功！');
                this.store.search();
            }
        }
        handleFormatErrorExcel (file) {
            let alert: any = Message;
            alert.error(file.name + ' 文件格式错误！xls、xlsx格式文件！');
        }

        //统计工种
        clickStatisticalWork(){
            this.statisticalWork = true;
            this.store.statisticalWork();
        }
        cancelstatisticalWork(){
            this.statisticalWork = false;
        }
        clickSelectStatisticalWork(){
            this.store.statisticalWork();
        }
        set selectStatisticalWorkType(data:string){
            this.store.setSelectStatisticalWorkType(data);
        }
        get selectStatisticalWorkType():string{
            return this.store.selectStatisticalWorkType;
        }
        clickStatisticalWorkInfo(workType){
            this.statisticalWorkInfo = true;
            this.store.setSelectWorkTypeInfo(workType);
            this.store.statisticalWorkInfo();
        }
        cancelStatisticalWorkInfo(){
            this.statisticalWorkInfo = false;
        }

        //筛重
        clickRepeatPersonnel(){
            this.repeatPersonnel = true;
            this.store.getRepeatPersonnelList();
        }
        cancelRepeatPersonnel(){
            this.repeatPersonnel = false;
        }
    }
</script>
<style scoped src="@/styles/worker.css" />
<template lang="pug" src="@/views/worker.pug" />
