<!--
 * @Date         : 2020-04-28 09:46:19
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-28 11:30:36
 * @FilePath     : \src\components\Nav\HomePage\Index.vue
 -->
<script lang="ts">
import "@/assets/css/common.css";
import HomePageStore from "../../../store/modules/HomePageStore";
import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

@Component({
  data() {},
  components: {},
  directives: {
    // 自定义指令
  }
})
export default class HomePage extends Vue {
  private store: any;
  constructor() {
    super();
    this.store = getModule(HomePageStore);
  }
}
</script>

<style lang="stylus" src="@/styles/homePage.styl" />
<template lang="pug" src="@/views/homePage.pug" />

