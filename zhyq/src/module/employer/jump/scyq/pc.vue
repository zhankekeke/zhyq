<style scoped>
    .myul {
        margin-bottom: 20px;
    }

    .myul >>> .ivu-col {
        margin: 10px 0;
    }

    .top {
        text-align: center;
        width: 60%;
        margin-left: 20%;
        margin-top: 94px;
    }

    .top img {
        width: 94px;
        height: 94px;
    }

    .wechatCard {
        width: 60%;
        height: 148px;
        border: 1px solid rgb(230, 230, 230);
        margin-left: 20%;
        margin-top: 68px;
    }

    .wechatCard .faceimg {
        margin-left: 37px;
        height: 62px;
        width: 62px;
    }

    .faceimg img {
        width: 62px;
        height: 62px;
    }

    .wechatCard .line {
        width: 1px;
        height: 18px;
        border-right: 1px solid rgb(205, 205, 205);
        margin: 0 5px;
        display: inline-block;
        position: relative;
        top: 4px;
    }

    .wechatCard .nickName {
        font-size: 18px;
        color: rgb(51, 51, 51);
        margin-left: 34px;
    }

    .bottom {
        margin-left: 20%;
        margin-top: 60px;
        width: 60%;
    }

    .bottom .listContent {
        margin: 11px 0;
        font-size: 16px;
        color: rgb(51, 51, 51);
    }
