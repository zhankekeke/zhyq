<style scoped>
    .ivu-card {
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        height: 221px;
        width: 480px;
    }

    >>> .ivu-card-head {
        border-bottom: none;
    }

    .Right {
        float: right;
        margin-right: 15px;
    }

    .textCenter {
        text-align: center;
    }

    .textRight {
        text-align: right;
    }

    .ivu-card-body p {
        line-height: 30px;
    }

    .box1 {
        float: left;
        margin: 20px;
    }

    .box img {
        width: 96px;
        height: 96px;
        margin: 50px auto;
    }

    .card {
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        height: 221px;
        width: 480px;
        text-align: center;
    }

    >>> .ivu-tree ul {
        font-size: 14px;
    }

</style>
<template>
    <div class="container">
        <Row>
            <div class="box">
                <Row>

                    <div v-for="item in $_List_$" class="box1">
                        <Card :bordered="false">
                            <p style="margin-top: 10px;">
                                <span style="font-size: 16px;  font-weight: bold" v-if="item.orgName">考勤组：{{item.orgName}}</span>
                                <span style="font-size: 16px; font-weight: bold" v-else>考勤组：公司考勤</span>
                                <span class="Right">创建时间：{{item.createTime}}</span>
                            </p>
                            <div style="margin-top: 20px;">
                                <p v-if="item.amElastic">上班时间：{{item.amTime}} - {{item.amElastic}}</p>
                                <p v-else="item.amElastic">上班时间：{{item.amTime}}</p>
                                <p>工作时长：{{item.workingHours}}小时</p>
                                <p v-if="item.pmElastic">下班时间：{{item.pmTime}} - {{item.pmElastic}}</p>
                                <p v-else="item.pmElastic">下班时间：{{item.pmTime}}</p>
                                <p class="textRight" v-if="item.orgId!=0">
                                    <Button @click="$_remove_$(item.orgId)" type="primary">删除
                                    </Button>
                                </p>
                            </div>
                        </Card>
                    </div>
                    <div class="box1">
                        <div class="card" @click="$_add_$" style=" cursor: pointer">
                            <span style=" color:#e4e2e3;font-size:100px; line-height: 221px">+</span>
                        </div>
                    </div>
                </Row>
            </div>
        </Row>
        <!-- 分页 -->
        <Row>
            <Col span="24" align="right">
                <Page
                        :total="$_total_$"
                        show-elevator
                        show-sizer
                        :page-size="$_pageSize_$"
                        @on-page-size-change="$_changepageSize_$"
                        @on-change="$_changePage_$"
                />
            </Col>
        </Row>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import axios from "axios";

    export default {
        mixins: [controler],
        data() {
            return {
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_List_$: [], // 列表数据
                $_pageSize_$: 10,  //每页显示条数
                $_pageNum_$: 1,  //当前第几页
                $_total_$: 0,
                id: 0
            };
        },
        created() {
            this.$_list_$()
        },
        methods: {
            // 获取列表
            $_list_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/company/attendance/rule/list",
                    data: {
                        pageNum: this.$_pageNum_$,
                        pageSize: this.$_pageSize_$
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_List_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.total * 1;
                        } else {
                            this.$Message.error("数据获取失败!");
                        }
                    }
                });
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_pageNum_$ = e;
                this.$_list_$();
            },
            //页面显示的数据条数
            $_changepageSize_$(e) {
                this.$_pageSize_$ = e;
                this.$_list_$();
            },
            // 添加
            $_add_$() {
                this.$root.$_Route_$("company", "jump", "addkqgz");
            },
            // 删除
            $_remove_$(id) {
                this.id = id;
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确定要删除这条记录吗?</p>",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/company/attendance/rule/${
                                this.id
                                }/delete`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then(rsp => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("删除成功!");
                                    this.$_list_$()
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        });
                    },
                    onCancel: () => {
                    }
                });
            }
        }
    };
</script>