<script lang="ts">
    import "@/assets/css/common.css";

    import { Component, Vue, Prop, Model} from 'vue-property-decorator';

     @Component({
        components:{
        },
        directives: { // 自定义指令
        },
        mounted() {
        },
         computed: {
             menuitemClasses: function () {
                 return [
                     'menu-item',
                     this.isCollapsed ? 'collapsed-menu' : ''
                 ]
             }
         }
    })
    export default class Home extends Vue {
         @Model('isCollapsed', { type: Boolean }) private isCollapsed!: boolean;

         public $echarts: any;
         private options: object = {
             tooltip: {
                 trigger: 'item',
                 formatter: "{a} <br/>{b}: {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 y: '20px',
                 x: '20px',
                 data:['普工','钢筋工','木工','电焊工','泥水工']
             },
             color:[
                '#2497DF','#6BC4C9','#31C137','#cdd853','#de7660'
             ],
             series: [
                 {
                     name:'访问来源',
                     type:'pie',
                     radius: ['50%', '70%'],
                     avoidLabelOverlap: false,
                     label: {
                         normal: {
                             show: false,
                             position: 'center'
                         },
                         emphasis: {
                             show: true,
                             textStyle: {
                                 fontSize: '30',
                                 fontWeight: 'bold'
                             }
                         }
                     },
                     labelLine: {
                         normal: {
                             show: false
                         }
                     },
                     data:[
                         {value:500, name:'普工'},
                         {value:200, name:'钢筋工'},
                         {value:150, name:'木工'},
                         {value:100, name:'电焊工'},
                         {value:50, name:'泥水工'},
                     ]
                 }
             ]
         };
         private mounted() {
             const ele = document.getElementById('myEcharts');
             const chart: any = this.$echarts.init(ele);
             chart.setOption(this.options);
         }

     }
</script>

<style scoped src="@/styles/home.css" />
<template lang="pug" src="@/views/home.pug" />

<!--<template>-->
    <!--<div>-->
        <!--<div id="myEcharts" style="width:500px;height:500px"></div>-->
    <!--</div>-->
<!--</template>-->
