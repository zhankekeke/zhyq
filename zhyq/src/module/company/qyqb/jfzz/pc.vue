<style scoped>
    .container {
        color: #666;
        line-height: 50px;
    }

    .bg {
        background: #f7f7f7;
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
    >>>textarea.ivu-input{
        max-height: 130px;
        min-height: 130px;
    }

    >>>.el-input__inner{
        height:32px;
        line-height: 1.5;
    }
    >>>.el-tree-node{
        margin: 8px 0;
    }
    >>>.el-tree-node__label{
        font-size: 14px;
    }
</style>
<template>
    <div class="container">
        <Row>
            <Col span="4" style="border-right: 1px solid #f5f5f5;padding-right: 10px">
                <div>
                    <el-input
                            placeholder="请输入姓名"
                            v-model="$_title_$">
                    </el-input>
                </div>
                <div>
                    <span style="font-size: 14px;font-weight: bold;">部门列表：</span>
                    <el-tree
                            ref="tree"
                            class="filter-tree"
                            :data="$_data_$"
                            :props="defaultProps"
                            :filter-node-method="$_search_$"
                            :show-checkbox="true"
                            :expand-on-click-node="false"
                            @check="$_check_$"
                            style="height: 520px;overflow: auto"
                    >
                    </el-tree>
                </div>
            </Col>
            <Col span="20" style="padding-left: 40px">
                <Row>
                    <Col span="12"  style="font-size: 14px;font-weight: bold;">积分转增</Col>
                </Row>
                <div style="font-size: 14px;">
                    <span>积分账户余额：</span>
                    <span>{{$_message_$.credits}}积分</span>
                </div>
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

                <Form ref="$_djqForm_$" :model="$_djqForm_$" :rules="$_ruleDjqForm_$" :label-width="100">
                    <Row>
                        <Col span="10" class="box" style="margin-right: 60px">
                            <div class="box1 line35" ref="step2">
                                <FormItem label="每人赠送：" prop="ffnum">
                                    <Input v-model="$_djqForm_$.ffnum" number></Input>
                                </FormItem>
                                <FormItem label="积分总额：" prop="select">
                                    <span>{{$_djqForm_$.ffnum * $_ygNum_$}}</span>
                                </FormItem>
                                <FormItem label="转赠事由：" prop="reasons">
                                    <Input type="textarea" placeholder="请填写发放理由" v-model="$_djqForm_$.reasons"></Input>
                                </FormItem>
                            </div>
                        </Col>
                        <Col span="10" class="box">
                            <div class="box1 three line35" ref="step3">
                                <FormItem label="发放给：">
                                    <ul style="overflow-y:auto;height:100px;">
                                        <li v-for="item in $_ygInfo_$">
                                            {{item.title}}
                                        </li>
                                    </ul>
                                </FormItem>
                                <FormItem label="总计赠送：" prop="select">
                                    <Input disabled v-model="$_djqForm_$.ffnum * $_ygNum_$"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="ghost" @click="$_cancel_$">取消</Button>
                                    <Button @click="$_back_$()" type="primary">确认</Button>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>

    </div>
</template>

<script>
    import controler from "./controler.js";
    import {Input, Tree} from 'element-ui';
    import axios from "axios";


    export default {
        mixins: [controler],
        components: {
            [Input.name]: Input,
            [Tree.name]: Tree
        },
        data() {
            const validatetime = (rule, value, callback) => {
                let a = '';
                let b = '';
                a = this.$_djqForm_$.ffnum;
                b = a * this.$_ygNum_$;
                if(b>this.$_message_$.credits){
                    callback("积分总分不能超过企业总积分");
                }else{
                    callback();
                }
            };
            return {
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                userInfo: '',
                $_current_$: 0,
                $_message_$: {
                    name: "",
                    type: "",
                    credits:""
                },
                //员工数量
                $_ygNum_$: 0,
                //表单数据
                $_djqForm_$: {
                    ffnum: 1,
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
                        //特殊字符验证
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
                        { required: true, type: 'number', message: '请填写数字，如：10000，且最少为1积分',min: 1},
                        { validator: validatetime,trigger: 'change' },
                        { validator: this.$_validatepostiveint_$,trigger: 'change' }
                    ],
                },
                //当前列表数据
                $_data_$: [],
                //部门数据
                $_bumen_$: [],
                checkAllGroup: [],
                $_ygInfo_$: [],
                $_ygList_$: [],
                $_acType_$: '',

                $_title_$: '',  //搜索的名称
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);

            this.$_list_$();
            this.$_choicestaff_$();
        },
        methods: {
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
                        id: arr[i].id,
                        parentId: arr[i].parentId,
                        children: [],
                    };
                    if (arr[i].child != null) {
                        temp.children = this.$_digui_$(arr[i].child);
                    }

                    if(arr[i].employeeList){
                        //员工列表
                        let employeeList = arr[i].employeeList;

                        if(employeeList.length>0){
                            let ls = {};
                            for (let k = 0; k < employeeList.length; k++) {
                                ls = {
                                    title: employeeList[k].name,
                                    enterpriseId: arr[i].enterpriseId,
                                    id: employeeList[k].employeeId,
                                    parentId: arr[i].id,
                                    type: "staff"
                                };
                                if(ls.id != this.userInfo.id){
                                    temp.children.push(ls);
                                }
                            }
                        }

                    }

                    children.push(temp);
                }

                return children;
            },
            //获取当前页面
            $_list_$() {
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
                                    enterpriseId: this.userInfo.enterpriseId,
                                    accountType: 0
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(rsp => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$_message_$.id = rsp.data.data.id;
                                        this.$_message_$.name = rsp.data.data.accountName;
                                        this.$_message_$.credits = rsp.data.data.credits;
                                        this.$_message_$.balance = rsp.data.data.balance;
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
            },
            //部门人员列表
            $_choicestaff_$(){
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/company/${this.userInfo.enterpriseId}/department`,
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            if (res.data.data) {
                                let arr = res.data.data;
                                this.$_bumen_$ = [];
                                for (let i = 0; i < arr.length; i++) {
                                    this.$_bumen_$.push(arr[i]);
                                    if (arr[i].child) {
                                        this.$_hy_$(arr[i]);
                                    }
                                }
                                this.$_data_$ = this.$_digui_$(arr);
                            }
                        }
                    }
                });
            },
            $_search_$(value, data) {
                if (!value) return true;
                return data.title.indexOf(value) !== -1;
            },

            $_back_$() {
                if (this.checkAllGroup.length > 0) {
                    let ids = '';
                    let names = '';
                    for (let i = 0; i < this.$_ygInfo_$.length; i++) {
                        for (let j = 0; j < this.checkAllGroup.length; j++) {
                            if (this.$_ygInfo_$[i].id == this.checkAllGroup[j]) {
                                names += this.$_ygInfo_$[i].title + ","
                            }
                        }
                    }
                    for (let j = 0; j < this.checkAllGroup.length; j++) {
                        ids += this.checkAllGroup[j] + ","
                    }
                    this.$_djqForm_$.recvIds = ids.slice(0, -1);
                    this.$_djqForm_$.recvNames = names.slice(0, -1);
                    this.$_djqForm_$.accountId = this.$_message_$.id;

                    //当前时间
                    let date3 = new Date();
                    let nowDay = date3.getFullYear() + "-" + ((date3.getMonth() + 1) < 10 ? "0" + (date3.getMonth() + 1) : (date3.getMonth() + 1)) + "-" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate()) + " " + (date3.getHours() < 10 ? "0" + date3.getHours() : date3.getHours()) + ":" + (date3.getMinutes() < 10 ? "0" + date3.getMinutes() : date3.getMinutes()) + ":" + (date3.getSeconds() < 10 ? "0" + date3.getSeconds() : date3.getSeconds());
                    this.$refs.$_djqForm_$.validate(valid => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/operate/creditsGive/create`,
                                data: {
                                    account: this.$_djqForm_$.accountId,
                                    giveReason: this.$_djqForm_$.reasons,
                                    giverId: this.userInfo.id,
                                    giverName: this.userInfo.name,
                                    giveCount: this.$_djqForm_$.ffnum,
                                    //grantType: this.$_djqForm_$.accountType,
                                    recvIds: this.$_djqForm_$.recvIds,
                                    recvNames: this.$_djqForm_$.recvNames,
                                    recvCount: this.$_ygNum_$,
                                    giveTimeStr: nowDay,
                                    //zoneId:this.userInfo.zoneId,
                                    //zoneName:this.userInfo.zoneName
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(rsp => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("积分转增成功！");
                                        this.$root.$_Route_$("company", "qyqb", "myzh");
                                    } else {
                                        this.$Message.error("转增失败，请重试！");
                                    }
                                } else {
                                    this.$Message.error("网络堵塞，请稍后再试！");
                                }
                            });
                        } else {
                            this.$Message.error("请按照要求进行修改");
                        }
                    });



                }else{
                    this.$Message.error("请选择要赠送积分的员工");
                }
            },
            // 取消发放
            $_cancel_$(){
                this.$root.$_Route_$("company", "qyqb", "myzh");
            },

            $_check_$(a,checked) {
                let e = checked.checkedNodes;
                this.checkAllGroup = [];
                this.$_ygList_$ = [];
                this.$_ygInfo_$ = [];
                if (e.length > 0) {
                    this.$_current_$ = 1;

                    for (let j = 0; j < e.length; j++) {
                        if(e[j].type && e[j].type=='staff'){
                            this.$_ygList_$.push(e[j]);
                        }
                    }
                    this.$_ygInfo_$ = this.$_ygList_$;
                } else {
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
        },
        watch: {

            $_title_$(val) {
                this.$refs.tree.filter(val);
            },

            $_ygList_$(newData, oldData) {
                if (newData.length > 0) {
                    this.$_ygNum_$ = 0;
                    let res = this.UniquePay(newData);
                    this.checkAllGroup = [];
                    if(this.$_ygInfo_$.length>0){
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