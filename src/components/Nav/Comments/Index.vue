<script lang="ts">
    import "@/assets/css/common.css";
    import CommentsStore from '../../../store/modules/CommentsStore';
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
        vaueCustomText=5;
        vaueCustom=1;
        custom = 5;
        private store: any;
        public addCommtent: boolean;
        public commtentcInfo: boolean;
        constructor() {
            super();
            this.store = getModule(CommentsStore)
            this.addCommtent = false;
            this.commtentcInfo = false;

        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;

        private options!: any;
        getMenus() : any {
            if(this.options) return this.options;
            this.options = [
                { value: '在职', key: 1 },
                { value: '离职', key: 2 }
            ];
            return this.options;
        }

        private commentType!: any;
        getCommentType() : any {
            if(this.commentType) return this.commentType;
            this.commentType = [
                { value: '永久不予录入', key: 0 },
                { value: '其他', key: 1 }
            ];
            return this.commentType;
        }


        getComments() : any{
            return this.store.comments;
        }
        ok() : any{
            this.addCommtent = false;
        }
        cancel():any {
            this.addCommtent = false;
        }
        okInfo() : any{
            this.commtentcInfo = false;
        }
        cancelInfo():any {
            this.commtentcInfo = false;
        }

    }
</script>
<style scoped src="@/styles/comments.css" />
<template lang="pug" src="@/views/comments.pug" />
