<style scoped>
    .basic1 {
        width: 90%;
        padding: 30px 0 30px 10px;
        background: #f7f7f7;
        margin: 0 auto 40px;
    }

    .item {
        margin-right: 40px;
    }

    .basic {
        width: 400px;
        margin: 0 auto;
    }

    .title {
        line-height: 50px;
        font-weight: bold;
    }
</style>
<template>
    <div>
        <!-- 基本信息 -->
        <div class="basic1">
            <span class="item">会议室名称:&nbsp;{{infoDate.name}}</span>
            <span class="item">地址:&nbsp;{{infoDate.address}}</span>
            <span class="item">面积:&nbsp;{{infoDate.area}}平米</span>
            <span class="item">容纳人数:&nbsp;{{infoDate.peopleNumber}}人以内</span>
        </div>
        <!-- 配置表单 -->
        <div class="basic">
            <p class="title">会议室配置</p>
            <Form
                    ref="assembSeting"
                    :rules="assembSetingValidate"
                    :model="$_assembSeting_$"
                    :label-width="130"
            >
                <Row>
                    <Col span="24">
                        <FormItem label="需提前多久预约:" prop="advanceTime">
                            <Row>
                                <Col span="20">
                                    <Input v-model="$_assembSeting_$.advanceTime1" style="width:95%"></Input>
                                </Col>
                                <Col span="4" align="center" style="line-height: 32px;">小时</Col>
                            </Row>
                            <Row>
                                <Col span="20">
                                    <Input v-model="$_assembSeting_$.advanceTime2" style="width:95%"></Input>
                                </Col>
                                <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="开放时间:" prop="opentime">
                    <TimePicker
                            v-model="Time"
                            format="HH:mm"
                            type="timerange"
                            :editable="false"
                            placement="bottom-end"
                            :steps="[1,15]"
                            style="width: 168px"
                    ></TimePicker>
                </FormItem>
                <Row>
                    <Col span="20">
                        <FormItem label="起订时间:" prop="baseTime">
                            <Input v-model="$_assembSeting_$.baseTime"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="最小增加时间单位:" prop="intervalTime">
                            <Input v-model="$_assembSeting_$.intervalTime"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="最小退订时间:" prop="cancelTime">
                            <Input v-model="$_assembSeting_$.cancelTime"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="会议室打扫时间:" prop="clearTime">
                            <Input v-model="$_assembSeting_$.clearTime"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="消费:" prop="price">
                            <Input v-model="$_assembSeting_$.price"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">元/分钟</Col>
                </Row>
                <FormItem label="退订返还比例:" prop="refundScale">
                    <Input v-model="$_assembSeting_$.refundScale"></Input>
                    <p>例如：预约会议室使用100积分，退订返还70积分</p>
                </FormItem>
                <FormItem align="center">
                    <Button type="primary" @click="$_save_$()">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],

        data() {
            const price = (rule, value, callback) => {
                if (/^[0-9]*[1-9][0-9]*$/.test(Number(value))) {
                    callback()
                } else {
                    callback(new Error('价格应为正整数!'))
                }
            };
            const $_advanceTime_$ = (rule, value, callback) => {
                let time1 = this.$_assembSeting_$.advanceTime1; //提前预约时间  小时
                let time2 = this.$_assembSeting_$.advanceTime2; //提前预约时间  分钟
                let reg = /^\+?[0-9]*$/;

                if( time1 || time2){
                    if (reg.test(Number(time1)) && time1 && !time2) {
                        this.$_assembSeting_$.advanceTime = Number(time1)*60;
                        callback()
                    } else if (reg.test(Number(time2)) && time2 && !time1){
                        if(time2<=60){
                            this.$_assembSeting_$.advanceTime = Number(time2);
                            callback()
                        }else{
                            callback(new Error('分钟数不能超过60'))
                        }
                    } else if (reg.test(Number(time1)) && reg.test(Number(time2))){
                        if(time2<60){
                            this.$_assembSeting_$.advanceTime = Number(time1)*60+Number(time2);
                            callback()
                        }else{
                            callback(new Error('分钟数不能超过60'))
                        }
                    } else {
                        callback(new Error('提前预约时间应为正整数!'))
                    }
                }else{
                    callback(new Error('请填写提前多久预约时间!'))
                }
            };
            const baseTime = (rule, value, callback) => {
                if (Number(value) % 30 === 0) {
                    callback()
                } else {
                    callback(new Error('最小时间应为30的倍数!'))
                }
            };
            const baseTime2 = (rule, value, callback) => {
                if (Number(value) % 5 === 0) {
                    callback()
                } else {
                    callback(new Error('最小时间应为5的倍数!'))
                }
            };
            const baseTime1 = (rule, value, callback) => {
                if (Number(value) % 15 === 0) {
                    callback()
                } else {
                    callback(new Error('最小时间应为15的倍数!'))
                }
            };
            const refundScale = (rule, value, callback) => {
                if (/^\d+$/.test(Number(value)) && Number(value) >= 1 && Number(value) <= 100) {
                    callback()
                } else {
                    callback(new Error('退订比例应为1-100之间的整数!'))
                }
            };
            return {
                //配置信息
                $_assembSeting_$: {},
                info: {
                    // 会议室配置
                    price: "",
                    startTime: "",
                    endTime: "",
                    advanceTime: "",
                    baseTime: "",
                    intervalTime: "",
                    clearTime: "",
                    cancelTime: "",
                    refundScale: ""
                },
                assembSetingValidate: {
                    //会议室配置表单验证
                    price: [
                        {required: true, type: 'number', validator: this.$_validatepostiveint_$, trigger: "change"},
                        {max: 10, message: '不能超过10位数', trigger: "change"},
                    ],
                    opentime: [
                        {required: true, message: "请选择开放时间", trigger: "change"},
                    ],
                    advanceTime: [
                        {required: true,validator: $_advanceTime_$, trigger: "change"},
                    ],
                    baseTime: [
                        {required: true, message: "请填写起订时间", trigger: "change"},
                        {validator: baseTime, trigger: "change"},
                        {max: 5, message: '不能超过5位数', trigger: "change"},
                    ],
                    intervalTime: [
                        {required: true, message: "请填写最小增加时间", trigger: "change"},
                        {validator: baseTime1, trigger: "change"},
                        {max: 5, message: '不能超过5位数', trigger: "change"},
                    ],
                    clearTime: [
                        {required: true, message: "请填写打扫时间", trigger: "change"},
                        {validator: baseTime2, trigger: "change"},
                        {max: 5, message: '不能超过5位数', trigger: "change"},
                    ],
                    cancelTime: [
                        {required: true, message: "请填写最小退订时间", trigger: "change"},
                        {validator: baseTime2, trigger: "change"},
                        {max: 5, message: '不能超过5位数', trigger: "change"},
                    ],
                    refundScale: [
                        {required: true, message: "请输入比例", trigger: "change"},
                        {validator: refundScale, trigger: "change"}
                    ]
                },
                Time: [],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
            };
        },

        created() {
            this.$_global_$.serverPath
            this.$_setting_$();
            this.getInfo();
        },
        methods: {
            $_setting_$() {
                this.infoDate = this.$root.inparams.row; //接受路由的值
            },
            // 获取配置信息
            getInfo() {
                // debugger
                if (this.infoDate.meetingConfig == null) {
                    this.$_assembSeting_$ = this.info
                    this.Time = []
                } else {
                    this.$_assembSeting_$ = this.infoDate.meetingConfig
                    for (var key in this.$_assembSeting_$) {
                        this.$_assembSeting_$[key] = String(this.$_assembSeting_$[key]);
                    }
                    this.Time.push(this.infoDate.meetingConfig.startTime)
                    this.Time.push(this.infoDate.meetingConfig.endTime)
                }
                this.$_assembSeting_$.opentime = '开放时间';

                this.$_assembSeting_$.advanceTime1 = parseInt(this.$_assembSeting_$.advanceTime/60);
                this.$_assembSeting_$.advanceTime2 = this.$_assembSeting_$.advanceTime%60;
            },
            // 保存
            $_save_$() {
                if (this.Time[0] != '' && this.Time[1] != '') {
                    this.$_assembSeting_$.startTime = this.Time[0]
                    this.$_assembSeting_$.endTime = this.Time[1]
                    this.$refs.assembSeting.validate(valid => {
                        if (valid) {
                            if (this.infoDate.meetingConfig == null) {
                                this.$_sendQuery_$({
                                    method: "POST",
                                    url: `${this.$_global_$.serverPath}/zone/zone/${this.infoDate.zoneId}/meeting/${this.infoDate.id}/config`,
                                    data: {
                                        price: Number(this.$_assembSeting_$.price),
                                        startTime: this.$_assembSeting_$.startTime,
                                        endTime: this.$_assembSeting_$.endTime,
                                        advanceTime: Number(this.$_assembSeting_$.advanceTime),
                                        baseTime: Number(this.$_assembSeting_$.baseTime),
                                        intervalTime: Number(this.$_assembSeting_$.intervalTime),
                                        clearTime: Number(this.$_assembSeting_$.clearTime),
                                        cancelTime: Number(this.$_assembSeting_$.cancelTime),
                                        refundScale: Number(this.$_assembSeting_$.refundScale)
                                    },
                                    headers: {"Content-type": "application/json"}
                                }).then((rsp) => {
                                    if (rsp.status === 200) {
                                        if (rsp.data.code === 0) {
                                            this.$root.$_Route_$("superadmin", "sssManage", "assembManage", {zoneId: this.infoDate.zoneId});
                                        } else {
                                            this.$Message.error(rsp.data.message)
                                        }
                                    }
                                })

                            } else {
                                this.$_sendQuery_$({
                                    method: "PUT",
                                    url: `${this.$_global_$.serverPath}/zone/zone/${this.infoDate.zoneId}/meeting/${this.infoDate.id}/config/${this.infoDate.meetingConfig.id}`,
                                    data: {
                                        price: Number(this.$_assembSeting_$.price),
                                        startTime: this.$_assembSeting_$.startTime,
                                        endTime: this.$_assembSeting_$.endTime,
                                        advanceTime: Number(this.$_assembSeting_$.advanceTime),
                                        baseTime: Number(this.$_assembSeting_$.baseTime),
                                        intervalTime: Number(this.$_assembSeting_$.intervalTime),
                                        clearTime: Number(this.$_assembSeting_$.clearTime),
                                        cancelTime: Number(this.$_assembSeting_$.cancelTime),
                                        refundScale: Number(this.$_assembSeting_$.refundScale)
                                    },
                                    headers: {"Content-type": "application/json"}
                                }).then((rsp) => {
                                    if (rsp.status === 200) {
                                        if (rsp.data.code === 0) {
                                            this.$root.$_Route_$("superadmin", "sssManage", "assembManage", {zoneId: this.infoDate.zoneId});
                                        } else {
                                            this.$Message.error(rsp.data.message)
                                        }
                                    }
                                })
                            }
                        }
                    })

                } else {
                    this.$Message.error('请填写开放时间!')
                }
            }
        }
    };
</script>