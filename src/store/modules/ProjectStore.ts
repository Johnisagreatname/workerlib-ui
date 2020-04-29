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
    private companyList :Array<any>;
    private subCompanyList :Array<any>;
    private companyProjectList :Array<any>;
    constructor(e) {
        super(e);
        this.companyList = [];
        this.subCompanyList = [];
        this.companyProjectList = [];
    }
    @Action
    public async getCompany(id):Promise<any> {
        request.post('/api/workerlib/company_hierarchy',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "pid",
                "value": id,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                {"field": "o_org_name","alias":"title"},
                {"field": "id","alias":"id"}
            ]
        }).then((data)=>{
            if(!data){
                return;
            }

            this.successCompany(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Mutation
    private successCompany(data){
        for(let i = 0;i<data.data.length;i++){
            let c = {};
        }
        this.companyList = data.data;

    }


}
