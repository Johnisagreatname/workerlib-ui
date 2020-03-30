import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";
import router from '../../router/.invoke/router'


@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "MoveLogin",
    store,
})
export default class MoveLoginStore extends VuexModule {

    public username:String = 'admin'; //state
    public password:String = '';
    public roleName:any;
    constructor(e) {
        super(e)
    }
    @Action({ commit: 'success' })
    public async login() {
        await request.post('api/workerlib/login', {
            "username" : this.username,
            "password" : this.password,
        }).then((data)=>{
            if (data.data) {
                sessionStorage.setItem('loginInfo', JSON.stringify(data));
                this.roleName = JSON.parse(sessionStorage.getItem('loginInfo')).data.userGroupRoleModels[0].role.roleName;
                router.push({path: '/spectaculars'})

            } else {
                let alert: any = Message;
                alert.warning('账号或密码错误！');
            }
        }).catch((e)=>{
            console.log(e)
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }

            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }

            if(!e.message) {
                return;
            }

            alert.warning(e.message || e)
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
}