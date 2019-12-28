
<script lang="ts">
    import {Component, Vue, Prop, Model} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {Tab, TabItem, XHeader,Cell, Flexbox, FlexboxItem,Swiper,SwiperItem,Badge,ViewBox} from 'vux'
    import MobileStore from '../../../store/mobile/MobileStore';
    import WorkerStore from "../../../store/modules/WorkerStore";


    @Component({
        components: {
            Cell,
            Flexbox,
            FlexboxItem,
            Swiper,
            SwiperItem,
            XHeader,
            Tab,
            TabItem,
            Badge,
            ViewBox
        }
    })
    export default class Details extends Vue {
        private store: any;
        private wstore: any;
        public sex: string;
        public now: Date;
        public year :any;
        public date:any;

        constructor() {
            super();
            this.store = getModule(MobileStore)
            this.wstore = getModule(WorkerStore)

        }
        mounted() {
            this.store.selectPersonInfo();
            this.store.selectAttendances();

        }
        getProjectInfoList():any{
            return this.wstore.involvedProjectInfo;
        }
        getDateFormat (d: number) : string {
            let date = new Date(d);
            return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        }
        //获取性别
        checkSex(idNumber): string {
            if(!idNumber) return;
            this.sex = idNumber.substring(16,17);
            if(this.sex=="1"||this.sex=="3"||this.sex=="5"||this.sex=="7"||this.sex=="9"){
                return "男";
            }else {
                return "女";
            }
        }
        //获取年龄
        getAge(idNumber): number{
            if(!idNumber) return;
            this.now = new Date();
            this.year = this.now.getTime();
            this.date = new Date(idNumber.substring(6,10)+","+idNumber.substring(10,12)+","+idNumber.substring(12,14)).getTime();
            return Math.floor((this.year-this.date)/(1000*60*60*24*31*12));
        }
    }
</script>
<template lang="pug" src="@/views/mobile/details.pug"/>
<style scoped src="@/styles/mobile/details.css"/>