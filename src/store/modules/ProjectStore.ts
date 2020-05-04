import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";
import router from "../../router/.invoke/router";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "ProjectStore",
    store,
})
export default class ProjectStore extends VuexModule {
    private companyList :Array<any>;
    private subCompanyList :Array<any>;
    private pullDown: boolean;
    private selectProjectName: string;
    private projectParticulars: any;
    private companyProjectList: Array<any>;
    private unitTypeList: Array<any>;
    private projectStatusList: Array<any>;

    private insertPid: string;
    private insertUnitName: string;
    private insertUnitLicense: string;
    private insertUnitType: number;
    private insertUnitPrincipal: string;
    private insertUnitAddress: string;
    private insertUnitBranchCompany: string;


    private insertProjectPid: string;
    private insertProjectName: string;
    private insertProjectBrief: string;
    private insertProjectStatus: number;
    private insertProjectBuilderLicense: string;
    private insertProjectAddress: string;
    private insertProjectStartTime: Date;
    private insertProjectEndTime: Date;
    private insertProjectBranchCompany: string;

    private uploadPid: string;
    private deleteCompanyId: string;


    constructor(e) {
        super(e);
        this.companyList = [];
        this.subCompanyList = [];
        this.pullDown = false;
        this.selectProjectName = null;
        this.projectParticulars = {};
        this.companyProjectList = [];
        this.unitTypeList = [];
        this.projectStatusList = [];

        this.insertPid = null;
        this.insertUnitName = null;
        this.insertUnitLicense = null;
        this.insertUnitType = null;
        this.insertUnitPrincipal = null;
        this.insertUnitAddress = null;
        this.insertUnitBranchCompany = null;

        this.insertProjectPid = null;
        this.insertProjectName = null;
        this.insertProjectBrief = null;
        this.insertProjectStatus = null;
        this.insertProjectBuilderLicense = null;
        this.insertProjectAddress = null;
        this.insertProjectStartTime = null;
        this.insertProjectEndTime = null;
        this.insertProjectBranchCompany = null;

        this.uploadPid = null;
        this.deleteCompanyId = null;
    }

    //公司层级关系
    @Action
    public async getCompany(id):Promise<any> {
        request.post('/api/workerlib/company_hierarchy',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "pid",
                "value": id,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                {"field": "o_org_name","alias":"title"},
                {"field": "id","alias":"id"},
                {"field": "o_dept_type_no","alias":"type"}
            ]
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successCompany({id, data});
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private successCompany({id, data}){
        this.subCompanyList = new Array<any>();
         for(let i = 0;i<data.data.length;i++){
            let c = {};
            if(data.data[i].type != 'project'){
                c["loading"] = false;
            }
            c["title"] = data.data[i].title;
            c["children"] = new Array();
            c["type"] = data.data[i].type;
            c["id"] = data.data[i].id;
            if(id){
                this.subCompanyList.push(c)
            }else{
                this.companyList.push(c);
            }

        }
    }
    //下拉效果切换
    @Mutation
    private setPullDown(data : any){
        this.pullDown = data;
    }
    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }

