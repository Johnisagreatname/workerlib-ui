<!--
 * @Date         : 2020-05-02 14:47:34
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-06 23:32:59
 * @FilePath     : \src\components\Nav\CheckEvaluate\Index.vue
 -->
<script lang="ts">
import "@/assets/css/common.css";
import CheckEvaluateStore from "../../../store/modules/CheckEvaluateStore";
import WorkerStore from "../../../store/modules/WorkerStore";
import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Message } from "iview";

@Component({})
export default class CheckEvaluate extends Vue {
  public store: any;
  public workerStore: any;
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
  public classList: Array<any> = [{ name: "一级" }, { name: "二级" }];
  public hiddden: string = "hiddden";
  public pageSize: number = 15;
  public searchCheckeds: SearchList = {
    eafName: null,
    rateWorkType: null,
    grade: null,
    rank: null,
    modifyBy: null,
    company: null,
    project: null
  };
  public classDisabled: boolean = true;
  public columns = [
    {
      type: "selection",
      width: 60,
      align: "center"
    },
    {
      title: "姓名",
      key: "userName",
      sortable: true
    },
    {
      title: "所属项目",
      key: "projectName",
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
                title: params.row.projectName
              }
            },
            params.row.projectName
          )
        ]);
      }
    },
    {
      title: "所属单位",
      key: "unitName",
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
                title: params.row.unitName
              }
            },
            params.row.unitName
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
                  ? params.row.rateWorkType
                  : params.row.allWorkType
              }
            },
            params.row.rateWorkType
              ? params.row.rateWorkType
              : params.row.allWorkType
          )
        ]);
      }
    },
    {
      title: "级别",
      key: "grade",
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
                title: params.row.grade ? params.row.grade : "无"
              }
            },
            params.row.grade ? params.row.grade : "无"
          )
        ]);
      }
    },
    {
      title: "等级",
      key: "rank",
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
                title: params.row.rank ? params.row.rank : "无"
              }
            },
            params.row.rank ? params.row.rank : "无"
          )
        ]);
      }
    },
    {
      title: "评定时间",
      key: "evaluateTime",
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
                title: params.row.evaluateTime
                  ? params.row.evaluateTime.split(" ")[0]
                  : "无"
              }
            },
            params.row.evaluateTime
              ? params.row.evaluateTime.split(" ")[0]
              : "无"
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
  public columnsDialog = [
    {
      title: "姓名",
      key: "name",
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
      key: "evaluateTime",
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
                title: params.row.evaluateTime.split(" ")[0]
              }
            },
            params.row.evaluateTime.split(" ")[0]
          )
        ]);
      }
    }
  ];
  public classDisabledDialog: boolean = false;
  public selectTableData: Array<any> = [];
  constructor() {
    super();
    this.store = getModule(CheckEvaluateStore);
    this.workerStore = getModule(WorkerStore);
  }
  mounted() {
    this.search();
    this.workerStore.searchProjectList();
    this.workerStore.searchUnitList();
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
    this.store.search(this.searchCheckeds);
  }
  pageChange(val: number) {
    this["$store"].state.CheckEvaluateStore.pageNum = val;
    this.search();
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
    this.searchCheckeds.rank = null;
  }
  get computedStoreAddRateObjectGrade(): string {
    return this["$store"].state.CheckEvaluateStore.addRateObject.grade;
  }
  @Watch("computedStoreAddRateObjectGrade")
  onChanges(val, old) {
    if (val === "中级" || val === "高级") {
      this.classDisabledDialog = false;
    } else {
      this.classDisabledDialog = true;
    }
    this["$store"].state.CheckEvaluateStore.addRateObject.rank = null;
  }
  addRate() {
    this.store.addRate(this.selectTableData);
  }
  details(row) {
    this.store.details(row);
  }
  tableSelect(selection, row) {
    this.selectTableData = selection;
  }
}
interface SearchList {
  eafName: string;
  rateWorkType: string;
  grade: string;
  rank: string;
  modifyBy: string;
  project?: string;
  company: string;
}
</script>
<style lang="stylus" src="@/styles/checkEvaluate.styl" />
<template lang="pug" src="@/views/checkEvaluate.pug" />
