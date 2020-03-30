import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "IndexVideoStore",
    store,
})
export default class IndexVideoStore extends VuexModule {
    constructor(e) {
        super(e);
        this.indexVideo = [];
        this.insertVideo = "";
        this.insertPhoto = [];
        this.insertList = [];
        this.okVideo = "是";
        this.isOk = 1;
        this.deleteId = null;
    }
    public indexVideo:Array<any>;
    public insertVideo:string;
    public insertPhoto:Array<any>;
    public insertList:Array<any>;
    public okVideo:string;
    public isOk:number;
    public deleteId:number;

    @Action
    public async searchVideoInfo() {
        await request.post('/api/workerlib/indexVideo',{
            "pageInfo" : {},
            "conditionList": [],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successIndexVideo(data);
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
    public async updateVideoInfo() {
        await request.post('/api/workerlib/indexVideo/update',{
            "data": {
                "isOk":this.isOk
            },
            "conditionList": [],

            "keywords" : []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateVideoInfo(data);
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
        await request.delete('/api/workerlib/indexVideo/'+this.deleteId,).then((data)=>{
            if(!data){
                return;
            }
            this.successDelete(data);
            this.searchVideoInfo();
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
        if(this.insertVideo){
            let item = {};
            item["file"] = this.insertVideo;
            item["type"] = "video";
            item["isOk"] = this.isOk;
            this.insertList.push(item);
        }
        if(this.insertPhoto && this.insertPhoto.length>0){
            for(let i = 0;i<this.insertPhoto.length;i++){
                let item = {};
                item["file"] = this.insertPhoto[i].file;
                item["type"] = "photo";
                item["isOk"] = this.isOk;
                this.insertList.push(item);
            }
        }
        await request.put('/api/workerlib/indexVideo',this.insertList).then((data)=>{
            if(!data){
                return;
            }
            this.successInsertVideoInfo(data);

            this.searchVideoInfo();
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


    @Mutation
    public successIndexVideo(data: any) {
        this.indexVideo = data.data;
    }
    @Action
    public successInsertVideoInfo(data: any) {
        if(data.status == 0){
            this.updateVideoInfo();
        }
    }
    @Mutation
    public successUpdateVideoInfo(data: any) {
        if(data.status == 0){
            this.insertVideo = null;
            this.insertPhoto = new  Array<any>();
            this.insertList = new Array<any>();
            let alert: any = Message;
            alert.success('成功！')
        }
    }
    @Mutation
    public setOkVideo(data:string){
        this.okVideo = data;
    }
    @Mutation
    public setIsOk(data:number){
        this.isOk = data;
    }
    @Mutation
    public setDeleteId(data:number){
        this.deleteId = data;
    }
    @Mutation
    public setInsertVideo(data: string) {
        this.insertVideo= data;
    }
    @Mutation
    public setInsertPhoto(data: any) {
        this.insertPhoto.push(data) ;
    }
    @Mutation
    public successDelete(data: any) {
        if(data.status == 0) {
            let alert: any = Message;
            alert.warning("删除成功！");
        }
    }
}
