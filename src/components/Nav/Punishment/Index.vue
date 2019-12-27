<script lang="ts">
    import "@/assets/css/common.css";
    import PunishmentStore from '../../../store/modules/PunishmentStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    // import {Message} from "iview";
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
    export default class Punishment extends Vue {
        public addPunishment: boolean;
        public delPunishment: boolean;
        private store: any;
        private options!: Array<any>;

        constructor() {
            super();
            this.addPunishment = false;
            this.delPunishment = false;
            this.store = getModule(PunishmentStore);
        }

        mounted() {
            this.store.search();
        }
        public search() {
            this.store.search();
        }

        // messageWarningFn (text) {
        //     let alert: any = Message;
        //     alert.warning(text);
        //     setTimeout(() => {
        //         this.loading = false;
        //         this.$nextTick(() => {
        //             this.loading = true;
        //         })
        //     }, 500)
        // }
        ok() : any{
            this.store.verification();
            this.addPunishment = false;
        }
        popupDelPunishment(id) : any{
            // this.store.deleteWorkclass(id);
            this.store.punishmentInfo.id = id
            this.delPunishment = !this.delPunishment
        }
        deletes() :any{
            this.store.deletePunishment();
            this.delPunishment = false;
        }
        cancel():any {
            this.addPunishment = false;
            this.delPunishment = false;
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

        rowClassName (row, index) : string {
            if(index == 0) {
                return 'table-header'
            }
            return '';
        }
        getColumns() : any{
            return this.store.columns;
        }
        getData() : any{
            return this.store.punishment;
        }

        get totalRecords():number{
            return this.store.pageInfo.totalRecords;
        }

        set totalRecords(data:number){
            this.store.setPageTotal(data);
        }

        get pageIndex():number{
            return this.store.pageInfo.pageIndex;
        }
        set pageIndex(data:number){
            this.store.pageIndex(data);
        }
        get pageSize():number{
            return this.store.pageInfo.pageSize;
        }
        set pageSize(data:number){
            this.store.pageSize(data);
        }
        get id(): number{
            return this.store.punishmentInfo.id;
        }
        set id(data:number){
            this.store.setId(data);
        }
        get name(): string {
            return this.store.punishmentInfo.name;
        }
        set name(data: string) {
            this.store.setName(data);
        }
        get value():string{
            return this.store.punishmentInfo.value;
        }
        set value(data:string){
            this.store.setValue(data);
        }
        get description():string{
            return this.store.punishmentInfo.description;
        }
        set description(data:string){
            this.store.setDescription(data);
        }
        get category():string{
            return this.store.punishmentInfo.category;
        }
        set category(data:string){
            this.store.setCategory(data);
        }
    }
</script>
<style scoped src="@/styles/punishment.css" />
<template lang="pug" src="@/views/punishment.pug" />
