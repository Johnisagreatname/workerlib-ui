import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";
import Evaluation from "../../components/Nav/Evaluation/Index.vue";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "EvaluationStore",
    store,
})
export default class EvaluationStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 10
        };
        this.evaluetion = [];
        this.evaluetionInfo = {};
    }
    public evaluetion: Array<EvaluetionInfo>;
    public pageInfo: PageInfo;
    public evaluetionInfo: EvaluetionInfo;

    @Action
    public getParams() : any {
        return {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },
            "conditionList": [{
                    "name": "category",
                    "value": "评价类型",
                    "algorithm": "EQ",
                }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        };
    }

    @Action
    public getVerification() : any {
        return {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },
            "conditionList": [{ //查询条件
                "name": "name",   //字段名
                "value": this.evaluetionInfo.name,   //值
                "algorithm": "EQ",   //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12)
            },
            {
                "name":"category",
                "value":"评价类型",
                "algorithm": "EQ",
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        };
    }

    @Action
    public async verification(){
        await request.post('/api/workerlib/dictionaries/exist ', await this.getVerification()).then((data)=>{
            if(!data){
                return;
            }
            this.sucess(data);

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
    public async search() {
        await request.post('/api/workerlib/dictionaries', await this.getParams()).then((data)=>{
            if(!data){
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
    public async deleteEvaluation(){
        await request.delete('/api/workerlib/dictionaries/'+this.evaluetionInfo.id).then((data)=>{
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
                alert.warning(e.response.data.message);
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
        await request.post('/api/workerlib/dictionaries/count', await this.getParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async insertEvaluation() {
        await request.put('/api/workerlib/dictionaries', {
                "name":this.evaluetionInfo.name,
                "value":this.pageInfo.totalRecords+1,
                "category":"评价类型",
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
    @Mutation
    public setId(data:any){
        this.evaluetionInfo.id = data;
    }
    @Mutation
    public setName(data:any){
        this.evaluetionInfo.name = data;
    }
    @Mutation
    public setValue(data:any){
        this.evaluetionInfo.value = data;
    }
    @Mutation
    public setDescription(data:any){
        this.evaluetionInfo.description = data;
    }
    @Mutation
    public setCategory(data:any){
        this.evaluetionInfo.category = data;
    }
    @Mutation
    public success(data: any) {
        this.evaluetion = data.data;
    }
    @Action
     public added(data: any) {
        if(data.status == 0) {
            this.search();
        }
    }
    @Action
    public sucess(data: any) {
        if(data.data == false) {
            this.insertEvaluation();
        }else {
            let alert: any = Message;
            alert.warning("该评价类型已存在，请更换！");
            return ;
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
    }
    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '序号',
            key: 'value',
            sortable: true
        },
        {
            title: '评价',
            key: 'name',
            sortable: true
        },
        {
            title: '详细操作',
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
}
interface PageInfo {
    pageIndex?: number;
    pageSize?: number;
    pageCount?:number;
    totalRecords?:number;
}
interface EvaluetionInfo {
    id?: number;
    name?: string;
    value?: number;
    description?: string;
    category?: string;
}
