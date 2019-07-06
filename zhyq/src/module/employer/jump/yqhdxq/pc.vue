<style scoped>
    .top {
        width: 90%;
        margin: 0 auto;
        border: 1px solid #f7f7f7;
        box-sizing: border-box;
        padding: 30px 70px 30px 70px;
        margin-bottom: 40px;
        box-shadow: 5px 5px 5px #f7f7f7;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        line-height: 40px;
    }

    .top p {
        line-height: 40px;
        height: 40px;
        font-size: 14px;
    }
    .top p img{
        width: 15px;
        height: 15px;
        position: relative;
        top: 3px;
        margin-right: 6px;
    }

    .img {
        width: 180px;
        height: 160px;
        background: #f7f7f7;
        overflow: hidden;
    }

    .bottom {
        width: 90%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0px 0px 20px 2px;
        margin-bottom: 40px;
    }

    .bottom .time {
        text-align: right;
        line-height: 70px;
    }

    .bottom .fj {
        line-height: 70px;
    }

    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .wrap .pic {
        float: left;
        width: 50px;
        height: 30px;
        background: #f7f7f7;
        margin-right: 15px;
    }

    .wrap .text {
        float: left;
    }
</style>
<template>
    <div>
        <!-- 上部分 -->
        <div class="top">
            <Row>
                    <Col span="16">

                        <Row>
                            <div class="title">活动名称:&nbsp;{{obj.title}}</div>
                        </Row>
                        <Row>
                            <Col span="14">
                                <p>
                                    <img src="/static/employers/yqhd/time.png" />
                                    活动开始时间:&nbsp;{{obj.beginDate}}
                                </p>
                                <p>
                                    <img src="/static/employers/yqhd/time.png" />
                                    活动结束时间:&nbsp;{{obj.endDate}}
                                </p>
                                <p>
                                    <img src="/static/employers/yqhd/status.png" />
                                    <span>活动状态:&nbsp;
                                    <span v-if="actStatus == 1">已结束</span>
                                    <span v-else-if="actStatus == 0">未开始</span>
                                    <span v-else>进行中</span>
                                </span>

                                </p>
                            </Col>
                            <Col span="10">
                                <p>
                                    <img src="/static/employers/yqhd/my.png" />
                                    联系人:&nbsp;{{obj.contactName}}
                                </p>
                                <p>
                                    <img src="/static/employers/yqhd/phone.png" />
                                    联系方式:&nbsp;{{obj.contactNumber}}
                                </p>
                                <p>
                                    <img src="/static/employers/yqhd/address.png" />
                                    活动地点:&nbsp;{{obj.address}}
                                </p>
                            </Col>
                        </Row>
                    </Col>

                    <Col span="8" align="right">
                        <div class="img"><img :src="$_global_$.imgPath+obj.images[0]" alt="" style="width: 100%;height: 100%"></div>
                    </Col>
                </Row>
        </div>
        <!-- 下部分 -->
        <div class="bottom">
            <p class="title" style="line-height: 55px">活动介绍:</p>
            <p v-html="obj.content"></p>
            <p class="time">{{obj.createDate}}</p>
            <!--<p class="fj title">附件&nbsp;<span style="cursor: pointer;" @click="downloadFile(obj.files)">点击下载</span></p>-->
            <div class="fj title">
                附件:
                <br>
                <div v-for="item in upurl">
                    <a :href="item.url" >{{item.name}}</a>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Row>

            <Col span="24" style="text-align: center">
                <Button shape="circle" type="primary" @click="back">返回</Button>

                <Button v-if="actStatus==1" shape="circle" type="warning">活动结束</Button>
                <Button v-if="actStatus==0" shape="circle" type="warning">活动未开始</Button>


                <p v-if="obj.couponGrantId==null||actStatus==1"></p>
                <Button v-else-if="obj.userCoupon" shape="circle" type="warning">已领取</Button>
                <Button v-else="" shape="circle" type="primary" @click="$_lq_$(obj.couponId)">领取代金券</Button>


                <p v-if="obj.apply==0||actStatus==1"></p>
                <Button v-else-if="obj.userApply==true" shape="circle" type="warning">已报名</Button>
                <Button v-else-if="obj.applyCount==obj.peopleNumber" shape="circle" type="warning">人数已满</Button>
                <Button v-else="" shape="circle" type="primary" @click="$_bm_$(obj.id)">报名参加</Button>


            </Col>
        </Row>
        <!-- 领取弹窗 -->
        <Modal v-model="modal1"
               title="领取代金券"
               @on-ok="$_ok_$(djj.id)"
               @on-cancel="$_cancel_$">
            <div class="wrap clear">
                <!--<div class="pic"></div>-->
                <div class="text">
                    <p>代金券名称：{{djj.name}}</p>
                    <p>代金券详情：{{djj.info}}</p>
                    <span v-if="this.djj.threshold ==0">
                        <p>代金券面值：{{djj.denomination}}</p>
                    </span>
                    <span v-if="this.djj.threshold ==1">
                        <p>代金券面值：{{djj.denomination}}&nbsp;&nbsp;&nbsp;&nbsp;满{{djj.quota}}可用</p>
                    </span>
                    <p>使用场景：{{djj.useType}}</p>
                    <span v-if="this.djj.threshold ==0">
                        <p>使用规则：无限制</p>
                    </span>
                    <span v-if="this.djj.threshold ==1">
                        <p>使用规则：满减</p>
                    </span>

                    <span v-if="this.djj.validFlag==1">
                        <p>djq有效期：领取后{{djj.validCount}}天有效</p>
                    </span>
                    <span v-if="this.djj.validFlag==0">
                        <p>代金券有效期：{{djj.beginDateStr}}-{{djj.endDateStr}}</p>
                    </span>
                    
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import controler from "./controler.js";
    import axios from 'axios'

    export default {
        mixins: [controler],
        filters: {
            getimg(val) {
                if (val) {
                    var img = JSON.parse(val);
                    return img[0].imageUrl;
                }
            }
        },
        data() {
            return {
                id: '',
                activityId: '',
                obj: {},
                djj: {},
                upurl:[],
                files:[],
                modal1: false,
                // djqStatus: 1,
                actStatus: 2,//活动状态 0，1
            };
        },
        created() {
            this.$_detail_$();
        },
        methods: {
            back() {
                this.$root.$_Route_$('employer', 'service', 'yqhd', {})
            },
            //附件下载
            downloadFile(url) {
                try {
                    var elemIF = document.createElement("iframe");
                    elemIF.src = url;
                    elemIF.style.display = "none";
                    document.body.appendChild(elemIF);
                } catch (e) {

                }
            },
            $_list_$(){
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/company/activity/${this.activityId}`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                    }).then((rsp) => {
                        //   console.log(rsp)
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.obj = rsp.data.data;
                                this.obj.images =JSON.parse(this.obj.images);
                                this.upurl = [];
                                if(this.obj.files){
                                    this.files = this.obj.files.split(",");
                                    for(let i=0;i<this.files.length;i++){
                                        this.upurl.push({
                                            name: this.files[i],
                                            url: this.$_global_$.imgPath + this.files[i]
                                        });
                                    }
                                }
                            }
                        }
                    })
                },
            $_detail_$() {
                this.obj =this.$root.inparams.row;
                this.activityId = this.obj.id
                this.upurl = [];
                if(this.obj.files){
                    this.files = this.obj.files.split(",");
                    for(let i=0;i<this.files.length;i++){
                        this.upurl.push({
                            name: this.files[i],
                            url: this.$_global_$.imgPath + this.files[i]
                        });
                    }
                }
                


                //当天日期
                let date3 = new Date();
                let nowDay = date3.getFullYear() + "-" + ((date3.getMonth() + 1) < 10 ? "0" + (date3.getMonth() + 1) : (date3.getMonth() + 1)) + "-" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate()) + " " + "00:00:00";
                let nowDate = new Date(nowDay);

                let beginDate = new Date(this.obj.beginDate);
                let endDate = new Date(this.obj.endDate);

                //当前时间
                let nowTime = nowDate.getTime();
                //开始时间
                let beginTime = beginDate.getTime();
                //结束时间
                let endTime = endDate.getTime();

                if (nowTime < beginTime) {
                    this.actStatus = 0;
                }
                if (endTime < nowTime) {
                    this.actStatus = 1;
                }
            },
            // 领取代金券
            $_lq_$(couponId) {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + '/operate/voucher/info?idStr=' + couponId,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.modal1 = true;
                            this.djj = rsp.data.data
                            if(this.djj.useType==0){
                                this.djj.useType = '餐厅'
                            }
                            if(this.djj.useType==1){
                                this.djj.useType = '会议室'
                            }
                            if(this.djj.useType==2){
                                this.djj.useType = '停车场'
                            }
                            if(this.djj.useType==3){
                                this.djj.useType = '商城'
                            }
                            if(this.threshold == 0){
                                this.threshold = '无限制'
                            }
                            if(this.threshold == 1){
                                this.threshold = '满减'
                            }
                        } else {
                            this.$Message.error('获取数据失败');
                        }
                    } else {
                        this.$Message.error('获取数据失败');
                    }
                })
            },
            // 报名参加
            $_bm_$(id) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/company/activity/' + id + '/apply',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data === 1) {
                                this.$Message.success('报名成功');
                                this.$_list_$();
                            }
                        }
                    } else {
                        this.$Message.error('获取数据失败');
                    }
                })

            },
            // 弹窗确认
            $_ok_$(id) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/company/activity/' + this.obj.id + '/coupon',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data == 1) {
                                this.obj.userCoupon = true;
                                this.$Message.success('领取成功');
                                this.$_list_$();
                            }
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    } else {
                        this.$Message.error('领取失败');
                    }
                })
            },
            // 弹窗取消
            $_cancel_$() {
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                    }
                }
            }
        }
    };
</script>