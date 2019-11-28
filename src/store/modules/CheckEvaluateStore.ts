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
    }
    @Action
    public getParams() : any {
        return {
            "joinTables": [
                {
                    "tablename": "archives",
                    "alias": "a",
                    "joinMode": "left"
                }, {
                    "tablename": "project",
                    "alias": "p",
                    "JoinMode": "left",
                    "onList": [{
                        "name": "p.id",
                        "value": "a.project_id",
                        "algorithm": "EQ"
                    }]
                }, {
                    "tablename": "unit",
                    "alias": "u",
                    "joinMode": "left",
                    "onList": [{
                        "name": "u.id",
                        "value": "a.unit_id",
                        "algorithm": "EQ"
                    }]
                }
            ],
            "pageInfo": {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": [{
                "name": "project_name",
                "value": this.selectProjectName,
                "algorithm": "LIKE"
            },{
                "name": "project_license",
                "value": this.selectConstructionUit,
                "algorithm": "LIKE"
            },{
                "name": "name",
                "value": this.selectName,
                "algorithm": "LIKE"
            },{
                "name": "work_type",
                "value": this.selectType,
                "algorithm": "EQ"
            },{
                "name": "leave",
                "value": this.selectStatus,
                "algorithm": "EQ"
            },{
                "name": "rate",
                "value": this.selectRate,
                "algorithm": "EQ"
            }
            ],

            "sortList": [],

            "groupList": [],

            "keywords": [],

            "selectList": [
                {"field": "p.project_name"},
                {"field": "u.project_license"},
                {"field": "a.rate"},
                {"field": "a.name"},
                {"field": "a.work_type"},
                {"field": "a.rate_time"}
            ]
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
        this.pageTotal = data;
    }
   /* @Action
    public async insertRate() {
        await request.put('/api/workerlib/archives', {
            "name":this.userName,
            "phone":this.phone,
            "id_number":this.card,
            "project_id":this.projectId,
            "photo":this.photo,
            "work_type":this.type,
            "unit_id":this.unitId,
            "leader":this.animal,
            "leave":1,
            "id_card_front":this.idCardfront,
            "id_card_reverse":this.idCardReverse,
            "grade":this.grade,
            "certificate":this.certificate
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
    }*/
    @Mutation
    public success(data: any) {
        this.rate = data.data;
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
            sortable: true
        },
        {
            title: '姓名',
            key: 'name',
            sortable: true
        },
        {
            title: '所属项目',
            key: 'project_name',
            sortable: true
        },
        {
            title: '所属参建单位',
            key: 'project_license',
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
            key: 'rate_time',
            sortable: true
        },
        {
            title: '操作',
            slot: 'operation',
            sortable: true
        }
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