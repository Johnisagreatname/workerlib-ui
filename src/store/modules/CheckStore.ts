import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "CheckStore",
    store,
})
export default class CheckStore extends VuexModule {
    public tableData: Array<TableData> = [];
    public detailData: Array<DetailData> = [];
    public pageTotal: number;
    public pageIndex: number;
    public pageSize: number;

    public detailTotal: number;
    public detailIndex: number;
    public detailSize: number;

    public workTypeList: Array<any> = [];
    public name: string
    public workType: string
    public grade: string
    public rank: string
    public startTime: string
    public endTime: string
    public projectName: string
    public unitName: string
    public AddRate:AddRate;

    constructor(e) {
        super(e);
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageTotal = 0;

        this.detailIndex = 1;

        this.detailSize = 10;
        this.detailTotal = 0;
        this.name = '';
        this.workType = '';
        this.grade = '';
        this.rank = '';
        this.startTime = '';
        this.endTime = '';

        this.projectName = '';
        this.unitName = '';

        this.AddRate = {};
    }



    //查询条件参数
    @Action
    public getUpdateParams(list: Array<UpdateParams> = null) {
        return new Promise((res, rej) => {
            let params: any = {
                "pageInfo": {},
                "conditionList": [],
                "sortList": [],
                "groupList": [],
                "keywords": [],
                "selectList": [
                    {
                        "field": "name"
                    }
                ]
            }
            if (list) {
                list.forEach((a, index) => {
                    params.conditionList.push(new Object())
                    params.conditionList[index].name = a.name;
                    params.conditionList[index].value = a.value;
                    params.conditionList[index].algorithm = "EQ";
                })
            }
            res(params)
        })
    }


