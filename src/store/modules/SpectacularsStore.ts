import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";
import Echart from 'echarts';

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "SpectacularsStore",
    store,
})
export default class SpectacularsStore extends VuexModule {

    public workTypeList: Array<any>;
    public workTypeListCount: Array<any>;
    public cultivateCount: Array<any>;
    public appraiseList: Array<any>;
    public echartOptions : Array<any>;
    public echartSkill : Array<any>;
    public echartCultivate : Array<any>;
    public echartCultivateCount : Array<any>;
    public peopleTotal: number;
    public workTypeCount: number;
    public projectCount: any;
    public projectCountBE: any;
    public saleDate: Date;
    public saleMonthDate: Date;
    public $echarts: any;

    constructor(e){
        super(e);
        this.workTypeList = [];
        this.workTypeListCount = [];
        this.appraiseList = [];
        this.cultivateCount = [];
        this.peopleTotal = null;
        this.workTypeCount = null;
        this.projectCount = {};
        this.projectCountBE = {};
        this.saleDate = new Date();
        this.saleMonthDate = new Date();
        this.echartOptions = [];
        this.echartSkill = [];
        this.echartCultivate = [];
        this.echartCultivateCount = [];
        this.$echarts = Echart;
    }

    @Action
    public async searchWorkType() {
        await request.post('/api/workerlib/archives',
            {
                "pageInfo" : {
                    "pageIndex": 1,
                    "pageSize": 5
                },

                "conditionList": [{
                    "name": "work_type",
                    "value": null,
                    "algorithm": "NOT"
                }],

                "sortList": [{
                    "name": "total",
                    "desc": true
                }],

                "groupList" : [
                    "work_type"
                ],

                "keywords" : [],

                "selectList": [{
                    "field": "work_type",
                    "alias":"workType"
                },{
                    "field":"work_type",
                    "function": "COUNT",
                    "alias":"total"
                },{
                    "field":"certificate",
                    "function": "COUNT",
                    "alias":"certificateTotal"
                }
                ]
            }
        ).then((data)=>{
            if(data){
                this.successWorkType(data);
            }

        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async searchWorkTypeCount() {
        await request.post('/api/workerlib/archives',
            {
                "pageInfo" : {
                    "pageIndex": 1,
                    "pageSize": 8
                },

                "conditionList": [{
                    "name": "work_type",
                    "value": null,
                    "algorithm": "NOT"
                }],

                "sortList": [{
                    "name": "total",
                    "desc": true
                }],

                "groupList" : [
                    "work_type"
                ],

                "keywords" : [],

                "selectList": [{
                    "field": "work_type",
                    "alias":"workType"
                },{
                    "field":"work_type",
                    "function": "COUNT",
                    "alias":"total"
                }
                ]
            }
        ).then((data)=>{
            if(data){
                this.successWorkTypeCount(data);
            }

        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async skill() {
        debugger
        await request.post('/api/workerlib/grade',
            {
                "pageInfo" : {},

                "conditionList": [],

                "sortList": [{
                    "name": "value",
                    "desc": false
                }],

                "groupList" : [
                    "name"
                ],

                "keywords" : [],

                "selectList": []
            }
        ).then((data)=>{
            if(data){
                this.successSkill(data);
            }

        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async count() {
        await request.post('/api/workerlib/alluser/count', {
            "pageInfo" : {},

            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            this.setPeopleTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countWorkType() {
        await request.post('/api/workerlib/dictionaries/count', {
            "pageInfo" : {},

            "conditionList": [{
                "name": "category",
                "value": "工种",
                "algorithm": "EQ",
            }, ],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            this.setWorkTypeCount(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countProject() {
        await request.post('/api/workerlib/projectCount', {
            "pageInfo" : {},

            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            this.setProjectCount(total.data[0])
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countProjectBE() {
        await request.post('/api/workerlib/project_prople', {
            "pageInfo" : {},

            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            this.setProjectCountBE(total.data[0])
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countCultivate() {
        await request.post('/api/workerlib/cultivate_statistics', {
            "pageInfo" : {},

            "conditionList": [{
                "name": "year",
                "value": this.saleDate.getFullYear(),
                "algorithm": "EQ"
            }],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            this.setCultivateCount(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Action
    public async formatMonth(s) {

        if(s == null || s === undefined) {
            s = 0;
        }

        s++;

        if(s.toString().length < 2) {
            return '0' + s;
        }

        return s.toString();
    }

    @Action
    public async countCultivateCount() {
        debugger
        await request.post('/api/workerlib/cultivate_count', {
            "pageInfo" : {
                "pageIndex": 1,
                "pageSize": 5
            },

            "conditionList": [{
                "name": "ym",
                "value": this.saleMonthDate.getFullYear()+"-"+ await this.formatMonth(this.saleMonthDate.getMonth()),
                "algorithm": "EQ"
            }],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            this.setCultivateSucess(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countAppraiseCount() {
        await request.post('/api/workerlib/appraise_statistics', {
            "pageInfo" : {
                "pageIndex": 1,
                "pageSize": 4
            },

            "conditionList": [],

            "sortList": [],

            "groupList" : [],

            "keywords" : [],

            "selectList": []
        }).then((total)=>{
            this.setAppraiseSucess(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }

    @Mutation
    private successWorkType(data: any) {
        this.workTypeList = data.data;
    }
    //技能工种评定系统
    @Mutation
    private successSkill(data: any) {
        this.echartSkill = new Array<any>();
        for(let i = 0; i< data.data.length;i++) {
            let item = {};
            item["value"] = data.data[i].total;
            item["name"] = data.data[i].name;

            this.echartSkill.push(item);
        }
        const profession = document.getElementById('profession');
        const chartsProfession: any = this.$echarts.init(profession);
        let professions = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'item',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '1%',
                containLabel: true
            },
            xAxis:
                {
                    type: 'category',
                    data: ['一级', '二级', '三级', '四级', '五级', '六级', '七级', '八级', '九级'],
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ffffff',
                        }
                    }
                }

            ,
            yAxis: [
                {
                    type: 'value',
                    name:'人数',
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ffffff',
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '人数',
                    type: 'bar',
                    barWidth: '12',
                    data: this.echartSkill,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [7, 7, 0, 0],
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#006bff'},
                                    {offset: 1, color: '#00e2f5'}
                                ]
                            )
                        },
                        emphasis: {
                            barBorderRadius: [7, 7, 0,0],
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#006bff'},
                                    {offset: 1, color: '#00e2f5'}
                                ]
                            )
                        }
                    }
                }
            ]
        }

        chartsProfession.setOption(professions);

    }

    private itemStyles = [
        {color:"#41ccd3"},
        {color:"#2498e3"},
        {color:"#2268d4"},
        {color:"#d6c76e"},
        {color:"#d39255"},
        {color:"#35c87a"},
        {color:"#44ae2e"},
        {color:"#7d5dcc"}
    ];

    @Mutation
    private successWorkTypeCount(data: any) {
        this.echartOptions = new Array<any>();
        for(let i = 0; i< data.data.length;i++) {
            let item = {};
            item["value"] = data.data[i].total;
            item["name"] = data.data[i].workType;
            item["itemStyle"] = this.itemStyles[i];
            this.echartOptions.push(item);
        }

        const gzEcharts = document.getElementById('gzEcharts');
        const chartsgzEcharts: any = this.$echarts.init(gzEcharts);
        let gz = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name:'工种人数',
                    type:'pie',
                    radius : [14, 80],
                    center : ['50%', '50%'],
                    roseType : 'radius',


                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:this.echartOptions
                }

            ]
        }
        chartsgzEcharts.setOption(gz);

        this.workTypeListCount = data.data;
    }

    @Mutation
    public setPeopleTotal(total: any) {
            this.peopleTotal= total;

    }

    @Mutation
    public setWorkTypeCount(total: any) {
        this.workTypeCount= total;

    }
    @Mutation
    public setProjectCount(total: any) {
        this.projectCount= total;

    }
    @Mutation
    public setProjectCountBE(total: any) {
        this.projectCountBE= total;

    }
    @Mutation
    public setCultivateCount(data: any) {
        this.echartCultivate = new Array<any>();
        for(let i=1; i<=12; i++) {
            let item = [];
            let arr = data.filter(a=>a.value==i);
            if(arr!=null && arr.length>0) {
                this.echartCultivate.push(arr[0].total);
            }

            else {
                this.echartCultivate.push(0);
            }
        }

        const elet = document.getElementById('peoples');
        const charts: any = this.$echarts.init(elet);
        let peoples = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },

            grid: {
                left: '1%',
                right: '3%',
                top: '5%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: [{
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: '#012f75'
                    }
                },
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月 ', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 12,
                    },
                    formatter: function (value) {
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

                        color: '#012d6f',
                        width: 1, //这里是为了突出显示加上的
                    }
                }
            }],
            yAxis: [{
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#012f75'
                    }
                },
                min: 10,
                type: 'value',
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#012d6f',
                        width: 1, //这里是为了突出显示加上的
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: function (val) {
                        return val + '';
                    },
                    show: true,
                    textStyle: {
                        color: '#ffffff' //字体颜色
                    }
                }

            }],
            series: [
                {
                    name: '人数',
                    type: 'line',
                    smooth: false,  //是否平滑曲线显示
                    //  symbol: "none", //去掉折线点
                    stack: 100,
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#013990' // 0% 处的颜色
                            }, {
                                offset: 0.5,
                                color: '#002662' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: '#001a44' // 100% 处的颜色
                            }]), //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 0.5,
                                type: 'solid',
                                color: "#0047b1"
                            }
                        },
                        emphasis: {
                            color: '#001334',
                            lineStyle: { // 系列级个性化折线样式
                                width: 0.5,
                                type: 'dotted',
                                color: "#0050c5" //折线的颜色
                            }
                        }
                    }, //线条样式
                    symbolSize: 5, //折线点的大小
                    areaStyle: {
                        normal: {}
                    },
                    data: this.echartCultivate,
                }


            ]
        }
        charts.setOption(peoples);

        this.cultivateCount= data;

    }
    @Mutation
    public setCultivateSucess(data: any) {
        this.echartCultivateCount = data;

        const eleCultivate = document.getElementById('cultivate');
        const chartsCultivate: any = this.$echarts.init(eleCultivate);

        let cultivate = {
            legend: {
                show: false
            },

            grid: {
                left: '2%',
                right: '8%',
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
                    show: true,
                    lineStyle: {
                        color: '#0068ff',
                        width: 1,
                    }
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
                        show: true,
                        lineStyle: {
                            color: '#0068ff',
                            width: 1,
                        }
                    },
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            color: '#ffffff',
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    },
                    data: this.echartCultivateCount.map(x =>x.title)
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'right',
                        color: "#ffffff"
                    },
                    stack: '1',
                    yAxisIndex: 0,
                    data: this.echartCultivateCount.map(x =>x.total),
                    itemStyle: {
                        normal: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    {offset: 0, color: '#006bff'},
                                    {offset: 1, color: '#00e2f5'}
                                ]
                            )
                        },
                        emphasis: {
                            barBorderRadius: [0, 7, 7, 0],
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    {offset: 0, color: '#006bff'},
                                    {offset: 1, color: '#00e2f5'}
                                ]
                            )
                        }
                    },
                    barWidth: 15,   //图形宽度
                    z: 3
                }
            ]
        }
        chartsCultivate.setOption(cultivate);

    }
    @Mutation
    public setSaleDate (data: Date) {
        this.saleDate = data;

    }
    @Mutation
    public setSaleMonthDate (data: Date) {
        this.saleMonthDate = data;

    }
    @Mutation
    public setAppraiseSucess(data: any) {
        this.appraiseList = data;

    }

}
