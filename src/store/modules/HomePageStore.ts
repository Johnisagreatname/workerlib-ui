/*
 * @Date         : 2020-04-28 10:01:44
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-07 03:35:21
 * @FilePath     : \src\store\modules\HomePageStore.ts
 */
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import { Message } from "iview";
import Account from '../../components/Nav/Account/Index.vue';

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "HomePageStore",
  store,
})
export default class HomePageStore extends VuexModule {
  public tableData: Array<TableData> = [];
  public typeOfWorkTotal: number = 0;
  public ownConstructionTeam: number = 0;
  public externalConstructionTeam: number = 0;
  public constructionProject: number = 0;
  public onlineProject: number = 0;
  public offlineProject: number = 0;
  public onlineWorker: number = 0;
  public offlineWorker: number = 0;
  public pageTotal: number = 0;
  public onlineWorkerOwn: number = 0;
  public onlineWorkerExternal: number = 0
  public offlineWorkerOwn: number = 0
  public offlineWorkerExternal: number = 0
  public videoData: any = {}
  public imageData: Array<any> = []
  public pageIndex: number = 1;
  constructor(e) {
    super(e);
  }
  @Action
  getTotal() {
    this.searchCount({ url: "dictionaries", params: [{ name: "category", value: "工种" }], variable: "typeOfWorkTotal" })
    this.searchCount({ url: "Archives", params: [{ name: "eafUserStatus", value: 0 }], variable: "ownConstructionTeam" })
    this.searchCount({ url: "Archives", params: [{ name: "eafUserStatus", value: 1 }], variable: "externalConstructionTeam" })
    this.searchCount({ url: "project", variable: "constructionProject" })
    this.searchCount({ url: "project", variable: "onlineProject", params: [{ name: "status", value: 2 }] })
    this.searchCount({ url: "project", variable: "offlineProject", params: [{ name: "status", value: 1 }] })
    this.searchCount({ url: "Archives", variable: "onlineWorker", params: [{ name: "leave", value: 1 }] })
    this.searchCount({ url: "Archives", variable: "offlineWorker", params: [{ name: "leave", value: 2 }] })
    this.searchCount({ url: "Archives", variable: "onlineWorkerOwn", params: [{ name: "leave", value: 1 }, { name: "eafUserStatus", value: 0 }] })
    this.searchCount({ url: "Archives", variable: "onlineWorkerExternal", params: [{ name: "leave", value: 1 }, { name: "eafUserStatus", value: 1 }] })
    this.searchCount({ url: "Archives", variable: "offlineWorkerOwn", params: [{ name: "leave", value: 2 }, { name: "eafUserStatus", value: 0 }] })
    this.searchCount({ url: "Archives", variable: "offlineWorkerExternal", params: [{ name: "leave", value: 2 }, { name: "eafUserStatus", value: 1 }] })
  }
  @Action
  async getVideo() {
    await this.searchData({ url: "indexVideo", conName: "type", status: "video" }).then(res => {
      this.changeVideoData(res)
    })
  }
  @Mutation
  changeVideoData(data) {
    this.videoData = data
  }
  @Action
  async imgs() {
    await this.searchData({ url: "indexVideo", conName: "type", status: "photo" }).then(res => {
      this.changeImageData(res)
    })
  }
  @Mutation
  changeImageData(data) {
    this.imageData = data
  }
  @Action
  async getJobs(key) {
    switch (key) {
      case "own":
        return new Promise(async (res, rej) => {
          let list = await this.searchData({ url: "worktypenumber", conName: "status", status: 0 })
          res(list)
        });
      case "epiboly":
        return new Promise(async (res, rej) => {
          let list = await this.searchData({ url: "worktypenumber", conName: "status", status: 1 })
          res(list)
        });
      default:
        return;
    }
  }
  @Action
  async certificate() {
    return new Promise(async (res, rej) => {
      let list = await this.searchData({ url: "worktypeview" })
      res(list)
    });
  }
  @Action
  async courseware() {
    return new Promise(async (res, rej) => {
      let list = await this.searchData({ url: "coursewareview" })
      res(list)
    });
  }
  @Action
  async workers() {
    return new Promise(async (res, rej) => {
      let list = await this.searchData({ url: "grade" })
      res(list)
    });
  }
  @Action
  async cultivate() {
    return new Promise(async (res, rej) => {
      let list = await this.searchData({ url: "cultivate_statistics", conName: "year", status: new Date().getFullYear() })
      res(list)
    });
  }
  @Mutation
  public setPageIndex(data: number) {
    this.pageIndex = data;
  }

