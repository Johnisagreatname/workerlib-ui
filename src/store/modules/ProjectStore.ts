import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "ProjectStore",
    store,
})
export default class ProjectStore extends VuexModule {

    public columns = [
        {
            type: 'selection',
            align: 'center'
        },
        {
            title: '项目名称',
            key: 'name',
            sortable: true
        },
        {
            title: '项目简介',
            key: 'synopsis',
            sortable: true
        },
        {
            title: '施工许可证',
            key: 'licence',
            sortable: true
        },
        {
            title: '开工时间',
            key: 'startTime',
            sortable: true
        },
        {
            title: '合同竣工时间',
            key: 'completedTime',
            sortable: true,
            width: 180
        },
        {
            title: '建设单位',
            key: 'construction',
            sortable: true
        },
        {
            title: '施工单位',
            key: 'constructionOrganization',
            sortable: true
        },
        {
            title: '监理单位',
            key: 'supervisor',
            sortable: true
        },
        {
            title: '操作',
            key: 'operation'
        }
    ];

    public data = [
        {
            name: '深圳创新科技园项目',
            synopsis: '深圳创新科技园项目',
            licence: '6945248',
            startTime: '2018-10-15',
            completedTime: '2019-10-26',
            construction: '大江集团',
            constructionOrganization: '深圳市政总',
            supervisor: '深圳鲁班',
            operation: '操作'
        },
        {
            name: '深圳创新科技园项目',
            synopsis: '深圳创新科技园项目',
            licence: '1486485',
            startTime: '2018-10-15',
            completedTime: '2019-10-26',
            construction: '大江集团',
            constructionOrganization: '深圳市政总',
            supervisor: '深圳鲁班',
            operation: '操作'
        },
        {
            name: '深圳创新科技园项目',
            synopsis: '深圳创新科技园项目',
            licence: '6975154',
            startTime: '2018-10-15',
            completedTime: '2019-10-26',
            construction: '大江集团',
            constructionOrganization: '深圳市政总',
            supervisor: '深圳鲁班',
            operation: '操作'
        },
        {
            name: '深圳创新科技园项目',
            synopsis: '深圳创新科技园项目',
            licence: '548634',
            startTime: '2018-10-15',
            completedTime: '2019-10-26',
            construction: '大江集团',
            constructionOrganization: '深圳市政总',
            supervisor: '深圳鲁班',
            operation: '操作'
        }
    ];

}
