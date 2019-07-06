<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 20px 0 20px 15px;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        color: #000;
        background-color: #f5f5f5;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .title {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #333;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            &nbsp;&nbsp;餐厅名称：
            <Input placeholder="请输入餐厅名称" v-model="$_diningName_$" style="width: 210px; margin-right: 2%"></Input>
            餐厅状态：
            <Select v-model="$_selected_$" style="width:210px;">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>&nbsp;&nbsp;
            <Button style="margin-left: 2%" type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div>
            <br>
            <Row>
                <Table :columns="$_diningTable_$" :data="$_diningInfo_$"></Table>
            </Row>
            <br>
            <br>
            <Row>
                <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_totalSize_$}}条数据</span>
                <Page align="right" :total="$_totalSize_$"
                      style="float:right"
                      show-elevator
                      :page-size="$_pageSize_$"
                      @on-page-size-change="$_pageNum_$"
                      @on-change="$_changePage_$"/>
            </Row>
        </div>
    </div>
</template>
<script>
    import {
        Button,
        Form,
        Dialog,
        Input,
        FormItem,
        Select,
        Upload,
        Option,
        Radio
    } from "element-ui";
    import controler from "./controler.js";
    import "element-ui/lib/theme-chalk/index.css";
    import expandTable from "./expandTable";

    export default {
        mixins: [controler],
        components: {
            expandTable,
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Select.name]: Select,
            [Upload.name]: Upload,
            [Option.name]: Option,
            [Radio.name]: Radio
        },
        data() {
            return {
                editorOption: {modules: {toolbar: '#toolbar'}},
                $_diningName_$: "", // 停车场名称
                $_selected_$: -1, // 默认选中
                $_statusList_$: [
                    // 状态值
                    {
                        value: -1,
                        label: "全部"
                    }, {
                        value: 0,
                        label: "下架"
                    },
                    {
                        value: "1",
                        label: "上架"
                    }
                ],
                $_totalSize_$: 0, //数据总数
                $_pageSize_$: 10, // 默认每页条数
                $_diningTable_$: [//数据表头
                    {
                        type: "expand",
                        width: 50,
                        render: (h, params) => {
                            return h(expandTable, {
                                props: {
                                    boxList: params.row.boxList,
                                    dList: this.dList
                                }
                            });
                        }
                    },
                    {
                        title: "序号",
                        type: "index",
                        align: "center"
                    },
                    {
                        title: "缩略图",
                        key: "img",
                        render: (h, params) => {
                            return h(
                                "div",
                                {
                                    attrs: {
                                        style: "width:40px;height:40px;"
                                    }
                                },
                                [
                                    h("img", {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        attrs: {
                                            src: this.$_global_$.imgPath + params.row.images[0].imageUrl,
                                            style: "width:40px;height:40px;"
                                        },
                                        style: {}
                                    })
                                ]
                            );
                        }
                    },
                    {
                        title: "餐厅名称",
                        key: "name",
                        align: "center"
                    },
                    {
                        title: "地址",
                        key: "address",
                        align: "center"
                    },
                    {
                        title: "容纳人数",
                        key: "peopleNumber",
                        align: "center"
                    },
                    {
                        title: "实时人数",
                        key: "freeCount",
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "status",
                        align: "center",
                        render: (h, params) => {
                            var a = params.row.status == 0 ? "下架" : "上架";
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
                            var a = params.row.status == 0 ? "上架" : "下架";
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
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row);
                                            }
                                        }
                                    },
                                    "详情"
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
                                                if (params.row.status == 0) {
                                                    this.$_upShelf_$(params.row);
                                                }
                                                if (params.row.status == 1) {
                                                    this.$_abandon_$(params.row);
                                                }
                                            }
                                        }
                                    },
                                    a
                                )
                            ]);
                        }
                    }
                ],
                $_diningInfo_$: [],//表格数据

                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                userInfo: {},  // 当前登录人信息
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.zoneId = this.userInfo.zoneId;
            this.dList();
        },
        methods: {
            // 表格数据
            dList() {
                this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/restaurant/search`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_diningInfo_$ = rsp.data.data.records
                            this.$_totalSize_$ = rsp.data.data.total
                        }
                    }
                })
            },
            //   搜索
            $_search_$() {
                this.$_querycfg_$.params = {};
                if (this.$_diningName_$) {
                    this.$_querycfg_$.params.name = this.$_diningName_$;
                }
                if (this.$_selected_$ !== -1) {
                    this.$_querycfg_$.params.status = this.$_selected_$;
                }
                this.dList()
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.dList();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.dList();
            },
            //   新增餐厅
            $_addDining_$(formName) {
                this.$root.$_Route_$("superadmin", "jump", "xzct", {
                    zoneId: this.zoneId,
                });
            },
            // 新增包间
            $_addDiningRoom_$(formName) {
                this.$root.$_Route_$("superadmin", "jump", "xzbj", {row: this.zoneId,});
            },
            // 更改园区
            changeZone(value) {
                this.zoneId = value;
                this.dList()
            },
            // 编辑餐厅
            $_edit_$(row) {
                this.$root.$_Route_$("user", "jump", "bjct", {
                    zoneId: this.zoneId,
                    diningList: row
                });
            },
            // 删除
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认删除?</p>",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.id}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("删除成功!")
                                    this.dList()
                                } else {
                                    this.$Message.error("删除失败!")
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
            // 详情
            $_detail_$(row) {
                this.$root.$_Route_$("user", "jump", "ctxq", {row: row});
            },
            // 下架
            $_abandon_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.id}/offline`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("下架成功!")
                                    this.dList()
                                } else {
                                    this.$Message.error("下架失败!")
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            // s上架
            $_upShelf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.id}/online`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("上架成功!")
                                    this.dList()
                                } else {
                                    this.$Message.error("上架失败!")
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },

        }
    };
</script>