    //查询数据
    @Action
    public async searchData({url, conName = "", status = ""}: SearchData): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let params = conName && (status || status === 0) ? [{name: conName, value: status}] : null
            await request.post('/api/workerlib/' + url, await this.getUpdateParams(params)).then((data) => {
                if (!data) {
                    return;
                }
                resolve(data.data)
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
                alert.warning(e.message || e)
            });
        })
    }
           
    //工种类型
    @Action
    async getType() {
        await this.searchData({url: "dictionaries", conName: "category", status: "工种"}).then(res => {
            this.workTypeListData(res)
        })
    }

    @Mutation
    workTypeListData(data) {
        this.workTypeList = data
    }

    //参数
    @Action
    public getSearchParams(): any {
        let conditionList: Array<any> = [];
        if (this.name) {
            let item = {};
            item["name"] = "userName";
            item["value"] = this.name;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }
        if (this.workType) {
            let item = {};
            item["name"] = "rateWorkType";
            item["value"] = this.workType;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }
        if (this.grade) {
            let item = {};
            item["name"] = "grade";
            item["value"] = this.grade;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }
        if (this.rank) {
            let item = {};
            item["name"] = "rank";
            item["value"] = this.rank;
            item["algorithm"] = "EQ"
            conditionList.push(item);
        }
        if (this.startTime) {
            let item = {};
            item["name"] = "evaluateTime";
            item["value"] = this.startTime;
            item["algorithm"] = "GTEQ"
            conditionList.push(item);
        }
        if (this.endTime) {
            let item = {};
            item["name"] = "evaluateTime";
            item["value"] = this.endTime;
            item["algorithm"] = "LTEQ"
            conditionList.push(item);
        }
        if (this.projectName) {
            let item = {};
            item["name"] = "projectName";
            item["value"] = this.projectName;
            item["algorithm"] = "LIKE"
            conditionList.push(item);
        }
        if (this.unitName) {
            let item = {};
            item["name"] = "unitName";
            item["value"] = this.unitName;
            item["algorithm"] = "LIKE"
            conditionList.push(item);
        }


        return {
            "pageInfo": {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },
            "conditionList": conditionList,
            "sortList": [],
            "groupList": [],
            "keywords": [],
            "selectList": []
        }
    }

    //技能鉴定分组
    @Action
    public async searchEvaluate() {
        await request.post('/api/workerlib/skillappraisal', await this.getSearchParams()).then((total) => {
            if (!total) {
                return;
            }
            this.changeTableData(total.data)
            this.evaluateCount();
        }).catch((e) => {
            MessageUtils.warning(e);
        });
    }

    @Mutation
    changeTableData(data) {
        this.tableData = data;
    }

    //技能鉴定分组分页
    @Action
    public async evaluateCount() {
        await request.post('/api/workerlib/skillappraisal/count', await this.getSearchParams()).then((total) => {
            if (!total) {
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e) => {
            MessageUtils.warning(e);
        });
    }

    @Mutation
    public setPageTotal(data: number) {
        this.pageTotal = data;
    }

    @Mutation
    private setPageSize(data: number) {
        this.pageSize = data;
    }

    @Mutation
    private setPageIndex(data: number) {
        this.pageIndex = data;
    }

    //详情查看
    @Action
    public async evaluateDetails(archivesId:string) {
        await request.post('/api/workerlib/user_rate', {
            "pageInfo": {},
            "conditionList": [{
                "name": "archivesId",
                "value": archivesId,
                "algorithm": "EQ"
            }],
            "sortList": [],

            "groupList": [],

            "keywords": [],

            "selectList": [
                {"field": "userId"},
                {"field": "rateWorkType"},
                {"field": "grade"},
                {"field": "rank"},
                {"field": "evaluateTime"},
            ]

        }).then((total) => {
            if (!total) {
                return;
            }
            this.changeDetailData(total.data)
            this.evaluateDetailsCount(archivesId);
        }).catch((e) => {
            MessageUtils.warning(e);
        });
    }

    @Mutation
    changeDetailData(data) {
        this.detailData = data;
    }

    //详情分页
    @Action
    public async evaluateDetailsCount(archivesId:string) {
        await request.post('/api/workerlib/user_rate/count', {
            "pageInfo": {},
            "conditionList": [{
                "name": "archivesId",
                "value": archivesId,
                "algorithm": "EQ"
            }],
            "sortList": [],

            "groupList": [],

            "keywords": [],

            "selectList": [
                {"field": "userId"},
                {"field": "rateWorkType"},
                {"field": "grade"},
                {"field": "rank"},
                {"field": "evaluateTime"},
            ]

        }).then((total) => {
            if (!total) {
                return;
            }
            this.setDetailTotal(total.data)
        }).catch((e) => {
            MessageUtils.warning(e);
        });
    }

    @Mutation
    public setDetailTotal(data: number) {
        this.detailTotal = data;
    }

    @Mutation
    private setDetailSize(data: number) {
        this.detailSize = data;
    }

    @Mutation
    private setDetailIndex(data: number) {
        this.detailIndex = data;
    }

    //新增
    @Action
    public async insertUpCultivate() {
        await request.put('/api/workerlib/user_rate', {
            "userId":this.AddRate.id,
            "rateWorkType":this.AddRate.rateWorkType,
            "grade":this.AddRate.grade,
            "rank":this.AddRate.rank,
            "evaluateTime":this.AddRate.modifyBy
        }).then((data)=>{
            let alert: any = Message;
            if(!data){
                return;
            }
            alert.success("新增成功！");
        }).catch((e)=>{
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
}

interface TableData {
    projectName: string;
    unitName: string;
    userId: string;
    userName: string;
    rateWorkType: string;
    grade: string;
    rank: string;
    evaluateTime: string;
}

interface DetailData {
    userId: string;
    rateWorkType: string;
    grade: string;
    rank: string;
    evaluateTime: Date;
}

interface SearchData {
    url: string;
    conName?: string;
    status?: any
}

interface UpdateParams {
    name: string;
    value: any
}
interface AddRate {
    id?: string;
    eafName?: string;
    rateWorkType?: string;
    grade?: string;
    rank?: string;
    modifyBy?: string;
}