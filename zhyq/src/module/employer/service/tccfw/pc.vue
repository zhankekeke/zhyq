<style scoped>
    .el-dialog {
        width: 37% !important;
    }

    /*上传图片样式*/
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .el-upload--picture-card {
        display: none !important;
    }

    .el-table th > .cell {
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
        width: 100%;
        box-sizing: border-box;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #3399ff;
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
        width: 148px;
        height: 148px;
        display: block;
    }

    .portrait .ivu-form-item-label:before {
        content: "*";
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed3f14;
    }

    .wrap {
        background: #ffffff;
        height: 100vh;
        font-size: 16px;
        color: #333333;
        line-height: 1;
        min-width: 1010px;
        overflow-x: auto;
    }

    p {
        color: #666666;
    }

    span {
        color: #333333;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        line-height: 2;
    }

    .header {
        width: 96%;
        padding: 25px;
        box-shadow: 6px 6px 27px 5px #f4f4f4;
        box-sizing: border-box;
        border-radius: 6px;
        background: #fff;
        height: 260px;
    }

    .header img {
        width: 94px;
        height: 94px;
        border-radius: 50%;
        float: left;
    }

    .info {
        overflow: hidden;
        padding-left: 26px;
        /*margin-left: 70px;*/
        /*position: relative;*/

    }

    .name {
        line-height: 1;
        font-weight: 600;
        font-size: 20px;
        display: inline-block;
    }

    .info .add {
        border: 1px solid #3399ff;
        color: #3399ff;
        border-radius: 40%;
        padding: 0 15px;
    }

    .info .button {
        width: 100px;
        border: 1px solid #3399ff;
        color: #3399ff;
    }

    .list {
        /*margin-top: 20px;*/
        display: inline-block;
    }

    .item {
        /*box-shadow: 10px 0px 24px -2px #b5b5b5;*/
        display: inline-block;
        width: 290px;
        height: 365px;
        margin-right: 20px;
        margin-top: 20px;
        /*overflow: hidden;
        */
    }

    .item img {
        height: 100%;
        width: 100%;
    }

    .item .record {
        margin: 15px;
        margin-right: 0;
    }

    .item .record p {
        font-size: 14px;
        color: #666666;
    }

    .item button {
        display: block;
        margin: 0 auto;
        border: none;
        background: #f5f5f5;
        font-size: 14px;
        height: 48px;
        color: #333;
        border-radius: 0 0 4px 4px;
    }

    .item button:hover {
        color: #3399ff;
    }

    .swiper-home {
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        display: flex;
        white-space: nowrap;
        margin-top: 20px;
    }

    .swiper-item {
        width: 313px;
        height: 100%;
        display: inline-block;
    }

    .swiper-item p {
        clear: both;
    }

    .pinpai {
        color: rgb(255, 255, 255);
        width: 105px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
        border-radius: 3px;
        background: linear-gradient(0deg, #2a7bfa 0%, #2624c3 100%);
    }

    .mt40 {
        margin-top: 40px;
    }

    >>> .ivu-card-body {
        padding: 0;
    }
</style>
<template>
    <div class="wrap">
        <!-- 用户信息 -->
        <div class="header">
            <img :src="$_global_$.imgPath+$_userInfo_$.faceUrl" alt="">
            <div class="info">
                <div @click="$_addyuyue_$()" style="float: right;color:#3399ff;font-size: 14px;cursor: pointer">
                    停车场预约规则
                </div>
                <div>
                    <span class="name">{{this.$_userInfo_$.name}}</span>
                    <!--<span class="add" type="text" @click="$_add_$()">+</span>-->
                    <Button style="height: 10px;line-height: 0px;margin-left: 15px" type="ghost" shape="circle"
                            @click="$_add_$()">+
                    </Button>
                </div>
                <br/>
                <Button class="button" type="text" @click="$_jfjl_$()">车辆缴费记录</Button>
                <Button class="button" type="text" style="margin-left:8px;" @click="$_ywjl_$()">车辆预约记录</Button>

                <div class="swiper-home">
                    <div style="overflow-x: scroll;width: 100%">
                        <div class="swiper-item" v-for="(item, index) in $_data6_$" :key="index"
                             @click="$_carInfo_$(item)">
                            <div class="pinpai">
                                {{item.province}}·{{item.plateNumber}}
                            </div>
                            <p style="margin-top: 20px">品牌：<span>{{item.brand}}</span></p>
                            <p style="margin-top: 15px">{{item.carType|formatType}}：
                                <span v-if="item.carType==2">{{item.startTime.substr(0,10)}}-{{item.endTime.substr(0,10)}}</span>
                                <span v-else>标准收费</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!--<Table :columns="$_columns_$" :data="$_data6_$" ref="selection"></Table>-->
        </div>
        <br>
        <!-- 列表 -->
        <div class="list">
            <div v-if="item.status" v-for="item in $_data7_$" class="item">
                <Card>
                    <div style="width: 100%;height: 170px">
                        <img v-if="item.images.length>0" style="width: 100%;height: 100%"
                             :src="$_global_$.imgPath +item.images[0].imageUrl" alt="">
                    </div>
                    <div class="record">


                        <p class="title">{{item.name}}</p>

                        <p style="margin-top: 10px"> 容纳车位数：{{item.placeNumber}}
                            <span style="float:right;
                            padding: 0 10px;
                            border-radius: 20px 0 0 20px;
                            color:#3399ff;
                            height: 30px;
                            line-height: 30px;
                            background-color: #c1e0ff;">{{item.parkingLotConfig.externalDesc}}
                            </span>
                        </p>
                        <p style="margin-top: 10px"> 实时车位数：{{item.placeNumber}}
                        </p>
                        <p style="margin-top: 10px">地址：{{item.address}}
                        </p>
                    </div>
                    <Button type="ghost" long @click="$_yuyue_$(item.id)">立即预约</Button>

                </Card>
            </div>
        </div>
        <!--<Row class="mt40">-->
        <!--<div style="float: left">共{{$_total_$}}条数据</div>-->

        <!--<Page align="right" :total="$_total_$"-->
        <!--@on-page-size-change="$_pageNum_$"-->
        <!--@on-change="$_changePage_$"-->
        <!--/>-->
        <!--</Row>-->
        <!-- 预约case1弹窗 -->
        <Modal v-model="modal1" title="提示">
            <Form :model="case1Form" ref="case1Form">
                <FormItem label="选择已有车辆" prop="cl">
                    <Select v-model="case1Form.cl" style="width:200px">
                        <Option v-for="item in carList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <p>确定要预约吗?</p>
            <div slot="footer" align="center">
                <Button type="ghost" @click="modal1 = false" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="$_submit_$">提交</Button>
            </div>
        </Modal>
        <!--  预约case2弹窗 -->
        <Modal v-model="modal2" title="提示">
            <p>您还没有添加车辆,去绑定?</p>
            <div slot="footer" align="center">
                <Button type="ghost" @click="modal2 = false" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="$_ok_$">确定</Button>
            </div>
        </Modal>
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

        filters: {
            formatType(val) {
                if (val == 0) {
                    return '外来车位'
                }
                if (val == 1) {
                    return '临时车位'
                }
                if (val == 2) {
                    return '固定车位'
                }
            }
        },
        data() {
            return {
                modal1: false,
                modal2: false,

                case1Form: {  // 预约模态框
                    cl: 0
                },
                $_data6_$: [], // 员工绑定的车辆列表
                $_data7_$: [{}], //
                zoneId: 0, // 园区id
                carList: [], // 车辆列表
                yuyueid: 0,
                $_editmodal_$: false, // 更新车辆
                carId: 0, // 车辆id
                id: 0, // 车辆id 解绑用
                baseUrl: 'http://img.yhcode.com:88/', // 图片基础路径
                $_editForm_$: {}, // 更新表单
                $_userInfo_$: {},
                imageList: [], // 回显图片列表
                $_file_$: [],
                $_file2_$: [],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },

                tccConfig: {
                    externalDesc: '',
                    tempDesc: ''
                },
                $_columns_$: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                    }, {
                        title: '预览图',
                        key: 'imageUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h("img", {
                                attrs: {
                                    src: this.$_global_$.imgPath + params.row.imageUrl,
                                    width: "40px",
                                    height: "40px"
                                }
                            })
                        }
                    }, {
                        title: '车牌号',
                        key: 'province',
                        align: 'center',
                        render: (h, params) => {
                            var a;

                            a = params.row.province + params.row.plateNumber

                            return h("span", {}, a);
                        }
                    }, {
                        title: '车辆类型',
                        key: 'carType',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if (params.row.carType == 0) {
                                a = '外来车辆'
                            }
                            if (params.row.carType == 1) {
                                a = '临时车辆'
                            }
                            if (params.row.carType == 2) {
                                a = '固定车位'
                            }
                            return h("span", {}, a);
                        }
                    }, {
                        title: '收费标准',
                        key: 'externalDesc',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            a = '标准收费'
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '车位起始时间',
                        key: 'startTime',
                        align: 'center',
                        render: (h, params) => {
                            let a;
                            a = params.row.startTime.substr(0, 10) + '-' + params.row.endTime.substr(0, 10)
                            return h("span", {}, a);
                        }
                    }, {
                        title: '创建时间',
                        key: 'createDate',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if (params.row.createDate) {
                                a = params.row.createDate
                            } else {
                                a = '-'
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
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
                                            let r = JSON.parse(JSON.stringify(params.row));
                                            this.$_edit_$(r)
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
                                            this.$_remove_$(params.row);
                                        }
                                    }
                                }, '解绑'),

                            ]);
                        }
                    },
                ],
                $_total_$: 0,//数据总数

            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_global_$.imgPath;
            // this.$_sfbz_$();
            this.$_tcc_$();
            this.$_list_$();
        },
        methods: {
            //   获取员工车辆列表
            $_list_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/zone/car/employee/list',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data.records;

                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            $_addyuyue_$() {
                this.$root.$_Route_$('employer', 'jump', 'tccyygz', {});
            },
            //   预约
            $_yuyue_$(id) {
                this.carList = [];
                this.yuyueid = id;
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/zone/car/employee/list',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            for (let i = 0; i < arr.length; i++) {
                                var temp = {}
                                var carNum = arr[i].province + arr[i].plateNumber
                                temp = {value: arr[i].id, label: carNum}
                                this.carList.push(temp)
                            }
                        }
                    }
                })
                if (this.carList) {
                    this.modal1 = true
                } else {
                    this.modal2 = true
                }
            },
            // case1提交
            $_submit_$() {
                if (this.case1Form.cl !== 0) {
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + `/zone/zone/${this.$_userInfo_$.zoneId}/parkinglot/` + this.yuyueid + `/reserve`,
                        data: {
                            carId: this.case1Form.cl
                        },
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$Message.success('预约成功!');
                                this.modal1 = false;
                                this.$root.$_Route_$('employer', 'jump', 'yyjl', {})
                            } else {
                                this.$Message.error(rsp.data.message);
                            }
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            },
            // case2确定
            $_ok_$() {
                this.$root.$_Route_$('employer', 'jump', 'xzcl', {})
            },
            // 缴费记录
            $_jfjl_$() {
                this.$root.$_Route_$('employer', 'jump', 'jfjl', {})
            },
            // 预约记录
            $_ywjl_$() {
                this.$root.$_Route_$('employer', 'jump', 'yyjl', {})
            },
            // 添加
            $_add_$() {
                this.$root.$_Route_$('employer', 'jump', 'xzcl', {})
            },
            //详情
            $_carInfo_$(carInfo) {
                this.$root.$_Route_$('employer', 'jump', 'bjcl', {carInfo: carInfo})
            },
            $_tcc_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_userInfo_$.zoneId}/parkinglot/search`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data7_$ = rsp.data.data.records
                            this.$_total_$ = rsp.data.data.total * 1;

                        }
                    }
                })
            },
            $_sfbz_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_userInfo_$.zoneId}/parkinglot/config`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.tccConfig = rsp.data.data;
                            }
                        }
                    }
                })
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.pageSize = e;
                this.$_tcc_$();
            },
            $_changePage_$(e) {
                this.pageNum = e;
                this.$_tcc_$();
            },
        }
    };
</script>