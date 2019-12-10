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

    @Action
    public async commentsExport(){
        await request.post('/api/workerlib/export/join',{
            "joinTables": [
                {
                    "tablename": "archives",
                    "alias": "b",
                    "joinMode": "Inner",
                },
                {
                    "tablename": "appraise",
                    "alias": "a",
                    "joinMode": "Left",
                    "onList":[{
                        "name":"a.archives_id",
                        "value":"b.id",
                        "algorithm":"EQ"
                    }]
                }, {
                    "tablename": "appraise_score",
                    "alias": "c",
                    "joinMode": "Left",
                    "onList": [{
                        "name": "a.id",
                        "value": "c.appraise_id",
                        "algorithm": "EQ"
                    }]
                }],

            "conditionList": [],

            "keywords" : [],

            "selectList": [{ //显示字段
                "field": "name",  //字段名
                "function": "count",  //数据库相关函数：MAX, MIN, UPPER, LOWER, LENGTH, AVG, COUNT, SUM, GROUP_CONCAT等;
            }]
        }, {responseType: 'blob', params: '评价'}).then((data)=>{
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
    public getParams() : any {
        return {
            "joinTables": [
                {
                    "tablename": "archives",
                    "alias": "b",
                    "joinMode": "Inner",

                },
                {
                    "tablename": "appraise",
                    "alias": "a",
                    "joinMode": "Left",
                    "onList":[{
                        "name":"a.archives_id",
                        "value":"b.id",
                        "algorithm":"EQ"
                    }]
                }, {
                "tablename": "appraise_score",
                "alias": "c",
                "joinMode": "Left",
                "onList": [{
                    "name": "a.id",
                    "value": "c.appraise_id",
                    "algorithm": "EQ"
                }]
            }],
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex, //页码
                "pageSize": this.pageInfo.pageSize  //每页条数
            },

            "conditionList": [],

            "sortList": [],

            "groupList" : [
                "b.id"
            ],

            "keywords" : [],
            "selectList": [{ //显示字段
                "field": "name",  //字段名
                "function": "NONE",
            },{
                "field":"photo",
                "function":"NONE"
            },{
                "field":"project",
                "function":"NONE"
            },{
                "field":"work_type",
                "function":"NONE"
            },{
                "field":"b.id",
                "function":"NONE"
            }]
        };
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
            "description":this.appraiseInfo.description,
            "archives_id":this.archivesInfo.id,
        }).then((data)=>{
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
    public async search() {
        await request.post('/api/workerlib/join', await this.getParams()).then((data)=>{
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
        debugger;
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
    public async dialog(id) {
        await request.post('/api/workerlib/join', {
            "joinTables": [
                {
                    "tablename": "archives",
                    "alias": "b",
                    "joinMode": "Inner",

                },
                {
                    "tablename": "appraise",
                    "alias": "a",
                    "joinMode": "Left",
                    "onList":[{
                        "name":"a.archives_id",
                        "value":"b.id",
                        "algorithm":"EQ"
                    }]
                }, {
                    "tablename": "appraise_score",
                    "alias": "c",
                    "joinMode": "Left",
                    "onList": [{
                        "name": "a.id",
                        "value": "c.appraise_id",
                        "algorithm": "EQ"
                    }]
                }],
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex, //页码
                "pageSize": this.pageInfo.pageSize  //每页条数
            },

            "conditionList": [{
                "name": "b.id",
                "value": id,
                "algorithm": "EQ",
            }],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": [{ //显示字段
                "field": "name",  //字段名
                "function": "",
            },{
                "field":"photo",
                "function":""
            },{
                "field":"project",
                "function":""
            },{
                "field":"work_type",
                "function":""
            },{
                "field":"b.id",
                "function":""
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
    private pageIndex(data: number) {
        this.pageInfo.pageIndex = data;
    }
    @Mutation
    private pageSize(data: number) {
        this.pageInfo.pageSize = data;
    }
    @Mutation
    public setArchivesId(data:any){
        this.archivesInfo.id = data;
    }
    @Mutation
    public setPunishment_id(data:any){
        this.appraiseInfo.punishment_id = data;
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

}

interface AppraiseInfo {
    id?:number;
    type?:number;
    description?: string;
    archives_id?:number;
    appraise_time?:Date;
    userPath?:string;
    modifyBy?:number;
    modifyTime?:Date;
    createOn?:Date;
    createBy?:number;
    punishment_id?:number;
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
    id?:string;
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
