<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .ivu-table .demo-table-info-row td {
        background-color: #2db7f5;
        color: #fff;
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
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }

    .avatar {
        width: 146px;
        height: 146px;
        display: block;
    }

</style>

<template>
    <div>
        <Row>
            <Col span="4">分类管理</Col>
            <Col span="4" offset="16" align="right">
                <Button style="margin-bottom: 20px;" type="primary" @click="$_addSort_$('uploads')">添加分类</Button>
            </Col>
        </Row>
        <Row>
            <Table @on-expand="expand" :columns="$_columns7_$" :data="$_data6_$"></Table>
        </Row>
    </div>
</template>

<script>
    import controler from './controler.js'
    import axios from 'axios'
    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option} from 'element-ui';
    import expandRow from './tableExpand.vue'

    export default {
        mixins: [controler],
        components: {
            expandRow,
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
                $_columns7_$: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    $_row_$: params.row.id
                                },
                            })
                        }
                    },
                    {
                        title: '服务分类名称',
                        key: 'name',
                        align: 'center',
                        width: 300,
                    },
                    {
                        title: '排序号',
                        key: 'sortNum',
                        align: 'center'
                    }, {
                        title: '缩略图',
                        key: 'imgUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h("img", {
                                attrs: {
                                    src: this.$_global_$.imgPath + params.row.image,
                                    width: "60px",
                                    height: "40px"
                                }
                            })
                        }
                    },
                    {
                        title: '状态',
                        key: status,
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.visible == 0 ? "上架" : "下架";
                            return h(
                                "span",
                                {},
                                text
                            )
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                        render: (h, params) => {
                            var text = this.FormatAllDate(params.row.createTime);
                            return h(
                                "span",
                                {},
                                text
                            );
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                            let text = params.row.visible == 0 ? "下架" : "上架";
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: "#f56c6c"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params.row.id)
                                        }
                                    }
                                }, '删除'),
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
                                            this.$_edit_$(params.row)
                                        }
                                    }
                                }, '编辑'),
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
                                            this.$_change_$(params.row)
                                        }
                                    }
                                }, text),

                            ]);
                        }
                    }

                ],
                $_data6_$: [],
                catlogList: [],
                id: 0, // 存放分类id
                propList: [],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_addmodal_$: false,
                $_addForm_$: {
                    name: '',
                    info: '',
                    level: '',
                    parent: '',
                    visible: '',
                    sortNum: '',
                    image: ''
                },
                $_addRuleValidate_$: {
                    name: [
                        {required: true, message: '请输入分类名称', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'},
                        {max: 20,message: '长度不能超过20', trigger: 'change'},
                    ],
                    level: [
                        {required: true, message: '请选择分类级别', trigger: 'change'}],
                    visible: [
                        {required: true, message: '请选择是否可见', trigger: 'change'},
                    ],
                    sortNum: [
                        {required: true, message: '请输入排序码', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'}
                    ],
                    info:[
                        {max: 100,message: '长度不能超过100', trigger: 'change'},
                    ]
                },
                levelList: [
                    {value: '1', label: '一级分类'},
                    {value: '2', label: '二级分类'}
                ],
                visibleList: [
                    {value: '0', label: '可见'},
                    {value: '1', label: '不可见'}
                ],
                $_file_$: [],
                baseUrl: this.$_global_$.imgPath,
                visible: '',
                $_editmodal_$: false,
                imageList: [], // 编辑回显图片列表
                $_editForm_$: {
                    file: '',
                },
                zoneId: ''
            }
        },
        created() {
            this.zoneId = this.$root.inparams.zoneId;

            this.$_list_$();
            this.$_global_$.serverPath
        },
        watch: {
            $_editmodal_$(e) {
                if (e == false) {
                    this.imageList = [];
                }
            }
        },
        methods: {
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
            // 获取分类列表
            $_list_$() {
                this.catlogList = [];
                this.$_querycfg_$.mod = 'operate/catalog/queryCatalogList';
                this.$_querycfg_$.params.zoneId = this.zoneId;
                this.$_querycfg_$.params.level = '1';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data;
                            var arr = rsp.data.data;
                            for (let i = 0; i < arr.length; i++) {
                                var temp = {
                                    value: arr[i].id + '',
                                    label: arr[i].name
                                };
                                if (arr[i].level == 1) {
                                    this.catlogList.push(temp)
                                }
                            }
                        }else{
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            // 获取展开表格的信息
            // $_eList_$() {
            //     this.$_sendQuery_$({
            //         method: "POST",
            //         url: this.$_global_$.serverPath + `/operate/goods/queryGoodsPageList`,
            //         data: {
            //             catalog: this.id,
            //             zoneId: this.zoneId
            //         },
            //         headers: {
            //             "Content-type": "application/json"
            //         }
            //     }).then((rsp) => {
            //         if (rsp.status === 200) {
            //             if (rsp.data.code === 0) {
            //                 this.propList = []
            //                 this.propList = rsp.data.data.records
            //             } else {
            //             }
            //         }
            //     })
            // },
            // 展开方法
            expand(row, status) {
                // this.id = row.id
                // if (status) {
                //     this.$_eList_$()
                // }
            },
            // 添加分类
            $_addSort_$(formName) {
                this.$root.$_Route_$("user", "jump", "xzspfl");

            },

            // 删除
            $_remove_$(id) {
                var id = id + ''
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                        <p>确认删除该分类吗</p><br>        
                `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/operate/catalog/delCatalog`,
                            data: {
                                id: id
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_list_$()
                                    this.$Message.success(rsp.data.data);
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                })
            },
            // 编辑
            $_edit_$(row) {
                this.$root.$_Route_$("user", "jump", "bjspfl", {row:row});

            },
            // 上下架 
            $_change_$(row) {
                this.id = row.id + '';
                let text = row.visible == 0 ? "下架" : "上架";

                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认${text}该分类吗？</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.visible = 1 - row.visible;
                        this.upDown()
                    },
                    onCancel: () => {

                    }
                })


            },
            // 上下架方法
            upDown() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/catalog/upAndDownCatalog`,
                    data: {
                        id: this.id,
                        visible: this.visible
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_list_$();
                            this.$Message.success(rsp.data.data);
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },

            beforeuploadEdit(file) {
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_editForm_$.file = res.data;
                this.fileChangeEdit(fileList);
                this.$refs.file.clearValidate();
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str;

                            }
                        }
                    }
                }
                this.$_file_$.push(a);
            },
            // 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = ''
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str;
                            }
                        }
                    }
                }
                this.$_file_$.pop(a);
            },
        }
    }
</script>