<script lang="ts">
    import "@/assets/css/common.css";

    import { Component, Vue, Prop, Model } from 'vue-property-decorator';

     @Component({
        components:{
        },
        directives: { // 自定义指令
        },
        mounted() {
        },
         computed: {
             menuitemClasses: function () {
                 return [
                     'menu-item',
                     this.isCollapsed ? 'collapsed-menu' : ''
                 ]
             }
         }
    })
    export default class Home extends Vue {
         @Model('isCollapsed', { type: Boolean }) private isCollapsed!: boolean;
    }
</script>

<style scoped src="@/styles/home.css" />
<template lang="pug" src="@/views/home.pug" />
