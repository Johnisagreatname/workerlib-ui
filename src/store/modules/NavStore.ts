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

    public menuList: Array<any> //state
    constructor(e) {
        super(e);
        this.menuList=[];
        this.menuList.push("主页");
    }

    @Mutation
    private setMenuList(data: any) {
        this.menuList.push(data);
    }
    @Mutation
    private clearMenuList() {
        this.menuList = new Array<any>();
    }
}
