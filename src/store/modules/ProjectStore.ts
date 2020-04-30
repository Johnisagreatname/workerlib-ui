import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

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

    private insertPid: string;
    private insertUnitName: string;
    private insertProjectLicense: string;
    private insertUnitType: number;
    private insertPrincipal: string;
    private insertAddress: string;
    constructor(e) {
        super(e);
        this.companyList = [];
        this.subCompanyList = [];
        this.pullDown = false;
        this.selectProjectName = null;
        this.projectParticulars = {};
        this.companyProjectList = [];
        this.unitTypeList = [];
        this.insertPid = null;
        this.insertUnitName = null;
        this.insertProjectLicense = null;
        this.insertUnitType = null;
        this.insertPrincipal = null;
        this.insertAddress = null;
    }
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

    @Mutation
    private setPullDown(data : any){
        this.pullDown = data;
    }
    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }
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
    // set
    @Mutation
    private setSelectProjectName(data : any){
        this.selectProjectName = data;
    }
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


    @Mutation
    private setInsertPid(data : any){
        this.insertPid = data;
    }
    @Mutation
    private setInsertUnitName(data : any){
        this.insertUnitName = data;
    }
    @Mutation
    private setInsertProjectLicense(data : any){
        this.insertProjectLicense = data;
    }
    @Mutation
    private setInsertUnitType(data : any){
        this.insertUnitType = data;
    }
    @Mutation
    private setInsertPrincipal(data : any){
        this.insertPrincipal = data;
    }
    @Mutation
    private setInsertAddress(data : any){
        this.insertAddress = data;
    }
}
