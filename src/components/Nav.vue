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

        private menus!: any;

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
                        {secondName:'施工单位管理', path: '/1-1', text: '单位管理' }
                    ] },
                { name: '人员', icon: 'md-people',second:[
                        {secondName:'产业工人档案', path: '/worker', text: '产业工人档案'},
                        {secondName:'工资管理', path: '/contributive', text: '工资管理'},
                        {secondName:'出勤管理', path: '/2-2', text: '出勤管理'},
                        {secondName:'评价管理', path: '/comments', text: '评价管理'}
                    ] },
                { name: '培训', icon: 'ios-book',second:[
                        {secondName:'课件管理', path: '/comments', text: '课件管理'},
                        {secondName:'讲师档案', path: '/3-2', text: '讲师档案'},
                        {secondName:'试卷管理', path: '/3-3', text: '试卷管理'},
                        {secondName:'培训记录', path: '/3-4', text: '培训记录'}
                    ]},
                { name: '工种', path: '/1-5', icon: 'ios-build', text: '工种管理' },
                { name: '设置', path: '/1-6', icon: 'md-settings', text: '设置管理' },
            ];
            return this.menus;
        }

        select(e) : void {
          this['$router'].push(e);
          let selectedItem = this.menus.filter(a=>a.second.path == e)[0];
          if(!selectedItem){
              this.title = '首页';
              return;
          }
          this.title = selectedItem.text;
        }
    }
</script>

<style scoped src="@/styles/nav.css" />
<template lang="pug" src="@/views/nav.pug" />

