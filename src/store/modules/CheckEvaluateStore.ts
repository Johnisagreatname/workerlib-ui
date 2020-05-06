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
  public tableData: Array<TableData> = [];
  public total: number = 100;
  public addDialog: boolean = false;
  public pageNum: number = 1;
  public addRateObject: AddRate = {
    userId: null,
    userName: null,
    rateWorkType: null,
    grade: null,
    rank: null,
    modifyBy: null,
  };
  public examineDialog: boolean = false;
  public examineTableData: Array<Examine> = [];
  public dialogPageSize: number = 15;
  public dialogPageNUm: number = 1;
  public dialogTotal: number = 0;
  public rateWorkTypeList: Array<any> = [];
  public detailsId: number = null;
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
  async submit() {
    if (
      !this.addRateObject.grade ||
      !this.addRateObject.modifyBy ||
      !this.addRateObject.rateWorkType
    ) {
      MessageUtils.warning("请填写必填项!");
      return;
    }

    if (this.addRateObject.grade != "初级" && !this.addRateObject.rank) {
      MessageUtils.warning("请填写必填项!");
      return;
    }

    await this.insertUpCultivate();
    this.clear();
    this.set({ key: "addDialog", value: false });
    this.search({
      eafName: "",
      rateWorkType: "",
      grade: "",
      rank: "",
      startTime: "",
      endTime: "",
      company: "",
      project: "",
    });
  }
  //新增
  @Action
  public async insertUpCultivate() {
    let params: Array<any> = [];
    let time: string = await this.getTime(this.addRateObject.modifyBy);
    let nameList = this.addRateObject.userName.split(",");
    let idList = this.addRateObject.userId.split(",");
    idList.forEach((item, index) => {
      params.push({
        userId: item,
        name: nameList[index],
        rateWorkType: this.addRateObject.rateWorkType,
        grade: this.addRateObject.grade,
        rank: this.addRateObject.rank,
        evaluateTime: time,
      });
    });
    await request
      .put("/api/workerlib/user_rate", params)
      .then((data) => {
        let alert: any = Message;
        if (!data) {
          return;
        }
        alert.success("新增成功！");
        return;
      })
      .catch((e) => {
        let alert: any = Message;
        if (!e) {
          alert.warning("未知错误！");
          return;
        }
        if (e.response && e.response.data && e.response.data.message) {
          alert.warning(e.response.data.message);
          return;
        }
        if (!e.message) {
          return;
        }
        alert.warning(e.message || e);
      });
  }
  @Action
  async search(objs: SearchList) {
    let obj: SearchList = Object.assign({}, objs);
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      if (Array.isArray(obj[keys[i]]) && obj[keys[i]][0] && obj[keys[i]][1]) {
        let start = await this.getTime(obj[keys[i]][0]);
        let end = await this.getTime(obj[keys[i]][1]);
        obj.startTime = start;
        obj.endTime = end;
      } else if (!obj[keys[i]]) {
        obj[keys[i]] = "";
      }
    }
    let params: any = await this.getSearchParams(obj);
    this.getTableData(params);
  }
  @Action
  getTime(date) {
    let y = date.getFullYear();
    let m: string | number = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d: string | number = date.getDate();
    d = d < 10 ? "0" + d : d;
    return `${y}-${m}-${d}`;
  }
  //技能鉴定分组
  @Action
  public async getTableData(params) {
    await request
      .post("/api/workerlib/skillappraisal", params)
      .then((total) => {
        if (!total) {
          return;
        }
        this.changeTableData(total.data);
        this.evaluateCount(params);
      })
      .catch((e) => {
        MessageUtils.warning(e);
      });
  }
  @Mutation
  changeTableData(data) {
    this.tableData = data;
  }
  //技能鉴定分组分页
  @Action
  public async evaluateCount(params) {
    await request
      .post("/api/workerlib/skillappraisal/count", params)
      .then((total) => {
        if (!total) {
          return;
        }
        this.set({ key: "total", value: total.data });
      })
      .catch((e) => {
        MessageUtils.warning(e);
      });
  }
  @Action
  addRate(row) {
    if (row.length) {
      let name: string = "",
        userId: string = "",
        workType: Array<any> = [];
      row.forEach((a, index) => {
        name += a.userName + (row[index + 1] ? "," : "");
        userId += a.userId + (row[index + 1] ? "," : "");
        if (a.allWorkType) {
          workType.push(a.allWorkType);
        }
      });
      this.set({ key: "addRateObject.userName", value: name });
      this.set({ key: "addRateObject.userId", value: userId });
      let temp = new Array();
      if (workType.length === 1) {
        temp = workType[0].split(",");
      } else {
        for (let i = 0; i < workType.length - 1; i++) {
          if (i > 0 && !temp.length) {
            break;
          }

          let arr1: Array<any> = temp;
          if (i === 0) {
            arr1 = workType[i].split(",");
          }

          let arr2: Array<any> = workType[i + 1].split(",");
          temp = arr2.filter((a) => arr1.includes(a));
        }
      }

      this.getRateWorkTypeList(Array.from(new Set(temp)));
      if (temp.length) {
        this.set({ key: "addDialog", value: true });
      }
    } else {
      MessageUtils.warning("请选择人员！");
    }
  }
  @Mutation
  getRateWorkTypeList(list) {
    if (list.length) {
      let temp: Array<any> = list.map((a) => {
        return { name: a };
      });
      this.rateWorkTypeList = temp;
    } else {
      MessageUtils.warning("选择的人员没有共同工种，无法评级！");
    }
  }
  //详情查看
  @Action
  public async details(row?: any) {
    if (row) {
      this.set({ key: "detailsId", value: row.userId });
    }
    await request
      .post("/api/workerlib/user_rate", {
        pageInfo: {},
        conditionList: [
          {
            name: "userId",
            value: this.detailsId,
            algorithm: "EQ",
          },
        ],
        sortList: [
          {
            name: "createOn",
            desc: true,
          },
        ],
        groupList: [],
        keywords: [],
        selectList: [
          { field: "userId" },
          { field: "rateWorkType" },
          { field: "grade" },
          { field: "rank" },
          { field: "evaluateTime" },
          { field: "createOn" },
          { field: "name" },
        ],
      })
      .then((total) => {
        if (!total) {
          return;
        }
        this.set({ key: "examineDialog", value: true });
        this.changeDetailData(total.data);
        this.evaluateDetailsCount(row.userId);
      })
      .catch((e) => {
        MessageUtils.warning(e);
      });
  }
  @Mutation
  changeDetailData(data) {
    this.examineTableData = data;
  }
  //详情分页
  @Action
  public async evaluateDetailsCount(archivesId: string) {
    await request
      .post("/api/workerlib/user_rate/count", {
        pageInfo: {},
        conditionList: [
          {
            name: "userId",
            value: archivesId,
            algorithm: "EQ",
          },
        ],
        sortList: [],
        groupList: [],
        keywords: [],
        selectList: [
          { field: "userId" },
          { field: "rateWorkType" },
          { field: "grade" },
          { field: "rank" },
          { field: "evaluateTime" },
          { field: "createOn" },
        ],
      })
      .then((total) => {
        if (!total) {
          return;
        }
        this.set({ key: "dialogTotal", value: total.data });
      })
      .catch((e) => {
        MessageUtils.warning(e);
      });
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
    this.details();
  }

  @Action
  public getSearchParams(obj): any {
    let conditionList: Array<any> = [];
    if (obj.eafName) {
      let item = {};
      item["name"] = "userName";
      item["value"] = obj.eafName;
      item["algorithm"] = "EQ";
      conditionList.push(item);
    }
    if (obj.rateWorkType) {
      let item = {};
      item["name"] = "rateWorkType";
      item["value"] = obj.rateWorkType;
      item["algorithm"] = "EQ";
      conditionList.push(item);
    }
    if (obj.grade) {
      let item = {};
      item["name"] = "grade";
      item["value"] = obj.grade;
      item["algorithm"] = "EQ";
      conditionList.push(item);
    }
    if (obj.rank) {
      let item = {};
      item["name"] = "rank";
      item["value"] = obj.rank;
      item["algorithm"] = "EQ";
      conditionList.push(item);
    }
    if (obj.startTime) {
      let item = {};
      item["name"] = "evaluateTime";
      item["value"] = obj.startTime;
      item["algorithm"] = "GTEQ";
      conditionList.push(item);
    }
    if (obj.endTime) {
      let item = {};
      item["name"] = "evaluateTime";
      item["value"] = obj.endTime;
      item["algorithm"] = "LTEQ";
      conditionList.push(item);
    }
    if (obj.project) {
      let item = {};
      item["name"] = "projectName";
      item["value"] = obj.project;
      item["algorithm"] = "LIKE";
      conditionList.push(item);
    }
    if (obj.company) {
      let item = {};
      item["name"] = "unitName";
      item["value"] = obj.company;
      item["algorithm"] = "LIKE";
      conditionList.push(item);
    }
    return {
      pageInfo: {
        pageIndex: this.pageNum,
        pageSize: 15,
      },
      conditionList: conditionList,
      sortList: [],
      groupList: [],
      keywords: [],
      selectList: [],
    };
  }
}
interface TableData {
  projectName: string;
  unitName: string;
  userId: string;
  userName: string;
  rateWorkType: string;
  grade: string;
  rank: string;
  evaluateTime: string;
}
interface AddRate {
  userId: string;
  userName: string;
  rateWorkType: string;
  grade: string;
  rank: string;
  modifyBy: string;
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
