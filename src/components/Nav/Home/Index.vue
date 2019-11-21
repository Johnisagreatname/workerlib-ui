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
         private twoOptions: any = {
             tooltip : {
                 trigger: 'item',
                 //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 show:false
             },
             toolbox: {
                 //是否显示工具栏组件
                 show : true,
                 feature : {
                     mark : {show: true},

                     magicType : {
                         show: true,
                         type: ['pie', 'funnel']
                     }

                 }
             },
             series : [
                 {
                     name:'工种人数',
                     type:'pie',
                     radius : [30, 150],
                     center : ['50%', '50%'],
                     roseType : 'area',
                     data:[
                         {value:12, name:'普工'},
                         {value:10, name:'电工'},
                         {value:26, name:'焊工'},
                         {value:20, name:'水泥工'},
                         {value:25, name:'钢筋工'},
                     ]
                 }
             ],
             color:['#4DA2FF','#6ADFC5', '#F86E6E', '#F9CC7B', '#BFC0FF',
                    '#F86E6E','#6ADFC5', '#4DA2FF', '#F9CC7B', '#BFC0FF']
         };
         private options: any = {

             series: [{
                 name:'工种人数',
                 type:'pie',
                 radius : [30, 170],
                 center : ['50%', '50%'],
                 roseType : 'area',
                 label: {
                     normal: {
                         show: false
                     }
                 },
                 data:[
                     {value:15, name:'一级'},
                     {value:19, name:'二级'},
                     {value:9, name:'三级'},
                     {value:20, name:'四级'},
                     {value:15, name:'五级'},
                     {value:30, name:'六级'},
                     {value:19, name:'七级'},
                     {value:28, name:'八级'},
                     {value:20, name:'九级'}
                 ]
             }
             ],
             itemStyle:{
                 borderWidth:20,
                 borderColor:'#fff',
             },

             color:['#4DA2FF','#6ADFC5', '#F86E6E', '#F9CC7B', '#BFC0FF',
                 '#F86E6E','#6ADFC5', '#4DA2FF', '#F9CC7B', '#BFC0FF']
         };

         mounted() {
             const ele = document.getElementById('myEcharts');
             const chart: any = this.$echarts.init(ele);
             chart.setOption(this.twoOptions);

             // const elet = document.getElementById('myEchart');
             // const charts: any = this.$echarts.init(elet);
             // charts.setOption(this.option);

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
