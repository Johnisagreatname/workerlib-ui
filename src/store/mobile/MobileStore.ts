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
    name: "MobileStore",
    store,
})
export default class MobileStore extends VuexModule {
    public conditionList: Array<any>;
    public conditionListp: Array<any>;
    public conditionListr: Array<any>;
    public userId: string | (string | null)[];
    public personInfo: any;
    public rateInfo: any;
    public workType: any;
    public projectInfo: Array<any>;
    public attendances: any;
    public wages: any;
    public evaluates: any;

    constructor(e) {
        super(e);
        this.conditionList = [];
        this.conditionListp = [];
        this.conditionListr = [];
        this.projectInfo = [];
        this.personInfo = {
            eafName: '',
            cwrIdnum: '',
            eafPhone: '',
        };
        this.rateInfo = null;
        this.workType = null;
        this.attendances = null;
        this.wages = null;
        this.evaluates = null;
    }

    @Action
    public getParams(): any {
        //
        // let item = {};
        // this.userId = router.currentRoute.query.eafid;
        // item["name"] = "eafId";
        // item["value"] = this.userId;
        // item["algorithm"] = "EQ";
        // this.conditionList.push(item);
        return {
            "pageInfo": {},
            "conditionList": [
                {
                    "name": "eafId",
                    "value":router.currentRoute.query.eafid,
                    "algorithm":"EQ"
                }
            ],
            "sortList": [],
            "groupList": [],
            "keywords": [],
            "selectList": []
        };
    }
    @Action
    public getParamsInfo(): any {
        let item = {};
        this.userId = router.currentRoute.query.eafid;
        item["name"] = "archives_id";
        item["value"] = this.userId;
        item["algorithm"] = "EQ";
        this.conditionListp.push(item);
        return {
            "pageInfo": {},

            "conditionList": this.conditionListp,

            "sortList": [],

            "groupList": [],

            "keywords": [],

            "selectList": []
        };
    }

    @Action
    public getParamsRate(): any {
        let item = {};
        this.userId = router.currentRoute.query.eafid;
        item["name"] = "userId";
        item["value"] = this.userId;
        item["algorithm"] = "EQ";
        this.conditionListr.push(item);
        return {
            "pageInfo": {},

            "conditionList": this.conditionListr,

            "sortList": [],

            "groupList": [],

            "keywords": [],

            "selectList": []
        };
    }

    @Action
    public async selectRateInfo() {
        // @ts-ignore

        await request.post('/api/workerlib/alluser_rate', await this.getParamsRate()).then((data) => {
            if(!data){
                return;
            }
            this.successRate(data);
        }).catch((e) => {
            let alert: any = Message;
            if (!e) {
                alert.warning('未知错误！')
                return
            }
            if (e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if (!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }

    @Action
    public async selectPersonInfo() {
        // @ts-ignore
        await request.post('/api/workerlib/alluser', await this.getParams()).then((data) => {
            if(!data){
                return;
            }
            this.success(data);
        }).catch((e) => {
            let alert: any = Message;
            if (!e) {
                alert.warning('未知错误！')
                return
            }
            if (e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if (!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async selectWorkType() {
        // @ts-ignore
        await request.post('/api/workerlib/worktype', await this.getParams()).then((data) => {
            if(!data){
                return;
            }
            this.successWorkType(data);
        }).catch((e) => {
            let alert: any = Message;
            if (!e) {
                alert.warning('未知错误！')
                return
            }
            if (e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if (!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }

    @Mutation
    private successRate(data: any) {
        this.rateInfo = data.data[0];
    }

    @Mutation
    private success(data: any) {
        this.personInfo = data.data[0];
    }
    @Mutation
    private successWorkType(data: any) {
        this.workType = data.data[0];
    }
    @Action
    public async selectAttendances() {
        await request.post('/api/workerlib/archives', await this.getParamsInfo()).then((data) => {
            this.successProjectList(data);
        }).catch((e) => {
            let alert: any = Message;
            if (!e) {
                alert.warning('未知错误！')
                return
            }
            if (e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if (!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }

    @Mutation
    private successProjectList(data: any) {
        this.projectInfo = data.data;
    }

}
