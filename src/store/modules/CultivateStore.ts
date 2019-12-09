import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "CultivateStore",
    store,
})
export default class CultivateStore extends VuexModule {
    public studyType: Array<StudyType>;
    public cultivate: Array<Cultivate>;
    public cultivateArchives: Array<CultivateArchives>;

    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;

    public inPageIndex: number;
    public inPageSize: number;
    public inPageTotal:number;

    public checkedDelete:Array<any>;

    public infoId:number;

    public selectCourseName:string;
    public selectState:string;
    public selectStartTime:Date;

    public selectUserName:string;
    constructor(e){
        super(e);
        this.studyType = [];
        this.cultivate = [];
        this.cultivateArchives = [];
        this.checkedDelete = [];

        this.pageIndex=1;
        this.pageSize= 10;
        this.pageTotal = 0;

        this.inPageIndex=1;
        this.inPageSize= 10;
        this.inPageTotal = 0;

        this.selectCourseName = "";
        this.selectState = "";
        this.selectStartTime=null;
        this.selectUserName = "";

        this.infoId=null;
    }

    @Action
    public async getStudyType(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": ["课程状态"],
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
    public getParams() : any {
        return {
            "joinTables": [{
                "tablename": "cultivate",
                "alias": "c",
                "joinMode": "Left"
            }, {
                "tablename": "user",
                "alias": "u",
                "joinMode": "Left",
                "onList": [{
                    "name": "c.createBy",
                    "value": "u.id",
                    "algorithm": "EQ"
                }]
            }
            ],
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": [{
                "name": "course_name",
                "value": this.selectCourseName,
                "algorithm": "LIKE"
            },{
                "name": "state",
                "value": this.selectState,
                "algorithm": "LIKE"
            },{
                "name": "startTime",
                "value": this.selectStartTime != null ?this.selectStartTime.getFullYear() + "-" + (this.selectStartTime.getMonth()+1) + "-" + this.selectStartTime.getDate():null,
                "algorithm": "EQ"
            }
            ],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []
        };
    }

    @Action
    public getInParams() : any {
        return {
            "joinTables": [
                {
                    "tablename": "cultivate_archives",
                    "alias": "c",
                    "joinMode": "inner"
                },{
                    "tablename": "archives",
                    "alias": "a",
                    "JoinMode": "inner",
                    "onList": [{
                        "name": "c.archives_id",
                        "value": "a.id",
                        "algorithm": "EQ"
                    }]
                }, {
                    "tablename": "courseware",
                    "alias": "o",
                    "joinMode": "inner",
                    "onList": [{
                        "name": "c.cultivate_id",
                        "value": "o.id",
                        "algorithm": "EQ"
                    }]
                }
            ],
            "pageInfo" : {
                "pageIndex": this.inPageIndex,
                "pageSize": this.inPageSize
            },

            "conditionList": [{
                "name": "c.cultivate_id",
                "value": this.infoId,
                "algorithm": "EQ"
            },{
                "name":"a.name",
                "value":this.selectUserName,
                "algorithm": "Like"
            }
            ],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": [
                {"field": "o.total_hours"},
                {"field": "c.training_time"},
                {"field": "c.whether"},
                {"field": "a.name"},
                {"field": "a.id"},
                {"field": "a.id_number"},
                {"field": "a.project"},
                {"field": "o.title"}
            ]

        }
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
    public async searchInfo() {
        await request.post('/api/workerlib/join',await this.getInParams()).then((data)=>{
            this.successInfo(data);
            this.countInfo();
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
    public async delete() {
        debugger
        await request.post('/api/workerlib/batch/cultivate',this.checkedDelete).then((data)=>{
            this.successDelete(data);
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
        await request.post('/api/workerlib/cultivate/count', await this.getParams()).then((total)=>{
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countInfo() {
        await request.post('/api/workerlib/cultivate_archives/count', await this.getInParams()).then((total)=>{
            this.setInPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    public successType(data: any) {
        this.studyType = data.data;
    }
    @Mutation
    public success(data: any) {
        this.cultivate = data.data;
    }
    @Mutation
    public successInfo(data: any) {
        this.cultivateArchives = data.data;
    }
    @Mutation
    public successDelete(data: any) {
        if(data.status == 0) {
            let alert: any = Message;
            alert.warning("删除成功！");
        }
    }
    @Mutation
    public setPageTotal(data: number) {
        this.pageTotal = data;
    }
    @Mutation
    public setPageIndex(data: number) {
        this.pageIndex = data;
    }
    @Mutation
    public setInPageTotal(data: number) {
        this.inPageTotal = data;
    }
    @Mutation
    public setInPageIndex(data: number) {
        this.inPageIndex = data;
    }
    @Mutation
    public setInPageSize(data: number) {
        this.inPageSize = data;
    }

    @Mutation
    public setPageSize(data: number) {
        this.pageSize = data;
    }
    @Mutation
    public setSelectCourseName(data: string) {
        this.selectCourseName = data;
    }

    @Mutation
    public setSelectState(data: string) {
        this.selectState = data;
    }
    @Mutation
    public setSelectStartTime(data: Date) {
        this.selectStartTime = data;
    }
    @Mutation
    public setInfoId(data: number) {
        this.infoId = data;
    }
    @Mutation
    public setSelectUserName(data:string){
        this.selectUserName = data;
    }
    @Mutation
    public setCheckedDelete(data:any){
        this.checkedDelete.push(data);
    }


    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '培训课程',
            key: 'course_name',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.course_name
                        }
                    }, params.row.course_name)
                ])
            }
        },
        {
            title: '开始培训时间',
            slot: 'startTime',
            sortable: true
        },
        {
            title: '培训人数',
            key: 'peoples',
            sortable: true
        },
        {
            title: '任务状态',
            key: 'state',
            sortable: true
        },
        {
            title: '发起人',
            key: 'username',
            sortable: true
        },
        {
            title: '操作',
            slot: 'operation',
            sortable: true
        }
    ];
    public getColumnsInfo = [
        {
            title: '头像',
            slot: 'photo',
            sortable: true
        },
        {
            title: '姓名',
            slot: 'name',
            sortable: true
        },
        {
            title: '所属项目',
            key: 'project',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.project
                        }
                    }, params.row.project)
                ])
            }
        },
        {
            title: '培训课程',
            key: 'title',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.title
                        }
                    }, params.row.title)
                ])
            }
        },
        {
            title: '培训课时',
            slot: 'total_hours',
            sortable: true
        },
        {
            title: '培训时长',
            slot: 'training_time',
            sortable: true
        },
        {
            title: '是否通过',
            slot: 'whether',
            sortable: true
        }
    ];

}
interface StudyType {
    value?: string;
    name?: string;
}
interface Cultivate {
    id?:number;
    course_id?:number;
    course_name?:string;
    startTime?:Date;
    peoples?:number;
    state?:string;
    mark?:string;
    username?:string;
}
interface CultivateArchives {
    total_hours?:number;
    training_time?:number;
    whether?:number;
    name?:string;
    id?:number;
    id_number?:string;
    project?:string;
    title?:string;
}
