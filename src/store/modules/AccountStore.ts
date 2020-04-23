import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "AccountStore",
    store,
})
export default class AccountStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 10
        };
        this.group = [];
        this.projectInfo = {};
        this.projectType = [];
        this.userInfo = {
            id: 0,
            username: '',
            password: ''
        };
        this.uid = "";
        this.role = [];
        this.userList = [];
        this.insertList = [];
        this.conditionList = [];
        this.moderole ='';
        this.modegroup = '';
        this.userId='';

    }
    public userId:String;
    public moderole: String;
    public modegroup:String;
    public userList: Array<UserInfos>;
    public projectType: Array<ProjectType>;
    public pageInfo: PageInfo;
    public projectInfo:ProjectInfo;
    public userInfo:UserInfos;
    public uid:string;
    public role:Array<Role>;
    public group:Array<Group>;
    public insertList:Array<any>;
    public conditionList:Array<any>;

    @Action
    public getParams() : any {
        return {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },

            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        };
    }
    @Action
    public getSearchParams() : any {
        if(this.userInfo.username && this.userInfo.username.trim()) {
            this.conditionList.push({
                "name": "username",
                "value": this.userInfo.username,
                "algorithm": "LIKE",
            })
        }
        return {
                "pageInfo" : {
                    "pageIndex": this.pageInfo.pageIndex,
                    "pageSize": this.pageInfo.pageSize
                },

                "conditionList": this.conditionList,

                "sortList": [],

                "groupList" : [],

                "keywords" : [],
                "selectList": []
            }
    }

    @Action
    public async search() {

        await request.post('/api/workerlib/user', await this.getSearchParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successUser(data);
            this.count();
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

    @Action
    public async findRole() {
        await request.post('/api/workerlib/role', {
            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successRole(data);
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


    /**
     * 使用group和project连表查询
     */
    @Action
    public getGroupId() : any  {
        return{
            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": [
                { "field": "groupId"},
                { "field": "groupName"},

            ]
        }
    }


    @Action
    public async searchGroupId() {
        await request.post('/api/workerlib/group',await this.getGroupId()).then((data)=>{
            if(!data){
                return;
            }
            this.successGroupId(data);
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
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }

    @Action
    public async deleteUser(){
        await request.delete('/api/workerlib/user/'+this.uid).then((data)=>{
            if(!data){
                return;
            }
            this.addedt(data)
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

    @Action
    public async count() {
        await request.post('/api/workerlib/user/count', await this.getSearchParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public async getProjectType(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "项目状态",
                "algorithm": "EQ"
            }],
            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }



    @Action
    public async updateUser() {
        await request.put('/api/workerlib/user/'+this.uid,{
            "password":this.userInfo.password,
        }).then((data)=>{
            if(!data){
                return;
            }
            this.addedt(data)
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



    @Action
    public async insertUser() {
        await request.put('/api/workerlib/user', {
                "username":this.userInfo.username,
                "password":this.userInfo.password,
            }).then((data)=>{
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


    @Action
    public async insertUserGroupRole(id) {
        for(let i in this.insertList) {
            this.insertList[i]['userId'] = id;
        }
        await request.put('/api/workerlib/usergrouprole',this.insertList
        ).then((data)=>{
            if(!data){
                return;
            }
            this.addedt(data)
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

    @Mutation
    public setModerole(data) {
        this.insertList = new Array<any>();
        this.moderole = data;
        let item = {};
        item["userGroupRoleId"] = null;
        item["userId"] = this.userId;
        item["roleId"] = this.moderole;
        item["groupId"] = null;
        this.insertList.push(item);
    }

    @Mutation
    public setModegroup(data) {
        this.insertList = new Array<any>();
        let item = {};
            for(let i in data) {
                item["userGroupRoleId"] = null;
                item["userId"] = this.userId;
                item["roleId"] = this.moderole;
                if (data[i] == 0) {
                    item["groupId"] = null;
                } else {
                    item["groupId"] = data[i];
                }
            }
        this.insertList.push(item);

    }

    @Mutation
    public setUsername(data:any){
        this.userInfo.username = data;
    }

    @Mutation
    public setUid(uid:any){
        this.uid = uid;
    }
    @Mutation
    public setPassword(data:any){
        this.userInfo.password = data;
    }
    @Mutation
    public setName(data:any){
        this.userInfo.username = data;
    }
    @Mutation
    public successUser(data: any) {
        this.userList = data.data;
    }

    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }

    @Action
     public added(data: any) {
        if(data.status == 0) {
            this.insertUserGroupRole(data.data);
        }
    }

    @Action
    public addedt(data: any) {
        if(data.status == 0) {
            this.search();
            let alert: any = Message;
            alert.success('成功！');

        }
    }


    @Mutation
    public setPageTotal(total: any) {
        this.pageInfo = {
            pageIndex: this.pageInfo.pageIndex,
            pageSize:  this.pageInfo.pageSize,
            pageCount: this.pageInfo.pageCount,
            totalRecords: total
        };
        this.conditionList = new Array<any>();
    }

    @Mutation
    public successRole(data:any){
        this.role =  data.data;
    }

    @Mutation
    public successGroupId(data:any){
        this.group =  data.data;
    }


    public columns = [
        {
            title: '用户名',
            key: 'username',
            sortable: true
        },
        {
            title: '创建日期',
            key: 'createOn',
            sortable: true
        },
        {
            title: '操作',
            slot: 'operation',
            sortable: true
        }
    ];



    @Mutation
    private pageIndex(data: number) {
        this.pageInfo.pageIndex = data;
    }

    @Mutation
    private pageSize(data: number) {
        this.pageInfo.pageSize = data;
    }

    @Mutation
    private id(data: number) {
        this.projectInfo.id = data;
    }

    @Mutation
    private projectName(data: string) {
        this.projectInfo.project_name = data;
    }

    @Mutation
    private selectProjectName(data: string) {
        this.projectInfo.selectProjectName = data;
    }

    @Mutation
    private projectBrief(data: string) {
        this.projectInfo.project_brief = data;
    }

    @Mutation
    private builderLicense(data: string) {
        this.projectInfo.builder_license = data;
    }

    @Mutation
    private startTime(data: Date) {
        this.projectInfo.start_time = data;
    }

    @Mutation
    private endTime(data: Date) {
        this.projectInfo.end_time = data;
    }

    @Mutation
    private construction(data: string) {
        this.projectInfo.construction = data;
    }

    @Mutation
    private organization(data: string) {
        this.projectInfo.organization = data;
    }

    @Mutation
    private selectOrganization(data: string) {
        this.projectInfo.selectOrganization = data;
    }

    @Mutation
    private supervising(data: string) {
        this.projectInfo.supervising = data;
    }

    @Mutation
    private projectSupervision(data: string) {
        this.projectInfo.project_supervision = data;
    }

    @Mutation
    private projectAddress(data: string) {
        this.projectInfo.project_address = data;
    }

    @Mutation
    private selectProjectAddress(data: string) {
        this.projectInfo.selectProjectAddress = data;
    }

    @Mutation
    private status(data: number) {
        this.projectInfo.status = data;
    }

    @Mutation
    private selectStatus(data: number) {
        this.projectInfo.selectStatus = data;
    }
}


interface PageInfo {
    pageIndex?: number;
    pageSize?: number;
    pageCount?:number;
    totalRecords?:number;
}
interface ProjectType {
    value?: string;
    name?: string;
}

interface ProjectInfo {
    id?:number;
    project_name?:string;
    project_brief?:string;
    builder_license?:string;
    start_time?:Date;
    end_time?:Date;
    construction?:string;
    organization?:string;
    supervising?:string;
    project_supervision?:string;
    project_address?:string;
    status?:number;
    selectOrganization?:string;
    selectProjectAddress?:string;
    selectProjectName?:string;
    selectStatus?:number;
}
interface UserInfos {
    id?:number;
    username?:string;
    password?:string;
    createOn?: Date;
}

interface Role {
    roleId?:string;
    roleName?:string;
    description?:string;
    userPath?:string;
    modifyTime?:Date;
    modifyBy?:number;
    createOn?:Date;
    createBy?:number;
}


interface UserGroupRole {
    userGroupRoleId?:string;
    userId?:number;
    groupId?:string;
    roleId?:string;
    userPath?:string;
    modifyBy?:number;
    modifyTime?:number;
    createOn?:Date;
    createBy?:number;
}


interface Group {
    groupId?:string;
    groupName?:string;
    description?:string;
    userPath?:string;
    modifyTime?:Date;
    modifyBy?:number;
    createOn?:Date;
    createBy?:number;
}
