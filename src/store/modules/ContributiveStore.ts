import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "ContributiveStore",
    store,
})
export default class ContributiveStore extends VuexModule {

    public columns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name',
            sortable: true
        },
        {
            title: '所属项目',
            key: 'project',
            sortable: true
        },
        {
            title: '所属参建单位',
            key: 'construction',
            sortable: true
        },
        {
            title: '应发工资',
            key: 'salary',
            sortable: true
        },
        {
            title: '实发工资',
            key: 'netPayroll',
            sortable: true
        },
        {
            title: '进出方向',
            key: 'inOut',
            sortable: true
        },
        {
            title: '时间',
            key: 'time',
            sortable: true
        },
        {
            title: '银行账号',
            key: 'bankAccount',
            sortable: true
        }
    ];

    public data = [
        {
            name: '裴灏杰',
            project: '深圳创新科技园项目',
            construction: '深圳市市政工程总公司',
            salary: '8000',
            netPayroll: '8000',
            inOut: '进',
            time: '2019-10-01',
            bankAccount: '620000002000000'
        },
        {
            name: '范佳超',
            project: '深圳创新科技园项目',
            construction: '深圳市市政工程总公司',
            salary: '8000',
            netPayroll: '8000',
            inOut: '进',
            time: '2019-10-01',
            bankAccount: '637000802000556'
        },
        {
            name: '林陆锐',
            project: '深圳创新科技园项目',
            construction: '深圳市市政工程总公司',
            salary: '8000',
            netPayroll: '8000',
            inOut: '进',
            time: '2019-10-01',
            bankAccount: '3785000000295800'
        },
        {
            name: '陈吕',
            project: '深圳创新科技园项目',
            construction: '深圳市市政工程总公司',
            salary: '8000',
            netPayroll: '8000',
            inOut: '进',
            time: '2019-10-01',
            bankAccount: '6208954522000090'
        }
    ];

}
