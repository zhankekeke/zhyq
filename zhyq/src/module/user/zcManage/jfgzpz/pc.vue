<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .box {
        width: 500px;
        margin: 0 auto;
        color: #666;
        font-size: 16px;
        font-weight: 500;
        line-height: 50px;
    }

    .textrt {
        text-align: left;
        padding-left: 100px;
    }

    .box input {
        width: 102px;
        height: 25px;
        color: #000;
        font-size: 13px;
        margin: 0 10px;
    }

    .paddingLeft {
        padding-left: 30px;
        font-size: 14px;
    }

    .paddingLR {
        padding: 0 15px;
        font-size: 16px;
        color: #000;
    }

    .sm {
        color: #999;
        font-size: 12px;
        padding-left: 200px;
    }

    .btn {
        padding-left: 200px;
        margin-top: 20px;
    }
</style>
<template>
    <div class="container">
        <div class="box">
            <p>积分人民币兑换率</p>
            <p class="textrt">
                1元＝
                <input type="text" placeholder="请输入1-9的数字" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="9" v-model="$_rateData_$.exRate" >积分
            </p>
            <p class="sm">1元＝{{$_rateData_$.exRate}}积分</p>
            <p>积分配置规则</p>
            <p class="paddingLeft">
                充值积分获取规则
                <span class="paddingLeft">充值</span>
                <span class="paddingLR">1</span>元获赠：
                <input type="text" placeholder="请输入1-9的数字" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="9" v-model="$_rateData_$.payRate">
                <span>积分</span>
            </p>
            <p class="paddingLeft">
                消费积分获取规则
                <span class="paddingLeft">充值</span>
                <span class="paddingLR">1</span>元获赠：
                <input type="text" placeholder="请输入1-9的数字" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="9" v-model="$_rateData_$.upRate">
                <span>积分</span>
            </p>
            <p class="btn">
                <Button type="primary" @click="$_peizhi_$">保存配置</Button>
            </p>
        </div>
    </div>
</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_num1_$: 100,
                $_num2_$: 20,
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_rateData_$: {
                    exRate: "",
                    payRate: "",
                    upRate: ""
                },//需要提交的汇率数据
                $_isUpdata_$: 0,
                $_ruleId_$: ''
            };
        },
        created() {
            this.$_searchRule_$();
        },
        methods: {
            $_searchRule_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/operate/creditsRule/info?zoneId=` + userInfo.zoneId,
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$_rateData_$.exRate = res.data.data.exRate;
                            this.$_rateData_$.payRate = res.data.data.payRate;
                            this.$_rateData_$.upRate = res.data.data.upRate;
                            this.$_isUpdata_$ = 1;
                            this.$_ruleId_$ = res.data.data.id;
                        }
                    }
                });
            },
            $_list_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                if (this.$_isUpdata_$) {
                    this.$_sendQuery_$({
                        method: "GET",
                        url: `${this.$_global_$.serverPath}/zone/zone/${userInfo.zoneId}`,
                    }).then(rsp => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_sendQuery_$({
                                    method: "POST",
                                    url: `${this.$_global_$.serverPath}/operate/creditsRule/update`,
                                    data: {
                                        id: this.$_ruleId_$,
                                        zoneId: userInfo.zoneId,
                                        zoneName: rsp.data.data.name,
                                        exRate: Number(this.$_rateData_$.exRate),
                                        payRate: Number(this.$_rateData_$.payRate),
                                        upRate: Number(this.$_rateData_$.upRate)
                                    },
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(res => {
                                    if (res.status === 200) {
                                        if (res.data.code === 0) {
                                            this.$Message.success('配置修改成功');
                                        } else {
                                            this.$Message.success('配置修改失败！！！');
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    this.$_sendQuery_$({
                        method: "GET",
                        url: `${this.$_global_$.serverPath}/zone/zone/${userInfo.zoneId}`,
                    }).then(rsp => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_sendQuery_$({
                                    method: "POST",
                                    url: `${this.$_global_$.serverPath}/operate/creditsRule/create`,
                                    data: {
                                        zoneId: userInfo.zoneId,
                                        zoneName: rsp.data.data.name,
                                        exRate: Number(this.$_rateData_$.exRate),
                                        payRate: Number(this.$_rateData_$.payRate),
                                        upRate: Number(this.$_rateData_$.upRate)
                                    },
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(res => {
                                    if (res.status === 200) {
                                        if (res.data.code === 0) {
                                            this.$Message.success('配置成功');
                                        } else {
                                            this.$Message.success('配置失败：规则已存在或网络错误！！！');
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            },

            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                        this.list = rsp.data.obj;
                    }
                }
            },
            // 保存配置
            $_peizhi_$() {
                this.$_list_$()
            }
        }
    };
</script>