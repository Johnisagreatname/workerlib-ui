<!--
 * @Date         : 2020-04-28 09:46:19
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-30 12:36:29
 * @FilePath     : /src/components/Nav/HomePage/Index.vue
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
  private columns: Array<any> = [
    {
      title: "姓名",
      key: "name",
      render: (h, params) => {
        return h("div", [
          h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: "pointer"
              },
              domProps: {
                title: params.row.name
              }
            },
            params.row.name
          )
        ]);
      }
    },
    {
      title: "行为",
      key: "behavior",
      render: (h, params) => {
        return h("div", [
          h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: "pointer"
              },
              domProps: {
                title: params.row.behavior
              }
            },
            params.row.behavior
          )
        ]);
      }
    },
    {
      title: "处罚",
      key: "punish",
      render: (h, params) => {
        return h("div", [
          h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: "pointer"
              },
              domProps: {
                title: params.row.punish
              }
            },
            params.row.punish
          )
        ]);
      }
    },
    {
      title: "图片",
      slot: "img"
    }
  ];
  constructor() {
    super();
    this.store = getModule(HomePageStore);
    this.jobsType = "own";
  }
  mounted() {
    this.getTotal();
    this.getJobs();
    this.getCertificate();
    this.getCourseware();
    this.getWorkers();
    this.getCultivate();
  }
  getTotal() {
    this.store.getTotal()
  }
  async getJobs() {
    switch (this.jobsType) {
      case "own":
        await this.store.getJobs("own").then(res => {
          this.jobs(res);
        });
        break;
      case "epiboly":
        await this.store.getJobs("epiboly").then(res => {
          this.jobs(res);
        });
        break;
      default:
        break;
    }
  }
  jobs(data: Array<Jobs> = [{ value: 0, name: "无数据", color: "#2f5ee4" }]) {
    let color = data.map(a => a.color);
    let list = data.map(a => {
      return {
        value: a.value,
        name: a.name
      };
    });
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
  async getCertificate() {
    await this.store.certificate().then(res => {
      this.certificate(res);
    });
  }
  certificate(
    data: Array<Certificate> = [
      { name: "无数据", hasCertificate: 0, inexistence: 0 }
    ]
  ) {
    let xAxisData = data.map(a => a.name);
    let hasCertificate = data.map(a => a.hasCertificate);
    let inexistence = data.map(a => a.inexistence);
    const certificate = document.getElementById("certificate");
    const chart: any = this["$echarts"].init(certificate);
    chart.setOption({
      title: {
        show: true,
        text: "人数",
        left: 15,
        textStyle: {
          color: "#747fa0",
          fontWeight: "normal",
          fontSize: 12
        }
      },
      legend: {
        data: ["持证人数", "未持证人数"],
        right: 20,
        top: 0
      },
      grid: {
        top: 30,
        bottom: 30,
        left: 50,
        right: 20
      },
      xAxis: {
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: "#ccc"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#747fa0"
          }
        },
        splitLine: {
          show: true
        }
      },
      yAxis: {
        minInterval: 1,
        axisLine: {
          lineStyle: {
            color: "#ccc"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#888888"
          }
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      series: [
        {
          name: "持证人数",
          type: "bar",
          stack: "one",
          barMaxWidth: 40,
          emphasis: {
            itemStyle: {
              barBorderWidth: 1,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "rgba(0,0,0,0.5)"
            }
          },
          data: hasCertificate,
          color: new this["$echarts"].graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#1ed7bf"
            },
            {
              offset: 1,
              color: "#82a5fc"
            }
          ])
        },
        {
          name: "未持证人数",
          type: "bar",
          stack: "one",
          data: inexistence,
          color: "#ccc",
          barMaxWidth: 40,
          itemStyle: {
            normal: {
              barBorderRadius: [5, 5, 0, 0]
            }
          }
        }
      ]
    });
  }
  courseware(data: Array<Courseware> = [{ name: "无数据", value: 0 }]) {
    let yAxisData = data.map(a => a.name);
    let list = data.map(a => a.value);
    const courseware = document.getElementById("courseware");
    const chart: any = this["$echarts"].init(courseware);
    chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        top: 0,
        bottom: 10,
        left: 100,
        right: 20
      },
      yAxis: {
        type: "category",
        data: yAxisData,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      xAxis: {
        show: false
      },
      series: [
        {
          data: list,
          type: "bar",
          barMaxWidth: 40,
          color: new this["$echarts"].graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#2f5ee4"
            },
            {
              offset: 1,
              color: "#7a8ffc"
            }
          ]),
          itemStyle: {
            normal: {
              barBorderRadius: [0, 40, 40, 0]
            }
          },
          label: {
            show: true,
            position: "right",
            color: "#7a8ffc"
          }
        }
      ]
    });
  }
  async getCourseware() {
    await this.store.courseware().then(res => {
      this.courseware(res);
    });
  }
  workers(data: Array<Workers> = [{ name: "无数据", value: 0 }]) {
    let xAxisData = data.map(a => a.name);
    let list = data.map(a => a.value);
    const workers = document.getElementById("workers");
    const chart: any = this["$echarts"].init(workers);
    chart.setOption({
      title: {
        show: true,
        text: "人数",
        left: 15,
        textStyle: {
          color: "#747fa0",
          fontWeight: "normal",
          fontSize: 12
        }
      },
      grid: {
        top: 30,
        bottom: 30,
        left: 50,
        right: 20
      },
      xAxis: {
        data: xAxisData,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#747fa0"
          }
        }
      },
      yAxis: {
        minInterval: 1,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#ccc"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#888888"
          }
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          type: "bar",
          barMaxWidth: 20,
          emphasis: {
            itemStyle: {
              barBorderWidth: 1,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "rgba(0,0,0,0.5)"
            }
          },
          data: list,
          color: new this["$echarts"].graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#4243e3"
            },
            {
              offset: 1,
              color: "#96b1fe"
            }
          ]),
          itemStyle: {
            normal: {
              barBorderRadius: [20, 20, 20, 20]
            }
          },
          label: {
            show: true,
            position: "top"
          }
        }
      ]
    });
  }
  async getWorkers() {
    await this.store.workers().then(res => {
      this.workers(res);
    });
  }
  cultivate(data: Array<Cultivate> = [{ name: "无数据", value: 0 }]) {
    let xAxisData = data.map(a => a.name);
    let list = data.map(a => a.value);
    const cultivate = document.getElementById("cultivate");
    const chart: any = this["$echarts"].init(cultivate);
    chart.setOption({
      title: {
        show: true,
        text: "人数",
        left: 15,
        textStyle: {
          color: "#747fa0",
          fontWeight: "normal",
          fontSize: 12
        }
      },
      grid: {
        top: 30,
        bottom: 30,
        left: 50,
        right: 20
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#747fa0"
          }
        }
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#ccc"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          showMinLabel: false,
          textStyle: {
            color: "#888888"
          }
        },
        splitLine: {
          show: false
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        }
      },
      series: [
        {
          data: list,
          type: "line",
          color: "#677cfc",
          areaStyle: {
            color: new this["$echarts"].graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#677cfc"
              },
              {
                offset: 1,
                color: "#f2f4ff"
              }
            ])
          },
          smooth: true
        }
      ]
    });
  }
  async getCultivate() {
    await this.store.cultivate().then(res => {
      this.cultivate(res);
    });
  }
  rowClassName(row, index) {
    return "table-header";
  }
}
interface Jobs {
  value: number;
  name: string;
  color: string;
}
interface Certificate {
  name: string;
  hasCertificate: number;
  inexistence: number;
}
interface Courseware {
  name: string;
  value: number;
}
interface Workers {
  name: string;
  value: number;
}
interface Cultivate {
  name: string;
  value: number;
}
</script>

<style lang="stylus" src="@/styles/homePage.styl" />
<template lang="pug" src="@/views/homePage.pug" />

