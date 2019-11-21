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

    constructor(e) {
        super(e)
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 50
        }
        this.peoples = [];
    }
    public projectName:string;
    public constructionUnit:string;
    public name:string;
    public workType:string;
    public state:number;
    public peoples: Array<PeopleInfo>;
    public pageInfo: PageInfo;


    @Action
    public async search() {
        await request.post('/api/workerlib/archives', {
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
                "pageIndex": 1,
                "pageSize": 50
            },

            "conditionList": [],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []
        }).then((data)=>{
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
        this.pageInfo = data.pageInfo;
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

interface PageInfo {
    pageIndex: number;
    pageSize: number;
}

interface PeopleInfo {
    id_number: string;
    work_type: string;
    name: string;
    phone: string;
    state: number;
    checked?: boolean;
    id: number;
}
