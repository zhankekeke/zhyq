<style scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .info {
        width: 100%;
        margin: 0 auto 20px;
        padding: 10px 0 20px 30px;
        border: 1px solid #f7f7f7;
        border-radius: 6px;
        box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.15);
    }

    .info .title {
        font-size: 16px;
        line-height: 40px;
    }

    .info .list {
        width: 25%;
        float: left;
    }

    .info .list p {
        line-height: 30px;
        font-size: 14px;
    }

    .gj {
        background: #F2F2F2;
        width: 80%;
        margin: 0 auto 8px;
        padding: 20px 30px 30px 0;
        box-sizing: border-box;
    }

    .gj .gjimg {
        float: right;
        margin-left: 20px;
    }

    .gj .gjcont {
        float: right;
    }

    .gj .gjcont .name {
        text-align: right;
    }

    .gj .gjcont .deal {
        text-align: right;
    }

    .yh {
        background: #f7f7f7;
        width: 80%;
        margin: 0 auto 8px;
        padding: 20px 0 30px 30px;
        box-sizing: border-box;
    }

    .yh .yhimg {
        float: left;
        margin-right: 20px;
    }

    .yh .yhcont {
        float: left;
    }

    .name {
        margin-bottom: 10px;
    }

    .img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: #f00;
    }

    .ltjl {
        margin: 30px 20px;
    }

    .ltjl li {
        box-sizing: border-box;
        padding: 30px 100px 20px 100px;
        background: #f2f2f2;
        margin-bottom: 10px;
        position: relative;
    }

    .ltjl .right {
        text-align: right;
    }

    .ltjl .right .touxiang {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 48px;
    }

    .ltjl .left {
        text-align: left;
    }

    .ltjl .left .touxiang {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 48px;
    }

    .fujian {
        margin-top: 15px;
    }

    .fujian img {
        width: auto;
        height: 100px;
    }
