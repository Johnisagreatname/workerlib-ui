import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "OptionsStore",
    store,
})
export default class OptionsStore extends VuexModule {

    public peoples: any;
    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;

    private title: string;
    private standard: string;
    private type: number;
    private score: string;
    private project_id: number;
    private subject_id: number;
    private value: string;
    private subject: Array<Subject>;
    private subjectInfo: SubjectInfo;
    private optionsInfo: OptionsInfo;



    constructor(e) {
        super(e)
        this.pageIndex=1;
        this.pageSize= 10;
        this.pageTotal = 0;
        this.peoples = [];
        this.subject = [];
        this.subjectInfo = {};
        this.optionsInfo = {};

        this.title="";
        this.standard="";
        this.type=0;
        this.score="";
        this.project_id=0;

        this.subject_id=0;
        this.value="";

    }

    @Action
    public getParams() : any {
        debugger
        return {
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": [ ],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []
        };
    }
    @Action
    public async count() {
        debugger
        await request.post('/api/workerlib/subject/count', await this.getParams()).then((total)=>{
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async search() {
        debugger
        await request.post('/api/workerlib/subject',await this.getParams()).then((data)=>{
            debugger
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
    public added(data: any) {
        debugger
        if(data.status == 0) {
            this.search();
        }
    }
    @Action
    public async insertSubject() {
        debugger
        await request.put('/api/workerlib/subject', {
            "title":this.subjectInfo.title,
            "standard":this.subjectInfo.standard,
            "type":this.subjectInfo.type,
            "score":this.subjectInfo.score,
            "private_id":this.subjectInfo.private_id
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
    public async insertOptions() {
        debugger
        await request.put('/api/workerlib/options', {
            "subject_id":this.optionsInfo.subject_id,
            "value":this.optionsInfo.value,
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
    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '题目名称',
            key: 'title',
            sortable: true
        },
        {
            title: '标准答案',
            key: 'standard',
            sortable: true
        },
        {
            title: '题目类型',
            key: 'type',
            sortable: true
        },
        {
            title: '分数',
            key: 'score',
            sortable: true
        },
        {
            title: '操作',
            slot: 'operation',
            sortable: true
        }
    ];

    // public data = [
    //     {
    //         title: '钢筋工岗前知识培训',
    //         standard: '科创中心项目',
    //         type: '钢筋工',
    //         score: '12'
    //     },
    //     {
    //         title: '电焊工岗前知识培训',
    //         standard: '科创中心项目',
    //         type: '电焊工',
    //         score: '15'
    //     },
    //     {
    //         title: '水泥工岗前知识培训',
    //         standard: '科创中心项目',
    //         type: '水泥工',
    //         score: '8'
    //     }
    // ];
    @Mutation
    private success(data: any) {
        debugger
        this.subject = data.data;
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
    public setPageSize(data: number) {
        this.pageSize = data;
    }
    @Mutation
    public setTitle(data: string){
        this.subjectInfo.title = data;
    }
    @Mutation
    public setStandard(data: string){
        this.subjectInfo.standard = data;
    }
    @Mutation
    public setType(data: number){
        this.subjectInfo.type = data;
    }
    @Mutation
    public setScore(data: string){
        this.subjectInfo.score = data;
    }
    @Mutation
    public setSubject_id(data: number){
        this.optionsInfo.subject_id = data;
    }
    @Mutation
    public setValue(data: string){
        debugger
        this.optionsInfo.value = data;
    }

}
interface Subject {
    title?: string;
    standard?: string;
    type?: number;
}
interface SubjectInfo {
    id?:number;
    title?: string;
    standard?: string;
    type?: number;
    score?: string;
    private_id?: number;
}
interface OptionsInfo {
    id?: number;
    subject_id?: number;
    value?: string;
}
