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
    private projectList:Array<any>; //项目列表
    private unitList:Array<any>; //单位列表
    private workTypeList:Array<any>; //工种列表
    private userList:Array<any>; //人员列表
    private userSalaryList: Array<any>; //工资列表
    private userTrainingRecordList: Array<any>; //培训记录列表

    private userConditionList:Array<any>;
    private userSalaryConditionList:Array<any>;

    private id: number;

    private userPageSize : number;
    private userPageIndex : number;
    private userPageTotal : number;

    private selectProjectId : string;
    private selectUserId : string;
    private selectUserName : string;
    private selectUnitId: string;
    private selectSex: string;
    private selectWorkType: string;
    private selectStatus: string;
    private selectMinAge: number;
    private selectMaxAge: number;
    private selectEafUserStatus: number;

    private pullDown: boolean;

    private selectSalaryProjectId: string;
    private selectSalaryUserId: string;

    private selectTrainingRecordUserId :string;
    //新增人员
    private insertUnitId: string;
    private insertProjectId: string;
    private insertTemId: string;
    private insertWorkType: string;
    private insertTeamGroupLeader: number;
    private insertLeave: number;
    private insertStartTime: Date;
    private insertEndTime: Date;
    private insertPhone: number;
    private insertIdNum: string;
    private insertPhoto: string;
    private insertIdCardFront: string;
    private insertIdCardReverse: string;
    private insertServiceContract: string;
    private insertCertificate: string;


    private amendServiceContract: string;
    private amendIdCardFront: string;
    private amendIdCardReverse: string;
    private amendCertificate: string;


    constructor(e) {
        super(e)
        this.projectList = [];
        this.unitList = [];
        this.workTypeList = [];
        this.userList = [];
        this.userSalaryList = [];
        this.userTrainingRecordList = [];

        this.userConditionList = [];
        this.userSalaryConditionList = [];

        this.id  = null;

        this.userPageSize = 15;
        this.userPageIndex = 1;
        this.userPageTotal = 0;

        this.selectProjectId = null;
        this.selectUnitId = null;
        this.selectSex = null;
        this.selectWorkType = null;
        this.selectStatus = null;
        this.selectMinAge = null;
        this.selectMaxAge = null;
        this.selectUserName = null;
        this.selectUserId = null;
        this.selectEafUserStatus = null;

        this.pullDown = false;

        this.selectSalaryProjectId = null;
        this.selectSalaryUserId = null;

        this.selectTrainingRecordUserId = null;
        //新增人员
        this.insertUnitId = null;
        this.insertProjectId = null;
        this.insertTemId = null;
        this.insertWorkType = null;
        this.insertTeamGroupLeader = null;
        this.insertLeave = null;
        this.insertStartTime = null;
        this.insertEndTime = null;
        this.insertPhone = null;
        this.insertIdNum = null;
        this.insertPhoto = null;
        this.insertIdCardFront = null;
        this.insertIdCardReverse = null;
        this.insertServiceContract = null;
        this.insertCertificate = null;

        this.amendServiceContract = null;
        this.amendIdCardFront = null;
        this.amendIdCardReverse = null;
        this.amendCertificate = null;
    }
    // 项目列表
    @Action
    public getProjectListParams() : any {
        return {
            "pageInfo" : {},
            "conditionList":[],
            "sortList": [],
            "groupList" : ["project_id"],
            "keywords" : [],
            "selectList": [
                {"field": "project_id","alias":"projectId"},
                {"field": "project_name","alias":"projectName"}
            ]
        };
    }
    @Action
    public async searchProjectList() {
        await request.post('/api/workerlib/project',await this.getProjectListParams()).then((data)=>{
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
    @Mutation
    private successProjectList(data){
        this.projectList = data.data;
    }

    // 单位列表
    @Action
    public getUnitListParams() : any {
        return {
            "pageInfo" : {},
            "conditionList":[],
            "sortList": [],
            "groupList" : ["unit_id"],
            "keywords" : [],
            "selectList": [
                {"field": "unit_id","alias":"unitId"},
                {"field": "unit_name","alias":"unitName"}
            ]
        };
    }
    @Action
    public async searchUnitList() {
        await request.post('/api/workerlib/unit',await this.getUnitListParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successUnitList(data);
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
    private successUnitList(data){
        this.unitList = data.data;
    }

    // 工种列表
    @Action
    public getWorkTypeListParams() : any {
        return {
            "pageInfo" : {},
            "conditionList":[{
                "name" : "category",
                "value": "工种",
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                {"field": "name","alias":"workTypeName"},
                {"field": "value","alias":"workTypeValue"}
            ]
        };
    }
    @Action
    public async searchWorkTypeList() {
        await request.post('/api/workerlib/dictionaries',await this.getWorkTypeListParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successWorkTypeList(data);
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
    private successWorkTypeList(data){
        this.workTypeList = data.data;
    }

    // 人员列表
    @Action
    public getUserListParams() : any{

        if(this.selectProjectId){
            let item ={};
            item["name"]="projectId";
            item["value"]=this.selectProjectId;
            item["algorithm"] = "EQ"
            this.userConditionList.push(item);
        }
        if(this.selectUserName){
            let item ={};
            item["name"]="userName";
            item["value"]=this.selectUserName;
            item["algorithm"] = "LIKE"
            this.userConditionList.push(item);
        }
        if(this.selectUnitId){
            let item ={};
            item["name"]="unitId";
            item["value"]=this.selectUnitId;
            item["algorithm"] = "EQ"
            this.userConditionList.push(item);
        }
        if(this.selectSex){
            let item ={};
            item["name"]="sex";
            item["value"]=this.selectSex;
            item["algorithm"] = "EQ"
            this.userConditionList.push(item);
        }
        if(this.selectWorkType){
            let item ={};
            item["name"]="workType";
            item["value"]=this.selectWorkType;
            item["algorithm"] = "EQ"
            this.userConditionList.push(item);
        }
        if(this.selectStatus){
            let item ={};
            item["name"]="status";
            item["value"]=this.selectStatus;
            item["algorithm"] = "EQ"
            this.userConditionList.push(item);
        }
        if(this.selectMinAge){
            let item ={};
            item["name"]="age";
            item["value"]=this.selectMinAge;
            item["algorithm"] = "GTEQ"
            this.userConditionList.push(item);
        }
        if(this.selectMaxAge){
            let item ={};
            item["name"]="age";
            item["value"]=this.selectMaxAge;
            item["algorithm"] = "LTEQ"
            this.userConditionList.push(item);
        }
        if(this.selectEafUserStatus){
            let item ={};
            item["name"]="eafUserStatus";
            item["value"]=this.selectEafUserStatus;
            item["algorithm"] = "EQ"
            this.userConditionList.push(item);
        }
        if(this.selectUserId){
            let item ={};
            item["name"]="userId";
            item["value"]=this.selectUserId;
            item["algorithm"] = "EQ"
            this.userConditionList.push(item);
        }
        return {
            "pageInfo" : {
                "pageIndex": this.userPageIndex,
                "pageSize": this.userPageSize
            },
            "conditionList": this.userConditionList,
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }

    }
    @Action
    public async searchUserList(){
        await request.post('/api/workerlib/projectuser',await this.getUserListParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successUserList(data);
            this.searchUserListCount();
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
    public async searchUserListCount() {
        await request.post('/api/workerlib/project/count',await this.getProjectListParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setUserPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    // 回调
    @Mutation
    private successUserList(data){
        this.userList = data.data;
    }
    public userColumns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '序号',
            width: 100,
            slot: 'serialNumber'
        },
        {
            title: '姓名',
            key: 'userName'
        },
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
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                        },
                        domProps: {
                            title: params.row.workType
                        }
                    }, params.row.workType)
                ])
            }
        },
        {
            title: '项目',
            key: 'projectName',
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                        },
                        domProps: {
                            title: params.row.projectName
                        }
                    }, params.row.projectName)
                ])
            }
        },
        {
            title: '分包单位',
            key: 'unitName',
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                        },
                        domProps: {
                            title: params.row.unitName
                        }
                    }, params.row.unitName)
                ])
            }
        },
        {
            title: '所在单位',
            slot: 'company'
        },
        {
            title: '人员状态',
            key: 'leave'
        },{
            title: '手机',
            key: 'phone'
        },{
            title: '操作',
            slot: 'operation'
        }
    ];
    // set
    @Mutation
    private setSelectProjectId(data : any){
        this.selectProjectId = data;
    }
    @Mutation
    private setSelectUserName(data : any){
        this.selectUserName = data;
    }
    @Mutation
    private setSelectUnitId(data : any){
        this.selectUnitId = data;
    }
    @Mutation
    private setSelectSex(data : any){
        this.selectSex = data;
    }
    @Mutation
    private setSelectWorkType(data : any){
        this.selectWorkType = data;
    }
    @Mutation
    private setSelectStatus(data : any){
        this.selectStatus = data;
    }
    @Mutation
    private setSelectMinAge(data : any){
        this.selectMinAge = data;
    }
    @Mutation
    private setSelectMaxAge(data : any){
        this.selectMaxAge = data;
    }
    @Mutation
    private setSelectEafUserStatus(data : any){
        this.selectEafUserStatus = data;
    }
    @Mutation
    private setSelectUserId(data : any){
        this.selectUserId = data;
    }
    @Mutation
    private setUserPageSize(data : any){
        this.userPageSize = data;
    }
    @Mutation
    private setUserPageIndex(data : any){
        this.userPageIndex = data;
    }
    @Mutation
    private setUserPageTotal(data : any){
        this.userPageTotal = data;
    }
    @Mutation
    private setPullDown(data : any){
        this.pullDown = data;
    }
    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }

    // 新增人员
    @Action
    public async insertUser(){
        await request.put('/api/workerlib/archives', {
            "unit_id": this.insertUnitId,
            "project_id": this.insertProjectId,
            "team_id": this.insertTemId,
            "work_type": this.insertWorkType,
            "cwrUserIn": this.insertStartTime.getFullYear() + "-" + (this.insertStartTime.getMonth()+1) + "-" + this.insertStartTime.getDate(),
            "cwrUserOut": this.insertEndTime.getFullYear() + "-" + (this.insertEndTime.getMonth()+1) + "-" + this.insertEndTime.getDate(),
            "teamgroupleader": this.insertTeamGroupLeader,
            "leave": this.insertLeave,
            "phone": this.insertPhone,
            "id_number": this.insertIdNum,
            "photo": this.insertPhoto,
            "id_card_front": this.insertIdCardFront,
            "id_card_reverse": this.insertIdCardReverse,
            "serviceContract": this.insertServiceContract,
            "certificate": this.insertCertificate
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successInsertUser(data);
            this.searchUserList();
        }).catch((e)=>{
            let alert: any = Message;
            console.log(e)
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
    // 回调
    @Mutation
    private successInsertUser(data : any){
        if(data.status == 0) {

            this.insertUnitId = null;
            this.insertProjectId = null;
            this.insertTemId = null;
            this.insertWorkType = null;
            this.insertTeamGroupLeader = null;
            this.insertLeave = null;
            this.insertStartTime = null;
            this.insertEndTime = null;
            this.insertPhone = null;
            this.insertIdNum = null;
            this.insertPhoto = null;
            this.insertIdCardFront = null;
            this.insertIdCardReverse = null;
            this.insertServiceContract = null;
            this.insertCertificate = null;
            let alert: any = Message;
            alert.success('成功！');
        }
    }
    // set
    @Mutation
    private setInsertUnitId(data : any){
        this.insertUnitId = data;
    }
    @Mutation
    private setInsertProjectId(data : any){
        this.insertProjectId = data;
    }
    @Mutation
    private setInsertTemId(data : any){
        this.insertTemId = data;
    }
    @Mutation
    private setInsertWorkType(data : any){
        this.insertWorkType = data;
    }
    @Mutation
    private setInsertStartTime(data : any){
        this.insertStartTime = data;
    }
    @Mutation
    private setInsertEndTime(data : any){
        this.insertEndTime = data;
    }
    @Mutation
    private setInsertTeamGroupLeader(data : any){
        this.insertTeamGroupLeader = data;
    }
    @Mutation
    private setInsertLeave(data : any){
        this.insertLeave = data;
    }
    @Mutation
    private setInsertPhone(data : any){
        this.insertPhone = data;
    }
    @Mutation
    private setInsertIdNum(data : any){
        this.insertIdNum = data;
    }
    @Mutation
    private setInsertPhoto(data : any){
        this.insertPhoto = data;
    }
    @Mutation
    private setInsertIdCardFront(data : any){
        this.insertIdCardFront = data;
    }
    @Mutation
    private setInsertIdCardReverse(data : any){
        this.insertIdCardReverse = data;
    }
    @Mutation
    private setInsertServiceContract(data : any){
        this.insertServiceContract = data;
    }
    @Mutation
    private setInsertCertificate(data : any){
        this.insertCertificate = data;
    }



    // 修改合同
    @Action
    public async updateServiceContract(){
        await request.put('/api/workerlib/archives/'+this.id,{
            "serviceContract": this.amendServiceContract
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateServiceContract(data);
        }).catch((e)=>{
            let alert: any = Message;
            console.log(e)
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
    // 回调
    @Mutation
    private successUpdateServiceContract(data : any){
        if(data.status == 0) {
            this.amendServiceContract = null;   //置空
            let alert: any = Message;
            alert.success('上传合同成功！');
        }
    }
    // set
    @Mutation
    private setAmendServiceContract(data : any){
        this.amendServiceContract = data;
    }

    // 修改身份证正面
    @Action
    public async updateIdCardFront(){
        await request.put('/api/workerlib/archives/'+this.id,{
            "id_card_front": this.amendIdCardFront
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateIdCardFront(data);
        }).catch((e)=>{
            let alert: any = Message;
            console.log(e)
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
    // 回调
    @Mutation
    private successUpdateIdCardFront(data : any){
        if(data.status == 0) {
            this.amendIdCardFront = null;   //置空
            let alert: any = Message;
            alert.success('上传身份证正面成功！');
        }
    }
    // set
    @Mutation
    private setAmendIdCardFront(data : any){
        this.amendIdCardFront = data;
    }

    // 修改身份证反面
    @Action
    public async updateIdCardReverse(){
        await request.put('/api/workerlib/archives/'+this.id,{
            "id_card_reverse": this.amendIdCardReverse
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateIdCardReverse(data);
        }).catch((e)=>{
            let alert: any = Message;
            console.log(e)
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
    // 回调
    @Mutation
    public successUpdateIdCardReverse(data : any){
        if(data.status == 0) {
            this.amendIdCardReverse = null;   //置空
            let alert: any = Message;
            alert.success('上传身份证反面成功！');
        }
    }
    // set
    @Mutation
    private setAmendIdCardReverse(data : any){
        this.amendIdCardReverse = data;
    }

    // 修改证书反面
    @Action
    public async updateCertificate(){
        await request.put('/api/workerlib/archives/'+this.id,{
            "certificate": this.amendCertificate
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateCertificate(data);
        }).catch((e)=>{
            let alert: any = Message;
            console.log(e)
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
    // 回调
    @Mutation
    private successUpdateCertificate(data : any){
        if(data.status == 0) {
            this.amendCertificate = null;   //置空
            let alert: any = Message;
            alert.success('上传证书成功！');
        }
    }
    // set
    @Mutation
    private setAmendCertificate(data : any){
        this.amendCertificate = data;
    }

    //工人工资
    @Action
    public getUserSalaryParams() : any {
        if(this.selectSalaryProjectId){
            let item ={};
            item["name"]="projectId";
            item["value"]=this.selectSalaryProjectId;
            item["algorithm"] = "EQ"
            this.userSalaryConditionList.push(item);
        }
        if(this.selectSalaryUserId){
            let item ={};
            item["name"]="eafId";
            item["value"]=this.selectSalaryUserId;
            item["algorithm"] = "EQ"
            this.userSalaryConditionList.push(item);
        }
        return {
            "pageInfo" : {},
            "conditionList": this.userSalaryConditionList,
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }
    }
    @Action
    public async selectUserSalary(){
        await request.post('/api/workerlib/usersalary',await this.getUserSalaryParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successUserSalary(data);
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
    // 回调
    @Mutation
    private successUserSalary(data : any){
        if(data.status == 0) {
            this.userSalaryList = data.data;
            this.userSalaryConditionList = new Array<any>();   //置空
        }
    }

    //工人培训记录
    @Action
    public getUserTrainingRecordParams() : any {
        return {
            "pageInfo" : {},
            "conditionList": [{
                "name": "userId",
                "value": this.selectTrainingRecordUserId,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }
    }
    @Action
    public async selectUserTrainingRecord(){
        await request.post('/api/workerlib/usertrainingrecord',await this.getUserTrainingRecordParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successUserTrainingRecord(data);
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
    // 回调
    @Mutation
    private successUserTrainingRecord(data : any){
        if(data.status == 0) {
            this.userTrainingRecordList = data.data;
        }
    }

}
