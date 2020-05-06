<script lang="ts">
    import "@/assets/css/common.css";
    import CoursewareStore from '../../store/modules/CoursewareStore';
    import LecturerStore from '../../store/modules/LecturerStore';
    import NavStore from '../../store/modules/NavStore';
    import {Component, Vue, Prop, Model, Watch} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';


    import WorkerStore from '../../store/modules/WorkerStore';

    @Component({
        computed: {
            menuitemClasses: () => {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    })
    export default class Nav extends Vue {
        @Model('isCollapsed', { type: Boolean })
        private isCollapsed !: boolean;

        private store: any;
        private workerStore: any;
        private coursewareStore: any;
        private lecturerStore: any;


        private type: string;           //设置
        private styleClass: string;
        private menuName: string;
        private path: string;

        constructor() {
            super();
            this.store = getModule(NavStore);
            this.workerStore = getModule(WorkerStore);
            this.coursewareStore = getModule(CoursewareStore);
            this.lecturerStore = getModule(LecturerStore);

            let path = {'homepage':'','projectManagement':'','peopleManagement':'',
                'trainingManagement':'','lecturerManagement':'','comprehensiveAssessment':'',
                'badEvaluation':'','skillAppraisal':'','setting':''};
            sessionStorage.setItem("path",JSON.stringify(path));

            this.type = sessionStorage.getItem("type");
            this.menuName = sessionStorage.getItem("menuName");
            this.styleClass = null;
            this.path = sessionStorage.getItem("path");


        }
        mounted(){

        }
        clickMenu(checked,menuName,path){
            //一级菜单
            let menu = ["homepage","projectManagement","peopleManagement","trainingManagement","lecturerManagement",
                "comprehensiveAssessment","badEvaluation","skillAppraisal","setting"];
            for(let i = 0;i < menu.length; i++){
                if(menu[i]==checked){
                    this.store.setMenuList(menuName);
                    this.type = checked;
                    this.menuName = menuName;
                    JSON.stringify(sessionStorage.setItem("type",checked));
                    JSON.stringify(sessionStorage.setItem("menuName",menuName));

                    // if(JSON.parse(sessionStorage.getItem('path'))[checked]){
                    //     this['$router'].push(JSON.parse(sessionStorage.getItem('path'))[checked]);
                    //     this['$router'].push(JSON.parse(sessionStorage.getItem('path'))[checked]);
                    // }else{
                        this['$router'].push(path);
                    // }
                }
            }
        }

        switchChecked(switchName) {
            //二级菜单
            this.styleClass = switchName;
            // JSON.stringify(sessionStorage.setItem("style",switchName));
            if (switchName == 'theirOwn') {
                this.workerStore.setSelectEafUserStatus(1);
                this.workerStore.searchUserList();
            } else if (switchName == 'exterior') {
                this.workerStore.setSelectEafUserStatus(2);
                this.workerStore.searchUserList();
            }else if(switchName == 'internalTrainer'){
                this.lecturerStore.setSelectLecturerType(1);
                this.lecturerStore.searchLecturerList();
            }else if(switchName == 'externalLecturer'){
                this.lecturerStore.setSelectLecturerType(2);
                this.lecturerStore.searchLecturerList();
            }
            else if (switchName == 'onlineTraining'){
                this.coursewareStore.setSelectStatus(1);
                this.coursewareStore.search();
            }else if(switchName == 'offlineTraining'){
                this.coursewareStore.setSelectStatus(2);
                this.coursewareStore.search();
            }else{
                //二级菜单路由跳转
                JSON.stringify(sessionStorage.setItem("path",switchName));
                this['$router'].push(switchName);
            }

        }


        getMenuList(){
            return this.store.menuList;
        }

    }

</script>


<style scoped src="@/styles/nav.css" />
<template lang="pug" src="@/views/nav.pug" />

