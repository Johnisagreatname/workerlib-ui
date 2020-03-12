<script lang="ts">
    import "@/assets/css/common.css";
    import Echart from 'echarts';
    import SpectacularsStore from '../../store/modules/SpectacularsStore';
    import IndexVideoStore from '../../store/modules/IndexVideoStore';
    import WorkerStore from '../../store/modules/WorkerStore';
    import ProjectStore from '../../store/modules/ProjectStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    Vue.prototype.$echarts = Echart;
    import router from '../../router/.invoke/router'
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
    export default class Spectaculars extends Vue {
        @Model('isCollapsed', {type: Boolean}) private isCollapsed !: boolean;

        rowClassName(row, index): string {
            if (index == 0) {
                return 'table-header'
            }
            return '';
        }

        mounted() {
            this.store.searchWorkType();
            this.store.searchWorkTypeCount();
            this.store.searchWorkTypeCountTwo();
            this.store.count();
            this.store.skill();
            this.store.countProject();
            this.store.countWorkType();
            this.store.countProjectBE();
            this.store.countCultivate();
            this.store.countCultivateCount();
            this.store.countAppraiseCount();
            this.store.searchVideoInfo();
            this.store.searchPhotoInfo();
        }
        getVideoList():any{
            return this.store.indexphoto;
        }
        //工种总数(种)
        clickWorkType(){
            router.push({path: '/nav/workclass'})
        }
        //外部队伍人数(人)
        projectCountDimission(){
            this.workerStore.setNotIn(true);
            router.push({path: '/nav/worker'})
        }
        checkEvaluate(){
            router.push({path: '/nav/checkEvaluate'})
        }
        //自有队伍人数(人)
        projectCountBeOn(){
            this.workerStore.setIn(true);
            router.push({path: '/nav/worker'})
        }
        //在建工程总数
        projectCountDoing(){
            this.projectStore.selectStatus(2);
            // this.projectStore.search();
            router.push({path: '/nav/project'})
        }
        projectCountTheirOwn(){
            this.workerStore.setSelectStatus(1);
            // this.workerStore.search();
            router.push({path: '/nav/worker'})
        }
        projectCountExternal(){
            this.workerStore.setSelectStatus(2);
            // this.workerStore.search();
            router.push({path: '/nav/worker'})
        }
        workType(name){
            this.workerStore.setSelectType(name);
            // this.workerStore.search();
            router.push({path: '/nav/worker'})
        }
        backgroundList = ['#41ccd3','#2498e3','#2268d4','#d6c76e','#d39255','#35c87a','#44ae2e','#7d5dcc']
        private store: any;
        private workerStore: any;
        private indexVideoStore: any;
        private projectStore: any;
        public $echarts: any;
        public selectWorkType: Array<any>;
        public roleName:any;

        carousel = 0;
        carouselPhoto = 0;
        constructor(e) {
            super(e);
            this.store = getModule(SpectacularsStore);
            this.indexVideoStore = getModule(IndexVideoStore);
            this.workerStore = getModule(WorkerStore);
            this.projectStore = getModule(ProjectStore);
            this.selectWorkType = [];
            this.roleName = JSON.parse(sessionStorage.getItem('loginInfo')).data.userGroupRoleModels[0].role.roleName;

        }
        getColor(index){
            if(index%2!=0){
                return ['#6bdfc5', '#90e7d4'];
            }else {
                return ['#88d0df', '#40e7e4'];
            }
        }
        getColorTwo(index){
            if(index%2 != 0){
                return ['#4ea2fe', '#7dbafe'];
            }else {
                return ['#74ccfe', '#2cdbfe']
            }
        }
        goBack(){
            if(this.roleName == '讲师'){//除了讲师其他权限都进入工人档案页面
                this['$router'].push("/nav/lecturer");
            }else{
                this['$router'].push("/nav/worker");
            }

        }
        getWorkType(){
            return this.store.workTypeList;
        }

        getWorkTypeCount(){
            return this.store.workTypeListCount;
        }
        getAppraiseList(){
            return this.store.appraiseList;
        }
        dateOK(){
            this.store.countCultivate();
        }
        dateMonthOK(){
            this.store.countCultivateCount();
        }
        backgroundColor(index) {
            return this.backgroundList[index]
        }
        set peopleTotal(data:number){
            this.store.setPeopleTotal(data);
        }
        get peopleTotal():number{
            return this.store.peopleTotal;
        }

        set saleDate(data:Date){
            this.store.setSaleDate(data);
        }
        get saleDate():Date{
            return this.store.saleDate;
        }
        set saleMonthDate(data:Date){
            this.store.setSaleMonthDate(data);
        }
        get saleMonthDate():Date{
            return this.store.saleMonthDate;
        }
        set workTypeCount(data:Date){
            this.store.setWorkTypeCount(data);
        }
        get workTypeCount():Date{
            return this.store.workTypeCount;
        }




    }
</script>
<style scoped src="@/styles/spectaculars.css" />
<template lang="pug" src="@/views/spectaculars.pug" />