  //查询条件参数
  @Action
  public getUpdateParams(list: Array<UpdateParams> = null) {
    return new Promise((res, rej) => {
      let params: any = {
        "pageInfo": {},
        "conditionList": [],
        "sortList": [],
        "groupList": [],
        "keywords": [],
        "selectList": []
      }
      if (list) {
        list.forEach((a, index) => {
          params.conditionList.push(new Object())
          params.conditionList[index].name = a.name;
          params.conditionList[index].value = a.value;
          params.conditionList[index].algorithm = "EQ";
        })
      }
      res(params)
    })
  }

  //查询条数
  @Action
  public async searchCount({ url, params = null, variable }: SearchCount) {
    request.post('/api/workerlib/' + url + '/count', await this.getUpdateParams(params)).then((data) => {
      if (!data) {
        return;
      }
      this.changeVariable({ variable, num: data.data })
    }).catch((e) => {
      let alert: any = Message;
      if (!e) {
        alert.warning('未知错误！')
        return
      }
      if (e.response && e.response.data && e.response.data.message) {
        alert.warning(e.response.data.message)
        return
      }
      alert.warning(e.message || e)
    });
  }
  @Mutation
  changeVariable({ variable, num }) {
    this[`${variable}`] = num
  }
  //查询数据
  @Action
  public async searchData({ url, conName = "", status = "" }: SearchData): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let params = conName && (status || status === 0) ? [{ name: conName, value: status }] : null
      await request.post('/api/workerlib/' + url, await this.getUpdateParams(params)).then((data) => {
        if (!data) {
          return;
        }
        resolve(data.data)
      }).catch((e) => {
        let alert: any = Message;
        if (!e) {
          alert.warning('未知错误！')
          return
        }
        if (e.response && e.response.data && e.response.data.message) {
          alert.warning(e.response.data.message)
          return
        }
        alert.warning(e.message || e)
      });
    })
  }

  ////工种人数统计 searchData(url:worktypenumber,conName:eafUserStatus,status:0或是1)0是自有,1是外部
  ////技能工种评定统计 searchData(url:grade)
  ////职业证书统计 searchData(url:worktypeview）
  ////培训统计 searchData(url:cultivate_statistics,conName:year,status:new Date().getFullYear())
  ////培训课件统计 searchData(url:coursewareview)
  //视频 searchData(url:indexVideo,conName:type,status:video)
  //图片 searchData(url:indexVideo,conName:type,status:photo)
  ////不良记录统计
  @Action
  public async countAppraiseCount() {
    await request.post('/api/workerlib/appraise_statistics', {
      "pageInfo": {
        "pageIndex": this.pageIndex,
        "pageSize": 4
      },
      "conditionList": [],
      "sortList": [],
      "groupList": [],
      "keywords": [],
      "selectList": []
    }).then((total) => {
      if (!total) {
        return;
      }
      this.changeTableData(total.data)
    }).catch((e) => {
      MessageUtils.warning(e);
    });
  }
  @Mutation
  changeTableData(data) {
    this.tableData = data;
  }
  @Action
  index(status) {
    let total = this.pageIndex * 4
    let alert: any = Message;
    if (status === "+" && total < this.pageTotal) {
      this.addPageIndex()
      this.countAppraiseCount()
    } else if (status === "+") {
      alert.warning("已经是最后一页了")
    } else if (status === "-" && this.pageIndex > 1) {
      this.reducePageIndex()
    } else if (status === "-") {
      alert.warning("已经是第一页了")
    }
  }
  @Mutation
  addPageIndex() {
    this.pageIndex += 1
  }
  @Mutation
  reducePageIndex() {
    this.pageIndex -= 1
  }
  @Action
  public async count() {
    await request.post('/api/workerlib/appraise_statistics/count', {
      "pageInfo": {
        "pageIndex": this.pageIndex,
        "pageSize": 4
      },
      "conditionList": [],
      "sortList": [],
      "groupList": [],
      "keywords": [],
      "selectList": []
    }).then((total) => {
      if (!total) {
        return;
      }
      this.setPageTotal(total.data)
    }).catch((e) => {
      MessageUtils.warning(e);
    });
  }
  @Mutation
  public setPageTotal(data: number) {
    this.pageTotal = data;
  }
}
interface TableData {
  name: string;
  behavior: string;
  punish: string;
  photoId: number;
}
interface SearchCount {
  url: string;
  params?: Array<UpdateParams>
  variable: string
}

interface SearchData {
  url: string;
  conName?: string;
  status?: any
}

class Condition {
  name: string;
  value: any;
  algorithm: string;
  constructor(name: string, value: any) {
    this.name = name
    this.value = value
    this.algorithm = "EQ"
  }
}

interface UpdateParams {
  name: string;
  value: any
}