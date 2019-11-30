<script lang="ts">
    import "@/assets/css/common.css";
    import OptionsStore from '../../../store/modules/OptionsStore';
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
    export default class Options extends Vue {
        public addOptions: boolean;
        public addSubject: boolean;
        public selectSubject: boolean;
        public checked: boolean;
        private store: any;
        private currentId: number;

        constructor() {
            super();
            this.addOptions = false;
            this.addSubject = false;
            this.selectSubject = false;
            this.checked = true;
            this.store = getModule(OptionsStore);
            this.currentId = 0;
        }
        mounted() {
            this.store.search();
            // this.store.getProjectType();
        }
        yes() : any{
            this.store.insertOptions();
            this.addSubject = false;
        }
        ok() : any{
            this.store.insertSubject();
            this.addOptions = false;
        }
        cancel():any {
            this.addOptions = false;
        }
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        rowClassName (row, index) : string {

            if(index == 0) {
                return 'table-header'
            }

            return '';
        }

        popupAddOption(id) {
            this.currentId = id;
            this.subject_id = id;
            this.addSubject=!this.addSubject;
        }

        popupDelOptions(id) {
            debugger
            this.id=id;
            this.subject_id = id;
            this.store.selectOptions();
        }
        popupSelectOptions(id) {
            this.selectSubject=!this.selectSubject;
        }

        private options!: any;
        private types!: any;
        private project!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '待学习', key: '0' },
                { value: '学习中', key: '1' },
                { value: '学习完成', key: '2' }
            ];
            return this.options;
        }
        getType() : any {
            if(this.types) return this.types;
            this.types = [];
            return this.types;
        }
        getProject() : any {
            if(this.project) return this.project;
            this.project = [];
            return this.project;
        }
        getColumns() : any{
            return this.store.columns;
        }
        getValueColumns() : any{
            return this.store.valueColumns;
        }
        getData() : any{
            return this.store.subject;
        }
        getValue() : any{
            return this.store.value;
        }

        get id(): number{
            return this.store.subjectInfo.id;
        }
        set id(data:number){
            this.store.id(data);
        }
        get title():string{
            return this.store.subjectInfo.title;
        }
        set title(data:string){
            this.store.setTitle(data);
        }
        get standard():string{
            return this.store.subjectInfo.standard;
        }
        set standard(data:string){
            this.store.setStandard(data);
        }
        get type():number{
            return this.store.subjectInfo.type;
        }
        set type(data:number){
            this.store.setType(data);
        }
        get score():string{
            return this.store.subjectInfo.score;
        }
        set score(data:string){
            this.store.setScore(data);
        }
        get project_id():number{
            return this.store.subjectInfo.private_id;
        }
        set project_id(data:number){
            this.store.setProject_id(data);
        }
        get optid():number{
            return this.store.optionsInfo.id;
        }
        set optid(data:number){
            this.store.id(data);
        }
        get subject_id():number{
            return this.store.optionsInfo.subject_id;
        }
        set subject_id(data:number){
            this.store.setSubject_id(data);
        }
        get value():string{
            return this.store.optionsInfo.value;
        }
        set value(data:string){
            this.store.setValue(data)
        }
    }
</script>
<style scoped src="@/styles/options.css" />
<template lang="pug" src="@/views/options.pug" />
