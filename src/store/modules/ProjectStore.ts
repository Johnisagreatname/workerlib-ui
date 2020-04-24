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


    // private insertProjectName: string;
    // private insertProjectBrief: string;
    // private insertBuilderLicense: string;
    // private insertStartTime: Date;
    // private insertEndTime: Date;
    // private insertConstruction: string;
    // private insertOrganization: string;
    // private insertSupervising: string;
    // private insertProjectSupervision: string;
    // private insertProjectAddress: string;
    // private insertStatus: number;







    constructor(e) {
        super(e);

        //新增项目
        // this.insertProjectName = null;
        // this.insertProjectBrief = null;
        // this.insertBuilderLicense = null;
        // this.insertStartTime = null;
        // this.insertEndTime = null;
        // this.insertConstruction = null;
        // this.insertOrganization = null;
        // this.insertSupervising = null;
        // this.insertProjectSupervision = null;
        // this.insertProjectAddress = null;
        // this.insertStatus = null;



    }
    //新增项目
    // @Action
    // public async insertProject() {
    //     await request.put('/api/workerlib/project', {
    //         "project_id":null,
    //         "project_name":this.insertProjectName,
    //         "project_brief":this.insertProjectBrief,
    //         "builder_license":this.insertBuilderLicense,
    //         "start_time":this.insertStartTime.getFullYear() + "-" + (this.insertStartTime.getMonth()+1) + "-" + this.insertStartTime.getDate(),
    //         "end_time":this.insertEndTime.getFullYear() + "-" + (this.insertEndTime.getMonth()+1) + "-" + this.insertEndTime.getDate(),
    //         "construction":this.insertConstruction,
    //         "organization":this.insertOrganization,
    //         "supervising":this.insertSupervising,
    //         "project_supervision":this.insertProjectSupervision,
    //         "project_address":this.insertProjectAddress,
    //         "status":this.insertStatus
    //     }).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.successInsertProject(data);
    //     }).catch((e)=>{
    //         let alert: any = Message;
    //         console.log(e)
    //         if(!e) {
    //             alert.warning('未知错误！');
    //             return;
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
    //新增项目回调
    // @Action
    // private successInsertProject(data : any){
    //     if(data.status == 0) {
    //         this.searchProjectList();
    //         let alert: any = Message;
    //         alert.success('成功！');
    //     }
    // }
}
