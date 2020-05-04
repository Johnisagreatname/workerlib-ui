import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
// @ts-ignore
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "UnitStoreBack",
    store,
})

export default class UnitStoreBack extends VuexModule {

    public unit:any;

    public unitUrl:string = "unit";//unti表
    public teamgroupUrl:string = "teamgroup";//teamgroup表
    //查询条件
    public conditionList:Array<any>;
    //分页条件
    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;

    private pullDown: boolean;

    //unit表字段
    public sUnitName:string;
    public project_id:number;
    public project_license:string;
    public unit_number:string;
    public unit_name:string;
    public unit_type:number;
    public entrance_time:Date;
    public principal:string;
    public status:number;
    public unitCount: number;
    //teamgroup表字段
    public teamName:string;//班组名称
    public teamId:number//id
    //共同字段
    public unitId:string;//单位ID

    //批量删除
    public checked: Array<any> = []
    @Mutation
    public setTeamId(data:number){
        this.teamId = data;
    }
    @Mutation
    public setPageIndex(data: number) {
        this.pageIndex = data;
    }
    @Mutation
    public setPageSize(data: number) {
        this.pageSize = data;
    }
    get getChecked() {
        return this.checked
    }

    @Mutation
    public selectUnitName(data: string) {
        this.sUnitName = data;
    }

    @Mutation
    private success(data: any) {
        this.unit = data.data;
    }

    @Mutation
    public setPageTotal(data: number) {
        this.conditionList = [];
        this.pageTotal = data;
    }

