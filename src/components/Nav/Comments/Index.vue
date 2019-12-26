<script lang="ts">
    import "@/assets/css/common.css";
    import CommentsStore from '../../../store/modules/CommentsStore';
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
    export default class Comments extends Vue {
        vaueCustomText=5;
        vaueCustom=1;
        custom = 5;
        private store: any;
        public addCommtent: boolean;
        public commtentcInfo: boolean;
        public checkedArray: Array<any>;
        public appraiseList: Array<any>;
        public particulars:any;
        constructor() {
            super();
            this.store = getModule(CommentsStore)
            this.addCommtent = false;
            this.commtentcInfo = false;
            this.checkedArray = [];
            this.appraiseList = [];
            this.particulars = {};

        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;

        mounted() {
            this.store.search();
            this.store.commentType();
            this.appraiseList = null;
        }
        loading = true;
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
        getComments() : any{
            return this.store.comments;
        }
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '在场', key: 1 },
                { value: '离场', key: 2 }
            ];
            return this.options;
        }
        getAppraiseList(){
            return this.store.appraiseList;
        }
        getCommentSparticularsList():any{
            return this.store.commentSparticularsList;
        }
        addCommtentlist(id) : any {
            debugger
            this.store.setSelectEafId(id);
            this.store.searchAppraiseList();
            this.store.searchProjectList();
            this.addCommtent = !this.addCommtent;
        }
        getProjectList(){
            return this.store.projectList;
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
        toggle(name){
            if(name=="不良评价"){
                this.store.setInsertType(1);
                this.store.clearInsertDataList();
            }else {
                this.store.clearInsertDataList();
                this.store.searchAppraiseList();
                this.store.setInsertType(2);
            }
        }
        ok() : any{
            if(this.store.insertType == 1){//不良评价
                this.store.insertBadnessAppraise();
            }else {//综合评价
                this.store.insertSynthesizeAppraise();
            }
            this.addCommtent = false;
        }
        cancel():any {
            this.addCommtent = false;

        }
        handleSuccessPhoto (res, file) {
            this.store.setInsertPhoto(res.file);
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        details(id): any {
            debugger
            this.store.setPunishmentsId(id);
            this.particulars = this.store.comments.filter(x => x.eafId == id)[0];
            this.commtentcInfo =! this.commtentcInfo;
            this.store.searchCommentSparticulars();

            // this.store.dialog(archives_id);
            // this.store.comment(archives_id);

        }
        upload():any{
            return this.store.insertPhoto;
        }





        commentsExport() :any{
            this.store.setCheck(this.checkedArray);
            this.store.commentsExport();
        }

        getCommentType() : any {
            return this.store.punishments;
        }

        getObtain() :any{
            return this.store.ups;
        }
        getObtains() :any{
            return this.store.allComm;
        }





        getTime(time: any): any {
            if (time != undefined) {
                let date = new Date(time)
                let newTime = `${date.getFullYear()}-${date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1}-${date.getDate()<10?'0'+date.getDate():date.getDate()}`
                return newTime
            }
        }

        isChecked(id) {
            return this.checkedArray.includes(id)
        }

        clickChecked(id) {
            if (!this.checkedArray.includes(id)) {
                this.checkedArray.push(id)
            } else {
                this.checkedArray.splice(this.checkedArray.indexOf(id), 1)
            }
        }

        okInfo() : any{
            this.commtentcInfo = false;
        }
        cancelInfo():any {
            this.commtentcInfo = false;
        }

        get selectName():string{
            return this.store.selectName;
        }
        set selectName(data:string){
            this.store.setSelectName(data);
        }

        get insertType():number{
            return this.store.insertType;
        }
        set insertType(data:number){
            this.store.setInsertType(data);
        }

        get insertProject():string{
            return this.store.insertProject;
        }
        set insertProject(data:string){
            this.store.setInsertProject(data);
        }

        get insertDescription():string{
            return this.store.insertDescription;
        }
        set insertDescription(data:string){
            this.store.setInsertDescription(data);
        }

        get insertPunishment():string{
            return this.store.insertPunishment;
        }
        set insertPunishment(data:string){
            this.store.setInsertPunishment(data);
        }

        get insertPhoto():string{
            return this.store.insertPhoto;
        }
        set insertPhoto(data:string){
            this.store.setInsertPhoto(data);
        }

        get insertAppraiseTime():Date{
            return this.store.insertAppraiseTime;
        }
        set insertAppraiseTime(data:Date){
            this.store.setInsertAppraiseTime(data);
        }





        get type():number{
            return this.store.appraiseInfo.type;
        }
        set type(data:number){
            this.store.setType(data);
        }
        get description():string{
            return this.store.appraiseInfo.description;
        }
        set description(data:string){
            this.store.setDescription(data);
        }
        get appraise_time():Date{
            return this.store.appraiseInfo.appraise_time;
        }
        set appraise_time(data:Date){
          this.store.setAppraise_time(data);


        }
        get punishment():string{
            return this.store.appraiseInfo.punishment;
        }
        set punishment(data:string){
            this.store.setPunishment(data);
        }
        get archives_id():string{
            return this.store.appraiseInfo.archives_id;
        }
        set archives_id(data:string){
            this.store.setArchives_id(data);
        }

        get appraise_score():number{
            return this.store.appraise_scoreInfo.appraise_score;
        }
        set appraise_score(data:number){
            this.store.setAppraise_score(data);
        }
        get modifyBy():number{
            return this.store.appraise_scoreInfo.modifyBy;
        }
        set modifyBy(data:number){
            this.store.setModifyBy(data);
        }
        get createBy():number{
            return this.store.appraise_scoreInfo.createBy;
        }
        set createBy(data:number){
            this.store.setCreateBy(data);
        }
        get project_name():string{
            return this.store.appraiseInfo.project_name;
        }
        set project_name(data:string){
            this.store.setProject_name(data);
        }
        get project_to_name():string{
            return this.store.appraiseInfo.project_to_name;
        }
        set project_to_name(data:string){
            this.store.setProject_to_name(data);
        }

    }
</script>
<style scoped src="@/styles/comments.css" />
<template lang="pug" src="@/views/comments.pug" />
