<style scoped>
.right {
        position: absolute;
        top: 0;
        right: 0;
    }
    .right span {
        margin-right: 20px;
    }
    .res {
        position: relative;
    }
.list li span{display:inline-block;width:33.33%;font-size:12px;color:#333;height: 40px;line-height: 40px;}
.list li{border-bottom:1px solid #ebebeb;box-sizing: border-box;padding: 0 10px;}
.list .top span{width: 10%;}
.list .top{border:none;text-align: center;}
</style>
<template>
    <div class="container">
        <div style="font-size: 14px;padding-left: 3%">
            <span>请选择查看的日期：</span>
            <span class="spanday" @click="hotSyl(7)">7天</span>
            <span class="spanday" @click="hotSyl(14)">14天</span>
            <span class="spanday" @click="hotSyl(30)">30天</span>
            <DatePicker type="daterange"
                        :start-date="new Date()"
                        placement="bottom-start"
                        :editable="false"
                        style="width: 180px"
                        @on-change="hotSyl">
            </DatePicker>
        </div>
        <!-- <p >
                <span @click="hotSyl(7)">7天</span>
                <span @click="hotSyl(14)">14天</span>
                <span @click="hotSyl(30)">30天</span>
                <DatePicker type="daterange"
                            :start-date="new Date()"
                            placement="bottom-end"
                            style="width: 160px"
                            @on-change="hotSyl">
                </DatePicker>
               </p>          -->
        <Row>
            <Col span='16' >  
            
            <ec-chart :chart="bar_chartDataOne">               
            </ec-chart>
        </Col>
            <Col span='8'><ec-chart :chart="bar_jfhqqdtj"></ec-chart></Col>
        </Row>
        <Row>
            <Col span='16'><ec-chart :chart="bar_jfxhl"></ec-chart></Col>
            <Col span='8'>
                <Card style='margin:13px;'>
                    <p slot="title">热门核销售渠道统计 </p>
                    <ul class='list'>
                        <li class='tilte'>
                           <span style="color:#ccc;">排名</span><span>核销渠道</span><span style="color:#ccc;">核销张数</span>
                        </li>
                        <li v-for="(item,index) in $_List_$">
                           <span>{{index+1}}</span><span v-if="item.useType==0">餐厅</span>
                           <span v-else-if="item.useType==1">会议室</span>
                           <span v-else="item.useType==2">停车场</span><span style="color:#00A753;">{{item.useCount}}</span>
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
    data () {
        return {
            $_num_$:999,
            $_querycfg_$:{
				mod:'module',
                params:{
					cmd:4
                }
            },
            hot_hys_endtime:'',
            hot_hys_starttime:'',
            voucherCount:0,
            bar_chartDataOne: {
                id: "bar_chartDataOne",
                type: "zxzzt",
                title: "代金券存量",
                subtext: "",
                color:['#66cc66','#ffcc66','#cccccc','#ef2300'],
                xmes:[],
                title1:['已使用', '未使用','已过期','代金券总张数'],
                data: []
            }, 
            bar_jfxhl: {
                id: "bar_jfxhl",
                type: "zxzzt",
                title: "代金券价值量",
                subtext: "",
                color:['#66cc66','#ffcc66','#cccccc','#ef2300'],
                xmes:[],
                 title1:['已使用', '未使用','已过期','代金券总价值量'],
                data: [
                    ]
            },
            bar_jfhqqdtj:{
                id: "bar_jfhqqdtj",
                type: "bxt",
                // title1:['园区发放','商城兑换','活动领取'］,
                color:['#f5d861','#5ea7f2','#99d776'],
                title: "热门领取渠道统计",
                data: [
                    {value:0, name:'园区发放',type: 'pie',},
                    {value:0, name:'商城兑换',type: 'pie',},
                    {value:0, name:'活动领取',type: 'pie',},
                ]
            },
            $_List_$:[]

        }   
    },
    components: {
        ecChart
    },
      created(){
        this.$_receive_$();
        this.$_jiazhi_$();
        this.$_lqu_$();
        this.$_xiaoshou_$();
    },
    methods:{
        hotSyl(type){
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
                this.$_receive_$();
                this.$_jiazhi_$();
                this.$_lqu_$();
                this.$_xiaoshou_$();
        },
        //代金券存量
        $_receive_$(){
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            let userInfo = JSON.parse(cookie);
            let data1 = {}
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
			this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/operate/statistic/`+userInfo.zoneId+`/voucher/count`,
                data: data1
                ,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        let syl = {
                            name: '已使用',
                            type: 'bar',
                            data: [],
                        };
                        let qxl = {
                            name: '未使用',
                            type: 'bar',
                            data: [],
                        };
                        let tdl = {
                            name: '已过期',
                            type: 'bar',
                            data: [],
                        }; 
                        let zzs = {
                            name: '代金券总张数',
                            type: 'line',
                            data: [],
                        }; 
                        let zs = '';
                        this.bar_chartDataOne.xmes = [];
                        this.bar_chartDataOne.data = [];
                        this.bar_chartDataOne.subtext = "积分总存量"+rsp.data.data.voucherCount;
                        for (let key in rsp.data.data.statisticData) {
                            this.bar_chartDataOne.xmes.push(key);
                            if (rsp.data.data.statisticData[key]) {
                                syl.data.push(rsp.data.data.statisticData[key].used);
                                qxl.data.push(rsp.data.data.statisticData[key].notUsed);
                                tdl.data.push(rsp.data.data.statisticData[key].expired);
                                zzs.data.push(rsp.data.data.statisticData[key].expired+rsp.data.data.statisticData[key].used+rsp.data.data.statisticData[key].notUsed);
                            } else {
                                syl.data.push(0);
                                qxl.data.push(0);
                                tdl.data.push(0);
                                zzs.data.push(0);
                            }
                        }
                        this.bar_chartDataOne.data.push(syl);
                        this.bar_chartDataOne.data.push(qxl);
                        this.bar_chartDataOne.data.push(tdl);
                        this.bar_chartDataOne.data.push(zzs);
                    } else {
                        this.$Message.error('获取统计失败!');
                    }
                }
            })
        },
        $_jiazhi_$(){
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            let userInfo = JSON.parse(cookie);
            let data1 = {}
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
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/operate/statistic/`+userInfo.zoneId+`/voucher/total`,
                data: 
                    data1
                ,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        let syl = {
                            name: '已使用',
                            type: 'bar',
                            data: [],
                        };
                        let qxl = {
                            name: '未使用',
                            type: 'bar',
                            data: [],
                        };
                        let tdl = {
                            name: '已过期',
                            type: 'bar',
                            data: [],
                        }; 
                        let zzs = {
                            name: '代金券总价值量',
                            type: 'line',
                            data: [],
                        }; 
                        let zs = '';
                        this.bar_jfxhl.xmes = [];
                        this.bar_jfxhl.data = [];
                        this.bar_jfxhl.subtext = "代金券价值量"+rsp.data.data.voucherTotal;
                        for (let key in rsp.data.data.statisticData) {
                            this.bar_jfxhl.xmes.push(key);
                            if (rsp.data.data.statisticData[key]) {
                                syl.data.push(rsp.data.data.statisticData[key].used);
                                qxl.data.push(rsp.data.data.statisticData[key].notUsed);
                                tdl.data.push(rsp.data.data.statisticData[key].expired);
                                zzs.data.push(rsp.data.data.statisticData[key].expired+rsp.data.data.statisticData[key].used+rsp.data.data.statisticData[key].notUsed);
                            } else {
                                syl.data.push(0);
                                qxl.data.push(0);
                                tdl.data.push(0);
                                zzs.data.push(0);
                            }
                        }
                        this.bar_jfxhl.data.push(syl);
                        this.bar_jfxhl.data.push(qxl);
                        this.bar_jfxhl.data.push(tdl);
                        this.bar_jfxhl.data.push(zzs);
                    } else {
                        this.$Message.error('获取统计失败!');
                    }
                }
            })
        },
        $_lqu_$(){
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            let userInfo = JSON.parse(cookie);
            let data1 = {}
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
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/operate/statistic/`+userInfo.zoneId+`/voucher/channel`,
                data: 
                    data1
                ,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        //'园区发放','商城兑换','活动领取'
                        this.bar_jfhqqdtj.data[0].value = rsp.data.data[0].grant;
                        this.bar_jfhqqdtj.data[1].value = rsp.data.data[0].mall;
                        this.bar_jfhqqdtj.data[2].value = rsp.data.data[0].activity;
                    } else {
                        this.$Message.error('获取统计失败!');
                    }
                }
            })
        },
        $_xiaoshou_$(){
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            let userInfo = JSON.parse(cookie);
            let data1 = {}
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
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/operate/statistic/`+userInfo.zoneId+`/voucher/used`,
                data: 
                    data1
                ,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        if(rsp.data.data){
                            this.$_List_$ = rsp.data.data 
                        }else{
                            this.$_List_$ = [
                                {
                                    "useCount": '',
                                    "useType": ''
                                }]
                        }
                    } else {
                        this.$Message.error('获取统计失败!');
                    }
                }
            })
        }
    }
}
</script>