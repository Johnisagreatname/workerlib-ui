import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "RateStore",
    store,
})
export default class RateStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageIndex=1;
        this.pageSize=10;
        this.pageCount=0;

        this.selectName = null;

        this.addName = null;
        this.addValue = null;

        this.editId=null;
        this.editName = null;
        this.editValue = null;

        this.deleteId = null;

        this.commentTypeList = [];
        this.commentList = [];
        this.conditionList = [];
        this.commentTypeInfo = {};
    }
    public pageIndex:number;
    public pageSize:number;
    public pageCount:number;


    public deleteId:number;

    public editId:number;
    public editName:string;
    public editValue:number;

    public selectName:string;

    public addName:string;
    public addValue:number;

    public conditionList:Array<any>;
    public commentTypeList:Array<any>;
    public commentList:Array<any>;
    public commentTypeInfo:any;
    @Action
    public getParams() : any {
        debugger
        if(this.selectName){
            let item = {};
            item["name"] = "name";
            item["value"] = this.selectName;
            item["algorithm"] = "EQ";
            this.conditionList.push(item);
        }
        let item = {};
        item["name"] = "category";
        item["value"] = "评定级别";
        item["algorithm"] = "EQ";
        this.conditionList.push(item);
        return {
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },
            "conditionList": this.conditionList,
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        };
    }
    @Action
    public async searchList() {
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [
                {
                    "name": "category",
                    "value": "评定级别",
                    "algorithm": "EQ",
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
            this.successList(data);
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
        await request.post('/api/workerlib/dictionaries', await this.getParams()).then((data)=>{
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
    public async count() {
        await request.post('/api/workerlib/dictionaries/count', await this.getParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageCount(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async searchInfo() {
        await request.post('/api/workerlib/dictionaries',{
            "pageInfo" : {},
            "conditionList": [
                {
                    "name": "id",
                    "value": this.editId ,
                    "algorithm": "EQ"
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
            this.successInfo(data);
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
    public async addCommentType(){
        await request.put('/api/workerlib/dictionaries',{
            "name":this.addName,
            "value":this.addValue,
            "category": "评定级别"
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successAdd(data);
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
    public async updateCommentType(){
        await request.put('/api/workerlib/dictionaries/'+this.editId,{
            "name":this.editName,
            "value":this.editValue
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdate(data);
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
    public async deleteCommentType(){
        await request.delete('/api/workerlib/dictionaries/'+this.deleteId).then((data)=>{
            if(!data){
                return;
            }
            this.successDelete(data);
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
    public async successAdd(data:any){
        if(data.status == 0){
            this.search();
            this.searchList();
            let alert: any = Message;
            alert.warning('成功！');
        }
    }
    @Action
    public async successUpdate(data:any){
        if(data.status == 0){
            this.search();
            this.searchList();
            let alert: any = Message;
            alert.warning('成功！');
        }
    }
    @Action
    public async successDelete(data:any){
        if(data.status == 0){
            this.search();
            this.searchList();
            let alert: any = Message;
            alert.warning('成功！');
        }
    }
    @Mutation
    public success(data: any) {
        this.commentTypeList = data.data;
    }
    @Mutation
    public successList(data: any) {
        this.commentList = data.data;
    }
    @Mutation
    public successInfo(data:any){
        this.commentTypeInfo = data.data;
        this.editName = this.commentTypeInfo[0].name;
        this.editValue = this.commentTypeInfo[0].value;
    }



    public columns = [
        {
            title: '序号',
            key: 'value',
            sortable: true
        },
        {
            title: '级别',
            key: 'name',
            sortable: true
        },
        {
            title: '详细操作',
            slot: 'operation',
            sortable: true
        }
    ];

    @Mutation
    private  setDeleteId(data:number){
        this.deleteId = data;
    }

    @Mutation
    private  setEditId(data:number){
        this.editId = data;
    }

    @Mutation
    private setEditName(data: string) {
        this.editName = data;
    }

    @Mutation
    private  setEditValue(data:number){
        this.editValue = data;
    }
    @Mutation
    private setAddName(data: string) {
        this.addName = data;
    }

    @Mutation
    private  setAddValue(data:number){
        this.addValue = data;
    }
    @Mutation
    private setPageIndex(data: number) {
        this.pageIndex = data;
    }
    @Mutation
    private setPageSize(data: number) {
        this.pageSize = data;
    }
    @Mutation
    private setPageCount(data: number) {
        this.pageCount = data;
        this.conditionList = new Array<any>();
    }
    @Mutation
    private setSelectName(data: string) {
        this.selectName = data;
    }
}
