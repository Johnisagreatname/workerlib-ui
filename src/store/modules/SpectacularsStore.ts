import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "SpectacularsStore",
    store,
})
export default class SpectacularsStore extends VuexModule {

}
