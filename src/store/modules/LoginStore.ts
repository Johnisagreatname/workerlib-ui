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

    @Action({ commit: 'success' })
    public async login() {
        await request.post('api/login', {
            "username" : this.username,
            "password" : this.password,
        }).then((res)=>{
            console.log(res)
            debugger
            this["$router"].push({name: 'Home'})
        }).catch((e)=>{
            console.log(e)
        });
    }

    @Mutation
    private setUsername(data: String) {
        this.username = data;
    }

    @Mutation
    private setPassword(data: String) {
        this.password = data;
    }

    @Mutation
    private success(data: any) {
        // console.log('22222222222222222222222')
    }
}
