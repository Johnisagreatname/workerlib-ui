<script lang="ts">
    import "@/assets/css/common.css";
    import LecturerStore from '../../../store/modules/LecturerStore';
    import AccountStore from '../../../store/modules/AccountStore';
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
    export default class Lecturer extends Vue {
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        private store: any;

        public addLecturer: boolean;
        public updateLecturer: boolean;
        public deleteLecturer: boolean;
        loading = true;
        private options!: any;

        mounted() {
            this.store.searchLecturerList();
        }
        messageWarningFn (text) {
            setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                })
            }, 1000)
            let alert: any = Message;
            alert.warning(text);
        }
        constructor() {
            super();
            this.addLecturer = false;
            this.updateLecturer = false;
            this.deleteLecturer = false;
            this.store = getModule(LecturerStore)
        }
        switchTo(){
            this.store.switchPullDown();
        }
        set pullDown(data: boolean){
            this.store.setPullDown(data);
        }
        get pullDown(): boolean{
            return this.store.pullDown;
        }
        getLectuerList(){
            return this.store.lecturerList;
        }
        checked(id){
            this.store.setCheckedId(id);
            this.store.setUpdateLecturerId(id);
            this.store.setDeleteLecturerId(id);
        }

        set checkedId(data: number){
            this.store.setCheckedId(data);
        }
        get checkedId(): number{
            return this.store.checkedId;
        }
        set lecturerPageTotal(data: number){
            this.store.setLecturerPageTotal(data);
        }
        get lecturerPageTotal(): number{
            return this.store.lecturerPageTotal;
        }
        set selectLecturerCurriculum(data: number){
            this.store.setSelectLecturerCurriculum(data);
        }
        get selectLecturerCurriculum(): number{
            return this.store.selectLecturerCurriculum;
        }
        clearSelectLecturerCurriculum(){
            this.store.setSelectLecturerCurriculum(null);
        }
        clickAddLecturer(){
            this.addLecturer = true;
        }
        onPageIndexChange(pageIndex){
            this.store.setLecturerPageIndex(pageIndex);
            this.store.searchLecturerList();
        }
        addLecturerCancel(){
            this.addLecturer = false;
        }
        addLecturerOk() : any{
            if(!this.store.insertLecturerName){
                this.messageWarningFn('请输入姓名！');
                return;
            }
            if(!this.store.insertLecturerCurriculum){
                this.messageWarningFn('请输入课程！');
                return;
            }
            if(!this.store.insertLecturerType){
                this.messageWarningFn('请选择课程类型！');
                return;
            }

            this.store.insertLecturer();
            this.addLecturer = false;
        }
        handleSuccessPhoto (res, file) {
            this.store.setInsertLecturerPhoto(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.error(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        reset(){
            this.store.setSelectLecturerCurriculum(null);
        }
        getType() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '内部', key: 1 },
                {value: '外部', key: 2 }

            ];
            return this.options;
        }


        set insertLecturerName(data:string){
            this.store.setInsertLecturerName(data);
        }
        get insertLecturerName():string{
            return this.store.insertLecturerName;
        }
        set insertLecturerCurriculum(data:string){
            this.store.setInsertLecturerCurriculum(data);
        }
        get insertLecturerCurriculum():string{
            return this.store.insertLecturerCurriculum;
        }
        set insertLecturerType(data:number){
            this.store.setInsertLecturerType(data);
        }
        get insertLecturerType():number{
            return this.store.insertLecturerType;
        }

        set insertLecturerPersonalreesume(data:string){
            this.store.setInsertLecturerPersonalreesume(data);
        }
        get insertLecturerPersonalreesume():string{
            return this.store.insertLecturerPersonalreesume;
        }


        clickUpdateLecturer(){
            if(!this.store.updateLecturerId){
                let alert: any = Message;
                alert.warning("请选择要修改的人员");
                return;
            }
            this.updateLecturer = true;
        }
        updateLecturerCancel(){
            this.updateLecturer = false;
        }
        updateLecturerOk() : any{
            if(!this.store.updateLecturerName){
                this.messageWarningFn('请输入姓名！');
                return;
            }
            if(!this.store.updateLecturerCurriculum){
                this.messageWarningFn('请输入课程！');
                return;
            }
            if(!this.store.updateLecturerType){
                this.messageWarningFn('请选择课程类型！');
                return;
            }

            this.store.updateLecturer();
            this.updateLecturer = false;
        }
        handleSuccessUpdatePhoto (res, file) {
            this.store.setUpdateLecturerPhoto(res.file);
            let alert: any = Message;
            alert.success('上传成功！');
        }
        handleFormatUpdateError (file) {
            let alert: any = Message;
            alert.error(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }

        set updateLecturerId(data:string){
            this.store.setUpdateLecturerId(data);
        }
        get updateLecturerId():string{
            return this.store.updateLecturerId;
        }
        set updateLecturerName(data:string){
            this.store.setUpdateLecturerName(data);
        }
        get updateLecturerName():string{
            return this.store.updateLecturerName;
        }
        set updateLecturerType(data:string){
            this.store.setUpdateLecturerType(data);
        }
        get updateLecturerType():string{
            return this.store.updateLecturerType;
        }
        set updateLecturerCurriculum(data:string){
            this.store.setUpdateLecturerCurriculum(data);
        }
        get updateLecturerCurriculum():string{
            return this.store.updateLecturerCurriculum;
        }
        set updateLecturerPersonalreesume(data:number){
            this.store.setUpdateLecturerPersonalreesume(data);
        }
        get updateLecturerPersonalreesume():number{
            return this.store.updateLecturerPersonalreesume;
        }

        set updateLecturerPhoto(data:string){
            this.store.setUpdateLecturerPhoto(data);
        }
        get updateLecturerPhoto():string{
            return this.store.updateLecturerPhoto;
        }
        clickDeleteLecturer(){
            if(!this.store.deleteLecturerId){
                let alert: any = Message;
                alert.warning("请选择要删除的人员！");
                return;
            }else{
                this.deleteLecturer = true;
            }
        }
        deleteLecturerOk(){
            this.store.deleteLecturerById();
            this.deleteLecturer = false;
        }
        deleteLecturerCancel(){
            this.deleteLecturer = false;
        }








    }
</script>
<style scoped src="@/styles/lecturer.css" />
<template lang="pug" src="@/views/lecturer.pug" />
