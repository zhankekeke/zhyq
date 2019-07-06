<style scoped>
.spanday{
    display: inline-block;
    width: 3%;
    text-align: center;
    line-height: 25px;
}
</style>
<template>
    <div class="container">
        <div style="font-size: 13px;padding-left: 3%">
            <span>请选择查看的日期：</span>
            <span class="spanday" @click="timeArrange(7)">7天</span>
            <span class="spanday" @click="timeArrange(14)">14天</span>
            <span class="spanday" @click="timeArrange(30)">30天</span>
            <DatePicker type="daterange"
                        :start-date="new Date()"
                        placement="bottom-start"
                        :editable="false"
                        style="width: 180px"
                        @on-change="timeArrange">
            </DatePicker>
        </div>
        <Row>
            <Col span='16'>
                <ec-chart :chart="bar_chartDataOne"></ec-chart>
            </Col>
            <Col span='8'>
                <ec-chart :chart="bar_jfhqqdtj"></ec-chart>
            </Col>
        </Row>
        <Row>
            <Col span='16'>
                <ec-chart :chart="bar_jfxhl"></ec-chart>
            </Col>
            <Col span='8'>
                <ec-chart :chart="bar_xflxtj"></ec-chart>
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
    data () {
        return {
            userInfo: '', //用户信息
            jf_starttime: '',  //开始时间
            jf_endtime: '',  //结束时间

            //积分消耗量柱状折线图
            bar_chartDataOne: {
                id: "bar_chartDataOne",
                type: "zxzzt",
                title: "积分消耗量",
                color:['#6acb5b','#f3cc5a','#d88800','#5ea7f2','#ed8779'],
                subtext: "",
                xmes:[],
                title1:['停车场','餐厅','其他','商城','会议室'],
                data: [
                    {
                        name: '停车场',
                        type: 'bar',
                        data: []
                    },
                    {
                        name: '餐厅',
                        type: 'bar',
                        data: []
                    },
                    {
                        name: '其他',
                        type: 'bar',
                        data: []
                    },
                    {
                        name: '商城',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '会议室',
                        type: 'line',
                        data: []
                    }
                ]
            },
            //积分新增量柱状折线图
            bar_jfxhl: {
                id: "bar_jfxhl",
                type: "zxzzt",
                title: "积分新增量",
                subtext: "",
                color:['#6acb5b','#f3cc5a','#d88800'],
                xmes:[],
                title1:['消费奖励', '充值奖励','园区发放'],
                data: [
                    {
                        name: '消费奖励',
                        type: 'bar',
                        data: []
                    },
                    {
                        name: '充值奖励',
                        type: 'bar',
                        data: []
                    },
                    {
                        name: '园区发放',
                        type: 'bar',
                        data: []
                    }
                ]
            },
            // 积分消费类型圆形图
            bar_jfhqqdtj:{
                id: "bar_jfhqqdtj",
                type: "bxt",
                title: "积分消费类型统计",
                color:['#6acb5b','#f3cc5a','#d88800','#5ea7f2','#ed8779'],
                data: [
                    {value:0, name:'停车场',type: 'pie',},
                    {value:0, name:'餐厅',type: 'pie',},
                    {value:0, name:'其他',type: 'pie',},
                    {value:0, name:'商城',type: 'pie',},
                    {value:0, name:'会议室',type: 'pie',},
                ]
            },
            //积分获取渠道圆形图
            bar_xflxtj:{
                id: "bar_xflxtj",
                type: "pie",
                color:['#6acb5b','#f3cc5a','#d88800'],
                title: "积分获取渠道统计",
                data: [
                    {value:0, name:'消费奖励'},
                    {value:0, name:'充值奖励'},
                    {value:0, name:'园区发放'},
                ]
            }

        }
    },
    components: {
        ecChart
    },
    created(){
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.userInfo = JSON.parse(cookie);

        //积分消耗和新增量统计
        this.$_jfConsumeAdd_$();

        //积分消费类型统计和获取渠道统计
        this.$_jfTypeObtain_$();

    },
    methods:{
        //时间段整理
        timeArrange(type) {
            //获取当前日期
            let date1 = new Date();
            let endDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());

            //获取日期
            if (type.length === 2) {
                this.jf_starttime = type[0];
                this.jf_endtime = type[1];
            }else{
                let date2 = new Date();
                date2.setTime(date2.getTime() - type * 24 * 60 * 60 * 1000);
                this.jf_endtime = endDay;
                this.jf_starttime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
            }

            //积分消耗和新增量统计
            this.$_jfConsumeAdd_$();

            //积分消费类型统计和获取渠道统计
            this.$_jfTypeObtain_$();
        },

        // 积分消耗和新增量统计
        $_jfConsumeAdd_$(){
            let data1 = {};
            if (this.jf_starttime && this.jf_endtime) {
                data1.startTime = this.jf_starttime;
                data1.endTime = this.jf_endtime;
            } else {
                //未选择时间默认7天
                let date1 = new Date();
                data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                let date2 = new Date();
                date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
            }

            //积分消费量统计
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/operate/statistic/${this.userInfo.zoneId}/credits/comsume`,
                data: data1,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.bar_chartDataOne.subtext = '积分消耗总量 '+rsp.data.data.creditsTotal;

                        //数据
                        let data = rsp.data.data.statisticData;
                        //时间
                        let timearr = [];
                        //停车场
                        let parking = [];
                        //餐厅
                        let restaurant = [];
                        //其他
                        let other = [];
                        //商城
                        let mall = [];
                        //会议室
                        let meeting = [];

                        for(let i in data){
                            timearr.push(i);
                            if(data[i]==null){
                                parking.push(0);
                                restaurant.push(0);
                                other.push(0);
                                mall.push(0);
                                meeting.push(0);
                            }else{
                                parking.push(data[i].parking);
                                restaurant.push(data[i].restaurant);
                                other.push(data[i].other);
                                mall.push(data[i].mall);
                                meeting.push(data[i].meeting);
                            }
                        }
                        this.bar_chartDataOne.xmes = timearr;
                        // '停车场','餐厅','其他','商城','会议室'
                        this.bar_chartDataOne.data[0].data = parking;
                        this.bar_chartDataOne.data[1].data = restaurant;
                        this.bar_chartDataOne.data[2].data = other;
                        this.bar_chartDataOne.data[3].data = mall;
                        this.bar_chartDataOne.data[4].data = meeting;
                    }
                }
            });

            //积分新增量统计
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/operate/statistic/${this.userInfo.zoneId}/credits/add`,
                data: data1,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.bar_jfxhl.subtext = '积分新增总量 '+rsp.data.data.creditsTotal;

                        //数据
                        let data = rsp.data.data.statisticData;
                        //时间
                        let timearr = [];
                        //消费奖励
                        let comsume = [];
                        //充值奖励
                        let recharge = [];
                        //园区发放
                        let grant = [];

                        for(let i in data){
                            timearr.push(i);
                            if(data[i]==null){
                                comsume.push(0);
                                recharge.push(0);
                                grant.push(0);
                            }else{
                                comsume.push(data[i].comsume);
                                recharge.push(data[i].recharge);
                                grant.push(data[i].grant);
                            }
                        }

                        this.bar_jfxhl.xmes = timearr;
                        // '消费奖励', '充值奖励','园区发放'
                        this.bar_jfxhl.data[0].data = comsume;
                        this.bar_jfxhl.data[1].data = recharge;
                        this.bar_jfxhl.data[2].data = grant;
                    }
                }
            });
        },

        //积分消费类型统计和获取渠道统计
        $_jfTypeObtain_$(){
            let data1 = {};
            if (this.jf_starttime && this.jf_endtime) {
                data1.startTime = this.jf_starttime;
                data1.endTime = this.jf_endtime;
            } else {
                //未选择时间默认7天
                let date1 = new Date();
                data1.endTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                let date2 = new Date();
                date2.setTime(date2.getTime() - 7 * 24 * 60 * 60 * 1000);
                data1.startTime = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
            }

            //积分消费类型统计
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/operate/statistic/${this.userInfo.zoneId}/credits/used`,
                data: data1,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {

                        // '停车场','餐厅','其他','商城','会议室'
                        this.bar_jfhqqdtj.data[0].value = rsp.data.data.parking;
                        this.bar_jfhqqdtj.data[1].value = rsp.data.data.restaurant;
                        this.bar_jfhqqdtj.data[2].value = rsp.data.data.other;
                        this.bar_jfhqqdtj.data[3].value = rsp.data.data.mall;
                        this.bar_jfhqqdtj.data[4].value = rsp.data.data.meeting;
                    }
                }
            });

            //积分获取渠道统计
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/operate/statistic/${this.userInfo.zoneId}/credits/channel`,
                data: data1,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {

                        // '消费奖励', '充值奖励','园区发放'
                        this.bar_xflxtj.data[0].value = rsp.data.data.comsume;
                        this.bar_xflxtj.data[1].value = rsp.data.data.recharge;
                        this.bar_xflxtj.data[2].value = rsp.data.data.grant;
                    }
                }
            });
        }

    }
}
</script>