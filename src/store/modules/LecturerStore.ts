import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "LecturerStore",
    store,
})
export default class LecturerStore extends VuexModule {


    private lecturerConditionList:Array<any>;
    private pullDown: boolean;
    private selectLecturerType:number;
    private selectLecturerCurriculum: string;
    private lecturerList: Array<any>;

    private lecturerPageSize : number;
    private lecturerPageIndex : number;
    private lecturerPageTotal : number;

    private checkedId: number;

    private insertLecturerName: string;
    private insertLecturerCurriculum: string;
    private insertLecturerType: number;
    private insertLecturerPersonalreesume: string;
    private insertLecturerPhoto: string;

    private updateLecturerId: string;
    private updateLecturerName: string;
    private updateLecturerCurriculum: string;
    private updateLecturerType: number;
    private updateLecturerPersonalreesume: string;
    private updateLecturerPhoto: string;
    private deleteLecturerId: number;

    constructor(e) {
        super(e)
        this.lecturerConditionList = [];
        this.selectLecturerCurriculum=null;
        this.selectLecturerType = 1;
        this.pullDown = false;
        this.lecturerList = [];
        this.lecturerPageSize = 8;
        this.lecturerPageIndex = 1;
        this.lecturerPageTotal = 0;

        this.checkedId = 0;
        this.insertLecturerName = null;
        this.insertLecturerCurriculum = null;
        this.insertLecturerType = null;
        this.insertLecturerPersonalreesume = null;
        this.insertLecturerPhoto = null;

        this.updateLecturerId = null;
        this.updateLecturerName = null;
        this.updateLecturerCurriculum = null;
        this.updateLecturerType = null;
        this.updateLecturerPersonalreesume = null;
        this.updateLecturerPhoto = null;
        this.deleteLecturerId = null;


    }


