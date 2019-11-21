import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "UnitStore",
    store,
})
export default class UnitStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 50
        };
        this.unit = [];
    }
    public unit: Array<UnitInfo>;
    public pageInfo: PageInfo;
    @Action
    public async search() {
        await request.post('/api/workerlib/join', {
            "joinTables": [{
                "tablename": "project",
                "alias": "p",
                "JoinMode": "inner"
            }, {
                "tablename": "unit",
                "alias": "u",
                "joinMode": "Inner",
                "onList": [{
                    "name": "p.id",
                    "value": "u.project_id",
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
        this.unit = data.data;
        this.pageInfo = data.pageInfo;
    }
    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '所属项目',
            key: 'project_name',
            sortable: true
        },
        {
            title: '施工许可证',
            key: 'builder_license',
            sortable: true
        },
        {
            title: '参建单位编号',
            key: 'unit_number',
            sortable: true
        },
        {
            title: '参建单位名称',
            key: 'unit_name',
            sortable: true
        },
        {
            title: '当前人数',
            key: 'people_number',
            sortable: true
        },
        {
            title: '单位类型',
            key: 'unit_type',
            sortable: true
        },
        {
            title: '入场日期',
            key: 'entrance_time',
            sortable: true
        },
        {
            title: '负责人',
            key: 'principal',
            sortable: true
        },
        {
            title: '操作',
            slot: 'operation'
        }
    ];

}

interface PageInfo {
    pageIndex: number;
    pageSize: number;
}

interface UnitInfo {
    id:number;
    project_id:number;
    project_license:string;
    unit_number:string;
    unit_name:string;
    entrance_time:Date;
    people_number:string;
    unit_type:number;
    principal:string;
    project_name:string;
}
