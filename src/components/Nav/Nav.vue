<script lang="ts">
    import "@/assets/css/common.css";
    import NavStore from '../../store/modules/NavStore';
    import {Component, Vue, Prop, Model, Watch} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';


    import WorkerStore from '../../store/modules/WorkerStore';

    @Component({
        data() {
            return {
                loading: false
            }
        },
        components:{
        },
        directives: { // 自定义指令
        },
        mounted() {
            this.select(this['$router'].currentRoute.path, true)
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
    export default class Nav extends Vue {
        @Model('isCollapsed', { type: Boolean })
        private isCollapsed !: boolean;

        private store: any;
        private workerStore: any;

        private homepage: boolean;              //主页
        private projectManagement = true;     //项目管理
        private peopleManagement: boolean;     //人员管理
        private trainingManagement: boolean;   //培训管理
        private lecturerManagement: boolean;   //讲师管理
        private comprehensiveAssessment: boolean;   //综合评价
        private badEvaluation: boolean;           //不良评价
        private skillAppraisal: boolean;           //技能鉴定
        private setting: boolean;           //设置
        private type: string;           //设置



        private styleClass: string;

        constructor() {
            super();
            this.store = getModule(NavStore)
            this.workerStore = getModule(WorkerStore)

            this.homepage = false;              //主页
            this.projectManagement = false;     //项目管理
            this.peopleManagement  = true;     //人员管理
            this.trainingManagement  = false;   //培训管理
            this.lecturerManagement  = false;   //讲师管理
            this.comprehensiveAssessment  = false;   //综合评价
            this.badEvaluation  = false;           //不良评价
            this.skillAppraisal  = false;           //技能鉴定
            this.setting  = false;           //设置
            this.type=null;
            this.styleClass = null;
        }
        mounted(){

        }
        clickMenu(checked,menuName,path){
            let menu = ["homepage","projectManagement","peopleManagement","trainingManagement","lecturerManagement",
                "comprehensiveAssessment","badEvaluation","skillAppraisal","setting"];
            for(let i = 0;i < menu.length; i++){
                if(menu[i]==checked){
                    this[checked] = true;
                    this.store.setMenuList(menuName);
                    this['$router'].push(path);
                }else {
                    this[`${menu[i]}`] = false;
                }
            }
        }

        switchChecked(switchName) {
            this.styleClass = switchName;
                if (switchName == 'theirOwn') {
                    this.workerStore.setSelectEafUserStatus(1);
                    this.workerStore.searchUserList();
                } else if (switchName == 'exterior') {
                    this.workerStore.setSelectEafUserStatus(2);
                    this.workerStore.searchUserList();
                }else{
                    this['$router'].push(switchName);
                }

        }

        switchMode(switchName){
            // debugger
            // let switchMenu = ["account","workclass","commentType","grade","rate","course","punishment","indexVideo"];
            // for(let i = 0;i < switchMenu.length; i++){
            //     if(switchMenu[i]==switchName){
            //
            //         this.style = switchName;
            //
            //     }
            // }
        }


        getMenuList(){
            return this.store.menuList;
        }

    }

</script>


<style scoped src="@/styles/nav.css" />
<template lang="pug" src="@/views/nav.pug" />

