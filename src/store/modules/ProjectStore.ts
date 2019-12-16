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
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 10
        };
        this.project = [];
        this.projectInfo = {};
        this.projectType = [];
        this.uplodId = [];
    }
    public project: Array<ProjectInfo>;
    public projectType: Array<ProjectType>;
    public pageInfo: PageInfo;
    public projectInfo:ProjectInfo;

    public uplodId:Array<any>;
    @Action
    public getUploadParams() : any {

        return {
            "conditionList": [{
                "name": "project_id",
                "value":  this.uplodId.map(x => x.project_id),
                "algorithm": "IN"
            }
            ],
            "keywords" : [],
            "selectList": [
                {"field": "project_name","alias":"项目名称" },
                {"field": "project_brief" ,"alias":"项目简介"},
                {"field": "builder_license" ,"alias":"施工许可证"},
                {"field": "start_time" ,"alias":"开工时间"},
                {"field": "end_time" ,"alias":"合同竣工时间"},
                {"field": "construction","alias":"建设单位" },
                {"field": "organization","alias":"施工单位" },
                {"field": "supervising","alias":"监理单位" }
            ]
        };
    }
    @Action
    public async upload() {
        debugger
        let alert: any = Message;
        await request.post('/api/workerlib/project/export',await this.getUploadParams(),{responseType: 'blob', params: '项目工程档案'}).then((data)=>{
            alert.warning('成功！');
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
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
    public getParams() : any {
        debugger
        return {
            "pageInfo" : {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },

            "conditionList": [{
                "name": "organization",
                "value": this.projectInfo.selectOrganization,
                "algorithm": "LIKE"
            },{
                "name": "project_name",
                "value": this.projectInfo.selectProjectName,
                "algorithm": "LIKE"
            },{
                "name": "status",
                "value": this.projectInfo.selectStatus == undefined || this.projectInfo.selectStatus == -1 ? null : this.projectInfo.selectStatus,
                "algorithm": "EQ"
            }],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        };
    }

    @Action
    public async search() {
        await request.post('/api/workerlib/project', await this.getParams()).then((data)=>{
            this.success(data);
            this.count();
        }).catch((e)=>{
            console.log(e)
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
    public async count() {
        await request.post('/api/workerlib/project/count', await this.getParams()).then((total)=>{
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public async getProjectType(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "项目状态",
                "algorithm": "EQ"
            }],
            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public async insertProject() {
        debugger
        await request.put('/api/workerlib/project', {
                "project_id":null,
                "project_name":this.projectInfo.project_name,
                "project_brief":this.projectInfo.project_brief,
                "builder_license":this.projectInfo.builder_license,
                "start_time":this.projectInfo.start_time ? this.projectInfo.start_time.getFullYear() + "-" + this.projectInfo.start_time.getMonth() + "-" + this.projectInfo.start_time.getDate():null,
                "end_time":this.projectInfo.end_time ? this.projectInfo.end_time.getFullYear() + "-" + this.projectInfo.end_time.getMonth() + "-" + this.projectInfo.end_time.getDate():null,
                "construction":this.projectInfo.construction,
                "organization":this.projectInfo.organization,
                "supervising":this.projectInfo.supervising,
                "project_supervision":this.projectInfo.project_supervision,
                "project_address":this.projectInfo.project_address,
                "status":this.projectInfo.status
            }).then((data)=>{
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
    public success(data: any) {
        this.project = data.data;
    }

    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }

    @Action
     public added(data: any) {
        debugger
        if(data.status == 0) {
            this.search();
        }
    }

    @Mutation
    public setPageTotal(total: any) {
        this.pageInfo = {
            pageIndex: this.pageInfo.pageIndex,
            pageSize:  this.pageInfo.pageSize,
            pageCount: this.pageInfo.pageCount,
            totalRecords: total
        };
    }


    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '项目名称',
            key: 'project_name',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.project_name
                        }
                    }, params.row.project_name)
                ])
            }
        },
        {
            title: '项目简介',
            key: 'project_brief',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.project_brief
                        }
                    }, params.row.project_brief)
                ])
            }
        },
        {
            title: '施工许可证',
            key: 'builder_license',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.builder_license
                        }
                    }, params.row.builder_license)
                ])
            }
        },
        {
            title: '开工时间',
            key: 'start_time',
            sortable: true
        },
        {
            title: '合同竣工时间',
            key: 'end_time',
            sortable: true,
            width: 180
        },
        {
            title: '建设单位',
            key: 'construction',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.construction
                        }
                    }, params.row.construction)
                ])
            }
        },
        {
            title: '施工单位',
            key: 'organization',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.organization
                        }
                    }, params.row.organization)
                ])
            }
        },
        {
            title: '监理单位',
            key: 'supervising',
            sortable: true,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.supervising
                        }
                    }, params.row.supervising)
                ])
            }
        },
        {
            title: '操作',
            slot: 'operation'
        }
    ];



    @Mutation
    private pageIndex(data: number) {
        this.pageInfo.pageIndex = data;
    }

    @Mutation
    private pageSize(data: number) {
        this.pageInfo.pageSize = data;
    }

    @Mutation
    private id(data: number) {
        this.projectInfo.id = data;
    }

    @Mutation
    private setUplodId(data: any) {
        this.uplodId.push(data);
    }



    @Mutation
    private projectName(data: string) {
        this.projectInfo.project_name = data;
    }

    @Mutation
    private selectProjectName(data: string) {
        this.projectInfo.selectProjectName = data;
    }

    @Mutation
    private projectBrief(data: string) {
        this.projectInfo.project_brief = data;
    }

    @Mutation
    private builderLicense(data: string) {
        this.projectInfo.builder_license = data;
    }

    @Mutation
    private startTime(data: Date) {
        this.projectInfo.start_time = data;
    }

    @Mutation
    private endTime(data: Date) {
        this.projectInfo.end_time = data;
    }

    @Mutation
    private construction(data: string) {
        this.projectInfo.construction = data;
    }

    @Mutation
    private organization(data: string) {
        this.projectInfo.organization = data;
    }

    @Mutation
    private selectOrganization(data: string) {
        this.projectInfo.selectOrganization = data;
    }

    @Mutation
    private supervising(data: string) {
        this.projectInfo.supervising = data;
    }

    @Mutation
    private projectSupervision(data: string) {
        this.projectInfo.project_supervision = data;
    }

    @Mutation
    private projectAddress(data: string) {
        this.projectInfo.project_address = data;
    }

    @Mutation
    private selectProjectAddress(data: string) {
        this.projectInfo.selectProjectAddress = data;
    }

    @Mutation
    private status(data: number) {
        this.projectInfo.status = data;
    }

    @Mutation
    private selectStatus(data: number) {
        this.projectInfo.selectStatus = data-1;
    }
}


interface PageInfo {
    pageIndex?: number;
    pageSize?: number;
    pageCount?:number;
    totalRecords?:number;
}
interface ProjectType {
    value?: string;
    name?: string;
}

interface ProjectInfo {
    id?:number;
    project_name?:string;
    project_brief?:string;
    builder_license?:string;
    start_time?:Date;
    end_time?:Date;
    construction?:string;
    organization?:string;
    supervising?:string;
    project_supervision?:string;
    project_address?:string;
    status?:number;
    selectOrganization?:string;
    selectProjectAddress?:string;
    selectProjectName?:string;
    selectStatus?:number;
}
