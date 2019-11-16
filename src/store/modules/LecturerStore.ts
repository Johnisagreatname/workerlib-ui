import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "LecturerStore",
    store,
})
export default class LecturerStore extends VuexModule {
    public lecturer? : Array<any> = [
        {name:'裴灏杰',curriculum:'岗前安全培训',evaluate:"7"},
        {name:'范佳超',curriculum:'岗前安全培训',evaluate:"7"},
        {name:'林陆锐',curriculum:'岗前安全培训',evaluate:"10"},
        {name:'陈吕',curriculum:'岗前安全培训',evaluate:"8"}
    ];
}
