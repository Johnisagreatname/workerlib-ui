import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "LecturerStore",
    store,
})
export default class LecturerStore extends VuexModule {
    // public lecturers: Array<LecturerInfo>;
    // public lecturerInfo:LecturerInfo;
    //
    // public selectLecturerType:number;
    // public selectCurriculum: string;
    //
    // private user:string;
    // private passWord:string;
    // private userId:number;
    // private lecturer:number;
    // private lecturerPageTotal : number;
    // private lecturerConditionList:Array<any>;
    // private workTypeList:Array<any>; //工种列表
    // private CurriculumList:Array<any>//课程列表
    // //分页
    // private PageSize : number;
    // private PageIndex : number;
    // private PageTotal : number;

    private lecturerConditionList:Array<any>;
    private pullDown: boolean;
    public selectLecturerType:number;
    public selectLecturerCurriculum: string;

    constructor(e) {
        super(e)
        this.lecturerConditionList = [];
        this.selectLecturerCurriculum=null;
        this.selectLecturerType = 1;
        this.pullDown = false;
        //
        // this.lecturerInfo = {};
        // this.lecturers = [];
        // this.user = null;
        // this.lecturer=0;
        // this.passWord = null;
        // this.userId = null;
        // this.lecturerPageTotal = 0;
        // this.workTypeList = [];
        // this.CurriculumList = [];
        // this.PageSize = 15;
        // this.PageIndex = 1;
        // this.PageTotal = 0;
        // this.selectLectuerName = null;
    }
    // //set
    // @Mutation
    // private setLecturerPageTotal(data : any){
    //     this.lecturerPageTotal = data;
    //     this.lecturerConditionList = new Array<any>();
    // }
    // @Mutation
    // private setSelectCurriculum(data : any){
    //     this.selectCurriculum = data;
    // }
    //
    // // 查询项目列表条件
    // @Action
    // public getLecturerListParams() : any {
    //     return {
    //         "pageInfo" : {},
    //         "conditionList":[],
    //         "sortList": [],
    //         "groupList" : [],
    //         "keywords" : [],
    //         "selectList": []
    //     };
    // }
    // //新增or修改参数
    // //第一个参数是讲师表的id（新增给空值，修改给具体的id）
    // //第二个参数是讲师表对应的用户userid（新增必须给具体值，修改时不用给参数）
    // @Action
    // public getUpdateParams(id?:number,userid?:number): any{
    //     let item : number;
    //     if (id){
    //         item=id;
    //     }else {
    //         item = null
    //     }
    //     let params:any={
    //         "id":item,
    //         "name":this.lecturerInfo.name,
    //         "curriculum":this.lecturerInfo.curriculum,
    //         "type":this.lecturerInfo.type,
    //         "photo":this.lecturerInfo.photo,
    //         "personalreesume":this.lecturerInfo.personalreesume,
    //     }
    //     if (userid){
    //         params.userid=userid;
    //     }
    //     return{
    //         params
    //     }
    // }
    //
    // // 人员列表
    // @Action
    // public getUserListParams() : any{
    //     if(this.selectCurriculum){
    //         let item ={};
    //         item["name"]="curriculum";
    //         item["value"]=this.selectCurriculum;
    //         item["algorithm"] = "EQ"
    //         this.ConditionList.push(item);
    //     }
    //
    //     return {
    //         "pageInfo" : {
    //             "pageIndex": this.PageSize,
    //             "pageSize": this.PageIndex
    //         },
    //         "conditionList": this.ConditionList,
    //         "sortList": [],
    //         "groupList" : [],
    //         "keywords" : [],
    //         "selectList": []
    //     }
    //
    // }
    // //搜索
    // @Action
    // public async searchUserList(){
    //     await request.post('/api/workerlib/projectuser',await this.getUserListParams()).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.success(data);
    //         this.searchLecturerCount();
    //     }).catch((e)=>{
    //         console.log(e)
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！')
    //             return
    //         }
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //         if(!e.message) {
    //             return;
    //         }
    //         alert.warning(e.message || e)
    //     });
    // }

