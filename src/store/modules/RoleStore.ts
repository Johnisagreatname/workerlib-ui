import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import MessageUtils from "../../common/MessageUtils";
import {Message} from "iview";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "RoleStore",
    store,
})
export default class RoleStore extends VuexModule {
    constructor(e) {
        super(e);
        this.pageInfo = {
            pageIndex: 1,
            pageSize: 10
        };
        this.role = [];
        this.roleInfo = {};
    }

    public role: Array<RoleInfo>;
    public pageInfo: PageInfo;
    public roleInfo: RoleInfo;

    @Action
    public getParams(): any {
        return {
            "pageInfo": {
                "pageIndex": this.pageInfo.pageIndex,
                "pageSize": this.pageInfo.pageSize
            },
            "conditionList": [],
            "sortList": [],
            "groupList": [],
            "keywords": [],
            "selectList": []
        };
    }

    @Action
    public async search() {
        await request.post('/api/workerlib/role', await this.getParams()).then((data) => {
            this.success(data);
            this.count();
        }).catch((e) => {
            console.log(e)
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
    public async deleteRole() {
        await request.delete('/api/workerlib/role/' + this.roleInfo.roleid).then((data) => {
            this.added(data)
        }).catch((e) => {
            console.log(e)
            let alert: any = Message;
            if (!e) {
                alert.warning('未知错误！');
                return;
            }
            if (e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message);
                return
            }

            if (!e.message) {
                return;
            }

            alert.warning(e.message || e)
        });
    }

    @Action
    public async count() {
        await request.post('/api/workerlib/role/count', await this.getParams()).then((total) => {
            this.setPageTotal(total.data)
        }).catch((e) => {
            MessageUtils.warning(e);
        });
    }

    @Action
    public async insertRole() {
        await request.put('/api/workerlib/role', {
            "roleName": this.roleInfo.roleName,
            "roleId": this.roleInfo.roleName,
            "createBy": 1,
        }).then((data) => {
            this.added(data)
        }).catch((e) => {
            console.log(e)
            let alert: any = Message;
            if (!e) {
                alert.warning('未知错误！');
                return;
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
    public setRoleName(data: any) {
        this.roleInfo.roleName = data;
    }

    @Mutation
    public setRoleid(data: any) {
        this.roleInfo.roleid = data;
    }

    @Mutation
    public setDescription(data: any) {
        this.roleInfo.description = data;
    }

    @Mutation
    public setCreateTime(data: any) {
        this.roleInfo.createTime = data;
    }

    @Mutation
    public setCreateBy(data: any) {
        this.roleInfo.createBy = data;
    }

    @Mutation
    public success(data: any) {
        this.role = data.data;
    }

    @Action
    public added(data: any) {
        if (data.status == 0) {
            this.search();
        }
    }

    @Mutation
    public setPageTotal(total: any) {
        this.pageInfo = {
            pageIndex: this.pageInfo.pageIndex,
            pageSize: this.pageInfo.pageSize,
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
            title: '角色名',
            key: 'roleName',
            sortable: true
        },
        {
            title: '创建日期',
            key: 'createOn',
            sortable: true
        },
        {
            title: '详细操作',
            slot: 'operation',
            sortable: true
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
}

interface PageInfo {
    pageIndex?: number;
    pageSize?: number;
    pageCount?: number;
    totalRecords?: number;
}

interface RoleInfo {
    roleid?: string;
    roleName?: string;
    description?: string;
    createTime?: string;
    createBy?: number;
}
