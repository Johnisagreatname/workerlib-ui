/*
 * @Date         : 2020-04-28 10:01:44
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-29 19:45:16
 * @FilePath     : \src\store\modules\HomePageStore.ts
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
}
interface TableData {
  name: string;
  behavior: string;
  punish: string;
  photoId: number;
}
