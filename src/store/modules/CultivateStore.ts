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
    public studyType: Array<any>;
    public workType: Array<any>;
    public cultivate: Array<Cultivate>;
    public cultivateArchives: Array<CultivateArchives>;


    // public examineDialog: boolean = false;

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
    public Status :number;
    public okCultivate:string;
    public selectCourseName:string;
    public selectTrainingTeacher:string;
    public whether:string;
    public selectStartTime:Date;
    public course:string;
    public selectUserName:string;
    public isOk:string;

    public viewId:number;
    public title:string='';
    public typeWork:string='';
    public insertFile:Array<any>;

    private pullDown: boolean;

    constructor(e){
        super(e);
        this.studyType = [];
        this.workType = [];
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
        this.course = '';
        this.viewId = null;
        this.Status=null;
        this.pullDown = false;

        this.selectCourseName = "";
        this.selectTrainingTeacher = "";
        this.whether = '';
        this.selectStartTime=null;
        this.selectUserName = "";
        this.isOk = "已完成";
        this.okCultivate = '是';
        this.infoId=null;
        this.courseNum=null;
    }

    public tableData: Array<TableData> = [
        {
            id: "sgjlsjl1232jlg34k3j",
            eafName: "string",
            rateWorkType: "string",
            grade: "string",
            rank: "string",
            modifyBy: "string",
            operation: "string",
            project: "项目",
            company: "公司",
        },
        {
            id: "sgjlsjl1232jlg34k3j",
            eafName: "string",
            rateWorkType: "string",
            grade: "string",
            rank: "string",
            modifyBy: "string",
            operation: "string",
            project: "项目",
            company: "公司",
        }
    ];

    @Mutation
    private setPullDown(data : any){
        this.pullDown = data;
    }
    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }



    @Action
    public async getCourseType(){
        await request.post('/api/workerlib/courseware', {
            "pageInfo" : {},
            "conditionList": [],
            "sortList": [],
            "groupList" : [
                "course"
            ],
            "keywords" : [],
            "selectList": [
                {
                    "field": "course",
                }
            ]
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
    public async getWorkType(){
        await request.post('/api/workerlib/courseware', {
            "pageInfo" : {},
            "conditionList": [],
            "sortList": [],
            "groupList" : [
                "type_work"
            ],
            "keywords" : [],
            "selectList": [
                {
                    "field": "type_work",
                }
            ]
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successWork(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }


    @Action
    public getParams() : any {
        //是否必学 whether
        if(this.whether){
            let item ={};
            item["name"]="w.whether";
            item["value"]=this.whether;
            item["algorithm"] = "EQ"
            this.cList.push(item);
        }
        //线上线下 status
        if(this.Status){
            let item ={};
            item["name"]="c.status";
            item["value"]=this.Status;
            item["algorithm"] = "EQ"
            this.cList.push(item);
        }
        //所属类型
        if(this.course){
            let item ={};
            item["name"]="w.course";
            item["value"]=this.course;
            item["algorithm"] = "EQ"
            this.cList.push(item);
        }
        //搜索课程
        if(this.title){
            let item ={};
            item["name"]="w.title";
            item["value"]=this.title;
            item["algorithm"] = "LIKE"
            this.cList.push(item);
        }
        //选择工种
        if(this.typeWork){
            let item ={};
            item["name"]="w.type_work";
            item["value"]=this.typeWork;
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
                }]
            },{
                "tablename": "courseware",
                "alias": "w",
                "joinMode": "Left",
                "onList": [{
                    "name": "c.course_id",
                    "value": "w.id",
                    "algorithm": "EQ"
                }]
            }
            ],
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": this.cList,

            "sortList": [
                { //排序条件
                    "name": "startTime", //字段名
                    "desc": true  //true为降序，false为升序
                }
            ],

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

            "selectList": [
            ]

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
    public getUploadParams() : any {
        return {
            "conditionList": [{
                "name": "cultivate_id",
                "value":  this.checkedDelete.map(x => x.id),
                "algorithm": "IN"
            }
            ],
            "keywords" : [],
            "selectList": [
                {"field": "course_name","alias":"培训课程" },
                {"field": "archivesStatus","alias":"培训状态" },
                {"field": "eafName" ,"alias":"姓名"},
                {"field": "training_time" ,"alias":"培训时长（分钟）"},
                {"field": "training_pages" ,"alias":"PPT观看页数"},
                {"field": "eafPhone" ,"alias":"手机号码"},
                {"field": "unit_name","alias":"所属公司" },
                {"field": "project_name","alias":"项目部" },
                {"field": "cwrIdnum","alias":"身份证号码" },
                {"field": "startTime","alias":"培训时间" }
            ]
        };
    }
    @Action
    public async upload() {
        let alert: any = Message;
        await request.post('/api/workerlib/exporttraining/export',await this.getUploadParams(),{responseType: 'blob', params: '项目工程档案'}).then((data)=>{
            alert.success('成功！');
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
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
    public async insertData() {
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
    public successWork(data: any) {
        this.workType = data.data;
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
            alert.success("成功！");
            this.insertCultivateVideo = new Array<any>();
        }
    }
    @Action
    public successDelete(data: any) {
        if(data.status == 0) {
            this.search();
            let alert: any = Message;
            alert.success("成功！");
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
    public getCourseNum() {
        return  this.studyType ;
    }

    @Mutation
    public setPageIndex(data: number) {
        this.pageIndex = data;
    }
    @Mutation
    public setInPageTotal(data: number) {
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
        this.Status = data;
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
            title:'序号',
            slot:'num',
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
            title: '开始培训时间',
            key: 'startTime',
            sortable: true
        },
        {
            title: '培训人数',
            key: 'peoples',
            sortable: true
        },
        {
            title: '讲师',
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
        },
        // {
        //     title: '操作',
        //     slot: 'operation',
        //     sortable: true
        // }
    ];
    public columnsUp = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title:'序号',
            slot:'num',
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
                            title: params.row.trainingTeacher
                        }
                    }, params.row.trainingTeacher)
                ])
            }
        },
        {
            title: '培训地点',
            key: 'trainingAddress',
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
                            title: params.row.trainingAddress
                        }
                    }, params.row.trainingAddress)
                ])
            }
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
        // {
        //     title: '操作',
        //     slot: 'operation',
        //     sortable: true
        // }
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
    trainingTeacher?:string;
    trainingAddress?:string;
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
interface TableData {
    id: string;
    eafName: string;
    rateWorkType: string;
    grade: string;
    rank: string;
    modifyBy: string;
    operation: string;
    project: string;
    company: string;
}