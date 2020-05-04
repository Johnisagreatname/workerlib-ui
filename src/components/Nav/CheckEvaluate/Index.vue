<!--
 * @Date         : 2020-05-02 14:47:34
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-04 20:03:46
 * @FilePath     : \src\components\Nav\CheckEvaluate\Index.vue
 -->
<script lang="ts">
import "@/assets/css/common.css";
import CheckEvaluateStore from "../../../store/modules/CheckEvaluateStore";
import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Message } from "iview";

@Component({})
export default class CheckEvaluate extends Vue {
  public store: any;
  public projectList: Array<List> = [
    {
      id: 1,
      name: "项目A"
    },
    {
      id: 2,
      name: "项目B"
    }
  ];
  public companyList: Array<List> = [
    {
      id: 1,
      name: "单位A"
    },
    {
      id: 2,
      name: "单位B"
    }
  ];
  public gradeList: Array<any> = [
    {
      id: "初级",
      name: "初级"
    },
    {
      id: "中级",
      name: "中级"
    },
    {
      id: "高级",
      name: "高级"
    }
  ];
  public classList: Array<any> = [{ id: 1 }, { id: 2 }];
  public hiddden: string = "hiddden";
  public pageSize: number = 15;
  public pageNum: number = 1;
  public searchCheckeds: SearchList = {
    name: null,
    project: null,
    company: null,
    typeWork: null,
    grade: null,
    class: null,
    time: null
  };
  public classDisabled: boolean = true;
  public columns = [
    {
      title: "姓名",
      key: "eafName",
      sortable: true
    },
    {
      title: "所属项目",
      key: "project",
      sortable: true,
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
                whiteSpace: "nowrap"
              },
              domProps: {
                title: params.row.rateWorkType
              }
            },
            params.row.rateWorkType
          )
        ]);
      }
    },
    {
      title: "所属单位",
      key: "company",
      sortable: true,
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
                whiteSpace: "nowrap"
              },
              domProps: {
                title: params.row.rateWorkType
              }
            },
            params.row.rateWorkType
          )
        ]);
      }
    },
    {
      title: "工种",
      key: "rateWorkType",
      sortable: true,
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
                whiteSpace: "nowrap"
              },
              domProps: {
                title: params.row.rateWorkType
              }
            },
            params.row.rateWorkType
          )
        ]);
      }
    },
    {
      title: "等级",
      key: "grade",
      sortable: true
    },
    {
      title: "级别",
      key: "rank",
      sortable: true
    },
    {
      title: "评定时间",
      key: "modifyBy",
      sortable: true,
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
                whiteSpace: "nowrap"
              },
              domProps: {
                title: params.row.modifyBy
              }
            },
            params.row.modifyBy
          )
        ]);
      }
    },
    {
      title: "操作",
      slot: "operation",
      sortable: true
    }
  ];
  constructor() {
    super();
    this.store = getModule(CheckEvaluateStore);
  }
  clearSearch(name) {
    Object.keys(this.searchCheckeds).forEach(a => {
      if (a === name) this.searchCheckeds[name] = null;
    });
  }
  resetSearch() {
    Object.keys(this.searchCheckeds).forEach(a => {
      this.searchCheckeds[a] = null;
    });
  }
  search() {
    debugger;
  }
  pageChange(val: number) {
    this.pageNum = val;
    // 发table请求
  }
  getTime(date) {
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return year + "-" + month + "-" + day;
  }
  @Watch("searchCheckeds.grade")
  onChange(val, old) {
    if (val === "中级" || val === "高级") {
      this.classDisabled = false;
    } else {
      this.classDisabled = true;
    }
    this.searchCheckeds.class = null;
  }
  getNamwOfList(list, id) {
    let name: string;
    list.forEach(a => {
      if (a.id == id) name = a.name;
    });
    return name;
  }
  addRate(id) {
    this["$store"].state.CheckEvaluateStore.addDialog = true
  }
  details(id) {
    debugger
  }
}
interface SearchList {
  name: string;
  project: string;
  company: string;
  typeWork: string;
  grade: string;
  class: string;
  time: string;
}
interface List {
  id: number;
  name: string;
}
interface AddRate {
  id: number
  name: string
  workType: string
  grade: string
  class: string
  time: string
  describe: string
}
</script>
<style lang="stylus" src="@/styles/checkEvaluate.styl" />
<template lang="pug" src="@/views/checkEvaluate.pug" />