</style>
<template>
    <div class="container">
        <div class="top">
            <p>
                <img v-if="obj.visitorType==1||obj.auditStatus==1" src="/static/employers/fkgl/success.png"/>
                <img v-else src="/static/employers/fkgl/fail.png"/>
                <!--<Icon type="ios-checkmark" color="green" style="font-size:180px;"></Icon>-->
            </p>
            <p v-if="obj.visitorType==1||obj.auditStatus==1" style="font-size:18px;color:rgb(51,51,51);margin-top:30px">
                {{obj.auditStatus|switchStatus}}</p>
            <p v-else style="font-size:18px;color:rgb(51,51,51);margin-top:30px">{{obj.auditStatus|switchStatus}}</p>
        </div>
        <Row v-if="obj.nickname && obj.headImgUrl" class="wechatCard">
            <Col span="24" style="margin-top: 27px">
                <Row type="flex" justify="start" align="middle">
                    <Col class="faceimg">
                        <img :src="obj.headImgUrl"/>
                    </Col>
                    <Col class="nickName">
                        <span>{{obj.nickname}}</span>
                    </Col>
                </Row>
            </Col>
            <Col span="22" style="margin: 23px 0 0 30px;border-top: 1px solid rgb(230,230,230);padding: 4px 0 0 5px">
                <img style="width: 13px;height: 11px" src="/static/employers/fkgl/wechat.png"/>
                <div class="line"></div>
                <div style="display:inline-block;font-size: 12px;color: rgb(136,136,136)">个人名片</div>
            </Col>
        </Row>

        <Row class="bottom" type="flex" justify="start">
            <Col span="24" align="left"
                 style="font-size: 16px;font-weight:bold;color: rgb(51,51,51);margin-bottom: 27px">
                邀请信息
            </Col>
            <Col span="9">
                <Row>
                    <Col class="listContent">
                        <span>访客姓名：</span>
                        <span>{{obj.visitorName}}</span>
                    </Col>
                    <Col class="listContent">
                        <span>联系方式：</span>
                        <span>{{obj.visitorMobile}}</span>
                    </Col>
                    <Col class="listContent">
                        <span>公司名称：</span>
                        <span>{{obj.visitorCompany}}</span>
                    </Col>
                    <Col class="listContent">
                        <span>部门名称：</span>
                        <span>{{obj.visitorOrg}}</span>
                    </Col>
                </Row>

            </Col>
            <Col span="10">
                <Row>
                    <Col class="listContent">
                        <span>来访事由：</span>
                        <span>{{obj.visitReason}}</span>
                    </Col>
                    <Col class="listContent">
                        <span>来访日期：</span>
                        <span>{{obj.visitDate}}</span>
                    </Col>
                    <Col class="listContent">
                        <span>审核状态：</span>
                        <span>{{obj.auditStatus|switchStatus}}</span>
                    </Col>
                    <Col class="listContent" style="color: #ff0000" v-if="obj.auditStatus==2">
                        <span>审核不通过：</span>
                        <span>{{obj.auditDesc}}</span>
                    </Col>
                    <Col class="listContent" v-if="obj.meetingId">
                        <span>会议室：</span><span>{{obj.meetingRoomName}}  ( {{obj.meetingAddress}} )</span>
                    </Col>
                    <Col class="listContent" v-if="obj.meetingId">
                        <span>开始时间：</span><span>{{obj.meetingStartTime}}</span>
                    </Col>
                    <Col class="listContent" v-if="obj.meetingId">
                        <span>结束时间：</span><span>{{obj.meetingEndTime}}</span>
                    </Col>
                </Row>
            </Col>
            <Col v-if="obj.visitorType==1||obj.auditStatus==1" span="5" align="center">
                <Row type="flex" justify="center" align="middle">
                    <Col span="24" align="center">
                        <div class="img" style="width:100px;height:100px;">
                            <img :src="$_global_$.imgPath + obj.qrCode" style="width:68px;height:69px;">
                        </div>
                    </Col>
                    <Col span="24" align="center" style="font-size: 16px;color: rgb(51,51,51)">
                        扫一扫,
                        <p>将邀请信息发给好友</p>
                    </Col>
                </Row>
            </Col>
        </Row>

        <div align="center" style="margin-top: 122px">
            <Button type="primary" @click="$_myRecord_$">返回列表</Button>
        </div>

        <!--<Row>
            <Col span="8" style="margin-left: 10%">
                <h3>邀请信息</h3>
                <div v-if="obj.visitorType==1||obj.auditStatus=='审核通过'">
                    <p style="text-align:center">
                        <Icon type="ios-checkmark" color="green" style="font-size:60px;"></Icon>
                    </p>
                    <h1 style="font-size:20px;text-align:center">邀请成功</h1>
                </div>
                <Row>
                    <Col span="15" offset="1">
                        <Row class="myul">
                            <Col>
                                <span>访客姓名：</span>
                                <span>{{obj.visitorName}}</span>
                            </Col>
                            <Col>
                                <span>联系方式：</span>
                                <span>{{obj.visitorMobile}}</span>
                            </Col>
                            <Col>
                                <span>公共名称：</span>
                                <span>{{obj.visitorCompany}}</span>
                            </Col>
                            <Col>
                                <span>部门名称：</span>
                                <span>{{obj.visitorOrg}}</span>
                            </Col>
                        </Row>

                        <Row class="myul">
                            <Col>
                                <span>来访事由：</span><span>{{obj.visitReason}}</span>
                            </Col>
                            <Col>
                                <span>状态：</span><span>{{obj.auditStatus}}</span>
                            </Col>
                            <Col>
                                <span>来访日期：</span><span>{{obj.visitDate}}</span>
                            </Col>
                            <Col v-if="obj.meetingId">
                                <span>会议室：</span><span>{{obj.meetingRoomName}}  ( {{obj.meetingAddress}} )</span>
                            </Col>
                            <Col v-if="obj.meetingId">
                                <span>会议开始时间：</span><span>{{obj.meetingStartTime}}</span>
                            </Col>
                            <Col v-if="obj.meetingId">
                                <span>会议结束时间：</span><span>{{obj.meetingEndTime}}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div align="center">
                    <Button type="primary" @click="$_myRecord_$">返回列表</Button>
                </div>
            </Col>
            <Col span="5" align="left" style="margin-top: 13%" v-if="obj.visitorType==1||obj.auditStatus=='审核通过'">
                <Row type="flex" justify="center" align="middle">
                    <Col span="24" align="center">
                        <div class="img" style="width:100px;height:100px;">
                            <img :src="$_global_$.imgPath + obj.qrCode" style="width:100px;height:100px;">
                        </div>
                    </Col>
                    <Col span="24" align="center" class="mt10">
                        扫一扫,
                        <p>将邀请信息发给好友 </p>
                    </Col>
                </Row>
            </Col>
        </Row>-->

    </div>

</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                obj: {},
            };
        },
        filters: {
            switchStatus(value) {
                switch (value) {
                    case 0:
                        return '待审核';
                    case 1:
                        return '审核通过';
                    case 2:
                        return '审核不通过';
                }
            }
        },
        methods: {
            $_handleSubmit_$() {
                let info = this.$root.inparams.row;
                this.obj = this.$root.inparams.row;

                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/visitor/detail/${info.id}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.obj = rsp.data.data;

                            this.obj.visitDate = this.obj.visitDate.substr(0, 10);
                            // if (this.obj.auditStatus == 0) {
                            //     this.obj.auditStatus = '待审核'
                            // } else if (this.obj.auditStatus == 1) {
                            //     this.obj.auditStatus = '审核通过'
                            // } else if (this.obj.auditStatus == 2) {
                            //     this.obj.auditStatus = '审核不通过'
                            // }
                        } else {
                            this.$Message.error('网络繁忙，请稍后再试');
                        }
                    }
                })

            },
            //返回列表
            $_myRecord_$() {
                this.$root.$_Route_$("employer", "work", "fkgl")
            }
        },
        created() {
            this.$_handleSubmit_$()

        },
    };
</script>

