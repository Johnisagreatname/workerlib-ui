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
    name: "PlayStore",
    store,
})
export default class PlayStore extends VuexModule {
    private url:string;
    private id:number;
    private list:any;
    private trainingPages:number;
    private trainingTime:number;
    private archivesStatus:string;
    private whether:number;
    private arId:number;
    private culId:number;

    constructor(e) {
        super(e);
        this.url = "";
        this.id = null;
        this.trainingPages = 1;
        this.trainingTime = 0;
        this.whether = null;
        this.archivesStatus = "";
        this.list = {};
        this.arId = null;
        this.culId = null;
    }
    @Action
    public async searchCul(){
        await request.post('/api/workerlib/join',{
            "joinTables": [
                {
                    "tablename": "cultivate",
                    "alias": "a",
                    "JoinMode": "Left",
                }, {
                    "tablename": "courseware",
                    "alias": "b",
                    "JoinMode": "Left",
                    "onList": [{
                        "name": "b.id",
                        "value": "a.course_id",
                        "algorithm": "EQ"
                    }]
                },{
                        "tablename": "cultivate_archives",
                        "alias": "c",
                        "JoinMode": "Left",
                        "onList": [{
                            "name": "c.cultivate_id",
                            "value": "a.id",
                            "algorithm": "EQ"
                        } ]
                    }
                    ],
                    "pageInfo": {},
                    "conditionList": [{
                        "name": "c.cultivate_id",
                        "value": this.culId,
                        "algorithm": "EQ"
                    }],
                    "sortList": [],
                    "groupList": [],
                    "keywords": [],
                    "selectList": [
                        {
                            "field": "b.id",  //字段名
                            "alias": "id"
                        },
                        {
                            "field": "b.title",  //字段名
                            "alias": "title"
                        },
                        {
                            "field": "b.video",  //字段名
                            "alias": "video"
                        },
                        {
                            "field": "b.total_hours",  //字段名
                            "alias": "total_hours"
                        },
                        {
                            "field": "b.pptPages",  //字段名
                            "alias": "pptPages"
                        },
                        {
                            "field": "c.training_pages",  //字段名
                            "alias": "training_pages"
                        },
                        {
                            "field": "c.archivesStatus",  //字段名
                            "alias": "archivesStatus"
                        },
                        {
                            "field": "c.training_time",  //字段名
                            "alias": "training_time"
                        }
                    ]
        }).then((data)=>{
            if(!data){
                return;
            }
            this.sucessSearchCul(data);
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
    public async updateCul() {
        await request.put('/api/workerlib/cultivate_archives/'+this.arId,{
                "training_pages":this.trainingPages,
                "archivesStatus":this.archivesStatus,
                "training_time":this.trainingTime,
                "whether":this.whether
        }).then((data)=>{
            if(!data){
                return;
            }
            this.sucessUpdateCul(data);
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
    @Mutation
    public sucessSearchCul(data: any) {
        if(data.status == 0) {
            this.list = data.data[0];
        }
    }
    @Action
    public sucessUpdateCul(data: any) {
        if(data.status == 0) {
            this.searchCul();
        }
    }

    @Mutation
    public setTrainingPages(data:number){
        this.trainingPages = data;
    }
    @Mutation
    public setTrainingTime(data:number){
        this.trainingTime = data;
    }
    @Mutation
    public setArchivesStatus(data:string){
        this.archivesStatus = data;
    }
    @Mutation
    public setArId(data:number){
        this.arId = data;
    }
    @Mutation
    public setCultivate_id(data:number){
        this.culId = data;
    }
    @Mutation
    public setWhether(data:number){
        this.whether = data;
    }


}