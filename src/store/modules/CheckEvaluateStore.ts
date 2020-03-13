import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "CheckEvaluateStore",
    store,
})
export default class CheckEvaluateStore extends VuexModule {
    public projectType: Array<ProjectType>;
    public rate: Array<Rate>;
    public checkedUser: Array<any>;
    public pageIndex:number;
    public pageSize:number;
    public pageTotal:number;
    public pageViewIndex:number;
    public pageViewSize:number;
    public pageViewTotal:number;

    public selectConstructionUit:string;
    public selectProjectName:string;
    public selectName:string;
    public selectType:string;
    public selectStatus:number;
    public selectTime:Date;
    public selectRate:string;
    public selectRank:string;
    public peopleConditionList:Array<any>;
    public commtenGrade:Array<any>;
    public commtenRank:Array<any>;
    public grades:Array<any>;
    public viewInfo:Array<any>;
    public rateInfo:Rate;
    public checkedArray: Array<any>;
    public insertUser: Array<any>;
    public checkeds: Array<any>;
    public cultivateArchivesList:Array<any>;
    public checkAllGroup: Array<any>;
    public peoples: any;
    public viewRateInfo: any;
    public insertTeamUserList:Array<any>;
    public viewList:Array<any>;
    //新增
    public grade:string;
    public rateWorkType:string;
    public rank:string;
    public evaluateTime:Date;
    public selectUserName:string;
    public selectLeave:number;

    public pageInIndex: number;
    public pageInSize: number;
    public pageInTotal:number;
    public pageViewRateIndex: number;
    public pageViewRateSize: number;
    public pageViewRateTotal:number;
    //新增团体评级
    public insertRatingname:string;
    public insertNorating:number;
    public insertRate:number;
    public insertRemark:string;
    public teamId:number;

    public selectViewName:string;
    public selectViewIdCard:string;
    public viewRateId:string;

