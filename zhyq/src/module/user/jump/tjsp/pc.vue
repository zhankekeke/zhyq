<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .zdtb {
        font-size: 12px;
        /* padding:0px 5% 0px 5%; */
        color: #666;
        margin-left: 100px;
        width: 660px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';

    }

    .bg {
        background: #efefef;
        padding: 10px;
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

    >>> .el-input__inner {
        height: 30px;
        font-size: 12px;
    }

    >>> .el-date-editor .el-range__icon {
        line-height: 22px;
    }

    >>> .el-date-editor .el-range-separator {
        line-height: 22px;
    }

    >>> .el-date-editor .el-range__close-icon {
        line-height: 22px;
    }

    >>> .el-form-item__label {
        font-size: 12px;
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
    <div class="zdtb">
        <!-- 添加 -->
        <p style="font-size: 16px">新增商品</p>
        <br/>
        <div>
            <el-form ref="addForm" :model="$_addForm_$" :rules="addValidator" label-width="90px">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="$_addForm_$.name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="catalog">
                    <el-select v-model="$_addForm_$.catalog" placeholder="请选择">
                        <el-option
                                v-for="item in catlogList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序号" prop="sortNum">
                    <el-input v-model="$_addForm_$.sortNum" placeholder="请输入排序号"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-tag :key="tag" v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @blur="handleInputConfirm"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="商品类型" prop="goodsType">
                    <el-select v-model="$_addForm_$.goodsType" placeholder="请选择">
                        <el-option
                                v-for="item in goodsTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单价" v-if="$_addForm_$.goodsType === '0'" prop="prices">
                    <el-input v-model="$_addForm_$.prices" placeholder="元/件"></el-input>
                </el-form-item>
                <el-form-item label="单价" v-if="$_addForm_$.goodsType === '1'" prop="credits">
                    <el-input v-model="$_addForm_$.credits" placeholder="积分/件"></el-input>
                </el-form-item>
                <el-form-item label="单价" v-if="$_addForm_$.goodsType === '2'" prop="credits">
                    <el-input v-model="$_addForm_$.credits" placeholder="积分/件"></el-input>
                </el-form-item>
                <el-form-item label="代金券" v-if="$_addForm_$.goodsType === '2'" prop="voucherId">
                    <el-select v-model="$_addForm_$.voucherId" placeholder="请选择代金券">
                        <el-option
                                v-for="item in voucherList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="库存" prop="repertory">
                    <el-input v-model="$_addForm_$.repertory" placeholder="请输入库存"></el-input>
                </el-form-item>
                <el-form-item label="是否需要配送" prop="isDelivery">
                    <el-radio v-model="$_addForm_$.isDelivery" label="1">是</el-radio>
                    <el-radio v-model="$_addForm_$.isDelivery" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="上传图片" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="uplods"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span style="color: #f00">建议图片尺寸：500*300</span>
                </el-form-item>
                <el-form-item label="商品详情">
                    <quill-editor ref="myTextEditor" v-model="$_addForm_$.info" :options="quillOption"></quill-editor>

                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="onBack()">取 消</Button>
                <Button type="primary" @click="$_addOK_$()">保 存</Button>
            </div>
        </div>
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
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config'


    export default {
        mixins: [controler],
        components: {
            quillEditor,
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
                    return '普通商品'
                }
                if (val == 1) {
                    return '积分商品'
                }
                if (val == 2) {
                    return '代金券'
                }
            }
        },
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file2_$.length > 0) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                quillOption: quillConfig,

                editorOption: {modules: {toolbar: '#toolbar'}},

                zoneId: '',
                $_file_$: [], //显示图片
                $_file2_$: [], //保存数据库的图片
                baseUrl: this.$_global_$.imgPath,
                $_addForm_$: {  // 添加表单
                    name: '',
                    catalog: '',
                    tags: '',
                    goodsType: '',
                    prices: '',
                    credits: '',
                    repertory: '',
                    isDelivery: '1',
                    info: ''
                },
                addValidator: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'change'},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$, message: '存在非法字符', trigger: 'change'}
                    ],
                    sortNum: [
                        {required: true, message: '请输入排序号', trigger: 'change'},
                        {max: 10, message: '不能超过10位数', trigger: 'change'},
                        {validator: this.$_validatenum_$, message: '请输入数字', trigger: 'change'}
                    ],
                    catalog: [
                        {required: true, message: '请输入商品分类', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    prices: [
                        {required: true, message: '请输入单价', trigger: 'change'},
                        {max: 10, message: '不能超过10位数', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, message: '请输入正整数', trigger: 'change'}
                    ],
                    credits: [
                        {required: true, message: '请输入单价', trigger: 'change'},
                        {max: 10, message: '不能超过10位数', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, message: '请输入正整数', trigger: 'change'}
                    ],
                    voucherId: [
                        {required: true, message: '请选择代金券', trigger: 'change'},
                    ],
                    repertory: [
                        {required: true, message: '请输入库存', trigger: 'change'},
                        {max: 10, message: '不能超过10位数', trigger: 'change'},
                        {validator: this.$_validatenum_$, message: '请输入数字', trigger: 'change'}
                    ],
                    goodsType: [
                        {required: true, message: '请输入商品类型', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    info: [
                        {max: 100, message: '不能超过100字', trigger: 'change'},
                    ],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}],
                },
                catlogList: [], // 商品分类列表
                dynamicTags: [], // 标签临时存放数组
                inputVisible: false, // 标签输入框可见性
                inputValue: '', // 标签输入绑定
                voucherList: [],  //代金券列表
                goodsTypeList: [  // 商品类型列表
                    {
                        value: "0",
                        label: "普通商品"
                    },
                    {
                        value: "1",
                        label: "积分商品"
                    },
                    {
                        value: "2",
                        label: "代金券"
                    }
                ],
                $_editForm_$: {  // 编辑商品表单
                    file: ''
                },
                imageList: [], // 编辑商品图片回显
                id: '',  // 删除时使用
            }
        },
        created() {
            this.zoneId = this.$root.inparams.zoneId;
            this.$_cList_$();
            this.vouchList();
        },
        methods: {
            //获取代金券
            vouchList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/operate/voucher/page',
                    data: {
                        pageNum: 1,
                        pageSize: 999999,
                        zoneId:this.zoneId
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            for (let i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    value: arr[i].id + '',
                                    label: arr[i].name
                                }
                                this.voucherList.push(temp)
                            }
                        }
                    }
                })
            },
            // 获取分类列表
            $_cList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/operate/catalog/queryCatalogList',
                    data: {
                        visible: '0',
                        zoneId: this.zoneId
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (let i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    value: arr[i].id + '',
                                    label: arr[i].name
                                }
                                this.catlogList.push(temp)
                            }
                        } else {
                        }
                    }
                })
            },

            // 添加确定
            $_addOK_$() {
                this.$_addForm_$.tags = this.dynamicTags.join(';');
                this.$_addForm_$.image = this.$_file2_$.join(';');
                this.$_addForm_$.zoneId = this.zoneId;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/goods/createGoods',
                            data: this.$_addForm_$,
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data);
                                    this.$root.$_Route_$('user', 'jfscManage', 'spManage', {zoneId: this.$_zoneId_$})
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    }
                })
            },
            //取消
            onBack() {
                this.$root.$_Route_$('user', 'jfscManage', 'spManage', {zoneId: this.$_zoneId_$})
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
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = '';
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
                let a = '';
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
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
        },
        props: {
            value: {type: String}, /*上传图片的地址*/
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
    };
</script>