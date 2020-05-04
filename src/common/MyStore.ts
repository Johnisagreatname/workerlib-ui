import { Mutation } from "vuex-module-decorators";
/*
 * @Date         : 2020-05-04 19:33:13
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-04 19:42:57
 * @FilePath     : \src\common\MyStore.ts
 */
import { VuexModule } from "vuex-module-decorators";

export default class MyStore extends VuexModule {
  constructor(e) {
    super(e);
  }
  @Mutation
  set({ key, value }) {
    this[key] = value;
  }
}
