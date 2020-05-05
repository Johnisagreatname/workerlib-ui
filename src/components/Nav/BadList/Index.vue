<!--
 * @Date         : 2020-05-04 10:26:23
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-05-05 08:57:49
 * @FilePath     : \src\components\Nav\BadList\Index.vue
 -->
<script lang="ts">
import "@/assets/css/common.css";
import CommentsStore from "../../../store/modules/CommentsStore";
import { Component, Vue, Prop, Model } from "vue-property-decorator";
import IGrid from "../../../common/components/IGrid.vue";
import { getModule } from "vuex-module-decorators";

@Component({
  components: {
    IGrid
  }
})
export default class BadList extends Vue {
  private store: any;
  constructor() {
    super();
    this.store = getModule(CommentsStore);
    this.store.search();
  }
 
  mounted() {}

  public columns = [
    { title: "姓名", key: "name" },
    { title: "所属项目", key: "projectName" },
    { title: "所属单位", key: "unitName" },
    { title: "工种", key: "workType" },
    { title: "处罚", key: "content" },
    { title: "处罚时间", key: "create_date" },
    { title: "操作", slot: "operation" }
  ];
}
</script>
<template lang="pug">
    IGrid(:columns="this.columns", :data="$store.state.CommentsStore.comments", :pageIndex="1", :pageSize="50",
        :serialNumber="true", :selection="true", :buttons="[{text:'详细操作1', action: ()=>{}},{text:'详细操作2', action: ()=>{}}]")
</template>
