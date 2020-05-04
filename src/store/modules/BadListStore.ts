import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import { Message } from "iview";
import Account from '../../components/Nav/Account/Index.vue';

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "BadListStore",
    store,
})
export default class BadListStore extends VuexModule {
    public tableData: Array<TableData> = [];
    public pageIndex:number;
    public pageSize:number;
    public pageTotal: number;
    public workTypeList: Array<any> = [];
    public punishmentList: Array<any> = [];
    public name:string;
    public projectName:string;
    public workType:string;
    public punishmentType:string;
    public startTime:Date
    public endTime:Date
    constructor(e) {
        super(e);
        this.pageIndex=1;
        this.pageSize=10;
        this.pageTotal=0;
        this.name='';
        this.projectName='';
        this.workType='';
        this.punishmentType='';
        this.startTime=new Date();
        this.endTime=new Date();
    }

    //工种类型
    @Action
    async getType() {
        await this.searchData({ url: "dictionaries", conName: "category", status: "工种" }).then(res => {
            this.workTypeListData(res)
        })
    }
    @Mutation
    workTypeListData(data) {
        this.workTypeList = data
    }

    //处罚类型
    @Action
    async getPunishment() {
        await this.searchData({ url: "dictionaries", conName: "category", status: "处罚类型" }).then(res => {
            this.punishmentListData(res)
        })
    }
    @Mutation
    punishmentListData(data) {
        this.punishmentList = data
    }

    //参数
    @Action
    public getSearchParams() : any {
        let conditionList:Array<any>=[];
        if(this.name){
            let item ={};
            item["name"]="eafName";
            item["value"]=this.name;
            item["algorithm"] = "Like"
            conditionList.push(item);
        }
        if(this.projectName){
            let item ={};
            item["name"]="projectName";
            item["value"]=this.projectName;
            item["algorithm"] = "LIKE"
            conditionList.push(item);
        }
        if(this.workType){
            let item ={};
            item["name"]="workType";
            item["value"]=this.workType;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }
        if(this.punishmentType){
            let item ={};
            item["name"]="punishment";
            item["value"]=this.punishmentType;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }
        if(this.startTime){
            let item ={};
            item["name"]="appraiseTime";
            item["value"]=this.startTime;
            item["algorithm"] = "GTEQ"
            conditionList.push(item);
        }    
        if(this.endTime){
            let item ={};
            item["name"]="appraiseTime";
            item["value"]=this.endTime;
            item["algorithm"] = "LTEQ"
            conditionList.push(item);
        }
        return {
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },
            "conditionList": conditionList,
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }
    }

    //查询条件参数
    @Action
    public getUpdateParams(list: Array<UpdateParams> = null) {
        return new Promise((res, rej) => {
            let params: any = {
                "pageInfo": {},
                "conditionList": [],
                "sortList": [],
                "groupList": [],
                "keywords": [],
                "selectList": [
                    {
                        "field": "name"
                    }
                ]
            }
            if (list) {
                list.forEach((a, index) => {
                    params.conditionList.push(new Object())
                    params.conditionList[index].name = a.name;
                    params.conditionList[index].value = a.value;
                    params.conditionList[index].algorithm = "EQ";
                })
            }
            res(params)
        })
    }
    //上传参数
    @Action
    public getUploadParams() : any {
        let conditionList:Array<any>=[];
        if(this.name){
            let item ={};
            item["name"]="eafName";
            item["value"]=this.name;
            item["algorithm"] = "Like"
            conditionList.push(item);
        }
        if(this.projectName){
            let item ={};
            item["name"]="projectName";
            item["value"]=this.projectName;
            item["algorithm"] = "LIKE"
            conditionList.push(item);
        }
        if(this.workType){
            let item ={};
            item["name"]="workType";
            item["value"]=this.workType;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }
        if(this.punishmentType){
            let item ={};
            item["name"]="punishment";
            item["value"]=this.punishmentType;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }
        if(this.startTime){
            let item ={};
            item["name"]="appraiseTime";
            item["value"]=this.startTime;
            item["algorithm"] = "GTEQ"
            conditionList.push(item);
        }
        if(this.endTime){
            let item ={};
            item["name"]="appraiseTime";
            item["value"]=this.endTime;
            item["algorithm"] = "LTEQ"
            conditionList.push(item);
        }
        return {
            "conditionList": conditionList,
            "keywords" : [],
            "selectList": [
                {"field": "eafName" ,"alias":"姓名"},
                {"field": "project_name" ,"alias":"所属项目"},
                {"field": "work_type","alias":"工种" },
                {"field": "punishment" ,"alias":"处罚"},
                {"field": "appraise_time","alias":"处罚时间" },
            ]
        };
    }
    //查询数据
    @Action
    public async searchData({ url, conName = "", status = "" }: SearchData): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let params = conName && (status || status === 0) ? [{ name: conName, value: status }] : null
            await request.post('/api/workerlib/' + url, await this.getUpdateParams(params)).then((data) => {
                if (!data) {
                    return;
                }
                resolve(data.data)
            }).catch((e) => {
                let alert: any = Message;
                if (!e) {
                    alert.warning('未知错误！')
                    return
                }
                if (e.response && e.response.data && e.response.data.message) {
                    alert.warning(e.response.data.message)
                    return
                }
                alert.warning(e.message || e)
            });
        })
    }


    @Action
    public async countAppraiseCount() {
        await request.post('/api/workerlib/appraise_bad', await this.getSearchParams()).then((total) => {
            if (!total) {
                return;
            }
            this.changeTableData(total.data)
            this.count();
        }).catch((e) => {
            MessageUtils.warning(e);
        });
    }

    @Mutation
    changeTableData(data) {
        this.tableData = data;
    }
    @Action
    public async count() {
        await request.post('/api/workerlib/appraise_bad/count', await this.getSearchParams()).then((total) => {
            if (!total) {
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e) => {
            MessageUtils.warning(e);
        });
    }
    @Mutation
    public setPageTotal(data: number) {
        this.pageTotal = data;
    }
    @Mutation
    private setUserPageSize(data : any){
        this.pageSize = data;
    }
    @Mutation
    private setUserPageIndex(data : any){
        this.pageIndex = data;
    }


    //导出
    @Action
    public async upload() {
        let alert: any = Message;
        await request.post('/api/workerlib/appraise_bad/export',await this.getUploadParams()).then((data)=>{
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


}
interface TableData {
    eafName: string;
    projectName: string;
    punishment: string;
    appraiseTime:Date;
    workType: string;
}
interface UpdateParams {
    name: string;
    value: any
}
interface SearchData {
    url: string;
    conName?: string;
    status?: any
}
