import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient"
import { Message } from 'iview'

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "NavStore",
    store,
})
export default class LoginStore extends VuexModule {

    public title:String = '数据中心'; //state

    @Mutation
    private setTitle(data: any) {
        this.title = data
    }
}
