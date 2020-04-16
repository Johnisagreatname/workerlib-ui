import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";
import router from '../../router/.invoke/router'


@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "MoveRegisterStore",
    store,
})
export default class MoveRegisterStore extends VuexModule {

    public projectType: Array<ProjectType>;
    public insertList : Array<any>;
    public safetyTrainingList : Array<any>;
    public roleName:any;
    public userName:string;
    public card:string;
    public phone:number;
    public codeNumber:string;
    public type:Array<any>;
    constructor(e) {
        super(e);
        this.projectType = [];
        this.userName = "";
        this.card = "";
        this.phone = null;
        this.codeNumber = "";
        this.type = [];
        this.insertList = [];
        this.safetyTrainingList = [];
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
    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }

    @Action
    public async insertArchives() {
        let alert: any = Message;
        await request.post('/api/user/register', {
            "eafName":this.userName,
            "eafPhone":this.phone,
            "cwrIdnum":this.card,
            "unit_id":"E1518A607E764390848F188390482597"
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successInsertWorkType(data);

        }).catch((e)=>{
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
                alert.warning("用户已存在！");
                return;
            }
            alert.warning(e.message || e)
        });
    }
    // @Action
    // public async searchEafId() {
    //     await request.post('/api/workerlib/alluser',{
    //         "pageInfo" : {},
    //         "conditionList": [{
    //             "name": "cwrIdnum",
    //             "value": this.card,
    //             "algorithm": "EQ"
    //         } ],
    //         "sortList": [],
    //         "groupList" : [],
    //         "keywords" : [],
    //         "selectList": []
    //     }).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.insertWorkType(data.data[0].eafId);
    //     }).catch((e)=>{
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！')
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
    // @Action
    // public async insertWorkType(id) {
    //     if(this.type.length>0){
    //         for(let i=0;i<this.type.length;i++){
    //             let item = {};
    //             item["eafId"] = id;
    //             item["workType"] = this.type[i];
    //             this.insertList.push(item);
    //         }
    //     }
    //     await request.put('/api/workerlib/worktype', this.insertList).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.successInsertWorkType(data);
    //     }).catch((e)=>{
    //         console.log(e)
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！');
    //             return;
    //         }
    //
    //         if(e.response && e.response.data && e.response.data.message) {
    //             alert.warning(e.response.data.message)
    //             return
    //         }
    //
    //         if(!e.message) {
    //             return;
    //         }
    //
    //         alert.warning(e.message || e)
    //     });
    // }
    // @Action
    // public async searchSafetyUser(userId) {
    //     await request.post('/api/workerlib/cultivate_archives',{
    //         "pageInfo" : {},
    //         "conditionList": [{
    //             "name": "archives_id",
    //             "value": userId,
    //             "algorithm": "EQ"
    //         } ],
    //         "sortList": [],
    //         "groupList" : [],
    //         "keywords" : [],
    //         "selectList": []
    //     }).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //         this.searchSafetyTraining();
    //     }).catch((e)=>{
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！')
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
    // @Action
    // public async searchSafetyTraining() {
    //     await request.post('/api/workerlib/safetytraining',{
    //         "pageInfo" : {},
    //         "conditionList": [],
    //         "sortList": [],
    //         "groupList" : [],
    //         "keywords" : [],
    //         "selectList": []
    //     }).then((data)=>{
    //         if(!data){
    //             return;
    //         }
    //     }).catch((e)=>{
    //         let alert: any = Message;
    //         if(!e) {
    //             alert.warning('未知错误！')
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
    // @Mutation
    // public successSafetyTraining(data: any){
    //     if(data.status == 0) {
    //         this.safetyTrainingList = data.data;
    //
    //     }
    // }

    @Mutation
    public successInsertWorkType(data: any){
        if(data.status == 0) {
            // this.insertList = new Array<any>();
            router.push({path: '/mobile/moveLogin'})
            let alert: any = Message;
            alert.success('注册成功！');
        }
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
    public setCodeNumber(data:string){
        this.codeNumber = data;
    }
    @Mutation
    public setType(data:any) {
        this.type=[];
        for(let i=0;i<data.length;i++){
            this.type.push(data[i]);
        }
    }

}
interface ProjectType {
    value?: string;
    name?: string;
}