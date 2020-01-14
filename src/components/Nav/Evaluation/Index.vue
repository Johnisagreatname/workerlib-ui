<script lang="ts">
    import "@/assets/css/common.css";
    import EvaluationStore from '../../../store/modules/EvaluationStore';
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
    export default class Evaluation extends Vue {
        public addEvaluation: boolean;
        public delEvaluation: boolean;
        private store: any;
        private options!: Array<any>;

        constructor() {
            super();
            this.addEvaluation = false;
            this.delEvaluation = false;
            this.store = getModule(EvaluationStore);
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
            this.addEvaluation = false;
        }
        popupDelEvaluation(id) : any{
            // this.store.deleteWorkclass(id);
            this.store.evaluetionInfo.id = id
            this.delEvaluation = !this.delEvaluation
        }
        deletes() :any{
            this.store.deleteEvaluation();
            this.delEvaluation = false;
        }
        cancel():any {
            this.addEvaluation = false;
            this.delEvaluation = false;
        }

        onPageSizeChange(pageSize){

            this.store.pageSize(pageSize);
            this.store.pageIndex(1);
            this.onPageIndexChange(1);
        }

        onPageIndexChange(pageIndex){

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
            return this.store.evaluetion;
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
            return this.store.projectInfo.id;
        }
        set id(data:number){
            this.store.setId(data);
        }
        get name(): string {
            return this.store.evaluetionInfo.name;
        }
        set name(data: string) {
            this.store.setName(data);
        }
        get value():string{
            return this.store.evaluetionInfo.value;
        }
        set value(data:string){
            this.store.setValue(data);
        }
        get description():string{
            return this.store.evaluetionInfo.description;
        }
        set description(data:string){
            this.store.setDescription(data);
        }
        get category():string{
            return this.store.evaluetionInfo.category;
        }
        set category(data:string){
            this.store.setCategory(data);
        }
    }
</script>
<style scoped src="@/styles/evaluation.css" />
<template lang="pug" src="@/views/evaluation.pug" />
