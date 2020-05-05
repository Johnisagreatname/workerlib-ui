<!--
 * @Date         : 2020-05-02 14:47:34
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-05 16:44:47
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
  public searchCheckeds: SearchList = {
    eafName: null,
    rateWorkType: null,
    grade: null,
    rank: null,
    modifyBy: null,
    project: null,
    company: null
  };
  public classDisabled: boolean = true;
  public projectDisabled: boolean = true;
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
  public columnsDialog = [
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
    }
  ];
  public classDisabledDialog: boolean = false;
  constructor() {
    super();
    this.store = getModule(CheckEvaluateStore);
  }
  mounted() {
    this.search();
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
  @Watch("searchCheckeds.company")
  searchProject(val, old) {
    if (val === 0 || val) {
      this.projectDisabled = false;
    } else {
      this.projectDisabled = true;
    }
    this.searchCheckeds.project = null;
  }
  addRate(row) {
    this.store.addRate(row);
  }
  details(row) {
    this.store.details(row);
  }
  getNameOfList(list, id) {
    let name: string;
    list.forEach(a => {
      if (a.id == id) {
        name = a.name;
      }
    });
    return name;
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
