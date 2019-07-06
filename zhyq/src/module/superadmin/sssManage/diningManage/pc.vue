<style scoped>

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

    >>> .ivu-table-cell {
        padding: 0;
    }

    .search {
        background: #f5f5f5;
        padding: 20px;
        margin-bottom: 35px;
        font-size: 14px;
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
            <span>所属园区：</span>
            <Select @on-change='changeZone' v-model="zoneId" style="width:150px">
                <Option v-for="item in zoneSelect" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            <span class="ml28">餐厅名称：</span>
            <Input v-model="$_diningName_$" style="width: 210px" placeholder="请输入餐厅名称"></Input>
            <span class="ml28">餐厅状态：</span>
            <Select v-model="$_selected_$" style="width:210px">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            <Button class="ml28" type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->

        <div style="margin-top: 10px">
            <Row>
                <Col align="right">
                    <Button type="primary" icon="plus" @click="$_addDining_$('uploadxls')">新增餐厅</Button>
                    <Button style="margin-left:10px" type="primary" icon="plus" @click="$_addDiningRoom_$('uploadbj')">
                        新增包间
                    </Button>
                </Col>
            </Row>
            <br>
            <Row>
                <Table :columns="$_diningTable_$" :data="$_diningInfo_$"></Table>
            </Row>
            <br/>
            <Row>
                <p style="font-size: 14px; color: black; margin-left: 10px;float: left">共{{$_totalSize_$}}条数据</p>

                <Page align="right" :total="$_totalSize_$"
                      style="float: right"
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
                zoneSelect: [],// 园区列表
                $_diningTable_$: [//数据表头
                    {
                        type: "expand",
                        width: 30,
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
                        align: "center",
                    },
                    {
                        title: "缩略图",
                        key: "img",
                        align: "center",
                        width: 115,
                        render: (h, params) => {
                            return h("div", {},
                                [h("img", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    attrs: {
                                        src: this.$_global_$.imgPath + params.row.images[0].imageUrl,
                                        style: "width: 110px;height: 50px;border-radius: 5px;margin: 20px 0px;"
                                    },
                                })]
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
                        align: "center",
                        width: 115
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 170,
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
                                        on: {
                                            click: () => {
                                                this.$_edit_$(params.row);
                                            }
                                        }
                                    },
                                    "编辑 | "
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            color: "#f56c6c"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_remove_$(params.row);
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
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row);
                                            }
                                        }
                                    }, " | 详情 | "),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
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
                                    }, a)
                            ]);
                        }
                    }
                ],
                $_diningInfo_$: [],//表格数据


                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                zoneId: 0,
            };
        },
        created() {
            this.zList();
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
            // 获取园区列表
            zList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {
                        pageSize: 9999999
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    var arr = rsp.data.data.records
                    for (var i = 0; i < arr.length; i++) {
                        var temp = {
                            value: arr[i].id,
                            label: arr[i].name
                        };
                        this.zoneSelect.push(temp)
                    }

                    this.zoneId = this.$root.inparams.zoneId;
                    if (this.zoneId == 0 || !this.zoneId)
                        this.zoneId = arr[0].id;
                    this.dList();
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
                this.$root.$_Route_$("superadmin", "jump", "bjct", {
                    zoneId: this.zoneId,
                    diningList: row
                });
            },
            // 删除
            $_remove_$(row) {
                if (row.status == 1) {
                    this.$Message.warning("请先下架餐厅!")
                } else {
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
                }

            },
            // 详情
            $_detail_$(row) {
                this.$root.$_Route_$("superadmin", "jump", "ctxq", {row: row});
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