<script lang="ts">
    import "@/assets/css/common.css";
    import Echart from 'echarts';
    Vue.prototype.$echarts = Echart;

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
         checked= 'week';
         carousel = 0
         setting = {
             autoplay: false,
             autoplaySpeed: 2000,
             dots: 'inside',
             radiusDot: false,
             trigger: 'click',
             arrow: 'hover'
         }

         constructor(e) {
             super(e);
             this.data.map((item, index) => {
                 this.seriesData.push({
                     name: '',
                     value: item,
                     itemStyle: {
                         normal: {
                             color: this.color[index],
                             barBorderRadius: 0
                         }
                     }
                 })
             })
         }

         dataIPSxAxis = ['一月', '二月', '三月', '四月 ', '五月', '六月','七月','八月','九月'];
         dataIPS = [20, 60, 50, 80.5, 120, 100, 90, 80, 130];

          yData = ['铝模培训', '安全教育', '架子工教育', '泥工教育', '瓦工教育'];
          data = [181, 214,260, 316, 350];
         color = ['#BFC0FF', '#F9CC7B', '#F86E6E', '#6ADFC5', '#4DA2FF'];
         seriesData = [];


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
                         {value:2000, name:'普工'},
                         {value:2500, name:'电工'},
                         {value:3000, name:'焊工'},
                         {value:3500, name:'水泥工'},
                         {value:4300, name:'钢筋工'},
                     ]
                 }
             ],
             color:['#4DA2FF','#6ADFC5', '#F86E6E', '#F9CC7B', '#BFC0FF',
                    '#F86E6E','#6ADFC5', '#4DA2FF', '#F9CC7B', '#BFC0FF']
         };
         private threeEcharts: any = {

             series: [{
                 name:'工种人数',
                 type:'pie',
                 radius : [15, 70],
                 center : ['51%', '45%'],
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
         private peoples:any={
             tooltip: {
                 trigger: 'axis',
                 axisPointer: {
                     type: 'line'
                 }
             },

             grid: {
                 left: '1%',
                 right: '12%',
                 top:'10%',
                 bottom: '5%',
                 containLabel: true
             },
             xAxis: [{
                 type: 'category',
                 boundaryGap: false,
                 data: this.dataIPSxAxis,
                 axisTick:{
                     show:false
                 },
                 axisLabel: {
                     show: true,
                     interval:0,
                     textStyle: {
                         color: '#000000',
                         fontSize: 12,
                     },
                     formatter: function(value) {
                         //debugger
                         var ret = ""; //拼接加\n返回的类目项
                         var maxLength = 5; //每项显示文字个数
                         var valLength = value.length; //X轴类目项的文字个数
                         var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                         if (rowN > 1) //如果类目项的文字大于3,
                         {
                             for (var i = 0; i < rowN; i++) {
                                 var temp = ""; //每次截取的字符串
                                 var start = i * maxLength; //开始截取的位置
                                 var end = start + maxLength; //结束截取的位置
                                 //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                 temp = value.substring(start, end) + "\n";
                                 ret += temp; //凭借最终的字符串
                             }
                             return ret;
                         } else {
                             return value;
                         }
                     },
                 },
                 axisLine: {
                     lineStyle: {
                         color: '#d8d8d8',
                         width: 1, //这里是为了突出显示加上的
                     }
                 }
             }],
             yAxis: [{
                 type: 'value',
                 axisLine: {
                     onZero: false,
                     lineStyle: {
                         color: '#d8d8d8',
                         width: 1, //这里是为了突出显示加上的
                     }
                 },
                 axisTick:{
                     show:false
                 },
                 axisLabel: {
                     formatter: function(val) {
                         return val + '';
                     },
                     show: true,
                     textStyle: {
                         color: '#000000' //字体颜色
                     }
                 },
                 splitLine:{
                     show:false,
                     lineStyle:{
                         type:'dashed'

                     }

                 },
             }],
             series: [
                 {
                     name: '人数',
                     type: 'line',
                     smooth: true,
                     //  symbol: "none", //去掉折线点
                     stack: 100,
                     itemStyle: {
                         normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                             color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                 offset: 0,
                                 color: '#4EA3FE' // 0% 处的颜色
                             }, {
                                 offset: 0.5,
                                 color: '#6BB0FE' // 100% 处的颜色
                             }, {
                                 offset: 1,
                                 color: '#d0e6fe' // 100% 处的颜色
                             }]), //背景渐变色
                             lineStyle: { // 系列级个性化折线样式
                                 width: 0.5,
                                 type: 'solid',
                                 color: "#62acfd"
                             }
                         },
                         emphasis: {
                             color: '#ffffff',
                             lineStyle: { // 系列级个性化折线样式
                                 width: 0.5,
                                 type: 'dotted',
                                 color: "#62acfd" //折线的颜色
                             }
                         }
                     }, //线条样式
                     symbolSize: 5, //折线点的大小
                     areaStyle: {
                         normal: {}
                     },
                     data: this.dataIPS,
                 }



             ]
         };
         private cultivate:any={
             legend: {
                 show: false
             },
             grid: {
                 left: '2%',
                 right: '10%',
                 bottom: '2%',
                 top: '2%',
                 containLabel: true
             },
             xAxis: {
                 type: 'value',
                 axisTick: {
                     show: false
                 },
                 axisLine: {
                     show: false
                 },
                 splitLine: {
                     show: false
                 },
                 axisLabel: {
                     show: false
                 }
             },
             yAxis: [
                 {
                     type: 'category',
                     axisTick: {
                         show: false
                     },
                     axisLine: {
                         show: false,
                         lineStyle: {
                             color: '#363e83'
                         }
                     },
                     axisLabel: {
                         inside: false,
                         textStyle: {
                             color: '#000000',
                             fontWeight: 'normal',
                             fontSize: 14
                         }
                     },
                     data: this.yData
                 }, {
                     type: 'category',
                     axisLine: {
                         show: false
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         show: false
                     },
                     splitArea: {
                         show: false
                     },
                     splitLine: {
                         show: false
                     },
                     data: this.yData
                 }, {
                     type: 'category',
                     axisLine: {
                         show: false
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         show: false
                     },
                     splitArea: {
                         show: false
                     },
                     splitLine: {
                         show: false
                     },
                     data: this.yData
                 }
                 ],
             series: [
                 {
                     name: '',
                     type: 'bar',
                     label:{
                         show:true,
                         position:'right'
                     },
                     stack: '1',
                     yAxisIndex: 0,
                     data: this.seriesData,
                     color: ['#6BF1BF', '#C7F895', '#E6D349', '#F8A065', '#FF6B5F'],
                     barWidth: 20,
                     z: 3
                 }
             ]
     };
         private profession : any={

             grid: {
                 left: '2%',
                 right: '10%',
                 top:'20%',
                 bottom: '5%',
                 containLabel: true
             },
             tooltip: {
                 trigger: "item",
                 axisPointer: {
                     type: "shadow",
                     label: {
                         show: true
                     }
                 }

             },

             xAxis: [{
                 data: [
                     "一级",
                     "二级",
                     "三级",
                     "四级",
                     "五级",
                     "六级",
                     "七级",
                     "八级",
                     "九级"
                 ],
                 axisTick: {
                     show: false //隐藏X轴刻度
                 },
                 axisLabel: {
                     show: true,
                     interval:0,
                     textStyle: {
                         color: "#383838" //X轴文字颜色
                     }
                 },
                 axisLine: {
                     lineStyle: {
                         color: '#d8d8d8',
                         width: 1, //这里是为了突出显示加上的
                     }
                 }
             }],
             yAxis: [{
                 type: "value",
                 name: "人数",
                 nameTextStyle: {
                     color: "#000000"
                 },
                 splitLine: {
                     show: false
                 },
                 axisTick: {
                     show: false
                 },
                 axisLabel: {
                     show: true,
                     textStyle: {
                         color: "#000000"
                     }
                 },
                 axisLine: {
                     lineStyle: {
                         color: '#000000'
                     }
                 },
             },
                 {
                     type: "value",
                     nameTextStyle: {
                         color: "#ebf8ac"
                     },
                     position: "right",
                     splitLine: {
                         show: false
                     },
                     axisTick: {
                         show: false
                     },
                     axisLine: {
                         show: false
                     },
                     axisLabel: {
                         show: false
                     }
                 },
                 {
                     type: "value",
                     gridIndex: 0,
                     min: 50,
                     max: 100,
                     splitNumber: 8,
                     splitLine: {
                         show: false
                     },
                     axisLine: {
                         show: false
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         show: false
                     }
                 }
             ],
             series: [{
                 name: "人数",
                 type: "line",
                 yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                 smooth: true, //平滑曲线显示
                 showAllSymbol: true, //显示所有图形。
                 // symbol: "arrow", //标记的图形为实心圆
                 symbolSize: 8, //标记的大小
                 itemStyle: {
                     //折线拐点标志的样式
                     color: "#f88d10"
                 },
                 lineStyle: {
                     color: "#4fa2fe"
                 },
                 data: [6500,6000, 7000, 6200, 6000,5800, 5900, 7100,6800]
             },
                 {
                     type: "bar",
                     barWidth: 8,
                     itemStyle: {
                         normal: {
                             color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                 offset: 0,
                                 color: "#4ea1ff"
                             },
                                 {
                                     offset: 1,
                                     color: "#79b8ff"
                                 }
                             ])
                         }
                     },
                     data: [6500,6000, 7000, 6200, 6000,5800, 5900, 7100,6800]
                 }
             ]
         };
         mounted() {
             const ele = document.getElementById('myEcharts');
             const chart: any = this.$echarts.init(ele);
             chart.setOption(this.twoOptions);

             const elet = document.getElementById('peoples');
             const charts: any = this.$echarts.init(elet);
             charts.setOption(this.peoples);

             const eleCultivate = document.getElementById('cultivate');
             const chartsCultivate: any = this.$echarts.init(eleCultivate);
             chartsCultivate.setOption(this.cultivate);

             const profession = document.getElementById('profession');
             const chartsProfession: any = this.$echarts.init(profession);
             chartsProfession.setOption(this.profession);

             const threeEcharts = document.getElementById('threeEcharts');
             const tc: any = this.$echarts.init(threeEcharts);
             tc.setOption(this.threeEcharts);
         }


     }
</script>

<style scoped src="@/styles/home.css" lang="css"></style>
<template lang="pug" src="@/views/home.pug" />
