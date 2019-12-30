import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";
import Workclass from "../../components/Nav/WorkClass/Index.vue";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "WoekclassStore",
    store,
})
export default class WoekclassStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 10
        };
        this.workclass = [];
        this.workclassInfo = {};
    }
    public workclass: Array<WorkclassInfo>;
    public pageInfo: PageInfo;
    public workclassInfo: WorkclassInfo;

    @Action
    public getParams() : any {
        let param =  {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },
            "conditionList": [{
                    "name": "category",
                    "value": "工种",
                    "algorithm": "EQ",
                }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }

        if(this.workclassInfo.name && this.workclassInfo.name.trim()) {
            param.conditionList.push({
                "name": "name",
                "value": this.workclassInfo.name,
                "algorithm": "LIKE",
            })
        }

        return param;
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
                "value": this.workclassInfo.name,   //值
                "algorithm": "EQ",   //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12)
            },
            {
                "name":"category",
                "value":"工种",
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
    public async verifications(){
        await request.post('/api/workerlib/dictionaries/exist ', await this.getVerification()).then((data)=>{
            this.update(data);
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
    public async deleteWorkclass(){
        await request.delete('/api/workerlib/dictionaries/'+this.workclassInfo.id).then((data)=>{
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
    public async updateWorkclass() {
        await request.put('/api/workerlib/dictionaries/'+this.workclassInfo.id,{
            "name":this.workclassInfo.name,
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
    @Action
    public async insertWorkclass() {
        await request.put('/api/workerlib/dictionaries', {
                "name":this.workclassInfo.name,
                "value":this.pageInfo.totalRecords+3,
                "category":"工种",
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
        this.workclassInfo.id = data;
    }
    @Mutation
    public setName(data:any){
        this.workclassInfo.name = data;
    }
    @Mutation
    public setValue(data:any){
        this.workclassInfo.value = data;
    }
    @Mutation
    public setDescription(data:any){
        this.workclassInfo.description = data;
    }
    @Mutation
    public setCategory(data:any){
        this.workclassInfo.category = data;
    }
    @Mutation
    public success(data: any) {
        this.workclass = data.data;
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
            this.insertWorkclass();
        }else {
            let alert: any = Message;
            alert.warning("工种名已存在，请更换用户名！");
            return ;
        }
    }
    @Action
    public update(data: any) {
        if(data.data == false) {
            this.updateWorkclass();
        }else {
            let alert: any = Message;
            alert.warning("工种名已存在，请更换用户名！");
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
            title: '工种',
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
interface WorkclassInfo {
    id?: number;
    name?: string;
    value?: number;
    description?: string;
    category?: string;
}
