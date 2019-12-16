<script lang="ts">
    import "@/assets/css/common.css";
    import CommentsStore from '../../../store/modules/CommentsStore';
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
    export default class Comments extends Vue {
        vaueCustomText=5;
        vaueCustom=1;
        custom = 5;
        private store: any;
        public addCommtent: boolean;
        public commtentcInfo: boolean;
        public checkedArray: Array<any>;
        constructor() {
            super();
            this.store = getModule(CommentsStore)
            this.addCommtent = false;
            this.commtentcInfo = false;
            this.checkedArray = []

        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;

        mounted() {
            this.store.search();
            this.store.commentType();
        }

        commentsExport() :any{
            this.store.setCheck(this.checkedArray);
            this.store.commentsExport();
        }
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '在职', key: 1 },
                { value: '离职', key: 2 }
            ];
            return this.options;
        }
        addCommtentlist(archives_id) : any {
            this.store.setArchivesId(archives_id);
            this.addCommtent = !this.addCommtent;
        }

        getCommentType() : any {
            return this.store.punishments;
        }

        onPageSizeChange(pageSize){

            this.store.pageSize(pageSize);
            this.store.pageIndex(1);
            this.onPageIndexChange(1);
        }

        onPageIndexChange(pageIndex){

            console.log(pageIndex)

            this.store.pageIndex(pageIndex);
            this.store.search();
        }

        getComments() : any{
            return this.store.comments;
        }
        getObtain() :any{
            return this.store.ups;
        }
        getObtains() :any{
            return this.store.allComm;
        }
        get totalRecords(){
            return this.store.pageInfo.totalRecords;
        }

        details(archives_id): any {
            debugger;
            this.commtentcInfo =! this.commtentcInfo
            this.store.dialog(archives_id)
            this.store.comment(archives_id)

        }
        ok() : any{
            if (this.store.appraiseInfo.appraise_time!=null && this.store.appraiseInfo.appraise_time!="" ){
                this.store.addAppraise();
            } else {
                this.store.addAppraises();
            }

            this.addCommtent = false;
        }

        getStat(avg: any): any {
            if (avg === undefined) {
                return 0
            }
            let half = avg - Math.floor(avg) > 0.5;
            if (half) {
                return Math.floor(avg) + 0.5
            } else {
                return Math.floor(avg)
            }
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

        cancel():any {
            this.addCommtent = false;
        }
        okInfo() : any{
            this.commtentcInfo = false;
        }
        cancelInfo():any {
            this.commtentcInfo = false;
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
            debugger;
            if (data != undefined) {
                let time = data;
                let newTime = `${time.getFullYear()}-${time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1}-${time.getDate()<10?'0'+time.getDate():time.getDate()}`
                this.store.setAppraise_time(newTime);
            }

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
        get project():number{
            return this.store.archivesInfo.project;
        }
        set project(data:number){
            this.store.setProject(data);
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
