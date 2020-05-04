import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import { Message } from "iview";
import MessageUtils from "../../common/MessageUtils";
import Echart from 'echarts';
import router from "../../router/.invoke/router";
import { AxiosRequestConfig } from "axios";

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "SpectacularsStore",
  store,
})
class Condition {
    name : string;
    value: any;
    algorithm:string;
    constructor(name:string,value:any) {
        this.name=name;
        this.value=value;
        this.algorithm="EQ";
    }
}
export default class SpectacularsStore extends VuexModule {
    private totalCategory:number;
    private eafUserIn:number;
    private anyTotal:number;
    private anyData:any;
    //分页
    private pageIndex: number;

    // private condition:object;
    
    constructor(e){
        super(e);
        this.totalCategory=0;
        this.eafUserIn=0;
        this.anyTotal=0;
        this.anyData=[];
        //分页
        this.pageIndex= 1;
    }
  //工种总数 searchCount(url:dictionaries,conName:category,status:工种)
  //自有队伍人数 searchCount(url:Archives,conName:eafUserStatus,status:0)
  //外部队伍人数 searchCount(url:Archives,conName:eafUserStatus,status:1)
  //工程总数 searchCount(url:project)
  //在建工程总数 searchCount(url:project,conName:status,status:2)
  //未开工工程总数 searchCount(url:project,conName:status,status:1)
  //在场工人数 searchCount(url:Archives,conName:leave,status:1)
  //离场工人数 searchCount(url:Archives,conName:leave,status:2)

  //查询条件参数
  @Action
  public getUpdateParams(name?: string, value?: any): any {
    let params: any = {
      "pageInfo": {},
      "conditionList": [],
      "sortList": [],
      "groupList": [],
      "keywords": [],
      "selectList": []
    }
    if (name && value) {
      params.conditionList.name = name;
      params.conditionList.value = value;
      params.conditionList.algorithm = "EQ";
    }
    return {
      params
    }
  }

  //查询条数
  @Action
  public async searchCount(url: string, conName?: string, status?: string) {
    await request.post('/api/workerlib/' + url + '/count', await this.getUpdateParams(conName, status)).then((data) => {
      if (!data) {
        return;
      }
      this.anyTotal = data.data
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
  //查询数据
  @Action
  public async searchData(url: string, conName?: string, status?: string) {
    await request.post('/api/workerlib/' + url, await this.getUpdateParams(conName, status)).then((data) => {
      if (!data) {
        return;
      }
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

  //工种人数统计searchData(url:worktypenumber,conName:eafUserStatus,status:0或是1)0是自有,1是外部
  //技能工种评定统计searchData(url:grade)
  //职业证书统计 searchData（url:worktypeview）
  //培训统计 searchData(url:cultivate_statistics,conName:year,status:new Date().getFullYear())
  //培训课件统计 searchData(url:coursewareview)
  //视频searchData(url:indexVideo,conName:type,status:video)
  //图片searchData(url:indexVideo,conName:type,status:photo)
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
