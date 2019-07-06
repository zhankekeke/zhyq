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
        background: #f5f5f5;
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
            会议室名称：
            <Input v-model.trim="$_assembName_$" style="width: 210px" placeholder="请输入会议室名称"></Input>
            &nbsp;&nbsp;状态：
            <Select v-model.trim="$_selected1_$" style="width:210px">
                <Option
                        v-for="item in $_statusList_$"
                        :value="item.value"
                        :key="item.value"
                        slot>
                    {{ item.label }}
                </Option>
            </Select>&nbsp;&nbsp;容纳人数：
            <Input v-model.trim="$_min_$" style="width: 80px"></Input>&nbsp;&nbsp;-&nbsp;&nbsp;
            <Input v-model.trim="$_max_$" style="width: 80px"></Input>
            <Button style="margin-left:30px" type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div>
            <Row>
                <Col span="24" align="right">
                    <Button type="primary" @click="$_addsfbz_$()">会议室规则</Button>
                </Col>
            </Row>
            <br>
            <Row>
                <Table ref="selection" :columns="$_assembTable_$" :data="$_assembInfo_$"></Table>
            </Row>
            <br>
            <br>
            <Row>
                <Row>
                    <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_totalSize_$}}条数据</span>
                    <Page
                            align="right"
                            style="float: right"
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
                $_selected_$: "",
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
                            let img = '';
                            if (params.row.images.length > 0) {
                                img = this.$_global_$.imgPath + params.row.images[0].imageUrl
                            }

                            return h(
                                "div",
                                {
                                    attrs: {
                                        style: "width:40px;height:40px;text-align:center",
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
                                                // src:
                                                //   params.row.images[0].imageUrl
                                                // ,
                                                style: "width:40px;height:40px;",
                                                src: img
                                            },
                                            style: {}
                                        }
                                    )
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
                    // {
                    //   title: "备注",
                    //   key: "configDescription",
                    //   align: "center"
                    // },
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
                                        style: {
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: (id) => {
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
                baseUrl: this.$_global_$.imgPath,
                imageList: [],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                }
            };
        },
        created() {
            this.$_querycfg_$.params.pageNum = 1;
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            this.$_global_$.serverPath;
            this.$_list_$()
        },
        methods: {
            $_addsfbz_$() {
                this.$root.$_Route_$("user", "jump", "hysgzpz", {});
            },
            //根据园区获取会议室
            $_list_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_querycfg_$.mod = `zone/zone/${userInfo.zoneId}/meeting/search`;
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
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${userInfo.zoneId}/meeting/${id}/online`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("上架成功!")
                                    this.$_list_$();
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });

            },
            // 禁用
            $_downshelf_$(id) {

                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${userInfo.zoneId}/meeting/${id}/offline`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("下架成功!")
                                    this.$_list_$();
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
                // this.$_list_$()
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
            // 会议室详情
            $_detail_$(row) {
                this.$root.$_Route_$("user", "jump", "hysxq", {row: row})
            },

            // 会议室编辑
            $_edit_$(row) {
                this.$root.$_Route_$("user", "jump", "hysbj", {row: row});
            },
            // 会议室配置
            $_setting_$(row) {
                this.$root.$_Route_$("user", "jump", "hyspz", {
                    row: row
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