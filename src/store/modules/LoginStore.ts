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

    set setUsername(v) { //setter
        debugger
        this.username = v
    }

    set setPassword(v) { //setter
        debugger
        this.password = v
    }

    @Action({ commit: 'success' })
    public async login() {
        debugger
        await request.post('api/login', {
            "username" : this.username,
            "password" : this.password,
        }).then((res)=>{

        }).catch((e)=>{
            console.log(e)
        });
    }

    @Mutation
    private success(data: any) {
        console.log('22222222222222222222222')
    }
}