</style>
<template>
    <div>
        <!-- 事项概况 -->
        <div class="info">
            <div class="top clear">
                <p class="title">事项概况</p>
                <p class="title">序号：{{$_info_$.id}}</p>
            </div>
            <div class="content clear">
                <div class="list">
                    <p>事项分类：{{$_info_$.recordTypeName}}</p>
                    <p>事项名称：{{$_info_$.recordTitle}}</p>
                </div>
                <div class="list">
                    <p>用户名称：{{$_info_$.commiterName}}</p>
                    <p>用户单位：{{$_info_$.commiterEnterpriseName}}</p>
                    <p>联系电话：{{$_info_$.commiterPhoneNumber}}</p>
                </div>
                <div class="list">
                    <p>提交时间：{{$_info_$.commiterPubtime}}</p>
                    <p v-if="$_info_$.recordStatus==3">完成时间：{{$_info_$.handlerCompletime}}</p>
                    <p v-if="$_info_$.recordStatus==2">受理时间：{{$_info_$.handlerRecvtime}}</p>
                </div>
                <div class="list">
                    <p v-if="$_info_$.recordStatus == 0">状态：未受理</p>
                    <p v-else-if="$_info_$.recordStatus == 1">状态：处理中</p>
                    <p v-else-if="$_info_$.recordStatus == 2">状态：已解决</p>
                    <p v-else-if="$_info_$.recordStatus == 3">状态：已完成</p>
                </div>
                <div class="list">
                    <Row>服务评价：</Row>
                    <Row class="f12">服务及时 &nbsp;&nbsp;&nbsp;&nbsp;
                        <Rate allow-half disabled v-model="this.$_info_$.commiterTimelinessStar"></Rate>
                    </Row>
                    <Row class="f12">流畅高效 &nbsp;&nbsp;&nbsp;&nbsp;
                        <Rate allow-half disabled v-model="this.$_info_$.commiterEfficiencyStar"></Rate>
                    </Row>
                    <Row class="f12">专业可靠 &nbsp;&nbsp;&nbsp;&nbsp;
                        <Rate allow-half disabled v-model="this.$_info_$.commiterReliableStar"></Rate>
                    </Row>
                    <Row class="f12">积极周到 &nbsp;&nbsp;&nbsp;&nbsp;
                        <Rate allow-half disabled v-model="this.$_info_$.commiterConsiderateStar"></Rate>
                    </Row>
                    <Row class="f12"><span style="display:block;float:left;">评价</span> &nbsp;&nbsp;&nbsp;&nbsp;
                        {{this.$_info_$.commiterEvaluate}}
                    </Row>
                </div>
            </div>
        </div>
        <!-- 聊天记录 -->
        <div class="record">
            <ul class="ltjl">
                <li style="height: 182px;" v-for="item in $_msg_$" :class="{right:true,left:item.itemRoler=='c'}">
                    <!--<img src="https://d26uhratvi024l.cloudfront.net/gsc/32BFNR/7c/37/a8/7c37a86910b34864b1d6c7749592a794/images/服务记录详情/u15109.png?token=4597302ad3ba54361084420c0a5e9356" alt="">-->
                    <img class="touxiang" :src="$_global_$.imgPath + item.image" alt="">
                    <p>
                        <span v-show="item.itemRoler=='h'">（系统回复）</span>{{item.name}}：{{item.itemPubdate}}
                    </p>
                    <p v-if="item.itemInfo !=='zpyqmm00aa'">{{item.itemInfo}}</p>
                    <p v-if="item.itemAttachment" class="fujian">
                        <a v-if="!item.isImg" :href="$_global_$.imgPath + item.itemAttachment">附件下载</a>
                        <img v-if="item.isImg" :src="$_global_$.imgPath + item.itemAttachment">
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import controler from "./controler.js";
    import {EventBus} from "@/libs/eventbus.js";

    export default {
        mixins: [controler],
        data() {
            return {
                hfaceurl: '', //管家头像
                cfaceurl: '',  //员工头像
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_info_$: {},
                $_msg_$: []
            };
        },
        methods: {
            $_detail_$() {
                this.$_info_$ = this.$root.inparams.row
                if (this.$root.inparams.row.handlerCompletime) {
                    this.$_info_$.handlerCompletime = this.FormatAllDate(this.$root.inparams.row.handlerCompletime)
                }
                if (this.$root.inparams.row.handlerRecvtime) {
                    this.$_info_$.handlerRecvtime = this.FormatAllDate(this.$root.inparams.row.handlerRecvtime)
                }
                if (this.$_info_$.recordTypeCode == 1) {
                    this.$_info_$.recordTypeName = "物业保修"
                } else if (this.$_info_$.recordTypeCode == 2) {
                    this.$_info_$.recordTypeName = "投诉建议"
                } else if (this.$_info_$.recordTypeCode == 3) {
                    this.$_info_$.recordTypeName = "企业服务咨询"
                } else {
                    this.$_info_$.recordTypeName = "留言"
                }
                this.$_info_$.commiterPubtime = this.FormatAllDate(this.$root.inparams.row.commiterPubtime)
                this.$_info_$.commiterTimelinessStar = Number(this.$_info_$.commiterTimelinessStar) / 20
                this.$_info_$.commiterConsiderateStar = Number(this.$_info_$.commiterConsiderateStar) / 20
                this.$_info_$.commiterEfficiencyStar = Number(this.$_info_$.commiterEfficiencyStar) / 20
                this.$_info_$.commiterReliableStar = Number(this.$_info_$.commiterReliableStar) / 20
            },
            //附件下载
            downloadFile(url) {
                try {
                    var elemIF = document.createElement("iframe");
                    elemIF.src = this.$_global_$.imgPath + url;
                    elemIF.style.display = "none";
                    document.body.appendChild(elemIF);
                } catch (e) {

                }
            },
            //获取管家头像
            housekeeper() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/queryStewardDetails`,
                    data: {
                        stewardId: this.$_info_$.stewardId
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.hfaceurl = rsp.data.data.image;
                        }
                    }
                })
            },
            //获取员工头像
            staff() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/company/${this.$_info_$.commiterEnterpriseId}/employee/search`,
                    data: {
                        phoneNum: this.$_info_$.commiterPhoneNumber
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data && rsp.data.data.records) {
                                this.cfaceurl = rsp.data.data.records[0].faceUrl;
                            }
                        }
                    }
                })
            },
            isInArray(arr, value) {
                for (var i = 0; i < arr.length; i++) {
                    if (value == arr[i]) {
                        return true;
                    }
                }
                return false;
            },
            FormatAllDate(sDate) {
                var date = new Date(sDate);
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                //月
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                //日
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                //时
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                //分
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                //秒
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                //格式化后日期为：yyyy-MM-dd HH:mm:ss
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + hours + seperator2 + minutes + seperator2 + seconds;
                return currentdate;
            },
            $_list_$() {

                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/queryServiceItemByRecodeId`,
                    data: {
                        record_id: this.$_info_$.id
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_msg_$ = rsp.data.data;
                            for (let i = 0; i < this.$_msg_$.length; i++) {
                                this.$_msg_$[i].itemPubdate = this.FormatAllDate(this.$_msg_$[i].itemPubdate);
                                let arr = this.$_msg_$[i].itemAttachment.split('.');
                                let dataArr = ['jpg', 'png', 'gif', 'jpeg'];
                                if (this.isInArray(dataArr,arr[1])) {
                                    this.$_msg_$[i].isImg = 1
                                } else {
                                    this.$_msg_$[i].isImg = 0
                                }
                            }
                        }
                    }
                })

            },
        },

        created() {
            //获取记录ID
            this.$_detail_$();
            this.housekeeper();
            this.staff();
            this.$_list_$();
        },
    };
</script>