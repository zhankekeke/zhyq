<style scoped>
    .container {
        font-size: 16px;
        color: #666;
        font-weight: 650;
        line-height: 50px;
    }

    .bg {
        min-height: 80px;
        box-sizing: border-box;
        padding: 0 40px;
        line-height: 80px;
        font-weight: 400;
    }

    .bigstyle {
        font-size: 18px;
        font-weight: 400;
    }

    .textCenter {
        text-align: center;
    }

    .marginAuto {
        margin: 0 auto;
    }

    .step {
        padding: 50px 0;
    }

    .box {
        box-sizing: border-box;
        padding: 0 15px;
    }

    .box1 {
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #e4e4e3;
        border-radius: 5px;
        line-height: 30px;
    }

    .line25 {
        line-height: 25px;
    }

    .line35 {
        line-height: 35px;
    }

    .textCenter {
        text-align: center;
        margin: 10px 0;
    }

    .three button {
        margin: 30px 20px 0;
    }

    .color0000FF {
        color: #0000ff;
    }
</style>
<template>
    <div class="container">
        <Row>
            <Col span="12">积分发放</Col>
        </Row>
        <Row class="bg">
            <Col span="12">
                账户名称：
                <span class="bigstyle" v-model="$_message_$">{{$_message_$.name}}</span>
            </Col>
            <Col span="12">
                类型：
                <span v-model="$_message_$">{{$_message_$.type}}</span>
            </Col>
        </Row>
        <Row class="step">
            <Col span="24">
                <div style="margin-left:150px;">
                    <Steps :current="$_current_$">
                        <Step title="选择"></Step>
                        <Step title="发放"></Step>
                        <Step title="确认"></Step>
                    </Steps>
                </div>
            </Col>
        </Row>
        <div>发放对象：
            <RadioGroup @on-change='$_danxuan_$' v-model="xuanze">
                <Radio label="0">
                    <span>企业</span>
                </Radio>
                <Radio label="1">
                    <span>个人</span>
                </Radio>
            </RadioGroup>
        </div>
        <Form ref="$_djqForm_$" :model="$_djqForm_$" :rules="$_ruleDjqForm_$" :label-width="100" v-if="this.xuanze==0">
            <Row>
                <Col span="10" class="box">
                    <div class="demo-spin-article">
                        <div class="box1 line25" ref="step1">
                            <div style="float:left; width:45%;overflow-y: auto; height: 500px">
                                企业列表：
                                <!--<Input v-model="$_search_$" placeholder="请输入名称搜索" style="width: 100%"></Input>-->
                                <Tree ref="tree"
                                      :data="$_datas_$"
                                      @on-check-change="$_checks_$"
                                      show-checkbox>
                                </Tree>
                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </div>
                </Col>
                <Col span="7" class="box">
                    <div class="box1 line35" ref="step2">
                        <FormItem label="发放事由：" prop="reasons">
                            <Input type="textarea" placeholder="请填写发放理由" v-model="$_djqForm_$.reasons"></Input>
                        </FormItem>
                        <FormItem label="每个企业赠：" prop="ffnum">
                            <Input v-model="$_djqForm_$.ffnum" number></Input>
                        </FormItem>
                    </div>
                </Col>

                <Col span="7" class="box">
                    <div class="box1 three line35" ref="step3">
                        <FormItem label="发放给：">
                            <ul style="overflow-y:auto;height:100px;">
                                <li v-for="item in $_yeInfo_$">
                                    {{item.title}}
                                </li>
                            </ul>
                        </FormItem>
                        <FormItem label="总计赠送：" prop="select">
                            <Input disabled v-model="$_djqForm_$.ffnum * $_yeNum_$"></Input>
                        </FormItem>
                        <div style="text-align: center">
                            <Button @click="onBack()" type="ghost">取消</Button>
                            <Button @click="$_backs_$($_djqForm_$)" type="primary">确认</Button>
                        </div>
                    </div>
                </Col>

            </Row>
        </Form>
        <Form ref="$_djqForm_$" :model="$_djqForm_$" :rules="$_ruleDjqForm_$" :label-width="100" v-else>
            <Row>

                <Col span="10" class="box">
                    <div class="demo-spin-article">
                        <div class="box1 line25" ref="step1">
                            <div style="float:left; width:45%;overflow-y: auto; height: 500px">
                                企业列表：
                                <!--<Input v-model="$_search_$" placeholder="请输入名称搜索" style="width: 100%"></Input>-->
                                <Tree ref="tree"
                                      :data="$_data_$"
                                      @on-select-change="$_choice_$"
                                      @on-check-change="$_check_$"
                                      show-checkbox>
                                </Tree>
                            </div>
                            <div style="float: left; margin-left:10%; width: 35%; font-weight: normal;">
                                <span style="font-size: 14px;">所选员工列表：</span>
                                <span v-if="$_ygList_$.length == 0" style="font-size: 12px;"><br/>请选择部门查看</span>
                                <span v-else>
                            <CheckboxGroup @on-change="$_newData_$"
                                           style="margin-top: 8px;overflow-y:auto;height:500px;"
                                           v-model="checkAllGroup">
                                <Checkbox v-for="item in $_ygList_$" :label="item.id">
                                    <span>{{item.name}}</span>
                                </Checkbox>
                            </CheckboxGroup>
                            </span>
                            </div>
                            <div style="clear: both"></div>
                        </div>
                        <Spin size="large" fix v-if="spinShow"></Spin>
                    </div>
                </Col>
                <Col span="7" class="box">
                    <div class="box1 line35" ref="step2">
                        <FormItem label="发放事由：" prop="reasons">
                            <Input type="textarea" placeholder="请填写发放理由" v-model="$_djqForm_$.reasons"></Input>
                        </FormItem>
                        <FormItem label="每人赠送：" prop="ffnum">
                            <Input v-model="$_djqForm_$.ffnum" number></Input>
                        </FormItem>
                    </div>
                </Col>
                <Col span="7" class="box">
                    <div class="box1 three line35" ref="step3">
                        <FormItem label="发放给：">
                            <ul style="overflow-y:auto;height:100px;">
                                <li v-for="item in $_ygInfo_$">
                                    {{item.name}}
                                </li>
                            </ul>
                        </FormItem>
                        <FormItem label="总计赠送：" prop="select">
                            <Input disabled v-model="$_djqForm_$.ffnum * $_ygNum_$"></Input>
                        </FormItem>
                        <div style="text-align: center">
                            <Button @click="onBack()" type="ghost">取消</Button>
                            <Button @click="$_back_$($_djqForm_$)" type="primary">确认</Button>
                        </div>
                    </div>
                </Col>

            </Row>
        </Form>
    </div>
