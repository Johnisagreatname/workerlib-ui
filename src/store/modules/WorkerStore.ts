import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "WorkerStore",
    store,
})
export default class WorkerStore extends VuexModule {
    @Mutation
    public setPageSize(data: number) { 
        
    }

    @Mutation
    public setPageIndex(data: number) { 
        
    }

    @Mutation
    public setChecked(data: boolean) { 
        
    }

    @Mutation
    public setPhone(data: string) { 
        
    }

    @Mutation
    public setWork_type(data: string) { 
        
    }

    @Mutation
    public setId_number(data: string) { 
        
    }

    @Mutation
    public setPeoples(data: any) { 
        
    }

    @Mutation
    public setState(data:number) { 
        
    }

    @Mutation
    public setWorkType(data:string) { 
        
    }

    @Mutation
    public setName(data:string) { 
        
    }

    @Mutation
    public setConstructionUnit(data:string) { 
        
    }

    @Mutation
    public setProjectName(data:string) { 
        
    }


    public projectName:string;
    public constructionUnit:string;
    public name:string;
    public workType:string;
    public state:number;
    public peoples: any;

    public id_number: string;
    public work_type: string;
    public phone: string;
    public checked: boolean;
    public id?: number;

    public pageIndex: number;
    public pageSize: number;

    constructor(e) {
        super(e)
        this.pageIndex=1;
        this.pageSize= 10;
        this.peoples = [];
    }

    @Action
    public getParams() : any {
        debugger
        return {
            "joinTables": [{
                "tablename": "salary",
                "alias": "a",
                "JoinMode": "inner"
            }, {
                "tablename": "archives",
                "alias": "b",
                "joinMode": "Inner",
                "onList": [{
                    "name": "b.id",
                    "value": "a.archives_id",
                    "algorithm": "EQ"
                }]
            }

            ],

            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": [],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []
        };
    }

    @Action
    public async search() {
        await request.post('/api/workerlib/archives',await this.getParams()).then((data)=>{
            this.success(data)
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

    @Mutation
    private success(data: any) {
        this.peoples = data.data;
    }

    @Mutation
    onCheck(id: number) {
        let data = this.peoples;
        this.peoples = [];
        if(data.filter(a=>a.id == id).length > 0) {
            let currentVal = data.filter(a=>a.id == id)[0].checked;
            data.filter(a=>a.id == id)[0].checked = !currentVal;
            this.peoples = data;
        }
    }
}