    constructor(e) {
        super(e);
        this.projectType=[];
        this.viewInfo=[];
        this.checkeds=[];
        this.commtenRank=[];
        this.cultivateArchivesList=[];
        this.insertTeamUserList=[];
        this.checkAllGroup=[];
        this.checkedUser=[];
        this.rate=[];
        this.pageIndex = 1;
        this.pageSize = 20;
        this.pageTotal = null;
        this.selectConstructionUit="";
        this.selectProjectName="";
        this.selectLeave=null;
        this.selectUserName="";
        this.selectName="";
        this.selectType="";
        this.selectTime = null;
        this.selectRank = null;

        this.selectStatus=null;
        this.selectRate="";
        this.peopleConditionList = [];
        this.viewList = [];
        this.peoples = [];
        this.viewRateInfo = [];
        this.commtenGrade = [];
        this.grades = [];
        this.grade = "";
        this.rateWorkType = "";
        this.rank = "";
        this.evaluateTime = null;
        this.rateInfo={};
        this.checkedArray = [];
        this.insertUser = [];

        this.pageInIndex=1;
        this.pageInSize= 8;
        this.pageInTotal = -1;
        this.pageViewIndex=1;
        this.pageViewSize= 10;
        this.pageViewTotal = 0;
        this.pageViewRateIndex=1;
        this.pageViewRateSize= 10;
        this.pageViewRateTotal = 0;
        this.insertRatingname=null;
        this.insertNorating=null;
        this.insertRate=null;
        this.insertRemark=null;
        this.teamId=null;

        this.selectViewName = null;
        this.selectViewIdCard = null;
        this.viewRateId = null;
    }
    @Action
    public getParams() : any {
        if(this.selectStatus==1){
            if(this.selectTime){
                let item ={};
                item["name"]="time";
                item["value"]=this.selectTime;
                item["algorithm"] = "Like";
                this.peopleConditionList.push(item);
            }
            return {
                "joinTables": [
                    {
                        "tablename": "team",
                        "alias": "a",
                        "joinMode": "Left"
                    }, {
                        "tablename": "user",
                        "alias": "u",
                        "JoinMode": "Left",
                        "onList": [{
                            "name": "a.createBy",
                            "value": "u.id",
                            "algorithm": "EQ"
                        }]
                    }
                ],
                "pageInfo": {
                    "pageIndex": this.pageIndex,
                    "pageSize": this.pageSize
                },

                "conditionList": this.peopleConditionList,

                "sortList": [],

                "groupList": [],

                "keywords": [],

                "selectList": [{
                    "field": "a.createOn",
                    "alias":"createOn"
                },{
                    "field": "a.ratingname",
                    "alias":"ratingname"
                },{
                    "field": "a.id",
                    "alias":"id"
                },{
                    "field": "a.remark",
                    "alias":"remark"
                },{
                    "field": "a.norating",
                    "alias":"norating"
                },{
                    "field": "a.rate",
                    "alias":"rate"
                },{
                    "field": "u.username",
                    "alias":"username"
                }
                ]
            }
        }else{
            if(this.selectName){
                let item ={};
                item["name"]="a.eafName";
                item["value"]=this.selectName;
                item["algorithm"] = "LIKE";
                this.peopleConditionList.push(item);
            }
            if(this.selectRate){
                let item ={};
                item["name"]="u.grade";
                item["value"]=this.selectRate;
                item["algorithm"] = "EQ";
                this.peopleConditionList.push(item);
            }
            if(this.selectRank){
                let item ={};
                item["name"]="u.rank";
                item["value"]=this.selectRank;
                item["algorithm"] = "EQ";
                this.peopleConditionList.push(item);
            }
            return {
                "joinTables": [
                    {
                        "tablename": "people",
                        "alias": "a",
                        "joinMode": "Left"
                    }, {
                        "tablename": "alluser_rate",
                        "alias": "u",
                        "JoinMode": "Left",
                        "onList": [{
                            "name": "a.eafId",
                            "value": "u.userId",
                            "algorithm": "EQ"
                        }]
                    }
                ],
                "pageInfo": {
                    "pageIndex": this.pageIndex,
                    "pageSize": this.pageSize
                },

                "conditionList": this.peopleConditionList,

                "sortList": [],

                "groupList": [],

                "keywords": [],

                "selectList": []
            }
        }
    };
    @Action
    public getPeopleParams() : any {
        if(this.selectProjectName){
            let item ={};
            item["name"]="project_name";
            item["value"]=this.selectProjectName;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);
        }
        if(this.selectUserName){
            let item ={};
            item["name"]="eafName";
            item["value"]=this.selectUserName;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);
        }
        if(this.selectLeave != undefined && this.selectLeave > -1
            && this.selectLeave != null){
            let item ={};
            item["name"]="leave";
            item["value"]=this.selectLeave;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);
        }
        return {
            "pageInfo" : {
                "pageIndex": this.pageInIndex,
                "pageSize": this.pageInSize
            },
            "conditionList": this.peopleConditionList,

            "sortList": [ ],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        };
    }
    @Action
    public getViewRateParams() : any {
        return {
            "joinTables": [
                {
                    "tablename": "user_rate",
                    "alias": "a",
                    "joinMode": "Left"
                }, {
                    "tablename": "alluser",
                    "alias": "b",
                    "JoinMode": "Left",
                    "onList": [{
                        "name": "a.userId",
                        "value": "b.eafId",
                        "algorithm": "EQ"
                    }]
                }
            ],
            "pageInfo" : {
                "pageIndex": this.pageViewRateIndex,
                "pageSize": this.pageViewRateSize
            },
            "conditionList":[
                {
                    "name":"eafId",
                    "value":this.viewRateId,
                    "algorithm":"EQ"
                }
            ],

            "sortList": [{
                "name": "evaluateTime",
                "desc": true
            }],
            "groupList" : [],

            "keywords" : [],
            "selectList": [{
                "field": "a.userId",
                "alias":"eafId"
            },{
                "field": "b.eafName",
                "alias":"eafName"
            },{
                "field": "a.rateWorkType",
                "alias":"rateWorkType"
            },{
                "field": "a.grade",
                "alias":"grade"
            },{
                "field": "a.rank",
                "alias":"rank"
            },{
                "field": "a.evaluateTime",
                "alias":"evaluateTime"
            }
                ]
        };
    }
    @Action
    public getViewParams() : any {
        if(this.selectViewName){
            let item ={};
            item["name"]="eafName";
            item["value"]=this.selectViewName;
            item["algorithm"] = "LIKE";
            this.viewList.push(item);
        }
        if(this.selectViewIdCard){
            let item ={};
            item["name"]="cwrIdnum";
            item["value"]=this.selectViewIdCard;
            item["algorithm"] = "EQ";
            this.viewList.push(item);
        }
            let item = {};
            item["name"]="teamId";
            item["value"]=this.teamId;
            item["algorithm"]="EQ";
        this.viewList.push(item);
        return {
            "pageInfo": {
                "pageIndex": this.pageViewIndex,
                "pageSize": this.pageViewSize
            },
            "conditionList": this.viewList,

            "sortList": [ ],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        };
    }
    @Action
    public async getProjectType(){
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
            if(!data){
                return;
            }
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async search() {
        await request.post('/api/workerlib/join',await this.getParams()).then((data)=>{
                if(!data){
                    return;
                }
                this.success(data);
                this.count();
            }
        ).catch((e)=>{
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
    public async searchTeamUserInfo() {
        await request.post('/api/workerlib/teamrate',await this.getViewParams()).then((data)=>{
                if(!data){
                    return;
                }
                this.successViewInfo(data);
                this.countViewInfo();
            }
        ).catch((e)=>{
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
        await request.post('/api/workerlib/join/count', await this.getParams()).then((data)=>{
            if(!data){
                return;
            }
            this.setPageTotal(data.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countViewInfo() {
        await request.post('/api/workerlib/teamrate/count',await this.getViewParams()).then((data)=>{
            if(!data){
                return;
            }
            this.setPageViewTotal(data.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async getCommtenRank(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "评定级别",
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
            this.successCommtenRank(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async getCommtenGrade(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "评定级别",
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
            this.successCommtenGrade(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async getGrade(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "评定等级",
                "algorithm": "EQ"
            }],
            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data) {
                return
            }
                this.successGrade(data);

        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async insertArchives() {
        await request.put('/api/workerlib/user_rate',this.insertUser).then((data)=>{
            if(!data){
                return;
            }
            let alert: any = Message;
            alert.warning('成功！');
            this.search();
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
    public async insertTeamRate(fn) {
        await request.put('/api/workerlib/team_rate', {
            "ratingname":this.insertRatingname,
            "norating":this.insertNorating,
            "rate":this.insertRate,
            "remark":this.insertRemark,
        }).then((data)=>{
            if(!data){
                return;
            }
            data['fn'] = fn;
            this.successInsertTeamRate(data)
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
    public async insertTeamUser(parms){

        if(this.cultivateArchivesList){
            for (let i = 0;i<this.cultivateArchivesList.length;i++) {
                let item = {};
                item["teamId"]=parms.id;
                item["eafId"]=this.cultivateArchivesList[i];
                this.insertTeamUserList.push(item);
            }
        }
        await request.put('/api/workerlib/team_user', this.insertTeamUserList).then((data)=>{
            if(!data){
                return;
            }
            this.successInsertTeamUser(data);
            this.search();
            parms.fn(parms.id);
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
        await request.post('/api/workerlib/people',await this.getPeopleParams()).then((data)=>{
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
    public async searchViewRate() {
        await request.post('/api/workerlib/join',await this.getViewRateParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successViewRate(data);
            this.countViewRate();
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
        await request.post('/api/workerlib/people/count', await this.getPeopleParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setInPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countViewRate() {
        await request.post('/api/workerlib/join/count', await this.getViewRateParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageViewRateTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async successInsertTeamRate(data:any) {
       if(data.status == 0){
           this.insertTeamUser({id:data.data, fn:data.fn});
       }
    }
    @Mutation
    public successInsertTeamUser(data:any){
        if(data.status == 0) {
            this.checkeds = new Array<any>();
            this.checkAllGroup = new Array<any>();
            this.insertTeamUserList = new Array<any>();
            this.cultivateArchivesList = new Array<any>();
            let alert: any = Message;
            alert.warning("创建团体评价成功！");
        }
    }
    @Mutation
    public setPageTotal(data: number) {
        this.peopleConditionList = [];
        this.pageTotal = data;
    }
    @Mutation
    public setPageIndex(data: number) {
        this.pageIndex = data;
    }
    @Mutation
    public setPageSize(data: number) {
        this.pageSize = data;
    }
    @Mutation
    public setPageViewTotal(data: number) {
        this.viewList = new Array<any>();
        this.pageViewTotal = data;
    }
    @Mutation
    public setPageViewIndex(data: number) {
        this.pageViewIndex = data;
    }
    @Mutation
    public setPageViewSize(data: number) {
        this.pageViewSize = data;
    }
    @Mutation
    public success(data: any) {
        this.rate = data.data;
    }
    @Mutation
    public setCheckedArray(data:Array<any>){
        this.checkedArray = data;
    }
    @Mutation
    public setRank(data:string){
        this.rank = data;
    }
    @Mutation
    public setGrade(data:string){
        this.grade = data;
    }
    @Mutation
    public setRateWorkType(data:string){
        this.rateWorkType = data;
    }
    @Mutation
    public setConstructionUit(data: string) {
        this.selectConstructionUit = data;
    }
    @Mutation
    public setProjectName(data: string) {
        this.selectProjectName = data;
    }
    @Mutation
    public setName(data: string) {
        this.selectName = data;
    }
    @Mutation
    public setSelectStatus(data: number) {
        this.selectStatus = data;
    }
    @Mutation
    public setType(data: string) {
        this.selectType = data;
    }
    @Mutation
    public setRate(data: string) {
        this.selectRate = data;
    }
    @Mutation
    public setEvaluateTime(data: Date) {
        this.evaluateTime = data;
    }
    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }
    @Mutation
    public successCommtenGrade(data: any) {
        this.commtenGrade = data.data;
    }
    @Mutation
    public successCommtenRank(data: any) {
        this.commtenRank = data.data;
    }
    @Mutation
    public successGrade(data: any) {
        this.grades = data.data;
    }
    @Mutation
    public successViewInfo(data: any) {
        this.viewInfo = data.data;
    }
    @Mutation
    public setCheckedUser(data: any) {
        this.checkedUser.push(data);
    }
    @Mutation
    public setInsertUser(data: any) {
        this.insertUser.push(data);
    }
    @Mutation
    public clearInsertUser() {
        this.insertUser=new Array<any>();
    }
    @Mutation
    public setSelectTime(data: Date) {
        this.selectTime = data;
    }
    @Mutation
    public clearCheckedUser() {
        this.checkedUser=new Array<any>();
    }
    @Mutation
    public successPeople(data: any) {
        this.peoples = data.data;
    }
    @Mutation
    public successViewRate(data: any) {
        this.viewRateInfo = data.data;
    }

    @Mutation
    public setInPageTotal(data: number) {
        this.peopleConditionList = [];
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
    public setPageViewRateTotal(data: number) {
        this.pageViewRateTotal = data;
    }

    @Mutation
    public setPageViewRateSize(data: number) {
        this.pageViewRateSize = data;
    }
    @Mutation
    public setPageViewRateIndex(data: number) {
        this.pageViewRateIndex = data;
    }
    @Mutation
    public setSelectProjectName(data:string){
        this.selectProjectName = data;
    }
    @Mutation
    public setSelectUserName(data:string){
        this.selectUserName = data;
    }
    @Mutation
    public setSelectLeave(data:number){
        this.selectLeave = data;
    }
    @Mutation
    public setInsertRatingname(data:string){
        this.insertRatingname = data;
    }
    @Mutation
    public setInsertNorating(data:number){
        this.insertNorating = data;
    }
    @Mutation
    public setInsertRate(data:number){
        this.insertRate = data;
    }
    @Mutation
    public setTeamId(data:number){
        this.teamId = data;
    }
    @Mutation
    public setInsertRemark(data:string){
        this.insertRemark = data;
    }
    @Mutation
    public setSelectViewName(data:string){
        this.selectViewName = data;
    }
    @Mutation
    public setViewRateId(data:string){
        this.viewRateId = data;
    }
    @Mutation
    public setSelectViewIdCard(data:string){
        this.selectViewIdCard = data;
    }
    @Mutation
    public setSelectRank(data:string){
        this.selectRank = data;
    }
    @Mutation
    private setChecked(data: any) {
        this.checkeds.push(data);
    }
    @Mutation
    private setCheckAllGroup(data: any) {
        this.checkAllGroup.push(data);
    }
    @Mutation
    public setCultivateArchivesList(data:any){
        this.cultivateArchivesList.push(data);
    }
    public columns = [
        {
            title: '姓名',
            key: 'eafName',
            sortable: true
        },
        {
            title: '工种',
            key: 'rateWorkType',
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
                            title: params.row.rateWorkType
                        }
                    }, params.row.rateWorkType)
                ])
            }
        },{
            title: '等级',
            key: 'grade',
            sortable: true
        },
        {
            title: '级别',
            key: 'rank',
            sortable: true
        },
        {
            title: '评定时间',
            key: 'modifyBy',
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
                            title: params.row.evaluateTime
                        }
                    }, params.row.evaluateTime)
                ])
            }
        }
        ,
        {
            title: '操作',
            slot: 'operation',
            sortable: true
        }
    ];
    public viewColumns = [
        {
            title: '头像',
            slot: 'photo',
        },
        {
            title: '姓名',
            key: 'eafName',
            sortable: true
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
        },
        {
            title: '所属项目',
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
            title: '参见单位',
            key: 'unit_name',
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
                            title: params.row.unit_name
                        }
                    }, params.row.unit_name)
                ])
            }
        },{
            title: '评级',
            key: 'grade',
            sortable: true,
        },{
            title: '评级时间',
            key: 'evaluateTime',
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
                            title: params.row.evaluateTime
                        }
                    }, params.row.evaluateTime)
                ])
            }
        },
        {
            title: '操作',
            slot: 'operation'
        }
    ];
    public viewRateColumns = [
        {
            title: '姓名',
            key: 'eafName',
            sortable: true
        },
        {
            title: '工种',
            key: 'rateWorkType',
            sortable: true
        },
        {
            title: '等级',
            key: 'grade',
            sortable: true
        },{
            title: '级别',
            key: 'rank',
            sortable: true,
        },{
            title: '评级时间',
            key: 'evaluateTime',
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
                            title: params.row.evaluateTime
                        }
                    }, params.row.evaluateTime)
                ])
            }
        }
    ];
    public teamColumns = [
        {
            title: '评定记录名称',
            key: 'ratingname',
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
                            title: params.row.ratingname
                        }
                    }, params.row.ratingname)
                ])
            }

        },
        {
            title: '未评级人数',
            key: 'norating',
            sortable: true,

        },{
            title: '评级人数',
            key: 'rate',
            sortable: true
        },
        {
            title: '创建时间',
            key: 'createOn',
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
                            title: params.row.createOn
                        }
                    }, params.row.createOn)
                ])
            }
        }
        ,
        {
            title: '发起人',
            key: 'username',
            sortable: true
        }
        ,
        {
            title: '操作',
            slot: 'operation',
            sortable: true
        }
    ];
    public peopleColumns = [
        {
            type: 'selection',
            width: 50,
            align: 'center'
        },
        {
            title: '照片',
            slot: 'photo',
        },
        {
            title: '姓名',
            key: 'eafName',
            sortable: true
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
            title: '分包',
            key: 'unit_name',
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
                            title: params.row.unit_name
                        }
                    }, params.row.unit_name)
                ])
            }
        },
        {
            title: '操作',
            slot: 'operation'
        }
    ];


}
interface ProjectType {
    value?: string;
    name?: string;
}
interface Rate {
    rate?:string;
    name?:string;
    project_name?:string;
    project_license?:string;
    work_type?:string;
    rate_time?:Date;
}