</template>

<script>
    import controler from "./controler.js";
    import axios from "axios";

    export default {
        mixins: [controler],
        data() {
            return {
                //
                spinShow: false,
                $_zeId_$: [
                    {
                        voucherId: '',
                        voucherName: ''
                    }
                ],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_current_$: 0,
                $_message_$: {
                    name: "",
                    type: ""
                },
                mydata: "",//发放页面的数据
                //员工数量
                $_ygNum_$: 0,
                $_yeNum_$: 0,
                //发放数量
                $_ffnum_$: 5,
                $_grantCount_$: 0,
                //表单数据
                $_djqForm_$: {
                    ffnum: 0,
                    reasons: "",
                    select: "",
                    name: "",
                    info: "",
                    threshold: "",
                    validity: "",
                    title: "",
                    recvId: "",
                    recvName: "",
                    recvCount: 0,
                    djqId: "",
                    denominationSum: "",
                    accountId: "",
                    accountType: "",
                    recvIds: "",
                    recvNames: "",
                },
                //表单验证规则
                $_ruleDjqForm_$: {
                    reasons: [
                        {required: true, type: 'string', message: '请填写发放事由', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 100, message: '不能超过100字', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: "请输入", trigger: "change"}
                    ],
                    grantCount: [
                        {required: true, message: "请输入", trigger: "change"}
                    ],
                    recvNames: [
                        {required: true, message: "请选择", trigger: "change"}
                    ],
                    ffnum: [
                        {required: true, type: "number", message: "请填写数字，如：10000", trigger: "change"},
                        {type: 'number', max: 99999999, message: '数字不能超过99999999', trigger: 'change'}
                    ],

                },
                thresholdList: [],
                //代金卷列表
                $_cityList_$: [],
                //代金卷详细信息
                $_djqList_$: [],
                //代金券类型
                $_List_$: [
                    // {
                    //   value: "代金券1",
                    //   label: "代金券1"
                    // },
                    // {
                    //   value: "代金券2",
                    //   label: "代金券2"
                    // }
                ],
                $_model_$: "",
                $_search_$: "",
                //当前列表数据
                $_data_$: [],
                $_datas_$: [],
                myprams: "",
                xuanze: "0",
                grantType: '',
                //部门数据
                $_bumen_$: [],
                $_bumenList_$: '',
                checkAllGroup: [],
                ygname: [],
                $_ygInfo_$: [],
                $_yeInfo_$: [],
                $_ygList_$: [],
                $_acType_$: ''
            };
        },
        created() {
            this.$_list_$();
            this.$_lists_$();
        },
        methods: {
            onBack() {
                this.$root.$_Route_$("user", "zcManage", "jfmanage");
            },

            $_choice_$(rep) {
                this.$_ygList_$ = [];
                this.$_ygInfo_$ = [];

                if (rep.length > 0) {
                    if (rep[0].parentId != 'top') {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/company/company/${rep[0].enterpriseId}/department/${rep[0].id}/employee`,
                            data: {}
                        }).then(rsp => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.checkAllGroup = [];
                                    this.$_djqForm_$.recvCount = rsp.data.data.records.length;
                                    if (rsp.data.data.records.length > 0) {
                                        for (let j = 0; j < rsp.data.data.records.length; j++) {
                                            this.$_ygList_$.push(rsp.data.data.records[j]);
                                        }
                                    }
                                }
                            }
                        });
                    } else {
                        alert('请选择部门进行查看')
                    }
                }
            },
            $_danxuan_$(xuanze) {
                this.xuanze = xuanze
            }
            ,
            //展开树形菜单
            $_selectTree_$(rep) {
                if (rep.parentId == 'top') {
                    this.$_sendQuery_$({
                        method: "GET",
                        url: `${this.$_global_$.serverPath}/company/company/${rep.id}/department`,
                    }).then(res => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                if (res.data.data) {
                                    this.$_bumen_$ = [];
                                    for (let i = 0; i < res.data.data.length; i++) {
                                        this.$_bumen_$.push(res.data.data[i]);
                                        if (res.data.data[i].child) {
                                            this.$_hy_$(res.data.data[i]);
                                        }
                                    }
                                    let bumen = this.$_dg_$(this.$_bumen_$);
                                    this.$_data_$[rep.index].children = bumen;
                                }
                            }
                        }
                    });
                }
            },
            //数据还原
            $_hy_$(node, num = 0) {
                if (!node) {
                    return;
                }
                if (num !== 0) {
                    this.$_bumen_$.push(node);
                }
                num++;
                if (node.child && node.child.length > 0) {
                    let i = 0;
                    for (i = 0; i < node.child.length; i++) {
                        this.$_hy_$(node.child[i], num);
                    }
                }
            },
            //菜单递归
            $_digui_$(arr) {
                var children = [];

                for (var i = 0; i < arr.length; i++) {
                    var temp = {
                        title: arr[i].name,
                        enterpriseId: arr[i].enterpriseId,
                        id: 0,
                        parentId: arr[i].parentId,
                    };
                    if (arr[i].id) {
                        temp.id = arr[i].id;
                    }
                    if (arr[i].child != null) {
                        temp.children = this.$_digui_$(arr[i].child)
                    }
                    children.push(temp)

                }
                return children;
            },
            //菜单递归
            $_dg_$(data) {
                let val = [];
                // 删除 所有 children,以防止多次调用
                data.forEach(function (item) {
                    delete item.children;
                });

                // 将数据存储为 以 id 为 KEY 的 map 索引数据列
                let map = {};
                data.forEach(function (item) {
                    map[item.id] = item;
                });
                data.forEach(function (item) {
                    item.title = item.name;
                    item.children = [];
                    // 以当前遍历项，parentId,去map对象中找到索引的id
                    let parent = map[item.parentId];
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item);
                    } else {
                        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶
                        val.push(item);
                    }
                });
                return val;
            },
            //获取当前页面
            $_list_$() {
                //账户信息
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/operate/account/accountTypeEnum`,
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_acType_$ = rsp.data.data;
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/operate/account/accountInfo`,
                                data: {
                                    enterpriseId: userInfo.zoneId,
                                    accountType: 2
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(rsp => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$_message_$.name = rsp.data.data.accountName;
                                        for (let i = 0; i < this.$_acType_$.length; i++) {
                                            if (rsp.data.data.accountType == this.$_acType_$[i].k) {
                                                this.$_message_$.type = this.$_acType_$[i].v
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
                //代金卷列表
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/voucher/page`,
                    data: {
                        // pageNum:1,
                        // pageSize:10
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$_cityList_$ = [];
                            this.$_djqList_$ = [];
                            this.$_djqList_$.push(res.data.data.records);
                            for (let i = 0; i < res.data.data.records.length; i++) {
                                let data = {
                                    value: res.data.data.records[i].id,
                                    label: res.data.data.records[i].name
                                };
                                this.$_cityList_$.push(data);
                            }
                        }

                    }
                });
                //代金券使用门槛列表
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/operate/voucher/voucherThresholdEnum`,
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.thresholdList.push(res.data.data);
                        }

                    }
                });
                //园区企业列表
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${userInfo.zoneId}/enterprise/search`,
                    data: {
                        pageSize: 9999
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$_data_$ = [];
                            for (let i = 0; i < res.data.data.records.length; i++) {
                                let info = {
                                    title: res.data.data.records[i].name,
                                    id: res.data.data.records[i].id,
                                    index: i,
                                    parentId: "top",
                                    expand: false,
                                    children: [
                                        {
                                            disabled: true,
                                            title: "暂无数据"
                                        }
                                    ]
                                };
                                this.$_data_$.push(info);

                                this.$_sendQuery_$({
                                    method: "GET",
                                    url: `${this.$_global_$.serverPath}/company/company/${info.id}/department`,
                                    data: {},
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                }).then(resp => {
                                    if (resp.status === 200) {
                                        if (resp.data.code === 0) {
                                            let bm = [];
                                            if (resp.data.data) {
                                                let arr = resp.data.data;

                                                this.$_bumen_$ = [];
                                                for (let i = 0; i < arr.length; i++) {
                                                    if (arr[i].parentId == null) {
                                                        arr[i].parentId = 0;
                                                    }
                                                    if (!arr[i].enterpriseId) {
                                                        arr[i].enterpriseId = info.id;
                                                    }
                                                    this.$_bumen_$.push(arr[i]);
                                                    if (arr[i].child) {
                                                        this.$_hy_$(arr[i]);
                                                    }
                                                }

                                                let bumenarr = [];
                                                // 删除 所有 children,以防止多次调用
                                                for (let i = 0; i < this.$_bumen_$.length; i++) {
                                                    if (this.$_bumen_$[i].parentId == 0) {
                                                        bumenarr.push(this.$_bumen_$[i]);
                                                    }
                                                }
                                                bm = this.$_digui_$(bumenarr);
                                                this.$_data_$[i].children = bm;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            },
            $_lists_$() {
                //账户信息
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/operate/account/accountTypeEnum`,
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_acType_$ = rsp.data.data;
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/operate/account/accountInfo`,
                                data: {
                                    enterpriseId: userInfo.zoneId,
                                    accountType: 2
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(rsp => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$_message_$.name = rsp.data.data.accountName;
                                        for (let i = 0; i < this.$_acType_$.length; i++) {
                                            if (rsp.data.data.accountType == this.$_acType_$[i].k) {
                                                this.$_message_$.type = this.$_acType_$[i].v
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
                //代金卷列表
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/voucher/page`,
                    data: {
                        // pageNum:1,
                        // pageSize:10
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$_cityList_$ = [];
                            this.$_djqList_$ = [];
                            this.$_djqList_$.push(res.data.data.records);
                            for (let i = 0; i < res.data.data.records.length; i++) {
                                let data = {
                                    value: res.data.data.records[i].id,
                                    label: res.data.data.records[i].name
                                };
                                this.$_cityList_$.push(data);
                            }
                        }

                    }
                });
                //代金券使用门槛列表
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/operate/voucher/voucherThresholdEnum`,
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.thresholdList.push(res.data.data);
                        }

                    }
                });
                //园区企业列表
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${userInfo.zoneId}/enterprise/search`,
                    data: {
                        pageSize: 9999
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$_datas_$ = [];
                            for (let i = 0; i < res.data.data.records.length; i++) {
                                let info = {
                                    title: res.data.data.records[i].name,
                                    id: res.data.data.records[i].id,
                                    index: i
                                };
                                this.$_datas_$.push(info);
                            }
                        }
                    }
                });
            },
            //点击树形菜单
            $_choiceDjq_$(id) {
                let list = this.$_djqList_$[0];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id == id) {
                        this.$_djqForm_$.select = list[i].name;
                        this.$_djqForm_$.name = list[i].name;
                        this.$_djqForm_$.info = list[i].info;
                        this.$_djqForm_$.djqId = list[i].id;
                        this.$_djqForm_$.denominationSum = list[i].denomination;
                        for (let j = 0; j < this.thresholdList[0].length; j++) {
                            if (this.thresholdList[0][j].k == list[i].threshold) {
                                if (this.thresholdList[0][j].v == '满减') {
                                    this.$_djqForm_$.threshold = this.thresholdList[0][j].v + '（满' + list[i].quota + '可用）';
                                } else {
                                    this.$_djqForm_$.threshold = this.thresholdList[0][j].v
                                }
                            }
                        }
                        if (list[i].validFlag == 0) {
                            this.$_djqForm_$.validity = list[i].beginDate + ' - ' + list[i].endDate;
                        } else {
                            this.$_djqForm_$.validity = '领取后' + list[i].validCount + '天有效';
                        }
                    }
                }
                this.$_current_$ = 2;
            },
            //处理数组
            change(res) {

                this.$_djqForm_$.validity = res;
            },
            $_back_$(name) {
                if (this.checkAllGroup.length > 0) {
                    let ids = '';
                    let names = '';
                    for (let i = 0; i < this.$_ygInfo_$.length; i++) {
                        for (let j = 0; j < this.checkAllGroup.length; j++) {
                            if (this.$_ygInfo_$[i].id == this.checkAllGroup[j]) {
                                names += this.$_ygInfo_$[i].name + ","
                            }
                        }
                    }
                    for (let j = 0; j < this.checkAllGroup.length; j++) {
                        ids += this.checkAllGroup[j] + ","
                    }
                    this.$_djqForm_$.recvIds = ids.slice(0, -1);
                    this.$_djqForm_$.recvNames = names.slice(0, -1);
                }
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                if (this.xuanze == 1) {
                    this.grantType = 1
                }
                if (this.xuanze == 0) {
                    this.grantType = 0
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/account/accountInfo`,
                    data: {
                        enterpriseId: userInfo.zoneId,
                        accountType: 2
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(rsp => {
                    this.$_djqForm_$.accountId = rsp.data.data.id;
                    // this.$_djqForm_$.accountType = rsp.data.data.accountType;
                    //当前时间
                    let date3 = new Date();
                    let nowDay = date3.getFullYear() + "-" + ((date3.getMonth() + 1) < 10 ? "0" + (date3.getMonth() + 1) : (date3.getMonth() + 1)) + "-" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate()) + " " + (date3.getHours() < 10 ? "0" + date3.getHours() : date3.getHours()) + ":" + (date3.getMinutes() < 10 ? "0" + date3.getMinutes() : date3.getMinutes()) + ":" + (date3.getSeconds() < 10 ? "0" + date3.getSeconds() : date3.getSeconds());
                    this.$refs.$_djqForm_$.validate(valid => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/operate/creditsGrant/create`,
                                data: {
                                    account: this.$_djqForm_$.accountId,
                                    grantReason: this.$_djqForm_$.reasons,
                                    granterId: userInfo.id,
                                    granterName: userInfo.name,
                                    grantCount: this.$_djqForm_$.ffnum,
                                    grantType: this.grantType,
                                    recvIds: this.$_djqForm_$.recvIds,
                                    recvNames: this.$_djqForm_$.recvNames,
                                    recvCount: this.$_ygNum_$,
                                    grantTimeStr: nowDay,
                                    zoneId: userInfo.zoneId,
                                    zoneName: userInfo.zoneName
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(rsp => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("发放成功！！！");
                                        this.$root.$_Route_$("user", "zcManage", "jfmanage", {id: 1});
                                    } else {
                                        this.$Message.error(rsp.data.message);
                                    }
                                } else {
                                    this.$Message.error("请求失败，请重试！！！！");
                                }
                            });
                        } else {
                            this.$Message.error("发放失败，请重试！！！！");
                        }
                    });
                });
            },
            $_backs_$(name) {
                let ids = '';
                let names = '';
                for (let i = 0; i < this.$_yeInfo_$.length; i++) {
                    names += this.$_yeInfo_$[i].title + ","
                    ids += this.$_yeInfo_$[i].id + ","
                }
                this.$_djqForm_$.recvIds = ids.slice(0, -1);
                this.$_djqForm_$.recvNames = names.slice(0, -1);
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                if (this.xuanze == 1) {
                    this.grantType = 1
                }
                if (this.xuanze == 0) {
                    this.grantType = 0
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/account/accountInfo`,
                    data: {
                        enterpriseId: userInfo.zoneId,
                        accountType: 2
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(rsp => {
                    this.$_djqForm_$.accountId = rsp.data.data.id;
                    // this.$_djqForm_$.accountType = rsp.data.data.accountType;
                    //当前时间
                    let date3 = new Date();
                    let nowDay = date3.getFullYear() + "-" + ((date3.getMonth() + 1) < 10 ? "0" + (date3.getMonth() + 1) : (date3.getMonth() + 1)) + "-" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate()) + " " + (date3.getHours() < 10 ? "0" + date3.getHours() : date3.getHours()) + ":" + (date3.getMinutes() < 10 ? "0" + date3.getMinutes() : date3.getMinutes()) + ":" + (date3.getSeconds() < 10 ? "0" + date3.getSeconds() : date3.getSeconds());
                    this.$refs.$_djqForm_$.validate(valid => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/operate/creditsGrant/create`,
                                data: {
                                    account: this.$_djqForm_$.accountId,
                                    grantReason: this.$_djqForm_$.reasons,
                                    granterId: userInfo.id,
                                    granterName: userInfo.name,
                                    grantCount: this.$_djqForm_$.ffnum,
                                    grantType: this.grantType,
                                    recvIds: this.$_djqForm_$.recvIds,
                                    recvNames: this.$_djqForm_$.recvNames,
                                    recvCount: this.$_ygNum_$,
                                    grantTimeStr: nowDay,
                                    zoneId: userInfo.zoneId,
                                    zoneName: userInfo.zoneName
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(rsp => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("发放成功！！！");
                                        this.$root.$_Route_$("user", "zcManage", "jfmanage", {id: 1});
                                    } else {
                                        this.$Message.error(rsp.data.message);
                                    }
                                } else {
                                    this.$Message.error("请求失败，请重试！！！！");
                                }
                            });
                        } else {
                            this.$Message.error("发放失败，请重试！！！！");
                        }
                    });
                });
            },
            $_checks_$(e) {
                let resDatas = [];
                this.$_yeInfo_$ = [];
                this.$_yeNum_$ = e.length;
                for (let i = 0; i < e.length; i++) {
                    resDatas.push(
                        e[i]
                    )
                }
                this.$_yeInfo_$ = resDatas
                if (e.length > 0) {
                    this.$_current_$ = 1;
                } else {
                    this.$_current_$ = 0;
                }
            },

            $_check_$(e) {
                this.checkAllGroup = [];
                this.$_ygList_$ = [];
                this.$_ygInfo_$ = [];

                if (e.length > 0) {
                    this.spinShow = true;
                    this.$_current_$ = 1;
                    let resData = [];
                    for (let i = 0; i < e.length; i++) {
                        //选择的是部门
                        if (e[i].parentId != "top" && e[i].title != "暂无数据") {
                            resData.push(
                                e[i]
                            )
                        }
                    }
                    let status = 1;

                    if (resData.length > 0) {
                        for (let i = 0; i < resData.length; i++) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/company/company/${resData[i].enterpriseId}/department/${resData[i].id}/employee`,
                                data: {}
                            }).then(rsp => {
                                if (rsp.status === 200) {
                                    status *= 1;
                                    if (rsp.data.code === 0) {
                                        if (rsp.data.data.records.length > 0) {
                                            for (let j = 0; j < rsp.data.data.records.length; j++) {
                                                this.$_ygList_$.push(rsp.data.data.records[j]);
                                            }
                                            this.$_ygInfo_$ = this.$_ygList_$;
                                        }
                                    }
                                } else {
                                    status *= -1;
                                }
                                if (i == resData.length - 1) {
                                    if (status > 0) {
                                        this.spinShow = false;
                                    } else {
                                        this.$_ygList_$ = [];
                                        this.$_ygInfo_$ = [];
                                        this.spinShow = false;
                                        this.$Message.error("获取失败，请重试！！！！");
                                    }
                                }
                            })
                        }
                    } else {
                        this.$_ygList_$ = [];
                        this.$_ygInfo_$ = this.$_ygList_$;
                        this.spinShow = false;
                    }

                }
                else {
                    this.$_current_$ = 0;
                }
            },
            //json数据去重
            UniquePay(paylist) {
                let payArr = [paylist[0]];
                for (let i = 1; i < paylist.length; i++) {
                    let payItem = paylist[i];
                    let repeat = false;
                    for (let j = 0; j < payArr.length; j++) {
                        if (payItem.id == payArr[j].id) {
                            repeat = true;
                            break;
                        }
                    }
                    if (!repeat) {
                        payArr.push(payItem);
                    }
                }
                return payArr;
            },
            $_newData_$(e) {
                let arr = [];
                for (let i = 0; i < e.length; i++) {
                    for (let j = 0; j < this.$_ygList_$.length; j++) {
                        if (e[i] === this.$_ygList_$[j].id) {
                            arr.push(this.$_ygList_$[j]);
                        }
                    }
                }
                this.$_ygInfo_$ = arr;
            }
        },
        watch: {
            /*checkAllGroup(curVal, oldVal) {
                if (curVal.length > 0) {
                    this.$_current_$ = 1;
                    this.$_ygNum_$ = 0;
                    this.$_ygNum_$ = curVal.length;
                } else {
                    this.$_ygNum_$ = 0;
                    this.$_current_$ = 0;
                }
            },*/
            $_ygList_$(newData, oldData) {
                if (newData.length > 0) {
                    this.$_ygNum_$ = 0;
                    let res = this.UniquePay(newData);
                    this.checkAllGroup = [];
                    if (this.$_ygInfo_$.length > 0) {
                        this.$_ygNum_$ = res.length;
                        for (let k = 0; k < res.length; k++) {
                            this.checkAllGroup.push(res[k].id);
                        }
                    }
                }
            }

        },
    }
</script>