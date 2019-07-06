<style scoped>
    .list li span {
        display: inline-block;
        width: 18%;
        font-size: 12px;
        color: #333;
        height: 40px;
        line-height: 40px;
    }

    .list li {
        border-bottom: 1px solid #ebebeb;
        box-sizing: border-box;
        padding: 0 10px;
    }

    .list .top span {
        width: 10%;
    }

    .list .top {
        border: none;
        text-align: center;
    }
</style>
<template>
    <div class="container">
        <Row>
            <p style="margin-left: 20px;">
                <span style="font-size: 14px;">请选择时间：</span>
                <span @click="gettime(7)">7天</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span @click="gettime(14)">14天</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span @click="gettime(30)">30天</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <DatePicker type="daterange"
                            placeholder="请选择时间段"
                            :start-date="new Date()"
                            placement="bottom-end"
                            style="width: 160px"
                            @on-change="gettime">
                </DatePicker>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style=" background-color: #fff;color: rgb(2, 155, 250);padding: 5px 8px;border: 1px solid rgb(2, 155, 250);margin-right: 8px;border-radius: 4px;"
                        @click="gettime('jifen')">积分商品
                </button>&nbsp;&nbsp;
                <button style=" background-color: #fff;color: rgb(2, 155, 250);padding: 5px 8px;border: 1px solid rgb(2, 155, 250);margin-right: 8px;border-radius: 4px;"
                        @click="gettime('xianjin')">现金商品
                </button>
            </p>
            <div style="clear: both"></div>
            <Col span='16'>
                <ec-chart :chart="bar_chartDataOne"></ec-chart>
            </Col>
            <Col span='8'>
                <Card style='margin:13px;'>
                    <p slot="title">热门商品统计 </p>
                    <!--<a href="#" slot="extra"> 全部</a>-->
                    <ul class='list'>
                        <li class='tilte'>
                            <span style="color:#ccc;">排名</span>
                            <span style="width: 22%">商品名称</span>
                            <span style="color:#ccc;text-align: center">订单数</span>
                            <span style="color:#ccc;text-align: center">销量</span>
                            <span style="color:#ccc;text-align: center">实付金额</span>
                        </li>
                        <li v-for="(item,index) in $_List_$">
                            <span>{{index+1}}</span>
                            <span style="width: 22%">{{item.goods_name}}</span>
                            <span style="color:#00A753; text-align: center">{{item.orderCount}}</span>
                            <span style="color:#00A753; text-align: center">{{item.saleCount}}</span>
                            <span style="color:#00A753; text-align: center">{{item.orderPrice}}</span>
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span='16'>
                <ec-chart :chart="bar_chartDataTwo"></ec-chart>
            </Col>
        </Row>
    </div>

</template>
<script>
    import controler from './controler.js';
    import ecChart from '../../../../echarts/chart';

    export default {
        mixins: [controler],
        name: "goods-count",
        data() {
            return {
                bar_chartDataOne: {
                    id: "bar_chartDataOne",
                    type: "zxzzt",
                    title: "商城收入统计",
                    color: ['#ff6565', '#348ce5', '#f6c42f'],
                    xmes: [],
                    title1: ['订单金额', '实付金额', '积分抵扣'],
                    data: [
                    ]
                },
                bar_chartDataTwo: {
                    id: 'bar_chartDataTwo',
                    type: 'moreLine',
                    title: '销量统计',
                    xmes: [],
                    title1: ['商品销量', '订单数'],
                    color: ["#ff6565", "#348ce5"],
                    data: []

                },
                $_List_$: '',
                hot_hys_endtime: "",
                hot_hys_starttime: "",
                type: "",
            }
        },
        components: {
            ecChart
        },
        created() {
            this.getinfo();
        },
        methods: {
            gettime(type) {
                if (type == 'jifen') {
                    this.type = 1
                }
                if (type == 'xianjin') {
                    this.type = 0
                }
                //获取当前日期
                let date1 = new Date();
                let endDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());

                if (type === 7) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_hys_endtime = endDay;
                    this.hot_hys_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 14) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_hys_endtime = endDay;
                    this.hot_hys_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 30) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_hys_endtime = endDay;
                    this.hot_hys_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type.length === 2) {
                    this.hot_hys_starttime = type[0];
                    this.hot_hys_endtime = type[1];
                }
                this.getinfo();
            },
            getinfo() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                let data1 = {};
                if (this.hot_hys_starttime && this.hot_hys_endtime) {
                    data1.startTime = this.hot_hys_starttime;
                    data1.endTime = this.hot_hys_endtime;
                } else {
                    //未选择时间默认7天
                    let date1 = new Date();
                    data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                    data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (this.type !== '') {
                    data1.type = this.type;
                }

                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/statistic/${userInfo.zoneId}/goods/income`,
                    data: data1,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                let dd = {
                                    name: '订单金额',
                                    type: 'line',
                                    data: [],
                                };
                                let sf = {
                                    name: '实付金额',
                                    type: 'line',
                                    data: [],
                                };
                                let jf = {
                                    name: '积分抵扣',
                                    type: 'bar',
                                    data: [],
                                };
                                this.bar_chartDataOne.xmes = [];
                                this.bar_chartDataOne.data = [];
                                for (let key in rsp.data.data) {
                                    this.bar_chartDataOne.xmes.push(key);
                                    if (rsp.data.data[key]) {
                                        dd.data.push(rsp.data.data[key].orderPrice);
                                        sf.data.push(rsp.data.data[key].realPrice);
                                        jf.data.push(rsp.data.data[key].pointPrice);
                                    } else {
                                        dd.data.push(0);
                                        sf.data.push(0);
                                        jf.data.push(0);
                                    }
                                }
                                this.bar_chartDataOne.data.push(dd);
                                this.bar_chartDataOne.data.push(sf);
                                this.bar_chartDataOne.data.push(jf);
                            }
                        }
                    }
                });


                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/statistic/${userInfo.zoneId}/goods/sales`,
                    data: data1,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                let sl = {
                                    name: '商品销量',
                                    type: 'line',
                                    data: [],
                                };
                                let cl = {
                                    name: '订单数',
                                    type: 'line',
                                    data: [],
                                };
                                this.bar_chartDataTwo.xmes = [];
                                this.bar_chartDataTwo.data = [];
                                for (let key in rsp.data.data.statisticData) {
                                    this.bar_chartDataTwo.xmes.push(key);
                                    if (rsp.data.data.statisticData[key]) {
                                        sl.data.push(rsp.data.data.statisticData[key].goodsCount);
                                        cl.data.push(rsp.data.data.statisticData[key].orderCount);
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

                let data2 = {
                    startTime:data1.startTime,
                    endTime:data1.endTime
                };
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/statistic/${userInfo.zoneId}/goods/hot`,
                    data: data2,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_List_$ = rsp.data.data;
                            }
                        }
                    }
                });
            },
        }
    }
</script>