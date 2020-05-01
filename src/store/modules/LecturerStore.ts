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
    public lecturers: Array<LecturerInfo>;
    public lecturerInfo:LecturerInfo;
    public selectType:number;
    private user:string;
    private passWord:string;
    private userId:number;
    private lecturer:number;
    private lecturerPageTotal : number;
    private lecturerConditionList:Array<any>;
    private workTypeList:Array<any>; //工种列表
    private CurriculumList:Array<any>//课程列表
    //分页
    private PageSize : number;
    private PageIndex : number;
    private PageTotal : number;

    private ConditionList:Array<any>;
    private selectCurriculum:string

    private pullDown: boolean;

    constructor(e) {
        super(e)
        this.lecturerInfo = {};
        this.lecturers = [];
        this.selectType = 1;
        this.user = null;
        this.lecturer=0;
        this.passWord = null;
        this.userId = null;
        this.lecturerPageTotal = 0;
        this.lecturerConditionList = [];
        this.workTypeList = [];
        this.CurriculumList = [];
        this.ConditionList = [];
        this.selectCurriculum=null;
        this.PageSize = 15;
        this.PageIndex = 1;
        this.PageTotal = 0;
        this.pullDown = false;
    }
    //set
    @Mutation
    private setLecturerPageTotal(data : any){
        this.lecturerPageTotal = data;
        this.lecturerConditionList = new Array<any>();
    }
    @Mutation
    private setSelectCurriculum(data : any){
        this.selectCurriculum = data;
    }

    // 查询项目列表条件
    @Action
    public getLecturerListParams() : any {
        return {
            "pageInfo" : {},
            "conditionList":[],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        };
    }
    //新增or修改参数
    @Action
    public getUpdateParams(): any{
        let params:any={
            "name":this.lecturerInfo.name,
            "curriculum":this.lecturerInfo.curriculum,
            "type":this.lecturerInfo.type,
            "photo":this.lecturerInfo.photo,
            "personalreesume":this.lecturerInfo.personalreesume,
        }

        return{
            params
        }
    }

    // 人员列表
    @Action
    public getUserListParams() : any{
        if(this.selectCurriculum){
            let item ={};
            item["name"]="curriculum";
            item["value"]=this.selectCurriculum;
            item["algorithm"] = "EQ"
            this.ConditionList.push(item);
        }

        return {
            "pageInfo" : {
                "pageIndex": this.PageSize,
                "pageSize": this.PageIndex
            },
            "conditionList": this.ConditionList,
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }

    }


    //搜索
    @Action
    public async searchUserList(){
        await request.post('/api/workerlib/projectuser',await this.getUserListParams()).then((data)=>{
            if(!data){
                return;
            }
            this.success(data);
            this.searchLecturerCount();
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

    //查询
    @Action
    public async search() {
        await request.post('/api/workerlib/lecturer', {
            "pageInfo" : {},
            "conditionList":[{
                "name": "type",
                "value": this.selectType,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList": [],
            "keywords": [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.success(data)
            this.searchLecturerCount()
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

    //新增讲师
    @Action
    public async insertLecturer() {
        await request.put('/api/workerlib/lecturer', await this.getUpdateParams()).then((data)=>{
            if(!data){
                return;
            }
            this.added(data)
        }).catch((e)=>{
            console.log(e)
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return;
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

    //分页接口
    @Action
    public async searchLecturerCount() {
        await request.post('/api/workerlib/lecturer/count',await this.getLecturerListParams()).then((total)=>{
            if(!total){
                return;
            }
             this.setLecturerPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    //修改讲师
    @Action
    public async updateLecturerCount(lecturerId) {
        await request.put('/api/workerlib/lecturer/'+lecturerId,await this.getUpdateParams()).then((total)=>{
            if(!total){
                return;
            }
            this.added(total)
            this.search()
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    //批量删除讲师
    //第二个参数要删除的id数组
    @Action
    public async delete(array:Array<number>) {
        await request.post('/api/workerlib/lecturer/delete',array).then((data)=>{
            if(!data){
                return;
            }
            this.added(data)
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

    //课程列表
    @Action
    public getCurriculumListParams() : any {
        return {
            "pageInfo" : {},
            "conditionList":[],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                {"field": "id","alias":"id"},
                {"field": "curriculum","alias":"workTypeValue"}
            ]
        };
    }
    //课程
    @Action
    public async searchCurriculum() {
        await request.post('/api/workerlib/lecturer',await this.getCurriculumListParams()).then((total)=>{
            if(!total){
                return;
            }
            this.successCurriculumList(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Mutation
    private successWorkTypeList(data){
        this.workTypeList = data.data;
    }
    @Mutation
    private successCurriculumList(data){
        this.CurriculumList = data.data;
    }

    //导出
    @Action
    public async uploadPeople() {
        let alert: any = Message;
        await request.post('/api/workerlib/view_lecturer/export',{
            "conditionList": [
            ],
            "keywords" : [],
            "selectList": [
                {"field": "name" ,"alias":"姓名"},
                {"field": "type","alias":"类型" },
                {"field": "personalreesume" ,"alias":"履历"},
                {"field": "curriculum" ,"alias":"课程"},
            ]
        }).then((data)=>{
            if(!data){
                return;
            }
            alert.success('成功！');
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
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
    private success(data: any) {
        this.lecturers = data.data;
    }
    @Action
    public added(data: any) {
        if(data.status == 0) {
            this.search();
            let alert: any = Message;
            alert.success('成功！');
        }
    }

    @Mutation
    private setSelectType(data: number) {
        this.selectType = data;
    }

    @Mutation
    public setType(data:number){
        this.lecturerInfo.type=data;
    }
    @Mutation
    public setCurriculum(data:string){
        this.lecturerInfo.curriculum=data;
    }
    @Mutation
    public setName(data:string){
        this.lecturerInfo.name=data;
    }
    @Mutation
    public setPhoto(data:string){
        this.lecturerInfo.photo=data;
    }
	@Mutation
    public setPersonalreesume(data:string){
        this.lecturerInfo.personalreesume=data;
    }
	@Mutation
    public setUser(data:string){
        this.user=data;
    }
	@Mutation
    public setPassWord(data:string){
        this.passWord=data;
    }

    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }
}

interface LecturerInfo {
    name?: string;
    type?: number;
    photo?: string;
    curriculum?:string;
    id?: number;
	personalreesume?:string;
}
interface UpdateParams {
    userid:number
}