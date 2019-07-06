<style scoped>

    .search {
        padding: 20px 0 20px 15px;
        margin-bottom: 15px;
        font-size: 14px;
        background-color: #f5f5f5;
    }

    >>> .el-input__inner {
        height: 30px;
        font-size: 12px;
    }

    >>> .ivu-table-cell {
        padding: 0;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            停车场名称：
            <Input v-model="$_parkName_$" style="width: 210px" placeholder="请输入停车场名称"></Input>
            &nbsp;&nbsp;状态：
            <Select v-model="$_selected_$" style="width:210px">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div style="margin-top:15px">
            <Row>
                <Col span="24" align="right">
                    <Button type="primary" @click="$_addyuyue_$()">停车场预约规则</Button>&nbsp;&nbsp;
                    <Button type="primary" @click="$_addzhifu_$()">停车场支付规则</Button>
                </Col>
            </Row>
            <br>
            <Row>
                <Table :columns="parkColumns" :data="$_parkInfo_$"></Table>
            </Row>
        </div>
        <br>
        <br>
        <!-- page分页 -->
        <Row>
            <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_totalSize_$}}条数据</span>
            <Page align="right"
                  style="float: right"
                  :total="$_totalSize_$"
                  show-elevator
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';

    export default {
        mixins: [controler],
        components: {},
        filters: {
            formatStatus(val) {
                if (val === 0) {
                    return '下架'
                }
                if (val === 1) {
                    return '上架'
                }
            }
        },
        data() {
            return {
                userInfo: "",
                $_parkName_$: "", // 停车场名称
                $_selected_$: 1, // 默认选中
                $_statusList_$: [ // 状态值
                    {
                        value: 1,
                        label: "全部"
                    },
                    {
                        value: 2,
                        label: "上架"
                    },
                    {
                        value: 3,
                        label: "下架"
                    }
                ],
                $_totalSize_$: 0, //数据总数
                $_pageSize_$: 12, // 默认每页条数
                $_parkInfo_$: [],//虚拟表格数据
                $_file_$: [],
                dialogImageUrl: '',

                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                zoneId: 0,
                parkColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                    }, {
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
                                        style: "width: 110px;height: 50px;border-radius: 5px;margin-top:4px"
                                    },
                                })]
                            );
                        }
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'center',
                    }, {
                        title: '地址',
                        key: 'address',
                        align: 'center',
                    }, {
                        title: '总车位数',
                        key: 'placeNumber',
                        align: 'center',
                    }, {
                        title: '实时余位',
                        key: ' ',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {}, '未知')
                        }
                    }, {
                        title: '创建时间',
                        key: 'createDate',
                        align: 'center',
                        width: 115,
                    }, {
                        title: '状态',
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.status == 0 ? '下架' : '上架';
                            return h('div', {}, text)
                        }
                    }, {
                        title: '操作',
                        align: 'center',
                        width: 150,
                        render: (h, params) => {
                            let text = params.row.status == 1 ? '下架' : '上架';

                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_edit_$(params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if (params.row.status == 0) {
                                                this.$_start_$(params.row);
                                            } else {
                                                this.$_abandon_$(params.row)
                                            }
                                        }
                                    }
                                }, ' | ' + text),
                            ])
                        }
                    }],
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.zoneId = this.userInfo.zoneId;
            this.$_list_$()
        }
        ,
        methods: {

            // 获取停车场列表
            $_list_$(status = 1) {
                this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/parkinglot/search`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_totalSize_$ = rsp.data.data.total;
                            if (status != 1) {
                                status == 2 ? status = 1 : status = 0;
                                this.$_parkInfo_$ = [];
                                for (let i = 0; i < rsp.data.data.records.length; i++) {
                                    if (rsp.data.data.records[i].status == status) {
                                        this.$_parkInfo_$.push(rsp.data.data.records[i]);
                                    }
                                }
                            } else {
                                this.$_parkInfo_$ = rsp.data.data.records

                            }
                            delete this.$_querycfg_$.params.name;
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            $_addyuyue_$() {
                this.$root.$_Route_$("user", "jump", "tccyygz", {});
            },
            $_addzhifu_$() {
                this.$root.$_Route_$("user", "jump", "tcczfgz", {});
            },
            //   搜索
            $_search_$() {
                if (this.$_parkName_$) {
                    this.$_querycfg_$.params.name = this.$_parkName_$;
                }
                if (this.$_selected_$ != 1) {
                    this.$_list_$(this.$_selected_$);
                    return;
                }
                this.$_list_$();
            },

            // 停车场编辑
            $_edit_$(row) {
                this.$root.$_Route_$("user", "jump", "tccbj", {row: row, userInfo: this.userInfo});
            },
            // 下架
            $_abandon_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/parkinglot/${row.id}/offline`;
                        this.$_querycfg_$.params = {};
                        var _this = this;
                        this.$_fquery_$((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('下架成功!');
                                    this.$_list_$()
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

            // 上架
            $_start_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/parkinglot/${row.id}/online`;
                        this.$_querycfg_$.params = {};
                        var _this = this;
                        this.$_fquery_$((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('上架成功!');
                                    this.$_list_$()
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


            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_list_$();
            },
        },

    };
</script>