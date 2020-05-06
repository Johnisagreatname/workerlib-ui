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

        //----------------------
        this.appraiseList = [];
        this.projectType = [];
        this.insertScoreList = [];
        this.insertPhotoList = [];
        this.punishments = [];
        this.comments = [];
        this.check = [];
        this.commentSparticularsList = [];
        this.selectName = null;
        this.selectWorkType = null;
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
        this.pullDown = false;

        this.commGood = null;
        this.commMiddle = null;
        this.commBad = null;
    }


    //------------------------------
    public selectName:string;
    public selectWorkType:string;
    public selectEafId:string;
    public insertProject:string;
    public insertDescription:string;
    public insertPunishment:string;
    public insertAppraiseTime:Date;
    public totalRecords:number;
    public pageIndex: number;
    public pageSize: number;
    public insertType:number;
    public punishmentsId :number;
    public insertPhoto:Array<any>;
    public comments:Array<any>;
    public commentSparticularsList:Array<any>;
    public projectList:Array<any>;
    public selectComments:Array<any>;
    public punishments:Array<any>;
    public appraiseList:Array<any>;
    public insertPhotoList:Array<any>;
    public insertScoreList:Array<any>;
    public check : Array<any>;
    public projectType : Array<any>;
    private pullDown: boolean;

    private commGood: string;
    private commMiddle: string;
    private commBad: string;
    @Action
    public getParams() : any {
        if(this.selectName){
            let item = {};
            item["name"] = "eafName";
            item["value"] = this.selectName;
            item["algorithm"] = "LIKE";
            this.selectComments.push(item);
        }
        if(this.selectWorkType){
            let item = {};
            item["name"] = "workType";
            item["value"] = this.selectWorkType;
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
        await request.post('/api/workerlib/comments/count', await this.getParams()).then((data)=>{
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
            "project_id":this.insertProject,
            "project_name":this.projectList.filter(a => a.project_id == this.insertProject).map(b => b.project_name)[0],
            "appraise_time":this.insertAppraiseTime.getFullYear()+"-"+(this.insertAppraiseTime.getMonth()+1)+"-"+this.insertAppraiseTime.getDate(),
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
            "project_name":this.projectList.filter(a => a.project_id == this.insertProject).map(b => b.project_name)[0],
            "project_id":this.insertProject
        }).then((data)=>{
            if(!data){
                return;
            }
            if(data.status == 0) {
                if(this.insertPhoto.length>0){
                    this.insertAppraisePhoto(data.data);
                }
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
        if(this.insertPhoto.length>0){
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
        }else{
            let alert: any = Message;
            alert.success("成功！");

        }
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
    public async upload() {
        await request.post('/api/workerlib/comments/export',{
            "conditionList": [{
                "name": "eafId",
                "value":  this.check,
                "algorithm": "IN"
            }],


            "keywords" : [],
            "selectList": [
                {"field": "eafName","alias":"姓名" },
                {"field": "commBad" ,"alias":"差评"},
                {"field": "commMiddle","alias":"中评" },
                {"field": "commGood","alias":"好评" },
                {"field": "synthesize","alias":"综合得分" },
                {"field": "workType","alias":"工种" }
            ]

        },{responseType: 'blob', params: '综合评价'}).then((data)=>{
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
            if(!data){
                return;
            }
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
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

        }
    }
    @Action
    public sucessInsertSynthesizeAppraise(data: any) {
        this.clearInsertDataList();
        if(data.status == 0) {
            this.search();
            let alert: any = Message;
            alert.success("成功！");
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
    private setCheck(data: any) {
        this.check.push(data);
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
        this.appraiseList = new Array<any>();
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
        this.insertPhotoList = new Array<any>();
        this.insertProject = null;
        this.insertDescription = null;
        this.insertAppraiseTime = null;
        this.insertPhoto = new  Array<any>();
        this.insertPunishment = null;
        this.appraiseList = new Array<any>();

    }
    @Mutation
    private successUpload() {
        this.check = new  Array<any>();
    }
    @Mutation
    private setCommGood(data : any){
        this.commGood = data;
    }
    @Mutation
    private setCommMiddle(data : any){
        this.commMiddle = data;
    }
    @Mutation
    private setCommBad(data : any){
        this.commBad = data;
    }
    @Mutation
    private setSelectWorkType(data : any){
        this.selectWorkType = data;
    }
    @Mutation
    private setPullDown(data : any){
        this.pullDown = data;
    }
    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }
    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }
}
