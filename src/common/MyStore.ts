import { Mutation } from "vuex-module-decorators";
/*
 * @Date         : 2020-05-04 19:33:13
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-05 16:16:47
 * @FilePath     : \src\common\MyStore.ts
 */
import { VuexModule } from "vuex-module-decorators";

export default class MyStore extends VuexModule {
  constructor(e) {
    super(e);
  }
  @Mutation
  set({ key, value }) {
    if (!key.includes(".")) {
      this[key] = value;
    } else {
      let obj = this;
      let arr = key.split(".");
      arr.forEach((item, index) => {
        key = item;
        if (index !== arr.length - 1) {
          obj = obj[key];
        }
      });
      obj[key] = value;
    }
  }
}
