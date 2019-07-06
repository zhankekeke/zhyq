<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }
    .search {
        padding: 20px;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 12px;
        color: #000;
        background-color: #f5f5f5;
    }

    .bg {
        background: #efefef;
        padding: 10px;
    }

    .ivu-modal-body {
        padding: 0;
    }

    .ivu-form-item {
        margin-bottom: 0px;
    }

    .hysbox li {
        line-height: 24px;
        height: 24px;
    }

    .dialog-footer {
        padding-top: 10px;
        text-align: right;
    }

    >>> .el-input__inner {
        height: 32px;
        line-height: 32px;
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
        <!-- 搜索 -->
        <div class="search" >
            <span style="font-size: 14px">名称：</span>
            <Input v-model="$_searchName_$" style="width: 180px;margin-right: 10px;" placeholder="请输入轮播图名称"></Input>
            &nbsp;&nbsp;<span style="font-size: 14px">终端类型：</span>
            <Select v-model="$_selected1_$" style="width:180px;margin-right: 10px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;<span style="font-size: 14px">状态：</span>
            <Select v-model="$_selected2_$" style="width:80px;margin-right:10px">
                <Option v-for="item in publish" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;<span style="font-size: 14px">业务类型：</span>
            <Select v-model="$_selected3_$" style="width:110px;margin-right: 10px">
                <Option v-for="item in typecodeList" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <Row>
            <Col align="right">
                <Button type="primary" @click="$_addLbt_$('addform')">新建轮播图</Button>
            </Col>
        </Row>
        <br>
        <Row class="mt10">
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
        </Row>
        <!-- 详情 -->
    </div>
</template>
<script>
    import controler from "./controler.js";
    import 'element-ui/lib/theme-chalk/index.css';
    import {
        Table, Button, TableColumn, Form, Dialog,
        Input, FormItem, Select, Option, Tag, Radio, Upload
    } from 'element-ui';

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
        //过滤
        filters: {
        },
        data() {
            const validateurl = (rule, value, callback) => {
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                    + "|" // 允许IP和DOMAIN（域名）
                    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                    + "[a-z]{2,6})" // first level domain- .com or .museum
                    + "(:[0-9]{1,4})?" // 端口- :80
                    + "((/?)|" // a slash isn't required if there is no file name
                    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
                let re = new RegExp(strRegex);
                //re.test()
                if(value){
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback('请输入正确格式的链接');
                    }
                }else{
                    callback('请输入跳转链接');
                }

            };
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$.length > 0) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                $_userInfo_$: '',  //用户信息
                //创建列表zoneId
                zoneId: 0,
                imgName: '',
                publishStatus: 0,
                visible: false,
                uploadList: [],
                $_model10_$: [],
                $_formValidate_$: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                formValidate: {
                    $_commondityName_$: "",
                    $_tag_$: "",
                    $_drinks_$: "",
                    $_stock_$: "",
                    $_price_$: "",
                    $_distribution_$: "",
                    $_upload_$: "",
                    $_desc_$: ""
                },

                $_columns7_$: [
                    {
                        title: '序号',
                        type: "index",
                        align: 'center',
                        width: 60,
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '预览图',
                        key: 'image',
                        align: 'center',
                        render: (h, params) => {
                            return h("img", {
                                attrs: {
                                    src: this.$_global_$.imgPath + params.row.image,
                                    width: "40px",
                                    height: "40px"
                                }
                            })
                        }
                    },
                    {
                        title: '跳转链接',
                        key: 'type',
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.type == 0 ? params.row.pcUrl : params.row.appUrl;
                            return h(
                                "span",
                                {},
                                text
                            )
                        }
                    },
                    {
                        title: '终端类型',
                        key: 'type',
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.type == 0 ? "PC端" : "移动端";
                            return h(
                                "span",
                                {},
                                text
                            )
                        }
                    },
                    {
                        title: '业务类型',
                        key: 'typeCode',
                        align: 'center',
                        render: (h, params) => {
                            let text = '';
                            if(params.row.typeCode==0){
                                text = '首页'
                            }else if(params.row.typeCode==1){
                                text = '积分商城'
                            }else if(params.row.typeCode==2){
                                text = '企业服务'
                            }
                            return h(
                                "span",
                                {},
                                text
                            )
                        }
                    },
                    {
                        title: '状态',
                        key: 'publishStatus',
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.publishStatus == 0 ? "上架" : "下架";
                            return h(
                                "span",
                                {},
                                text
                            )
                        }
                    },
                    {
                        title: '排序号',
                        key: 'seqId',
                        align: 'center',
                    },
                    {
                        title: '创建时间',
                        key: 'createDate',
                        align: 'center',
                        render: (h, params) => {
                            let text='';
                            if(params.row.createDate && params.row.createDate!=''){
                                text=this.FormatAllDate(params.row.createDate)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                            let text = params.row.publishStatus == 0 ? "下架" : "上架";
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
                                            this.$_delete_$(params.row);
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
                                            this.upAndDownCarouselImage(params.row, params.row.publishStatus);
                                        }
                                    }
                                }, text),

                            ]);
                        }
                    }

                ],

                $_modalAddCommondity_$: false,
                $_orderTime_$: "",
                $_goodsName_$: "",  // 轮播图名称
                $_modalAdd_$: false,  // 添加轮播图模态框
                $_editLbt_$: false, // 编辑轮播图模态框
                $_editId_$: 0,  //  编辑轮播图的id
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_searchName_$: '', //轮播图名称
                $_selected1_$: '',  //终端类型
                $_selected2_$: '',  //状态
                $_selected3_$: '',  //业务类型
                typeList: [{value: 0, label: 'PC端'}, {value: 1, label: '移动端'},{value: 9, label: '全部'}],
                publish: [{value: 0, label: '上架'}, {value: 1, label: '下架'},{value: 9, label: '全部'}],
                typecodeList: [{value: 0, label: '首页'}, {value: 1, label: '积分商城'}, {value: 2, label: '企业服务'},{value:3, label: '管家服务'},{value:9, label: '全部'}],  //业务类型

                $_data6_$: [], // 表格数据
                $_pageSize_$: 2, // 每页条数
                $_file_$: [],
                baseUrl: this.$_global_$.imgPath, // 图片基础路径
                $_addForm_$: {  // 添加表单
                    name: '',
                    type: '',
                    url: '',
                    seqId: '',
                    file: ''
                },
                addValidator: {
                    name: [
                        {required: true, message: '请输入轮播图名称', trigger: 'change'},
                        {max: 20, message: '不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    url: [
                        {required: true, validator: validateurl, trigger: 'change'},
                        {max: 50, message: '不能超过50字', trigger: 'change'},
                    ],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}
                    ],
                    seqId: [
                        {required: true, message: '请输入排序号', trigger: 'change'},
                        {max: 6, message: '不能超过6位数', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'}
                    ]
                },
                catlogList: [], // 轮播图分类列表
                dynamicTags: [], // 标签临时存放数组
                inputVisible: false, // 标签输入框可见性
                inputValue: '', // 标签输入绑定
                $_editForm_$: {  // 编辑轮播图表单
                    name: '',
                    type: '',
                    url: '',
                    seqId: '',
                    file: ''
                },
                imageList: [], // 编辑轮播图图片回显
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);

            this.zoneId = this.$_userInfo_$.zoneId;

            this.$_list_$();
        },
        watch: {
            $_editLbt_$(e) {
                if (e == false) {
                    this.imageList = [];
                }
            }
        },
        methods: {
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

            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background:#f8f8f9'
                } else {
                    return ''
                }
            },
            //  获取轮播图列表
            $_list_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/operate/mallCarousel/queryCarouselImageList',
                    data: {
                        zoneId: this.zoneId
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data
                        }
                    }
                })
            },
            //搜索轮播图列表
            $_search_$() {
                let Data = {zoneId:this.zoneId};
                if(this.$_searchName_$){
                    Data.name = this.$_searchName_$;
                }
                if(String(this.$_selected1_$)==9){
                    
                }else if(String(this.$_selected1_$)){
                    Data.type = String(this.$_selected1_$);
                }
                if(String(this.$_selected2_$)==9){
                    // Data.publishStatus = String(this.$_selected2_$);
                }else if(String(this.$_selected2_$)){
                    Data.publishStatus = String(this.$_selected2_$);
                }
                if(String(this.$_selected3_$)==9){
                    
                }else if(String(this.$_selected3_$)){
                    Data.typeCode = String(this.$_selected3_$);
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/operate/mallCarousel/queryCarouselImageList',
                    data: Data,
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data
                        }
                    }
                })
            },
            //添加轮播图
            $_addLbt_$(addForm) {
                this.$root.$_Route_$("user", "jump", "lbtsz");

            },
            //删除
            $_delete_$(row) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认删除该轮播图吗？</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/mallCarousel/delCarouselImage',
                            data: {
                                id: row.id,
                                name: row.name
                            },
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
            // 编辑
            $_edit_$(row) {
                this.$_file_$ = [];
                var arr = row.image.split(';');
                for (var key in arr) {
                    var temp = {};
                    temp.name = key;
                    temp.url = arr[key];
                    this.imageList.push(temp);
                    this.$_file_$.push(temp.url);
                }
                // 标签处理
                this.$_editForm_$.name = row.name;
                this.$_editForm_$.type = row.type;
                if(row.type==0){
                    this.$_editForm_$.url = row.pcUrl;
                }else if (row.type==1) {
                    this.$_editForm_$.url = row.appUrl;
                }

                this.$_editForm_$.seqId = row.seqId;
                this.$_editForm_$.file = this.$_file_$[0];
                this.$_editForm_$.typecodeList = row.typeCode * 1;
                this.$_editId_$ = row.id;
                this.$root.$_Route_$("user", "jump", "lbtbj",{row:this.$_editForm_$,id:this.$_editId_$,file:this.$_file_$});
            },


            upAndDownCarouselImage(row, vis) {
                let text = vis == 0 ? "下架" : "上架";
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认${text}该轮播图吗？</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/mallCarousel/upAndDownCarouselImage',
                            data: {
                                id: row.id,
                                name: row.name,
                                publishStatus: 1 - vis,
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data)
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

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
        }
    }
</script>
<style>
    .ivu-message {
        z-index: 9999;
    }
</style>