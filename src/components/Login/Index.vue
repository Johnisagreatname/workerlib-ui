<script lang="ts">

    import { Component, Vue, Prop, Model } from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import LoginStore from '../../store/modules/LoginStore';

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

        private store: any;

        constructor() {
            super();
            this.store = getModule(LoginStore)
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

<style scoped src="@/styles/login.css" />
<template lang="pug" src="@/views/login.pug" />
