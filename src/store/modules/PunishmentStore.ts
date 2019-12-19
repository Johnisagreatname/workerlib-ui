import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "PunishmentStore",
    store,
})
export default class PunishmentStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 10
        };
        this.punishment = [];
        this.punishmentInfo = {};
    }
    public punishment: Array<PunishmentInfo>;
    public pageInfo: PageInfo;
    public punishmentInfo: PunishmentInfo;

    @Action
    public getParams() : any {
        debugger;
        return {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },
            "conditionList": [{
                    "name": "category",
                    "value": "处罚类型",
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
        debugger;
        return {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },
            "conditionList": [{ //查询条件
                "name": "name",   //字段名
                "value": this.punishmentInfo.name,   //值
                "algorithm": "EQ",   //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12)
            },
            {
                "name":"category",
                "value":"处罚类型",
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
        debugger
        await request.post('/api/workerlib/dictionaries/exist ', await this.getVerification()).then((data)=>{
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
        debugger;
        await request.post('/api/workerlib/dictionaries', await this.getParams()).then((data)=>{
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
    public async deletePunishment(){
        debugger;
        await request.delete('/api/workerlib/dictionaries/'+this.punishmentInfo.id).then((data)=>{
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
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async insertPunishment() {
        debugger;
        await request.put('/api/workerlib/dictionaries', {
                "name":this.punishmentInfo.name,
                "value":this.pageInfo.totalRecords+1,
                "category":"处罚类型",
            }).then((data)=>{
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
        this.punishmentInfo.id = data;
    }
    @Mutation
    public setName(data:any){
        this.punishmentInfo.name = data;
    }
    @Mutation
    public setValue(data:any){
        this.punishmentInfo.value = data;
    }
    @Mutation
    public setDescription(data:any){
        this.punishmentInfo.description = data;
    }
    @Mutation
    public setCategory(data:any){
        this.punishmentInfo.category = data;
    }
    @Mutation
    public success(data: any) {
        this.punishment = data.data;
    }
    @Action
     public added(data: any) {
        if(data.status == 0) {
            this.search();
        }
    }
    @Action
    public sucess(data: any) {
        debugger;
        if(data.data == false) {
            this.insertPunishment();
        }else {
            let alert: any = Message;
            alert.warning("该处罚已存在，请更换！");
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
            title: '处罚',
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
interface PunishmentInfo {
    id?: number;
    name?: string;
    value?: number;
    description?: string;
    category?: string;
}
