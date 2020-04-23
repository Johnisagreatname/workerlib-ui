<script lang="ts">
    import {Component, Vue, Prop, Model} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {Tab, TabItem, XHeader, Cell, Flexbox, FlexboxItem, Swiper, SwiperItem, Badge, ViewBox, Group} from 'vux'
    import MoveRegisterStore from '../../../store/mobile/MoveRegisterStore';
    import { Message } from 'iview';
    import router from '../../../router/.invoke/router'
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

    })

    export default class moveRegister extends Vue {

        private store: any;
        private code:any;
        constructor() {
            super();
            this.store = getModule(MoveRegisterStore);
            this.code = '';
        }
        mounted(){
            this.createCode();
        }
        getType(){
            return this.store.projectType
        }
        toLogin(){
            router.push({path: '/mobile/moveLogin'})
        }
        ok() : any {
            let alert: any = Message;

            if (!this.store.userName) {
                alert.warning('请输入姓名！');
                return;
            }
            const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!this.store.card) {
                alert.warning('请输入身份证号！');
                return;
            }else if(!regIdCard.test(this.store.card)){
                alert.warning('身份证号码有误，请重填！');
                return;
            }
            const regIdPhone = /^1[3456789]\d{9}$/;
            if (!this.store.phone) {
                alert.warning('请输入手机号码！');
                return;
            }else if(!regIdPhone.test(this.store.phone)){
                alert.warning("手机号码有误，请重填！");
                return;
            }
            // if (!this.store.type || this.store.type.length <= 0) {
            //     alert.warning('请选择工种！');
            //     return;
            // }
            if(!this.store.codeNumber){
                alert.warning("请输入验证码！");
                return;
            }else if (this.store.codeNumber.toUpperCase() != this.code.toUpperCase()) {
                alert.warning("验证码错误！");
                this.createCode();
                return;
            }
            this.store.insertArchives();
        }

        // 生成一个随机色
        randomColor(min, max) {
            let r = this.randomNum(min, max);
            let g = this.randomNum(min, max);
            let b = this.randomNum(min, max);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        }
        // 生成一个随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        // 生成随机码
        createCode() {
            this.code = '';
            //验证码的长度
            let codeLength = 4;
            const checkCode = document.getElementById('myCanvas');
            const codeChars = [];
            // 验证码所需数字和字母的集合
            for (let i = 0; i < 26; i++) {
                if (i < 10) {
                    codeChars.push(String.fromCharCode(i + 48));
                }
                codeChars.push(String.fromCharCode(i + 97));
                codeChars.push(String.fromCharCode(i + 65));
            }
            // 组合数字和字母
            for (let i = 0; i < codeLength; i++) {
                let charNum = Math.floor(Math.random() * 52);
                this.code += codeChars[charNum];
            }
            if (checkCode) {
                this.drawVerify(checkCode, this.code);
            }
        }
        // 绘制验证码图形
        drawVerify(checkCode, value) {
            const [ctx, width, height] = [checkCode.getContext('2d'), checkCode.offsetWidth, checkCode.offsetHeight];
            // 清空画布
            ctx.clearRect(0, 0, width, height);
            // 绘制背景色
            ctx.fillStyle = this.randomColor(180, 240);
            ctx.fillRect(0, 0, width, height);
            // 填充字体
            ctx.font = '50px Arial';
            ctx.fillStyle = this.randomColor(50, 160);
            ctx.fillText(value, 30, 55);
            // 绘制干扰线
            for (var i = 0; i < 4; i++) {
                ctx.strokeStyle = this.randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(this.randomNum(0, 180), this.randomNum(0, height));
                ctx.lineTo(this.randomNum(0, 180), this.randomNum(0, height));
                ctx.stroke();
            }
            // 绘制干扰点
            for (var i = 0; i < 30; i++) {
                ctx.fillStyle = this.randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        set userName(data:string){
            this.store.setUserName(data);
        }
        get userName():string{
            return this.store.userName;
        }
        set card(data:string){
            this.store.setCard(data);
        }
        get card():string{
            return this.store.card;
        }
        set phone(data:number){
            this.store.setPhone(data);
        }
        get phone():number{
            return this.store.phone;
        }
        set codeNumber(data:string){
            this.store.setCodeNumber(data);
        }
        get codeNumber():string{
            return this.store.codeNumber;
        }
        set type(data:string){
            this.store.setType(data);
        }
        get type():string{
            if(!this.store.type) {
                return '';
            }
            return this.store.type.toString().split(",");
        }

    }

</script>

<style scoped src="@/styles/mobile/moveRegister.css" />
<template lang="pug" src="@/views/mobile/moveRegister.pug" />