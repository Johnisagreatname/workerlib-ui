<script lang="ts">
    import "@/assets/css/common.css";
    import NavStore from '../store/modules/NavStore';
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
                        {secondName:'项目工程管理', path: '/project', text: '工程管理' },
                        {secondName:'施工单位管理', path: '/unit', text: '单位管理' }
                    ] },
                { name: '人员', icon: 'md-people',second:[
                        {secondName:'产业工人档案', path: '/worker', text: '产业工人档案'},
                        {secondName:'工资管理', path: '/contributive', text: '工资管理'},
                        {secondName:'出勤管理', path: '/turnWork', text: '出勤管理'}
                    ] },
                { name: '培训', icon: 'ios-book',second:[
                        {secondName:'线上', path: '/courseWare', text: '课件管理'},
                        {secondName:'课件管理', path: '/courseware', text: '课件管理'},
                        {secondName:'试卷管理', path: '/examinationPaper', text: '试卷管理'},
                        {secondName:'培训记录', path: '/cultivate', text: '培训记录'},
                        {secondName:'线下', path: '/offlineCourseWare', text: '课件管理'},
                        {secondName:'课件管理', path: '/offlineCourseware', text: '课件管理'},
                        {secondName:'讲师档案', path: '/lecturer', text: '讲师档案'},
                        {secondName:'培训记录', path: '/offlineCultivate', text: '培训记录'}
                    ]},
                { name: '技能鉴定', icon: 'md-people',second:[
                        {secondName:'技能鉴定', path: '/checkEvaluate', text: '技能鉴定'}
                    ] },
                { name: '综合评价', icon: 'md-people',second:[
                        {secondName:'评价管理', path: '/comments', text: '评价管理'}
                    ] },
                { name: '工种', path: '/1-5', icon: 'ios-build', text: '工种管理', second: [] },
                { name: '设置', path: '/1-6', icon: 'md-settings', text: '设置管理', second: [] }
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
              this.title = '首页';
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

