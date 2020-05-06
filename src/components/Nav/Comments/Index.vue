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
            this.store.getProjectType();
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
        switchTo(){
            this.store.switchPullDown();
        }
        reset(){
            this.store.setSelectWorkType(null);
            this.store.setSelectName(null);
        }
        set pullDown(data: boolean){
            this.store.setPullDown(data);
        }
        get pullDown(): boolean{
            return this.store.pullDown;
        }
        search(){
            this.store.setPageIndex(1);
            this.store.search();
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
                if(!this.store.insertProject){
                    this.messageWarningFn('请输入选择项目！');
                    return;
                }
                if(!this.store.insertDescription){
                    this.messageWarningFn('请输入不良记录评价！');
                    return;
                }
                if(!this.store.insertAppraiseTime){
                    this.messageWarningFn('请选择事件时间！');
                    return;
                }
                if(!this.store.insertPunishment){
                    this.messageWarningFn('请选择处罚类型！');
                    return;
                }
                this.store.insertBadnessAppraise();
            }else {//综合评价

                if(!this.store.insertProject){
                    this.messageWarningFn('请输入选择项目！');
                    return;
                }
                if(!this.store.insertDescription){
                    this.messageWarningFn('请输入评语！');
                    return;
                }
                this.store.insertSynthesizeAppraise();
            }
            this.addCommtent = false;
        }
        cancel():any {
            this.addCommtent = false;

        }
        handleSuccessPhoto (res, file) {
            this.store.setInsertPhoto(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.error(file.name + '文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        details(id): any {
            this.store.setPunishmentsId(id);
            this.particulars = this.store.comments.filter(x => x.eafId == id)[0];
            this.commtentcInfo =! this.commtentcInfo;
            this.store.searchCommentSparticulars();
        }
        upload():any{
            return this.store.insertPhoto;
        }
        clickChecked(id) {

            if(this.store.check.findIndex(x => x==id) > -1) {
                let index = this.store.check.findIndex(x => x==id);
                this.store.check.splice(index, 1);
                return;
            }
            this.store.setCheck(id);

        }
        isChecked(id) {
            if(this.store.check.filter(x => x==id).length>0){
                return true;
            }
            return false;
        }
        commentsExport() :any{
            this.store.upload();
        }

        getCommentType() : any {
            return this.store.punishments;
        }
        okInfo() : any{
            this.commtentcInfo = false;
        }
        cancelInfo():any {
            this.commtentcInfo = false;
        }
        getType(){
            return this.store.projectType.filter(x => x.category === "工种");
        }
        get selectName():string{
            return this.store.selectName;
        }
        set selectName(data:string){
            this.store.setSelectName(data);
        }
        clearSelectName(){
            this.store.setSelectName(null);
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
            debugger
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


        set commGood(data:Date){
            this.store.setCommGood(data);
        }
        get commGood():Date{
            return this.store.commGood;
        }
        set commMiddle(data:Date){
            this.store.setCommMiddle(data);
        }
        get commMiddle():Date{
            return this.store.commMiddle;
        }
        set commBad(data:Date){
            this.store.setCommBad(data);
        }
        get commBad():Date{
            return this.store.commBad;
        }
        set selectWorkType(data:Date){
            this.store.setSelectWorkType(data);
        }
        get selectWorkType():Date{
            return this.store.selectWorkType;
        }
        clearSelectWorkType(){
            this.store.setSelectWorkType(null);
        }




    }
</script>
<style scoped src="@/styles/comments.css" />
<template lang="pug" src="@/views/comments.pug" />
