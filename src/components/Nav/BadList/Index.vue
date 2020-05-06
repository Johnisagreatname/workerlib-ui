<script lang="ts">
    import "@/assets/css/common.css";
    import BadListStore from '../../../store/modules/BadListStore';
    import WorkerStore from '../../../store/modules/WorkerStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import {getModule} from "vuex-module-decorators";

    @Component({
    })
    export default class BadList extends Vue {

        private store: any;
        private workStore: any;
        constructor() {
            super();
            this.store = getModule(BadListStore);
            this.workStore = getModule(WorkerStore);
        }

        mounted() {
            this.workStore.searchProjectList();
            this.store.countAppraiseCount();
            this.store.getType();
            this.store.getPunishment();
        }
        countAppraiseCount(){
            this.store.countAppraiseCount();
        }
        set name(data: string){
            this.store.setName(data);
        }
        get name(): string{
            return this.store.name;
        }
        clearName(){
            this.store.setName(null);
        }
        set projectName(data: string){
            this.store.setProjectName(data);
        }
        get projectName(): string{
            return this.store.projectName;
        }
        clearProjectName(){
            this.store.setProjectName(null);
        }
        set workType(data: string){
            this.store.setWorkType(data);
        }
        get workType(): string{
            return this.store.workType;
        }
        clearWorkType(){
            this.store.setWorkType(null);
        }
        set punishmentType(data: string){
            this.store.setPunishmentType(data);
        }
        get punishmentType(): string{
            return this.store.punishmentType;
        }
        clearPunishmentType(){
            this.store.setPunishmentType(null);
        }
        set startTime(data: Date){
            this.store.setStartTime(data);
        }
        get startTime(): Date{
            return this.store.startTime;
        }
        clearStartTime(){
            this.store.setStartTime(null);
        }
        set endTime(data: Date){
            this.store.setEndTime(data);
        }
        get endTime(): Date{
            return this.store.endTime;
        }
        clearEndTime(){
            this.store.setEndTime(null);
        }
        getProjectList(){
            return this.workStore.projectList;
        }
        getWorkTypeList(){
            return this.store.workTypeList;
        }
        getPunishmentList(){
            return this.store.punishmentList;
        }

        set pullDown(data: boolean){
            this.store.setPullDown(data);
        }
        get pullDown(): boolean{
            return this.store.pullDown;
        }
        set pageTotal(data: boolean){
            this.store.setPageTotal(data);
        }
        get pageTotal(): boolean{
            return this.store.pageTotal;
        }
        set pageSize(data: boolean){
            this.store.setUserPageSize(data);
        }
        get pageSize(): boolean{
            return this.store.pageSize;
        }
        set pageIndex(data: boolean){
            this.store.setUserPageIndex(data);
        }
        get pageIndex(): boolean{
            return this.store.pageIndex;
        }

        switchTo(){
            this.store.switchPullDown();
        }
        onPageIndexChange(pageIndex){
            this.store.setUserPageIndex(pageIndex);
            this.store.countAppraiseCount();
        }
        getColumns(){
            return this.store.columns;
        }
        getData(){
            return this.store.tableData;
        }


        handleSelectRow(selection, row) {
            let item = {};
            item["id"] = row.id;
            this.store.setUplodId(item);

        }
        handleSelectRowCancel(selection,row){
            for(let i = 0;i < this.store.tableData.length;i++) {
                if(this.store.tableData.filter(a => a.id == row.id ).length > 0){
                    this.$set(this.store.tableData[i], '_checked', false)
                }
            }
            let index =  this.store.uplodId.findIndex(x => x.id == row.id);
            this.store.uplodId.splice(index, 1);
        }
        handleSelectAll(selection) {
            for(let i= 0;i<selection.length;i++){
                let item = {};
                let row = selection[i];
                let index =  this.store.uplodId.findIndex(x => x.id == row.id);
                if(index > -1){
                    continue;
                }
                item["id"] = row.id;
                this.store.setUplodId(item);
            }
        }
        handleSelectAllCancel(selection){
            for(let i = 0;i < this.store.tableData.length;i++) {
                if(this.store.uplodId.findIndex(x => x.id == this.store.tableData[i].id) > -1){
                    let index =  this.store.uplodId.findIndex(x => x.id == this.store.tableData[i].id);
                    this.$set(this.store.tableData[i], '_checked', false);
                    this.store.uplodId.splice(index, 1);
                }
            }
        }
        clickUpload(){
            this.store.upload();
        }
    }
</script>
<style scoped src="@/styles/badList.css" />
<template lang="pug" src="@/views/badList.pug" />
