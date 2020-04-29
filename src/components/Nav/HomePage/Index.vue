<!--
 * @Date         : 2020-04-28 09:46:19
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-28 18:27:16
 * @FilePath     : \src\components\Nav\HomePage\Index.vue
 -->
<script lang="ts">
import "@/assets/css/common.css";
import HomePageStore from "../../../store/modules/HomePageStore";
import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import "@/assets/css/common.css";
import Echart from "echarts";
Vue.prototype.$echarts = Echart;

@Component({})
export default class HomePage extends Vue {
  private store: any;
  private jobsType: string;
  constructor() {
    super();
    this.store = getModule(HomePageStore);
    this.jobsType = "own";
  }
  mounted() {
    this.getJobs();
  }
  async getJobs() {
    let data: Array<jobs>;
    switch (this.jobsType) {
      case "own":
        data = await this.store.getJobs("own");
        this.jobs(data);
        break;
      case "epiboly":
        data = await this.store.getJobs("epiboly");
        this.jobs(data);
        break;
      default:
        break;
    }
  }
  jobs(data: Array<jobs> = [{ value: 0, name: "无数据", color: '#2f5ee4' }]) {
    let color = data.map(a => a.color)
    let list = data.map(a => {
      return {
        value: a.value,
        name: a.name
      }
    })
    const jobs = document.getElementById("jobs");
    const chart: any = this["$echarts"].init(jobs);
    chart.setOption({
      color: color,
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name: "工种人数统计",
          type: "pie",
          radius: ["50%", "80%"],
          // avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: "outside",
              color: "#747fa0"
            }
          },
          data: list
        }
      ]
    });
  }
}
interface jobs {
  value: number;
  name: string;
  color: string;
}
</script>

<style lang="stylus" src="@/styles/homePage.styl" />
<template lang="pug" src="@/views/homePage.pug" />

