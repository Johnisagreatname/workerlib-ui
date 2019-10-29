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
                { name: '首页', path: '/home', icon: 'md-home', text: '数据中心' },
                { name: '项目', path: '/project', icon: 'ios-folder-open', text: '项目管理' },
                { name: '人员', path: '/worker', icon: 'md-people', text: '人员管理' },
                { name: '培训', path: '/worker', icon: 'ios-book', text: '培训管理' },
                { name: '工种', path: '/worker', icon: 'ios-build', text: '工种管理' },
                { name: '设置', path: '/worker', icon: 'md-settings', text: '设置管理' },
            ];
            return this.menus;
        }

        select(e) : void {
          this['$router'].push(e);
          let selectedItem = this.menus.filter(a=>a.path == e)[0];
          this.title = selectedItem.text;
        }
    }
</script>

<style scoped src="@/styles/nav.css" />
<template lang="pug" src="@/views/nav.pug" />

