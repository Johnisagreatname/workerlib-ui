<script lang="ts">
    import "@/assets/css/common.css";
    import GradeStore from '../../../store/modules/GradeStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import {Message} from "iview";
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
    export default class Grade extends Vue {
        rowClassName (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
        }
        public updateCommentType: boolean;
        public deleteCommentType: boolean;
        public addCommentType: boolean;
        private store: any;
        loading = true;

        constructor() {
            super();
            this.updateCommentType = false;
            this.deleteCommentType = false;
            this.addCommentType = false;
            this.store = getModule(GradeStore);
        }
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
        mounted() {
            this.store.search();
            this.store.searchList();
        }
        change(name){
            if(name.split('_')[0] == 'edit') {
                this.store.setEditId(name.split('_')[1]);
                this.store.searchInfo();
                this.updateCommentType = true;
            }else {
                this.store.setDeleteId(name.split('_')[1]);
                this.deleteCommentType = true;
            }
        }
        ok() : any{
            if(!this.store.addName){
                this.messageWarningFn("请输入等级名称！");
                return;
            }
            if(!this.store.addValue){
                this.messageWarningFn("请输入等级值！");
                return;
            }
            if(this.store.commentList.filter(x => x.name == this.store.addName).length>0){
                this.messageWarningFn("等级名称已存在！");
                return;
            }
            if(this.store.commentList.filter(x => x.value == this.store.addValue).length>0){
                this.messageWarningFn("等级值已存在！");
                return;
            }
            this.store.addCommentType();
            this.addCommentType = false;
        }
        cancel() : any{
            this.addCommentType = false;
        }
        updateOk() : any{
            if(!this.store.editName){
                this.messageWarningFn("请输入等级名称！");
                return;
            }
            if(!this.store.editValue){
                this.messageWarningFn("请输入等级值！");
                return;
            }
            if(this.store.commentList.filter(x => x.name == this.store.editName).length>0){
                this.messageWarningFn("等级名称已存在！");
                return;
            }
            if(this.store.commentList.filter(x => x.value == this.store.editValue).length>0){
                this.messageWarningFn("等级值已存在！");
                return;
            }
            this.store.updateCommentType();
            this.updateCommentType = false;
        }
        updateCancel() : any{
            this.updateCommentType = false;
        }
        deleteOK() : any{
            this.store.deleteCommentType();
            this.deleteCommentType = false;
        }
        deleteCancel() : any{
            this.deleteCommentType = false;
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

        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            return this.store.commentTypeList;
        }
        get pageCount():number{
            return this.store.pageCount;
        }
        set pageCount(data:number){
            this.store.setPageCount(data);
        }
        get pageIndex():number{
            return this.store.pageIndex;
        }
        set pageIndex(data:number){
            this.store.setPageIndex(data);
        }
        get pageSize():number{
            return this.store.pageSize;
        }
        set pageSize(data:number){
            this.store.setPageSize(data);
        }
        get selectName(): string {
            return this.store.selectName;
        }
        set selectName(data: string) {
            this.store.setSelectName(data);
        }
        get addName(): string {
            return this.store.addName;
        }
        set addName(data: string) {
            this.store.setAddName(data);
        }
        get addValue(): number {
            return this.store.addValue;
        }
        set addValue(data: number) {
            this.store.setAddValue(data);
        }
        get editName(): string {
            return this.store.editName;
        }
        set editName(data: string) {
            this.store.setEditName(data);
        }
        get editValue(): number {
            return this.store.editValue;
        }
        set editValue(data: number) {
            this.store.setEditValue(data);
        }

    }
</script>
<style scoped src="@/styles/grade.css" />
<template lang="pug" src="@/views/grade.pug" />
