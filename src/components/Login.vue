<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import store from '../store/index';
    import { getModule } from 'vuex-module-decorators';
    import LoginStore from '../store/modules/loginStore';
    
    @Component({
        components:{
        },
        directives: { // 自定义指令
        },
        mounted() {
        }
    })
    export default class Login extends Vue {

        constructor() {
            super();
            this.module = getModule(LoginStore, store)
        }
        module;
        public login() {

            this.module.login();
        }
    }
</script>

<style scoped src="@/styles/login.css" />
<template lang="pug" src="@/views/login.pug" />
