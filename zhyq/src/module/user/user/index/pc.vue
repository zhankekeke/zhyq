<style scoped>
    .bg {
        box-sizing: border-box;
        padding: 10px;
        line-height: 30px;
    }

    .box {
        background: #FFF;
        display: inline-block;
        width: 16.6%;
        margin: 0 1.5%;
        box-sizing: border-box;
        padding: 10px;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        color: #ffffff;
    }

    .red {
        color: #FFF;
        font-size: 20px;
    }

    .center {
        text-align: center;
    }

    .list li span {
        display: inline-block;
        width: 25%;
        font-size: 12px;
        color: #333;
        height: 40px;
        line-height: 40px;
    }

    .list li span:nth-child(1) {
        width: 15%;
    }

    .list li span:nth-child(2) {
        width: 30%;
    }

    .list li span:nth-child(3) {
        width: 40%;
    }

    .list li span:nth-child(4) {
        width: 15%;
    }

    .list li {
        border-bottom: 1px solid #ebebeb;
        box-sizing: border-box;
        padding: 0 10px;
    }

    .newcard {
        margin-top: 2%;
        border-radius: 10px;
        /*box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);*/
    }

    >>> .ivu-card-body {
        padding: 10px;
    }

    >>> .ivu-card-bordered {
        margin: 0 !important;
        border: none !important;
    }

    >>> .ivu-card {
        border: 1px solid #f5f5f5;
    }

    >>> .ivu-card-head {
        margin: 0 10px;
    }

    >>> .ivu-progress-bg{
        background-image: linear-gradient(to right , #3399ff, #c0b4fe);
    }
</style>
<template>
    <div>
        <Row class="bg">
            <div class='box' style="background: no-repeat url(/static/zone/index1.png); background-size: 100% 100%">
                <p>企业入住数：<span class="red">{{$_ruzhu_$.totalCount}}</span></p>
                <p>今年入住：{{$_ruzhu_$.newCount}}</p>
                <p>企业入住率：<span class="red">{{$_ruzhu_$.zhanBi}}%</span></p>
            </div>
            <div class='box' style="background: no-repeat url(/static/zone/index2.png); background-size: 100% 100%">
                <p>园区总人数：</p>
                <p class="red center">{{$_renzhu_$.totalCount}}</p>
                <p>今年新注册：{{$_renzhu_$.newCount}}</p>
            </div>
            <div class='box' style="background: no-repeat url(/static/zone/index3.png); background-size: 100% 100%">
                <p>管家服务总次数：</p>
                <p class="red center">{{$_guanjia_$.totalCount}}</p>
                <p>30天服务次数：{{$_guanjia_$.agoCount}}</p>
            </div>
            <div class='box' style="background: no-repeat url(/static/zone/index4.png); background-size: 100% 100%">
                <p>园区总车辆数：</p>
                <p class="red center">{{$_cheliang_$.totalCount}}</p>
                <p>固定车位数：{{$_cheliang_$.fixedCount}}</p>
            </div>
            <div class='box' style="background: no-repeat url(/static/zone/index5.png); background-size: 100% 100%">
                <p>园区积分总额度：</p>
                <p class="red center">{{$_jifen_$.creditsTotal}}</p>
                <p>园区代金券总额度：{{$_jifen_$.voucherTotal}}</p>
            </div>
        </Row>
        <Row>
            <Col span='11' class="newcard">
                <Card  class="mCard"  style="width: 99%;border: 1px solid #e9eaec !important;">
                    <p slot="title"><img src="/static/zone/yuan.png"
                                         style="width: 20px; height: 20px; float: left"><span
                            style="float: left; margin-left: 15px;">入住企业行业分布</span></p>
                    <ec-chart :chart="bar_gdlrzqk"></ec-chart>
                </Card>
            </Col>
            <Col span='12' class="newcard" offset="1">
                <Card class="mCard"  style="width: 99%;margin-left: 1%;border: 1px solid #e9eaec !important;">
                    <p slot="title"><img src="/static/zone/yuan.png"
                                         style="width: 20px; height: 20px; float: left"><span
                            style="float: left; margin-left: 15px;">入驻企业规模分布</span></p>
                    <ec-chart :chart="bar_rzqygmfb"></ec-chart>
                </Card>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span='24'  class="newcard">
                <Card class="mCard"  style='margin-top:15px;border: 1px solid #e9eaec !important;'>
                    <p slot="title"><img src="/static/zone/yuan.png"
                                         style="width: 20px; height: 20px; float: left"><span
                            style="float: left; margin-left: 15px;">热门业务统计</span></p>
                    <!--<a href="#" slot="extra"> 全部</a>-->
                    <ul class='list'>
                        <li class='tilte'>
                            <span style="color:#ccc;">排名</span><span>业务名称</span><span
                                style="color:#ccc;">总次数</span><span style="color:#ccc;">周环比</span>
                        </li>
                        <li v-for="(item,index) in $_List_$">
                            <span>{{index+1}}</span><span>{{item.name}}</span><span>{{item.num}}<Progress
                                style="width:240px;margin-left: 20px;" :percent="100" hide-info
                                status="active"></Progress></span><span
                                style="color:#ec403f;;">{{item.bili}}</span>
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>


    </div>
</template>

<script>

    import ecChart from '@/echarts/chart';
    import controler from './controler.js';

    export default {
        mixins: [controler],
        name: "goods-count",
        data() {
            return {
                bar_gdlrzqk: {
                    id: "bar_gdlrzqk",
                    type: "bar",
                    color: ['#5f95d8'],
                    data: []
                },
                bar_rzqygmfb: {
                    id: "bar_rzqygmfb",
                    type: "bxt",
                    color: ['#f6c42f', '#ff6565', '#348ce5', '#6dd6c5', '#ffd27c', '#ffa9aa',],
                    data: []
                },
                $_List_$: [
                    {
                        paiming: '1',
                        name: '会议室预约',
                        num: '100',
                        bili: '100%'
                    }, {
                        paiming: '1',
                        name: '会议室预约',
                        num: '100',
                        bili: '100%'
                    }, {
                        paiming: '1',
                        name: '会议室预约',
                        num: '100',
                        bili: '100%'
                    }, {
                        paiming: '1',
                        name: '会议室预约',
                        num: '100',
                        bili: '100%'
                    }, {
                        paiming: '1',
                        name: '会议室预约',
                        num: '100',
                        bili: '100%'
                    }, {
                        paiming: '1',
                        name: '会议室预约',
                        num: '100',
                        bili: '100%'
                    },
                ],
                $_ruzhu_$: "",
                $_renzhu_$: "",
                $_guanjia_$: "",
                $_cheliang_$: "",
                $_jifen_$: ""
            }
        },
        components: {
            ecChart
        },
        created() {
            this.getinfo();
        },
        methods: {
            getinfo() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                //企业入住数
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${userInfo.zoneId}/enterprise/enter`,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_ruzhu_$ = {
                                    "newCount": rsp.data.data.newCount,
                                    "totalCount": rsp.data.data.totalCount,
                                    "zhanBi": ((rsp.data.data.enterCount / rsp.data.data.totalRoom)*100).toFixed(2)
                                };
                                if (rsp.data.data.enterCount == 0 || rsp.data.data.totalRoom == 0) {
                                    this.$_ruzhu_$.zhanBi = 0.00;
                                }
                            } else {
                                this.$_ruzhu_$ = {
                                    "newCount": '',
                                    "totalCount": '',
                                    "zhanBi": ''
                                }
                            }
                        }
                    }
                });

                //园区总人数
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${userInfo.zoneId}/employee/count`,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_renzhu_$ = rsp.data.data;
                            } else {
                                this.$_renzhu_$ = {
                                    "newCount": "",
                                    "totalCount": ""
                                }
                            }
                        }
                    }
                });

                //管家服务总次数
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/steward/statistic/${userInfo.zoneId}/steward/service/total`,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_guanjia_$ = rsp.data.data;
                            } else {
                                this.$_guanjia_$ = {
                                    "agoCount": '',
                                    "totalCount": ''
                                }
                            }
                        }
                    }
                });

                //园区总车辆数
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/car/zone/${userInfo.zoneId}/count`,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_cheliang_$ = rsp.data.data
                            } else {
                                this.$_cheliang_$ = {
                                    "fixedCount": '',
                                    "totalCount": ''
                                }
                            }
                        }
                    }
                });

                //园区积分总额度
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/operate/statistic/${userInfo.zoneId}/credits/count`,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_jifen_$ = rsp.data.data
                            } else {
                                this.$_jifen_$ = {
                                    "creditsTotal": "",
                                    "voucherTotal": ""
                                }
                            }
                        }
                    }
                });

                //入住企业行业分布
                //this.bar_gdlrzqk.data = [];
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${userInfo.zoneId}/enterprise/sectors`,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    //console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                for (let i = 0; i < rsp.data.data.length; i++) {
                                    let data = {};
                                    for(let key in this.$_global_$.industry){
                                        if(rsp.data.data[i].sectors == this.$_global_$.industry[key].value){
                                            data.name = this.$_global_$.industry[key].label
                                        }
                                    }
                                    data.value = rsp.data.data[i].sectorsCount;
                                    data.type = 'bar';
                                    this.bar_gdlrzqk.data.push(data);
                                }
                            } else {
                                this.bar_gdlrzqk.data.push({
                                    name: "暂无数据",
                                    value: 0,
                                    type: 'bar'
                                });
                            }
                        }
                    }
                });

                //入住企业规模分布
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${userInfo.zoneId}/enterprise/scale`,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                for (let key in rsp.data.data) {
                                    let data = {};
                                    if (key == '10') {
                                        data.name = '10人以下'
                                    }
                                    if (key == '50') {
                                        data.name = '11-50人'
                                    }
                                    if (key == '100') {
                                        data.name = '51-100人'
                                    }
                                    if (key == '200') {
                                        data.name = '101-200人'
                                    }
                                    if (key == '500') {
                                        data.name = '201-500人'
                                    }
                                    if (key == '500+') {
                                        data.name = '500人以上'
                                    }
                                    data.value = rsp.data.data[key];
                                    data.type = 'pie';
                                    this.bar_rzqygmfb.data.push(data);
                                }
                            }
                        }
                    }
                })

                //热门业务统计
            }
        }
    }
</script>

