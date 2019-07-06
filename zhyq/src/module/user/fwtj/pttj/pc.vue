<style scoped>
    .list li span {
        display: inline-block;
        width: 24%;
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
        text-align: right;
        font-size: 12px;
    }

    .style1 {
        font-size: 20px;
        font-weight: 500;
    }

    .style2 {
        font-size: 36px;
        font-weight: 500;
        color: #169BD5;
        margin-top: 50px;
    }

    .style3 {
        font-size: 36px;
        font-weight: 500;
        color: #FF9900;
        margin-top: 50px;
    }

    .num p {
        text-align: center;
    }

    .ivu-card {
        min-height: 334px;
    }

    .ivu-tabs-bar {
        position: relative;
    }

    .right {
        position: absolute;
        top: 0;
        right: 0;
    }

    .fwqs {
        font-size: 12px;
    }

    .right span {
        margin-right: 20px;
    }

    .big {
        font-size: 24px;
        color: #666;
        font-weight: 500;
        margin-right: 10px;
    }
</style>
<template>
    <div class="container">

        <Row>
            <Col span='16'>
                <Card style='margin:15px;'>
                    <p slot="title">访问趋势 </p>
                    <ul class='fwqs'>
                        <li>
                            <p><span class="big">210s</span><span>平均时长</span></p>
                            <p>
                                <Tabs :animated="false">
                                    <TabPane label="PV">
                            <p class='right'>
                                <span>7天</span>
                                <span>14天</span>
                                <span>30天</span>
                                <DatePicker type="daterange" :start-date="new Date(1991, 4, 14)" placement="bottom-end"
                                            style="width: 200px"></DatePicker>
                            </p>
                            <ec-chart :chart="bar_fwqs"></ec-chart>
                            </TabPane>
                            <TabPane label="UV">
                                <p class='right'>
                                    <span>7天</span>
                                    <span>14天</span>
                                    <span>30天</span>
                                    <DatePicker type="daterange" :start-date="new Date(1991, 4, 14)"
                                                placement="bottom-end" style="width: 200px"></DatePicker>
                                </p>
                                <ec-chart :chart="bar_fwqs"></ec-chart>
                            </TabPane>
                            </Tabs>
                            </p>
                        </li>
                    </ul>
                </Card>

            </Col>
            <Col span='8'>
                <Card style='margin:15px;'>
                    <p slot="title">业务排行榜 </p>
                    <a href="#" slot="extra"> 更多</a>
                    <ul class='list'>
                        <li class='top'>
                            选择日期：
                            <DatePicker type="date" placeholder="2018-09-21" style="width: 200px"></DatePicker>
                        </li>
                        <li class='tilte'>
                            <span style="color:#ccc;">排名</span><span>业务名称</span><span
                                style="color:#ccc;">访问次数</span><span style="color:#ccc;">占比</span>
                        </li>
                        <li v-for="item in $_List_$">
                            <span>{{item.paiming}}</span><span>{{item.qudao}}</span><span style="color:#00A753;">{{item.num}}</span>
                            <span>{{item.bili}}</span>
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span='8'>
                <Card style='margin:15px;'>
                    <p slot="title">访问用户占比 </p>
                    <ul class='num'>
                        <li class='style1'>
                            <Row> 总用户数：2000</Row>
                            <Row>
                                <Col span='12'>
                                    <p class='style2'>123</p>
                                    <p>内部员工数</p>
                                </Col>
                                <Col span='12'>
                                    <p class='style3'>22</p>
                                    <p>访问数</p>
                                </Col>
                            </Row>
                        </li>

                    </ul>
                </Card>
            </Col>
            <Col span='8'>
                <ec-chart :chart="bar_zdfwqk"></ec-chart>
            </Col>
            <!-- <Col span='8'><ec-chart :chart="bar_dyfwqk"></ec-chart></Col> -->
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
                $_num_$: 999,
                $_querycfg_$: {
                    mod: 'module',
                    params: {
                        cmd: 4
                    }
                },
                bar_fwqs: {
                    id: "bar_chartDataOne",
                    type: "moreLine",
                    title: "",
                    color: ['#3ecc00'],
                    xmes: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07'],
                    data: [
                        {
                            name: '',
                            type: 'line',
                            data: [30, 30, 30, 30, 30, 30, 30],
                        }
                    ]

                },
                $_List_$: [
                    {
                        paiming: '1',
                        qudao: '会议室',
                        num: '28',
                        bili: '35%'
                    }, {
                        paiming: '1',
                        qudao: '会议室',
                        num: '28',
                        bili: '35%'
                    }, {
                        paiming: '1',
                        qudao: '会议室',
                        num: '28',
                        bili: '35%'
                    }, {
                        paiming: '1',
                        qudao: '会议室',
                        num: '28',
                        bili: '35%'
                    }, {
                        paiming: '1',
                        qudao: '会议室',
                        num: '28',
                        bili: '35%'
                    }
                ],
                bar_dyfwqk: {
                    id: "bar_dyfwqk",
                    type: "pie",
                    title: "地域访问情况",
                    color: ['#5ea7f2', '#f5d861', '#ed8779', '#99d776', '#8f94ea'],
                    title1: ['杭州', '成都', '深圳', '深圳', '上海'],
                    data: [
                        {value: 1, name: '杭州'},
                        {value: 2, name: '成都'},
                        {value: 3, name: '深圳'},
                        {value: 4, name: '深圳'},
                        {value: 5, name: '上海'}
                    ]
                },
                bar_zdfwqk: {
                    id: "bar_zdfwqk",
                    type: "bxt",
                    title: "终端访问情况",
                    color: ['#5ea7f2', '#f5d861', '#ed8779', '#99d776', '#8f94ea'],
                    data: [
                        {value: 1, name: '小程序', type: 'pie'},
                        {value: 2, name: '公众号', type: 'pie'},
                        {value: 3, name: 'PC', type: 'pie'},
                        {value: 4, name: '安卓', type: 'pie'},
                        {value: 5, name: 'IOS', type: 'pie'}
                    ]
                }

            }
        },
        components: {
            ecChart
        },
        created() {
            this.$_fquery_$();
        },
        methods: {
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                        this.list = rsp.data.obj;
                    }
                }
            }

        }
    }
</script>