    @Action
    public getLecturerListParams() : any{
        if(this.selectLecturerCurriculum){
            let item ={};
            item["name"]="curriculum";
            item["value"]=this.selectLecturerCurriculum;
            item["algorithm"] = "Like"
            this.lecturerConditionList.push(item);
        }
        if(this.selectLecturerType){
            let item ={};
            item["name"]="type";
            item["value"]=this.selectLecturerType;
            item["algorithm"] = "EQ"
            this.lecturerConditionList.push(item);
        }

        return {
            "pageInfo" : {},
            "conditionList": this.lecturerConditionList,
            "sortList": [],
            "groupList": [],
            "keywords": [],
            "selectList": []
        }

    }

    //查询
    @Action
    public async searchLecturerList() {
        await request.post('/api/workerlib/lecturer', {

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successSearchLecturerList(data)
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }

            alert.warning(e.message || e)
        });
    }
    // //新增用户
    // @Action
    // public async insertUser() {
    //     await request.put('/api/workerlib/user', {
    //         "username":this.user,
    //         "password":this.passWord,
    //     }).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.insertUserGroupRole(data.data);
    //     }).catch((e)=>{
    //         console.log(e)
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！');
    //             return;
    //         }
    //
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //
    //         if(!e.message) {
    //             return;
    //         }
    //
    //         alert.warning(e.message || e)
    //     });
    // }
    // //新增用户权限
    // @Action
    // public async insertUserGroupRole(id) {
    //     await request.put('/api/workerlib/usergrouprole',{
    //             "roleId":"2efb9883af714d85a76bfc7aba92feec",
    //             "userId":id,
    //             "userGroupRoleId":null,
    //             "groupId":null
    //         }
    //     ).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.insertLecturer(id);
    //     }).catch((e)=>{
    //         console.log(e)
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！');
    //             return;
    //         }
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //         if(!e.message) {
    //             return;
    //         }
    //         alert.warning(e.message || e)
    //     });
    // }
    // //新增讲师
    // @Action
    // public async insertLecturer(id) {
    //     await request.put('/api/workerlib/lecturer', await this.getUpdateParams(null,id)).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.added(data)
    //     }).catch((e)=>{
    //         console.log(e)
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！');
    //             return;
    //         }
    //
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //
    //         if(!e.message) {
    //             return;
    //         }
    //
    //         alert.warning(e.message || e)
    //     });
    // }
    //
    // //分页接口
    // @Action
    // public async searchLecturerCount() {
    //     await request.post('/api/workerlib/lecturer/count',await this.getLecturerListParams()).then((total)=>{
    //         if(!total){
    //             return;
    //         }
    //          this.setLecturerPageTotal(total.data)
    //     }).catch((e)=>{
    //         MessageUtils.warning(e);
    //     });
    // }
    //
    // //修改讲师,未完成
    // @Action
    // public async updateLecturerCount(lecturerId) {
    //     await request.put('/api/workerlib/lecturer/'+lecturerId,await this.getUpdateParams(null,null)).then((total)=>{
    //         if(!total){
    //             return;
    //         }
    //         this.setLecturerPageTotal(total.data)
    //     }).catch((e)=>{
    //         MessageUtils.warning(e);
    //     });
    // }
    //
    // //批量删除讲师
    // //第一个参数url是要删除的表
    // //第二个参数要删除的id数组
    // @Action
    // public async delete(url:string,array:Array<number|string>) {
    //     await request.post('/api/workerlib/'+url+'/delete',array).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.added(data)
    //     }).catch((e)=>{
    //         console.log(e)
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！')
    //             return
    //         }
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //         if(!e.message) {
    //             return;
    //         }
    //         alert.warning(e.message || e)
    //     });
    // }
    // //查询类型,不合理
    // @Action
    // public async searchLecturerType() {
    //     await request.post('/api/workerlib/lecturer',await this.getLecturerListParams()).then((total)=>{
    //         if(!total){
    //             return;
    //         }
    //         this.setLecturerPageTotal(total.data)
    //     }).catch((e)=>{
    //         MessageUtils.warning(e);
    //     });
    // }
    // //课程列表
    // @Action
    // public getCurriculumListParams() : any {
    //     return {
    //         "pageInfo" : {},
    //         "conditionList":[{
    //             "name" : "category",
    //             "value": "工种",
    //             "algorithm": "EQ"
    //         }],
    //         "sortList": [],
    //         "groupList" : [],
    //         "keywords" : [],
    //         "selectList": [
    //             {"field": "name","alias":"workTypeName"},
    //             {"field": "value","alias":"workTypeValue"}
    //         ]
    //     };
    // }
    // //课程
    // @Action
    // public async searchCurriculum() {
    //     await request.post('/api/workerlib/lecturer',await this.getCurriculumListParams()).then((total)=>{
    //         if(!total){
    //             return;
    //         }
    //         this.successCurriculumList(total.data)
    //     }).catch((e)=>{
    //         MessageUtils.warning(e);
    //     });
    // }
    // // 工种列表
    // @Action
    // public getWorkTypeListParams() : any {
    //     return {
    //         "pageInfo" : {},
    //         "conditionList":[],
    //         "sortList": [],
    //         "groupList" : [],
    //         "keywords" : [],
    //         "selectList": [
    //             {"field": "name","alias":"workTypeName"},
    //             {"field": "value","alias":"workTypeValue"}
    //         ]
    //     };
    // }
    //
    // //工种
    // @Action
    // public async searchWorkTypeList() {
    //     await request.post('/api/workerlib/dictionaries',await this.getWorkTypeListParams()).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.successWorkTypeList(data);
    //     }).catch((e)=>{
    //         console.log(e)
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！')
    //             return
    //         }
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //         if(!e.message) {
    //             return;
    //         }
    //         alert.warning(e.message || e)
    //     });
    // }
    // @Mutation
    // private successWorkTypeList(data){
    //     this.workTypeList = data.data;
    // }
    // @Mutation
    // private successCurriculumList(data){
    //     this.CurriculumList = data.data;
    // }
    //
    // //导出
    // @Action
    // public async uploadPeople() {
    //     let alert: any = Message;
    //     await request.post('/api/workerlib/view_lecturer/export',{
    //         "conditionList": [
    //         ],
    //         "keywords" : [],
    //         "selectList": [
    //             {"field": "name" ,"alias":"姓名"},
    //             {"function": "type","alias":"类型" },
    //             {"field": "personalreesume" ,"alias":"履历"},
    //             {"field": "curriculum" ,"alias":"课程"},
    //         ]
    //     }).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         alert.success('成功！');
    //     }).catch((e)=>{
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！');
    //             return
    //         }
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //         if(!e.message) {
    //             return;
    //         }
    //         alert.warning(e.message || e)
    //     });
    // }
    //
    //
    // @Mutation
    // private success(data: any) {
    //     this.lecturers = data.data;
    // }
    // @Action
    // public added(data: any) {
    //     if(data.status == 0) {
    //         this.search();
    //         let alert: any = Message;
    //         alert.success('成功！');
    //     }
    // }
    //
    // @Mutation
    // private setSelectType(data: number) {
    //     this.selectType = data;
    // }
    //
    // @Mutation
    // public setType(data:number){
    //     this.lecturerInfo.type=data;
    // }
    // @Mutation
    // public setCurriculum(data:string){
    //     this.lecturerInfo.curriculum=data;
    // }
    // @Mutation
    // public setName(data:string){
    //     this.lecturerInfo.name=data;
    // }
    // @Mutation
    // public setPhoto(data:string){
    //     this.lecturerInfo.photo=data;
    // }
	// @Mutation
    // public setPersonalreesume(data:string){
    //     this.lecturerInfo.personalreesume=data;
    // }
	// @Mutation
    // public setUser(data:string){
    //     this.user=data;
    // }
	// @Mutation
    // public setPassWord(data:string){
    //     this.passWord=data;
    // }
    //
    // @Mutation
    // private switchPullDown(){
    //     this.pullDown = !this.pullDown;
    // }
}

interface LecturerInfo {
    name?: string;
    type?: number;
    photo?: string;
    curriculum?:string;
    id?: number;
	personalreesume?:string;
}
