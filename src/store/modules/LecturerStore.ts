import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "LecturerStore",
    store,
})
export default class LecturerStore extends VuexModule {
    public lecturers: Array<LecturerInfo>;
    public lecturerInfo:LecturerInfo;
    public selectType:number;
    constructor(e) {
        super(e)
        this.lecturerInfo = {};
        this.lecturers = [];
        this.selectType = 1;
    }

    @Action
    public async search() {
        await request.post('/api/workerlib/lecturer', {
            "pageInfo" : {},
            "conditionList":[{
                "name": "type",
                "value": this.selectType,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList": [],
            "keywords": [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.success(data)
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

            alert.warning(e.message || e)
        });
    }
    @Action
    public async insertLecturer() {
        await request.put('/api/workerlib/lecturer', {
            "name":this.lecturerInfo.name,
            "curriculum":this.lecturerInfo.curriculum,
            "type":this.lecturerInfo.type,
            "photo":this.lecturerInfo.photo,
			"personalreesume":this.lecturerInfo.personalreesume
        }).then((data)=>{
            if(!data){
                return;
            }
            this.added(data)
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
    @Mutation
    private success(data: any) {
        this.lecturers = data.data;
    }
    @Action
    public added(data: any) {
        if(data.status == 0) {
            this.search();

        }
    }

    @Mutation
    private setSelectType(data: number) {
        this.selectType = data;
    }

    @Mutation
    public setType(data:number){
        this.lecturerInfo.type=data;
    }
    @Mutation
    public setCurriculum(data:string){
        this.lecturerInfo.curriculum=data;
    }
    @Mutation
    public setName(data:string){
        this.lecturerInfo.name=data;
    }
    @Mutation
    public setPhoto(data:string){
        this.lecturerInfo.photo=data;
    }
	@Mutation
    public setPersonalreesume(data:string){
        this.lecturerInfo.personalreesume=data;
    }
}

interface LecturerInfo {
    name?: string;
    type?: number;
    photo?: string;
    curriculum?:string;
    id?: number;
	personalreesume?:string;
}
