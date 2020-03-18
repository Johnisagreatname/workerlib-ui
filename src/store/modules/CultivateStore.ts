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
    public courseNum:number;

    public inPageIndex: number;
    public inPageSize: number;
    public inPageTotal:number;

    public checkedDelete:Array<any>;
    public conditionList:Array<any>;
    public cList:Array<any>;
    public cultivateVideo: Array<any>;
    public checkAllGroup: Array<any>;
    public insertCultivateVideo: Array<any>;

    public infoId:number;

    public okCultivate:string;
    public selectCourseName:string;
    public selectTrainingTeacher:string;
    public selectState:string;
    public selectStartTime:Date;
    public selectStatus:number;
    public selectUserName:string;
    public isOk:string;

    public viewId:number;

    public insertFile:Array<any>;

    constructor(e){
        super(e);
        this.studyType = [];
        this.cultivate = [];
        this.checkAllGroup = [];
        this.cultivateArchives = [];
        this.checkedDelete = [];
        this.conditionList = [];
        this.cultivateVideo = [];
        this.cList = [];
        this.insertFile = [];
        this.insertCultivateVideo = [];

        this.pageIndex=1;
        this.pageSize= 20;
        this.pageTotal = 0;

        this.inPageIndex=1;
        this.inPageSize= 10;
        this.inPageTotal = 0;
        this.selectStatus = 1;
        this.viewId = null;

        this.selectCourseName = "";
        this.selectTrainingTeacher = "";
        this.selectState = "";
        this.selectStartTime=null;
        this.selectUserName = "";
        this.isOk = "已完成";
        this.okCultivate = '是';

        this.infoId=null;
        this.courseNum=null;
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
            if(!data){
                return;
            }
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public getParams() : any {
        if(this.selectCourseName){
            let item ={};
            item["name"]="course_name";
            item["value"]=this.selectCourseName;
            item["algorithm"] = "LIKE"
            this.cList.push(item);
        }
        if(this.selectTrainingTeacher){
            let item ={};
            item["name"]="trainingTeacher";
            item["value"]=this.selectTrainingTeacher;
            item["algorithm"] = "LIKE"
            this.cList.push(item);
        }
        if(this.selectState){
            let item ={};
            item["name"]="state";
            item["value"]=this.selectState;
            item["algorithm"] = "LIKE"
            this.cList.push(item);
        }
        if(this.selectStartTime){
            let item ={};
            item["name"]="startTime";
            item["value"]=this.selectStartTime != null ?this.selectStartTime.getFullYear() + "-" + (this.selectStartTime.getMonth()+1) + "-" + this.selectStartTime.getDate():null;
            item["algorithm"] = "EQ"
            this.cList.push(item);
        }
        if(this.selectStatus){
            let item ={};
            item["name"]="c.status";
            item["value"]=this.selectStatus;
            item["algorithm"] = "EQ"
            this.cList.push(item);
        }
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
                },{

                }]
            }
            ],
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": this.cList,

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []
        };
    }

    @Action
    public getInParams() : any {
        if(this.infoId){
            let item ={};
            item["name"]="b.id";
            item["value"]=this.infoId;
            item["algorithm"] = "EQ"
            this.conditionList.push(item);
        }
        if(this.selectUserName){
            let item ={};
            item["name"]="a.eafName";
            item["value"]=this.selectUserName;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        return {
            "joinTables": [
                {
                    "tablename": "cultivate_archives",
                    "alias": "c",
                    "joinMode": "Left"
                },{
                    "tablename": "alluser",
                    "alias": "a",
                    "JoinMode": "Left",
                    "onList": [{
                        "name": "c.archives_id",
                        "value": "a.eafId",
                        "algorithm": "EQ"
                    }]
                },{
                    "tablename": "cultivate",
                    "alias": "b",
                    "joinMode": "Left",
                    "onList": [{
                        "name": "c.cultivate_id",
                        "value": "b.id",
                        "algorithm": "EQ"
                    }]
                }
            ],
            "pageInfo" : {
                "pageIndex": this.inPageIndex,
                "pageSize": this.inPageSize
            },

            "conditionList": this.conditionList,

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []

        }
    }

    @Action
    public async search() {
        await request.post('/api/workerlib/join',await this.getParams()).then((data)=>{
            if(!data){
                return;
            }
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
            if(!data){
                return;
            }
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
    public async searchVideoInfo() {
        await request.post('/api/workerlib/cultivate_video',{
            "pageInfo" : {},

            "conditionList": [
                {
                    "name":"cultivateId",
                    "value":this.viewId,
                    "algorithm":"EQ"
                }
            ],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successVideoInfo(data);
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
    public async insertVideoInfo() {
        await request.put('/api/workerlib/cultivate_video',this.insertCultivateVideo).then((data)=>{
            if(!data){
                return;
            }
            this.successInsertVideoInfo(data);
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
    public async UpdateCultivate() {
        await request.put('/api/workerlib/cultivate/'+this.viewId,{
            "peoples":this.courseNum,
            "state": this.isOk
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateCultivate(data);
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
        await request.post('/api/workerlib/cultivate/delete',this.checkedDelete.map(x => x.id)).then((data)=>{
            if(!data){
                return;
            }
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
        await request.post('/api/workerlib/join/count', await this.getParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countInfo() {
        await request.post('/api/workerlib/join/count', await this.getInParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setInPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public successInsertVideoInfo(data: any) {
        if(data.status == 0){
            this.UpdateCultivate();

        }
    }
    @Mutation
    public successType(data: any) {
        this.studyType = data.data;
    }
    @Mutation
    public success(data: any) {
        this.cList = new Array<any>();
        this.cultivate = data.data;
    }
    @Mutation
    public successInfo(data: any) {
        this.conditionList = new Array<any>();
        this.cultivateArchives = data.data;
    }
    @Mutation
    public successVideoInfo(data: any) {
        this.cultivateVideo = data.data;
    }
    @Mutation
    public successUpdateCultivate(data: any) {
        if(data.status == 0){
            let alert: any = Message;
            alert.warning("成功！");
            this.insertCultivateVideo = new Array<any>();
        }
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
        this.cList = [];
        this.pageTotal = data;
    }
    @Mutation
    public setOkCourseNum(data: number) {
        this.courseNum = data;
    }
    @Mutation
    public setPageIndex(data: number) {
        this.pageIndex = data;
    }
    @Mutation
    public setInPageTotal(data: number) {
        debugger
        this.conditionList = [];
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
    public setIsOk(data: string) {
        this.isOk = data;
    }
    @Mutation
    public setSelectState(data: string) {
        this.selectState = data;
    }
    @Mutation
    public setSelectTrainingTeacher(data: string) {
        this.selectTrainingTeacher = data;
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
    public setOkCultivate(data:string){
        this.okCultivate = data;
    }
    @Mutation
    public setCheckedDelete(data:any){
        this.checkedDelete.push(data);
    }
    @Mutation
    public setiIsertFile(data:any){
        this.insertFile.push(data);
    }
    @Mutation
    public clearCheckedDelete(){
        this.checkedDelete = new Array<any>();
    }
    @Mutation
    public setSelectStatus(data: number) {
        this.selectStatus = data;
    }
    @Mutation
    public setViewId(data: number) {
        this.viewId = data;
    }
    @Mutation
    public setCheckAllGroup(data: any) {
        this.checkAllGroup.push(data) ;
    }
    @Mutation
    public setInsertCultivateVideo(data: any) {
        this.insertCultivateVideo.push(data) ;
    }


    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '课程简介',
            key: 'courseware_brief',
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
                            title: params.row.courseware_brief
                        }
                    }, params.row.courseware_brief)
                ])
            }
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
    public columnsUp = [
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
        },{
            title: '培训讲师',
            key: 'trainingTeacher',
            sortable: true
        },
        {
            title: '培训地点',
            key: 'trainingAddress',
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
        } ,
        {
            title: '操作',
            slot: 'operation',
            sortable: true
        }
    ];
    public getColumnsInfo = [
        {
            title: '头像',
            slot: 'cwrPhoto',
            sortable: true
        },
        {
            title: '姓名',
            slot: 'eafName',
            sortable: true
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
