<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .title {
        line-height: 30px;
        height: 30px;
    }
</style>
<template>
    <div>
        <Row>
            <Col span='16'>
                <p style=" float: right; margin-right: 20px">
                    选择时间区间：
                    <DatePicker type="daterange"
                                placeholder="请选择时间段"
                                :start-date="new Date()"
                                placement="bottom-end"
                                style="width: 160px"
                                @on-change="getTime1">
                    </DatePicker>
                </p>
                <div style="clear: both"></div>
                <ec-chart :chart="bar_chartDataOne"></ec-chart>
            </Col>
            <Col span='8'>
                <p style=" float: right; margin-right: 20px">
                    选择时间区间：
                    <DatePicker type="daterange"
                                placeholder="请选择时间段"
                                :start-date="new Date()"
                                placement="bottom-end"
                                style="width: 160px"
                                @on-change="getTime2">
                    </DatePicker>
                </p>
                <div style="clear: both"></div>
                <Card dis-hover style="margin: 15px;background:none">
                    <p slot="title" class="title">
                        管家排名TOP10
                        <!--<Button style="float:right;" type="text" @click="$_pm_$()">全部</Button>-->
                    </p>
                    <Table :disabled-hover="true" :columns="$_columns1_$" :data="$_data1_$"></Table>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span='16'>
                <p style=" float: right; margin-right: 20px">
                    选择时间区间：
                    <DatePicker type="daterange"
                                placeholder="请选择时间段"
                                :start-date="new Date()"
                                placement="bottom-end"
                                style="width: 160px"
                                @on-change="getTime3">
                    </DatePicker>
                </p>
                <div style="clear: both"></div>
                <ec-chart :chart="bar_chartDataTwo"></ec-chart>
            </Col>
            <Col span='8'>
                <p style=" float: right; margin-right: 20px">
                    选择时间区间：
                    <DatePicker type="daterange"
                                placeholder="请选择时间段"
                                :start-date="new Date()"
                                placement="bottom-end"
                                style="width: 160px"
                                @on-change="getTime4">
                    </DatePicker>
                </p>
                <div style="clear: both"></div>
                <ec-chart :chart="bar_xflxtj"></ec-chart>
            </Col>
        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';
    import ecChart from '@/echarts/chart';

    export default {
        mixins: [controler],
        name: "goods-count",
        components: {
            ecChart
        },
        data() {
            return {
                bar_chartDataOne: {
                    id: 'bar_chartDataOne',
                    type: 'moreLine',
                    title: '管家服务次数（次数）',
                    xmes: [],
                    title1: ['总受理次数', '总处理次数'],
                    color: ["#ff6565", "#348ce5"],
                    data: []

                },
                bar_chartDataTwo: {
                    id: 'bar_chartDataTwo',
                    type: 'moreLine',
                    title: '管家响应时间（时间）',
                    xmes: [],
                    title1: ['平均受理时间', '平均处理时间'],
                    color: ["#ff6565", "#348ce5"],
                    data: [
                        {
                            name: '平均受理时间',
                            type: 'line',
                            data: [],
                        },
                        {
                            name: '平均处理时间',
                            type: 'line',
                            data: [],
                        }
                    ]

                },
                bar_xflxtj: {
                    id: "bar_xflxtj",
                    type: "bxt",
                    color: ["#f6c42f", "#ff6565", "#348ce5"],
                    title: "服务分类统计",
                    data: []
                },
                $_columns1_$: [
                    {
                        title: '排名',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    },
                    {
                        title: '管家名称',
                        key: 'stewardName'
                    },
                    {
                        title: '服务次数',
                        key: 'serviceCount',
                        align: 'center'
                    },
                    {
                        title: '处理时间(h)',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', (params.row.handlerTime / 60).toFixed(2));
                        }
                    },
                    {
                        title: '综合评分',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', (params.row.avgScore / 20).toFixed(2));
                        }
                    }
                ],
                $_data1_$: [],
                time: ''
            }
        },
        created() {
            this.getinfo();
        },
        methods: {
            getTime1(time) {
                this.time = time;
                this.getinfo(1);
            },
            getTime2(time) {
                this.time = time;
                this.getinfo(2);
            },
            getTime3(time) {
                this.time = time;
                this.getinfo(3);
            },
            getTime4(time) {
                this.time = time;
                this.getinfo(4);
            },
            getinfo(num = '') {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                let data1 = {};
                if (num && this.time[0]) {
                    data1.endTime = this.time[1];
                    data1.startTime = this.time[0];
                } else {
                    //未选择时间默认7天
                    let date1 = new Date();
                    data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                    data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());

                }
                if (num == 1 || num == '') {
                    //管家服务次数
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + `/steward/statistic/${userInfo.zoneId}/steward/service/count`,
                        data: data1,
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                if (rsp.data.data) {
                                    let zsl = {
                                        name: '总受理次数',
                                        type: 'line',
                                        data: [],
                                    };
                                    let zcl = {
                                        name: '总处理次数',
                                        type: 'line',
                                        data: [],
                                    };
                                    this.bar_chartDataOne.xmes = [];
                                    this.bar_chartDataOne.data = [];
                                    for (let key in rsp.data.data) {
                                        this.bar_chartDataOne.xmes.push(key);
                                        if (rsp.data.data[key]) {
                                            zsl.data.push(rsp.data.data[key].receiveCount);
                                            zcl.data.push(rsp.data.data[key].handlerCount);
                                        } else {
                                            zsl.data.push(0);
                                            zcl.data.push(0);
                                        }
                                    }
                                    this.bar_chartDataOne.data.push(zsl);
                                    this.bar_chartDataOne.data.push(zcl);
                                }
                            }
                        }
                    });
                }
                if (num == 3 || num == '') {
                    //管家响应时间
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + `/steward/statistic/${userInfo.zoneId}/steward/service/times`,
                        data: data1,
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                if (rsp.data.data) {
                                    let sl = {
                                        name: '平均受理时间',
                                        type: 'line',
                                        data: [],
                                    };
                                    let cl = {
                                        name: '平均处理时间',
                                        type: 'line',
                                        data: [],
                                    };
                                    this.bar_chartDataTwo.xmes = [];
                                    this.bar_chartDataTwo.data = [];
                                    for (let key in rsp.data.data) {
                                        this.bar_chartDataTwo.xmes.push(key);
                                        if (rsp.data.data[key]) {
                                            sl.data.push(Math.round(rsp.data.data[key].responseTime / 60));
                                            cl.data.push(Math.round(rsp.data.data[key].handlerTime / 60));
                                        } else {
                                            sl.data.push(0);
                                            cl.data.push(0);
                                        }
                                    }
                                    this.bar_chartDataTwo.data.push(sl);
                                    this.bar_chartDataTwo.data.push(cl);
                                }
                            }
                        }
                    });
                }
                if (num == 2 || num == '') {
                    //管家排名
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + `/steward/statistic/${userInfo.zoneId}/steward/rank`,
                        data: data1,
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                if (rsp.data.data) {
                                    this.$_data1_$ = rsp.data.data;
                                }
                            }
                        }
                    });
                }
                if (num == 4 || num == '') {
                    //服务分类
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + `/steward/statistic/${userInfo.zoneId}/steward/service/category`,
                        data: data1,
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                if (rsp.data.data) {
                                    this.bar_xflxtj.data = [];
                                    for (let i = 0; i < rsp.data.data.length; i++) {
                                        let data = {};
                                        data.name = rsp.data.data[i].typeName;
                                        data.value = rsp.data.data[i].count;
                                        this.bar_xflxtj.data.push(data);
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }
    }
</script>