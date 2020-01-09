import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "ProjectStore",
    store,
})
export default class ProjectStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 20
        };
        this.project = [];
        this.checkeds = [];
        this.searchConditionList = [];
        this.searchPeopleConditionList = [];
        this.updateList = [];
        this.insertList = [];
        this.insertProjectWorkTypeList = [];
        this.peoples = [];
        this.projectPeoples = [];
        this.projectInfo = {};
        this.projectType = [];
        this.workType = [];
        this.viewPeople = [];
        this.uplodId = [];
        this.peopleId = [];
        this.selectUserName = null;
        this.viewProjectId = null;
        this.projectId = null;
        this.leave = null;
        this.pageInIndex=1;
        this.pageInSize= 10;
        this.pageInTotal = 0;
        this.pageProjectIndex=1;
        this.pageProjectSize= 10;
        this.pageProjectTotal = 0;
    }
    public checkeds: Array<any>;
    public project: Array<ProjectInfo>;
    public projectType: Array<ProjectType>;
    public workType: Array<WorkType>;
    public pageInfo: PageInfo;
    public projectInfo:ProjectInfo;


    public archivesId:number;
    public selectUserName:string;
    public projectId:string;
    public pageInIndex: number;
    public pageInSize: number;
    public pageInTotal:number;
    public pageProjectIndex: number;
    public pageProjectSize: number;
    public pageProjectTotal:number;
    public viewProjectId:string;
    public leave:number;



    public peoples: Array<any>;
    public projectPeoples: Array<any>;
    public uplodId:Array<any>;
    public viewPeople:Array<any>;
    public updateList:Array<any>;
    public insertList:Array<any>;
    public insertProjectWorkTypeList:Array<any>;
    public peopleId:Array<any>;
    public searchConditionList:Array<any>;
    public searchPeopleConditionList:Array<any>;
    @Action
    public getUploadParams() : any {
        return {
            "conditionList": [{
                "name": "project_id",
                "value":  this.uplodId.map(x => x.project_id),
                "algorithm": "IN"
            }
            ],
            "keywords" : [],
            "selectList": [
                {"field": "project_name","alias":"项目名称" },
                {"field": "project_brief" ,"alias":"项目简介"},
                {"field": "builder_license" ,"alias":"施工许可证"},
                {"field": "start_time" ,"alias":"开工时间"},
                {"field": "end_time" ,"alias":"合同竣工时间"},
                {"field": "construction","alias":"建设单位" },
                {"field": "organization","alias":"施工单位" },
                {"field": "supervising","alias":"监理单位" }
            ]
        };
    }
    @Action
    public getPeopleParams() : any {
        if(this.selectUserName){
            let item ={};
            item["name"]="eafName";
            item["value"]=this.selectUserName;
            item["algorithm"] = "LIKE"
            this.searchPeopleConditionList.push(item);
        }
        return {
            "pageInfo" : {
                "pageIndex": this.pageInIndex,
                "pageSize": this.pageInSize
            },
            "conditionList": this.searchPeopleConditionList,

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []
        };
    }
    @Action
    public getParams() : any {
        if(this.projectInfo.selectOrganization){
            let item ={};
            item["name"]="organization";
            item["value"]=this.projectInfo.selectOrganization;
            item["algorithm"] = "LIKE"
            this.searchConditionList.push(item);
        }
        if(this.projectInfo.selectProjectName){
            let item ={};
            item["name"]="project_name";
            item["value"]=this.projectInfo.selectProjectName;
            item["algorithm"] = "LIKE"
            this.searchConditionList.push(item);
        }
        if(this.projectInfo.selectStatus != undefined &&this.projectInfo.selectStatus != null) {
            let status = this.projectInfo.selectStatus - 1
            if (status > -1) {
                let item = {};
                item["name"] = "status";
                item["value"] = status;
                item["algorithm"] = "EQ"
                this.searchConditionList.push(item);
            }
        }
        return {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },

            "conditionList": this.searchConditionList,

            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        };
    }
    @Action
    public async upload() {
        let alert: any = Message;
        await request.post('/api/workerlib/project/export',await this.getUploadParams(),{responseType: 'blob', params: '项目工程档案'}).then((data)=>{
            alert.warning('成功！');
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
    @Action
    public async insert() {
        await request.put('/api/workerlib/archives',this.insertList
            ).then((data)=>{
                if(!data){
                    return;
                }
            this.sucessInsert(data);
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
    @Action
    public async insertProjectWorkType() {
        await request.put('/api/workerlib/projectworktype',this.insertProjectWorkTypeList
            ).then((data)=>{
                if(!data){
                    return;
                }
            this.sucessInsertProjectWorkType(data);
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
    @Action
    public async synchronization() {
        let alert: any = Message;
        await request.post('/project/SynProject').then((data)=>{
                if(!data){
                    return;
                }
            this.sucessSynchronization(data);
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
    @Action
    public async update() {
        await request.post('/api/workerlib/archives/update',{
            "data":{
                "leave": this.leave
            },
            "conditionList": [{
                "name": "id",
                "value": this.updateList,
                "algorithm": "IN"
            }],
            "keywords" : []
            }
        ).then((data)=>{
            if(!data){
            return;
            }
            this.sucessUpdate(data);
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
    @Action
    public async searchViewPeople() {
        await request.post('/api/workerlib/project_user',{

                "pageInfo" : {
                    "pageIndex": this.pageProjectIndex,
                    "pageSize": this.pageProjectSize
                },
                "conditionList": [{
                    "name": "project_id",
                    "value": this.viewProjectId,
                    "algorithm": "EQ"
                },{
                    "name": "leave",
                    "value": 1,
                    "algorithm": "EQ"
                }],

                "groupList" : [],

                "keywords" : []
            }
        ).then((data)=>{
            if(!data){
                return;
            }
            this.sucessViewPeople(data);
            this.projectCount();
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
    @Action
    public async projectCount() {
        await request.post('/api/workerlib/project_user/count',{

                "pageInfo" : {
                    "pageIndex": this.pageProjectIndex,
                    "pageSize": this.pageProjectSize
                },
                "conditionList": [{
                    "name": "project_id",
                    "value": this.viewProjectId,
                    "algorithm": "EQ"
                }],

                "groupList" : [],

                "keywords" : []
            }
        ).then((data)=>{
            if(!data){
                return;
            }
            this.setProjectPageTotal(data.data);
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
    @Action
    public async search() {
        await request.post('/api/workerlib/project', await this.getParams()).then((data)=>{
            if(!data) {
               return;
            }
            this.success(data);
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
    public async count() {
        await request.post('/api/workerlib/project/count', await this.getParams()).then((total)=>{
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
    public async getWorkType(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "工种",
                "algorithm": "EQ"
            }],
            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data) {
            return;
            }
            this.successWorkType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async insertProject() {
        await request.put('/api/workerlib/project', {
                "project_id":null,
                "project_name":this.projectInfo.project_name,
                "project_brief":this.projectInfo.project_brief,
                "builder_license":this.projectInfo.builder_license,
                "start_time":this.projectInfo.start_time ? this.projectInfo.start_time.getFullYear() + "-" + this.projectInfo.start_time.getMonth() + "-" + this.projectInfo.start_time.getDate():null,
                "end_time":this.projectInfo.end_time ? this.projectInfo.end_time.getFullYear() + "-" + this.projectInfo.end_time.getMonth() + "-" + this.projectInfo.end_time.getDate():null,
                "construction":this.projectInfo.construction,
                "organization":this.projectInfo.organization,
                "supervising":this.projectInfo.supervising,
                "project_supervision":this.projectInfo.project_supervision,
                "project_address":this.projectInfo.project_address,
                "status":this.projectInfo.status
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
    public async searchPeople() {
        await request.post('/api/workerlib/project_allpeople',await this.getPeopleParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successPeople(data);
            this.countPeople();
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
    public async searchProjectPeople() {
        await request.post('/api/workerlib/archives',
            {
                "pageInfo" : {},
                "conditionList": [],
                "sortList": [],
                "groupList" : [],
                "keywords" : [],
                "selectList": []
            }).then((data)=>{
            if(!data){
                return;
            }
            this.successProjectPeople(data);
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
    public async countPeople() {
        await request.post('/api/workerlib/alluser/count', await this.getPeopleParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setInPageTotal(total.data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public addIn(data: any) {
        if(data.status == 0) {
            this.search();
        }
    }
    @Action
    public added(data: any) {

        if(data.status == 0) {
            this.search();
        }
    }
    @Mutation
    public successPeople(data: any) {
        this.peoples = data.data;
    }
    @Mutation
    public successProjectPeople(data: any) {
        this.projectPeoples = data.data;
    }
    @Mutation
    public setInPageTotal(data: number) {
        this.searchPeopleConditionList=[];
        this.pageInTotal = data;
    }
    @Mutation
    public setInPageSize(data: number) {
        this.pageInSize = data;
    }
    @Mutation
    public setInPageIndex(data: number) {
        this.pageInIndex = data;
    }
    @Mutation
    public setProjectPageTotal(data: number) {
        this.pageProjectTotal = data;
    }
    @Mutation
    public setProjectPageSize(data: number) {
        this.pageProjectSize = data;
    }
    @Mutation
    public setProjectPageIndex(data: number) {
        this.pageProjectIndex = data;
    }
    @Mutation
    public success(data: any) {
        this.project = data.data;
    }
    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }
    @Mutation
    public successWorkType(data: any) {
        this.workType = data.data;
    }
    @Mutation
    public setPageTotal(total: any) {

        this.searchConditionList = [];
        this.pageInfo = {
            pageIndex: this.pageInfo.pageIndex,
            pageSize:  this.pageInfo.pageSize,
            pageCount: this.pageInfo.pageCount,
            totalRecords: total
        };
    }

    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '项目名称',
            key: 'project_name',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.project_name
                        }
                    }, params.row.project_name)
                ])
            }
        },
        {
            title: '项目简介',
            key: 'project_brief',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.project_brief
                        }
                    }, params.row.project_brief)
                ])
            }
        },
        // {
        //     title: '施工许可证',
        //     key: 'builder_license',
        //     sortable: true,
        //     render: (h, params) => {
        //         return h('div', [
        //             h('span', {
        //                 style: {
        //                     display: 'inline-block',
        //                     width: '100%',
        //                     overflow: 'hidden',
        //                     textOverflow: 'ellipsis',
        //                     whiteSpace: 'nowrap'
        //                 },
        //                 domProps: {
        //                     title: params.row.builder_license
        //                 }
        //             }, params.row.builder_license)
        //         ])
        //     }
        // },
        {
            title: '开工时间',
            key: 'start_time',
            sortable: true
        },
        {
            title: '合同竣工时间',
            key: 'end_time',
            sortable: true,
            width: 180
        },
        {
            title: '建设单位',
            key: 'construction',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.construction
                        }
                    }, params.row.construction)
                ])
            }
        },
        {
            title: '施工单位',
            key: 'organization',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.organization
                        }
                    }, params.row.organization)
                ])
            }
        },
        {
            title: '监理单位',
            key: 'supervising',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.supervising
                        }
                    }, params.row.supervising)
                ])
            }
        },
        {
            title: '操作',
            slot: 'operation'
        }
    ];
    public peopleColumns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'eafName',
            sortable: true
        },
        {
            title: '工种',
            slot: 'workType'
        },
        {
            title: '身份证',
            key: 'cwrIdnum',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.cwrIdnum
                        }
                    }, params.row.cwrIdnum)
                ])
            }
        }
    ];
    public peopleProjectColumns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'eafName',
            sortable: true
        },
        {
            title: '工种',
            key: 'workType',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.workType
                        }
                    }, params.row.workType)
                ])
            }
        },
        {
            title: '身份证',
            key: 'cwrIdnum',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.cwrIdnum
                        }
                    }, params.row.cwrIdnum)
                ])
            }
        }
    ];


    @Mutation
    public setSelectUserName(data:string){
        this.selectUserName = data;
    }
    @Mutation
    public setProjectId(data:string){
        this.projectId = data;
    }
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
    private setLeave(data: number) {
        this.leave = data;
    }
    @Mutation
    private setUplodId(data: any) {
        this.uplodId.push(data);
    }
    @Mutation
    private setPeoplesId(data: any) {
        this.peopleId.push(data);
    }
    @Mutation
    private sucessViewPeople(data: any) {
        this.viewPeople=data.data;
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
    private setViewProjectId(data: string) {
        this.viewProjectId = data;
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
    private setUpdateList(data: any) {
        this.updateList.push(data) ;
    }
    @Mutation
    private clearUpdateList() {
        this.updateList= new Array<any>() ;
    }
    @Mutation
    private sucessUpdate(data: any) {
        if(data.status == 0) {
            for (let i = 0; i < this.projectPeoples.length; i++) {
                if (this.updateList.findIndex(x => x.id == this.projectPeoples[i].id) > -1) {
                    this.projectPeoples[i].leave == 1;

                }
            }
            this.leave = null;
            this.updateList= new Array<any>() ;
            let alert: any = Message;
            alert.warning('成功！');
        }
    }
    @Action
    private sucessInsert(data: any) {
        if(data.status == 0){
            this.insertProjectWorkType();
        }

    }
    @Mutation
    private sucessInsertProjectWorkType(data: any) {
        if(data.status== 0){
        for(let i = 0;i<this.insertList.length;i++){
            this.projectPeoples.push(this.insertList[i]);
        }
            this.insertList=new Array<any>() ;
            this.insertProjectWorkTypeList=new Array<any>() ;
        let alert: any = Message;
        alert.warning('成功！');
        }
    }
    @Action
    private sucessSynchronization(data: any) {
        if(data.status == 0){
            this.search();
            let alert: any = Message;
            alert.warning('成功！');
        }
    }

    @Mutation
    private setInsertList(data: any) {
        this.insertList.push(data) ;
    }
    @Mutation
    private setInsertProjectWorkTypeList(data: any) {
        this.insertProjectWorkTypeList.push(data) ;
    }
    @Mutation
    private clearInsertList() {
        this.insertList=new Array<any>() ;
    }

    @Mutation
    private selectStatus(data: number) {
        this.projectInfo.selectStatus = data;
    }

    @Mutation
    private setChecked(data: any) {
        this.checkeds.push(data);
    }
    @Mutation
    private clearChecked() {
        this.checkeds=new Array<any>();
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
interface WorkType {
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
