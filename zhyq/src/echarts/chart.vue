<template>
    <div id="line-chart">
        <Card dis-hover style="margin: 15px;background:none">
            <div :id="chart.id" style="height: 300px">

            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        name: "store-count",
        props: ['chart'],
        data() {
            return {
                xData: [],
                yData: [],
                title: "",
                subtext: "",
                type: "",
                data: "",
                title1: '',
                color: '',
                xmes: '',//折线柱状图x轴数据
                //模板数据
                eg_chart: {
                    //id具有唯一性
                    id: "lineChart",
                    type: "bar",
                    title: "11111",
                    data: [
                        {
                            text: '一月',
                            value: 40
                        },
                        {
                            text: '二月',
                            value: 32
                        },
                        {
                            text: '三月',
                            value: 48
                        },
                        {
                            text: '四月',
                            value: 38
                        },
                        {
                            text: '五月',
                            value: 33
                        },
                        {
                            text: '六月',
                            value: 43
                        },
                        {
                            text: '七月',
                            value: 40
                        },
                        {
                            text: '八月',
                            value: 43
                        },
                        {
                            text: '九月',
                            value: 46
                        }, {
                            text: '十月',
                            value: 40
                        },
                        {
                            text: '十一月',
                            value: 43
                        },
                        {
                            text: '十二月',
                            value: 37
                        }
                    ],
                    arr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                }
            }
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById(this.chart.id));
                // 绘制图表
                //line和bar形表格
                if (this.chart.type === 'bar' || this.chart.type === 'line') {
                    myChart.setOption({
                        title: {
                            text: this.title,
                            textStyle: {
                                fontSize: 16
                            }
                        },
                        color: this.color,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xData
                        },
                        yAxis: {
                            type: 'value',
                            axisPointer: {
                                snap: true
                            }
                        },
                        series: [{
                            data: this.yData,
                            type: this.type,
                            barMaxWidth:30,
                            itemStyle: {
                                emphasis: {
                                    barBorderRadius: 10
                                },
                                normal: {
                                    barBorderRadius: [200, 200, 1, 1],
                                    color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#c0b4fe'},
                                            {offset: 1, color: '#3399ff'}

                                        ]
                                    )
                                },
                            },
                        }]
                    });
                }
                //圈状图
                if (this.chart.type === 'pie') {
                    myChart.setOption({
                        title: {
                            text: this.title,
                            textStyle: {
                                fontSize: 16,
                            },
                            left: "center"
                        },
                        color: this.color,
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: this.xData
                        },
                        series: [
                            {
                                name: '所占百分比',
                                type: 'pie',
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
                                data: this.chart.data
                            }
                        ]
                    });
                }
                //line组合
                if (this.chart.type === 'bar2') {
                    myChart.setOption({
                        title: {
                            text: this.title,
                            subtext: this.subtext
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        color: this.color,
                        legend: {

                            data: this.title1
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xmes
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        series: this.data
                    })
                }

                //折线加柱状图
                if (this.chart.type === 'zxzzt') {
                    myChart.setOption({
                        title: {
                            text: this.title,
                            subtext: this.subtext
                        },
                        color: this.color,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {
                            data: this.title1
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xmes
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        series: this.data
                    })
                }

                //饼形图
                if (this.chart.type === 'bxt') {
                    myChart.setOption({
                        title: {
                            text: this.title,
                            subtext: this.subtext,
                            x: 'center',
                            textStyle: {
                                fontSize: 16,
                            }
                        },
                        color: this.color,
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: this.title1
                        },
                        series: [
                            {
                                name: '所占百分比',
                                type: 'pie',
                                radius: ['30%', '60%'],
                                data: this.data,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                            }
                        ]
                    })
                }
                // 多条折线图
                if (this.chart.type === 'moreLine') {
                    myChart.setOption({
                        title: {
                            text: this.title
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        color: this.color,
                        legend: {
                            data: this.title1
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xmes
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        series: this.data
                    })
                }

            },
            init() {

                //转换为符合要求的数据
                this.title = this.chart.title;
                this.subtext = this.chart.subtext;
                this.type = this.chart.type;
                this.color = this.chart.color;
                this.title1 = this.chart.title1;
                this.color = this.chart.color;   // 自定义lengend颜色
                this.xmes = this.chart.xmes;
                this.data = this.chart.data;
                this.chart.data.map((item) => {
                    this.xData.push(item.name)
                    this.yData.push(item.value)
                })
            }
        },
        mounted() {
            this.init();
            this.drawLine();
        },
        watch: {
            //观察option的变化
            chart: {
                handler(newVal, oldVal) {
                    this.init();
                    this.drawLine();
                },
                deep: true //对象内部属性的监听，关键。
            }
        }
    }
</script>
