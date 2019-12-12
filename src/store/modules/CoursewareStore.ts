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

    public projectType: Array<ProjectType>;
    public courseWareInfo:Array<CourseWareInfo>;
    public courseWare:CourseWareInfo;
    public courseWareEdit:CourseWareInfo;
    public cultivateArchives:Array<CultivateArchives>;
    public cultivate:Cultivate;

    public peoples: any;

    public selectProjectName:string;
    public selectUserName:string;
    public selectLeave:number;

    public selectTitle:string;
    public selectTypeWork:string;
    public selectStatus:number;



    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;

    public pageInIndex: number;
    public pageInSize: number;
    public pageInTotal:number;

    public id:number;


    constructor(e) {
        super(e)
        this.checkeds =  new Array();
        this.checkAllGroup =  new Array();
        this.pageIndex=1;
        this.pageSize= 10;
        this.pageTotal = 0;

        this.pageInIndex=1;
        this.pageInSize= 8;
        this.pageInTotal = 0;

        this.cultivateArchivesList = [];
        this.peoples = [];
        this.courseWareEdit={};
        this.projectType = [];
        this.courseWareInfo = [];
        this.cultivateArchives = [];
        this.cultivate ={};

        this.selectTitle = "";
        this.selectTypeWork = "";
        this.selectStatus = 1;
        this.id = null;

        this.selectProjectName = "";
        this.selectUserName="";
        this.selectLeave=null;

        this.courseWare = {};
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
                "name": "title",
                "value": this.selectTitle,
                "algorithm": "LIKE"
            },{
                "name": "type_work",
                "value": this.selectTypeWork,
                "algorithm": "LIKE"
            },{
                "name": "status",
                "value": this.selectStatus,
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
    public getPeopleParams() : any {
        debugger
        return {
            "pageInfo" : {
                "pageIndex": this.pageInIndex,
                "pageSize": this.pageInSize
            },
            "conditionList": [{
                "name": "project",
                "value": this.selectProjectName,
                "algorithm": "LIKE"
            },{
                "name": "name",
                "value": this.selectUserName,
                "algorithm": "LIKE"
            },{
                "name": "leave",
                "value": !this.selectLeave ? null : this.selectLeave,
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
    public getUpdateParams() : any {
        debugger
        return  {
            "data": {
                "title":this.courseWareEdit.title,
                "course":this.courseWareEdit.course,
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
        debugger
        await request.post('/api/workerlib/courseware',await this.getParams()).then((data)=>{
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
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countPeople() {
        await request.post('/api/workerlib/archives/count', await this.getPeopleParams()).then((total)=>{
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
                "value": ["工种","课程"],
                "algorithm": "IN"
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
    @Action
    public async insertCourseware() {
        debugger
        await request.put('/api/workerlib/courseware', {
            "title":this.courseWare.title,
            "course":this.courseWare.course,
            "total_hours":this.courseWare.total_hours,
            "teaching_method":"录播",
            "whether":"是",
            "type_work":this.courseWare.type_work,
            "video":this.courseWare.video,
            "cover_picture":this.courseWare.cover_picture,
            "describe":this.courseWare.describe,
            "particulars":this.courseWare.particulars,
            "status":this.courseWare.status
        }).then((data)=>{
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
        debugger
        await request.put('/api/workerlib/cultivate', {
            "course_id":this.cultivate.course_id,
            "course_name":this.cultivate.course_name,
            "startTime":this.cultivate.startTime ?this.cultivate.startTime.getFullYear() + "-" + (this.cultivate.startTime.getMonth()+1) + "-" + this.cultivate.startTime.getDate():null,
            "peoples":this.cultivate.peoples,
            "state":this.cultivate.state,
            "mark":this.cultivate.mark,
            "courseware_brief":this.cultivate.courseware_brief
        }).then((data)=>{
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
    public async insertCultivateArchives(){
        await request.put('/api/workerlib/cultivate_archives', this.cultivateArchivesList).then((data)=>{
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
        await request.put('/api/workerlib/courseware/update',await this.getUpdateParams()).then((data)=>{
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
        debugger
        await request.delete('/api/workerlib/courseware/'+this.id
        ).then((data)=>{
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
        debugger
        await request.post('/api/workerlib/archives',await this.getPeopleParams()).then((data)=>{
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
        }
    }
    @Action
    public successAddCultivate(data: any) {
        if(data.status == 0) {
            this.insertCultivateArchives();
        }
    }
    @Action
    public successUpdate(data: any) {
        let alert: any = Message;
        if(data.status == 0) {
            this.search();
            alert.warning("成功！");
        }
    }
    @Action
    public successDelete(data: any) {
        let alert: any = Message;
        if(data.status == 0) {
            this.search();
            alert.warning("成功！");
        }
    }
    @Mutation
    public successAddCultivateArchives(data: any) {
        if(data.status == 0) {
            this.checkeds = [];
            this.checkAllGroup = [];
            let alert: any = Message;
            alert.warning("新建课程成功！");
        }

    }
    @Mutation
    public success(data: any) {
        this.courseWareInfo = data.data;
    }
    @Mutation
    public successPeople(data: any) {
        this.peoples = data.data;

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
            width: 80
        },
        {
            title: '姓名',
            key: 'name',
            width: 100,
            sortable: true
        },
        {
            title: '身份证',
            key: 'id_number',
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
                            title: params.row.id_number
                        }
                    }, params.row.id_number)
                ])
            }
        },
        {
            title: '工种',
            key: 'work_type',
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
                            title: params.row.work_type
                        }
                    }, params.row.work_type)
                ])
            }
        },
        {
            title: '分包',
            key: 'construction_unit',
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
                            title: params.row.construction_unit
                        }
                    }, params.row.construction_unit)
                ])
            }
        },
        {
            title: '在职状态',
            slot: 'leave'
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
    public setInPageTotal(data: number) {
        this.pageInTotal = data;
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
    public setCourseName(data:string){
        this.cultivate.course_name = data;
    }
    @Mutation
    public setCultivateArchivesList(data:any){
        this.cultivateArchivesList.push(data);
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
}