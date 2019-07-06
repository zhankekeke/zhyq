<style scoped>
    .lm {
        margin-left: 100px;
        width: 520px;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }

    >>>.avatar-uploader{
        width: 520px;
    }

    .el-select {
        width: 280px;
    }
    >>> .el-input__inner {
        height: 30px;
        font-size: 12px;
    }
    >>>.el-date-editor .el-range__icon{
        line-height: 22px;
    }
    >>>.el-date-editor .el-range-separator{
        line-height: 22px;
    }
    >>>.el-date-editor .el-range__close-icon{
        line-height: 22px;
    }

    >>> .el-form-item__label {
        font-size: 12px;
    }

    >>> .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }

    >>> .el-upload--picture-card {
        width: 148px;
        height: 148px;
        line-height: 148px;
    }

    .plateNumber >>>.el-input__inner{
        text-transform: uppercase;
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
    <div class="lm">
        新增轮播图
        <br/>
        <div>
            <el-form ref="addForm" :model="$_addForm_$" :rules="addValidator" label-width="90px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="$_addForm_$.name" placeholder="请输入轮播图名称"></el-input>
                </el-form-item>
                <el-form-item label="终端类型" prop="type">
                    <el-select v-model="$_addForm_$.type" placeholder="请选择">
                        <el-option
                                v-for="item in typeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务类型">
                    <el-select v-model="$_addForm_$.typecodeList" placeholder="请选择">
                        <el-option
                                v-for="item in typecodeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="跳转链接" prop="url">
                    <el-input v-model="$_addForm_$.url" width="220px" placeholder="请输入跳转链接"></el-input>
                </el-form-item>
                <el-form-item label="排序号" prop="seqId">
                    <el-input v-model="$_addForm_$.seqId" width="220px" placeholder="轮播图分类排序码（越大越靠前）"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            :show-file-list="false"
                            ref="addform"
                            :before-upload="beforeupload"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <img v-if="$_file_$.length==1" :src="$_file_$[0]" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span v-if="$_addForm_$.typecodeList==1" style="color: #f00">建议图片尺寸：653*340</span>
                    <span v-else-if="$_addForm_$.typecodeList==2" style="color: #f00">建议图片尺寸：560*300</span>
                    <span v-else-if="$_addForm_$.typecodeList==3" style="color: #f00">建议图片尺寸：560*300</span>
                    <span v-else ></span>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="onBack">取 消</Button>
                <Button type="primary" @click="$_addOK_$()">保 存</Button>
            </div>
        </div>
    </div>
</template>
<script>

    import {
        Table, Button, TableColumn, Form, Dialog,
        Input, FormItem, Select, Option, Tag, Radio, Upload
    } from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
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
        data() {
            const validateurl = (rule, value, callback) => {
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                    + "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                    + "|" // 允许IP和DOMAIN（域名）
                    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                    + "[a-z]{2,6})" // first level domain- .com or .museum
                    + "(:[0-9]{1,4})?" // 端口- :80
                    + "((/?)|" // a slash isn't required if there is no file name
                    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
                let re = new RegExp(strRegex);
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
                if (this.$_file2_$.length > 0) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                $_userInfo_$: '',  //用户信息
                //创建列表zoneId
                zoneId: 0,
                typeList: [{value: 0, label: 'PC端'}, {value: 1, label: '移动端'}],
                typecodeList: [
                    {value: 0, label: '首页'},
                     {value: 1, label: '积分商城'}, 
                     {value: 2, label: '企业服务'},
                     {value: 3, label: '管家服务'},
                     ],  //业务类型
                $_file_$: [],
                $_file2_$: [], //上传到数据库
                baseUrl: this.$_global_$.imgPath, // 图片基础路径
                $_addForm_$: {  // 添加表单
                    name: '',
                    type: 0,
                    typecodeList: 0,
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
                        { validator: validateurl, trigger: 'change'},
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
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);

            this.zoneId = this.$_userInfo_$.zoneId;
        },
        methods: {

            // 添加确定
            $_addOK_$() {
                let imgfile = this.$_file2_$.join(';');
                let data = {
                    name: this.$_addForm_$.name,
                    type: String(this.$_addForm_$.type),
                    typeCode: String(this.$_addForm_$.typecodeList),
                    publishStatus: "1",
                    zoneId: this.zoneId,
                    image: imgfile,
                    seqId: this.$_addForm_$.seqId,
                };
                if(this.$_addForm_$.type==0){
                    data.pcUrl = this.$_addForm_$.url;
                }else if(this.$_addForm_$.type==1){
                    data.appUrl = this.$_addForm_$.url;
                }
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/mallCarousel/createCarouselImage',
                            data: data
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data);
                                    this.$root.$_Route_$("user", "user", "lbtManage");
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }else{
                                this.$Message.error(rsp.data.message)
                            }
                        })
                    }
                })
            },
            onBack() {
                this.$root.$_Route_$("user", "user", "lbtManage");
            },

            // upload的自己上传
            beforeupload(file) {
                return this.isLtMB(file);

            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_file_$ = [];
                this.$_file2_$ = [];
                this.fileChange(fileList);
                this.$_addForm_$.file = this.$_file2_$[0];
            },
            // 设置photo值
            fileChange(fileList) {
                let a = '';
                let b = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str;
                                b = temp_str;
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.push(a);
                this.$_file2_$.push(b);
            },

        },

    };
</script>