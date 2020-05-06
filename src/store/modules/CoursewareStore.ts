import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "CoursewareStore",
    store,
})
export default class CoursewareStore extends VuexModule {
    public checkeds: Array<any>;
    public checkAllGroup: Array<any>;
    public cultivateArchivesList:Array<any>;
    public addCultivateArchivesList:Array<any>;
    public peopleConditionList:Array<any>;
    public teacherList:Array<any>;
    public conditionList:Array<any>;


    public projectType: Array<ProjectType>;
    public courseWareInfo:Array<CourseWareInfo>;
    public courseWare:CourseWareInfo;
    public courseWareEdit:CourseWareInfo;
    public page:any;
    public cultivateArchives:Array<CultivateArchives>;
    public cultivate:Cultivate;

    public peoples: any;
    public message: string;

    public selectProjectName:string;
    public selectUserName:string;
    public selectLeave:number;
    public selectUnitId:string;

    public selectTitle:string;
    public selectTypeWork:string;
    public selectWhether:string;
    public selectCourse:string;
    public selectStatus:number;



    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;

    public pageInIndex: number;
    public pageInSize: number;
    public pageInTotal:number;

    public id:number;
    public cultivate_id:number;
    public in:boolean;

    private pullDown: boolean;

    constructor(e) {
        super(e);
        this.pullDown = false;

        this.in = false;
        this.checkeds =  new Array();
        this.checkAllGroup =  new Array();
        this.pageIndex=1;
        this.pageSize= 10;
        this.pageTotal = 0;

        this.pageInIndex=1;
        this.pageInSize= 8;
        this.pageInTotal = -1;

        this.cultivateArchivesList = [];
        this.addCultivateArchivesList = [];
        this.conditionList = [];

        this.peopleConditionList = [];
        this.page = {};
        this.peoples = [];
        this.courseWareEdit={};
        this.projectType = [];
        this.courseWareInfo = [];
        this.teacherList = [];
        this.cultivateArchives = [];
        this.cultivate ={};

        this.selectTitle = "";
        this.selectTypeWork = "";
        this.selectWhether = "";
        this.selectCourse = "";
        this.selectStatus = 1;
        this.id = null;
        this.cultivate_id = null;

        this.message = "";

        this.selectProjectName = "";
        this.selectUserName="";
        this.selectUnitId="";
        this.selectLeave=null;
        this.courseWare = {};
        this.courseWare.cover_picture = "";
        this.courseWare.video = "";
    }
    @Action
    public getParams() : any {
        if(this.selectTitle){
            let item ={};
            item["name"]="title";
            item["value"]=this.selectTitle;
            item["algorithm"] = "EQ"
            this.conditionList.push(item);
        }
        if(this.selectTypeWork){
            let item ={};
            item["name"]="type_work";
            item["value"]=this.selectTypeWork;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectStatus){
            let item ={};
            item["name"]="status";
            item["value"]=this.selectStatus;
            item["algorithm"] = "EQ"
            this.conditionList.push(item);
        }
        if(this.selectCourse){
            let item ={};
            item["name"]="course";
            item["value"]=this.selectCourse;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectWhether){
            let item ={};
            item["name"]="whether";
            item["value"]=this.selectWhether;
            item["algorithm"] = "LIKE"
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
    public getPeopleParams() : any {

        if(this.selectProjectName){
            let item ={};
            item["name"]="project_name";
            item["value"]=this.selectProjectName;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);
        }
        if(this.selectUserName){
            let item ={};
            item["name"]="eafName";
            item["value"]=this.selectUserName;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);
        }
        if(this.selectUnitId){
            let item ={};
            item["name"]="unitId";
            item["value"]=this.selectUnitId;
            item["algorithm"] = "EQ";
            let status = {};
            status["name"]="eafUserStatus";
            status["value"]=0;
            status["algorithm"] = "EQ";
            this.peopleConditionList.push(item);
            this.peopleConditionList.push(status);
            delete this.page.pageIndex;
            delete this.page.pageSize
        }else {
            this.page.pageIndex = this.pageInIndex;
            this.page.pageSize = this.pageInSize;

        }
        if(this.selectLeave != undefined && this.selectLeave > -1
            && this.selectLeave != null){
            let item ={};
            item["name"]="leave";
            item["value"]=this.selectLeave;
            item["algorithm"] = "LIKE";
            this.peopleConditionList.push(item);


        }

        return {
            "pageInfo" : this.page,
            "conditionList": this.peopleConditionList,

            "sortList": [ ],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        };
    }
    @Action
    public getUpdateParams() : any {
        return  {
            "data": {
                "title":this.courseWareEdit.title,
                "course":this.courseWareEdit.course,
                "pptPages":this.courseWare.pptPages,
                "total_hours":this.courseWareEdit.total_hours,
                "type_work":this.courseWareEdit.type_work,
                "video":this.courseWareEdit.video,
                "cover_picture":this.courseWareEdit.cover_picture,
                "describe":this.courseWareEdit.describe,
                "particulars":this.courseWareEdit.particulars
            },
            "conditionList": [{
                "name": "id",
                "value":  this.courseWareEdit.id ,
                "algorithm": "EQ"
            },{
                "name": "status",
                "value":  this.courseWare.status,
                "algorithm": "EQ"
            }
            ],

            "keywords" : []
        };
    }
    @Action
    public async search() {
        await request.post('/api/workerlib/courseware',await this.getParams()).then((data)=>{
            if(!data){
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
    public async count() {
        await request.post('/api/workerlib/courseware/count', await this.getParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countPeople() {
        await request.post('/api/workerlib/people/count', await this.getPeopleParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setInPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async searchInfo() {
        await request.post('/api/workerlib/courseware',{
            "pageInfo" : {
            },
            "conditionList": [{
                "name": "id",
                "value": this.courseWareEdit.id ,
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
    public async getProjectType(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": ["工种","课程类型"],
                "algorithm": "IN"
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
    public async getTeacherList(){
        await request.post('/api/workerlib/lecturer', {
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
            this.sucessTeacherList(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async insertCourseware() {
        await request.put('/api/workerlib/courseware', {
            "title":this.courseWare.title,
            "course":this.courseWare.course,
            "pptPages":this.courseWare.pptPages,
            "total_hours":this.courseWare.total_hours,
            "teaching_method":this.courseWare.teaching_method,
            "whether":this.courseWare.whether,
            "type_work":this.courseWare.type_work,
            "video":this.courseWare.video,
            "cover_picture":this.courseWare.cover_picture,
            "describe":this.courseWare.describe,
            "particulars":this.courseWare.particulars,
            "status":this.courseWare.status
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successAdd(data)
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
    public async insertCultivate() {
        await request.put('/api/workerlib/cultivate', {
            "course_id":this.cultivate.course_id,
            "course_name":this.cultivate.course_name,
            "startTime":this.cultivate.startTime ? this.cultivate.startTime.getFullYear() + "-" + (this.cultivate.startTime.getMonth()+1) + "-" + this.cultivate.startTime.getDate():null,
            "peoples":this.cultivate.peoples,
            "state":this.cultivate.state,
            "mark":this.cultivate.mark,
            "status":this.cultivate.status,
            "courseware_brief":this.cultivate.courseware_brief
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successAddCultivate(data)
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
    public async insertUpCultivate() {
        await request.put('/api/workerlib/cultivate', {
            "course_id":this.cultivate.course_id,
            "course_name":this.cultivate.course_name,
            "startTime":this.cultivate.startTime ? this.cultivate.startTime.getFullYear() + "-" + (this.cultivate.startTime.getMonth()+1) + "-" + this.cultivate.startTime.getDate():null,
            "peoples":this.cultivate.peoples,
            "state":this.cultivate.state,
            "mark":this.cultivate.mark,
            "courseware_brief":this.cultivate.courseware_brief,
            "status":this.cultivate.status,
            "trainingInstitution":this.cultivate.trainingInstitution,
            "teacher_id":this.cultivate.teacher_id,
            "trainingTeacher":this.cultivate.trainingTeacher,
            "trainingAddress":this.cultivate.trainingAddress
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpAddCultivate(data)
        }).catch((e)=>{
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
    public async insertCultivateArchives(id){
        for(var i = 0;i<this.cultivateArchivesList.length;i++){
            var itemTrue ={};
            itemTrue['archives_id'] = this.cultivateArchivesList[i].archives_id;
            itemTrue['cultivate_id'] = id;
            this.addCultivateArchivesList.push(itemTrue);
        }
        await request.put('/api/workerlib/cultivate_archives', this.addCultivateArchivesList).then((data)=>{
            if(!data){
                return;
            }
            this.successMessage(data);
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
    public async insertUpCultivateArchives(){
        for(var i = 0;i<this.cultivateArchivesList.length;i++){
            var itemTrue ={};
            itemTrue['archives_id'] = this.cultivateArchivesList[i].archives_id;
            // itemTrue['cultivate_id'] = id;
            this.addCultivateArchivesList.push(itemTrue);
        }
        await request.put('/api/workerlib/cultivate_archives', this.addCultivateArchivesList).then((data)=>{
            if(!data){
                return;
            }
            this.successMessage(data);
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
    public async messageSend(){
        await request.post('/api/message/send', {
            "message": this.message,
            "receiver": {
                "groupId": "",
                "roleId": "",
                "usernames": this.cultivateArchivesList.map(a => a.cwrIdnum)
            },
            "sendMode": "USER"   //发送方式: ALL(0, "ALL"), USER(1, "USER"), GROUP(2, "GROUP"), ROLE(3, "ROLE")
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successAddCultivateArchives(data);
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
    public async updateCourseware() {
        await request.post('/api/workerlib/courseware/update',await this.getUpdateParams()).then((data)=>{
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
    public async deleteCourseware() {
        await request.delete('/api/workerlib/courseware/'+this.id
        ).then((data)=>{
            if(!data){
                return;
            }
            this.successDelete(data);
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
    public async searchPeople() {
        await request.post('/api/workerlib/people',await this.getPeopleParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successPeople(data);
            this.countPeople();
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
    public async searchPeopleIn() {
        await request.post('/api/workerlib/project_allpeople_in',await this.getPeopleParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successPeople(data);
            this.countPeople();
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
    public successAdd(data: any) {
        if(data.status == 0) {
            this.search();
            let alert: any = Message;
            alert.success("新建课件成功！");
        }
    }
    @Action
    public successAddCultivate(data: any) {
        if(data.status == 0) {
            this.insertCultivateArchives(data.data);
        }
    }
    @Mutation
    public successUpAddCultivate(data: any) {
        this.cultivate ={
            id:null,
            course_name:null,
            course_id:null,
            startTime:null,
            peoples:null,
            state:null,
            mark:null,
            courseware_brief:null,
            trainingInstitution:null,
            trainingTeacher:null,
            trainingAddress:null,
            status:null
        }
        if(data.status == 0) {
            let alert: any = Message;
            alert.success("新建课程成功！");
        }
    }
    @Action
    public successUpdate(data: any) {
        let alert: any = Message;
        if(data.status == 0) {
            this.search();
            alert.success("成功！");
        }
    }
    @Action
    public successDelete(data: any) {
        let alert: any = Message;
        if(data.status == 0) {
            this.search();
            alert.success("成功！");
        }
    }
    @Action
    public successMessage(data: any) {
        if(data.status == 0) {
            this.messageSend();
        }
    }
    @Mutation
    public successAddCultivateArchives(data: any) {
        if(data.status == 0) {
            this.checkeds = new Array<any>();
            this.checkAllGroup = new Array<any>();
            this.cultivateArchivesList = new Array<any>();
            this.addCultivateArchivesList = new Array<any>();
            let alert: any = Message;
            alert.success("新建培训计划成功！");
        }

    }
    @Mutation
    public success(data: any) {
        this.courseWareInfo = data.data;
    }
    @Mutation
    public clearCourseWare(){
        this.courseWare = {
            title:null,
            course:null,
            total_hours:null,
            teaching_method:null,
            whether:null,
            type_work:null,
            video:null,
            cover_picture:null,
            describe:null,
            particulars:null,
            status:null

        };
    }
    @Mutation
    public successPeople(data: any) {
        this.peoples = data.data;
        this.message = "你有一条["+this.cultivate.course_name+"]培训待学习！";
    }
    @Mutation
    private successInfo(data: any) {
        this.courseWareEdit = data.data[0];
    }
    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }
    @Mutation
    public clear() {
        this.checkAllGroup = [];
    }


    public columns = [
        {
            type: 'selection',
            width: 50,
            align: 'center'
        },
        {
            title: '照片',
            slot: 'photo',
        },
        {
            title: '姓名',
            key: 'eafName',
            sortable: true
        },
        {
            title: '身份证',
            key: 'cwrIdnum',
            sortable: true,
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
                            title: params.row.cwrIdnum
                        }
                    }, params.row.cwrIdnum)
                ])
            }
        },
        {
            title: '操作',
            slot: 'operation'
        }
    ];

    //set
    @Mutation
    public setPageTotal(data: number) {
        this.pageTotal = data;
        this.conditionList = new Array<any>();
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
    private setChecked(data: any) {
        this.checkeds.push(data);
    }
    @Mutation
    private setCheckAllGroup(data: any) {
        this.checkAllGroup.push(data);
    }
    @Mutation
    public setInPageTotal(data: number) {
        this.peopleConditionList = [];
        this.pageInTotal = data;
    }
    @Mutation
    public setInPageSize(data: number) {
        this.pageInSize = data;
    }
    @Mutation
    public setInPageIndex(data: number) {
        this.pageInIndex = data;
    }
    @Mutation
    public setSelectStatus(data: number) {
        this.selectStatus = data;
    }
    @Mutation
    public setSelectTitle(data: string) {
        this.selectTitle = data;
    }
    @Mutation
    public setSelectTypeWork(data: string) {
        this.selectTypeWork = data;
    }
    @Mutation
    public setSelectWhether(data: string) {
        this.selectWhether = data;
    }
    @Mutation
    public setSelectCourse(data: string) {
        this.selectCourse = data;
    }
    @Mutation
    public setEditId(data:number){
        this.courseWareEdit.id = data;
    }
    @Mutation
    public setCourseWareEdit(data: any) {
        this.courseWareEdit = data;
    }
    @Mutation
    public setEditTitle(data:string){
        this.courseWareEdit.title = data;
    }
    @Mutation
    public setEditCourse(data:string){
        this.courseWareEdit.course = data;
    }
    @Mutation
    public setEditTotalHours(data:string){
        this.courseWareEdit.total_hours = data;
    }
    @Mutation
    public setEditTeachingMethod(data:string){
        this.courseWareEdit.teaching_method = data;
    }
    @Mutation
    public setEditWhether(data:string){
        this.courseWareEdit.whether = data;
    }
    @Mutation
    public sucessTeacherList(data:any){
        this.teacherList = data.data;
    }
    @Mutation
    public setEditTypeWork(data:any){
        this.courseWareEdit.type_work = data.join();
    }
    @Mutation
    public setEditVideo(data:string){
        this.courseWareEdit.video = data;
    }
    @Mutation
    public setEditCoverPicture(data:string){
        this.courseWareEdit.cover_picture = data;
    }
    @Mutation
    public setEditDescribe(data:string){
        this.courseWareEdit.describe = data;
    }
    @Mutation
    public setEditParticulars(data:string){
        this.courseWareEdit.particulars = data;
    }
    @Mutation
    public setEditStatus(data:number){
        this.courseWareEdit.status = data;
    }
    @Mutation
    public setSelectProjectName(data:string){
        this.selectProjectName = data;
    }
    @Mutation
    public setSelectUserName(data:string){
        this.selectUserName = data;
    }
    @Mutation
    public setSelectUnitId(data:string){
        this.selectUnitId = data;
    }
    @Mutation
    public setSelectLeave(data:number){
        this.selectLeave = data;
    }
    @Mutation
    public setTitle(data:string){
        this.courseWare.title = data;
    }
    @Mutation
    public setCourse(data:string){
        this.courseWare.course = data;
    }
    @Mutation
    public setTotalHours(data:string){
        this.courseWare.total_hours = data;
    }
    @Mutation
    public setTeachingMethod(data:string){
        this.courseWare.teaching_method = data;
    }
    @Mutation
    public setWhether(data:string){
        this.courseWare.whether = data;
    }
    @Mutation
    public setTypeWork(data:any){
        this.courseWare.type_work = data.join();
    }
    @Mutation
    public setVideo(data:string){
        this.courseWare.video = data;
    }
    @Mutation
    public setPPtPages(data:number){
        this.courseWare.pptPages = data;
    }
    @Mutation
    public setCoverPicture(data:string){
        this.courseWare.cover_picture = data;
    }
    @Mutation
    public setDescribe(data:string){
        this.courseWare.describe = data;
    }
    @Mutation
    public setParticulars(data:string){
        this.courseWare.particulars = data;
    }

    @Mutation
    public setStatus(data:number){
        this.courseWare.status = data;
    }

    @Mutation
    public setId(data:number){
        this.id = data;
    }

    @Mutation
    public setCultivateArchives(data:any){
        this.cultivateArchives = data;
    }
    @Mutation
    public setCourseId(data:number){
       this.cultivate.course_id = data;
    }

    @Mutation
    public setStartTime(data:Date){
        this.cultivate.startTime = data;
    }

    @Mutation
    public setPeoples(data:number){
        this.cultivate.peoples = data;
    }

    @Mutation
    public setState(data:string){
        this.cultivate.state = data;
    }

    @Mutation
    public setMark(data:string){
        this.cultivate.mark = data;
    }
    @Mutation
    public setCoursewareBrief(data:string){
        this.cultivate.courseware_brief = data;
    }
    @Mutation
    public setTrainingInstitution(data:string){
        this.cultivate.trainingInstitution = data;
    }
    @Mutation
    public setTrainingTeacher(data:string){
        this.cultivate.trainingTeacher = data;
    }
    @Mutation
    public setTeacherId(data:string){
        this.cultivate.teacher_id = data;
    }
    @Mutation
    public setTrainingAddress(data:string){
        this.cultivate.trainingAddress = data;
    }
    @Mutation
    public setIn(data:boolean){
        this.in = data;
    }
    @Mutation
    public setCStatus(data:number){
        this.cultivate.status = data;
    }
    @Mutation
    public setCourseName(data:string){
        this.cultivate.course_name = data;
    }
    @Mutation
    public setMessage(data:string){
        this.message = data;
    }
    @Mutation
    public setCultivateArchivesList(data:any){
        this.cultivateArchivesList.push(data);
    }

    @Mutation
    private setPullDown(data : any){
        this.pullDown = data;
    }
    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }

}


interface ProjectType {
    value?: string;
    name?: string;
}
interface CourseWareInfo {
    id?:number;
    title?:string;
    course?:string;
    total_hours?:string;
    pptPages?:number;
    teaching_method?:string;
    whether?:string;
    type_work?:string;
    video?:string;
    cover_picture?:string;
    describe?:string;
    particulars?:string;
    status?:number;
}
interface CultivateArchives {
    id?:number;
    cultivate_id?:string;
    archives_id?:string;
}
interface Cultivate {
    id?:number;
    course_name?:string;
    course_id?:number;
    startTime?:Date;
    peoples?:number;
    state?:string;
    mark?:string;
    courseware_brief?:string;
    trainingInstitution?:string;
    teacher_id?:string;
    trainingTeacher?:string;
    trainingAddress?:string;
    status?:number;
}
