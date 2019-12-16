import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "CommentsStore",
    store,
})
export default class CommentsStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 10
        };
        this.appraise = [];
        this.appraiseInfo = {};
        this.appraise_photo = [];
        this.appraise_photoInfo = {};
        this.appraise_score = [];
        this.appraise_scoreInfo = {};
        this.archives = [];
        this.archivesInfo = {};
        this.comments = [];
        this.ups = [];
        this.punishments = [];
        this.allComm = [];
        this.check = [];

    }
    public pageInfo: PageInfo;
    public appraise: Array<AppraiseInfo>;
    public appraiseInfo:AppraiseInfo;
    public appraise_photo:Array<Appraise_photoInfo>;
    public appraise_photoInfo:Appraise_photoInfo;
    public appraise_score:Array<Appraise_scoreInfo>;
    public appraise_scoreInfo:Appraise_scoreInfo;
    public archivesInfo:ArchivesInfo;
    public archives:Array<ArchivesInfo>;
    public comments:Array<any>;
    public punishments:Array<any>;
    public ups:Array<any>;
    public allComm:Array<any>;
    public check : Array<any>;

    @Action
    public async commentsExport(){
        debugger;
        let alert: any = Message;
        await request.post('/api/workerlib/archives_appraise/export',{
            "conditionList": [{
                "name": "id",
                "value":  this.check,
                "algorithm": "IN"
            }
            ],

            "keywords" : [],
            "selectList": [
                {"field": "name" ,"alias":"姓名"},
                {"field": "avg","alias":"平均分" },
                {"field": "difference","alias":"好评" },
                {"field": "in","alias":"中评" },
                {"field": "good" ,"alias":"差评"},
                {"field": "project","alias":"所属项目" },
                {"field": "work_type","alias":"工种" }
            ]
        }, {responseType: 'blob', params: '评价'}).then((data)=>{
            this.successUpload();
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
    public getParams() : any {
        return {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex, //页码
                "pageSize": this.pageInfo.pageSize  //每页条数
            },

            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": [{
                "field": "*",
                "function": "",
            }]
        }
    }


    @Action
    public async count() {
        await request.post('/api/workerlib/archives/count', await this.getParams()).then((total)=>{
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public async addAppraise(){
        debugger;
        await request.put('/api/workerlib/appraise',{
            "type": 1,
            "project_name":this.archivesInfo.project,
            "appraise_time":this.appraiseInfo.appraise_time,
            "description":this.appraiseInfo.description,
            "archives_id":this.archivesInfo.archives_id,
            "project_to_name":this.appraiseInfo.project_to_name,
            "punishment":this.appraiseInfo.punishment,
        }).then((data)=>{
            this.add(data);
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
    public async addAppraises(){
        await request.put('/api/workerlib/appraise',{
            "type": 2,
            "description":this.appraiseInfo.description,
            "archives_id":this.archivesInfo.archives_id,
            "project_name":this.appraiseInfo.project_name,
            "project_to_name":this.appraiseInfo.project_to_name,
        }).then((data)=>{
            this.addAppraiseStore(data.data)
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
    public async search() {
        await request.post('/api/workerlib/archives_appraise', await this.getParams()).then((data)=>{
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
    public async commentType(){
        await request.post('/api/workerlib/dictionaries',{
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },
            "conditionList": [{
                "name": "category",
                "value": "处罚类型",
                "algorithm": "EQ",
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            this.punishment(data);
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
    public async comment(archives_id) {
        debugger;
        await request.post('/api/workerlib/score', {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex, //页码
                "pageSize": this.pageInfo.pageSize  //每页条数
            },
            "conditionList": [{
                "name": "archives_id",
                "value": archives_id,
                "algorithm": "EQ"
            }],

            "sortList": [{
                "name": "createOn",
                "desc": true
            }],

            "groupList" : [],

            "keywords" : [],

            "selectList": [{
                "field": "*",
                "function": "",
            }]
        }).then((data)=>{
            this.obtains(data);
            // this.success(data);
            // this.count();
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
    public async dialog(archives_id) {
        debugger;
        await request.post('/api/workerlib/archives_appraise', {
            "pageInfo" : {
                "pageIndex": 0,
                "pageSize": 1
            },

            "conditionList": [{
                "name": "archives_id",
                "value": archives_id,
                "algorithm": "EQ"
            }],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": [{
                "field": "*",
                "function": "",
            }]
        }).then((data)=>{
            this.obtain(data);
            // this.success(data);
            // this.count();
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
    public async addAppraiseStore(appraise_id) {
        await request.put('/api/workerlib/appraise_score', {
            "appraise_id": appraise_id,
            "appraise_score":(Number(this.appraise_scoreInfo.createBy+this.appraise_scoreInfo.appraise_score+this.appraise_scoreInfo.modifyBy)/3).toFixed(1)
        }).then((data)=>{
            this.add(data);
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
    public add(data: any) {
        if(data.status == 0) {
            this.search();
        }
    }
    public
    @Mutation
    public setPageTotal(total: any) {
        this.pageInfo = {
            pageIndex: this.pageInfo.pageIndex,
            pageSize:  this.pageInfo.pageSize,
            pageCount: this.pageInfo.pageCount,
            totalRecords: total
        };
    }
    @Mutation
    private setCheck(data: any) {
        this.check = data;
    }
    @Mutation
    private successUpload() {
        this.check = [];
    }
    @Mutation
    public punishment (data:any){
        this.punishments = data.data;
    }
    @Mutation
    public success(data: any) {
        this.comments = data.data;
    }
    @Mutation
    public obtain(data:any){
        this.ups = data.data;
    }
    @Mutation
    public obtains(data:any){
        this.allComm = data.data;
    }
    @Mutation
    private pageIndex(data: number) {
        this.pageInfo.pageIndex = data;
    }
    @Mutation
    private pageSize(data: number) {
        this.pageInfo.pageSize = data;
    }
    @Mutation
    public setArchivesId(data:any){
        this.archivesInfo.archives_id = data;
    }
    @Mutation
    public setPunishment(data:any){
        this.appraiseInfo.punishment = data;
    }
    @Mutation
    public setAppraise_scoreId(data:any){
        this.appraise_scoreInfo.id = data;
    }
    @Mutation
    public setAppraise_photoId(data:any){
        this.appraise_photoInfo.id = data;
    }
    @Mutation
    public setAppraiseId(data:any){
        this.appraiseInfo.id = data;
    }
    @Mutation
    public setType(data:any){
        this.appraiseInfo.type = data;
    }
    @Mutation
    public setDescription(data:any){
        this.appraiseInfo.description = data;
    }
    @Mutation
    public setArchives_id(data:any){
        this.appraiseInfo.archives_id = data;
    }
    @Mutation
    public setAppraise_time(data:any){
        this.appraiseInfo.appraise_time = data;
    }
    @Mutation
    public setProject(data:any){
        this.archivesInfo.project = data;
    }
    @Mutation
    public setAppraise_score(data:any){
        this.appraise_scoreInfo.appraise_score = data;
    }
    @Mutation
    public setModifyBy(data:any){
        this.appraise_scoreInfo.modifyBy = data;
    }
    @Mutation
    public setCreateBy(data:any){
        this.appraise_scoreInfo.createBy = data;
    }
    @Mutation
    public setProject_name(data:any){
        this.appraiseInfo.project_name = data;
    }
    @Mutation
    public setProject_to_name(data:any){
        this.appraiseInfo.project_to_name = data;
    }
}

interface AppraiseInfo {
    id?:number;
    type?:number;
    description?: string;
    archives_id?:string;
    appraise_time?:Date;
    userPath?:string;
    modifyBy?:number;
    modifyTime?:Date;
    createOn?:Date;
    createBy?:number;
    punishment?:string;
    project_name?:string;
    project_to_name?:string;
}
interface Appraise_photoInfo {
    id?:number;
    appraise_id?:number;
    photo?:string;
    userPath?:string;
    modifyBy?:number;
    modifyTime?:Date;
    createOn?:Date;
    createBy?:number;
}
interface Appraise_scoreInfo {
    id?:number;
    appraise_id?:number;
    appraise_type?:number;
    appraise_score?:string;
    userPath?:string;
    modifyBy?:number;
    modifyTime?:Date;
    createOn?:Date;
    createBy?:number;
}
interface PageInfo {
    pageIndex?: number;
    pageSize?: number;
    pageCount?:number;
    totalRecords?:number;
}
interface ArchivesInfo {
    archives_id?:string;
    name?:string;
    phone?:string;
    emergency_name?:string;
    emergency_phone?:string;
    project?:string;
    id_number?:string;
    project_id?:number;
    photo?:string;
    work_type?:string;
    foreman_name?:string;
    foreman_phone?:string;
    award?:string;
    certificate?:string;
    work_experience?:Text;
    unit_id?:number;
    construction_unit?:string;
    undertaking_unit?:string;
    completion_date?:Date;
    qr_code?:string;
    bank_card?:string;
    leader?:number;
    leave?:number;
    id_card_front?:string;
    id_card_reverse?:string;
    grade?:string;
    rate?:string;
    rate_time?:Date;
    userPath?:string;
    modifyBy?:string;
    modifyTime?:Date;
    createOn?:Date;
    createBy?:number;

}
