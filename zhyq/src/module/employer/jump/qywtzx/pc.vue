<style scoped>
    .container {
        font-size: 14px;
        color: #333;
        font-weight: 400;
    }

    .top {
        border: 1px solid #d8d8d8;
        line-height: 35px;
        box-sizing: border-box;
        padding: 20px 30px;
        box-shadow: rgba(0, 0, 0, 0.15) 0 0 4px;
        border-radius: 4px;
    }

    .img img {
        width: 76px;
    }

    .big {
        font-size: 14px;
        font-weight: 600;
        color: #01A0FB;
    }

    .title {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .biiger {
        font-size: 14px;
        font-weight: 600;
    }

    .col {
        padding-top: 10px;
    }

    .box {
        width: 420px;
        margin: 30px auto;
    }

    .shangchuan img {
        margin-right: 10px;
    }
</style>
<template>
    <div class='container'>
        <Row class='top' v-model='$_mes_$'>
            <Col span='3' class='img'>
                <p class="title">管家信息</p>
                <img :src="$_global_$.imgPath+$_mes_$.image" alt="">
            </Col>
            <Col span='7' class="col">
                <p style="margin-top:20px;">姓名：<span class="biiger">{{$_mes_$.name}}</span></p>
                <p>联系方式：<span class="biiger">{{$_mes_$.phone_number}}</span></p>
            </Col>
            <Col span='8' class="col">
                <p v-if="$_mes_$.service_count">服务总次数：<span class="big">{{$_mes_$.service_count}}</span> 次</p>
                <p v-else>服务总次数：<span class="big">0</span> 次</p>
                <p v-if="$_mes_$.avg_reply_time">平均响应式：<span class="big">{{$_mes_$.avg_reply_time}}</span> 分钟</p>
                <p v-else>平均响应式：<span class="big">0</span> 分钟</p>
                <p v-if="$_mes_$.avg_handle_time">平均处理时间：<span class="big">{{$_mes_$.avg_handle_time}}</span> 小时</p>
                <p v-else>平均处理时间：<span class="big">0</span> 小时</p>
            </Col>
            <Col span='6' class="col">
                <p v-if="$_mes_$.synthesize">综合得分：<span class="big" style="color:#FFCC01">{{$_mes_$.synthesize}}</span> 分</p>
                <p v-else>综合得分：<span class="big" style="color:#FFCC01">0</span> 分</p>
                <p>星级：<span> <Rate allow-half disabled v-model="$_mes_$.star"></Rate></span></p>
            </Col>
        </Row>
        <Row>
            <div class="box">
                <p class="title">联系管家</p>
                <Form ref="form" :model="$_formValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                    <FormItem label="问题分类：" prop="type">
                        <Select v-model="$_formValidate_$.type">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="问题名称：" prop="name">
                        <Input placeholder="请输入问题名称" v-model.trim="$_formValidate_$.name"></Input>
                    </FormItem>
                    <FormItem label="问题描述：" prop="desc">
                        <Input placeholder="请输入问题描述" v-model.trim="$_formValidate_$.desc" type="textarea"
                               :autosize="{minRows: 4,maxRows: 8}"></Input>
                    </FormItem>
                    <FormItem label="附件:">
                        <Upload
                                :action="this.$_global_$.imgUploadPath"
                                :show-file-list="true"
                                :before-upload="beforeupload"
                                :on-remove="handleRemove"
                                :on-success="uploadSuccess">
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                        </Upload>
                    </FormItem>
                    <FormItem style="text-align:center;">
                        <Button type="primary" style="margin:30px 0;" @click='$_tjBtn_$'>提交</Button>
                    </FormItem>
                </Form>
            </div>

        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';
    import axios from 'axios'

    export default {
        mixins: [controler],
        data() {
            return {
                $_gjInfo_$: '',
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                cityList: [
                    {value: '1', label: '物业报修'},
                    {value: '2', label: '投诉建议'},
                    {value: '3', label: '企业服务咨询'},
                    {value: '4', label: '留言'}
                ],
                $_formValidate_$: {
                    name: '',
                    type: '1',
                    desc: '',
                    file: ''
                },
                $_file_$: [],
                $_mes_$: {},
                $_ruleValidate_$: {
                    name: [
                        {required: true, message: '请输入问题名称', trigger: 'change'},
                        {type: 'string', max: 50, message: '问题名称不能超过50个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ], desc: [
                        {required: true, message: '请输入问题描述', trigger: 'change'},
                        {type: 'string', max: 500, message: '问题描述不能超过500个字', trigger: 'change'}
                    ],
                },
                userInfo: {},
                baseUrl: 'http://img.yhcode.com:88/',
            }
        },
        created() {
            this.$_gjInfo_$ = this.$root.inparams.gjInfo;
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_global_$.serverPath
            this.$_info_$()
        },
        methods: {
            $_zixun_$() {
                this.$root.inparams.id;
            },
            // 获取管家信息
            $_info_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/queryStewardDetails`,
                    data: {
                        stewardId: this.$_gjInfo_$.stewardId
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_mes_$ = rsp.data.data;
                            this.$_mes_$.star = Math.floor(this.$_mes_$.star/20*10)/10;
                            this.$_mes_$.synthesize = Math.floor(this.$_mes_$.synthesize/20*10)/10;
                        }
                    }
                })
            },
            // 提交
            $_tjBtn_$() {
                if (this.$_file_$.length > 0) {
                    this.$_formValidate_$.file = this.$_file_$.join(",")
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let data = {
                            commiterId: this.userInfo.id,
                            commiterName: this.userInfo.name,
                            commiterPhoneNumber: this.userInfo.phoneNumber,
                            commiterDepartment: this.userInfo.departmentId,
                            commiterDeptName: this.userInfo.departmentName,
                            commiterEnterpriseId: this.userInfo.enterpriseId,
                            commiterEnterpriseName: this.userInfo.enterpriseName,
                            recordTitle: this.$_formValidate_$.name,
                            recordDesc: this.$_formValidate_$.desc,
                            recordTypeCode: this.$_formValidate_$.type,
                            recordAttachment: this.$_formValidate_$.file,
                            stewardId: this.$_mes_$.id,
                            stewardName: this.$_mes_$.name,
                            stewardPhoneNumber: this.$_mes_$.phone_number,
                            zoneId: this.userInfo.zoneId
                        };
                        if (this.$_formValidate_$.type == 1) {
                            data.recordTypeName = '物业保修'
                        }
                        if (this.$_formValidate_$.type == 2) {
                            data.recordTypeName = '投诉建议'
                        }
                        if (this.$_formValidate_$.type == 3) {
                            data.recordTypeName = '企业服务咨询'
                        }
                        if (this.$_formValidate_$.type == 4) {
                            data.recordTypeName = '留言'
                        }
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/steward/steward/createServiceRecord`,
                            data: data,
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data)
                                    this.$root.$_Route_$('employer', 'help', 'gjfw', {id: 1})
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })


            },
            $_lxgj_$() {
                this.$root.inparams.id;
            },
            beforeupload() {
                return this.isLtMB1(file);
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].name;
                                a = this.baseUrl + temp_str

                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].name;
                                a = this.baseUrl + temp_str
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
            },
        }
    }
</script>