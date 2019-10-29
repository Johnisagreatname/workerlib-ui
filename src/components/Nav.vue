<script lang="ts">
    import "@/assets/css/common.css";

    import { Component, Vue, Prop, Model} from 'vue-property-decorator';

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
    export default class Nav extends Vue {
        @Model('isCollapsed', { type: Boolean }) private isCollapsed!: boolean;

        clicks(e) : void {
          this['$router'].push(e)
        }
    }
</script>

<style scoped src="@/styles/nav.css" />
<template lang="pug" src="@/views/nav.pug" />

