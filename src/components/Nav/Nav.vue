<script lang="ts">
    import "@/assets/css/common.css";
    import NavStore from '../../store/modules/NavStore';
    import {Component, Vue, Prop, Model, Watch} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';

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
        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        homepage = false;              //主页
        projectManagement = true;     //项目管理
        peopleManagement  = false;     //人员管理
        trainingManagement  = false;   //培训管理
        lecturerManagement  = false;   //讲师管理
        comprehensiveAssessment  = false;   //综合评价
        badEvaluation  = false;           //不良评价
        skillAppraisal  = false;           //技能鉴定
        setting  = false;           //设置

        private store: any;
        constructor() {
            super();
            this.store = getModule(NavStore)
        }
        mounted(){
        }
        clickMenu(checked,menuName,path){
            let menu = ["homepage","projectManagement","peopleManagement","trainingManagement","lecturerManagement",
                "comprehensiveAssessment","badEvaluation","skillAppraisal","setting"];
            for(let i = 0;i < menu.length; i++){
                if(menu[i]==checked){
                    debugger
                    this[checked] = true;
                    this.store.setMenuList(menuName);
                    this['$router'].push(path);
                }else {
                    this[`${menu[i]}`] = false
                }
            }

        }
        getMenuList(){
            return this.store.menuList;
        }

    }

</script>

<style scoped src="@/styles/nav.css" />
<template lang="pug" src="@/views/nav.pug" />

