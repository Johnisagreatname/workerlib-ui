<script lang="ts">
    import "@/assets/css/common.css";
    import ExaminationPaperStore from '../../../store/modules/ExaminationPaperStore';
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
    export default class ExaminationPaper extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getModule(ExaminationPaperStore)
        }

        @Model('isCollapsed', { type: Boolean }) private isCollapsed !: boolean;
        getPaper() : any{
            return this.store.paper;
        }
    }
</script>
<style scoped src="@/styles/examinationPaper.css" />
<template lang="pug" src="@/views/examinationPaper.pug" />
