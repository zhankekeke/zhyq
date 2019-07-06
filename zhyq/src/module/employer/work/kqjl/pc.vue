<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .normal {
        padding: 3px 15px 3px 15px;
        background: #48a9ed;
        color: white;
        border-radius: 3px;
    }

    .early {
        padding: 3px 15px 3px 15px;
        background: #ffcc00;
        color: white;
        border-radius: 3px;
    }

    .bg {
        border-radius: 10px;
        background: #f7f7f7;
        padding: 10px 0 10px 30px;
    }

    .mybg {
        padding: 10px;
        border-bottom: 1px solid #efefef;
    }

    .myli, .myli li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .myli li {
        padding: 10px;
        border-bottom: 1px dashed #efefef;
    }

    .rl div {
        float: left;
        width: 14.2857%;
        height: 70px;
        border-top: 1px solid #efefef;
        text-align: center
    }
    .rili{
        margin-top: 30px;
    }
</style>
<template>
    <div>
        <div class="bg">
            <Row type="flex" align="middle">
                <Col span="4px" align="left">
                    <img v-if="$_myinfo_$.faceUrl" :src="$_global_$.imgPath + $_myinfo_$.faceUrl"
                         style="width:50px;height:50px;border-radius: 50px;">
                    <img v-else style="width:50px;height:50px;border-radius: 50px;" src="/static/defaultTX.png" alt="">
                </Col>
                <Col span="8" offset="1">
                    <p>{{$_myinfo_$.name}}</p>
                    <p>
                        考勤组：
                        <span v-if="$_myRule_$.orgId === 0">公司考勤</span>
                        <span v-else>部门考勤</span></p>
                    <p>
                        上班时间：{{$_myRule_$.amTime}}-{{$_myRule_$.pmTime}}&nbsp;
                        <span v-if="$_myRule_$.amElastic">弹性时间：{{$_myRule_$.amElastic}}-{{$_myRule_$.pmElastic}}</span>
                    </p>
                </Col>
                <Col span="4" offset="8" align="right">
                    日期：{{nowDay}}
                </Col>
            </Row>
        </div>
        <br>
        <Row>
            <Col span="13">
                <Row>
                    <Col span="24">
                        <div style="padding:10px;">
                            <span style="font-weight: bold;font-size: 16px;">考勤月历</span>
                            <span style=" float: right">
                            <DatePicker :value="value1"
                                        type="month"
                                        v-model="time11"
                                        :options="options1"
                                        @on-change="$_changeMounth_$"
                                        placeholder="请选择月份"
                                        style="width: 200px">
                            </DatePicker>
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row class="rili">
                    <Calendar class="date12138"
                              v-on:choseDay="clickDay"
                              v-on:changeMonth="changeDate"
                              :markDateMore="markday"
                              :chooseTime = "time11"
                    >
                    </Calendar>
                </Row>
                <!--<Row class="rl" style="border: 1px solid #efefef; margin-top: 20px;">-->
                <!--<div style="height: 40px; line-height: 40px;">一</div>-->
                <!--<div style="height: 40px; line-height: 40px;">二</div>-->
                <!--<div style="height: 40px; line-height: 40px;">三</div>-->
                <!--<div style="height: 40px; line-height: 40px;">四</div>-->
                <!--<div style="height: 40px; line-height: 40px;">五</div>-->
                <!--<div style="height: 40px; line-height: 40px;">六</div>-->
                <!--<div style="height: 40px; line-height: 40px;">日</div>-->
                <!--<div v-for="(item,index) in weekDay-1"></div>-->
                <!--<div v-for="(item,index) in myData" :key="index">-->

                <!--&lt;!&ndash;<p style="margin-top: 5px;">{{item.attendanceDate}}</p>&ndash;&gt;-->
                <!--<p style="margin-top: 3px;font-size: 14px;">{{index+1}}</p>-->
                <!--<p v-if="item.amStatus === 0"><span style="color: #33cc00; font-size: 16px;">• </span>{{item.firstTime}}-->
                <!--</p>-->
                <!--<p v-else-if="item.amStatus === 1"><span style="color: #ff9900; font-size: 16px;">• </span>{{item.firstTime}}-->
                <!--</p>-->
                <!--<p v-else-if="item.amStatus === 2"><span style="color: red">• </span>未打卡</p>-->
                <!--<p v-else-if="item.amStatus === 999"><span style="color: red">• </span>未打卡</p>-->
                <!--<p v-if="item.pmStatus === 0"><span style="color: #33cc00; font-size: 16px;">• </span>{{item.lastTime}}-->
                <!--</p>-->
                <!--<p v-else-if="item.pmStatus === 1"><span style="color: #ff9900; font-size: 16px;">• </span>{{item.lastTime}}-->
                <!--</p>-->
                <!--<p v-else-if="item.amStatus === 2"><span style="color: red">• </span>未打卡</p>-->
                <!--<p v-else-if="item.amStatus === 999"><span style="color: red">• </span>未打卡</p>-->
                <!--</div>-->
                <!--<div v-for="(item,index) in mounthDay+1"></div>-->
                <!--</Row>-->
            </Col>
            <Col span="8" offset="3">
                <Row>
                    <div class="mybg">
                        <img src="/static/employers/kqjl/clock.png"
                             style="width: 20px; height: 20px; float: left"><span
                            style="float: left; margin-left: 15px; font-size: 14px">考勤</span>
                        <div style="clear: both"></div>
                    </div>
                    <ul class="myli">
                        <li>
                            <span>打卡&nbsp;&nbsp;{{dknum}}&nbsp;&nbsp;次，</span><span style="margin-left:5px">工时共计&nbsp;&nbsp;{{countWork}}&nbsp;&nbsp;小时</span>
                        </li>
                        <li>
                            <span style="color:#b6b6b6">上班打卡时间：</span>
                            <span style="margin-left:10px">{{todayInfo.firstTime}}</span>
                            <span style="margin-left:10px" v-if="!todayInfo">-&nbsp;-</span>
                            <span v-if="todayInfo.amStatus == 0" class="normal" style="margin-left:10px">正常</span>
                            <span v-else-if="todayInfo.amStatus == 1" class="early" style="margin-left:10px">迟到</span>
                            <span v-else-if="todayInfo.amStatus == 2" class="early"
                                  style="margin-left:10px;background-color:#ffcc00">未打卡</span>
                        </li>
                        <li>
                            <span style="color:#b6b6b6">下班打卡时间：</span>
                            <span style="margin-left:10px">{{todayInfo.lastTime}}</span>
                            <span style="margin-left:10px" v-if="!todayInfo">-&nbsp;-</span>
                            <span v-if="todayInfo.pmStatus == 0" class="normal" style="margin-left:10px">正常</span>
                            <span v-else-if="todayInfo.pmStatus == 1" class="early" style="margin-left:10px">早退</span>
                            <span v-else-if="todayInfo.pmStatus == 2" class="early"
                                  style="margin-left:10px;background-color:#ffcc00">未打卡</span>
                        </li>
                    </ul>
                </Row>
                <Row style="margin-top: 20px">
                    <div class="mybg">
                        <img src="/static/employers/kqjl/calendar.png"
                             style="width: 20px; height: 20px; float: left"><span
                            style="float: left; margin-left: 15px; font-size: 14px">考勤统计</span>
                        <div style="clear: both"></div>
                    </div>

                    <ul class="myli">
                        <li>
                            <Row type="flex" align="middle">
                                <Col span="12">出勤天数</Col>
                                <Col span="12" align="right">{{kqInfo.cqDay}}天</Col>
                            </Row>
                        </li>
                        <li>
                            <Row type="flex" align="middle">
                                <Col span="12">休息天数</Col>
                                <Col span="12" align="right">{{kqInfo.xxDay}}天</Col>
                            </Row>
                        </li>

                        <div>
                            <div class="myul">
                                <li>
                                    <Row type="flex" align="middle">
                                        <Col span="12">迟到</Col>
                                        <Col span="12" align="right">{{kqInfo.cdDay}}次</Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row type="flex" align="middle">
                                        <Col span="12">早退</Col>
                                        <Col span="12" align="right">{{kqInfo.ztDay}}次</Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row type="flex" align="middle">
                                        <Col span="12">缺卡</Col>
                                        <Col span="12" align="right">{{kqInfo.qkDay}}次</Col>
                                    </Row>
                                </li>
                            </div>


                        </div>

                    </ul>
                </Row>
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
                time11:new Date(),
                value1: '',
                $_myinfo_$: '',
                $_myRule_$: '',
                dknum: 0,
                countWork: 0,
                bushow: false,
                cityList: [],
                model1: '',
                newDay: "",
                myData: [],
                weekDay: 0,
                mounthDay: 0,
                nowDay: '',
                mystudyData: '',
                kqInfo: {
                    "cqDay": 0,
                    "xxDay": 0,
                    "cdDay": 0,
                    "ztDay": 0,
                    "qkDay": 0,
                },
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                todayInfo: '',
                //不能被选中的月份和年份
                options1: {
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                $_myData_$:'',
                markday: [],
            }
        },
        mounted() {
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            let userInfo = JSON.parse(cookie);
            this.$_myinfo_$ = userInfo;
            this.$_getMyInfo_$();
            this.clickDay();
            this.$_monthData_$();
            this.changeDate();
        },
        methods: {
            changeDate(res = '') {
                if (!res) {
                    //当月第一天日期
                    let date1 = new Date();
                    date1.setDate(1);
                    res = date1.getFullYear() + "/" + (date1.getMonth() + 1) + "/" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                }
                let arr = res.split("/");
                let year = arr[0];
                let mounth = arr[1]*1;
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
                        this.kqInfo.cdDay = 0;
                        this.kqInfo.ztDay = 0;
                        this.kqInfo.qkDay = 0;
                        this.kqInfo.cqDay = 0;
                        this.kqInfo.xxDay = 0;
                        if (res.data.code === 0) {
                            this.mystudyData = res.data.data;
                            this.getMystudyData();
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
            clickDay(data = '') {
                let newDate = '';
                if (data) {
                    data = data.split("/");
                    newDate = data[0] + '-' + (data[1] < 10 ? '0' + data[1] : data[1]) + '-' + (data[2] < 10 ? '0' + data[2] : data[2]);
                } else {
                    //当天日期 -1的日期
                    let date3 = new Date();
                    newDate = date3.getFullYear() + "-" + (date3.getMonth() < 10 ? "0" + (date3.getMonth() + 1) : date3.getMonth() + 1) + "-" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate());
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/attendance/employee/detail`,
                    data: {
                        queryDate: newDate
                    },
                    headers: {"Content-type": "application/json"}
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            if (res.data.data) {
                                this.todayInfo = res.data.data;
                                let i = 0;
                                if (this.todayInfo.amStatus != 2) {
                                    i++
                                }
                                if (this.todayInfo.pmStatus != 2) {
                                    i++
                                }
                                this.dknum = i;
                                this.countWork = (this.todayInfo.workingHours / 60).toFixed(2);
                            } else {
                                this.dknum = 0;
                                this.countWork = 0;
                                this.todayInfo = '';
                            }
                        }
                    }
                })
            },
            $_monthData_$() {
                //当月第一天日期
                let date1 = new Date();
                date1.setDate(1);
                let year = date1.getFullYear();
                let month = date1.getMonth() + 2;
                for (let i = 1; i < month; i++) {
                    this.cityList.push({
                        value: year + "-" + (i < 10 ? "0" + i : i) + "-01",
                        label: year + "年" + i + "月"
                    });
                }
            },
            getMystudyData() {
                this.kqInfo.cdDay = 0;
                this.kqInfo.ztDay = 0;
                this.kqInfo.qkDay = 0;
                this.kqInfo.cqDay = 0;
                this.kqInfo.xxDay = 0;
                for (let key in this.mystudyData) {
                    if (this.mystudyData[key] == null) {
                        this.myData.push({
                            "amStatus": 999,
                            "pmStatus": 999,
                            "ruleId": 7,
                            "attendanceDate": key,
                            "firstTime": "00",
                            "lastTime": "00",
                            "createTime": key,
                            "id": '',
                            "workingHours": 0
                        });
                        this.kqInfo.xxDay++;
                    } else {
                        this.myData.push(this.mystudyData[key]);
                        if (this.mystudyData[key].amStatus == 1) {
                            this.kqInfo.cdDay++;
                        }
                        if (this.mystudyData[key].pmStatus == 1) {
                            this.kqInfo.ztDay++;
                        }
                        if (this.mystudyData[key].amStatus == 2 || this.mystudyData[key].pmStatus == 2) {
                            this.kqInfo.qkDay++;
                        }
                        this.kqInfo.cqDay++;
                    }
                }
            },
            $_getLastDay_$(year, month) {
                var new_year = year;    //取当前的年份
                var new_month = month++;//取下一个月的第一天,方便计算(最后一天不固定)
                if (month > 12) {
                    new_month -= 12;        //月份减
                    new_year++;            //年份增
                }
                var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
                return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
            },
            $_changeMounth_$(res) {
                res = res.replace('-','/');
                this.changeDate(res);
            },
            $_getMyInfo_$() {
                //当月第一天日期
                let date1 = new Date();
                date1.setDate(1);
                this.weekDay = date1.getDay() == 0 ? 7 : date1.getDay();
                let firstDay = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                this.value1 = firstDay
                //前一天日期
                let date2 = new Date();
                date2.setTime(date2.getTime() - 24 * 60 * 60 * 1000);
                this.mounthDay = 42 - date2.getDate() - this.weekDay;
                let nowDay = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());

                //当天日期
                let date3 = new Date();
                this.nowDay = date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate());

                //每月第一天显示上月的数据
                if (firstDay == this.nowDay) {
                    firstDay = date1.getFullYear() + "-" + date1.getMonth() + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/attendance/employee/records`,
                    data: {
                        "startDate": firstDay,
                        "endDate": nowDay
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.mystudyData = rsp.data.data;
                            this.getMystudyData();
                        }
                    }
                });
            },
            $_getEmployee_$() {
                let data = this.nowDay.split('-');
                if (data[1] < 10) {
                    data[1] = '0' + data[1];
                }
                if (data[2] < 10) {
                    data[2] = '0' + data[2];
                }
                let nowday = data[0] + '-' + data[1] + '-' + data[2];
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/attendance/employee/detail`,
                    data: {
                        "queryDate": nowday,
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data == null) {
                                rsp.data.data = {
                                    "amStatus": 999,
                                    "pmStatus": 999,
                                    "ruleId": 0,
                                    "attendanceDate": '',
                                    "firstTime": "",
                                    "lastTime": "",
                                    "createTime": '',
                                    "id": '',
                                    "workingHours": 0
                                }
                            }
                            this.todayInfo = rsp.data.data;
                            let i = 0;
                            if (this.todayInfo.amStatus != 2) {
                                i++
                            }
                            if (this.todayInfo.pmStatus != 2) {
                                i++
                            }
                            this.dknum = i;
                            this.countWork = (this.todayInfo.workingHours / 60).toFixed(2);
                        }
                    }
                });
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
            }
        }
    }
</script>