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
    public checkeds: Array<any>;

    public peoples: any;
    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;
    public inPageIndex: number;
    public inPageSize: number;
    public inPageTotal:number;

    public userName:string;
    public card:string;
    public phone:number;
    public type:Array<any>;
    public project:string;
    public projectId:string;
    public unit:string;
    public unitId:number;
    public animal:string;
    public startTime:Date;
    public endTime:Date;
    public photo:string;
    public updatePhoto:string;
    public idCardfront:string;
    public idCardReverse:string;
    public certificate:string;
    public grade:string;
    public archivesId:number;


	public year:any;
    public selectSex:number;
    public selectAge1:number;
    public selectAge2:number;
    public selectProjectName:string;
    public selectContractors:string;
    public selectUserName:string;
    public selectType:string;
    public selectStatus:number;


    public infoId:number;
    public infoIdNumber:number;
    public involvedProjectInfo:Array<InvolvedProjectInfo>;
    public peopleInfo:PeopleInfo;
    public salaryInfo:any;
    public commentInfo:any;
    public projectList:Array<ProjectList>;
    public cultivateList:Array<any>;
    public projectType: Array<ProjectType>;
    public unitList:Array<UnitList>;

    public check : Array<any>;
    public insertList : Array<any>;
    public peopleInList:Array<any>;
    public peopleInfoList:Array<any>;
    public checkWorkceMonth : any;
    public checkWorkce : number;
    public onLeave:number;
    public conditionList:Array<any>;
    public notIn:boolean;
    public in:boolean;
    public pageInIndex: number;
    public pageInSize: number;
    public pageInTotal:number;
    public insertEafId:string;
    public workType:string;

    public date :Date;

	public userId:String;
    public roleName:Roles;
    constructor(e) {
        super(e)
        this.pageIndex=1;
        this.pageSize= 10;
        this.pageTotal = -1;
        this.date = new Date();
        this.pageInIndex=1;
        this.pageInSize= 10;
        this.pageInTotal = 0;

        this.inPageIndex=1;
        this.inPageSize= 1;
        this.inPageTotal = 0;
        this.check = [];
        this.onLeave = null;
        this.insertEafId = null;
        this.notIn= false;
        this.in= false;

        this.peoples = [];
        this.peopleInList = [];
        this.peopleInfoList = [];
        this.projectType = [];
        this.conditionList = [];
        this.cultivateList = [];
        this.insertList = [];
        this.salaryInfo = {};
        this.commentInfo = {};
        this.card = "";
        this.phone = null;
        this.type = [];
        this.userName = "";
        this.animal = "2";
        this.infoId=null;
        this.infoIdNumber=null;
        this.projectId = "";
        this.unitId = null;
        this.unit = null;
        this.project = "";
        this.archivesId = null;
        this.workType = "";
        this.checkeds = [];
        this.startTime = null;
        this.endTime = null;
        this.photo = "";
        this.updatePhoto = "";
        this.idCardfront="";
        this.idCardReverse="";
        this.certificate="";
        this.grade = "";
        this.involvedProjectInfo = [];
        this.peopleInfo={};
        this.checkWorkceMonth={};
        this.checkWorkce=null;
        this.projectList=[];
        this.unitList = [];
		this.year = new Date().getFullYear();
        this.selectSex = null;
        this.selectAge1 = null;
        this.selectAge2 = null;
        this.selectProjectName="";
        this.selectContractors="";
        this.selectUserName="";
        this.selectType="";
        this.selectStatus=null;
		this.userId='';
        this.roleName = {};
    }
    @Action
    public getParams() : any {
        if(this.selectProjectName){
            let item ={};
            item["name"]="project_name";
            item["value"]=this.selectProjectName;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectContractors){
            let item ={};
            item["name"]="unit_name";
            item["value"]=this.selectContractors;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectUserName){
            let item ={};
            item["name"]="eafName";
            item["value"]=this.selectUserName;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectType){
            let item ={};
            item["name"]="workType";
            item["value"]=this.selectType;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectStatus != undefined && this.selectStatus > -1
            && this.selectStatus != null){
            let item ={};
            item["name"]="leave";
            item["value"]=this.selectStatus;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
		if(this.selectSex){
            let item ={};
            item["name"]="sex";
            item["value"]=this.selectSex;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectAge1){;
            let item ={};
            item["name"]="year";
            item["value"]=this.year - this.selectAge1;
            item["algorithm"] = "GTEQ"
            this.conditionList.push(item);
        }
        if(this.selectAge2){
            let item ={};
            item["name"]="year";
            item["value"]=this.year - this.selectAge2;
            item["algorithm"] = "LTEQ"
            this.conditionList.push(item);
        }
        return {

            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": this.conditionList,

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []
        };
    }
    @Action
    public getUpdateParams() : any {
        return  {
            "data": {
                "leave": this.onLeave
            },
            "conditionList": [{
                "name": "id",
                "value":  this.check,
                "algorithm": "IN"
            }
            ],

            "keywords" : []
        };
    }
    @Action
    public getUploadParams() : any {
        return {
            "conditionList": [{
                "name": "eafId",
                "value":  this.check,
                "algorithm": "IN"
            }],


            "keywords" : [],
            "selectList": [
                {"field": "eafName","alias":"姓名" },
                {"field": "eafPhone" ,"alias":"手机"},
                {"field": "cwrIdnum","alias":"身份证" },
                {"field": "workType","alias":"工种" }
            ]
        };
    }
    @Action
    public getInParams() : any {
        return {
            "pageInfo" : {
                "pageIndex": this.inPageIndex,
                "pageSize": this.inPageSize
            },

            "conditionList": [{
                "name": "archives_id",
                "value": this.infoId,
                "algorithm": "EQ"
            }
            ],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []

        }
    }
    @Action
    public async update() {
        await request.post('/api/workerlib/archives/update',await this.getUpdateParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdate(data);
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
    public async upload() {
        let url = '/api/workerlib/people/export';
        if(this.in==true){
            url='/api/workerlib/project_allpeople_in/export';
        }
        if(this.notIn==true){
            url='/api/workerlib/project_allpeople_not/export';
        }
        await request.post(url,await this.getUploadParams(),{responseType: 'blob', params: '人员档案'}).then((data)=>{
            if(!data){
                return;
            }
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
    public async synchronization() {
        await request.post('api/sync/archives').then((data)=>{
            if(!data){
                return;
            }
            this.sucessSynchronization(data);
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
    public async searchPeoplesIn() {
        await request.post('api/workerlib/project_allpeople_in',{
            "groupList" : [ //分组条件
                "workType"
            ],
            "selectList": [{ //显示字段
                "field": "workType",
                "alias":"total",
                "function": "COUNT"
            },{
                "field": "workType",
                "alias":"workType"
            },{
                "field": "eafName",
                "alias":"eafName"
            },{
                "field": "cwrIdnum",
                "alias":"cwrIdnum"
            }
            ],
            "sortList": [{ //排序条件
                "name": "total", //字段名
                "desc": true  //true为降序，false为升序
            }],
        }).then((data)=>{
            if(!data){
                return;
            }

            this.sucessSearchPeoplesIn(data);
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
    public async searchPeoplesInfo() {
        await request.post('api/workerlib/project_allpeople_in',{
            "conditionList": [{ //查询条件
                "name": "workType",   //字段名
                "value": this.workType,   //值
                "algorithm": "EQ",   //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12), NOTIN(13)
            }],
            "selectList": [{
                "field": "workType",
                "alias":"workType"
            },{
                "field": "eafName",
                "alias":"eafName"
            },{
                "field": "cwrIdnum",
                "alias":"cwrIdnum"
            }
            ]
        }).then((data)=>{
            if(!data){
                return;
            }

            this.sucessSearchPeoplesInfo(data);
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
    public async search() {
        let url = '/api/workerlib/people';
        if(this.in==true){
            url='/api/workerlib/project_allpeople_in';
        }
        if(this.notIn==true){
            url='/api/workerlib/project_allpeople_not';
        }
        await request.post(url,await this.getParams()).then((data)=>{
            if(!data) {
                return;
            }
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
    public async searchIn() {
        await request.post('/api/workerlib/project_allpeople_in',{
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList":[],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((data)=>{
            if(!data) {
                return;
            }
            this.success(data);
            this.countpIn();
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
    public async searchNot() {
        await request.post('/api/workerlib/project_allpeople_not',{
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList":[],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((data)=>{
            if(!data) {
                return;
            }
            this.success(data);
            this.countNot();
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
    public async searchInfo() {
        await request.post('/api/workerlib/people_rate',{
            "pageInfo" : {},

            "conditionList": [{
                "name": "eafId",
                "value": this.infoId,
                "algorithm": "EQ"
            }
            ],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successInfo(data);
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
    public async selectComments() {
        await request.post('/api/workerlib/comments',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "eafId",
                "value": this.infoId,
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
            this.successCommentInfo(data);
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
    public async selectSalary() {
        await request.post('/api/workerlib/salary',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "id_number",
                "value": this.infoIdNumber,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                { //显示字段
                    "field": "pay",  //字段名
                    "alias":"pay",
                    "function": "SUM"
                },
                { //显示字段
                    "field": "income",  //字段名
                    "alias":"income",
                    "function": "SUM"
                }
            ]

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successSalaryInfo(data);
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
    public async searchInvolvedProject() {
        await request.post('/api/workerlib/project_alluser',await this.getInParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successInvolvedProject(data);
            this.countIn();
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
    public async selectProject() {
        await request.post('/api/workerlib/project',{
            "pageInfo" : {},

            "conditionList": [],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successProjectList(data);
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
    //参与培训
    @Action
    public async selectCultivate(){
        await request.post('/api/workerlib/detailscourseware',{

            "pageInfo" : {},
            "conditionList": [{
                "name": "archives_id",
                "value": this.infoId,
                "algorithm": "EQ"
            } ],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successAllCultivate(data);

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
    public async selectAllCultivate(){
        await request.post('/api/workerlib/allcourseware',{
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
            this.successCultivate(data);
            this.selectCultivate();
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
        let url = '/api/workerlib/people/count';
        if(this.in==true){
            url='/api/workerlib/project_allpeople_in/count';
        }
        if(this.notIn==true){
            url='/api/workerlib/project_allpeople_not/count';
        }
        await request.post(url, await this.getParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countpIn() {
        await request.post('/api/workerlib/project_allpeople_in/count',{
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList":[],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countNot() {
        await request.post('/api/workerlib/project_allpeople_not/count',{
            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList":[],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countIn() {
        await request.post('/api/workerlib/project_alluser/count', await this.getInParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setInPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
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
    @Action
    public async selectUnit() {
        await request.post('/api/workerlib/unit',{
            "pageInfo" : {},

            "conditionList": [{
                "name": "project_id",
                "value": this.projectId,
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
            this.successUnitList(data);
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
    public async insertArchives() {
        await request.put('/api/workerlib/alluser', {
            "eafName":this.userName,
            "eafPhone":this.phone,
            "cwrIdnum":this.card,
            "cwrPhoto":this.photo,
            "id_card_front":this.idCardfront,
            "id_card_reverse":this.idCardReverse,
            "unit_id":"E1518A607E764390848F188390482597"
        }).then((data)=>{
            if(!data){
                return;
            }
            this.searchEafId();
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
    public async selectUser() {
        await request.post('/api/workerlib/user', {
            "conditionList": [{
                "name": "username",
                "value": this.card,
                "algorithm": "EQ"
            } ],
        }).then((data)=>{
            if(!data){
                return;
            }
            this.searchEafId();
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
    public async insertWorkType(id) {
        if(this.type.length>0){
            for(let i=0;i<this.type.length;i++){
                let item = {};
                item["eafId"] = id;
                item["workType"] = this.type[i];
                item["certificate"] = this.certificate;
                this.insertList.push(item);
            }
        }
        await request.put('/api/workerlib/worktype', this.insertList).then((data)=>{
            if(!data){
                return;
            }
            this.successInsertWorkType(data);

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
    public async searchEafId() {
        await request.post('/api/workerlib/alluser',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "cwrIdnum",
                "value": this.card,
                "algorithm": "EQ"
            } ],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.insertWorkType(data.data[0].eafId);

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
    public async insertUserGroupRole(id) {
        await request.put('/api/workerlib/usergrouprole', {
            "userGroupRoleId":null,
            "userId":id,
            "roleId":"703d28f4a8134a9b87fb971d0e31f9e5"
        }).then((data)=>{
            if(!data){
                return;
            }
            this.addUserGroupRole(data);
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
    public async selectCheckWorkceMonth() {
        await request.post('/api/workerlib/user_salary', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "cwrUserid",
                "value": this.infoId,
                "algorithm": "EQ"
            },{
                "name": "month",
                "value": new Date().getMonth()+1,
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
            this.sucessCheckWorkceMonth(data)
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
    public async selectCheckWorkce() {
        await request.post('/api/workerlib/checkworkce/count', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "cwrUserid",
                "value": this.infoId,
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
            this.sucessCheckWorkce(data)
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
    public async inupdate() {
        await request.post('/api/import/userUpdate', {
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
    public async updateHead() {

        await request.post('/api/workerlib/alluser/update',{
            "data": {
                "photo": this.updatePhoto
            },
            "conditionList": [{
                "name": "eafId",
                "value":  this.infoId,
                "algorithm": "IN"
            }
            ],
            "keywords" : []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateHead(data);
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
    public addUserGroupRole(data: any){
        if(data.status == 0) {
            this.search();
        }
     }
    @Mutation
    public successInsertWorkType(data: any){
        if(data.status == 0) {
            this.insertEafId = null;
            this.insertList = new Array<any>();
            let alert: any = Message;
            alert.success('成功！');
        }
    }
    @Mutation
    public sucessSearchPeoplesIn(data: any){
        if(data.status == 0) {
           this.peopleInList = data.data;
        }
    }
    @Mutation
    public sucessSearchPeoplesInfo(data: any){
        if(data.status == 0) {
           this.peopleInfoList = data.data;
        }
    }
    @Action
    private sucessSynchronization(data: any) {
        if(data.status == 0){
            this.search();
            let alert: any = Message;
            alert.success(data.message);
        }
    }
    @Action
    public successUpdate(data: any) {
        let alert: any = Message;
        if(data.status == 0) {
            this.checkeds = new Array<any>();
            this.search();
            alert.success("成功！");

        }
    }
    @Action
    public successUpdateHead(data: any) {
        let alert: any = Message;
        if(data.status == 0) {
            this.search();
            alert.success("成功！");

        }
    }
    @Mutation
    private sucessCheckWorkceMonth(data: any) {
        this.checkWorkceMonth = data.data;
    }
    @Mutation
    private sucessCheckWorkce(data: any) {
        this.checkWorkce = data.data;
    }
    @Mutation
    public setPageInTotal(data: number) {
        this.pageInTotal = data;
    }
    @Mutation
    public setPageInSize(data: number) {
        this.pageInSize = data;
    }
    @Mutation
    public setPageInIndex(data: number) {
        this.pageInIndex = data;
    }
    @Mutation
    private setCheck(data: any) {
        this.check = data;
    }
    @Mutation
    private successUpload() {
        this.check = new Array<any>();
    }
    @Mutation
    private setOnLeave(data: number) {
        this.onLeave = data;
    }
    @Mutation
    private success(data: any) {
        this.peoples = data.data;
        if(!this.peoples) {
            return;
        }
    }
    @Mutation
    private successInvolvedProject(data: any) {
        this.involvedProjectInfo = data.data;
    }
    @Mutation
    private successInfo(data: any) {
        this.peopleInfo = data.data[0];
    }
    @Mutation
    private successCommentInfo(data: any) {
        this.commentInfo = data.data[0];
    }
    @Mutation
    private successSalaryInfo(data: any) {
        this.salaryInfo = data.data[0];
    }
    @Mutation
    private setChecked(data: any) {
        this.checkeds.push(data);
    }
    @Mutation
    private clear() {
        this.checkeds = new Array<any>();
    }
    @Mutation
    private successProjectList(data: any) {
        this.projectList = data.data;
    }
    @Mutation
    private setWorkType(data: any) {
        this.workType = data;
    }
    @Mutation
    private successCultivate(data: any) {
        this.cultivateList = data.data;
    }
    @Mutation
    private successAllCultivate(data: any) {
        if(this.cultivateList){
            for(let i=0;i<data.data.length;i++){
                if(this.cultivateList.filter(a => a.cultivate_id == data.data[i].cultivate_id).length>0){
                    continue;
                }else {
                    this.cultivateList.push(data.data[i]);
                }
            }
        }else {
            this.cultivateList.push(data.data);
        }
    }
    @Mutation
    private clearAllCultivate(data: any) {
        this.cultivateList=new Array<any>();
    }
    @Mutation
    private successUnitList(data: any) {
        this.unitList = data.data;
    }
    @Mutation
    public setArchivesId(data: number) {
        this.archivesId = data;
    }
    @Mutation
    public setPhoto(data: string) {
        this.photo = data;
    }
    @Mutation
    public setUpdatePhoto(data: string) {
        this.updatePhoto = data;
    }
    @Mutation
    public setIdCardfront(data: string) {
        this.idCardfront = data;
    }
    @Mutation
    public setIdCardReverse(data: string) {
        this.idCardReverse = data;
    }
    @Mutation
    public setCertificate(data: string) {
        this.certificate = data;
    }
    @Mutation
    public setGrade(data: string) {
        this.grade = data;
    }
    @Mutation
    public setStartTime(data: Date) {
        this.startTime = data;
    }
    @Mutation
    public setEndTime(data: Date) {
        this.endTime = data;
    }
    @Mutation
    public setInfoId(data: number) {
        this.infoId = data;
    }
    @Mutation
    public setInfoIdNumber(data: number) {
        this.infoIdNumber = data;
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
    public setSelectSex(data:number){
        this.selectSex = data;
    }
    @Mutation
    public setSelectAge1(data:any){
        this.selectAge1 = data;
    }
    @Mutation
    public setSelectAge2(data:any){
        this.selectAge2 = data;
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
    public setType(data:any) {
        this.type=[];
        for(let i=0;i<data.length;i++){
            this.type.push(data[i]);
        }
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
    public setProjectId(data:string){
        this.projectId = data;
    }
    @Mutation
    public setUnitId(data:number){

        this.unitId = data;
    }
    @Mutation
    public setNotIn(data:boolean){
        this.notIn = data;
    }
    @Mutation
    public setIn(data:boolean){
        this.in = data;
    }
    @Mutation
    public setAnimal(data:string){
        this.animal = data;
    }
    @Mutation
    public setPageTotal(data: number) {
        this.conditionList = new Array<any>()
        this.pageTotal = data;
    }
    @Mutation
    public setInPageTotal(data: number) {
        this.inPageTotal = data;
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
    public setInPageIndex(data: number) {
        this.inPageIndex = data;
    }
    @Mutation
    public setInPageSize(data: number) {
        this.inPageSize = data;
    }
    public columns = [
        {
            title: '工种',
            key: 'workType',
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.workType
                        }
                    }, params.row.workType)
                ])
            }
        },
        {
            title: '人数',
            key: 'total'
        },

        {
            title: '操作',
            slot: 'operation'
        }
    ];
    public columnsInfo = [
        {
            title: '姓名',
            key: 'eafName',
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.eafName
                        }
                    }, params.row.eafName)
                ])
            }
        },
        {
            title: '身份证号',
            key: 'cwrIdnum'
        }
    ];
}
interface ProjectType {
    value?: string;
    name?: string;
}
interface PeopleInfo {
    id?:number;
    name?:string;
    phone?:string;
    id_number?:string;
    work_type?:string;
    leave?:number;
    leader?:number;
    grade?:string;
}
interface ProjectList {
    id?:number;
    project_name?:string;
}
interface UnitList {
    id?:number;
    project_license?:string;
}
interface InvolvedProjectInfo {
    project_name?:string;
    start_time?:Date;
    end_time?:Date;
    project_license?:string;
}

interface UserGroupRole {
    userGroupRoleId?:string;
    userId?:number;
    groupId?:string;
    roleId?:string;
    userPath?:string;
    modifyBy?:number;
    modifyTime?:number;
    createOn?:Date;
    createBy?:number;
}


interface Roles {
    roleId?:string;
    roleName?:string;
    description?:string;
    userPath?:string;
    modifyTime?:Date;
    modifyBy?:number;
    createOn?:Date;
    createBy?:number;
}
