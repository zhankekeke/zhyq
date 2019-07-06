<style scoped>
    .container {
        font-size: 14px;
        font-weight: 500;
    }

    .title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
    }

    .box {
        border-right: 1px solid #e4e4e4;
        box-sizing: border-box;
        width: 250px;
        padding: 20px;
        height:80vh;
    }
</style>
<template>
    <div class='container'>
        <Row class=' '>
            <Col span='6'>
                <div style="font-size: 14px; color: #000;font-weight: bold">企业/部门</div>
                <div class="box">
                    <!-- <Input v-model="$_search_$" placeholder="请输入部门搜索" style="width: 100%"></Input> -->
                    <Tree :data="$_Treedata_$" @on-select-change="$_xuanze_$"></Tree>
                </div>
            </Col>
            <Col span='12'>
                <Row class='title'>
                    <Col span='18'>考勤规则配置<span style="font-size:16px">（选择企业则添加企业级规则）</span></Col>
                </Row>
                <Form ref="$_formValidate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                    <FormItem prop="sbtime" label="上班时间：">
                        <TimePicker v-model="$_formValidate_$.amTime" format="HH:mm" placeholder="08:00"
                                    style="width: 100px"></TimePicker>
                        <TimePicker v-model="$_formValidate_$.amElastic" format="HH:mm" placeholder="08:30"
                                    style="width: 100px"></TimePicker>
                        <!-- <Input v-model="$_formValidate_$.amTime" placeholder="08:00" style="width: 100px"></Input> -->
                        <!-- <Input v-model="$_formValidate_$.amElastic" placeholder="08:30" style="width: 100px"></Input> -->
                        <p style='color:#868686;'>说明：固定上班时间只填第一空，弹性上班时间填第一空和第二空。</p>
                    </FormItem>
                    <FormItem prop="time" label="工作时长：">
                        <Input v-model.number="$_formValidate_$.workingHours" placeholder="9"
                               oninput="value=value.replace(/[^\d]/g,'')" style="width: 184px"></Input>&nbsp;&nbsp;&nbsp;小时
                    </FormItem>
                    <FormItem prop="xbtime" label="下班时间：">
                        <Input v-model="$_formValidate_$.pmTime" disabled placeholder="17:00"
                               style="width: 100px"></Input>
                        <Input v-model="$_formValidate_$.pmElastic" disabled placeholder="17:30"
                               style="width: 100px"></Input>
                        <!-- <TimePicker v-model="$_formValidate_$.pmTime"  format="HH:mm" placeholder="17:00" style="width: 100px"></TimePicker>
                        <TimePicker v-model="$_formValidate_$.pmElastic"  format="HH:mm" placeholder="17:30" style="width: 100px"></TimePicker> -->
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style='margin-left:50px;' @click="$_handleSubmit_$()">保存</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>

    </div>

