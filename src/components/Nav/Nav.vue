<script lang="ts">
    import "@/assets/css/common.css";
    import NavStore from '../../store/modules/NavStore';
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
    export default class Nav extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(NavStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private menus: Array<MenuInfo>;

        get title() : String {
            return this.store.title
        }

        set title(data: String) {
            this.store.setTitle(data)
        }

        getMenus() : any {
            if(this.menus) return this.menus;
            this.menus = [
                { name: '项目', icon: 'ios-folder-open',second:[
                        {secondName:'项目工程管理', path: '/nav/project', text: '工程管理' },
                        {secondName:'施工单位管理', path: '/nav/unit', text: '单位管理' }
                    ] },
                { name: '人员', icon: 'md-people',second:[
                        {secondName:'产业工人档案', path: '/nav/worker', text: '产业工人档案'},
                        {secondName:'工资管理', path: '/nav/contributive', text: '工资管理'},
                        {secondName:'出勤管理', path: '/nav/turnWork', text: '出勤管理'}
                    ] },
                { name: '培训', icon: 'ios-book',second:[
                        {secondName:'课件管理', path: '/nav/courseware', text: '课件管理'},
                        {secondName:'考试管理', path: '/nav/examinationPaper', text: '考试管理'},
                        {secondName:'课程管理', path: '/nav/cultivate', text: '课程管理'}
                    ]},
                { name: '技能鉴定', icon: 'md-people',second:[
                        {secondName:'技能鉴定', path: '/nav/checkEvaluate', text: '技能鉴定'}
                    ] },
                { name: '综合评价', icon: 'md-people',second:[
                        {secondName:'评价管理', path: '/nav/comments', text: '评价管理'}
                    ] },
                { name: '设置', icon: 'md-settings', second: [
                        {secondName:'账号', path: '/nav/account', text: '账号管理'},
                        {secondName:'工种', path: '/nav/workclass', text: '工种管理'},
                        {secondName:'评价', path: '/nav/commentType', text: '评价管理'},
                        {secondName:'题库', path: '/nav/options', text: '题库管理'}
                    ] }
            ];
            return this.menus;
        }

        select(e) : void {
          this['$router'].push(e);

            let selectedItem: any = null;
            for(let i=0; i<this.getMenus().length; i++) {
                for(let j=0; j<this.getMenus()[i].second.length; j++) {
                    let item:SubMenuInfo = this.getMenus()[i].second[j];
                    if(!item || item.path!=e) {
                        continue;
                    }

                    selectedItem = item;
                    break;
                }
            }
          if(!selectedItem){
              this.title = '产业工人档案';
              return;
          }
          this.title = selectedItem.text;
        }
    }

    interface MenuInfo {
        name?: string;
        icon?: string;
        path?: string;
        second?: Array<SubMenuInfo>;
        text?: string;
    }
    interface SubMenuInfo {
        secondName?: string;
        path?: string;
        text?: string;
    }
</script>

<style scoped src="@/styles/nav.css" />
<template lang="pug" src="@/views/nav.pug" />

