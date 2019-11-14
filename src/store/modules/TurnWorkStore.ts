import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "TurnWorkStore",
    store,
})
export default class TurnWorkStore extends VuexModule {
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
            title: '工种',
            key: 'typeWork',
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
            title: '设备',
            key: 'equipment',
            sortable: true
        }
    ];

    public data= [
        {
            name: '裴灏杰',
            project: '深圳创新科技园项目',
            construction: '深圳市市政工程总公司',
            typeWork: '木工',
            inOut: '进',
            time: '2019-10-01 08:34:12',
            equipment: '闸机'
        },
        {
            name: '范佳超',
            project: '深圳创新科技园项目',
            construction: '深圳市市政工程总公司',
            typeWork: '水泥工',
            inOut: '进',
            time: '2019-10-01 08:29:16',
            equipment: '人脸考勤机'
        },
        {
            name: '林陆锐',
            project: '深圳创新科技园项目',
            construction: '深圳市市政工程总公司',
            typeWork: '电工',
            inOut: '进',
            time: '2019-10-01 08:36:48',
            equipment: '闸机'
        },
        {
            name: '陈吕',
            project: '深圳创新科技园项目',
            construction: '深圳市市政工程总公司',
            typeWork: '焊工',
            inOut: '进',
            time: '2019-10-01 08:32:56',
            equipment: '移动考勤机'
        }
    ];
}
