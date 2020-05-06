/*
 * @Date         : 2020-04-30 10:07:56
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-07 02:56:45
 * @FilePath     : \src\store\modules\LoginStore.ts
 */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient"
import { Message } from 'iview'
import router from '../../router/.invoke/router'

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "LoginStore",
  store,
})
export default class LoginStore extends VuexModule {

  public username: String = 'CYGRADMIN'; //state
  public password: String = '';
  public roleName: any;

  constructor(e) {
    super(e)
  }
  @Action({ commit: 'success' })
  public async login() {
    await request.post('api/workerlib/login', {
      "username": this.username,
      "password": this.password,
    }).then((data) => {
      if (data.data) {
        sessionStorage.setItem('loginInfo', JSON.stringify(data));
        this.roleName = JSON.parse(sessionStorage.getItem('loginInfo')).data.userGroupRoleModels[0].role.roleName;
        if (this.roleName && this.roleName == '讲师') {
          sessionStorage.setItem("type", "lecturerManagement");
          sessionStorage.setItem("menuName", "讲师管理");
          router.push({ path: '/nav/lecturer' })
        } else if (this.roleName && this.roleName == '外部监理') {
          sessionStorage.setItem("type", "comprehensiveAssessment");
          sessionStorage.setItem("menuName", "综合评价");
          router.push({ path: '/nav/comments' })
        } else if (this.roleName && this.roleName == '工人') {
          router.push({ path: '/login' })
          let alert: any = Message;
          alert.warning('工人禁止登录！')
        } else {
          sessionStorage.setItem("type", "homepage");
          sessionStorage.setItem("menuName", "主页");
          router.push({ path: '/nav/homePage' })
        }

      } else {
        let alert: any = Message;
        alert.warning('账号或密码错误！');
      }
    }).catch((e) => {
      console.log(e)
      let alert: any = Message;
      if (!e) {
        alert.warning('未知错误！')
        return
      }

      if (e.response && e.response.data && e.response.data.message) {
        alert.warning(e.response.data.message)
        return
      }

      if (!e.message) {
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

  @Mutation
  private success(data: any) {
    // console.log('22222222222222222222222')
  }
}
