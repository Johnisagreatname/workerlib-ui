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
    public selectRate:string;
    public peopleConditionList:Array<any>;
    public commtenGrade:Array<any>;
    public grades:Array<any>;
    public rateInfo:Rate;
    public checkedArray: Array<any>;
    public insertUser: Array<any>;
    //新增
    public grade:string;
    public rank:string;
    public evaluateTime:Date;



    constructor(e) {
        super(e);
        this.projectType=[];
        this.checkedUser=[];
        this.rate=[];
        this.pageIndex = 1;
        this.pageSize = 20;
        this.pageTotal = null;
        this.selectConstructionUit="";
        this.selectProjectName="";
        this.selectName="";
        this.selectType="";
        this.selectStatus=null;
        this.selectRate="";
        this.peopleConditionList = [];
        this.commtenGrade = [];
        this.grades = [];
        this.grade = "";
        this.rank = "";
        this.evaluateTime = null;
        this.rateInfo={};
        this.checkedArray = [];
        this.insertUser = [];
    }
    @Action
    public getParams() : any {
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
        };
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
    public async count() {
        await request.post('/api/workerlib/archives/count', await this.getParams()).then((data)=>{
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
    public setStatus(data: number) {
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
    public clearCheckedUser() {
        this.checkedUser=[];
    }


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
