<style scoped>
    .wrap {
        width: 600px;
    }


</style>
<template>
    <div>
        <Form class="wrap" :rules="formValidate" ref="form" :model="$_Form_$" :label-width="100">
            <FormItem label="活动名称" prop="title">
                <Input v-model.trim="$_Form_$.title" placeholder="请输入活动名称"></Input>
            </FormItem>
            <FormItem label="活动地址" prop="address">
                <Input v-model.trim="$_Form_$.address" placeholder="请输入活动地址"></Input>
            </FormItem>
            <FormItem label="标题图" prop="file">
                <el-upload
                        class="avatar-uploader"
                        :action="this.$_global_$.imgUploadPath"
                        list-type="picture-card"
                        ref="uploadxls"
                        :show-file-list="true"
                        :before-upload ="beforeupload"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                                        accept="image/png,image/gif,image/jpg,image/jpeg">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span  style="color: #f00">建议图片尺寸：290*170</span>
            </FormItem>
            <FormItem label="活动介绍">
                <quill-editor ref="myTextEditor" v-model="$_Form_$.content" :options="quillOption"></quill-editor>


            </FormItem>
            <Row>
                <Col span="12">
                    <FormItem label="开始时间" prop="beginDate">
                        <DatePicker v-model="$_Form_$.beginDate" type="datetime" style="width:200px"
                                    :options="startTimeOptions" @on-change="startTimeChange" placeholder="请选择起止时间"
                                    format="yyyy-MM-dd HH:mm"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="结束时间" prop="endDate">
                    <DatePicker v-model="$_Form_$.endDate" type="datetime" style="width:200px"
                    :options="endTimeOptions" @on-change="endTimeChange" placeholder="请选择起止时间"
                format = "yyyy-MM-dd HH:mm"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="是否需要报名" prop="apply">
                        <RadioGroup v-model="$_Form_$.apply">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="人数限制" prop="peopleNumber">
                        <Input v-model="$_Form_$.peopleNumber" placeholder="请输入人数限制"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="联系人" prop="contactName">
                        <Input v-model="$_Form_$.contactName" placeholder="请填写联系人"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="联系方式" prop="contactNumber">
                        <Input v-model="$_Form_$.contactNumber" placeholder="请填写联系方式"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="发放代金券">
                        <Select v-model="$_Form_$.couponId" placeholder="请选择代金券" style="width:200px">
                            <Option v-for="item in voucherList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="代金券数量">
                        <Input v-model="$_Form_$.couponCount"></Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="活动附件">
                <Upload
                        :before-upload="handleUploadFile"
                        :on-remove="handleRemoveFile"
                        :on-success="uploadSuccessFile"
                        :default-file-list="uploadList"
                        :action='this.$_global_$.filePath'>
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                </Upload>
            </FormItem>
            <FormItem align="center">
                <Button type="primary" @click="$_save_$()">保存</Button>
                <Button type="ghost" style="margin-left: 8px" @click="$_cancel_$()">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import {Upload} from "element-ui";
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config'


    export default {
        mixins: [controler],
        components: {
            quillEditor,
            [Upload.name]: Upload,
        },
        data() {
            const $_ygsl_$ = (rule, value, callback) => {
                var reg = /^\d{1,6}$/
                if (!reg.test(value)) {
                    callback("人数不能超过六位数!")
                }
            };
            const checkPhone = (rule,value,callback) => {
                var mobile = /^[1][3,4,5,7,6,8,9][0-9]{9}$/;
                let tel = /^\d{3,4}-?\d{7,9}$/;

                if (!tel.test(value) && !mobile.test(value)){
                    return callback('请填写联系电话(座机格式\'区号-座机号码\')');
                }else{
                    callback();
                }
            };
            const $_phone_$ = (rule, value, callback) => {
                var reg = /^[1][3,4,5,7,6,8][0-9]{9}$/
                if (!reg.test(value)) {
                    callback("请输入正确的手机号码!")
                } else {
                    callback()
                }
            };
            const $_validatenum_$ = (rule, value, callback) => {
                var reg = /^([1-9]\d*)|0$/
                var reg1 = /[\u4e00-\u9fa5]/
                if (!reg.test(value)) {
                    callback("请输入正整数!")
                } else if (reg1.test(value)) {
                    callback("不能包含汉字!")
                } else {
                    callback()
                }
            };
            const validateimg = (rule, value, callback) => {
                if (this.$_file2_$.length > 0) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                startTimeOptions: {}, //开始日期设置
                endTimeOptions: {}, //结束日期设置
                quillOption: quillConfig,
                editorOption: {modules: {toolbar: '#toolbar'}},
                $_Form_$: {
                    title: '',
                    address: '',
                    content: '',
                    beginDate: '',
                    endDate: '',
                    apply: '0',
                    couponId: '',
                    couponName: '',
                    contactName: '',
                    contactNumber: '',
                    files: '',
                    couponCount: '',
                    peopleNumber: '0'
                },
                formValidate: {
                    //管理员图片验证
                    file: [
                        {required: true, validator: validateimg, trigger: 'change'}
                    ],
                    title: [
                        {required: true, message: '活动名称不能为空', trigger: 'change'},
                        {type: 'string', max: 50, message: '活动名称不能超过50个字', trigger: 'change'},
                        // {validator: this.$_validatestr_$, trigger:'change'}
                    ], address: [
                        {required: true, message: '地址不能为空', trigger: 'change'},
                        {type: 'string', max: 100, message: '地址不能超过100个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ], peopleNumber: [
                        {required: true, message: '人数限制不能为空', trigger: 'change'},
                        // {validator: $_ygsl_$, trigger:'blur'}
                    ],
                    contactName: [
                        {required: true, message: '联系人不能为空', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ], contactNumber: [
                        {required: true, message: '联系方式不能为空', trigger: 'blur'},
                        {validator: checkPhone, trigger: 'change'}
                    ], couponCount: [
                        {required: true, message: '代金券数量不能为空', trigger: 'change'},
                        {validator: $_validatenum_$, trigger: 'change'}
                    ],
                    beginDate: [
                        {required: true, message: '开始时间不能为空', trigger: 'change'}
                    ],
                    endDate: [
                        {required: true, message: '结束时间不能为空', trigger: 'change'}
                    ]
                    
                },
                voucherList: [
                ],
                $_file_$: [],
                $_file2_$: [],
                upurl:'',
                baseUrl: this.$_global_$.imgPath,
                files: [],
                uploadList: [],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                }
            }
        },
        created() {
            this.$_validatestr_$
            this.$_global_$.serverPath;
            this.vList()
        },
        methods: {
            $_edit_$() {
                this.$root.inparams.id
            },
            startTimeChange: function (e) { //设置开始时间
                this.$_Form_$.beginDate = e;
                this.endTimeOptions = {
                    disabledDate: date => {
                        let startTime = this.$_Form_$.beginDate ? new Date(this.$_Form_$.beginDate).valueOf() : '';
                        return date && (date.valueOf() < startTime);
                    }
                }
            },
            endTimeChange: function (e) { //设置结束时间
                var date = new Date(e).valueOf()
                this.$_Form_$.endDate = this.FormatAllDate(date);
                let endTime = this.$_Form_$.endDate ? new Date(this.$_Form_$.endDate).valueOf(): '';
                this.startTimeOptions = {
                    disabledDate(date) {
                        return date && date.valueOf() > endTime;
                    }
                }
            },
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
            // 保存
            $_save_$() {
                this.$set(this.$_Form_$, 'images', JSON.stringify(this.$_file2_$));
                if(this.files){
                    this.$set(this.$_Form_$, 'files', JSON.stringify(this.files));
                }else{
                    this.$_Form_$.files=this.files;
                }
                
                // this.$_Form_$.files = this.files.join(',');
                // this.$set(this.$_Form_$, 'files', this.files.join(','));
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_Form_$.beginDate = this.FormatAllDate(this.$_Form_$.beginDate);
                this.$_Form_$.endDate = this.FormatAllDate(this.$_Form_$.endDate);
                if (this.$_Form_$.couponId == '请选择') {
                    this.$_Form_$.couponId = null
                    this.$_Form_$.couponCount = null
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/company/activity`,
                                data: {
                                    "zoneId": userInfo.zoneId,
                                    "beginDate": this.$_Form_$.beginDate,
                                    "address": this.$_Form_$.address,
                                    "endDate": this.$_Form_$.endDate,
                                    "apply": this.$_Form_$.apply,
                                    "peopleNumber": this.$_Form_$.peopleNumber,
                                    "contactName": this.$_Form_$.contactName,
                                    "contactNumber": this.$_Form_$.contactNumber,
                                    "title": this.$_Form_$.title,
                                    "content": this.$_Form_$.content,
                                    "couponId": this.$_Form_$.couponId,
                                    "couponCount": this.$_Form_$.couponCount,
                                    "files": this.$_Form_$.files,
                                    images: this.$_Form_$.images,
                                },
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$root.$_Route_$('user', 'informManage', 'hdManage', {})
                                    } else {
                                        this.$Message.error('新建活动失败！');
                                    }
                                }
                            })
                        }
                    })
                } else {
                    for(var i = 0; i < this.voucherList.length; i++){

                        if(this.$_Form_$.couponId ==this.voucherList[i].value){
                            this.$_Form_$.couponName = this.voucherList[i].label
                        }
                    }  
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/company/activity`,
                                data: {
                                    "zoneId": userInfo.zoneId,
                                    "beginDate": this.$_Form_$.beginDate,
                                    "address": this.$_Form_$.address,
                                    "endDate": this.$_Form_$.endDate,
                                    "apply": this.$_Form_$.apply,
                                    "peopleNumber": this.$_Form_$.peopleNumber,
                                    "contactName": this.$_Form_$.contactName,
                                    "contactNumber": this.$_Form_$.contactNumber,
                                    "title": this.$_Form_$.title,
                                    "content": this.$_Form_$.content,
                                    "couponId": this.$_Form_$.couponId,
                                    "couponCount": this.$_Form_$.couponCount,
                                    "couponName": this.$_Form_$.couponName,
                                    "files": this.$_Form_$.files,
                                    images: this.$_Form_$.images,
                                },
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$root.$_Route_$('user', 'informManage', 'hdManage', {})
                                    } else {
                                        this.$Message.error('新建活动失败！');
                                    }
                                }
                            })
                        }
                    })
                }

            },
            // 取消
            $_cancel_$() {
                this.$root.$_Route_$('user', 'informManage', 'hdManage', {})
            },
            // 获取代金券类型列表
            vList() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/voucher/list`,
                    data: {
                        "zoneId": userInfo.zoneId
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                }
                                this.voucherList.push(temp)
                            }
                        }
                    }
                })
            },
            // upload的自己上传
            beforeupload(file) {
                return this.isLtMB(file);
            },
// 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_Form_$.file = res.data;
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = {};
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = temp_str;
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file2_$.push(a);
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {};
                this.$_file2_$ = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = temp_str;
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                            this.$_file2_$.push(a);
                        }

                    }
                }

            },
            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange() {//内容改变事件
            },
            /*点击上传图片按钮*/
            imgClick() {
                /*内存创建input file*/
                var input = document.createElement('input')
                input.type = 'file'
                input.name = this.fileName
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
                input.onchange = this.onFileChange
                input.click()
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var self = this
                var fileInput = e.target
                if (fileInput.files.length == 0) {
                    return
                }
                this.editor.focus()
                if (fileInput.files[0].size > 1024 * 1024 * 100) {
                    this.$alert('图片不能大于600KB', '图片尺寸过大', {confirmButtonText: '确定', type: 'warning',})
                }
                var data = new FormData
                data.append('file', fileInput.files[0]);
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.imgUploadPath,
                    data: data
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            self.editor.insertEmbed(self.editor.getSelection().index, 'image', this.$_global_$.imgPath + rsp.data.data);
                        }
                    }
                });
            },
            // 文件上传
            handleUploadFile(file) {
                return this.isLtMB1(file);
            },
            // 上传成功
            uploadSuccessFile(response, file, fileList) {
                this.successFileChange(response);
            },
            // 设置photo值
            successFileChange(response) {
                let a = '';
                let b = '';
                let c = '';
                let d = '';
                let f = {};
                f = {
                    fileName:response.data.fileName,
                    filePath:response.data.filePath,
                    fileSize:response.data.fileSize
                };
                this.files.push(f);
                this.uploadList = [];
                for(let i=0;i<this.files.length;i++){
                    this.uploadList.push({
                        name:this.files[i].fileName,
                        url:this.$_global_$.imgPath+this.files[i].filePath,
                        response:{code:0,data:this.files[i].fileName,message:""}
                    })
                }
            },
            // 移除
            handleRemoveFile(file, fileList) {
                this.fileRmoveFile(file);
            },
            // 移除设置photo值
            fileRmoveFile(file) {
                if (file.response) {
                    if (file.response.code === 0) {
                        for(let j=0;j<this.files.length;j++){
                            if(file.response.data==this.files[j].fileName){
                                this.files.splice(j,1);
                            }
                        }
                        
                    }
                }
                
            },
        },
        props: {
            value: {type: String}, /*上传图片的地址*/
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
    }
</script>

