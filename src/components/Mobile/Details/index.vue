<script lang="ts">
    import {Component, Vue, Prop, Model} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {Tab, TabItem, XHeader, Cell, Flexbox, FlexboxItem, Swiper, SwiperItem, Badge, ViewBox, Group} from 'vux'
    import MobileStore from '../../../store/mobile/MobileStore';
    import PlayStore from '../../../store/mobile/PlayStore';
    import WorkerStore from "../../../store/modules/WorkerStore";
    import router from '../../../router/.invoke/router'
    import CommentsStore from "../../../store/modules/CommentsStore";
    import {Message} from "iview";
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
            ViewBox,
            Group
        }
    })
    export default class Details extends Vue {
        private store: any;
        private playStore: any;
        private wstore: any;
        private storeComm: any;
        public sex: string;
        public now: Date;
        public year: number;
        public date: number;
        private userId: any
        private token: any;
        private idNumModal:boolean;
        private idNum:string;
        private hidden:boolean;

        constructor() {
            super();
            this.getBody();
            this.userId = router.currentRoute.query.eafid;
            this.token = router.currentRoute.query.token;
            localStorage.setItem('token', this.token)
            this.year = null;
            this.date = null;
            this.store = getModule(MobileStore)
            this.playStore = getModule(PlayStore)
            this.wstore = getModule(WorkerStore)
            this.storeComm = getModule(CommentsStore)
            this.idNumModal = false;
            this.hidden = false;
            this.idNum = null;
        }

        mounted() {
            this.store.selectPersonInfo();
            this.store.selectRateInfo();
            this.store.selectWorkType();
            // this.store.selectAttendances();
            this.wstore.setInfoId(this.userId);
            this.wstore.searchInvolvedProject();
            this.wstore.selectCultivate();
            this.wstore.selectCheckWorkceMonth();
            this.wstore.selectCheckWorkce();
            this.wstore.selectSalary();
            // this.wstore.selectComments();
            this.storeComm.setPunishmentsId(this.userId);
            this.storeComm.searchCommentSparticulars();
        }
        goBack(cultivate_id,id){
            this.playStore.setArId(id);
            this.playStore.setCultivate_id(cultivate_id);
            this.playStore.searchCul();
                this['$router'].push({
                    path:'/mobile/play',
                    query:{
                        token:this.token
                    }
                });
        }
        clickIdNumModal(){
            this.idNumModal = true;
        }
        ok(){
            let alert: any = Message;

            if(this.idNum == this.store.personInfo.cwrIdnum){
                this.hidden = true;
                this.idNum = null;
                alert.success("身份证号码正确");
            }else{
                this.hidden = false;
                this.idNum = null;
                alert.error("身份证号码不正确！");

            }
        }
        cancel(){
            let alert: any = Message;
            alert.warning("你点击了取消");
        }
        getBody(): any {
            document.body.style.minWidth = window.screen.width + 'px'
        }

        set getIdNUm(data:string){
            this.idNum=data;
        }
        get getIdNUm():string{
            return this.idNum;
        }

        getCommentSparticularsList(): any {
            return this.storeComm.commentSparticularsList;
        }

        getCultivateList(): any {
            return this.wstore.cultivateList;
        }

        getProjectInfoList(): any {
            return this.wstore.involvedProjectInfo;
        }

        getDateFormat(d: number): string {
            let date = new Date(d);
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        }

        //获取性别
        checkSex(idNumber): string {
            if (!idNumber) return;
            this.sex = idNumber.substring(16, 17);
            if (this.sex == "1" || this.sex == "3" || this.sex == "5" || this.sex == "7" || this.sex == "9") {
                return "男";
            } else {
                return "女";
            }
        }
        //获取年龄
        getYear(idNumber): number {
            if (!idNumber) return;
            this.now = new Date();
            this.year = this.now.getTime();
            this.date = new Date(idNumber.substring(6, 10) + "," + idNumber.substring(10, 12) + "," + idNumber.substring(12, 14)).getTime();
            return Math.floor((this.year - this.date) / (1000 * 60 * 60 * 24 * 31 * 12));
        }
        getLeave(): string {
            if (this.wstore.involvedProjectInfo == null) {
                return "离场"
            } else {
                if (this.wstore.involvedProjectInfo.leave == 1) {
                    return "在场"
                } else {
                    return "离场"
                }
            }
        }

        getRate(rate): string {
            if (rate == null) {
                return "无"
            } else {
                return rate.grade + rate.rank;
            }
        }

        getWorkType(workType): string {
            if (workType == null) {
                return "无"
            } else {
                return workType.workType;
            }
        }

        getCodeUrl(personInfo): string {
            if (personInfo == null) {
                return ""
            } else {
                return "/api/workerlib/download/people/code/" + personInfo.id;
            }
        }

        getUrl(personInfo): string {
            if (!personInfo) {
                return "~@/assets/css/images/headerPicture.png";
            }

            if(personInfo.photo) {
                return '/api/workerlib/preview/people/photo/'+personInfo.id;
            }

            if(personInfo.cwrPhoto) {
                return "http://113.105.121.93:1818" + personInfo.cwrPhoto;
            }

            return "~@/assets/css/images/headerPicture.png";
        }

        //身份证掩码
        replaceID(idNumber): string {
            if (!idNumber) return;
            const b = idNumber.replace(/^(.{3})(?:\d+)(.{4})/, '$1***********$2');
            return b;
        }

        //手机号掩码
        replacePhone(idNumber): string {
            if (!idNumber) return;
            const b = idNumber.replace(/^(.{3})(?:\d+)(.{2})/, '$1******$2');
            return b;
        }


    }
</script>
<template lang="pug" src="@/views/mobile/details.pug"/>
<style scoped src="@/styles/mobile/details.css"/>
