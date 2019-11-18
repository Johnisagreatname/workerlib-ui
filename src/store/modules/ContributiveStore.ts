import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "ContributiveStore",
    store,
})
export default class ContributiveStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 50
        };
        this.contributive = [];
    }
    public contributive: Array<PeopleInfo>;
    public pageInfo: PageInfo;
    @Action
    public async search() {
        await request.post('/api/workerlib/join', {
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
                "pageIndex": this.pageInfo.pageIndex, //页码
                "pageSize": this.pageInfo.pageSize  //每页条数
            },
            "conditionList": [],

            "sortList": [ ],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((data)=>{
            this.success(data)
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

            alert.warning(e.message || e)
        });
    }
    @Mutation
    private success(data: any) {
        this.contributive = data.data;
        this.pageInfo = data.pageInfo;
    }

    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name',
            sortable: true
        },
        {
            title: '所属项目',
            key: 'project',
            sortable: true
        },
        {
            title: '所属参建单位',
            key: 'construction',
            sortable: true
        },
        {
            title: '应发工资',
            key: 'salary',
            sortable: true
        },
        {
            title: '实发工资',
            key: 'netPayroll',
            sortable: true
        },
        {
            title: '时间',
            key: 'time',
            sortable: true
        },
        {
            title: '银行账号',
            key: 'bankAccount',
            sortable: true
        }
    ];



}
interface PageInfo {
    pageIndex: number;
    pageSize: number;
}

interface PeopleInfo {
    id: number;
    bank_card: string;
    name: string;
    project: string;
    unit: string;
    pre_revenue:number;
    revenue:number;
}
