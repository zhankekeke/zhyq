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

    .list .top button {
        background-color: #fff;
        color: rgb(2, 155, 250);
        padding: 5px 8px;
        border: 1px solid rgb(2, 155, 250);
        margin-right: 8px;
        border-radius: 4px;
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
        min-height: 533px;
    }

    .res {
        position: relative;
    }

    .right {
        position: absolute;
        top: 0;
        right: 0;
    }

    .list .tian span {
        display: inline;
    }

    .list .tian {
        margin-bottom: 10px;
        border: none;
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

    .btn {
        border: 1px solid #cccccc;
        border-radius: 5px;
        background: #fff;
        color: #ccc;
        padding: 5px 10px;
    }
</style>
<template>
    <div class="container">

        <Row>
            <!-- 会议室使用率 -->
            <Col span='16'>
                <Card style='margin:15px;'>
                    <p slot="title">会议室使用量 </p>
                    <ul class='fwqs'>
                        <li class='res'>
                            <p>
                                <br>
                                <br>
                                <!--<span v-if="hot_syl_avg" class="big">{{hot_syl_avg}}%</span>-->
                                <!--<span v-else class="big">0%</span>-->
                                <!--<span>平均</span>-->
                            </p>
                            <p class='right'>
                                <span @click="hotSyl(7)">7天</span>
                                <span @click="hotSyl(14)">14天</span>
                                <span @click="hotSyl(30)">30天</span>
                                <DatePicker type="daterange"
                                            placeholder="请选择时间段"
                                            :start-date="new Date()"
                                            placement="bottom-end"
                                            style="width: 160px"
                                            @on-change="hotSyl">
                                </DatePicker>
                            </p>
                            <ec-chart :chart="bar_fwqs"></ec-chart>
                        </li>
                    </ul>
                </Card>
            </Col>
            <!-- 热门会议室 -->
            <Col span='8'>
                <Card style='margin:15px;'>
                    <p slot="title">热门会议室 </p>
                    <!--<a href="#" slot="extra"> 全部</a>-->
                    <ul class='list'>
                        <li class='top'>
                            <button @click="hotHys('cishu')">使用次数</button>
                            <button @click="hotHys('shishang')">使用时长</button>
                            <button @click="hotHys('renshu')">参会人数</button>
                            <span style="color:rgb(51,51,51);font-size:14px;">
                                平均：
                                <span v-if="hot_hys_avg"
                                      style="color:rgb(255,203,0); font-size: 20px">{{hot_hys_avg}}</span>
                                <span v-else style="color:rgb(255,203,0); font-size: 20px">0</span>
                            </span>
                        </li>
                        <li class="tian">
                            <p class='right' style="position:static;">
                                <span @click="hotHys(7)">7天</span>
                                <span @click="hotHys(14)">14天</span>
                                <span @click="hotHys(30)">30天</span>
                                <DatePicker type="daterange"
                                            placeholder="请选择时间段"
                                            :start-date="new Date()"
                                            placement="bottom-end"
                                            style="width: 160px"
                                            @on-change="hotHys"
                                >
                                </DatePicker>
                            </p>
                        </li>
                        <li class='tilte'>
                            <span style="color:#ccc; width: 15%">排名</span>
                            <span style="width: 33%">会议室名称</span>
                            <span style="color:#ccc;">参会人数</span>
                            <span style="color:#ccc;">使用次数</span>
                        </li>
                        <li v-for="(item,index) in $_List_$">
                            <span style="width: 15%">{{index+1}}</span>
                            <span style="width: 33%;">{{item.meetingRoomName}}</span>
                            <span>{{item.attendCount}}</span>
                            <span style="color:#00A753;">{{item.usedCount}}</span>
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
        <Row>
            <!-- 会议室使用时长 -->
            <Col span='16'>
                <Card style='margin:15px;'>
                    <p slot="title">会议室使用时长 </p>
                    <ul class='fwqs'>
                        <li class='res'>
                            <p>
                                <span v-if="hot_sysc_avg" class="big">{{hot_sysc_avg}}小时</span>
                                <span v-else class="big">0小时</span>
                                <span>平均使用时长</span></p>
                            <p class='right'>
                                <span @click="hotSysc(7)">7天</span>
                                <span @click="hotSysc(14)">14天</span>
                                <span @click="hotSysc(30)">30天</span>
                                <DatePicker type="daterange"
                                            placeholder="请选择时间段"
                                            :start-date="new Date()"
                                            placement="bottom-end"
                                            style="width: 160px"
                                            @on-change="hotSysc">
                                </DatePicker>
                            </p>
                            <ec-chart :chart="bar_hyssysc"></ec-chart>
                        </li>
                    </ul>
                </Card>
            </Col>
            <!-- 热门企业 -->
            <Col span='8'>
                <Card style='margin:15px;'>
                    <p slot="title">热门企业 </p>
                    <!--<a href="#" slot="extra"> 全部</a>-->
                    <ul class='list'>
                        <li class='top'>
                            <button @click="hotQy('cishu')">使用次数</button>
                            <button @click="hotQy('shishang')">使用时长</button>
                            <button @click="hotQy('renshu')">参会人数</button>
                            <span style="color:rgb(51,51,51);font-size:14px;">
                                平均：
                                <span v-if="hot_qy_avg"
                                      style="color:rgb(255,203,0); font-size: 20px">{{hot_qy_avg}}</span>
                                <span v-else style="color:rgb(255,203,0); font-size: 20px">0</span>
                            </span>
                        </li>
                        <li class="tian">
                            <p class='right' style="position:static;">
                                <span @click="hotQy(7)">7天</span>
                                <span @click="hotQy(14)">14天</span>
                                <span @click="hotQy(30)">30天</span>
                                <DatePicker type="daterange"
                                            placeholder="请选择时间段"
                                            :start-date="new Date()"
                                            placement="bottom-end"
                                            style="width: 160px"
                                            @on-change="hotQy">
                                </DatePicker>
                            </p>
                        </li>
                        <li class='tilte'>
                            <span style="color:#ccc; width: 15%">排名</span>
                            <span style="width: 33%">企业名称</span>
                            <span style="color:#ccc;">参会人数</span>
                            <span style="color:#ccc;">使用次数</span>
                        </li>
                        <li v-for="(item,index) in $_ListQy_$">
                            <span style="width: 15%">{{index+1}}</span>
                            <span style="width: 33%;">{{item.companyName}}</span>
                            <span>{{item.attendCount}}</span>
                            <span style="color:#00A753;">{{item.usedCount}}</span>
                        </li>
                    </ul>
                </Card>

            </Col>
        </Row>
        <Row>
            <!-- 会议室预约统计 -->
            <Col span='16'>
                <Card style='margin:15px;'>
                    <p slot="title">会议室预约统计 </p>
                    <ul class='fwqs'>
                        <li class='res'>
                            <p>
                                <button class="btn" @click="hotYytj(7)" style="color: rgb(2,155,250);border: 1px solid rgb(2,155,250)">未来七天</button>
                            </p>
                            <ec-chart :chart="bar_hysyytj"></ec-chart>
                        </li>
                    </ul>
                </Card>
            </Col>
            <!-- 热门预约 -->
            <Col span='8'>
                <Card style='margin:15px;'>
                    <p slot="title">热门预约 </p>
                    <!--<a href="#" slot="extra"> 全部</a>-->
                    <ul class='list'>
                        <li class='top' style="float: left">
                            <button @click="hotYy('shishang')">预约时长</button>
                            <button @click="hotYy('cishu')">预约次数</button>
                        </li>
                        <div style="clear: both"></div>
                        <div style="color:rgb(51,51,51);font-size:14px;padding:10px">
                            平均提前预约时长：
                            <span v-if="hot_yy_avg" style="color:rgb(255,203,0); font-size: 20px;">{{hot_yy_avg}}</span>
                            <span v-else style="color:rgb(255,203,0); font-size: 20px;">0</span>
                            小时
                        </div>
                        <!--<li class="tian">-->
                        <!--<p class='right' style="position:static;">-->
                        <!--<span @click="hotYy(7)">7天</span>-->
                        <!--<span @click="hotYy(14)">14天</span>-->
                        <!--<span @click="hotYy(30)">30天</span>-->
                        <!--<DatePicker type="daterange"-->
                        <!--:start-date="new Date()"-->
                        <!--placement="bottom-end"-->
                        <!--style="width: 160px"-->
                        <!--@on-change="hotYy">-->
                        <!--</DatePicker>-->
                        <!--</p>-->
                        <!--</li>-->
                        <li class='tilte'>
                            <span style="color:#ccc; width: 15%">排名</span>
                            <span style="width: 33%">会议室名称</span>
                            <span style="color:#ccc;">预约时长(分)</span>
                            <span style="color:#ccc;">使用次数</span>
                        </li>
                        <li v-for="(item,index) in $_ListYy_$">
                            <span style="width: 15%">{{index+1}}</span>
                            <span style="width: 33%;">{{item.meetingRoomName}}</span>
                            <span>{{item.reserveTime}}</span>
                            <span style="color:#00A753;">{{item.usedCount}}</span>
                        </li>
                    </ul>
                </Card>

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
                $_num_$: 999,
                //热门会议室参数
                $_List_$: '',
                hot_hys_avg: 0,
                hot_hys_type: '',
                hot_hys_starttime: '',
                hot_hys_endtime: '',

                //热门企业参数
                $_ListQy_$: '',
                hot_qy_avg: 0,
                hot_qy_type: '',
                hot_qy_starttime: '',
                hot_qy_endtime: '',

                //热门预约参数
                $_ListYy_$: '',
                hot_yy_avg: 0,
                hot_yy_type: '',
                hot_yy_starttime: '',
                hot_yy_endtime: '',

                //会议室使用率参数
                bar_fwqs: {
                    id: "bar_chartDataOne",
                    type: "moreLine",
                    title: "",
                    color: ['#3399FE', '#FE0000', '#FFCC00'],
                    xmes: [],
                    data: []

                },
                hot_syl_avg: 0,
                hot_syl_type: '',
                hot_syl_starttime: '',
                hot_syl_endtime: '',

                //会议室使用时长参数
                bar_hyssysc: {
                    id: "bar_hyssysc",
                    type: "zxzzt",
                    title: "",
                    color: ['#3399FE', '#FE0000', '#FFCC00'],
                    xmes: [],
                    title1: ['空闲', '已约', '清扫',],
                    data: []
                },
                hot_sysc_avg: 0,
                hot_sysc_type: '',
                hot_sysc_starttime: '',
                hot_sysc_endtime: '',

                //会议室使用时长参数
                bar_hysyytj: {//会议室预约统计
                    id: "bar_hysyytj",
                    type: "zxzzt",
                    title: "",
                    color: ['#3399FE', '#FE0000', '#FFCC00'],
                    xmes: [],
                    title1: ['空闲', '已约', '清扫',],
                    data: []
                },
                hot_yytj_avg: 0,
                hot_yytj_type: '',
                hot_yytj_starttime: '',
                hot_yytj_endtime: '',
            }
        },
        components: {
            ecChart
        },
        created() {
            this.hotHysInfo();
            this.hotQyInfo();
            this.hotYyInfo();
            this.hotSylInfo();
            this.hotSyscInfo();
            this.hotYytjInfo();
        },
        methods: {
            //热门会议室查询条件整理
            hotHys(type) {
                if (type === 'cishu') {
                    this.hot_hys_type = 0;
                }
                if (type === 'shishang') {
                    this.hot_hys_type = 1;
                }
                if (type === 'renshu') {
                    this.hot_hys_type = 2;
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
                this.hotHysInfo();
            },
            //热门会议室查询
            hotHysInfo() {
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
                if (this.hot_hys_type !== '') {
                    data1.type = this.hot_hys_type;
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/statistic/${userInfo.zoneId}/meeting/hot`,
                    data: data1,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_List_$ = rsp.data.data;
                                let count = 0;
                                for (let i = 0; i < this.$_List_$.length; i++) {
                                    count += this.$_List_$[i].usedCount;
                                }
                                this.hot_hys_avg = Math.round(count / this.$_List_$.length);
                            } else {
                                this.$_List_$ = [
                                    {
                                        "usedTime": '',
                                        "meetingRoomName": '',
                                        "id": '',
                                        "attendCount": '',
                                        "usedCount": ''
                                    }]
                            }
                        }
                    }
                })
            },




            //热门企业查询条件整理
            hotQy(type) {
                if (type === 'cishu') {
                    this.hot_qy_type = 0;
                }
                if (type === 'shishang') {
                    this.hot_qy_type = 1;
                }
                if (type === 'renshu') {
                    this.hot_qy_type = 2;
                }
                //获取当前日期
                let date1 = new Date();
                let endDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());

                if (type === 7) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_qy_endtime = endDay;
                    this.hot_qy_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 14) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_qy_endtime = endDay;
                    this.hot_qy_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 30) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_qy_endtime = endDay;
                    this.hot_qy_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type.length === 2) {
                    this.hot_qy_starttime = type[0];
                    this.hot_qy_endtime = type[1];
                }
                this.hotQyInfo();
            },
            //热门企业查询
            hotQyInfo() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                let data1 = {
                    groupBy: 1
                };
                if (this.hot_qy_starttime && this.hot_qy_endtime) {
                    data1.startTime = this.hot_qy_starttime;
                    data1.endTime = this.hot_qy_endtime;
                } else {
                    //未选择时间默认7天
                    let date1 = new Date();
                    data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                    data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (this.hot_qy_type !== '') {
                    data1.type = this.hot_qy_type;
                } else {
                    data1.type = 0
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/statistic/${userInfo.zoneId}/meeting/hot`,
                    data: data1,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_ListQy_$ = rsp.data.data;
                                let count = 0;
                                for (let i = 0; i < this.$_ListQy_$.length; i++) {
                                    count += this.$_ListQy_$[i].usedCount;
                                }
                                this.hot_qy_avg = Math.round(count / this.$_ListQy_$.length);
                            } else {
                                this.$_ListQy_$ = [
                                    {
                                        "companyId": '',
                                        "usedTime": '',
                                        "companyName": '',
                                        "id": '',
                                        "attendCount": '',
                                        "usedCount": ''
                                    }]
                            }
                        }
                    }
                })
            },




            //热门预约查询条件整理
            hotYy(type) {
                if (type === 'cishu') {
                    this.hot_yy_type = 4;
                }
                if (type === 'shishang') {
                    this.hot_yy_type = 3;
                }
                if (type === 'renshu') {
                    this.hot_yy_type = 2;
                }
                //获取当前日期
                let date1 = new Date();
                let endDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());

                if (type === 7) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_yy_endtime = endDay;
                    this.hot_yy_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 14) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_yy_endtime = endDay;
                    this.hot_yy_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 30) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_yy_endtime = endDay;
                    this.hot_yy_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type.length === 2) {
                    this.hot_yy_starttime = type[0];
                    this.hot_yy_endtime = type[1];
                }
                this.hotYyInfo();
            },
            //热门预约查询
            hotYyInfo() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                let data1 = {};
                // if (this.hot_yy_starttime && this.hot_yy_endtime) {
                //     data1.startTime = this.hot_yy_starttime;
                //     data1.endTime = this.hot_yy_endtime;
                // } else {
                //     //未选择时间默认7天
                //     let date1 = new Date();
                //     data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                //     let date2 = new Date();
                //     date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                //     data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                // }
                if (this.hot_yy_type !== '') {
                    data1.type = this.hot_yy_type;
                } else {
                    data1.type = 3
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/statistic/${userInfo.zoneId}/meeting/hot`,
                    data: data1,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_ListYy_$ = rsp.data.data;
                                let count = 0;
                                for (let i = 0; i < this.$_ListYy_$.length; i++) {
                                    count += this.$_ListYy_$[i].advanceTime;
                                }
                                this.hot_yy_avg = ((count / this.$_ListYy_$.length) / 60).toFixed(2);
                            } else {
                                this.$_ListYy_$ = [
                                    {
                                        "companyId": '',
                                        "usedTime": '',
                                        "companyName": '',
                                        "id": '',
                                        "attendCount": '',
                                        "usedCount": ''
                                    }]
                            }
                        }
                    }
                })
            },




            //会议室使用率查询条件整理
            hotSyl(type) {
                if (type === 'cishu') {
                    this.hot_syl_type = 4;
                }
                if (type === 'shishang') {
                    this.hot_syl_type = 3;
                }
                if (type === 'renshu') {
                    this.hot_syl_type = 2;
                }
                //获取当前日期
                let date1 = new Date();
                let endDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());

                if (type === 7) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_syl_endtime = endDay;
                    this.hot_syl_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 14) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_syl_endtime = endDay;
                    this.hot_syl_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 30) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_syl_endtime = endDay;
                    this.hot_syl_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type.length === 2) {
                    this.hot_syl_starttime = type[0];
                    this.hot_syl_endtime = type[1];
                }
                this.hotSylInfo();
            },
            //会议室使用率查询
            hotSylInfo() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                let data1 = {};
                if (this.hot_syl_starttime && this.hot_syl_endtime) {
                    data1.startTime = this.hot_syl_starttime;
                    data1.endTime = this.hot_syl_endtime;
                } else {
                    //未选择时间默认7天
                    let date1 = new Date();
                    data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                    data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/statistic/${userInfo.zoneId}/meeting/frequency`,
                    data: data1,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                let syl = {
                                    name: '使用量',
                                    type: 'line',
                                    data: [],
                                };
                                let qxl = {
                                    name: '取消量',
                                    type: 'line',
                                    data: [],
                                };
                                let tdl = {
                                    name: '退订量',
                                    type: 'line',
                                    data: [],
                                };
                                this.bar_fwqs.xmes = [];
                                this.bar_fwqs.data = [];
                                for (let key in rsp.data.data) {
                                    this.bar_fwqs.xmes.push(key);
                                    if (rsp.data.data[key]) {
                                        syl.data.push(rsp.data.data[key].useCount);
                                        qxl.data.push(rsp.data.data[key].cancleCount);
                                        tdl.data.push(rsp.data.data[key].unsubscribeCount);
                                    } else {
                                        syl.data.push(0);
                                        qxl.data.push(0);
                                        tdl.data.push(0);
                                    }
                                }
                                this.bar_fwqs.data.push(syl);
                                this.bar_fwqs.data.push(qxl);
                                this.bar_fwqs.data.push(tdl);
                            }
                        }
                    }
                })
            },




            //会议室使用率查询条件整理
            hotSysc(type) {
                if (type === 'cishu') {
                    this.hot_sysc_type = 4;
                }
                if (type === 'shishang') {
                    this.hot_sysc_type = 3;
                }
                if (type === 'renshu') {
                    this.hot_sysc_type = 2;
                }
                //获取当前日期
                let date1 = new Date();
                let endDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());

                if (type === 7) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_sysc_endtime = endDay;
                    this.hot_sysc_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 14) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_sysc_endtime = endDay;
                    this.hot_sysc_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 30) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_sysc_endtime = endDay;
                    this.hot_sysc_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type.length === 2) {
                    this.hot_sysc_starttime = type[0];
                    this.hot_sysc_endtime = type[1];
                }
                this.hotSyscInfo();
            },
            //会议室使用率查询
            hotSyscInfo() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                let data1 = {};
                if (this.hot_sysc_starttime && this.hot_sysc_endtime) {
                    data1.startTime = this.hot_sysc_starttime;
                    data1.endTime = this.hot_sysc_endtime;
                } else {
                    //未选择时间默认7天
                    let date1 = new Date();
                    data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                    data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/statistic/${userInfo.zoneId}/meeting/used`,
                    data: data1,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                let kx = {
                                    name: '空闲',
                                    type: 'bar',
                                    data: [],
                                };
                                let yy = {
                                    name: '已约',
                                    type: 'bar',
                                    data: [],
                                };
                                let qs = {
                                    name: '清扫',
                                    type: 'bar',
                                    data: [],
                                };
                                this.bar_hyssysc.xmes = [];
                                this.bar_hyssysc.data = [];
                                let num = 0;
                                let count = 0;
                                for (let key in rsp.data.data.statisticMap) {
                                    this.bar_hyssysc.xmes.push(key);
                                    if (rsp.data.data.statisticMap[key]) {
                                        kx.data.push(
                                            Math.round(
                                                (rsp.data.data.totalTime -
                                                    rsp.data.data.statisticMap[key].reserveTime -
                                                    rsp.data.data.statisticMap[key].clearTime) / 60)
                                        );
                                        count += rsp.data.data.statisticMap[key].reserveTime / 60;
                                        yy.data.push(Math.round(rsp.data.data.statisticMap[key].reserveTime / 60));
                                        qs.data.push(Math.round(rsp.data.data.statisticMap[key].clearTime / 60));
                                    } else {
                                        kx.data.push(0);
                                        yy.data.push(0);
                                        qs.data.push(0);
                                    }
                                    num++
                                }
                                this.hot_sysc_avg = (count / num).toFixed(2);
                                this.bar_hyssysc.data.push(kx);
                                this.bar_hyssysc.data.push(yy);
                                this.bar_hyssysc.data.push(qs);
                            }
                        }
                    }
                })
            },




            //会议室预约统计查询条件整理
            hotYytj(type) {
                if (type === 'cishu') {
                    this.hot_yytj_type = 4;
                }
                if (type === 'shishang') {
                    this.hot_yytj_type = 3;
                }
                if (type === 'renshu') {
                    this.hot_yytj_type = 2;
                }
                //获取当前日期
                let date1 = new Date();
                let endDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());

                if (type === 7) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_yytj_endtime = endDay;
                    this.hot_yytj_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 14) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_yytj_endtime = endDay;
                    this.hot_yytj_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type === 30) {
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                    this.hot_yytj_endtime = endDay;
                    this.hot_yytj_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
                }
                if (type.length === 2) {
                    this.hot_yytj_starttime = type[0];
                    this.hot_yytj_endtime = type[1];
                }
                this.hotYytjInfo();
            },
            //会议室预约统计查询
            hotYytjInfo() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                let data1 = {};
                if (this.hot_yytj_starttime && this.hot_yytj_endtime) {
                    data1.startTime = this.hot_yytj_starttime;
                    data1.endTime = this.hot_yytj_endtime;
                } else {
                    //未选择时间默认7天
                    let date1 = new Date();
                    data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                    let date2 = new Date();
                    date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                    data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());

                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/statistic/${userInfo.zoneId}/meeting/used`,
                    data: data1,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                let kx = {
                                    name: '空闲',
                                    type: 'bar',
                                    data: [],
                                };
                                let yy = {
                                    name: '已约',
                                    type: 'bar',
                                    data: [],
                                };
                                let qs = {
                                    name: '清扫',
                                    type: 'bar',
                                    data: [],
                                };
                                this.bar_hysyytj.xmes = [];
                                this.bar_hysyytj.data = [];
                                let num = 0;
                                let count = 0;
                                for (let key in rsp.data.data.statisticMap) {
                                    this.bar_hysyytj.xmes.push(key);
                                    if (rsp.data.data.statisticMap[key]) {
                                        kx.data.push(
                                            Math.round(
                                                (rsp.data.data.totalTime -
                                                    rsp.data.data.statisticMap[key].reserveTime -
                                                    rsp.data.data.statisticMap[key].clearTime) / 60)
                                        );
                                        count += rsp.data.data.statisticMap[key].reserveTime / 60;
                                        yy.data.push(Math.round(rsp.data.data.statisticMap[key].reserveTime / 60));
                                        qs.data.push(Math.round(rsp.data.data.statisticMap[key].clearTime / 60));
                                    } else {
                                        kx.data.push(0);
                                        yy.data.push(0);
                                        qs.data.push(0);
                                    }
                                    num++
                                }
                                this.hot_yytj_avg = (count / num).toFixed(2);
                                this.bar_hysyytj.data.push(kx);
                                this.bar_hysyytj.data.push(yy);
                                this.bar_hysyytj.data.push(qs);
                            }
                        }
                    }
                })
            },
        }
    }
</script>