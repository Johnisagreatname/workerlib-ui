import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "Auth",
  store,
})
export default class Auth extends VuexModule {
  public count = 12; //state

  get getCount() { //getter
    return this.count;
  }

  @Action({ commit: 'decrement' })
  public async decr() {
    return 3;
    console.log('auth testtt');
  }

  @Mutation
  private decrement(delta: number) {
    console.log('delta', delta);
    this.count -= delta;
  }
}
