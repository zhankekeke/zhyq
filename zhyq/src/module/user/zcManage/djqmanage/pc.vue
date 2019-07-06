<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .dataarea {
        min-height: 54px;
    }

    .dataarea span {
        float: right;
    }

    .dataarea button {
        margin-left: 50px;
    }

    .ivu-btn-text {
        color: #2d8cf0 !important;
    }

    .input300 {
        width: 300px;
    }

    .width100 {
        width: 100px;
        display: inline-block;
        text-align: right;
    }

    .ivu-modal-close {
        font-size: 26px;
        position: absolute;
        right: 18px;
        top: 0px;
        overflow: hidden;
        cursor: pointer;
    }

    .model table td input,
    textarea {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 8px;
        padding-right: 24px;
        border-radius: 4px;
        border: 1px solid #dddee1;
    }

    .input60 {
        width: 60px;
        height: 25px !important;
        margin: 0 10px;
    }

    /* .model table td textarea {
      height: 100px;
    }
    .model table tr td:nth-child(1) {
      width: 100px;
      text-align: right;
      box-sizing: border-box;
      padding-right: 10px;
    }
    .model table tr td {
      padding: 10px 0;
      vertical-align: top;
    }
    .model table tr td p {
      padding: 5px 0;
    } */
    .top {
        padding: 20px 0 0 0;
        margin-bottom: 20px;
        color: #000;
    }

    .mt10 {
        margin-top: 10px;
    }

    .demo-table-row {
        height: 60px;
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
    <div class="container">
        <!-- 搜索 -->
        <div class="search">
            <span>使用规则：</span>
            <Select v-model="formInline.guize" style="width:180px">
                <Option
                        v-for="(item,index) in formInline.priceList"
                        :value="item.label"
                        :key="index"
                >{{ item.value }}
                </Option>
            </Select>
            <span class="ml28">代金券类型：</span>
            <Select v-model="formInline.leixing" style="width:180px">
                <Option
                        v-for="item in formInline.type"
                        :value="item.label"
                        :key="item.label"
                >{{ item.value }}
                </Option>
            </Select>
            <span class="ml28">名称：</span>
            <Input style="width: 180px;" type="text" v-model="formInline.djqname" placeholder="请输入代金券名称"></Input>

            <Button class="ml28" type="primary" @click="$_search_$">搜索</Button>

        </div>


        <!--<div class="top">-->
        <!--<Form ref="formInline" :model="formInline" inline :label-width="100">-->
        <!--<FormItem label="使用规则：">-->
        <!--<Select v-model="formInline.guize" style="width:180px">-->
        <!--<Option-->
        <!--v-for="(item,index) in formInline.priceList"-->
        <!--:value="item.label"-->
        <!--:key="index"-->
        <!--&gt;{{ item.value }}-->
        <!--</Option>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="代金券类型：">-->
        <!--<Select v-model="formInline.leixing" style="width:180px">-->
        <!--<Option-->
        <!--v-for="item in formInline.type"-->
        <!--:value="item.label"-->
        <!--:key="item.label"-->
        <!--&gt;{{ item.value }}-->
        <!--</Option>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="名称：">-->
        <!--<Input style="width: 180px;" type="text" v-model="formInline.djqname"-->
        <!--placeholder="请输入代金券名称"></Input>-->
        <!--</FormItem>-->
        <!--<Button style="margin-left: 2%" type="primary" @click="$_search_$">搜索</Button>-->
        <!--</Form>-->
        <!--</div>-->
        <!-- 列表 -->
        <div class="dataarea">
            <span>
                <Button type="primary" @click="$_adddjq_$">新建代金券</Button>
                <Button type="primary" @click="$_fafang_$">发放代金券</Button>
            </span>
        </div>
        <!-- list -->
        <div class="list">
            <Table :columns="$_columns1_$" :row-class-name="rowClassName" :data="$_data1_$" width="auto"></Table>
            <Row class="mt40">
                <span style="float: left;">共{{$_totalSize_$}}条数据</span>
                <Page
                        align="right"
                        style="float: right"
                        :total="$_totalSize_$"
                        :page-size="$_pageSize_$"
                        show-elevator
                        @on-page-size-change="$_pageNum_$"
                        @on-change="$_changePage_$"
                />
            </Row>
        </div>
        <!-- 弹框 -->
        <Modal v-model="$_addquan1_$" title="新建代金券" :mask-closable="false" :styles="{top: '20px'}" resetFields>
            <Form ref="$_addformValidate_$" :model="$_formValidateone_$" :rules="$_addruleValidate_$"
                  :label-width="100">
                <FormItem label="代金券名称" prop="name">
                    <Input v-model="$_formValidateone_$.name" placeholder="请输入代金券名称" class="input300"></Input>
                </FormItem>
                <FormItem label="代金券描述" prop="info">
                    <Input v-model="$_formValidateone_$.info" placeholder="请代金券输入描述" class="input300"></Input>
                </FormItem>
                <FormItem label="代金券面值" prop="denomination">
                    <Input v-model="$_formValidateone_$.denomination" placeholder="请输入代金券面值" class="input300"
                           prop="denomination" number></Input>
                </FormItem>
                <FormItem label="使用门槛" prop="threshold">
                    <RadioGroup v-model="$_formValidateone_$.threshold">
                        <Radio label="0">无限制</Radio>
                        <Radio label="1">
                            消费满
                            <input v-model="$_formValidateone_$.quota" type="number" class="input60">可用
                            <span v-show="$_mjje_$" style="color:red">请输入满减金额</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="有效期类型" prop="validFlag">
                    <RadioGroup v-model="$_formValidateone_$.validFlag">
                        <p>
                            <Radio label="0">
                                固定有效期
                            </Radio>
                        </p>
                        <p>
                            <Radio label="1">
                                固定天数
                            </Radio>
                        </p>
                    </RadioGroup>
                </FormItem>
                <FormItem label="选择有效期" v-show="$_formValidateone_$.validFlag == '0'">
                    <DatePicker type="daterange"
                                split-panels
                                placeholder="请选择日期"
                                style="width: 200px"
                                @on-change="$_change_$"
                                value-format = "yyyy-MM-dd">
                    </DatePicker>
                </FormItem>
                <FormItem label="填写有效天数" v-show="$_formValidateone_$.validFlag == '1'">
                    <input type="number" v-model="$_formValidateone_$.validCount" class="input60">天内有效
                </FormItem>
                <FormItem label="代金券类型" prop="useType">
                    <Select v-model="$_formValidateone_$.useType" placeholder="请选择代金券类型" prop="useType"
                            style="width:300px;"
                            ref="$_adddjjlx_$">
                        <Option v-for="item in $_useType_$" :value="item.label" :key="item.value">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align:center;">
                <Button type="primary" @click="$_reset_$()">取消</Button>
                <Button type="primary" @click="$_newTable_$()">保存</Button>
            </div>
        </Modal>
        <!-- 编辑弹框 -->
        <Modal v-model="$_addquan2_$" title="编辑代金券" :styles="{top: '20px'}" :mask-closable="false">
            <Form ref="$_changeformValidate_$" :model="$_formValidatetwo_$" :rules="$_changeruleValidate_$"
                  :label-width="100">
                <FormItem label="代金券名称" prop="name">
                    <Input v-model="$_formValidatetwo_$.name" placeholder="" class="input300"></Input>
                </FormItem>
                <FormItem label="代金券描述" prop="info">
                    <Input v-model="$_formValidatetwo_$.info" placeholder="" class="input300"></Input>
                </FormItem>
                <FormItem label="代金券面值" prop="denomination">
                    <Input v-model="$_formValidatetwo_$.denomination" placeholder="" class="input300"
                           prop="denomination"></Input>
                </FormItem>
                <FormItem label="使用门槛" prop="threshold">
                    <RadioGroup v-model="$_formValidatetwo_$.threshold">
                        <Radio label="0">无限制</Radio>
                        <Radio label="1">
                            消费满
                            <input v-model="$_formValidatetwo_$.quota" type="text" class="input60">可用
                            <span v-show="$_mjje_$" style="color:red">请输入满减金额</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="有效期类型" prop="validFlag">
                    <RadioGroup v-model="$_formValidatetwo_$.validFlag">
                        <p>
                            <Radio label="0">
                                固定有效期
                            </Radio>
                        </p>
                        <p>
                            <Radio label="1">
                                固定天数
                            </Radio>
                        </p>
                    </RadioGroup>
                </FormItem>
                <FormItem label="选择有效期" v-show="$_formValidatetwo_$.validFlag == '0'">
                    <DatePicker type="daterange"
                                split-panels
                                placeholder="请选择日期"
                                style="width: 200px"
                                @on-change="$_change_$"
                                value-format = "yyyy-MM-dd">
                    </DatePicker>
                </FormItem>
                <FormItem label="填写有效天数" v-show="$_formValidatetwo_$.validFlag == '1'">
                    <input type="text" v-model="$_formValidatetwo_$.validCount" class="input60">天内有效
                </FormItem>
                <FormItem label="代金券类型" prop="useType">
                    <Select v-model="$_formValidatetwo_$.useType" prop="useType" style="width:300px;"
                            ref="$_adddjjlx_$">
                        <Option v-for="item in $_useType_$" :value="item.label" :key="item.value">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align:center;">
                <Button type="primary" @click="$_reset_$()">取消</Button>
                <Button type="primary" @click="$_editor_$()">保存</Button>
            </div>
        </Modal>


    </div>
</template>
<script>
    import controler from "./controler.js";
    import axios from "axios";

    export default {
        mixins: [controler],
        data() {
            const validatemk = (rule, value, callback) => {
                if (this.$_formValidateone_$.threshold == '1' || this.$_formValidatetwo_$.threshold == '1') {
                    if (this.$_formValidateone_$.quota != '' || this.$_formValidatetwo_$.quota != '') {
                        callback();
                    } else {
                        callback('如选择满减，请填写金额');
                    }
                } else {
                    callback();
                }
            };
            const validateyxq = (rule, value, callback) => {
                if (this.$_formValidateone_$.validFlag == '0' || this.$_formValidatetwo_$.validFlag == '0') {
                    if (this.$_formValidateone_$.date || this.$_formValidatetwo_$.date) {
                        callback();
                    } else {
                        callback('请选择有效日期');
                    }
                } else {
                    if (this.$_formValidateone_$.validCount != '' || this.$_formValidatetwo_$.validCount != '') {
                        callback();
                    } else {
                        callback('请填写有效天数');
                    }
                }
            };
            const validatelx = (rule, value, callback) => {
                if (this.$_formValidateone_$.useType !== '' || this.$_formValidatetwo_$.useType !== '') {
                    callback();
                } else {
                    callback('请选择代金券类型');
                }

            };
            return {

                //满减提示
                $_mjje_$: false,
                //代金券类型
                $_useType_$: [],
                //新建代金卷
                $_formValidateone_$: {
                    name: '',
                    info: '',
                    denomination: '',
                    quota: '',
                    threshold: '',
                    validCount: '',
                    validFlag: '',
                    useType: 0,
                    beginDateStr: '',
                    endDateStr: ''
                },
                //编辑表达
                $_formValidatetwo_$: {},
                //新建表单验证
                $_addruleValidate_$: {
                    name: [
                        {required: true, type: 'string', message: '请填写代金券名称', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '不能超过50字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    info: [
                        {required: false, message: '请输入', trigger: 'change'}
                    ],
                    denomination: [
                        {required: true, type: "number", message: '请输入代金券面值，如：1000', trigger: 'change'}
                    ],
                    threshold: [
                        {required: true, message: '请选择使用门槛', trigger: 'change'},
                        {validator: validatemk, trigger: 'change'}
                    ],
                    validFlag: [
                        {required: true, message: '请选择有效期', trigger: 'change'},
                        {validator: validateyxq, trigger: 'change'}
                    ],
                    useType: [
                        {required: true, validator: validatelx, trigger: 'change'}
                    ],
                    date: (rules, value, callback, source, options) => {
                        if (!value || value.length != 2) return callback('时间格式错误');
                        if (value[0] < new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
                            return callback('日期开始时间不能在当前时间之前');
                        for (let i = 0; i < 2; i++) if (!(value[i] instanceof Date)) return callback('时间格式错误')
                        callback()
                    },
                },
                //编辑表单验证
                $_changeruleValidate_$: {
                    name: [
                        {required: true, type: 'string', message: '请填写代金券名称', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '不能超过50字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    info: [
                        {type: 'string', max: 100, message: '不能超过100字', trigger: 'change'},
                    ],
                    denomination: [
                        {required: true, type: "number", message: '请输入代金券面值，如：1000', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    threshold: [
                        {required: true, message: '请选择使用门槛', trigger: 'change'},
                        {validator: validatemk, trigger: 'change'}
                    ],
                    validFlag: [
                        {required: true, message: '请选择有效期', trigger: 'change'},
                        {validator: validateyxq, trigger: 'change'}
                    ],
                    useType: [
                        {required: true, validator: validatelx, trigger: 'change'}
                    ],
                    date: (rules, value, callback, source, options) => {
                        if (!value || value.length != 2) return callback('时间格式错误');
                        if (value[0] < new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
                            return callback('日期开始时间不能在当前时间之前');
                        for (let i = 0; i < 2; i++) if (!(value[i] instanceof Date)) return callback('时间格式错误')
                        callback()
                    },
                },
                //新建弹框
                $_addquan1_$: false,
                //编辑弹框
                $_addquan2_$: false,
                //新建弹框的数据
                $_buildnew_$: {},

                $_columns1_$: [
                    {
                        title: "序号",
                        type: "index",
                        key: "number",
                        align: "center",
                        className: "demo-table-info-column",
                        width: 80
                    },
                    {
                        title: "面值",
                        key: "denomination",
                        align: "center",
                        width: 80
                    },
                    {
                        title: "名称",
                        key: "name",
                        align: "center",
                        width: 100
                    },
                    {
                        title: "描述",
                        key: "info",
                        align: "center",
                        width: 130
                    },
                    {
                        title: "使用规则",
                        key: "threshold",
                        align: "center",
                        width: 90,
                        render: (h, params) => {
                            var text = "全部";
                            if (params.row.threshold == 0) {
                                text = "无限制";
                            } else if (params.row.threshold == 1) {
                                text = "满减";
                            }
                            return h("div", {}, text);
                        }
                    },
                    {
                        title: "分类",
                        key: "useType",
                        align: "center",
                        width: 90,
                        render: (h, params) => {
                            var text = "全部";
                            if (params.row.useType == 0) {
                                text = "餐厅";
                            } else if (params.row.useType == 1) {
                                text = "会议室";
                            } else if (params.row.useType == 2) {
                                text = "停车场";
                            } else if (params.row.useType == 3) {
                                text = "商城";
                            }
                            return h("div", {}, text);
                        }
                    },
                    {
                        title: "有效期",
                        key: "validity",
                        align: "center",
                        width: 180,
                        render: (h, params) => {
                            var text = '';
                            if (params.row.validFlag == 0) {
                                text = `${params.row.beginDateStr}--${params.row.endDateStr}`;
                            } else if (params.row.validFlag == 1) {
                                text = `领取后${params.row.validCount}天内有效`;
                            }
                            return h(
                                "span",
                                {},
                                text
                            );
                        }
                    },
                    {
                        title: "已领取",
                        key: "recvSum",
                        align: "center"
                    },
                    {
                        title: "已过期",
                        key: "passSum",
                        align: "center"
                    },
                    {
                        title: "已使用",
                        key: "useSum",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "caozuo",
                        align: "center",
                        width: 120,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.myParams = ""
                                                this.myParams = params.row
                                                this.copy(params.index.id);

                                            }
                                        }
                                    },
                                    "复制"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.myParams = params.row;
                                                let a = JSON.parse(JSON.stringify(params.row));
                                                this.bianji(a);

                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            color: "#f56c6c"

                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row.id);
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
                //当前列表数据
                $_data1_$: [],
                zoneId: '',
                //搜索数据
                formInline: {
                    guize: "",
                    leixing: "",
                    djqname: "",
                    priceList: [],
                    type: []
                },
                $_totalSize_$: 100, //数据总数
                $_stratRow_$: 0, //起始条数
                $_total_$: 0, //总条数
                $_pageSize_$: 10, //每页显示
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                myParams: "",
            };
        },
        created() {
            this.$_querycfg_$.params.pageNum = 1;
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.zoneId = this.userInfo.zoneId;
            this.$_list_$();
            this.$_gzlist_$();
            this.$_djqlxlist_$();
        },
        methods: {
            rowClassName(row, index) {
                return "demo-table-row";
            },
            //获取时间
            $_change_$(res) {
                this.$_formValidateone_$.date = res;

            },
            //提交表单
            $_newTable_$() {
                //console.log(this.$_formValidateone_$);
                this.$refs.$_addformValidate_$.validate((valid) => {
                    console.log(this.$_formValidateone_$)
                    if (valid) {
                        this.$_formValidateone_$.threshold = Number(this.$_formValidateone_$.threshold)
                        this.$_formValidateone_$.validFlag = Number(this.$_formValidateone_$.validFlag)
                        let data = {
                            zoneId: this.zoneId,
                            name: this.$_formValidateone_$.name,
                            info: this.$_formValidateone_$.info,
                            denomination: this.$_formValidateone_$.denomination,
                            quota: this.$_formValidateone_$.quota,
                            threshold: this.$_formValidateone_$.threshold,
                            validFlag: this.$_formValidateone_$.validFlag,
                            useType: this.$_formValidateone_$.useType,
                        };
                        if (this.$_formValidateone_$.validFlag == 0) {
                            data.beginDateStr = this.$_formValidateone_$.date[0]
                            data.endDateStr = this.$_formValidateone_$.date[1]
                        } else if (this.$_formValidateone_$.validFlag == 1) {
                            data.validCount = this.$_formValidateone_$.validCount
                        }
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/operate/voucher/create`,
                            data: data,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(rsp => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_addquan1_$ = false;
                                    this.$_list_$();
                                    for (let key in this.$_formValidateone_$) {
                                        this.$_formValidateone_$[key] = ''
                                        this.$refs.$_addformValidate_$.resetFields();
                                    }
                                }
                            }
                        });
                    } else {
                        this.$Message.error('请完成必填项');
                    }
                })
            },
            //取消
            $_reset_$() {
                // this.$refs.$_formValidateone_$.resetFields();
                // this.$refs.$_formValidatetwo_$.resetFields();
                // this.$_formValidateone_$.quota = ' ';
                // this.$_formValidatetwo_$.quota = ' ';
                this.$_addquan1_$ = false
                this.$_addquan2_$ = false
            },
            //新建代金券
            $_adddjq_$() {
                this.$_formValidateone_$ = {};
                this.$_formValidateone_$.useType = 0;
                this.$_addquan1_$ = true;
            },
            //渲染当前列表
            $_list_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_querycfg_$.params.zoneId = userInfo.zoneId;
                this.$_querycfg_$.mod = `operate/voucher/page`;
                this.$_fquery_$(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data1_$ = [];
                            this.$_data1_$ = rsp.data.data.records;
                            //console.log(this.$_data1_$);
                            this.$_totalSize_$ = Number(rsp.data.data.total);
                        }
                    }
                });
            },
            //使用规则列表
            $_gzlist_$() {
                this.$_querycfg_$.mod = `operate/voucher/voucherThresholdEnum`;
                this.$_fquery_$(rsp => {
                    //console.log(rsp);
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.formInline.priceList.push({
                                value: "全部",
                                label: "全部"
                            })
                            for (let i = 0; i < rsp.data.data.length; i++) {
                                this.formInline.priceList.push({
                                    value: rsp.data.data[i].v,
                                    label: rsp.data.data[i].k
                                });
                            }
                        }
                    }
                });
            },
            //代金券列表
            $_djqlxlist_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/operate/voucher/voucherUseTypeEnum`,
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.formInline.type.push({
                                value: "全部",
                                label: "全部"
                            });
                            for (let i = 0; i < rsp.data.data.length; i++) {
                                this.formInline.type.push({
                                    value: rsp.data.data[i].v,
                                    label: rsp.data.data[i].k
                                });
                                this.$_useType_$.push({
                                    value: rsp.data.data[i].v,
                                    label: rsp.data.data[i].k
                                })
                            }
                        }
                    }
                });
            },

            //搜索
            $_search_$() {
                if (this.$_querycfg_$.params.useType || this.$_querycfg_$.params.threshold || this.$_querycfg_$.params.name) {
                    //搜索清零
                    delete this.$_querycfg_$.params.useType;
                    delete this.$_querycfg_$.params.threshold;
                    delete this.$_querycfg_$.params.name;
                }
                if (this.formInline.djqname !== "") {
                    this.$_querycfg_$.params.name = this.formInline.djqname
                }

                if (this.formInline.guize !== "" && this.formInline.guize != "全部") {
                    this.$_querycfg_$.params.threshold = this.formInline.guize;
                }

                if (this.formInline.leixing !== "" && this.formInline.leixing != "全部") {
                    this.$_querycfg_$.params.useType = this.formInline.leixing;
                }

                this.$_list_$();
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
            },

            //复制
            copy(index) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确定要复制该代金券吗?</p>",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        this.$_querycfg_$.mod = `operate/voucher/copy?id=${this.myParams.id}`;
                        this.$_fquery_$(rsp => {
                            if (rsp.status === 200) {
                                //console.log(rsp, 23334)
                                if (rsp.data.code === 0) {
                                    this.$_list_$();
                                }
                            }
                        });

                    },
                    onCancel: () => {
                    }
                });
            },

            // 删除
            remove(index) {
                //console.log(222, index)
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确定要删除该代金券吗?</p>",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        this.$_querycfg_$.mod = `operate/voucher/delete?id=${index}`;
                        this.$_fquery_$(rsp => {
                            if (rsp.status === 200) {
                                //console.log(rsp, 23334)
                                if (rsp.data.code === 0) {
                                    this.$_list_$();
                                }
                            }
                        });
                        this.$_data1_$.splice(index, 1);
                    },
                    onCancel: () => {
                    }
                });
            },

            // 编辑渲染
            bianji(res) {
                this.$_addquan2_$ = true;
                // console.log("当前行",this.myParams)
                this.$_formValidatetwo_$ = res;
                this.$_formValidatetwo_$.threshold = String(res.threshold);
                this.$_formValidatetwo_$.validFlag = String(res.validFlag);
            },
            //编辑表单（提交）
            $_editor_$() {
                this.$refs.$_changeformValidate_$.validate((valid) => {
                    if (valid) {
                        this.$_formValidatetwo_$.threshold = Number(this.$_formValidatetwo_$.threshold)
                        this.$_formValidatetwo_$.validFlag = Number(this.$_formValidatetwo_$.validFlag)
                        let data = {
                            id: this.$_formValidatetwo_$.id,
                            name: this.$_formValidatetwo_$.name,
                            info: this.$_formValidatetwo_$.info,
                            denomination: this.$_formValidatetwo_$.denomination,
                            quota: this.$_formValidatetwo_$.quota,
                            threshold: this.$_formValidatetwo_$.threshold,
                            validFlag: this.$_formValidatetwo_$.validFlag,
                            useType: this.$_formValidatetwo_$.useType,
                        };
                        if (this.$_formValidatetwo_$.validFlag == 0) {
                            data.beginDateStr = this.$_formValidateone_$.date[0]
                            data.endDateStr = this.$_formValidateone_$.date[1]
                        } else if (this.$_formValidatetwo_$.validFlag == 1) {
                            data.validCount = this.$_formValidatetwo_$.validCount

                        }
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/operate/voucher/update`,
                            data: data,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(rsp => {
                            //console.log("提交的数据", rsp)
                            this.$_addquan2_$ = false;
                            this.$_list_$();
                        });
                    } else {
                        // this.$_reset_$();
                        this.$Message.error('请完成必填项');
                    }
                })
            },
            // 新建代金券

            // 发放代金券
            $_fafang_$() {
                this.$root.$_Route_$("user", "jump", "djqffjl", {id: 1});
            }
        }
    };
</script>