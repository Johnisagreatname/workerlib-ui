<script lang="ts">
    import "@/assets/css/common.css";
    import CommentsStore from '../../../store/modules/CommentsStore';
    import { Component, Vue, Prop, Model} from 'vue-property-decorator';
    import getStore from '../../../common/ModuleHandler';
    import IGrid from '../../../common/components/IGrid.vue';

    @Component({
        components:{
            IGrid
        }
    })
    export default class BadList extends Vue {

        private store: any;
        constructor() {
            super();
            this.store = getStore(this, CommentsStore);
            this.store.search();
        }

        mounted() {

        }

        public columns = [
            { title: '姓名', key: 'name' },
            { title: '所属项目', key: 'projectName' },
            { title: '所属单位', key: 'unitName' },
            { title: '工种', key: 'workType' },
            { title: '处罚', key: 'content' },
            { title: '处罚时间', key: 'create_date' },
            { title: '操作', slot: 'operation' }
        ];
    }
</script>
<template lang="pug">
    IGrid(:columns="this.columns", :data="$store.state.CommentsStore.comments", :pageIndex="1", :pageSize="50",
        :serialNumber="true", :selection="true", :buttons="[{text:'详细操作', action: ()=>{}}]")
</template>
