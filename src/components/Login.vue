<script lang="ts">

    import { Component, Vue, Prop, Model } from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import LoginStore from '../store/modules/loginStore';

    import {
        State,
        Getter,
        Action,
        Mutation,
        namespace
    } from 'vuex-class'

    const Module = namespace('LoginStore')

    @Component({
        computed: {
            username: {
                get:() => {
                    return this.username
                },
                set: (data) => {
                    this.username = data
                }
            }
        }
    })
    export default class Login extends Vue {

        @namespace('LoginStore').State('username')
        private username!: String;

        @namespace('LoginStore').State('username')
        private password!: String;

        private module: any;

        constructor() {
            super();
            this.module = getModule(LoginStore)
        }

        public login() {
            this.module.login()
        }

        public usernameChange() {
            console.log('66666666666666666666')
        }
    }
</script>

<style scoped src="@/styles/login.css" />
<template lang="pug" src="@/views/login.pug" />
