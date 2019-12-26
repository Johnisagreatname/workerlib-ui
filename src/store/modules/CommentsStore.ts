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

        this.ups = [];

        this.allComm = [];
        this.check = [];

        //----------------------
        this.appraiseList = [];
        this.insertScoreList = [];
        this.insertPhotoList = [];
        this.punishments = [];
        this.comments = [];
        this.commentSparticularsList = [];
        this.selectName = null;
        this.selectEafId = null;
        this.selectComments = [];
        this.projectList = [];
        this.totalRecords = null;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.insertType = 1;
        this.insertProject = null;
        this.insertDescription = null;
        this.insertPunishment = null;
        this.insertPhoto = [];
        this.insertAppraiseTime = null;
        this.punishmentsId = null;
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

    public ups:Array<any>;
    public allComm:Array<any>;
    public check : Array<any>;

    //-------------------------------
    public appraiseList:Array<any>;
    public insertPhotoList:Array<any>;
    public insertScoreList:Array<any>;

    public selectName:string;
    public selectEafId:string;

    public insertType:number;
    public insertProject:string;
    public insertDescription:string;
    public insertPunishment:string;
    public insertPhoto:Array<any>;
    public insertAppraiseTime:Date;

    public totalRecords:number;
    public pageIndex: number;
    public pageSize: number;

    public punishmentsId :number;

    public comments:Array<any>;
    public commentSparticularsList:Array<any>;
    public projectList:Array<any>;
    public selectComments:Array<any>;
    public punishments:Array<any>;

    @Action
    public getParams() : any {
        if(this.selectName){
            let item = {};
            item["name"] = "eafName";
            item["value"] = this.selectName;
            item["algorithm"] = "LIKE";
            this.selectComments.push(item);
        }
        return {
            "pageInfo" : {
                "pageIndex": this.pageIndex, //页码
                "pageSize": this.pageSize  //每页条数
            },

            "conditionList": this.selectComments,

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }
    }
    @Action
    public async search() {
        await request.post('/api/workerlib/comments', await this.getParams()).then((data)=>{
            if(!data){
                return;
            }
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
    public async searchCommentSparticulars() {
        await request.post('/api/workerlib/commentsparticulars',{
            "pageInfo" : {},

            "conditionList": {
                "name" : "archives_id ",
                "value" : this.punishmentsId,
                "algorithm" : "EQ"
            },

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successCommentSparticulars(data);
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
    public async count() {
        await request.post('/api/workerlib/archives/count', await this.getParams()).then((data)=>{
            if(!data){
                return;
            }
            this.setPageTotal(data.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async searchProjectList() {
        await request.post('/api/workerlib/join',{
            "joinTables": [
                {
                    "tablename": "archives",
                    "alias": "a",
                    "JoinMode": "Left",
                },
                {
                    "tablename": "project",
                    "alias": "p",
                    "JoinMode": "Left",
                    "onList": [{
                        "name": "p.project_id",
                        "value": "a.project_id",
                        "algorithm": "EQ"
                    }]
                }
            ],
            "pageInfo" : {},
            "conditionList": [{
                "name": "a.archives_id",
                "value": this.selectEafId,
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
            this.successProjectList(data);
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
            "pageInfo" : {},
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
            if(!data){
                return;
            }
            this.sucessPunishment(data);
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
    public async searchAppraiseList() {
        await request.post('/api/workerlib/dictionaries',{
                "pageInfo" : {},
                "conditionList": [
                    {
                        "name": "category",
                        "value": "评价类型",
                        "algorithm": "EQ"
                    }
                ],
                "sortList": [],
                "groupList" : [],
                "keywords" : [],
                "selectList": []
            }
        ).then((data)=>{
            if(!data){
                return;
            }
            this.successAppraiseList(data);
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
    public async insertBadnessAppraise(){
        await request.put('/api/workerlib/appraise',{
            "type": this.insertType,
            "description":this.insertDescription,
            "archives_id":this.selectEafId,
            "project_name":this.insertProject,
            "appraise_time":this.insertAppraiseTime.getFullYear()+"-"+(this.insertAppraiseTime.getMonth()+1)+"-"+this.insertAppraiseTime.getDay(),
            "punishment":this.insertPunishment
        }).then((data)=>{
            if(!data){
                return;
            }
            if(data.status == 0){
                this.insertAppraisePhoto(data.data);
            }

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
    public async insertSynthesizeAppraise(){
        await request.put('/api/workerlib/appraise',{
            "type": this.insertType,
            "description":this.insertDescription,
            "archives_id":this.selectEafId,
            "project_name":this.insertProject
        }).then((data)=>{
            if(!data){
                return;
            }
            if(data.status == 0) {
                this.insertAppraisePhoto(data.data);
                this.insertAppraiseScore(data.data);
            }

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
    public async insertAppraisePhoto(data){
        for(let i=0;i < this.insertPhoto.length;i++) {
            let item = {};
            item["appraise_id"] = data;
            item["photo"] = this.insertPhoto[i];
            this.insertPhotoList.push(item);
        }
        await request.put('/api/workerlib/appraise_photo',this.insertPhotoList).then((data)=>{
            if(!data){
                this.clearInsertDataList();
                return;
            }

            if(this.insertType == 1){
                this.sucessInsertBadnessAppraise(data);
            }
            }).catch((e)=>{
            this.clearInsertDataList();
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
    public async insertAppraiseScore(data){
        for(let i in this.appraiseList) {
            let item = {};
            item["appraise_id"] = data;
            item["appraise_type"] = this.appraiseList[i].value;
            item["appraise_score"] = this.appraiseList[i].score;
            this.insertScoreList.push(item);
        }
        await request.put('/api/workerlib/appraise_score',this.insertScoreList).then((data)=>{
            if(!data){
                this.clearInsertDataList();
                return;
            }
            this.sucessInsertSynthesizeAppraise(data);
        }).catch((e)=>{
            this.clearInsertDataList();
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
    public async commentsExport(){
        let alert: any = Message;
        await request.post('/api/workerlib/export/join',{
            "joinTables": [{
                "tablename": "alluser_appraise_appraise_score",
                "alias": "a",
                "joinMode": "inner"
            }, {
                "tablename": "alluser_arvhives_project",
                "alias": "b",
                "joinMode": "Inner",
                "onList": [{
                    "name": "a.archives_id",
                    "value": "b.eafId",
                    "algorithm": "EQ"
                }]
            },],
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
    public async addAppraise(){
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
    public async comment(archives_id) {
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
        await request.post('/api/workerlib/join', {
            "joinTables": [{
                "tablename": "alluser_appraise_appraise_score",
                "alias": "a",
                "joinMode": "inner"
            }, {
                "tablename": "alluser_arvhives_project",
                "alias": "b",
                "joinMode": "Inner",
                "onList": [{
                    "name": "a.archives_id",
                    "value": "b.eafId",
                    "algorithm": "EQ"
                }]
            },{
                "tablename": "alluser_archives_unit",
                "alias": "c",
                "joinMode": "Left",
                "onList": [{
                    "name": "b.unit_id",
                    "value": "c.unit_id",
                    "algorithm": "EQ"
                }]
            }],
            "pageInfo" : {
                "pageIndex": 0, //页码
                "pageSize": 1  //每页条数
            },

            "conditionList": [{ //查询条件
                "name": "archives_id",   //字段名
                "value": archives_id,   //值
                "algorithm": "EQ",   //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12), NOTIN(13)
            }],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": [{ //显示字段
                "field": "*",  //字段名
                "function": "NONE",  //数据库相关函数：MAX, MIN, UPPER, LOWER, LENGTH, AVG, COUNT, SUM, GROUP_CONCAT等;
            } ]
        }).then((data)=>{
            this.obtain(data);
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

    //-----------------------------------
    @Mutation
    public success(data: any) {
        this.comments = data.data;
    }
    @Mutation
    public successCommentSparticulars(data: any) {
        this.commentSparticularsList = data.data;
    }
    @Action
    public sucessInsertBadnessAppraise(data: any) {
        this.clearInsertDataList();
        if(data.status == 0) {
            this.search();
            let alert: any = Message;
            alert.warning("成功！");
        }
    }
    @Action
    public sucessInsertSynthesizeAppraise(data: any) {
        this.clearInsertDataList();
        if(data.status == 0) {
            this.search();
            let alert: any = Message;
            alert.warning("成功！");
        }
    }
    @Mutation
    public successProjectList(data: any) {
        this.projectList = data.data;
    }
    @Mutation
    public sucessPunishment(data:any){
        this.punishments = data.data;
    }
    @Mutation
    public setPageTotal(total: any) {
        this.selectComments = [];
        this.totalRecords = total;
    }
    @Mutation
    public setPageSize(data: number) {
        this.pageSize = data;
    }
    @Mutation
    public setPageIndex(data: number) {
        this.pageIndex = data;
    }
    @Mutation
    public setSelectEafId(data: string) {
        this.selectEafId = data;
    }
    @Mutation
    private setSelectName(data: string) {
        this.selectName = data;
    }
    @Mutation
    public setInsertType(data: number) {
        this.insertType = data;
    }
    @Mutation
    public setPunishmentsId(data:number){
        this.punishmentsId = data;
    }
    @Mutation
    public setInsertProject(data: string) {
        this.insertProject = data;
    }
    @Mutation
    public setInsertDescription(data: string) {
        this.insertDescription = data;
    }
    @Mutation
    public setInsertPunishment(data: string) {
        this.insertPunishment = data;
    }
    @Mutation
    public setInsertPhoto(data: any) {
        this.insertPhoto.push(data);
    }
    @Mutation
    public setInsertAppraiseTime(data: Date) {
        this.insertAppraiseTime = data;
    }
    @Mutation
    public successAppraiseList(data: any) {
        for(let i= 0;i<data.data.length;i++){
            let item={};
            item["name"] = data.data[i].name;
            item["value"] = data.data[i].value;
            item["score"] = 1;
            this.appraiseList.push(item);
        }
    }
    @Mutation
    public clearAppraiseList() {
        this.appraiseList = new Array<any>();
    }
    @Mutation
    public clearInsertDataList() {
        this.insertProject = null;
        this.insertDescription = null;
        this.insertAppraiseTime = null;
        this.insertPhoto = new  Array<any>();
        this.insertPunishment = null;
        this.appraiseList = new Array<any>();

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
    public obtain(data:any){
        this.ups = data.data;
    }
    @Mutation
    public obtains(data:any){
        this.allComm = data.data;
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
