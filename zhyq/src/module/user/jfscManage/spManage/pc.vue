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
        padding: 20px;
        color: #000;
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

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
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
    <div class="zdtb">

        <div class="search">
            <span>商品名称：</span>
            <Input style="width: 210px;" v-model="$_goodsName_$" placeholder="请输入商品名称"></Input>
            <Button class="ml28" type="primary" @click="$_userSearch_$">搜索</Button>
        </div>

        <Row>
            <!-- <Col span = "8">
                <Button type="primary" @click="$_upShelf_$" class = "mt10 mr5 doo" >上架</Button>
                <Button type="primary" @click="$_downShelf_$" class = "mt10">下架</Button>
            </Col> -->
            <Col span="8" offset="16" align="right">
                <Button type="primary" @click="$_sortManagement_$" class="mt10 mr5">分类管理</Button>
                <Button type="primary" @click="$_addCommondity_$('uplods')" class="mt10">+ 添加商品</Button>
            </Col>
        </Row>

        <!-- 表格 -->
        <Row class="mt10">
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
        </Row>
        <br>
        <!-- 分页 -->
        <Row>
            <Col span="24" align="right">
                <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{total}}条数据</span>
                <Page :total="total"
                      show-elevator show-sizer
                      :page-size="$_pageSize_$"
                      @on-page-size-change="$_pageNum_$"
                      @on-change="$_changePage_$"/>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {
        Table,
        Button,
        TableColumn,
        Form,
        Dialog,
        Input,
        FormItem,
        Select,
        Option,
        Tag,
        Radio,
        Upload
    } from 'element-ui';
    import controler from './controler.js';
    import 'element-ui/lib/theme-chalk/index.css';
    import axios from 'axios'

    export default {
        mixins: [controler],
        components: {
            [Table.name]: Table,
            [Button.name]: Button,
            [TableColumn.name]: TableColumn,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Select.name]: Select,
            [Option.name]: Option,
            [Tag.name]: Tag,
            [Radio.name]: Radio,
            [Upload.name]: Upload,
        },
        filters: {},
        data() {
            return {
                //数据条数
                imgName: '',
                $_userInfo_$: '',
                $_zoneId_$: '',
                $_goodsName_$: "",  // 商品名称
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                total: 0, // 总数

                $_columns7_$: [
                    {
                        title: '序号',
                        type: "index",
                        align: 'center',
                        width: 60,
                    },
                    {
                        title: '商品类型',
                        type: 'goodsType',
                        align: "center",
                        render: (h, params) => {
                            let goodstype = '';
                            if (params.row.goodsType == 0) {
                                goodstype = '普通商品';
                            } else if (params.row.goodsType == 1) {
                                goodstype = '积分商品';
                            } else if (params.row.goodsType == 2) {
                                goodstype = '代金券';
                            }
                            return h(
                                "span",
                                {},
                                goodstype
                            )
                        }
                    },
                    {
                        title: '商品名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '预览图',
                        key: 'image',
                        align: 'center',
                        render: (h, params) => {
                            let imageArr = params.row.image.split(";");
                            return h("img", {
                                attrs: {
                                    src: this.$_global_$.imgPath + imageArr[0],
                                    width: "40px",
                                    height: "40px"
                                }
                            })
                        }
                    },
                    {
                        title: '需兑换积分/元',
                        key: 'goodsType',
                        align: 'center',
                        render: (h, params) => {
                            let text = '';
                            if (params.row.goodsType == 0) {
                                text = params.row.prices + '元';
                            } else {
                                text = params.row.credits + '积分';
                            }
                            return h(
                                "span",
                                {},
                                text
                            )
                        }
                    },
                    {
                        title: '销量',
                        key: 'salesCount',
                        align: 'center'
                    },
                    {
                        title: '库存',
                        key: 'repertory',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'putaway',
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.putaway == 0 ? "上架" : "下架";
                            return h(
                                "span",
                                {},
                                text
                            )
                        }
                    },
                    {
                        title: '排序号',
                        key: 'sortNum',
                        align: 'center',
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
                            let text = params.row.putaway == 0 ? "下架" : "上架";
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
                                            this.$_show_$(params.row.id)
                                        }
                                    }
                                }, '详情'),
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
                                            this.upAndDownGoods(params.row.id, params.row.putaway);
                                        }
                                    }
                                }, text),
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
                                            this.$_remove_$(params.row.id);
                                        }
                                    }
                                }, '删除'),

                            ]);
                        }
                    }

                ],

                $_data6_$: [], // 表格数据
                $_pageSize_$: 10, // 每页条数
                $_file_$: [],
                baseUrl: this.$_global_$.imgPath,
                dynamicTags: [], // 标签临时存放数组
                $_editForm_$: {},// 编辑商品表单
                imageList: [], // 编辑商品图片回显
                id: '',  // 删除时使用
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_zoneId_$ = this.$_userInfo_$.zoneId;
            // this.$_zoneId_$ = '1073870136848662533';

            this.$_list_$();
            //默认起始条数
            this.$_querycfg_$.params.size = this.$_pageSize_$;
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

            //  获取商品列表
            $_list_$() {
                this.$_querycfg_$.mod = 'operate/goods/queryGoodsPageList';
                this.$_querycfg_$.params.zoneId = this.$_zoneId_$
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data.records
                            this.total = rsp.data.data.total
                        }
                    }
                })
            },
            // 删除
            $_remove_$(id) {
                this.id = String(id)
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认删除?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/goods/delGoods',
                            data: {
                                id: this.id
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data);
                                    this.$_list_$()
                                } else {
                                    this.$Message.error('删除失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info("Clicked cancel");
                    }
                });
            },

            // 添加商品
            $_addCommondity_$(formName) {
                this.$root.$_Route_$("user", "jump", "tjsp", {zoneId: this.$_zoneId_$});
            },
            // 分类管理
            $_sortManagement_$() {
                this.$root.$_Route_$('user', 'jump', 'jfspgl', {zoneId: this.$_zoneId_$})
            },

            upAndDownGoods(id, status) {
                let text = status == 0 ? "下架" : "上架";

                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认${text}该商品吗？</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/goods/upAndDownGoods',
                            data: {
                                idList: [id],
                                putaway: 1 - status
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data);
                                    this.$_list_$()
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
            //  搜索
            $_userSearch_$() {
                if (this.$_goodsName_$) {
                    this.$_querycfg_$.params.name = this.$_goodsName_$;
                } else {
                    delete this.$_querycfg_$.params.name;
                }
                this.$_list_$();
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.current = e;
                this.$_querycfg_$.params.size = this.$_pageSize_$;
                this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.size = e;
                this.$_list_$();
            },
            // 详情
            $_show_$(id) {
                this.$root.$_Route_$('user', 'jump', 'jfspglxq', {id: id})
            },
            // 编辑
            $_edit_$(row) {
                // 图片列表处理
                var arr = row.image.split(";");
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        this.imageList.push({
                            url: arr[i]
                        })
                    }
                }
                // 标签处理
                this.dynamicTags = row.tags.split(";");
                this.$_editForm_$ = row;
                this.$_editForm_$.isDelivery = this.$_editForm_$.isDelivery + '';
                this.$_editForm_$.goodsType = this.$_editForm_$.goodsType + '';
                this.$_editForm_$.catalog = this.$_editForm_$.catalog + '';
                this.$_editForm_$.repertory = this.$_editForm_$.repertory + '';
                this.$_file_$ = row.image.split(";");

                this.$root.$_Route_$("user", "jump", "bjsp", {
                    zoneId: this.$_zoneId_$,
                    goodsData: this.$_editForm_$,
                    file: this.$_file_$,
                    dynamicTags: this.dynamicTags
                });
            },
        }
    }
</script>