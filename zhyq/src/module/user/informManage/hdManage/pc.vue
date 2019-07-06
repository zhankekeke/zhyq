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
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search" style="background-color: #f5f5f5;padding-left: 15px;">
            <span style="font-size: 14px">活动名称：</span>
            <Input placeholder="请输入活动名称" v-model.trim="$_title_$" style="width: 210px; margin-right: 10px;"></Input>
            &nbsp;&nbsp;<span style="font-size: 14px">日期：</span>
            <DatePicker type="daterange" format="yyyy-MM-dd" placeholder="请选择日期范围" @on-change="$_qh_$"
                        placement="bottom-end" style="width: 210px;margin-right: 10px"></DatePicker>
            &nbsp;&nbsp;<span style="font-size: 14px">状态：</span>
            <Select v-model="$_selected_$" style="width:210px;margin-right: 10px">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 内容 -->
        <Row>
            <Col span="24" align="right">
                <Button type="primary" @click="$_addHd_$()">新建活动</Button>
            </Col>
        </Row>
        <br>
        <Row>
            <Table :columns="$_hdTable_$" :data="$_hdInfo_$"></Table>
        </Row>
        <br>
        <br>
        <Row>
            <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_total_$}}条数据</span>
            <Page align="right" :total="$_total_$"
                  style=" float: right"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>

</template>
<script>
    import controler from "./controler.js";
    // import axios from 'axios'
    export default {
        mixins: [controler],
        data() {
            return {
                $_total_$: 0,
                $_rq_$: [], // 日期
                $_title_$: "", // 标题
                $_selected_$: '全部', // 默认选中
                $_pageSize_$: 10,//默认显示一页一条
                $_page_$: 1,
                $_statusList_$: [
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: 1,
                        label: "上架"
                    },
                    {
                        value: 0,
                        label: "下架"
                    }
                ],
                $_hdTable_$: [ //数据表头
                    {
                        title: "序号",
                        type: "index",
                        align: "center",
                        render: (h, params) => {
                            return h('span', params.index + (this.$_page_$ - 1) * this.$_pageSize_$ + 1)
                        }
                    },
                    {
                        title: "活动名称",
                        key: "title",
                        align: "center"
                    },
                    {
                        title: "活动地址",
                        key: "address",
                        align: "center"
                    },
                    {
                        title: "联系人",
                        key: "contactName",
                        align: "center"
                    },
                    {
                        title: "联系电话",
                        key: "contactNumber",
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "status",
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.status == 0) {
                                a = "下架"
                            }
                            if (params.row.status == 1) {
                                a = "上架"
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "创建时间",
                        key: "createDate",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.status == 0) {
                                a = "上架"
                            }
                            if (params.row.status == 1) {
                                a = "下架"
                            }
                            if (params.row.endDate < this.date) {
                                a = ""
                            }
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_edit_$(params.row);
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#f56c6c"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_delete_$(params.row.id);
                                            }
                                        }
                                    },
                                    "删除"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                if (params.row.endDate < this.date) {
                                                } else {
                                                    if (params.row.status == 0) {
                                                        this.$_online_$(params.row.id);
                                                    }
                                                    if (params.row.status == 1) {
                                                        this.$_offline_$(params.row.id);
                                                    }
                                                }


                                            }
                                        }
                                    },
                                    a
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row.id);
                                            }
                                        }
                                    },
                                    "详情"
                                )
                            ]);
                        }
                    }
                ],
                $_hdInfo_$: [  //虚拟表格数据
                ],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                date: ''
            };
        },
        created() {
            this.date = this.FormatAllDate(new Date())
            this.$_List_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            //生成数据列表
            $_List_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_querycfg_$.params.zoneId = userInfo.zoneId;
                this.$_querycfg_$.mod = 'company/activity/search';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.status
                        delete this.$_querycfg_$.params.name
                        delete this.$_querycfg_$.params.beginDate
                        delete this.$_querycfg_$.params.endDate
                        if (rsp.data.code === 0) {
                            this.$_hdInfo_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.total * 1;
                        }
                    }
                })
            },

            //数据下一页
            $_changePage_$(e) {
                this.$_page_$ = e
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_List_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_pageSize_$ = e
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
            //   搜索
            $_search_$() {
                // if (this.$_rq_$[0] !== '') {
                //     // var beginDate = this.FormatAllDate(this.$_rq_$[0])
                //     // var endDate = this.FormatAllDate(this.$_rq_$[1])
                //
                // }
                this.$_querycfg_$.params.beginDate = this.$_rq_$[0];
                this.$_querycfg_$.params.endDate = this.$_rq_$[1];
                this.$_querycfg_$.params.name = this.$_title_$;
                this.$_querycfg_$.params.status = Number(this.$_selected_$);


                this.$_List_$()
            },
            //   新建活动
            $_addHd_$() {
                this.$root.$_Route_$('user', 'jump', 'xjhd', {})
            },
            // 编辑
            $_edit_$(row) {
                this.$root.$_Route_$('user', 'jump', 'hdbj', {data: row})
            },
            // 删除
            $_delete_$(index) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认删除?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: this.$_global_$.serverPath + `/company/activity/${index}`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('数据删除成功!');
                                    this.$_List_$();
                                } else {
                                    this.$Message.error('数据删除失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info("数据删除失败!");
                    }
                });
            },
            // 上架
            $_online_$(id) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/company/activity/${id}/online`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('上架成功!');
                                    this.$_List_$();
                                } else {
                                    this.$Message.error('上架失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
            //  下架
            $_offline_$(id) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/company/activity/${id}/offline`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('下架成功!');
                                    this.$_List_$();
                                } else {
                                    this.$Message.error('下架失败!');
                                }
                            }
                        })

                    },
                    onCancel: () => {

                    }
                });
            },
            // 详情
            $_detail_$(index) {
                this.$root.$_Route_$('user', 'jump', 'hdxq', {id: index})
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