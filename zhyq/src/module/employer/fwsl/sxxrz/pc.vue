<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        background: #f5f5f5;
        padding: 20px;
        margin-bottom: 35px;
        font-size: 14px;
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

    .ml28 {
        margin-left: 28px;
    }

    .mt40 {
        margin-top: 40px;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            <span>时间：</span>
            <DatePicker @on-change="$_dateRange_$" type="daterange" format="yyyy-MM-dd" placeholder="请选择日期"
                        style="width: 200px"></DatePicker>
            <span class="ml28">状态：</span>
            <Select v-model="$_selected_$" style="width:210px">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            <Button style="margin-left: 20px" type="primary" @click="$_search_$()">搜索</Button>

        </div>
        <Row>
            <Table ref="selection" :columns="$_jfjlTable_$" :data="$_jfjlInfo_$"></Table>
        </Row>

        <Row class="mt40">
            <div style="float: left">共{{$_total_$}}条数据</div>

            <Page align="right" :total="$_total_$"
                  show-elevator show-sizer
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
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
                $_selected_$: '全部', // 默认选中
                $_statusList_$: [
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: 1,
                        label: "上线"
                    },
                    {
                        value: 0,
                        label: "下线"
                    }
                ],
                $_jfjlTable_$: [
                    //数据表头
                    {
                        title: "序号",
                        type: "index",
                        align: "center"
                    },
                    {
                        title: "管家姓名",
                        key: "stewardName",
                        align: "center"
                    },
                    {
                        title: "管家联系方式",
                        key: "stewardPhoneNumber",
                        align: "center"
                    },
                    {
                        title: "ip地址",
                        key: "ipAddress",
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "workStatus",
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.workStatus == 0) {
                                a = "下线";
                            }
                            if (params.row.workStatus == 1) {
                                a = "上线";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "记录创建时间",
                        key: "createTime",
                        align: "center"
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
                this.$_querycfg_$.mod = 'steward/steward/' + this.userInfo.zoneId + '/workLogList';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.parkingLotName
                        delete this.$_querycfg_$.params.startTime
                        delete this.$_querycfg_$.params.endTime
                        if (rsp.data.code === 0) {
                            this.$_jfjlInfo_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.total * 1;
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
            $_dateRange_$(e) {
                this.$_querycfg_$.params.startTime = e[0];
                this.$_querycfg_$.params.endTime = e[1];
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
            // 搜索
            $_search_$() {
                this.$_querycfg_$.params.startTime 
                this.$_querycfg_$.params.endTime 
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_querycfg_$.params.pageNum = 1;
                this.$_querycfg_$.params.workStatus = Number(this.$_selected_$);
                this.$_List_$();
            }
        }
    };
</script>