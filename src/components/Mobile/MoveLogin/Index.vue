<script lang="ts">
    import {Component, Vue, Prop, Model} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {Tab, TabItem, XHeader, Cell, Flexbox, FlexboxItem, Swiper, SwiperItem, Badge, ViewBox, Group} from 'vux'
    import MoveLoginStore from '../../../store/mobile/MoveLoginStore';
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

    export default class moveLogin extends Vue {

        private store: any;

        constructor() {
            super();
            this.store = getModule(MoveLoginStore)
        }
        toRegister(){
            router.push({path: '/mobile/moveRegister'})
        }
        get username() : String {
            return this.store.username
        }
        set username(data: String) {
            this.store.setUsername(data)
        }
        get password() : String {
            return this.store.password
        }
        set password(data: String) {
            this.store.setPassword(data)
        }



        public login() {
            this.store.login()
        }
    }
</script>

<style scoped src="@/styles/mobile/moveLogin.css" />
<template lang="pug" src="@/views/mobile/moveLogin.pug" />