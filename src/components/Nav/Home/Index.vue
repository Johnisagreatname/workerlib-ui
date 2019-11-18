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
        //饼图
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
                '#3F9BFD','#9786F0','#F9CE33','#1CE9AE','#FF7A8F'
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
         private option: object = {
             width: '300px',
             height: '135px',
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 containLabel: true
             },

             xAxis: {
                 type: 'value',
                 boundaryGap: [0, 0.01]
             },
             yAxis: {
                 type: 'category',
                 data: ['瓦工教育','泥工教育','架子工教育','安全教育','铝模培训']
             },
             series: [
                 {
                     name: '2019年',
                     type: 'bar',
                     color: function (params) {
                         var colorList = ['#FF7A8F','#1CE9AE','#F9CE33','#9786F0','#3F9BFD'];
                         return colorList[params.dataIndex];
                     },
                     data: [50, 100, 56, 90, 120, 180]
                 }
             ]
         };
         private optionOne: object = {
             width: '200px',
             height: '135px',
             xAxis: {
                 type: 'category',
                 data: ['', '', '', '']
             },
             yAxis: {
                 type: 'value'
             },
             series: [{
                 data: [12, 15, 11, 20],
                 color: function (params) {
                     var colorList = ['#fbb869', '#faae4f', '#f69516','#fa8403'];
                     return colorList[params.dataIndex];
                 },
                 type: 'bar'
             }]
         };
         private optionTwo: object = {
             width: '500px',
             height: '500px',
             tooltip: {
                 trigger: 'item',
                 formatter: "{a} <br/>{b}: {c} ({d}%)"
             },
             series: [
                 {
                     name:'职业证书统计',
                     type:'pie',
                     radius: ['40%', '55%'],
                     color: function (params) {
                         var colorList = ['#3F9BFD','#9786F0','#F9CE33','#1CE9AE','#FF7A8F'];
                         return colorList[params.dataIndex];
                     },
                     data:[
                         {value:335, name:'电工'},
                         {value:310, name:'水泥工'},
                         {value:234, name:'木工'},
                         {value:102, name:'瓦工'},
                         {value:150, name:'电焊工'}
                     ]
                 }
             ]
         };
         private mounted() {
             const ele = document.getElementById('myEcharts');
             const chart: any = this.$echarts.init(ele);
             chart.setOption(this.options);

             const elet = document.getElementById('myEchart');
             const charts: any = this.$echarts.init(elet);
             charts.setOption(this.option);

             const myEchartOne = document.getElementById('myEchartOne');
             const chartsOne: any = this.$echarts.init(myEchartOne);
             chartsOne.setOption(this.optionOne);

             const myEchartTwo = document.getElementById('myEchartTwo');
             const chartsTwo: any = this.$echarts.init(myEchartTwo);
             chartsTwo.setOption(this.optionTwo);
         }
         value3 = 0
         setting = {
             autoplay: false,
             autoplaySpeed: 2000,
             dots: 'inside',
             radiusDot: false,
             trigger: 'click',
             arrow: 'hover'
         }

     }
</script>

<style scoped src="@/styles/home.css" />
<template lang="pug" src="@/views/home.pug" />
