<script lang="ts">
    import "@/assets/css/common.css";
    import LecturerStore from '../../../store/modules/LecturerStore';
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
    export default class Lecturer extends Vue {
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        public checkedInternal: boolean;
        private store: any;
        public addLecturer: boolean;
        mounted() {
            this.store.search();
        }
        constructor() {
            super();
            this.addLecturer = false;
            this.checkedInternal = true;
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
        //切换内部/外部讲师
        toggle():any{
            this.checkedInternal=!this.checkedInternal;
            if(this.checkedInternal==true){
                this.store.setSelectType(1);
            }else {
                this.store.setSelectType(2);
            }
            this.store.search();
        }
        ok() : any{
            this.store.insertLecturer();
            this.addLecturer = false;
        }
        cancel():any {
            this.store.setLecturerInfo();
            this.addLecturer = false;
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


    }
</script>
<style scoped src="@/styles/lecturer.css" />
<template lang="pug" src="@/views/lecturer.pug" />
