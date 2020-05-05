import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import { Message } from "iview";
import MyStore from "../../common/MyStore";

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "CheckEvaluateStore",
  store,
})
export default class CheckEvaluateStore extends MyStore {
  public tableData: Array<TableData> = [
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
    {
      id: "sgjlsjl1232jlg34k3j",
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      operation: "string",
      project: "项目",
      company: "公司",
    },
  ];
  public total: number = 100;
  public addDialog: boolean = false;
  public pageNum: number = 1;
  public addRateObject: AddRate = {
    id: null,
    eafName: null,
    rateWorkType: null,
    grade: null,
    rank: null,
    modifyBy: null,
    company: null,
    project: null,
  };
  public examineDialog: boolean = false;
  public examineTableData: Array<Examine> = [
    {
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      company: "string",
      project: "string",
    },
    {
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      company: "string",
      project: "string",
    },
    {
      eafName: "string",
      rateWorkType: "string",
      grade: "string",
      rank: "string",
      modifyBy: "string",
      company: "string",
      project: "string",
    },
  ];
  public dialogPageSize: number = 15;
  public dialogPageNUm: number = 1;
  constructor(e) {
    super(e);
  }
  @Action
  clear() {
    Object.keys(this.addRateObject).forEach((a) => {
      this.addRateObject[a] = null;
    });
  }
  @Action
  submit() {
    // 提交
    this.clear();
    this.set({ key: "addDialog", value: false });
  }
  @Action
  search(objs: SearchList) {
    let obj: SearchList = Object.assign({}, objs);
    Object.keys(obj).forEach((a) => {
      if (obj[a] && obj[a].length) {
        obj.startTime = obj[a][0] ? obj[a][0] : "";
        obj.endTime = obj[a][0] ? obj[a][0] : "";
      } else if (!obj[a]) {
        obj[a] = "";
      }
    });
    // this.pageNum
  }
  @Action
  addRate(row) {
    this.set({ key: "addDialog", value: true });
    this.set({ key: "addRateObject.eafName", value: row.eafName });
    this.set({ key: "addRateObject.id", value: row.id });
    this.set({ key: "addRateObject.rateWorkType", value: row.rateWorkType });
    this.set({ key: "addRateObject.company", value: row.company });
    this.set({ key: "addRateObject.project", value: row.project });
  }
  @Action
  details(row) {
    // 请求数据
    this.set({ key: "examineDialog", value: true });
  }
  @Mutation
  close() {
    this.examineTableData = [];
    this.examineDialog = false;
    this.pageNum = 1;
  }
  @Mutation
  pageChange(val) {
    this.dialogPageNUm = val;
    // 调用请求
  }
}
interface TableData {
  id: string;
  eafName: string;
  rateWorkType: string;
  grade: string;
  rank: string;
  modifyBy: string;
  operation: string;
  project: string;
  company: string;
}
interface AddRate {
  id: string;
  eafName: string;
  rateWorkType: string;
  grade: string;
  rank: string;
  modifyBy: string;
  company: string;
  project: string;
}
interface SearchList {
  eafName: string;
  rateWorkType: string;
  grade: string;
  rank: string;
  startTime: string;
  endTime: string;
  company: string;
  project?: string;
}
interface Examine {
  eafName: string;
  rateWorkType: string;
  grade: string;
  rank: string;
  modifyBy: string;
  company: string;
  project: string;
}
