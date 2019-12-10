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
        constructor() {
            super();
            this.store = getModule(CommentsStore)
            this.addCommtent = false;
            this.commtentcInfo = false;

        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;

        mounted() {
            this.store.search();
            this.store.commentType();
        }

        commentsExport() :any{
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
        addCommtentlist(id) : any {
            this.store.setArchivesId(id);
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

        get totalRecords(){
            return this.store.pageInfo.totalRecords;
        }

        details(id): any {
            this.commtentcInfo =! this.commtentcInfo
            this.store.dialog(id)
        }
        ok() : any{
            this.store.addAppraise();
            this.addCommtent = false;
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
            this.store.setAppraise_time(data);
        }
        get punishment_id():number{
            return this.store.appraiseInfo.punishment_id;
        }
        set punishment_id(data:number){
            this.store.setPunishment_id(data);
        }
        get archives_id():number{
            return this.store.appraiseInfo.archives_id;
        }
        set archives_id(data:number){
            this.store.setArchives_id(data);
        }
    }
</script>
<style scoped src="@/styles/comments.css" />
<template lang="pug" src="@/views/comments.pug" />
