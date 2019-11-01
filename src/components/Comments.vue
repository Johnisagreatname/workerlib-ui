<script lang="ts">
    import "@/assets/css/common.css";
    import CommentsStore from '../store/modules/CommentsStore';
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
    export default class Comments extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(CommentsStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '离线', key: '0' },
                { value: '在线', key: '1' }
            ];
            return this.options;
        }
        getComments() : any{
            return this.store.comments;
        }


    }
</script>
<style scoped src="@/styles/comments.css" />
<template lang="pug" src="@/views/comments.pug" />
