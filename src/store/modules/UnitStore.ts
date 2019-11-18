import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "UnitStore",
    store,
})
export default class UnitStore extends VuexModule {

    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '所属项目',
            key: 'name',
            sortable: true
        },
        {
            title: '施工许可证',
            key: 'licence',
            sortable: true
        },
        {
            title: '参建单位编号',
            key: 'unitNum',
            sortable: true
        },
        {
            title: '参建单位名称',
            key: 'unitName',
            sortable: true
        },
        {
            title: '当前人数',
            key: 'peopleNum',
            sortable: true
        },
        {
            title: '单位类型',
            key: 'unitType',
            sortable: true
        },
        {
            title: '入场日期',
            key: 'time',
            sortable: true
        },
        {
            title: '负责人',
            key: 'principal',
            sortable: true
        },
        {
            title: '操作',
            key: 'operation'
        }
    ];

    public data = [
        {
            name: '观澜河流',
            licence: '123456',
            unitNum: '1192',
            unitName: '深圳市密码劳务公司',
            peopleNum: '12',
            unitType: '管理单位',
            time: '2018-01-01',
            principal: '某某某',
            operation: '操作'
        },
        {
            name: '观澜河流',
            licence: '123456',
            unitNum: '1192',
            unitName: '深圳市密码劳务公司',
            peopleNum: '12',
            unitType: '管理单位',
            time: '2018-01-01',
            principal: '某某某',
            operation: '操作'
        },
        {
            name: '观澜河流',
            licence: '123456',
            unitNum: '1192',
            unitName: '深圳市密码劳务公司',
            peopleNum: '12',
            unitType: '管理单位',
            time: '2018-01-01',
            principal: '某某某',
            operation: '操作'
        },
        {
            name: '观澜河流',
            licence: '123456',
            unitNum: '1192',
            unitName: '深圳市密码劳务公司',
            peopleNum: '12',
            unitType: '管理单位',
            time: '2018-01-01',
            principal: '某某某',
            operation: '操作'
        }
    ];

}
