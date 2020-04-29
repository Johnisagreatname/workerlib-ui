/*
 * @Date         : 2020-04-28 10:01:44
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-28 18:28:38
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
  constructor(e) {
    super(e);
  }
  @Action
  async getJobs(key) {
    switch (key) {
      case "own":
        // 这里请求自有工人数据
        return [{ name: "自有工人", value: 123, color: "pink" }];
      case "epiboly":
        // 这里请求分包工人数据
        return [{ name: "分包工人", value: 123, color: "red" }];
      default:
        return
    }
  }
  // @Mutation
}
