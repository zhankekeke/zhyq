<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 15px 0 15px 15px;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 12px;
        color: #000;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .bg-lp {
        background: rgba(230, 243, 252, 1);
        padding: 5px;
        border: 1px solid rgba(212, 240, 252, 1);
        font-size: 12px;
    }

    .mt10 {
        margin-top: 10px;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search" style="background-color: #f5f5f5;padding-left: 15px;">
            <span style="font-size: 14px">停车场名称：</span>
            <Input v-model.trim="$_parkingName_$" placeholder="请输入停车场名称"
                   style="width: 210px;margin-right: 10px"></Input>
            &nbsp;&nbsp;<span style="font-size: 14px">预约时间：</span>
            <DatePicker type="daterange" @on-change="$_qh_$" ormat="yyyy-MM-dd" placeholder="请选择预约时间"
                        style="width: 210px;margin-right: 10px"></DatePicker>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <br>
        <Row>
            <Table ref="selection" :columns="$_jfjlTable_$" :data="$_jfjlInfo_$"></Table>
        </Row>
        <br>
        <br>
        <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_total_$}}条数据</span>
        <Page align='right' :total="$_total_$"
              style="float: right"
              show-elevator show-sizer
              @on-page-size-change="$_pageNum_$"
              @on-change="$_changePage_$"/>
    </div>
</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_total_$: 0,//数据总数
                $_parkingName_$: '',
                $_rq_$: [],
                $_jfjlTable_$: [
                    //数据表头
                    {
                        title: "序号",
                        type: "index",
                        align: "center"
                    },
                    {
                        title: "名称",
                        key: "parkingName",
                        align: "center"
                    },
                    {
                        title: "地址",
                        key: "parkingAddress",
                        align: "center"
                    },
                    {
                        title: "车主姓名",
                        key: "employeeName",
                        align: "center"
                    },
                    {
                        title: "联系电话",
                        key: "mobile",
                        align: "center"
                    },
                    {
                        title: "车牌号",
                        key: "plateNumber",
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "status",
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.status == 0) {
                                a = "已预约";
                            }
                            if (params.row.status == 1) {
                                a = "已完成";
                            }
                            if (params.row.status == 2) {
                                a = "爽约";
                            }
                            if (params.row.status == 3) {
                                a = "取消";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "创建时间",
                        key: "createDate",
                        align: "center",
                    }
                ],
                $_jfjlInfo_$: [],
                userInfo: {},
                $_querycfg_$: {
                    mod: "",
                    params: {
                        pageSize: 10
                    }
                }
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_List_$();

        },
        methods: {
            //生成数据
            $_List_$() {
                this.$_querycfg_$.mod = 'zone/zone/' + this.userInfo.zoneId + '/parking/reserves';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.parkingLotName
                        delete this.$_querycfg_$.params.startTime
                        delete this.$_querycfg_$.params.endTime
                        if (rsp.data.code === 0) {
                            this.$_jfjlInfo_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.total;
                        }
                    }
                })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_List_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_List_$();
            },
            // 格式化时间
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
            //搜索发送日期
            $_qh_$(e) {
                this.$_rq_$ = [];
                if (e.length > 0 && e[0] !== "") {
                    this.$_rq_$ = [e[0] + ' 00:00:00', e[1] + ' 23:59:59'];
                }

            },
            // 搜索
            $_search_$() {
                this.$_querycfg_$.params.startTime = this.$_rq_$[0];
                this.$_querycfg_$.params.endTime = this.$_rq_$[1];
                this.$_querycfg_$.params.parkingLotName = this.$_parkingName_$;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_querycfg_$.params.pageNum = 1;
                this.$_List_$();
            }
        }
    };
</script>