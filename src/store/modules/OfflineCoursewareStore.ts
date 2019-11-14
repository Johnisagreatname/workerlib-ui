import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "OfflineCoursewareStore",
    store,
})
export default class OfflineCoursewareStore extends VuexModule {
    public offlineCourseware? : Array<any> = [
        {title:'钢筋工前知识培训',hour:'8',name:'钢筋工'},
        {title:'电焊工前知识培训',hour:'6',name:'电焊工'},
        {title:'水泥工前知识培训',hour:'9',name:'水泥工'},
        {title:'电工前知识培训',hour:'10',name:'电工'}
    ];
}
