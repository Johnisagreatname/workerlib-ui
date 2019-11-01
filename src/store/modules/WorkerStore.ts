import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "WorkerStore",
    store,
})
export default class WorkerStore extends VuexModule {
    public peoples? : Array<any> = [
        {name:'裴灏杰',sex:'男',age:'25',phone:'13059267735',cards:'430***********8744',profession:'资料员',state:'在职'},
        {name:'范佳超',sex:'男',age:'28',phone:'15278953355',cards:'330***********5432',profession:'资料员',state:'在职'},
        {name:'林陆锐',sex:'男',age:'29',phone:'15977565653',cards:'462***********2518',profession:'资料员',state:'在职'},
        {name:'陈吕',sex:'男',age:'25',phone:'15688539953',cards:'356***********5686',profession:'资料员',state:'在职'}
    ];

}
