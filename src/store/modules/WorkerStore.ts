import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "WorkerStore",
    store,
})
export default class WorkerStore extends VuexModule {

    public peoples: any;
    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;

    public userName:string;
    public card:string;
    public phone:number;
    public type:number;
    public project:string;
    public unit:string;
    public animal:string;

    public selectProjectName:string;
    public selectContractors:string;
    public selectUserName:string;
    public selectType:string;
    public selectStatus:number;


    public projectType: Array<ProjectType>;

    constructor(e) {
        super(e)
        this.pageIndex=1;
        this.pageSize= 10;
        this.pageTotal = 0;
        this.peoples = [];
        this.projectType = [];
        this.animal = "2";

        this.selectProjectName="";
        this.selectContractors="";
        this.selectUserName="";
        this.selectType="";
        this.selectStatus=null;


    }
    @Action
    public getParams() : any {
        debugger
        return {

            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": [{
                "name": "project",
                "value": this.selectProjectName,
                "algorithm": "LIKE"
            },{
                "name": "construction_unit",
                "value": this.selectContractors,
                "algorithm": "LIKE"
            },{
                "name": "name",
                "value": this.selectUserName,
                "algorithm": "LIKE"
            },{
                "name": "work_type",
                "value": this.selectType,
                "algorithm": "EQ"
            },{
                "name": "leave",
                "value": !this.selectStatus ? null : this.selectStatus,
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
    public async search() {
        await request.post('/api/workerlib/archives',await this.getParams()).then((data)=>{
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
    public async count() {
        debugger
        await request.post('/api/workerlib/archives/count', await this.getParams()).then((total)=>{
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public async getProjectType(){
        debugger;
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
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    public setSelectProjectName(data:string){
        this.selectProjectName = data;
    }
    @Mutation
    public setSelectContractors(data:string){
        this.selectContractors = data;
    }
    @Mutation
    public setSelectUserName(data:string){
        this.selectUserName = data;
    }
    @Mutation
    public setSelectType(data:string){
        this.selectType = data;
    }
    @Mutation
    public setSelectStatus(data:number){
        this.selectStatus = data;
    }

    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }
    @Mutation
    public setUserName(data:string) {
        this.userName = data;
    }
    @Mutation
    public setCard(data:string){
        this.card = data;
    }
    @Mutation
    public setPhone(data:number){
        this.phone = data;
    }
    @Mutation
    public setType(data:number) {
        this.type = data;
    }
    @Mutation
    public setProject(data:string){
        this.project = data;
    }
    @Mutation
    public setUnit(data:string){
        this.unit = data;
    }
    @Mutation
    public setAnimal(data:string){
        this.animal = data;
    }
    @Mutation
    private success(data: any) {
        this.peoples = data.data;
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
    onCheck(id: number) {
        let data = this.peoples;
        this.peoples = [];
        if(data.filter(a=>a.id == id).length > 0) {
            let currentVal = data.filter(a=>a.id == id)[0].checked;
            data.filter(a=>a.id == id)[0].checked = !currentVal;
            this.peoples = data;
        }
    }
}
interface ProjectType {
    value?: string;
    name?: string;
}