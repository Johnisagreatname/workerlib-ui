import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient"

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "LoginStore",
    store,
})
export default class LoginStore extends VuexModule {
    public username:String = 'admin'; //state
    public password:String = '';

    get getUsername() { //getter
        return this.username
    }

    get getPassword() { //getter
        return this.password
    }

    @Action({ commit: 'success' })
    public async login() {
        request.post('api/login', {
            "username" : "admin",
            "password" : "admin"
        }).then((res)=>{
            debugger
        }).catch((e)=>{});
    }

    @Mutation
    private success(data: any) {

    }
}
