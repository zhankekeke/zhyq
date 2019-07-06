<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .title1 {
        line-height: 30px;
        height: 30px;
    }

    .spanday {
        display: inline-block;
        width: 3%;
        text-align: center;
        line-height: 25px;
    }
</style>
<template>
    <div>
        <Row>
            <div>
                选择时间区间：
                <span class="spanday" @click="timeArrange(7)">7天</span>
                <span class="spanday" @click="timeArrange(14)">14天</span>
                <span class="spanday" @click="timeArrange(30)">30天</span>
                <DatePicker type="daterange"
                            placeholder="请选择时间段"
                            :start-date="new Date()"
                            placement="bottom-end"
                            style="width: 160px"
                            @on-change="getTime">
                </DatePicker>
            </div>
            <div style="clear: both"></div>
            <Col span='16'>
                <ec-chart :chart="bar_chartDataOne"></ec-chart>
            </Col>
            <Col span='8'>
                <Card dis-hover style="margin: 15px;background:none">
                    <p slot="title" class="title1">
                        发布企业统计 | 发布人数统计
                        <!--<Button style="float:right;" type="text" @click="$_fbtj_$()">全部</Button>-->
                    </p>
                    <Table :disabled-hover="true" :columns="qyfbColumns" :data="qyfbList"></Table>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span='16'>
                <ec-chart :chart="bar_chartDataTwo"></ec-chart>
            </Col>
            <Col span='8'>
                <Card dis-hover style="margin: 15px;background:none">
                    <p slot="title" class="title1">
                        热门活动
                        <!--<Button style="float:right;" type="text" @click="$_rmhd_$()">全部</Button>-->
                    </p>
                    <Table :disabled-hover="true" :columns="qyhdColumns" :data="qyhdList"
                           @on-sort-change="onSortChange"></Table>
                </Card>
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
                $_querycfg_$: {
                    mod: 'module',
                    params: {
                        cmd: 4
                    }
                },
                bar_chartDataOne: {
                    id: 'bar_chartDataOne',
                    type: 'moreLine',
                    title: '通知发布次数',
                    xmes: [],
                    title1: ['发布人数', '发布次数', '平均发布次数'],
                    color: ["#99d776", "#f5d861", "#5ea7f2"],
                    data: []

                },
                bar_chartDataTwo: {
                    id: 'bar_chartDataTwo',
                    type: 'moreLine',
                    title: '活动统计',
                    xmes: [],
                    title1: ['报名人数', '领取人数'],
                    color: ["#99d776", "#f5d861", "#5ea7f2"],
                    data: []

                },
                qyfbColumns: [
                    {
                        title: '排名',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '企业名称',
                        key: 'companyName',
                        align: 'center'
                    },
                    {
                        title: '发布次数',
                        key: 'publishCount',
                        align: 'center'
                    }
                ],
                qyhdColumns: [
                    {
                        title: '排名',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '活动名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '报名人数',
                        key: 'applyCount',
                        align: 'center',
                        sortable: 'custom'
                    },
                    {
                        title: '领取人数',
                        key: 'couponCount',
                        align: 'center',
                        sortable: 'custom'
                    }
                ],
                qyfbList: [],
                qyhdList: [],
                userInfo: '',
                startTime: '',
                endTime: ''
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            //未选择时间默认7天
            this.timeArrange(7)

        },
        methods: {


            //时间段整理
            timeArrange(type) {
                //获取当前日期
                let date1 = new Date();
                let endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                //获取日期
                let date2 = new Date();
                date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                let startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());

                this.getTJData(startTime, endTime);

            },

            onSortChange(value) {
                let type = value.key === 'applyCount' ? 1 : 2;
                this.getTopHD(this.startTime, this.endTime, type);
            },
            getTime(time) {
                this.getTJData(time[0], time[1]);
            },
            // 发布统计
            getTJData(startTime, endTime) {
                this.startTime = startTime;
                this.endTime = endTime;

                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/company/statistic/${this.userInfo.zoneId}/notice/publish/count`,
                    data: {
                        startTime: startTime,
                        endTime: endTime,
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                let fbrs = {
                                    name: '发布人数',
                                    type: 'line',
                                    data: [],
                                };
                                let fbcs = {
                                    name: '发布次数',
                                    type: 'line',
                                    data: [],
                                };
                                let pjfbrs = {
                                    name: '平均发布次数',
                                    type: 'line',
                                    data: [],
                                };
                                this.bar_chartDataOne.xmes = [];
                                this.bar_chartDataOne.data = [];
                                for (let key in rsp.data.data) {
                                    this.bar_chartDataOne.xmes.push(key);
                                    if (rsp.data.data[key]) {
                                        fbrs.data.push(rsp.data.data[key].peopleCount);
                                        fbcs.data.push(rsp.data.data[key].publishCount);
                                        pjfbrs.data.push(rsp.data.data[key].publishCount / rsp.data.data[key].peopleCount);
                                    } else {
                                        fbrs.data.push(0);
                                        fbcs.data.push(0);
                                        pjfbrs.data.push(0);
                                    }
                                }
                                this.bar_chartDataOne.data.push(fbrs);
                                this.bar_chartDataOne.data.push(fbcs);
                                this.bar_chartDataOne.data.push(pjfbrs);
                            }
                        }
                    }
                });
                // 通知发布企业统计

                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/company/statistic/${this.userInfo.zoneId}/notice/publish/count`,
                    data: {
                        startTime: startTime,
                        endTime: endTime,
                        groupBy: 1,
                        type: 0,//0代表发布次数；1代表发布人数
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.qyfbList = rsp.data.data.statisticData
                            }
                        }
                    }
                });
                // 园区活动统计

                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/company/statistic/${this.userInfo.zoneId}/activity`,
                    data: {
                        startTime: startTime,
                        endTime: endTime,
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                let bmrs = {
                                    name: '报名人数',
                                    type: 'line',
                                    data: [],
                                };
                                let lqrs = {
                                    name: '领取人数',
                                    type: 'line',
                                    data: [],
                                };

                                this.bar_chartDataTwo.xmes = [];
                                this.bar_chartDataTwo.data = [];
                                for (let key in rsp.data.data) {
                                    this.bar_chartDataTwo.xmes.push(key);
                                    if (rsp.data.data[key]) {
                                        bmrs.data.push(rsp.data.data[key].applyCount);
                                        lqrs.data.push(rsp.data.data[key].couponCount);
                                    } else {
                                        bmrs.data.push(0);
                                        lqrs.data.push(0);
                                    }
                                }
                                this.bar_chartDataTwo.data.push(bmrs);
                                this.bar_chartDataTwo.data.push(lqrs);
                            }
                        }
                    }
                });
                this.getTopHD(startTime, endTime, 1);
            },

            getTopHD(startTime, endTime, type) {
                // 园区活动统计 热门top10

                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/company/statistic/${this.userInfo.zoneId}/activity`,
                    data: {
                        startTime: startTime,
                        endTime: endTime,
                        groupBy: 1,
                        type: type,//1报名人数倒序；2领取人数倒序
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.qyhdList = rsp.data.data.statisticData
                            }
                        }
                    }
                });
            },

        }
    }
</script>