<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .zdtb {
        font-size: 12px;
        /* padding:0px 5% 0px 5%; */
        color: #666;
        line-height: 18px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';

    }

    .bg {

        background: #efefef;
        padding: 10px;
    }

    .mt10 {
        margin-top: 10px;
    }

    .mr5 {
        margin-right: 5px;
    }

    .icon {
        color: rgb(80, 80, 192);
    }

    .bg-lp {
        background: rgba(230, 243, 252, 1);
        padding: 5px;
        border: 1px solid rgba(212, 240, 252, 1);
    }

    .mr5 {
        margin-right: 5px;
    }

    .ivu-icon {
        font-size: 20px;
        vertical-align: middle;
    }

    .top-line span {
        vertical-align: middle;
        width: 40%;
    }

    .top-line Select {
        vertical-align: middle;
    }

    .ivu-input-wrapper {
        vertical-align: middle;
        width: 60%;
    }

    .top-height {
        height: 76px;
    }

    /*上传图片样式*/
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    >>> .ivu-tree-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
        font-size: 14px;
    }

</style>
<template>
    <div class="zdtb">
        <!-- 左右分栏 -->
        <Row>
            <!-- 树形控件 -->
            <Col span="5" style="border-right:1px solid #ccc;height: 500px;">
                <Tree :data="$_data2_$" :load-data="loadData" @on-select-change="$_checkItem_$"></Tree>
            </Col>
            <Col span="18" offset="1">
                <br>
                <Row type="flex" align="middle">
                    <Col span="16" offset="16" align="right">
                        <Col span="4" offset="2">
                            <Button type="primary" @click="$_sortManage_$" style="margin-left: 40px"> 分类管理</Button>
                        </Col>
                        <Col span="4" offset="2">
                            <Button  style="color: #059BFA; border: 1px solid #059BFA" type="ghost" @click="$_addQuestion_$('uploadxls')">+添加服务</Button>
                        </Col>
                    </Col>
                </Row>
                <br>
                <Row>
                    <!-- 表格 -->
                    <Col>
                        <Table ref="$_selection_$" :columns="$_columns7_$" :data="$_data6_$"></Table>
                    </Col>
                </Row>
                <br>
                <Row>
                    <Col span="24">
                        <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{total}}条数据</span>
                        <Page align="right" :total="total"
                              style="float: right"
                              show-elevator show-sizer
                              @on-page-size-change="$_pageNum_$"
                              @on-change="$_changePage_$"/>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';
    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Upload.name]: Upload,
            [Select.name]: Select,
            [Option.name]: Option
        },
        data() {
            return {
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                total: 0,
                $_data2_$: [
                    {
                        title: '所有分类',
                        expand: true,
                        loading: false,
                        children: []
                    }
                ], // 树形控件数据
                $_columns7_$: [  // 表头
                    {
                        title: '序号',
                        type: 'index',
                        width: 100,
                        align: 'center',
                    },
                    {
                        title: '服务名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '服务图标',
                        key: 'imageUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h("img", {
                                attrs: {
                                    src: this.$_global_$.imgPath + params.row.imageUrl,
                                    width: "40px",
                                    height: '40px'
                                },
                                props: {
                                    type: 'primary',
                                    size: "small"
                                },
                                style: {
                                    verticalAlign: "middle"
                                }
                            })
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if (params.row.status == 0) {
                                a = "下架";
                            }
                            if (params.row.status == 1) {
                                a = "上架";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '浏览次数',
                        key: 'viewCount',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 250,
                        render: (h, params) => {
                            var a
                            if (params.row.status == 0) {
                                a = '上架'
                            }
                            if (params.row.status == 1) {
                                a = '下架'
                            }
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_show_$(params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#f56c6c"

                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params.row)
                                        },
                                    }
                                }, '删除'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            if (params.row.status == 0) {
                                                this.$_upShelf_$(params.row)
                                            }
                                            if (params.row.status == 1) {
                                                this.$_downShelf_$(params.row)
                                            }
                                        }
                                    }
                                }, a)
                            ]);
                        }
                    }
                ],
                $_data6_$: [], // 表格数据\
                parentSelect: [], // 一级分类列表
                parent: [],
                zoneId: 0,
                categoryId: 0,
                childSelect: [], // 子分类列表
                $_userInfo_$: {}, // 用户数据
                child: 0,  // 子分类id
                parentId: 0,  // 一级分类id
            }
        },
        created() {
            // this.$_global_$.serverPath
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_list_$();
            this.tableList()
        },
        methods: {
            // 获取一级分类
            $_list_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/zone/zone/' + this.$_userInfo_$.zoneId + '/service/category/' + this.categoryId + '/pageList',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records;
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {};
                                var select = {};
                                var a = {};
                                temp = {
                                    title: arr[i].name,
                                    id: arr[i].id,
                                    zoneId: arr[i].zoneId,
                                    loading: false,
                                    children: []
                                };
                                select = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                };
                                a = {
                                    id: arr[i].id,
                                    zoneId: arr[i].zoneId
                                };
                                this.$_data2_$[0].children.push(temp)
                                this.parentSelect.push(select)
                                this.parent.push(a)
                            }
                        }
                    }
                })
            },
            $_checkItem_$(e) {
                if(e[0].id){
                    this.categoryId = e[0].id;
                }else{
                    this.categoryId = 0;
                }

                this.tableList()
            },
            // 获取一级子分类
            loadData(item, callback) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/zone/${item.zoneId}/service/category/${item.id}/pageList`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records;
                            var data = []
                            if (arr.length == 0) {
                                this.$Message.success("该分类下暂无子分类!")
                            } else {
                                for (var i = 0; i < arr.length; i++) {
                                    var temp = {}
                                    temp = {
                                        title: arr[i].name,
                                        parentId: arr[i].parentId,
                                        id: arr[i].id,
                                        zoneId: arr[i].zoneId
                                    }
                                    data.push(temp)
                                }
                            }
                            callback(data)
                        }
                    }
                })
            },
            // 获取一级分类下的子分类
            changeParent(value) {
                var arr = this.parent
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id == value) {
                        this.zoneId = arr[i].zoneId
                    }
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/service/category/${value}/pageList`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            return;
                            this.childSelect = []
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                }

                                this.childSelect.push(temp)
                            }
                        }
                    }
                })
            },
            // 列表数据
            tableList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.$_userInfo_$.zoneId}/category/${this.categoryId}/enterprise/service/list`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data.records;
                            this.total = rsp.data.data.total
                        }
                    }
                })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.tableList();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.tableList();
            },
            // 分类管理
            $_sortManage_$() {
                this.$root.$_Route_$('user', 'jump', 'qyfwflgl', {})
            },
            // 添加服务
            $_addQuestion_$(formName) {
                this.$root.$_Route_$('user', 'jump', 'qyfwtjqy', {})
            },
            // 编辑
            $_show_$(row) {
                this.$root.$_Route_$('user', 'jump', 'qyfwbj', {row: row})
            },
            // 删除
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                        <p>确认删除该企业服务吗？</p><br>
                `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/enterprise/service/${row.id}`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.tableList()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                })
            },
            //下架
            $_downShelf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/enterprise/service/${row.id}/offline`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.tableList()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
            // 上架
            $_upShelf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/enterprise/service/${row.id}/online`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.tableList()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
        }
    }
</script>