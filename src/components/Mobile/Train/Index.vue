<script lang="ts">
    import {Component, Vue, Prop, Model} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {Tab, TabItem, Sticky,ViewBox} from 'vux'

    @Component({
        components: {
            Sticky,
            ViewBox,
            Tab,
            TabItem
        }
    })
    export default class Train extends Vue {

    }
</script>
<template lang="pug" src="@/views/mobile/train.pug"/>
<style scoped src="@/styles/mobile/train.css"/>