</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        const validatetime = (rule, value, callback) => {
            let stime1 = '';
            let stime2 = '';
            let stime3 = '';
            let stime4 = '';
            let a = 0;
            let b = 0;
            if (this.$_formValidate_$.amElastic) {
                stime2 = this.$_formValidate_$.amElastic.substring(0, 2);
                stime4 = this.$_formValidate_$.amElastic.substring(3, 6);
            }
            stime1 = this.$_formValidate_$.amTime.substring(0, 2);
            stime3 = this.$_formValidate_$.amTime.substring(3, 6);

            b = (parseInt(stime2) + parseInt(this.$_formValidate_$.workingHours));
            if (this.$_formValidate_$.workingHours) {
                if (parseInt(stime3) > 0) {
                    a = (parseInt(stime1) + parseInt(this.$_formValidate_$.workingHours)) + parseInt(1);
                } else {
                    a = (parseInt(stime1) + parseInt(this.$_formValidate_$.workingHours));
                }
                if (parseInt(stime4) > 0) {
                    b = (parseInt(stime2) + parseInt(this.$_formValidate_$.workingHours)) + parseInt(1);
                } else {
                    b = (parseInt(stime2) + parseInt(this.$_formValidate_$.workingHours));
                }
                if (a > 24) {
                    callback('上班时间加工作时长不能超过24小时');
                } else {
                    if (stime3) {
                        this.$_formValidate_$.pmTime = (parseInt(stime1) + parseInt(this.$_formValidate_$.workingHours)) + ':' + stime3
                    } else {
                        this.$_formValidate_$.pmTime = '';
                    }
                    callback();

                }
                if (b > 24) {
                    callback('上班时间加工作时长不能超过24小时');
                } else {
                    if (stime4) {
                        this.$_formValidate_$.pmElastic = (parseInt(stime2) + parseInt(this.$_formValidate_$.workingHours)) + ':' + stime4
                    } else {
                        this.$_formValidate_$.pmElastic = '';
                    }
                    callback();
                }
            } else {
                callback('不能为空');
            }

        };
        const validatetime1 = (rule, value, callback) => {
            let stime1 = '';
            let stime2 = '';
            let stime3 = '';
            let stime4 = '';
            let a = 0;
            let b = 0;
            if (this.$_formValidate_$.amElastic) {
                stime2 = this.$_formValidate_$.amElastic.substring(0, 2);
                stime4 = this.$_formValidate_$.amElastic.substring(3, 6);
            }
            stime1 = this.$_formValidate_$.amTime.substring(0, 2);
            stime3 = this.$_formValidate_$.amTime.substring(3, 6);

            if (this.$_formValidate_$.amTime) {
                if (this.$_formValidate_$.amElastic) {
                    if (parseInt(stime1) > parseInt(stime2)) {
                        callback('弹性时间不能小于上班时间');
                    } else {
                        if (this.$_formValidate_$.workingHours) {
                            this.$_formValidate_$.pmTime = (parseInt(stime1) + parseInt(this.$_formValidate_$.workingHours)) + ':' + stime3
                            this.$_formValidate_$.pmElastic = (parseInt(stime2) + parseInt(this.$_formValidate_$.workingHours)) + ':' + stime4
                        } else {
                            this.$_formValidate_$.pmTime = (parseInt(stime1)) + ':' + stime3
                            this.$_formValidate_$.pmElastic = (parseInt(stime2)) + ':' + stime4
                        }
                        callback();
                    }
                } else {
                    callback();
                }
            } else {
                callback('上班时间不能为空');
            }

        };
        return {
            asd: '',
            orgId: '',
            arr: [],
            $_querycfg_$: {
                mod: 'module',
                params: {
                    cmd: 4
                }
            },
            parentSelect: [],
            parent: [],
            $_bumen_$: [],
            $_formValidate_$: {
                amTime: '',
                amElastic: '',
                pmTime: '',
                pmElastic: '',
                workingHours: ''
            },
            $_ruleValidate_$: {
                sbtime: [
                    {validator: validatetime1, trigger: 'change'}
                ],
                time: [
                    {type: 'number', trigger: 'change'},
                    {validator: validatetime, trigger: 'change'},
                    // {validator:this.$_validatenum_$,trigger: 'change'}
                ],
            },
            $_search_$: '',
            $_Treedata_$: [
                {
                    title: "企业",
                    expand: true,
                    parentId: 'top',
                    children: []
                }
            ],
        }
    },
    created() {
        // this.$_fquery_$();
        this.$_list_$();
    },
    methods: {
        $_xuanze_$(e) {
            this.asd = e;
            if (e.length > 0) {
                if (this.asd[0].children.length > 0 && this.asd[0].parentId != 'top') {
                    //不能请求
                } else {
                    if (this.asd[0].parentId == 'top') {
                        this.asd[0].id = 0;
                    }

                    this.$_sendQuery_$({
                        method: "GET",
                        url: `${this.$_global_$.serverPath}/company/attendance/rule/` + this.asd[0].id,
                        data: {},
                        headers: {"Content-type": "application/json"}
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_formValidate_$ = rsp.data.data;
                            } else {
                                this.$_formValidate_$ = {
                                    amTime: '',
                                    amElastic: '',
                                    pmTime: '',
                                    pmElastic: '',
                                    workingHours: ''
                                };
                            }
                        }
                    })
                }
            }
        },
        $_digui_$(arr) {
            var children = [];
            for (var i = 0; i < arr.length; i++) {
                var temp = {
                    title: arr[i].name,
                    id: arr[i].id,
                    index: i,
                    parentId: arr[i].parentId,
                    expand: false,
                    children: []
                };
                if (arr[i].child != null) {
                    temp.children = this.$_digui_$(arr[i].child)
                }
                children.push(temp)
            }
            return children;
        },

        // 所有部门
        $_list_$() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_sendQuery_$({
                method: "GET",
                url: `${this.$_global_$.serverPath}/company/company/` + this.userInfo.enterpriseId + `/department`,
                data: {},
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        var arr = rsp.data.data;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].name == '未分配员工') {
                                arr.splice(i, 1);
                            }
                        }
                        this.$_Treedata_$[0].children = this.$_digui_$(arr);
                    }
                }
            })
        },
        $_receive_$(rsp) {
            if (rsp.status === 200) {
                if (rsp.data.status === 0) {
                    this.list = rsp.data.obj;
                }
            }
        },
        $_add_$() {
            this.$root.inparams.id;
        },
        //添加考勤
        $_handleSubmit_$() {

            if (this.asd == '') {
                this.$Message.error('请选择企业或部门');
            } else {
                if (this.asd[0].children.length > 0 && this.asd[0].parentId != 'top') {
                    this.$Message.error('该部门下还有子部门无法添加!');
                } else {
                    this.$refs.$_formValidate_$.validate((valid) => {
                        if (valid) {
                            if (this.asd[0].parentId == 'top') {
                                //企业级规则
                                this.asd[0].id = 0;
                            }
                            let params = {
                                orgId: this.asd[0].id,
                                amTime: this.$_formValidate_$.amTime,
                                // amElastic: this.$_formValidate_$.amElastic,
                                pmTime: this.$_formValidate_$.pmTime,
                                // pmElastic: this.$_formValidate_$.pmElastic,
                                workingHours: this.$_formValidate_$.workingHours
                            };
                            if (this.$_formValidate_$.amElastic) {
                                params.amElastic = this.$_formValidate_$.amElastic
                            }
                            if (this.$_formValidate_$.amElastic) {
                                params.pmElastic = this.$_formValidate_$.pmElastic
                            }
                            if (params.amTime == '' || params.pmTime == '' || params.workingHours == '') {
                                this.$Message.error('请将规则填写完整');
                            } else {
                                this.$_sendQuery_$({
                                    method: "POST",
                                    url: `${this.$_global_$.serverPath}/company/attendance/rule/add`,
                                    data: params,
                                    headers: {"Content-type": "application/json"}
                                }).then((rsp) => {
                                    if (rsp.status === 200) {
                                        if (rsp.data.code === 0) {
                                            this.$Message.success(rsp.data.message);
                                            this.$root.$_Route_$('company', 'kqmanage', 'kqgz', {})
                                        } else {
                                            this.$Message.error(rsp.data.message);
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }

    }
}
</script>