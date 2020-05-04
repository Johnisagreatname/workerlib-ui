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
    private courseWareList:any;
    private trainingPages:number;
    private trainingTime:number;
    private archivesStatus:string;
    private whether:number;
    private cultivateArchivesId:number;
    private arId:number;
    private culId:number;
    private couId:number;
    private peoples:number;

    constructor(e) {
        super(e);
        this.url = "";
        this.id = null;
        this.cultivateArchivesId = null;
        this.trainingPages = 1;
        this.trainingTime = 0;
        this.whether = null;
        this.archivesStatus = "";
        this.list = {};
        this.courseWareList = {};
        this.arId = null;
        this.culId = null;
        this.couId = null;
        this.peoples = null;
    }
    @Action
    public async searchCourseWare(){
        await request.post('/api/workerlib/courseware',{
            "conditionList": [{
                "name": "id",
                "value": this.couId,
                "algorithm": "EQ"
            }
            ]
        }).then((data)=>{
            if(!data){
                return;
            }

            this.sucessCourseWare(data);
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
                    },{
                        "name": "c.archives_id",
                        "value": router.currentRoute.query.eafid,
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
                            "field": "c.id",  //字段名
                            "alias": "cId"
                        },
                        {
                            "field": "c.archives_id",  //字段名
                            "alias": "arId"
                        },
                        {
                            "field": "a.peoples",  //字段名
                            "alias": "peoples"
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
            if(data.data && data.data.length<=0) {
                this.insertCultivateArchives();
            }else{
                this.sucessSearchCul(data);
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
    public async insertCultivateArchives(){
        await request.put('/api/workerlib/cultivate_archives', {
            "archives_id": router.currentRoute.query.eafid,
            "cultivate_id": this.culId
        }).then((data)=>{
            if(!data){
                return;
            }
            this.sucessCultivateArchives(data.data);
            this.searchCulInfo();

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
    public async searchCulInfo(){
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
            },{
                "name": "c.archives_id",
                "value": router.currentRoute.query.eafid,
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
                    "field": "c.id",  //字段名
                    "alias": "cId"
                },
                {
                    "field": "c.archives_id",  //字段名
                    "alias": "arId"
                },
                {
                    "field": "a.peoples",  //字段名
                    "alias": "peoples"
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
            this.updateCultivate(data.data[0]);

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
    public async updateCultivate(data) {
        await request.put('/api/workerlib/cultivate/'+this.culId,{
            "peoples": (data.peoples+1)
        }).then((data)=>{
            if(!data){
                return;
            }
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
    public async updateCul() {
        await request.put('/api/workerlib/cultivate_archives/'+this.cultivateArchivesId,{
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
        if(data.data.length>0){
            this.list = data.data[0];
            this.cultivateArchivesId =data.data[0].cId;
        }
    }
    @Mutation
    public sucessCourseWare(data: any) {
        this.courseWareList = data.data[0];
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
    public setPeoples(data:number){
        this.peoples = data;
    }
    @Mutation
    public setCourseWare_id(data:number){
        this.couId = data;
    }
    @Mutation
    public setWhether(data:number){
        this.whether = data;
    }
    @Mutation
    public sucessCultivateArchives(data:number){
        this.cultivateArchivesId = data;
    }


}