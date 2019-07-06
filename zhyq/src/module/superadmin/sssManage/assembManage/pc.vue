<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 20px;
        background: #f5f5f5;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        color: #404040;
    }

    .ml28 {
        margin-left: 28px;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .title {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #333;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            <span>所属园区：</span>
            <Select @on-change='changeZone' v-model.trim="zoneId" style="width:150px" placeholder="请选择园区">
                <Option v-for="item in $_statusLists_$" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            <span class="ml28">会议室名称：</span>
            <Input v-model.trim="$_assembName_$" style="width: 170px" placeholder="请输入会议室名称"></Input>
            <span class="ml28">状态：</span>
            <Select v-model.trim="$_selected1_$" style="width:60px">
                <Option
                        v-for="item in $_statusList_$"
                        :value="item.value"
                        :key="item.value"
                        slot
                >{{ item.label }}
                </Option>
            </Select>
            <span class="ml28">容纳人数：</span>
            <Input v-model.trim="$_min_$" style="width: 50px"></Input>-
            <Input v-model.trim="$_max_$" style="width: 50px"></Input>&nbsp;&nbsp;
            <Button style="margin-left: 10px" type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div>
            <br>
            <Row>
                <Col span="24" align="right">
                    <Button type="primary" icon="plus" @click="$_addAssemb_$()">新增会议室</Button>
                </Col>
            </Row>
            <br>
            <Row>
                <Table ref="selection" :columns="$_assembTable_$" :data="$_assembInfo_$"></Table>
            </Row>

            <br>
            <Row>
                <Row>
                    <div style="font-size: 14px; color: black; margin-left: 10px;float: left">共{{$_totalSize_$}}条数据</div>
                    <Page
                            style="float: right"
                            align="right"
                            :total="$_totalSize_$"
                            :page-size="$_pageSize_$"
                            show-elevator
                            show-sizer
                            @on-page-size-change="$_pageNum_$"
                            @on-change="$_changePage_$"
                    />
                </Row>
            </Row>
        </div>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import ElementUI from "element-ui";
    import "element-ui/lib/theme-chalk/index.css";
    import {
        Button,
        Select,
        Option,
        Table,
        TableColumn,
        Upload,
        Dialog,
        Form,
        FormItem
    } from "element-ui";
    //import this.$_sendQuery_$ from "this.$_sendQuery_$";
    export default {
        mixins: [controler],
        components: {
            [Upload.name]: Upload,
            [Dialog.name]: Dialog,
            [Form.name]: Form,
            [FormItem.name]: FormItem
        },
        data() {
            return {
                $_assembName_$: "", // 会议室场名称
                // zoneId: "",
                //$_zoneId_$: '',
                $_selected1_$: "全部", // 默认选中
                $_selected2_$: "全部",
                $_min_$: "",
                $_max_$: "",
                $_peopleNumberB_$: "",
                $_peopleNumberE_$: "",
                $_toSettingParamsRow_$: "", //需要传值的内容
                meetingId: "",
                index: "",//当前行
                myParams: "",//方法中获取当前行
                $_status_$: "1",
                $_statusLists_$: [],
                $_statusList_$: [
                    // 状态值
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: "上架",
                        label: "上架"
                    },
                    {
                        value: "下架",
                        label: "下架"
                    }
                ],
                $_personList_$: [
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: "6人",
                        label: "6人"
                    },
                    {
                        value: "7-14人",
                        label: "7-14人"
                    }
                ],
                pageNum: 1,
                $_totalSize_$: 100, //数据总数
                $_stratRow_$: 0, //起始条数
                $_total_$: 0, //总条数
                $_pageSize_$: 12, //每页显示
                $_assembTable_$: [
                    //数据表头
                    {
                        title: "序号",
                        align: "center",
                        render: (h, params) => {
                            return h("span", params.index + (this.pageNum - 1) * this.$_pageSize_$ + 1);
                        }
                    },
                    {
                        title: "预览图",
                        align: "center",
                        key: "images",
                        render: (h, params) => {
                            let src = '';
                            if (params.row.images.length > 0) {
                                src = params.row.images[0].imageUrl;
                            }
                            return h(
                                "div",
                                {
                                    attrs: {
                                        style: "width:40px;height:40px;text-align:center"
                                    }
                                },
                                [
                                    h("img", {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        attrs: {
                                            //添加预览图
                                            src: this.$_global_$.imgPath + src,
                                            style: "width:40px;height:40px;"
                                        },
                                        style: {}
                                    })
                                ]
                            );
                        }
                    },
                    {
                        title: "名称",
                        key: "name",
                        align: "center"
                    },
                    {
                        title: "地址",
                        key: "address",
                        align: "center"
                    },
                    {
                        title: "面积",
                        key: "area",
                        align: "center"
                    },
                    {
                        title: "容纳人数",
                        key: "peopleNumber",
                        align: "center"
                    },
                    {
                        title: "备注",
                        key: "configDescription",
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "status",
                        align: "center",
                        render: (h, params) => {
                            let _this = this;
                            let texts = "";
                            if (params.row.status == 0) {
                                texts = "下架";
                            } else if (params.row.status == 1) {
                                texts = "上架";
                            }
                            return h(
                                "div",
                                {
                                    props: {}
                                },
                                texts
                            );
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
                        width: 250,
                        align: "center",
                        render: (h, params) => {
                            let texts = "";
                            if (params.row.status == 0) {
                                texts = "上架";
                            } else if (params.row.status == 1) {
                                texts = "下架";
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
                                            marginRight: "5px"
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
                                            color: "#67c23a"
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
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {

                                                this.$_toSettingParamsRow_$ = params.row;

                                                this.$_setting_$(params.row)
                                            }
                                        }
                                    },
                                    "配置"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },

                                        on: {
                                            click: id => {
                                                if (params.row.status == 0) {
                                                    this.$_upshelf_$(params.row.id);
                                                    // this.$_list_$()
                                                } else if (params.row.status == 1) {
                                                    this.$_downshelf_$(params.row.id);
                                                    // this.$_list_$()
                                                }
                                            }
                                        }
                                    },
                                    texts
                                )
                            ]);
                        }
                    }
                ],
                $_assembInfo_$: [],
                file: [],
                zoneId: 0,
                dialogVisible: false,//表单中的图片框的显示
                dialogImageUrl: '',//表单中的图片框的显示
                imageList: [],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                }
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            // this.$_list_$();
            this.zoneList();

            this.$_querycfg_$.params.pageNum = 1;
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            // 园区列表
            zoneList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {
                        pageSize: 9999999
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                }
                                this.$_statusLists_$.push(temp)

                                this.zoneId = this.$root.inparams.zoneId;
                                if (this.zoneId == 0 || !this.zoneId)
                                    this.zoneId = arr[0].id;
                            }
                            this.$_list_$()
                        }
                    }
                })
            },
            // 园区切换
            changeZone(value) {
                // this.zoneId = value
                //this.zoneId = value
                this.$_list_$()
            },
            //根据园区获取会议室
            $_list_$() {
                this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/meeting/search`;
                this.$_fquery_$(rsp => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.name;
                        delete this.$_querycfg_$.params.zoneId;
                        delete this.$_querycfg_$.params.status;
                        delete this.$_querycfg_$.params.peopleNumberB
                        delete this.$_querycfg_$.params.peopleNumberE
                        if (rsp.data.code === 0) {
                            this.$_assembInfo_$ = [];
                            this.pageNum = rsp.data.data.current
                            this.$_assembInfo_$ = rsp.data.data.records;
                            this.$_totalSize_$ = rsp.data.data.total;
                            this.$_status_$ = rsp.data.data.records.status;
                        }
                    }
                });
            },
            // 启用
            $_upshelf_$(id) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否上架该会议室?</p>",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/meeting/${id}/online`;
                        this.$_fquery_$(rsp => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("上架成功");
                                    this.$_list_$();
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        });

                    },
                    onCancel: () => {
                    }
                });
            },
            // 禁用
            $_downshelf_$(id) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否下架该会议室?</p>",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/meeting/${id}/offline`;

                        this.$_fquery_$(rsp => {
                            if (rsp.status === 200) {
                                // debugger
                                if (rsp.data.code === 0) {
                                    this.$Message.success("下架成功");
                                    this.$_list_$();
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        });

                    },
                    onCancel: () => {
                    }
                });

            },
            //   搜索

            $_search_$() {
                if (this.$_assembName_$) {
                    this.$_querycfg_$.params.name = this.$_assembName_$;
                }
                if (this.$_selected1_$ != "全部") {
                    if (this.$_selected1_$ == "上架") {
                        this.$_querycfg_$.params.status = 1;
                    } else {
                        this.$_querycfg_$.params.status = 0;
                    }
                }
                if (this.$_min_$) {
                    this.$_querycfg_$.params.peopleNumberB = Number(this.$_min_$);
                }
                if (this.$_max_$) {
                    this.$_querycfg_$.params.peopleNumberE = Number(this.$_max_$);
                }
                this.$_list_$();
            },

            // 新增会议室
            $_addAssemb_$() {
                this.$root.$_Route_$("superadmin", "jump", "xzhys", {
                    zoneList: this.$_statusLists_$,
                    zoneId: this.zoneId,
                });
            },
            // 会议室详情
            $_detail_$(row) {
                this.$root.$_Route_$("superadmin", "jump", "hysxq", {row: row})
            },

            // 会议室编辑
            $_edit_$(row) {
                this.$root.$_Route_$("superadmin", "jump", "hysbj", {row: row});
            },
            // 会议室配置
            $_setting_$(row) {
                this.$root.$_Route_$("superadmin", "jump", "hyspz", {
                    row: row
                });
            },
            // 会议室删除
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认删除?</p>",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/meeting/${row.id}`,
                            data: {},
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then((res) => {
                            if (res.status === 200) {
                                if (res.data.code === 0) {
                                    this.$Message.success("删除成功!")
                                    this.$_list_$();
                                } else {
                                    this.$Message.error(res.data.message)
                                }
                            }
                        });

                    },
                    onCancel: () => {
                    }
                });
            },

            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                // this.$_pageSize_$ * e - this.$_pageSize_$;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$();
            },

            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_pageSize_$ = e;
                // this.$_querycfg_$.params.current = 0;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$();
            }
        }
    };
</script>