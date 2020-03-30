<script lang="ts">
    import {Component, Vue, Prop, Model} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {Tab, TabItem, XHeader, Cell, Flexbox, FlexboxItem, Swiper, SwiperItem, Badge, ViewBox, Group} from 'vux'
    import MobileStore from '../../../store/mobile/MobileStore';
    import PlayStore from '../../../store/mobile/PlayStore';
    import WorkerStore from "../../../store/modules/WorkerStore";
    import router from '../../../router/.invoke/router'
    import CommentsStore from "../../../store/modules/CommentsStore";

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
        },
        beforeDestroy() {
            if(this.playStore.list && this.playStore.list.video.split('.')[1] == 'ogg' ||
                this.playStore.list.video.split('.')[1] == 'mp4' ||
                this.playStore.list.video.split('.')[1] == 'WebM') {
                    if (this.playStore.list.training_time < this.playStore.list.total_hours) {
                        this.playStore.setTrainingTime(0);
                        this.playStore.setArchivesStatus("待培训");
                        this.playStore.setWhether(3);
                        this.playStore.updateCul();
                    }
            }
            clearInterval(this.interval);

        }
    })

    export default class Play extends Vue {
        private userId: any
        private token: any;
        private playStore: any;
        private interval: any;
        private page:number;
        private micromessenger:boolean;
        private loading: boolean;


        constructor() {
            super();
            this.getBody();
            this.loading = true;
            this.page = 1;
            this.userId = router.currentRoute.query.eafid;
            this.token = router.currentRoute.query.token;
            this.playStore = getModule(PlayStore)
            localStorage.setItem('token', this.token)
            this.micromessenger = false;
            this.interval = setInterval(() => {
                if(this.playStore.list && this.playStore.list.video.split('.')[1] == 'ogg' ||
                   this.playStore.list.video.split('.')[1] == 'mp4' ||
                   this.playStore.list.video.split('.')[1] == 'WebM'
                ){
                    if(this.playStore.list.archivesStatus=="待培训" || this.playStore.list.archivesStatus=="培训中" ){

                        if(this.playStore.list.training_time+1 >= this.playStore.list.total_hours){
                            this.playStore.setTrainingTime(this.playStore.list.training_time+1);
                            this.playStore.setArchivesStatus("已培训");
                            this.playStore.setWhether(1);
                            this.playStore.updateCul();
                        }else{
                            this.playStore.setTrainingTime(this.playStore.list.training_time+1);
                            this.playStore.setArchivesStatus("培训中");
                            this.playStore.setWhether(2);
                            this.playStore.updateCul();
                        }

                    }
                }
            }, 60000)
            this.$nextTick(() => {
                let img = document.getElementById("preview");
                img.onload = (e)=>{
                    let loading = document.getElementById('loading');
                    loading.style.display = 'none';
                    this.loading = false
                }

                img.onerror = () => {
                    this.loading = false
                }
            })
        }
        mounted() {
            var browser = {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {         //移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language: (navigator["browserLanguage"] || navigator.language).toLowerCase()
            }

            if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
                var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i).toString() == "micromessenger" ) {
                    this.micromessenger = true
                }
                // if (ua.match(/WeiBo/i) == "weibo") {
                //     //在新浪微博客户端打开
                // }
                // if (ua.match(/QQ/i) == "qq") {
                //     //在QQ空间打开
                // }
                // if (browser.versions.ios) {
                //     //是否在IOS浏览器打开
                // }
                // if(browser.versions.android){
                //     //是否在安卓浏览器打开
                // }
            } else {
                //否则就是PC浏览器打开
            }
        }

        getVideo(){
            if(this.playStore.list.video){
                if(this.playStore.list.video.split('.')[1] == 'ppt' || this.playStore.list.video.split('.')[1] == 'pptx'){
                    return true;
                }else {
                    return false;
                }
            }
        }
        get id(){
            return this.playStore.list.id;
        }
        get url() {
            return encodeURI("http://39.108.103.150:8000/api/workerlib/preview/courseware/video/"+this.playStore.list.id);
        }
        changeIndexLeft(){
            if((this.page-1)<=1){
                this.page = 1;
            }else {
                let loading = document.getElementById('loading');
                loading.style.display = 'block';
                this.loading = true;
                this.page = (this.page-1);
            }

        }
        changeIndexRight(){
            debugger
            if((this.page+1)>this.playStore.list.pptPages){
                this.page = this.playStore.list.pptPages;
            }else {
                let loading = document.getElementById('loading');
                loading.style.display = 'block';
                this.loading = true;
                //页数改变
                this.page = (this.page+1);
                if(this.playStore.list.archivesStatus=="待培训" || this.playStore.list.archivesStatus=="培训中" ) {
                    //当前学习的页数是不是大于数据库的页数
                    if (this.page > this.playStore.list.training_pages) {
                        //当前学习的也是是不是等于总页数
                        if (this.page == this.playStore.list.pptPages) {
                            this.playStore.setTrainingPages(this.playStore.list.training_pages + 1);
                            this.playStore.setArchivesStatus("已培训");
                            this.playStore.setWhether(1);
                            this.playStore.updateCul();
                        } else {
                            this.playStore.setTrainingPages(this.playStore.list.training_pages + 1);
                            this.playStore.setArchivesStatus("培训中");
                            this.playStore.setWhether(2);
                            this.playStore.updateCul();
                        }
                    }
                }
                }


        }
        getBody(): any {
            document.body.style.minWidth = window.screen.width + 'px'
        }


        getDateFormat(d: number): string {
            let date = new Date(d);
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        }




        getRate(rate): string {
            if (rate == null) {
                return "无"
            } else {
                return rate.grade + rate.rank;
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
            if (personInfo == null) {
                return ""
            } else {
                return "http://113.105.121.93:1818" + personInfo.cwrPhoto;
            }
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
<template lang="pug" src="@/views/mobile/play.pug"/>
<style scoped src="@/styles/mobile/play.css"/>
<style scoped src="@/styles/mobile/play.css"/>
