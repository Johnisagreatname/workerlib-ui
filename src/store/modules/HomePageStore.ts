/*
 * @Date         : 2020-04-28 10:01:44
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-30 17:01:56
 * @FilePath     : /src/store/modules/HomePageStore.ts
 */
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import { Message } from "iview";

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "HomePageStore",
  store,
})
export default class HomePageStore extends VuexModule {
  public tableData: Array<TableData>;
  public typeOfWorkTotal: number = 0;
  public ownConstructionTeam: number = 0;
  public externalConstructionTeam: number = 0;
  public constructionProject: number = 0;
  public onlineProject: number = 0;
  public offlineProject: number = 0;
  public onlineWorker: number = 0;
  public offlineWorker: number = 0;



  private totalCategory: number;
  private eafUserIn: number;
  private anyTotal: number;
  private anyData: any;
  //分页
  public pageIndex: number;
  constructor(e) {
    super(e);
    this.tableData = [
      {
        name: "啊调查",
        behavior: "打架",
        punish: "停职三个月",
        photoId: 123,
      },
      {
        name: "啊调查",
        behavior: "打架",
        punish: "停职三个月",
        photoId: 123,
      },
      {
        name: "啊调查",
        behavior: "打架",
        punish: "停职三个月",
        photoId: 123,
      },
      {
        name: "啊调查",
        behavior: "打架",
        punish: "停职三个月",
        photoId: 123,
      },
    ];



    this.totalCategory = 0;
    this.eafUserIn = 0;
    this.anyTotal = 0;
    this.anyData = [];
    //分页
    this.pageIndex = 1;
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
  }
  @Action
  async getJobs(key) {
    switch (key) {
      case "own":
        // 这里请求自有工人数据
        return new Promise((res, rej) => {
          setTimeout(() => {
            res([{ name: "自有工人", value: 123, color: "pink" }]);
          }, 1000);
        });
      case "epiboly":
        // 这里请求分包工人数据
        return new Promise((res, rej) => {
          setTimeout(() => {
            res([{ name: "分包工人", value: 123, color: "red" }]);
          }, 1000);
        });
      default:
        return;
    }
  }
  @Action
  async certificate() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            name: "架子工",
            hasCertificate: 20,
            inexistence: 100,
          },
          {
            name: "水泥工",
            hasCertificate: 40,
            inexistence: 10,
          },
          {
            name: "钢筋工",
            hasCertificate: 432,
            inexistence: 324,
          },
          {
            name: "小工",
            hasCertificate: 433,
            inexistence: 123,
          },
        ]);
      }, 1000);
    });
  }
  @Action
  async courseware() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            name: "安全类",
            value: 20,
          },
          {
            name: "取证类",
            value: 40,
          },
          {
            name: "管理类",
            value: 432,
          },
          {
            name: "专业技能类",
            value: 433,
          },
        ]);
      }, 1000);
    });
  }
  @Action
  async workers() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            name: "架子工",
            value: 20,
          },
          {
            name: "水泥工",
            value: 40,
          },
          {
            name: "钢筋工",
            value: 432,
          },
          {
            name: "小工",
            value: 433,
          },
        ]);
      }, 1000);
    });
  }
  @Action
  async cultivate() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            name: "1月",
            value: 20,
          },
          {
            name: "2月",
            value: 40,
          },
          {
            name: "3月",
            value: 432,
          },
          {
            name: "4月",
            value: 433,
          },
        ]);
      }, 1000);
    });
  }
  // @Mutation

  //set
  @Mutation
  public setPageIndex(data: number) {
    this.pageIndex = data;
  }

  ////工种总数 searchCount(url:dictionaries,conName:category,status:工种)
  ////自有队伍人数 searchCount(url:Archives,conName:eafUserStatus,status:0)
  ////外部队伍人数 searchCount(url:Archives,conName:eafUserStatus,status:1)
  ////工程总数 searchCount(url:project)
  ////在建工程总数 searchCount(url:project,conName:status,status:2)
  ////未开工工程总数 searchCount(url:project,conName:status,status:1)
  ////在场工人数 searchCount(url:Archives,conName:leave,status:1)
  ////离场工人数 searchCount(url:Archives,conName:leave,status:2)

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
  // public async searchCount({ url, conName = '', status = '', variable }: SearchCount) {
  public async searchCount({ url, params = null, variable }: SearchCount) {
    await request.post('/api/workerlib/' + url + '/count', await this.getUpdateParams(params)).then((data) => {
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
  public async searchData({ url, conName = "", status = "" }: SearchData) {
    await request.post('/api/workerlib/' + url, await this.getUpdateParams([{ name: conName, value: status }])).then((data) => {
      if (!data) {
        return;
      }
      debugger
      this.anyData = data.data
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

  //工种人数统计 searchData(url:worktypenumber,conName:eafUserStatus,status:0或是1)0是自有,1是外部
  //技能工种评定统计 searchData(url:grade)
  //职业证书统计 searchData(url:worktypeview）
  //培训统计 searchData(url:cultivate_statistics,conName:year,status:new Date().getFullYear())
  //培训课件统计 searchData(url:coursewareview)
  //视频 searchData(url:indexVideo,conName:type,status:video)
  //图片 searchData(url:indexVideo,conName:type,status:photo)
  //不良记录统计
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
      this.anyData = total.data;
    }).catch((e) => {
      MessageUtils.warning(e);
    });
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
  status?: string
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