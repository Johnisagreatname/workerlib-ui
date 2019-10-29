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
                '#FBB869','#FAAE4F','#F8A12C','#F69516','#FA8403'
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
             series : [
                 {
                     name: '访问来源',
                     type: 'pie',
                     radius : '55%',
                     center: ['50%', '60%'],
                     label: false,
                     data:[
                         {value:335, name:'直接访问'},
                         {value:310, name:'邮件营销'},
                         {value:1548, name:'搜索引擎'}
                     ],
                     color: function (params) {
                         var colorList = ['#fbb869', '#f6a73f', '#fa8403'];
                         return colorList[params.dataIndex];
                     }
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
