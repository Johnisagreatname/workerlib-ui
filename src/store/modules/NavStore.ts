import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient"
import { Message } from 'iview'
import {Watch} from "vue-property-decorator";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "NavStore",
    store,
})
    export default class NavStore extends VuexModule {

    public title:String = '首页'; //state


    @Mutation
    private setTitle(data: any) {
        this.title = data
    }
}
