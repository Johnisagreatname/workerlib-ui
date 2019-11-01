<script lang="ts">
    import "@/assets/css/common.css";
    import ContributiveStore from '../store/modules/ContributiveStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';

    @Component({
        components:{
        },
        directives: { // 自定义指令
        },
        mounted() {
        },
        computed: {
            menuitemClasses: () => {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    })
    export default class Contributive extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(ContributiveStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '离场', key: '0' },
                { value: '在场', key: '1' }
            ];
            return this.options;
        }

        columns4 = [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '所属项目',
                key: 'project'
            },
            {
                title: '参见单位',
                key: 'construction'
            },
            {
                title: '应发工资',
                key: 'salary'
            },
            {
                title: '实发工资',
                key: 'netPayroll'
            },
            {
                title: '进出方向',
                key: 'inOut'
            },
            {
                title: '时间',
                key: 'time'
            },
            {
                title: '银行账号',
                key: 'bankAccount'
            }
            ];

        data1 = [
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
            ]


    }
</script>
<style scoped src="@/styles/contributive.css" />
<template lang="pug" src="@/views/contributive.pug" />
