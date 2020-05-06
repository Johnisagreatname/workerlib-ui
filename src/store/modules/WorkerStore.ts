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
    private selectParentName : string;
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
    private insertUserName: string;
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


    public infoId:number;
    public infoIdNumber:number;

    public inPageIndex: number;
    public inPageSize: number;
    public inPageTotal:number;

    //人员详情
    public peopleInfo : any;
    public involvedProjectInfo : Array<any>;
    public cultivateList : Array<any>;
    public checkWorkceMonth : any;
    public commentInfo : any;
    public checkWorkce : number;
    public salaryInfo : any;
    public updatePhoto:string;

    private userInfo:any; //人员列表

    private uploadIdList: Array<any>;
    private evaluateList: Array<any>;

    //统计工种
    private statisticalWorkList: Array<any>;
    private statisticalWorkInfoList: Array<any>;
    private selectStatisticalWorkType: string;
    private selectWorkTypeInfo: string;
    //筛重
    private repeatPersonnelList: Array<any>;



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
        this.selectParentName = null;
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
        this.insertUserName = null;
        this.insertUnitId = null;
        this.insertProjectId = null;
        this.insertTemId = null;
        this.insertWorkType = null;
        this.insertTeamGroupLeader = null;
        this.insertLeave = 1;
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

        this.infoId = null;
        this.infoIdNumber = null;
        this.inPageIndex = null;
        this.inPageSize = null;
        this.inPageTotal = null;
        this.peopleInfo = {};
        this.involvedProjectInfo = [];
        this.checkWorkceMonth = {};
        this.cultivateList = [];
        this.commentInfo = {};
        this.checkWorkce = null;
        this.salaryInfo = {};
        this.updatePhoto = null;

        this.userInfo = {};
        this.uploadIdList = [];
        this.statisticalWorkList = [];
        this.statisticalWorkInfoList = [];
        this.selectStatisticalWorkType = null;
        this.selectWorkTypeInfo = null;
        this.repeatPersonnelList = [];
        this.evaluateList = [];
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
            MessageUtils.warning(e);
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
            MessageUtils.warning(e);
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
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private successWorkTypeList(data){
        this.workTypeList = data.data;
    }

    // 人员列表
    @Action
    public getUserListParams() : any{

        if(this.selectParentName){
            let item ={};
            item["name"]="parentName";
            item["value"]=this.selectParentName;
            item["algorithm"] = "Like"
            this.userConditionList.push(item);
        }
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
            item["name"]="leave";
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
            item["value"]=this.selectEafUserStatus-1;
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
            MessageUtils.warning(e);
        });
    }
    @Action
    public async searchUserListCount() {
        await request.post('/api/workerlib/projectuser/count',await this.getUserListParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setUserPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public getUserInfoParams() : any{
        let userInfoList:Array<any>=[];
        if(this.selectUserId){
            let item ={};
            item["name"]="userId";
            item["value"]=this.selectUserId;
            item["algorithm"] = "EQ"
            userInfoList.push(item);
        }
        return {
            "pageInfo" : {},
            "conditionList": userInfoList,
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }

    }
    //人员详情
    @Action
    public async searchUserInfo(){
        await request.post('/api/workerlib/projectuser',await this.getUserInfoParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successUserInfo(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    //综合评价与不良记录
    @Action
    public async getEvaluateList(){
        await request.post('/api/workerlib/evaluate',await this.getUserInfoParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successEvaluateList(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    // 回调
    @Mutation
    private successUserList(data){
        this.userList = data.data;

    }
    @Mutation
    private successUserInfo(data){
        this.userInfo = data.data[0];

    }
    @Mutation
    private successEvaluateList(data){
        this.evaluateList = data.data;

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
            title: '所属项目',
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
            title: '所属单位',
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
            title: '所属上级公司',
            key: 'parentName',
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
                            title: params.row.parentName
                        }
                    }, params.row.parentName)
                ])
            }
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
    public evaluateListColumns = [
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
            title: '所属项目',
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
            title: '进场时间',
            key: 'cwrUserIn'
        },
        {
            title: '是否有不良记录',
            slot: 'badRecord'
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
            title: '状态',
            key: 'leave'
        },{
            title: '离场时间',
            key: 'cwrUserOut'
        },
        {
            title: '项目评分',
            slot: 'projectGrade'
        },{
            title: '备注',
            slot: 'description'
        }
    ];
    // set
    @Mutation
    private setSelectParentName(data : any){
        this.selectParentName = data;
    }
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
        this.userConditionList = new Array<any>();
    }
    @Mutation
    private setPullDown(data : any){
        this.pullDown = data;
    }
    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }

    // 新增人员`
    @Action
    public async insertUser(){
        await request.put('/api/workerlib/archives', {
            "archives_id": null,
            "name": this.insertUserName,
            "unit_id": this.insertUnitId,
            "project_id": this.insertProjectId,
            "work_type": this.insertWorkType,
            "cwrUserIn": this.insertStartTime.getFullYear() + "-" + (this.insertStartTime.getMonth()+1) + "-" + this.insertStartTime.getDate(),
            "cwrUserOut": this.insertEndTime.getFullYear() + "-" + (this.insertEndTime.getMonth()+1) + "-" + this.insertEndTime.getDate(),
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
            MessageUtils.warning(e);
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
    private setInsertUserName(data : any){
        this.insertUserName = data;
    }
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
            MessageUtils.warning(e);
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
        await request.post('/api/workerlib/archives/update',{
            "data": {
                "id_card_front": this.amendIdCardFront
            },
            "conditionList": [{ //查询条件
                "name": "archives_id",   //字段名
                "value": this.selectUserId,   //值
                "algorithm": "EQ" //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12), NOTIN(13)
            }],
            "keywords" : []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateIdCardFront(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
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
        await request.post('/api/workerlib/archives/update',{
            "data": {
                "id_card_reverse": this.amendIdCardReverse
            },
            "conditionList": [{ //查询条件
                "name": "archives_id",   //字段名
                "value": this.selectUserId,   //值
                "algorithm": "EQ" //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12), NOTIN(13)
            }],
            "keywords" : []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateIdCardReverse(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
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
        await request.post('/api/workerlib/archives/update',{
            "data": {
                "certificate": this.amendCertificate
            },
            "conditionList": [{ //查询条件
                "name": "archives_id",   //字段名
                "value": this.selectUserId,   //值
                "algorithm": "EQ" //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12), NOTIN(13)
            }],
            "keywords" : []


        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateCertificate(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
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
            MessageUtils.warning(e);
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
            MessageUtils.warning(e);
        });
    }
    // 回调
    @Mutation
    private successUserTrainingRecord(data : any){
        if(data.status == 0) {
            this.userTrainingRecordList = data.data;
        }
    }

    //人员详情
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
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []

        }
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
            MessageUtils.warning(e);
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
    public async selectCultivate(){
        await request.post('/api/workerlib/cultivate_archives',{

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
            MessageUtils.warning(e);
        });

    }
    @Action
    public async updateHead() {
        await request.post('/api/workerlib/archives/update',{
            "data": {
                "photo": this.updatePhoto
            },
            "conditionList": [{
                "name": "archives_id",
                "value":  this.infoId,
                "algorithm": "IN"
            }
            ],
            "keywords" : []

        }).then((data)=>{
            if(!data){
                return;
            }

        }).catch((e)=>{
            let alert: any = Message;
            MessageUtils.warning(e);
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
            MessageUtils.warning(e);
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
            MessageUtils.warning(e);
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
            MessageUtils.warning(e);
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
            MessageUtils.warning(e);
        });
    }
    //回调
    @Mutation
    private successInfo(data: any) {
        this.peopleInfo = data.data[0];
    }
    @Mutation
    private successInvolvedProject(data: any) {
        this.involvedProjectInfo = data.data;
    }
    @Mutation
    private sucessCheckWorkceMonth(data: any) {
        this.checkWorkceMonth = data.data;
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
    private sucessCheckWorkce(data: any) {
        this.checkWorkce = data.data;
    }
    @Mutation
    private successSalaryInfo(data: any) {
        this.salaryInfo = data.data[0];
    }
    //set
    @Mutation
    public setInPageTotal(data: number) {
        this.inPageTotal = data;
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
    private successCommentInfo(data: any) {
        this.commentInfo = data.data[0];
    }
    @Mutation
    public setInPageIndex(data: number) {
        this.inPageIndex = data;
    }
    @Mutation
    public setInPageSize(data: number) {
        this.inPageSize = data;
    }
    @Mutation
    public setUpdatePhoto(data: string) {
        this.updatePhoto = data;
    }
    //导出
    @Action
    public async uploadUser() {
        await request.post('/api/workerlib/projectuser/export',{
                "conditionList": [{
                    "name": "id",
                    "value":  this.uploadIdList.map(a => a.id),
                    "algorithm": "IN"
                }],
                "keywords" : [],
                "selectList": [
                    {"field": "userName","alias":"姓名" },
                    {"field": "unitName" ,"alias":"单位"},
                    {"field": "projectName","alias":"所在项目" },
                    {"field": "leave","alias":"状态" },
                    {"field": "workType","alias":"工种" },
                    {"field": "phone","alias":"电话" },
                    {"field": "sex","alias":"性别" },
                    {"field": "age","alias":"年龄" },
                    {"field": "birth","alias":"生日" },
                    {"field": "idNum","alias":"身份证号" },
                    {"field": "nativePlace","alias":"籍贯" }
                ]

        },{responseType: 'blob', params: '人员档案'}).then((data)=>{
            if(!data){
                return;
            }
            this.successUpload();
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private successUpload() {
        this.uploadIdList = new Array<any>();
    }
    @Mutation
    public setUploadIdList(data: any) {
        this.uploadIdList.push(data);
    }
    @Action
    public getStatisticalWorkParams() : any{
        let conditionList:Array<any>=[];
        if(this.selectStatisticalWorkType){
            let item ={};
            item["name"]="workType";
            item["value"]=this.selectStatisticalWorkType;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }

        return {
            "groupList" : [ //分组条件
                "workType"
            ],
            "conditionList": conditionList,
            "selectList": [{ //显示字段
                "field": "workType",
                "alias":"total",
                "function": "COUNT"
            },{
                "field": "workType",
                "alias":"workType"
            }],
            "sortList": [{ //排序条件
                "name": "total", //字段名
                "desc": true  //true为降序，false为升序
            }]
        }

    }
    //统计工种
    @Action
    public async statisticalWork() {
        await request.post('api/workerlib/projectuser',await this.getStatisticalWorkParams()).then((data)=>{
            if(!data){
                return;
            }

            this.sucessStatisticalWork(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async statisticalWorkInfo() {
        await request.post('api/workerlib/projectuser',{
            "conditionList": [{ //查询条件
                "name": "workType",   //字段名
                "value": this.selectWorkTypeInfo,   //值
                "algorithm": "EQ",   //条件: EQ(2, "="), GT(3, ">"), LT(4, "<"), GTEQ(5, ">="), LTEQ(6, "<="), NOT(7, "<>"), NOTEQ(8, "!="), LIKE(9), START(10), END(11), IN(12), NOTIN(13)
            }],
            "selectList": [
                {"field": "userName"},
                {"field": "projectName"},
                {"field": "unitName"},
                {"field": "workType"},
                {"field": "sex"},
                {"field": "phone"},
                {"field": "IdNum"}
            ]
        }).then((data)=>{
            if(!data){
                return;
            }

            this.sucessStatisticalWorkInfo(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    public setSelectStatisticalWorkType(data: any) {
        this.selectStatisticalWorkType = data;
    }
    @Mutation
    public setSelectWorkTypeInfo(data: any) {
        this.selectWorkTypeInfo = data;
    }
    @Mutation
    public sucessStatisticalWork(data: any) {
        this.statisticalWorkList = data.data;
    }
    @Mutation
    public sucessStatisticalWorkInfo(data: any) {
        this.statisticalWorkInfoList = data.data;
    }
    public statisticalWorkColumns = [
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

    public statisticalWorkInfoColumns = [
        {
            title: '姓名',
            key: 'userName'
        },
        {
            title: '所属项目',
            key: 'userName',
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
                            title: params.row.projectName
                        }
                    }, params.row.projectName)
                ])
            }
        },
        {
            title: '所属单位',
            key: 'unitName',
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
                            title: params.row.unitName
                        }
                    }, params.row.unitName)
                ])
            }
        },
        {
            title: '工种',
            key: 'workType'
        },
        {
            title: '性别',
            key: 'sex'
        },
        {
            title: '电话',
            key: 'phone'
        },
        {
            title: '身份证号',
            key: 'IdNum'
        }
    ];

    // 筛重
    @Action
    public async getRepeatPersonnelList(){
        await request.post('/api/workerlib/repeatpersonnel',{
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
            this.successRepeatPersonnelList(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Mutation
    public successRepeatPersonnelList(data: any) {
        this.repeatPersonnelList = data.data;
    }
    public repeatPersonnelListColumns = [
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
            title: '所属项目',
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
            title: '所属单位',
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
            title: '所属上级公司',
            key: 'parentName',
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
                            title: params.row.parentName
                        }
                    }, params.row.parentName)
                ])
            }
        },
        {
            title: '人员状态',
            key: 'leave'
        },{
            title: '手机',
            key: 'phone'
        }
    ];



}
