<script lang="ts">
    import "@/assets/css/common.css";
    import Echart from 'echarts';
    import SpectacularsStore from '../../store/modules/SpectacularsStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    Vue.prototype.$echarts = Echart;
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
            this.store.count();
            this.store.skill();
            this.store.countProject();
            this.store.countWorkType();
            this.store.countProjectBE();
            this.store.countCultivate();
            this.store.countCultivateCount();
            this.store.countAppraiseCount();
        }


        backgroundList = ['#41ccd3','#2498e3','#2268d4','#d6c76e','#d39255','#35c87a','#44ae2e','#7d5dcc']
        private store: any;
        public $echarts: any;
        public selectWorkType: Array<any>;
        carousel = 0
        constructor(e) {
            super(e);
            this.store = getModule(SpectacularsStore);
            this.selectWorkType = [];

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
            this['$router'].push("/nav/worker");
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
