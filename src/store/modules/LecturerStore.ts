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
    constructor(e) {
        super(e)
        this.lecturers = [];
        this.lecturerInfo={
            type:0
        };
    }

    @Action
    public async search() {
        await request.post('/api/workerlib/lecturer', {
            "pageInfo" : {},
            "conditionList":[{
                "name": "type",
                "value": this.lecturerInfo.type,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList": [],
            "keywords": [],
            "selectList": [
                {"field":"id"},
                {"field":"name"},
                {"field":"type"},
                {"field":"photo"},
                {"field":"curriculum"}
            ]
        }).then((data)=>{
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

    @Mutation
    private success(data: any) {
        this.lecturers = data.data;
    }
    @Mutation
    private type(data: number) {
        this.lecturerInfo.type = data;
    }
}

export interface LecturerInfo {
    name?: string;
    type?: number;
    photo?: string;
    curriculum?:string;
    id?: number;
}
