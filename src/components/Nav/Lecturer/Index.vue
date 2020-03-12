<script lang="ts">
    import "@/assets/css/common.css";
    import LecturerStore from '../../../store/modules/LecturerStore';
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
        public checkedInternal: boolean;
        private store: any;
        public addLecturer: boolean;
        public selectInfo: boolean;
        public personalreesumes: any;
        mounted() {
            this.store.search();
        }
        constructor() {
            super();
            this.addLecturer = false;
            this.selectInfo = false;
            this.checkedInternal = true;
            this.personalreesumes = null;
            this.store = getModule(LecturerStore)
        }
        //获取讲师数据
        getLecturer() : any{
            return this.store.lecturers;
        }
        private options!: any;
        getType() : any {
            if(this.options) return this.options;
            this.options = [
                {value: '内部', key: 1 },
                {value: '外部', key: 2 }

            ];
            return this.options;
        }
        info(personalreesume):any{
            debugger
            this.personalreesumes = personalreesume;
            this.selectInfo = true;
        }
        okSelectInfo(){
            this.selectInfo = false;
        }
        cancelSelectInfo(){
            this.selectInfo = false;
        }
        toggle(name){
            if(name=="内部讲师"){
                this.store.setSelectType(1);
                this.store.search();
            }else {
                this.store.setSelectType(2);
                this.store.search();
            }
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
            }, 500)
        }
        ok() : any{
            if(!this.store.lecturerInfo.name){
                this.messageWarningFn('请输入姓名！');
                return;
            }
            if(!this.store.lecturerInfo.curriculum){
                this.messageWarningFn('请输入课程！');
                return;
            }
            if(!this.store.lecturerInfo.type){
                this.messageWarningFn('请选择课程类型！');
                return;
            }
            this.store.insertLecturer();
            this.addLecturer = false;
        }
        cancel():any {
            this.addLecturer = false;
        }
        handleSuccessPhoto (res, file) {
            this.store.setPhoto(res.file);
        }
        handleFormatError (file) {
            let alert: any = Message;
            alert.warning(file.name + ' 文件格式错误！请上传jpg、jpeg、png格式文件！');
        }
        set userName(data:string){
            this.store.setName(data);
        }
        get userName():string{
            return this.store.lecturerInfo.name;
        }

        set curriculum(data:string){
            this.store.setCurriculum(data);
        }
        get curriculum():string{
            return this.store.lecturerInfo.curriculum;
        }

        set type(data:number){
            this.store.setType(data);
        }
        get type():number{
            return this.store.lecturerInfo.type;
        }

        set personalreesume(data:string){
            this.store.setPersonalreesume(data);
        }
        get personalreesume():string{
            return this.store.lecturerInfo.personalreesume;
        }





    }
</script>
<style scoped src="@/styles/lecturer.css" />
<template lang="pug" src="@/views/lecturer.pug" />
