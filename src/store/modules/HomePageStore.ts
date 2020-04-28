/*
 * @Date         : 2020-04-28 10:01:44
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-28 10:05:31
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
  // @Action
  // @Mutation
}
