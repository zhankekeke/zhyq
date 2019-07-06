<style scoped>
    .top {
        width: 90%;
        padding: 30px 50px 10px 0px;
        box-sizing: border-box;
        margin: 0 auto;
    }

    .top p {
        font-size: 12px;
        margin-bottom: 10px;
    }

    .btn {
        width: 79%;
        margin-top: 30px;
    }

    .info {
        width: 80%;
        margin: 0 auto;
        padding: 20px 20px 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #f7f7f7;
    }

    .img {
        width: 150px;
        height: 90px;
        /* background: #f7f7f7; */
    }

    .info p {
        font-size: 14px;
        font-weight: bold;
        line-height: 30px;
    }

    .content {
        width: 86%;
        margin: 20px auto 0;
    }

    .title {
        font-size: 14px;
        font-weight: bold;
        line-height: 50px;
    }

    .normal {
        font-size: 14px;
        line-height: 30px;
    }

    .time {
        text-align: right;
        line-height: 50px;
    }

    .fj {
        font-size: 14px;
        font-weight: bold;
        line-height: 30px;
    }
</style>
<template>
    <div>
        <!-- 上部分 -->
        <Card>
            <div class="top">
                <Row>
                    <Col span="7">
                        <p style="font-size: 14px; font-weight: bold;">
                            活动名称:&nbsp;{{$_data_$.title}}
                        </p>
                        <p>
                            <Icon type="ios-clock-outline"></Icon>
                            活动地点:&nbsp;{{$_data_$.address}}
                        </p>
                        <p>
                            <Icon type="ios-clock-outline"></Icon>
                            联系人:&nbsp;{{$_data_$.contactName}}&nbsp;&nbsp;&nbsp;&nbsp;联系方式:&nbsp;{{$_data_$.contactNumber}}
                        </p>
                    </Col>
                    <Col span="7">
                        <p>
                            <Icon type="ios-clock-outline"></Icon>
                            活动开始时间:&nbsp;{{$_data_$.beginDate}}
                        </p>
                        <p>
                            <Icon type="ios-clock-outline"></Icon>
                            活动结束时间:&nbsp;{{$_data_$.endDate}}
                        </p>
                        <p>
                            <Icon type="ios-clock-outline"></Icon>
                            活动状态:&nbsp;{{ztai}}
                        </p>
                    </Col>
                    <Col span="7">
                        <p>
                            人数限制:&nbsp;{{$_data_$.peopleNumber}}&nbsp;&nbsp;&nbsp;&nbsp;
                            已报名人数:&nbsp;{{$_data_$.applyCount}}
                        </p>
                        <p>
                            代金券发放数量:&nbsp;{{$_data_$.couponCount | countFormat}}
                        </p>
                        <p>
                            代金券领取数量:&nbsp;{{$_data_$.couponUsedCount | countFormat}}
                        </p>
                    </Col>
                    <Col span="3">
                        <Button v-show="isShow" class="btn" type="primary" @click="$_bmxx_$($_data_$.id)">报名信息</Button>
                    </Col>
                </Row>

            </div>
        </Card>
        <!-- 内容 -->
        <div class="content">
            <p class="title">活动介绍:</p>
            <p class="normal" v-html="$_data_$.content"></p>
            <!--<p class="time">{{$_data_$.createDate}}</p>-->
            <div class="fj">
                附件:
                <br>
                <div v-for="item in upurl">
                    <a :href="item.url" >{{item.name}}</a>
                </div>

            </div>
        </div>
        <div align="center">
            <Button type="primary" @click="$_tc_$()">退出</Button>
        </div>
    </div>
</template>

<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        filters: {
            // statusFormat(value) {
            //     if(this.$_data_$.endDate<this.date){
            //         return ''
            //     }
            // },
            numberFormat(value) {
                if (value == 0) {
                    return '无限制'
                } else {
                    return value
                }
            },
            countFormat(value) {
                if (value) {
                    return value
                } else {
                    return '无'
                }
            }
        },
        data() {
            return {
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                file: true,
                $_ind_$: 0,
                $_data_$: {},
                $_file_$: [],
                files: [],
                upurl:[],
                date:'',
                ztai:'',
                isShow: true
            };
        },
        created() {
            this.date = this.FormatAllDate(new Date());
            this.$_detail_$();
            this.$_List_$();

        },
        methods: {
            $_detail_$() {
                this.$_ind_$ = this.$root.inparams.id;
            },
            $_tc_$() {
                this.$root.$_Route_$("user", "informManage", "hdManage", {})
            },
            $_List_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/company/activity/${this.$_ind_$}`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data_$ = rsp.data.data;
                             if(this.$_data_$.endDate<this.date){
                                this.ztai = '已过期';
                             }
                             if(this.$_data_$.beginDate>this.date){
                                this.ztai = '未开始';
                             }
                             if(this.$_data_$.endDate>this.date && this.$_data_$.beginDate<=this.date){
                                this.ztai = '进行中';
                             }
                            this.files = JSON.parse(this.$_data_$.files);
                            this.upurl = [];
                            // this.files = this.$_data_$.files.split(",");
                            for(let i=0;i<this.files.length;i++){
                                this.upurl.push({
                                    name: this.files[i].fileName,
                                    url: this.$_global_$.imgPath + this.files[i].filePath
                                });
                            }
                            if (this.$_data_$.apply == 0) {
                                this.isShow = false
                            } else {
                                this.isShow = true
                            }
                        }
                    }
                })
            },
            //报名信息
            $_bmxx_$(id) {
                this.$root.$_Route_$('user', 'jump', 'bmxx', {id: id})
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
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                    }
                }
            }
        }
    };
</script>