    //项目详情信息
    @Action
    public async getProjectParticulars(){
        request.post('/api/workerlib/project',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "project_name",
                "value": this.selectProjectName,
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

            this.successProjectParticulars(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private successProjectParticulars(data){
        if(data.status == 0){
            this.projectParticulars = data.data[0];
        }

    }
    @Mutation
    private setSelectProjectName(data : any){
        this.selectProjectName = data;
    }

    //公司列表
    @Action
    public async getCompanyList() {
        request.post('/api/workerlib/company_hierarchy',{
            "pageInfo" : {},
            "conditionList": [],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                {"field": "o_org_name","alias":"title"},
                {"field": "id","alias":"id"},
                {"field": "o_dept_type_no","alias":"type"}
            ]
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successCompanyList(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private successCompanyList(data){
        if(data.status == 0){
            this.companyProjectList = data.data;
        }
    }

    //新增单位
    @Action
    public async getUnitTypeList() {
        request.post('/api/workerlib/dictionaries',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "单位类型",
                "algorithm": "EQ",
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                {"field": "value","alias":"id"},
                {"field": "name","alias":"name"}
            ]
        }).then((data)=>{
            if(!data){
                return;
            }

            this.successUnitTypeList(data);

        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private successUnitTypeList(data){
        if(data.status == 0){
            this.unitTypeList = data.data;
        }
    }
    @Action
    public async insertUnit() {
        request.put('/api/workerlib/unit',{
            "unit_id": null,
            "unit_name": this.insertUnitName,
            "unit_type": this.insertUnitType,
            "principal": this.insertUnitPrincipal,
            "project_license": this.insertUnitLicense,
            "address": this.insertUnitAddress
        }).then((data)=>{
            if(!data){
                return;
            }
            if(data.status == 0){this.insertUnitCompany();}
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async insertUnitCompany() {
        if(this.insertPid){
            this.setInsertUnitBranchCompany("branchcompany");
        }else{
            this.setInsertUnitBranchCompany("root");
        }
        let alert: any = Message;
        request.put('/api/workerlib/company_hierarchy',{
            "id": null,
            "o_org_name": this.insertUnitName,
            "pid": this.insertPid,
            "o_dept_type_no": this.insertUnitBranchCompany
        }).then((data)=>{
            if(!data){
                return;
            }

            alert.success("新增单位成功!");
            this.getCompanyList();
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private setInsertPid(data : any){
        this.insertPid = data;
    }
    @Mutation
    private setInsertUnitName(data : any){
        this.insertUnitName = data;
    }
    @Mutation
    private setInsertUnitLicense(data : any){
        this.insertUnitLicense = data;
    }
    @Mutation
    private setInsertUnitType(data : any){
        this.insertUnitType = data;
    }
    @Mutation
    private setInsertUnitPrincipal(data : any){
        this.insertUnitPrincipal = data;
    }
    @Mutation
    private setInsertUnitAddress(data : any){
        this.insertUnitAddress = data;
    }
    @Mutation
    private setInsertUnitBranchCompany (data : any){
        this.insertUnitBranchCompany  = data;
    }

    //项目状态
    @Action
    public async getProjectStatusList() {
        request.post('/api/workerlib/dictionaries',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "项目状态",
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                {"field": "value","alias":"id"},
                {"field": "name","alias":"name"}
            ]
        }).then((data)=>{
            if(!data){
                return;
            }

            this.successProjectStatusList(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private successProjectStatusList(data){
        if(data.status == 0){
            this.projectStatusList = data.data;
        }
    }
    @Action
    public async insertProject() {
        request.put('/api/workerlib/project',{

            "project_id": null,
            "project_name": this.insertProjectName,
            "project_brief": this.insertProjectBrief,
            "builder_license": this.insertProjectBuilderLicense,
            "status": this.insertProjectStatus,
            "start_time": this.insertProjectStartTime.getFullYear()+ "-" +(this.insertProjectStartTime.getMonth()+1)+ "-" +this.insertProjectStartTime.getDay(),
            "end_time": this.insertProjectEndTime.getFullYear()+ "-" +(this.insertProjectEndTime.getMonth()+1)+ "-" +this.insertProjectEndTime.getDay(),
            "project_address": this.insertProjectAddress
        }).then((data)=>{
            if(!data){
                return;
            }
            if(data.status == 0){
                this.insertProjectCompany();
            }
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async insertProjectCompany() {
        let alert: any = Message;
        request.put('/api/workerlib/company_hierarchy',{
            "id": null,
            "o_org_name": this.insertProjectName,
            "pid": this.insertProjectPid,
            "o_dept_type_no": "project"
        }).then((data)=>{
            if(!data){
                return;
            }

            alert.success("新增项目成功!")
            this.getCompanyList();
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private setInsertProjectPid (data : any){
        this.insertProjectPid  = data;
    }

    @Mutation
    private setInsertProjectName (data : any){
        this.insertProjectName  = data;
    }

    @Mutation
    private setInsertProjectBrief (data : any){
        this.insertProjectBrief  = data;
    }
    @Mutation
    private setInsertProjectStatus (data : any){
        this.insertProjectStatus  = data;
    }
    @Mutation
    private setInsertProjectBuilderLicense (data : any){
        this.insertProjectBuilderLicense  = data;
    }
    @Mutation
    private setInsertProjectAddress(data : any){
        this.insertProjectAddress  = data;
    }
    @Mutation
    private setInsertProjectStartTime(data : any){
        this.insertProjectStartTime  = data;
    }
    @Mutation
    private setInsertProjectEndTime (data : any){
        this.insertProjectEndTime  = data;
    }

    //导出
    @Action
    public async uploadProjectCompany() {
        let alert: any = Message;
        await request.post('/api/workerlib/company_hierarchy/export',{
            "conditionList": [{
                "name": "pid",
                "value": this.uploadPid,
                "algorithm": "EQ"
                }],
            "keywords" : [],
            "selectList": [
                {"field": "o_org_name" ,"alias":"名称"},
                {"function": "o_dept_type_no","alias":"类型" }
            ]
        }).then((data)=>{
            if(!data){
                return;
            }
            alert.success('导出成功！');
        }).catch((e)=> {
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private setUploadPid(data: any){
        this.uploadPid  = data;
    }
    @Action
    public async deleteProjectCompanyId(){
        await request.delete('/api/workerlib/company_hierarchy/'+this.deleteCompanyId).then((data)=>{
            if(!data){
                return;
            }
            if(data.status == 0){
                let alert: any = Message;
                alert.success("删除成功!");
                this.setDeleteCompanyId(null);
                this.getCompanyList();
            }
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Mutation
    private setDeleteCompanyId(data: any){
        this.deleteCompanyId  = data;
    }
}