    constructor(e) {
        super(e);
        //分页
        this.pageIndex= 1;
        this.pageSize=20;
        this.pageTotal = 0;
        // this.unitType = [];
        // this.uplodId = [];
        this.conditionList = [];
        //获取工程列表数据
        this.unit = [];
        //获取项目列表
        // this.projectNameList = [];

        this.pullDown = false;

        // this.project_id=null;
        // this.project_license="";
        // this.unit_number="";
        // this.unit_name="";
        // this.entrance_time=null;
        // this.people_number="";
        // this.unit_type=0;
        // this.principal="";
        // this.project_name="";
        // this.status=null;
        //条件查询
        // this.sProjectName="";
        // this.sStatus=null;
        this.sUnitName="";
        this.unitCount = 0;

        //teamgroup表
        this.teamId = 0;
        this.teamName="";
        //共同字段
        this.unitId=null;
    }

    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {

            title: '序号',
            slot: 'serialNumber',
            width: 150,
            align: 'center',
            // sortable: false,
            // render: (h, params) => {
            //     return h('div', [
            //         h('span', {
            //             style: {
            //                 display: 'inline-block',
            //                 width: '100%',
            //                 overflow: 'hidden',
            //                 textOverflow: 'ellipsis',
            //                 whiteSpace: 'nowrap'
            //             },
            //             domProps: {
            //                 title: params.row.unit_number
            //             }
            //         }, params.row.unit_number)
            //     ])
            // }
        },
        {
            title: '姓名',
            key: 'principal',
            // sortable: false,
            // render: (h, params) => {
            //     return h('div', [
            //         h('span', {
            //             style: {
            //                 display: 'inline-block',
            //                 width: '100%',
            //                 overflow: 'hidden',
            //                 textOverflow: 'ellipsis',
            //                 whiteSpace: 'nowrap'
            //             },
            //             domProps: {
            //                 title: params.row.unit_number
            //             }
            //         }, params.row.unit_number)
            //     ])
            // }
        },
        {
            title: '所属项目',
            key: 'unit_number',
            // sortable: false,
            // render: (h, params) => {
            //     return h('div', [
            //         h('span', {
            //             style: {
            //                 display: 'inline-block',
            //                 width: '100%',
            //                 overflow: 'hidden',
            //                 textOverflow: 'ellipsis',
            //                 whiteSpace: 'nowrap'
            //             },
            //             domProps: {
            //                 title: params.row.unit_number
            //             }
            //         }, params.row.unit_number)
            //     ])
            // }
        },
        {
            title: '所属单位',
            key: 'unit_name',
            // sortable: false,
            // render: (h, params) => {
            //     return h('div', [
            //         h('span', {
            //             style: {
            //                 display: 'inline-block',
            //                 width: '100%',
            //                 overflow: 'hidden',
            //                 textOverflow: 'ellipsis',
            //                 whiteSpace: 'nowrap'
            //             },
            //             domProps: {
            //                 title: params.row.unit_number
            //             }
            //         }, params.row.unit_number)
            //     ])
            // }
        },
        // {
        //     title: '班组',
        //     key: 'unit_number',
            // sortable: false,
            // render: (h, params) => {
            //     return h('div', [
            //         h('span', {
            //             style: {
            //                 display: 'inline-block',
            //                 width: '100%',
            //                 overflow: 'hidden',
            //                 textOverflow: 'ellipsis',
            //                 whiteSpace: 'nowrap'
            //             },
            //             domProps: {
            //                 title: params.row.unit_number
            //             }
            //         }, params.row.unit_number)
            //     ])
            // }
        // },
        {
            title: '人员状态',
            key: 'status',
            // sortable: false,
            // render: (h, params) => {
            //     return h('div', [
            //         h('span', {
            //             style: {
            //                 display: 'inline-block',
            //                 width: '100%',
            //                 overflow: 'hidden',
            //                 textOverflow: 'ellipsis',
            //                 whiteSpace: 'nowrap'
            //             },
            //             domProps: {
            //                 title: params.row.unit_number
            //             }
            //         }, params.row.unit_number)
            //     ])
            // }
        },
        {
            title: '评分',
            key: 'unit_number',
            // sortable: false,
            // render: (h, params) => {
            //     return h('div', [
            //         h('span', {
            //             style: {
            //                 display: 'inline-block',
            //                 width: '100%',
            //                 overflow: 'hidden',
            //                 textOverflow: 'ellipsis',
            //                 whiteSpace: 'nowrap'
            //             },
            //             domProps: {
            //                 title: params.row.unit_number
            //             }
            //         }, params.row.unit_number)
            //     ])
            // }
        },
        {
            title: '评分类型',
            key: 'unit_number',
            // sortable: false,
            // render: (h, params) => {
            //     return h('div', [
            //         h('span', {
            //             style: {
            //                 display: 'inline-block',
            //                 width: '100%',
            //                 overflow: 'hidden',
            //                 textOverflow: 'ellipsis',
            //                 whiteSpace: 'nowrap'
            //             },
            //             domProps: {
            //                 title: params.row.unit_number
            //             }
            //         }, params.row.unit_number)
            //     ])
            // }
        },
        {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
        }
        // {
        //     title: '当前人数',
        //     slot: 'worker_count',
        //     sortable: true
        // },
        // {
        //     title: '法人代表',
        //     key: 'principal',
        //     sortable: true
        // }
    ];

    //获取新增|修改参数，未完成
    //如果有带参数，就给id赋值则是修改，无则是新增
    @Action
    public getUpdateParams(data?:string): any{
        let item : string;
        if (data){
            item=data;
        }else {
            item = null
        }
        return{
            "unit_id":item,
            "project_id":this.project_id,//所属项目ID
            "project_license":this.project_license,//施工单位许可证
            "unit_number":this.unit_number,//参见单位编号
            "unit_name":this.unit_name,//参见单位名称
            "unit_type":this.unit_type,//单位类型
            //没有社会统一码
            //没有电话
            //入场时间
            "entrance_time":this.entrance_time.getFullYear() + "-" + (this.entrance_time.getMonth()+1) + "-" + this.entrance_time.getDate(),
            "principal":this.principal,//负责人
            "status":this.status,//状态
            "count":this.unitCount//下属班组数
        }
    }

    @Action
    public getParams() : any {
        if(this.sUnitName){
            let item ={};
            item["name"]="unit_name";
            item["value"]=this.sUnitName;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        return {

            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": this.conditionList,

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        };
    }

    @Mutation
    private setPullDown(data : any){
        this.pullDown = data;
    }

    @Mutation
    private switchPullDown(){
        this.pullDown = !this.pullDown;
    }

    @Action
    public async count() {
        await request.post('/api/workerlib/unit_teamgroup/count', await this.getParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    //查询，未测试
    @Action
    public async search() {
        await request.post('/api/workerlib/unit_teamgroup',await this.getParams()).then((data)=>{
            if(!data){
                return;
            }
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

    //新增unit，未测试
    @Action
    public async insertUnit() {
        await request.put('/api/workerlib/unit', this.getUpdateParams()).then((data)=>{
            if(!data){
                return;
            }
            //this.insertTeamGroup(data)
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


    //新增teamgroup,未测试
    @Action
    public async insertTeamGroup(data) {
        await request.put('/api/workerlib/teamgroup', {
            "id": this.teamId,
            "teamName": this.teamName,//班组名称
            "unitId" : data.data//单位ID
        }).then((data)=>{
            if(!data){
                return;
            }
            this.added(data)
            this.search()
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

    //修改unit，未测试
    @Action
    public async updateUnit() {
        await request.put('/api/workerlib/unit/'+this.unitId, await this.getUpdateParams(this.unitId)).then((data)=>{
            if(!data){
                return;
            }
            //this.updateTeamGroup()
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

    //修改teamgroup，未测试
    @Action
    public async updateTeamGroup() {
        await request.put('/api/workerlib/teamgroup', {
            "id": this.teamId,
            "teamName": this.teamName,//班组名称
            "unitId" : this.unitId//单位ID
        }).then((data)=>{
            if(!data){
                return;
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

    //删除未完成
    @Action
    public async delete(url:string,array:Array<number|string>) {
            await request.post('/api/workerlib/'+url+'/delete',array).then((data)=>{
            if(!data){
                return;
            }
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


    //删除数据，未完成
    @Action
    public async deleteUnit(){
        /*let list = this.getChecked

        if (list && list.length) {
            let unitArry: Array<string> = [];
            let teamArry: Array<number> = [];
            let alert: any = Message;
            if (list.length === 0) {
                alert.warning('至少选择一人！')
                return;
            }
            for(let row in list){
                unitArry.push();
                teamArry.push();
            }
            this.delete(this.unitUrl,unitArry);
            this.delete(this.teamgroupUrl,teamArry);
            alert('成功！');
        }*/
        this.delete(this.unitUrl,null);
    }

    //导出,未测试
    @Action
    public async uploadPeople() {
        let alert: any = Message;
        await request.post('/api/workerlib/unit_teamgroup/export',{
            "conditionList": [
            ],
            "keywords" : [],
            "selectList": [
                {"field": "unit_number" ,"alias":"单位编号"},
                {"field": "unit_name","alias":"单位名称" },
                {"field": "unit_type" ,"alias":"单位类型"},
                //社会统一码

                {"field": "principal" ,"alias":"负责人"},
                //电话

                {"field": "count" ,"alias":"下属班组"},
                //在数据库中没有这个字段
                {"field": "project_name","alias":"所在项目" }
            ]
        }).then((data)=>{
            if(!data){
                return;
            }
            alert.success('成功！');
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
    public added(data: any) {
        if(data.status == 0) {
            this.search();
            let alert: any = Message;
            alert.warning('成功！');
        }
    }
}