<!--
 * @Date         : 2020-05-02 14:47:34
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-04 10:08:29
 * @FilePath     : /src/components/Nav/CheckEvaluate/Index.vue
 -->
<script lang="ts">
import "@/assets/css/common.css";
import CheckEvaluateStore from "../../../store/modules/CheckEvaluateStore";
import { Component, Vue, Prop, Model } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Message } from "iview";

@Component({})
export default class CheckEvaluate extends Vue {
  public store: any;
  public companyList: Array<any> = [
    {
      id: 1,
      name: "项目A"
    },
    {
      id: 2,
      name: "项目B"
    }
  ];
  public typeWorkList: Array<any> = [
    {
      id: 1,
      name: "能吃能睡"
    },
    {
      id: 2,
      name: "卧床不起"
    }
  ];
  public gradeList: Array<any> = [
    {
      id: 1,
      name: "初级"
    },
    {
      id: 2,
      name: "中级"
    },
    {
      id: 3,
      name: "高级"
    }
  ];
  public classList: Array<any> = [{id: 1}, {id: 2}]
  public hiddden: string = "hiddden";
  public pageSize: number = 15;
  public pageNum: number = 1;
  public searchCheckeds: searchList = {
    name: null,
    project: null,
    company: null,
    typeWork: null,
    grade: null,
    class: null,
    time: null
  };
  constructor() {
    super();
    this.store = getModule(CheckEvaluateStore);
  }
  clearSearch(name) {
    // let num: number = this.searchChecked.findIndex(a => a == name);
    // this.searchChecked.splice(num, 1);
  }
  resetSearch() {
    // let num: number = this.searchChecked.length;
    // for (let i = 0; i < num; i++) {
    //   this.searchChecked.shift();
    // }
  }
  search() {
    debugger;
  }
  showTable() {
    if (this.hiddden === "hiddden") {
      this.hiddden = ""
      this.pageSize = 10
      this.pageNum = 1
      // 发table请求
    } else {
      this.hiddden = "hiddden"
      this.pageSize = 15
      this.pageNum = 1
      // 发table请求
    }
  }
  pageChange(val:number) {
    this.pageNum = val
      // 发table请求
  }
  getTime(date) {
    let year = date.getFullYear();
    // let mounth = date.getMounth() < 10 ? 
  }
}
interface searchList {
  name: string
  project: string
  company: string
  typeWork: string
  grade: string
  class: string
  time: string
}
</script>
<style lang="stylus" src="@/styles/checkEvaluate.styl" />
<template lang="pug" src="@/views/checkEvaluate.pug" />
