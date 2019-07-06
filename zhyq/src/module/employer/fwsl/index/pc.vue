<style>
    .date12138 {
        background-color: #fff;
        color: #333;
    }

    .date12138 .wh_content_all {
        background-color: #fff !important;
        color: #333;
    }

    .date12138 .wh_item_date, .wh_top_changge {
        background-color: #fff;
        color: #333;
    }

    .date12138 .wh_content_item, .wh_content_item_tag {
        background-color: #fff;
        color: #333 !important;
    }

    .date12138 .wh_top_changge li {
        color: #333 !important;
    }

    .date12138 .wh_jiantou1 {
        border-top: 2px solid #333 !important;
        border-left: 2px solid #333 !important;
    }

    .date12138 .wh_jiantou2 {
        border-top: 2px solid #333 !important;
        border-right: 2px solid #333 !important;
    }
</style>
<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .wrap {
        padding: 15px;
        box-sizing: border-box;
    }

    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .infoleft {
        padding: 8px 0;
        margin-top: 10%;
        box-sizing: border-box;
    }

    .img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1px solid #afafaf;
    }

    .infoleft .infoText {
        line-height: 60px;
        height: 60px;
        display: block;
    }

    .infoText img {
        height: 20px;
        width: 20px;
        margin-right: 15px;
        position: relative;
        top: 5px;
    }

    .title {
        height: 26px;
        line-height: 26px;
        color: #1c2438;
        float: left;
    }

    .title:after {
        content: " ";
        position: absolute;
        left: 30px;
        top: 22px;
        border-bottom: 8px solid #1c2438;
        border-radius: 5px;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 5;
        width: 25px;
    }

    >>> .ivu-tabs-bar {
        border-bottom: none;
    }

    >>> .ivu-tabs-nav {
        width: 100%;
    }

    >>> .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        width: 20%;
        text-align: center;
        margin-right: 15%;
        border: none;
        background-color: #fff;
    }

    >>> .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        color: #fff;
        background: #2F95E9;
        border-radius: 20px;
    }

    .list {
        list-style: none;
        padding: 0 10px;
        margin: 0;
    }

    .list .item {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #f7f7f7;
        cursor: pointer;
        margin-bottom: 5px;
    }

    .list .item .listText {
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
    }

    .list .item .time {
        float: right;
        text-align: right;
    }

    .inforight {
        padding: 8px 0;
        margin-top: 2%;
    }

    .pic {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        background: #f7f7f7;
        margin: 0 auto;
    }

    .picText {
        text-align: center;
        line-height: 30px;
    }

    #calendar {
        width: 90%;
        margin: 0 auto;
    }

    .month {
        width: 100%;
        background: #00B8EC;
    }

    .month ul {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }

    .year-month {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .choose-year {
        padding-left: 20px;
        padding-right: 20px;
    }

    .choose-month {
        text-align: center;
        font-size: 1.5rem;
    }

    .arrow {
        padding: 10px 30px;
        cursor: pointer;
    }

    .month ul li {
        color: white;
        font-size: 20px;
        text-transform: uppercase;
        letter-spacing: 3px;
    }

    .weekdays {
        margin: 0;
        padding: 10px 0;
        background-color: #00B8EC;
        display: flex;
        flex-wrap: wrap;
        color: #FFFFFF;
        justify-content: space-around;
    }

    .weekdays li {
        display: inline-block;
        width: 13.6%;
        text-align: center;
    }

    .days {
        padding: 0;
        background: #FFFFFF;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .days li {
        list-style-type: none;
        display: inline-block;
        width: 14.2%;
        text-align: center;
        padding-bottom: 15px;
        padding-top: 15px;
        font-size: 1rem;
        color: #495060;
    }

    .days li .active {
        padding: 6px 10px;
        border-radius: 50%;
        background: #00B8EC;
        color: #fff;
    }

    .days li .other-month {
        padding: 5px;
        color: gainsboro;
    }

    .shouzhi {
        cursor: pointer;
    }

    .xq {
        float: right;
        cursor: pointer;
        color: #000;
        font-size: 15px;
        line-height: 1;
        padding-top: 5px;
    }

    .more {
        float: right;
    }

    .noDataImg {
        margin-top: 40px;
        text-align: center;
    }

    .noDataImg img {
        width: 20%;
        height: auto;
    }

    .noDataImg p {
        margin-top: 20px;
        color: #afafaf;
    }

    .shadow {
    /*    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);*/
        border:1px solid #e9eaec;
    }
</style>
<template>
    <div class="wrap">
        <Row>
            <Col span="11">
                <Card class="shadow" :padding="20" style="padding-top: 20px;">
                    <Row>
                        <Col span="14">
                            <p class="title">个人信息</p>
                            <div class="infoleft clear">
                                <p class="infoText">欢迎您:&nbsp;{{userInfo.name}}</p>
                                <p class="infoText"><img src="/static/employers/index/1.png"/>所属部门:&nbsp;{{userInfo.departmentName}}
                                </p>
                                <p class="infoText"><img src="/static/employers/index/2.png"/>联系电话:&nbsp;{{userInfo.phoneNumber}}
                                </p>
                            </div>
                        </Col>
                        <Col span="10" style="text-align: center">
                            <div>
                                <img v-if="userInfo.faceUrl" class="img" :src="$_global_$.imgPath + userInfo.faceUrl"/>
                                <img v-else class="img" src="/static/defaultTX.png"/>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card class="shadow" :padding="20" style="margin-top: 10px; height: 330px;">
                    <Row>
                        <Col span="24">
                            <Tabs type="card">
                                <TabPane v-if="$_fkList_$.length > 0" style="height: 200px; overflow-y: auto"
                                         label="访客">
                                    <ul class="list">
                                        <li class="item" v-for='item in $_fkList_$' @click="onItemClickFK(item)">
                                            <p class="listText">{{item.visitorName}}</p>
                                            <p class="time">{{item.visitDate}}</p>
                                        </li>

                                    </ul>
                                    <Button class="more" type="text" v-if="$_fkList_$.length>0" @click="$_fkMore_$()">
                                        更多>>
                                    </Button>
                                </TabPane>
                                <TabPane v-else style="height: 200px; overflow-y: auto" label="访客">
                                    <div class="noDataImg">
                                        <img src="/static/employers/index/jilu.png">
                                        <p>目前没有访客哦~</p>
                                    </div>
                                </TabPane>
                                <TabPane v-if="$_hdList_$.length > 0" style="height: 200px; overflow-y: auto"
                                         label="活动">
                                    <ul class="list">
                                        <li class="item" v-for='item in $_hdList_$' @click="onItemClickHD(item)">
                                            <p class="listText">{{item.title}}</p>
                                            <p class="time">{{item.beginDate}}</p>
                                        </li>

                                    </ul>
                                    <Button class="more" type="text" v-if="$_hdList_$.length>0" @click="$_hdMore_$()">
                                        更多>>
                                    </Button>
                                </TabPane>
                                <TabPane v-else style="height: 200px; overflow-y: auto" label="活动">
                                    <div class="noDataImg">
                                        <img src="/static/employers/index/huodong.png">
                                        <p>目前没有活动哦~</p>
                                    </div>
                                </TabPane>
                                <TabPane v-if="$_tzList_$.length > 0" style="height: 200px; overflow-y: auto"
                                         label="通知">
                                    <ul class="list">
                                        <li class="item" v-for='item in $_tzList_$' @click="onItemClickTZ(item)">
                                            <p v-if="!item.read" style=" font-weight:bold" class="listText">
                                                {{item.title}}</p>
                                            <p v-else class="listText">{{item.title}}</p>
                                            <p class="time">{{item.createDate.substring(0,10)}}</p>
                                        </li>
                                    </ul>
                                    <Button class="more" type="text" v-if="$_tzList_$.length>0" @click="$_tzMore_$()">
                                        更多>>
                                    </Button>
                                </TabPane>
                                <TabPane v-else style="height: 200px; overflow-y: auto" label="通知">
                                    <div class="noDataImg">
                                        <img src="/static/employers/index/jilu.png">
                                        <p>目前没有通知哦~</p>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span="12" offset="1">
                <Card class="shadow" :padding="20" style="padding-top: 20px">
                    <Row>
                        <Col span="24">
                            <p class="title">最新考勤</p>
                            <p class="xq" @click="kqMore">详情 >></p>
                            <div style="clear: both"></div>
                            <div class="inforight">
                                <Calendar class="date12138"
                                          v-on:changeMonth="changeDate"
                                          :markDateMore="markday">
                                </Calendar>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card class="shadow" :padding="57" style="margin-top: 10px">
                    <Row>
                        <Col span="6" class="shouzhi">
                            <div class="pic" @click="$_txl_$">
                                <img style="width: 100%;" src="/static/employers/index/txl.png"/>
                            </div>
                            <p class="picText">通讯录</p>
                        </Col>
                        <Col span="6" class="shouzhi">
                            <div class="pic" @click="$_fkgl_$">
                                <img style="width: 100%;" src="/static/employers/index/fk.png"/>
                            </div>
                            <p class="picText">访客管理</p>
                        </Col>
                        <Col span="6" class="shouzhi">
                            <div class="pic" @click="$_hysgl_$">
                                <img style="width: 100%;" src="/static/employers/index/hys.png"/>
                            </div>
                            <p class="picText">会议室管理</p>
                        </Col>
                        <Col span="6" class="shouzhi">
                            <div class="pic" @click="$_ct_$">
                                <img style="width: 100%;" src="/static/employers/index/ct.png"/>
                            </div>
                            <p class="picText">餐厅</p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';
    import Calendar from '../public/calendar/index';


    export default {
        mixins: [controler],
        components: {
            Calendar,
        },
        data() {
            return {
                columns1: [
                    {
                        title: '一',
                        key: '0',
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("div", {
                                    style: {},
                                    on: {
                                        click: () => {
                                        }
                                    }
                                }, params.row.number)
                            ])
                        }
                    },
                    {
                        title: '二',
                        key: '1',
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("div", {
                                    style: {},
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, params.row.number)
                            ])
                        }
                    },
                    {
                        title: '三',
                        key: '2',
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("div", {
                                    style: {}
                                }, params.row.number)
                            ])
                        }
                    },
                    {
                        title: '四',
                        key: '3',
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("div", {
                                    style: {}
                                }, params.row.number)
                            ])
                        }
                    },
                    {
                        title: '五',
                        key: '4',
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("div", {
                                    style: {}
                                }, params.row.number)
                            ])
                        }
                    },
                    {
                        title: '六',
                        key: '5',
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("div", {
                                    style: {}
                                }, params.row.number)
                            ])
                        }
                    },
                    {
                        title: '日',
                        key: '6',
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("div", {
                                    style: {}
                                }, params.row.number)
                            ])
                        }
                    }
                ],
                data1: [
                    {
                        number: "1"
                    }, {
                        number: "2"
                    }, {
                        number: "3"
                    }, {
                        number: "4"
                    }, {
                        number: "5"
                    }, {
                        number: "6"
                    }
                ],
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                days: [],
                userInfo: '',
                $_hysList_$: [],
                $_fkList_$: [],
                $_hdList_$: [],
                $_tzList_$: [],
                markday: [],
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            // this.$_getHysList_$();
            this.$_getFkList_$();
            this.$_getTzList_$();
            this.$_getHdList_$();
            this.initData(null);
            this.changeDate();
        },
        methods: {
            initData: function (cur) {
                var leftcount = 0; //存放剩余数量
                var date;
                if (cur) {
                    date = new Date(cur);
                } else {
                    var now = new Date();
                    var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
                    d.setDate(35);
                    date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                }
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;

                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (var i = this.currentWeek - 1; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day = d;
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用


                }
                //其他周
                for (var i = 1; i <= 35 - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject = {};
                    dayobject.day = d;
                    this.days.push(dayobject);
                }

            },
            pickPre: function (year, month) {

                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },
            pickNext: function (year, month) {
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },

            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function (year, month, day) {
                var y = year;
                var m = month;
                if (m < 10) m = "0" + m;
                var d = day;
                if (d < 10) d = "0" + d;
                return y + "-" + m + "-" + d
            },
            // 更多考勤
            /*$_kqjl_$() {
                this.$root.$_Route_$('employer', 'work', 'kqjl', {})
            },*/
            //    会议室更多
            $_hysMore_$() {
                this.$root.$_Route_$('employer', 'work', 'hysyd', {})
            },
            // 访客更多
            $_fkMore_$() {
                this.$root.$_Route_$('employer', 'work', 'fkgl', {})
            },
            // 活动更多
            $_hdMore_$() {
                this.$root.$_Route_$('employer', 'service', 'yqhd', {})
            },
            // 通知更多
            $_tzMore_$() {
                this.$root.$_Route_$('employer', 'work', 'tzfb', {})
            },
            //考勤记录
            kqMore() {
                this.$root.$_Route_$('employer', 'work', 'kqjl', {})
            },
            onItemClickHYS(row) {
                this.$root.$_Route_$('employer', 'jump', 'yyjlxq', {row: row})
            },
            onItemClickFK(row) {
                this.$root.$_Route_$('employer', 'jump', 'fkxq', {id: row})
            },
            onItemClickHD(row) {
                this.$root.$_Route_$('employer', 'jump', 'yqhdxq', {row: row})
            },
            onItemClickTZ(row) {
                row.users = JSON.parse(row.users);
                row.receivers = "";

                for (let i = 0; i < row.users.length; i++) {
                    row.receivers = row.receivers + (row.users[i].name + '、')
                }

                // this.$root.$_Route_$('employer', 'jump', 'tzxq', {id: row});
                this.$root.$_Route_$('employer', 'jump', 'tzxq', {id: row, type: true});

            },


            // 通讯录
            $_txl_$() {
                this.$root.$_Route_$('employer', 'work', 'txl', {})
            },
            // 访客管理
            $_fkgl_$() {
                this.$root.$_Route_$('employer', 'work', 'fkgl', {})
            },
            // 会议事管理
            $_hysgl_$() {
                this.$root.$_Route_$('employer', 'work', 'hysyd', {})
            },
            // 餐厅
            $_ct_$() {
                this.$root.$_Route_$('employer', 'service', 'ctfw', {})
            },
            $_getTzList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/notice/receive`,
                    data: {
                        pageSize: 3
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$_tzList_$ = res.data.data.records;
                        }
                    }
                })
            },
            /*$_getHysList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/zone/zone/" + this.userInfo.zoneId + "/meeting/self/reserves",
                    data: {status: 1,pageSize:6},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status == 200) {
                        if (rsp.data.code == 0) {
                            this.$_hysList_$ = rsp.data.data.records;
                        }
                    }
                });
            },*/
            $_getFkList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/company/visitor/employee/records",
                    data: {
                        pageSize: 3,
                        visitorType: 0,
                        auditStatus: 0
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status == 200) {
                        if (rsp.data.code == 0) {
                            this.$_fkList_$ = rsp.data.data.records;
                        }
                    }
                });
            },
            $_getHdList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/company/activity/search",
                    data: {
                        pageSize: 3,
                        status: 0,
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status == 200) {
                        if (rsp.data.code == 0) {
                            this.$_hdList_$ = rsp.data.data.records;
                        }
                    }
                });
            },
            changeDate(res = '') {
                if (!res) {
                    //当月第一天日期
                    let date1 = new Date();
                    date1.setDate(1);
                    res = date1.getFullYear() + "/" + (date1.getMonth() + 1) + "/" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                }
                let arr = res.split("/");
                let year = arr[0];
                let mounth = arr[1];
                let day = this.$_getLastDay_$(year, mounth);
                let lastMounthDay = year + '-' + (mounth < 10 ? '0' + mounth : mounth) + '-' + day;
                let firstMounthDay = year + '-' + (mounth < 10 ? '0' + mounth : mounth) + '-01';

                //当月第一天日期
                let date1 = new Date();
                date1.setDate(1);
                let firstDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                //当天日期
                let date3 = new Date();
                let nowDay = date3.getFullYear() + "-" + ((date3.getMonth() + 1) < 10 ? "0" + (date3.getMonth() + 1) : (date3.getMonth() + 1)) + "-" + (date3.getDate() - 1 < 10 ? "0" + date3.getDate() - 1 : date3.getDate() - 1);
                if (firstMounthDay == firstDay) {
                    lastMounthDay = nowDay
                }
                this.$_nowMonthData_$(firstMounthDay, lastMounthDay);
            },
            $_getLastDay_$(year, month) {
                let new_year = year;    //取当前的年份
                let new_month = month++;//取下一个月的第一天,方便计算(最后一天不固定)
                if (month > 12) {
                    new_month -= 12;        //月份减
                    new_year++;            //年份增
                }
                let new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
                return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
            },
            $_nowMonthData_$(sDay, lDay) {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                //当天日期
                let date3 = new Date();
                let nowDay = date3.getFullYear() + "年" + (date3.getMonth() + 1) + "月" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate()) + '日';
                this.$_myData_$ = userInfo;
                this.$_myData_$.time = nowDay;
                let data = {};
                if (!sDay) {
                    //当月第一天日期
                    let date1 = new Date();
                    date1.setDate(1);
                    let firstDay = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                    //当天日期
                    let date3 = new Date();
                    let nowDay = date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + (date3.getDate() - 1 < 10 ? "0" + date3.getDate() - 1 : date3.getDate() - 1);

                    data.startDate = firstDay;
                    data.endDate = nowDay;
                } else {
                    data.startDate = sDay;
                    data.endDate = lDay;
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/attendance/employee/records`,
                    data: data,
                    headers: {"Content-type": "application/json"}
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            let tmpData = [];
                            for (let key in res.data.data) {
                                let className = '';
                                if (res.data.data[key]) {
                                    if (res.data.data[key].amStatus != 0 || res.data.data[key].pmStatus != 0) {
                                        className = 'mark1';
                                    } else {
                                        className = 'mark2'
                                    }
                                } else {
                                    className = 'mark1'
                                }
                                tmpData.push({
                                    date: key,
                                    className: className
                                })
                            }
                            this.markday = tmpData;
                        }
                    }
                })

                //请求考勤规则
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/attendance/employee/rule`,
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$_myRule_$ = res.data.data;
                        }
                    }
                })
            },
        }
    }
</script>