    @Action
    public getLecturerListParams() : any{
        if(this.selectLecturerCurriculum){
            let item ={};
            item["name"]="curriculum";
            item["value"]=this.selectLecturerCurriculum;
            item["algorithm"] = "LIKE"
            this.lecturerConditionList.push(item);
        }
        if(this.selectLecturerType){
            let item ={};
            item["name"]="type";
            item["value"]=this.selectLecturerType;
            item["algorithm"] = "EQ"
            this.lecturerConditionList.push(item);
        }
        return {
            "pageInfo" : {
                "pageIndex": this.lecturerPageIndex,
                "pageSize": this.lecturerPageSize
            },
            "conditionList": this.lecturerConditionList,
            "sortList": [],
            "groupList": [],
            "keywords": [],
            "selectList": []
        }
    }
    //查询
    @Action
    public async searchLecturerList() {
        await request.post('/api/workerlib/lecturer',await this.getLecturerListParams()).then((data)=>{
            if(!data){
                return;
            }
            this.searchLecturerListCount();
            this.successSearchLecturerList(data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async searchLecturerListCount() {
        await request.post('/api/workerlib/lecturer/count',await this.getLecturerListParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setLecturerPageTotal(total.data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    private successSearchLecturerList(data : any){
        this.lecturerList = data.data;
    }
    @Mutation
    private setSelectLecturerCurriculum(data : any){
        this.selectLecturerCurriculum = data;
    }
    @Mutation
    private setSelectLecturerType(data : any){
        this.selectLecturerType = data;
    }
    @Mutation
    private setLecturerPageSize(data : any){
        this.lecturerPageSize = data;
    }
    @Mutation
    private setLecturerPageIndex(data : any){
        this.lecturerPageIndex = data;
    }
    @Mutation
    private setLecturerPageTotal(data : any){
        this.lecturerPageTotal = data;
        this.lecturerConditionList = new Array<any>();
    }
    @Mutation
    private setCheckedId(data : any){
        this.checkedId = data;
    }






    @Mutation
    public setInsertLecturerName(data:string){
        this.insertLecturerName=data;
    }
    @Mutation
    public setInsertLecturerCurriculum(data:string){
        this.insertLecturerCurriculum=data;
    }
    @Mutation
    public setInsertLecturerType(data:number){
        this.insertLecturerType = data;
    }
    @Mutation
    public setInsertLecturerPersonalreesume(data:string){
        this.insertLecturerPersonalreesume=data;
    }
    @Mutation
    public setInsertLecturerPhoto(data:string){
        this.insertLecturerPhoto=data;
    }

    @Action
    public async insertLecturer() {
        await request.put('/api/workerlib/lecturer', {
            "name":this.insertLecturerName,
            "curriculum":this.insertLecturerCurriculum,
            "type":this.insertLecturerType,
            "photo":this.insertLecturerPhoto,
            "personalreesume":this.insertLecturerPersonalreesume
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successInsertLecturer(data);
            this.searchLecturerList();
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    public successInsertLecturer(data: any) {
        if(data.status == 0){
            this.insertLecturerName = null;
            this.insertLecturerCurriculum = null;
            this.insertLecturerType = null;
            this.insertLecturerPersonalreesume = null;
            this.insertLecturerPhoto = null;
        }
        let alert: any = Message;
        alert.success('成功！');
    }


    //修改讲师,未完成
    @Action
    public async updateLecturer() {
        await request.put('/api/workerlib/lecturer/'+this.updateLecturerId,{
            "name":this.updateLecturerName,
            "curriculum":this.updateLecturerCurriculum,
            "type":this.updateLecturerType,
            "photo":this.updateLecturerPhoto,
            "personalreesume":this.updateLecturerPersonalreesume
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdateLecturer(data);
            this.searchLecturerList();
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    public successUpdateLecturer(data: any) {
        if(data.status == 0){
            this.updateLecturerId = null;
            this.updateLecturerName = null;
            this.updateLecturerCurriculum = null;
            this.updateLecturerType = null;
            this.updateLecturerPhoto = null;
            this.updateLecturerPersonalreesume = null;
        }
        let alert: any = Message;
        alert.success('成功！');
    }

    @Mutation
    public setUpdateLecturerId(data:string){
        this.updateLecturerId=data;
    }
    @Mutation
    public setUpdateLecturerName(data:string){
        this.updateLecturerName=data;
    }
    @Mutation
    public setUpdateLecturerCurriculum(data:string){
        this.updateLecturerCurriculum=data;
    }
    @Mutation
    public setUpdateLecturerType(data:number){
        this.updateLecturerType = data;
    }
    @Mutation
    public setUpdateLecturerPersonalreesume(data:string){
        this.updateLecturerPersonalreesume=data;
    }
    @Mutation
    public setUpdateLecturerPhoto(data:string){
        this.updateLecturerPhoto=data;
    }

    //批量删除讲师
    //第一个参数url是要删除的表
    //第二个参数要删除的id数组
    @Action
    public async deleteLecturerById() {
        await request.delete('/api/workerlib/lecturer/'+this.deleteLecturerId).then((data)=>{
            if(!data){
                return;
            }
            this.setDeleteLecturerId(null);
            this.searchLecturerList();
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Mutation
    public setDeleteLecturerId(data:number){
        this.deleteLecturerId=data;
    }
    // //导出
    // @Action
    // public async uploadPeople() {
    //     let alert: any = Message;
    //     await request.post('/api/workerlib/view_lecturer/export',{
    //         "conditionList": [
    //         ],
    //         "keywords" : [],
    //         "selectList": [
    //             {"field": "name" ,"alias":"姓名"},
    //             {"function": "type","alias":"类型" },
    //             {"field": "personalreesume" ,"alias":"履历"},
    //             {"field": "curriculum" ,"alias":"课程"},
    //         ]
    //     }).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         alert.success('成功！');
    //     }).catch((e)=>{
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！');
    //             return
    //         }
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //         if(!e.message) {
    //             return;
    //         }
    //         alert.warning(e.message || e)
    //     });
    // }
    //
    //

}

interface LecturerInfo {
    name?: string;
    type?: number;
    photo?: string;
    curriculum?:string;
    id?: number;
    personalreesume?:string;
}
