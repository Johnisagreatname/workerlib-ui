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
    public modifyBy:string;
    public grade:string;
    public rateInfo:Rate;
    public checkedArray: Array<any>;

    constructor(e) {
        super(e);
        this.projectType=[];
        this.rate=[];
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageTotal = null;
        this.selectConstructionUit="";
        this.selectProjectName="";
        this.selectName="";
        this.selectType="";
        this.selectStatus=null;
        this.selectRate="";
        this.peopleConditionList = [];
        this.modifyBy = "";
        this.grade = "";
        this.rateInfo={};
        this.checkedArray = [];
    }
    @Action
    public getParams() : any {
        debugger;
        if(this.selectProjectName){
            let item ={};
            item["name"]="project_name";
            item["value"]=this.selectProjectName;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);
        }
        if(this.selectConstructionUit){
            let item ={};
            item["name"]="project_license";
            item["value"]=this.selectConstructionUit;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);
        }
        if(this.selectName){
            let item ={};
            item["name"]="name";
            item["value"]=this.selectName;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);
        }
        if(this.selectType){
            let item ={};
            item["name"]="work_type";
            item["value"]=this.selectType;
            item["algorithm"] = "EQ";
            this.peopleConditionList.push(item);
        }
        if(this.selectStatus){
            let item ={};
            item["name"]="leave";
            item["value"]=this.selectStatus;
            item["algorithm"] = "EQ";
            this.peopleConditionList.push(item);
        }
        if(this.selectRate){
            let item ={};
            item["name"]="rate";
            item["value"]=this.selectRate;
            item["algorithm"] = "EQ";
            this.peopleConditionList.push(item);
        }
        return {
            "joinTables": [
                {
                    "tablename": "archives",
                    "alias": "a",
                    "joinMode": "Inner"
                }, {
                    "tablename": "project",
                    "alias": "p",
                    "JoinMode": "left",
                    "onList": [{
                        "name": "p.project_id",
                        "value": "a.project_id",
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

            "selectList": [{ //显示字段
                    "field": "*",  //字段名
                    "function": "NONE",  //数据库相关函数：MAX, MIN, UPPER, LOWER, LENGTH, AVG, COUNT, SUM, GROUP_CONCAT等;
                }]
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
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public async search() {
        await request.post('/api/workerlib/join',await this.getParams()).then((data)=>{
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
        await request.post('/api/workerlib/archives/count', await this.getParams()).then((total)=>{
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
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
    @Action
    public async insertArchives(checkedArray) {debugger;
        await request.post('/api/workerlib/archives/update', {
            "data": {
                "modifyBy":this.modifyBy,
                "rate":this.rateInfo.rate,
                "grade":this.grade,
            },
            "conditionList": [{ //查询条件
                "name": "id",   //字段名
                "value": checkedArray,   //值
                "algorithm": "IN",   //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12), NOTIN(13)
            }],

            "keywords" : []
        }).then((data)=>{
            this.search()
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
    public success(data: any) {
        this.rate = data.data;
    }
    @Mutation
    public setCheckedArray(data:Array<any>){
        this.checkedArray = data;
    }
    @Mutation
    public setModifyBy(data:string) {
        this.modifyBy = data;
    }
    @Mutation
    public setRates(data:string){
        this.rateInfo.rate = data;
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
    public successType(data: any) {
        this.projectType = data.data;
    }

    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '评选等级',
            key: 'rate',
            width: 130,
            sortable: true
        },
        {
            title: '姓名',
            key: 'name',
            width: 120,
            sortable: true
        },
        {
            title: '所属项目',
            key: 'project_name',
            sortable: true
        },
        {
            title: '工种',
            key: 'work_type',
            sortable: true,
            width: 180
        },
        {
            title: '评选时间',
            key: 'createOn',
            width: 130,
            sortable: true
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
