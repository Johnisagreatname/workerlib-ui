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

    public selectConstructionUit:string;
    public selectProjectName:string;
    public selectName:string;
    public selectType:string;
    public selectStatus:number;
    public selectTime:Date;
    public selectRate:string;
    public peopleConditionList:Array<any>;
    public commtenGrade:Array<any>;
    public grades:Array<any>;
    public rateInfo:Rate;
    public checkedArray: Array<any>;
    public insertUser: Array<any>;
    public checkeds: Array<any>;
    public cultivateArchivesList:Array<any>;
    public checkAllGroup: Array<any>;
    public peoples: any;
    public insertTeamUserList:Array<any>;
    //新增
    public grade:string;
    public rank:string;
    public evaluateTime:Date;
    public selectUserName:string;
    public selectLeave:number;

    public pageInIndex: number;
    public pageInSize: number;
    public pageInTotal:number;
    //新增团体评级
    public insertRatingname:string;
    public insertNorating:number;
    public insertRate:number;
    public insertRemark:string;


    constructor(e) {
        super(e);
        this.projectType=[];
        this.checkeds=[];
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
        this.selectStatus=null;
        this.selectRate="";
        this.peopleConditionList = [];
        this.peoples = [];
        this.commtenGrade = [];
        this.grades = [];
        this.grade = "";
        this.rank = "";
        this.evaluateTime = null;
        this.rateInfo={};
        this.checkedArray = [];
        this.insertUser = [];

        this.pageInIndex=1;
        this.pageInSize= 8;
        this.pageInTotal = 0;
        this.insertRatingname=null;
        this.insertNorating=null;
        this.insertRate=null;
        this.insertRemark=null;
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
                        "tablename": "team_rate",
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
                    "alias":"time"
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
            return {
                "joinTables": [
                    {
                        "tablename": "alluser",
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
    public async insertTeamRate() {
        await request.put('/api/workerlib/team_rate', {
            "ratingname":this.insertRatingname,
            "norating":this.insertNorating,
            "rate":this.insertRate,
            "remark":this.insertRemark,
        }).then((data)=>{
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
    public async insertTeamUser(id){
        if(this.cultivateArchivesList){
            for (let i = 0;i<this.cultivateArchivesList.length;i++) {
                let item = {};
                item["teamId"]=id;
                item["userId"]=this.cultivateArchivesList[i];
                this.insertTeamUserList.push(item);
            }
        }
        await request.put('/api/workerlib/cultivate_archives', this.cultivateArchivesList).then((data)=>{
            this.successInsertTeamUser(data);
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
    public async countPeople() {
        await request.post('/api/workerlib/people/count', await this.getPeopleParams()).then((total)=>{
            this.setInPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async successInsertTeamRate(data:any) {
       if(data.status == 0){
           this.insertTeamUser(data.data);
       }
    }
    @Mutation
    public successInsertTeamUser(data:any){
        if(data.status == 0) {
            this.checkeds = new Array<any>();
            this.checkAllGroup = new Array<any>();
            this.insertTeamUserList = new Array<any>()
            let alert: any = Message;
            alert.warning("新建课程成功！");
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
    public successGrade(data: any) {
        this.grades = data.data;
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
    // "norating":this.insertNorating,
    // "rate":this.insertRate,
    // "remark":this.insertRemark,
    // @Mutation
    // public setInsertRatingname(data:string){
    //     this.insertRatingname = data;
    // }
    // @Mutation
    // public setSelectUserName(data:string){
    //     this.selectUserName = data;
    // }
    // @Mutation
    // public setSelectLeave(data:number){
    //     this.selectLeave = data;
    // }

    public columns = [
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
        // ,
        // {
        //     title: '操作',
        //     slot: 'operation',
        //     sortable: true
        // }
    ];
    public teamColumns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '团队名称',
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
            title: '评定时间',
            key: 'time',
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
