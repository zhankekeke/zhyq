<style scoped>
    .operation a {
        margin-right: 5px;
    }
</style>
<template>
    <div class="mmdd">


        <div v-show="showTable" class="mytd">
            <Table :columns="$_columns7_$" :data="$_data7_$" :show-header=false></Table>
        </div>
        <!-- 编辑分类 -->
        <el-dialog title="编辑商品分类" :visible.sync="$_editmodal_$" :close-on-click-modal="false">
            <el-form ref="editForm" :model="$_editForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="$_editForm_$.name"></el-input>
                </el-form-item>
                <el-form-item label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            action="http://192.168.1.175:8090/oss/file/upload/form"
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="editupload"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                            :file-list="imageList"
                             accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类级别" prop="level">
                    <el-select v-model="$_editForm_$.level" placeholder="请选择">
                        <el-option
                                v-for="item in levelList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属父级" v-if="this.$_editForm_$.level == 2">
                    <el-select v-model="$_editForm_$.parent" placeholder="请选择">
                        <el-option
                                v-for="item in catlogList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="可见性" prop="visible">
                    <el-select v-model="$_editForm_$.visible" placeholder="请选择">
                        <el-option
                                v-for="item in visibleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序码" prop="sortNum" placeholder="商品分类排序码（越大越靠前）">
                    <el-input v-model.number="$_editForm_$.sortNum"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" prop="info" placeholder="请输入分类描述">
                    <el-input v-model="$_editForm_$.info"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$_editmodal_$ = false">取 消</el-button>
                <el-button type="primary" @click="$_addEdit_$()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option} from 'element-ui';

    export default {
        props: {
            $_row_$: '',
        },
        components: {
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Upload.name]: Upload,
            [Select.name]: Select,
            [Option.name]: Option
        },
        data() {
            return {
                id: '',
                visible: '',
                zoneId: '',
                parent: '',//父分类ID
                $_data7_$: [],
                catlogList: [],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_editmodal_$: false,
                $_modalSort_$: false,
                levelList: [
                    {value: '1', label: '一级分类'},
                    {value: '2', label: '二级分类'}
                ],
                visibleList: [
                    {value: '0', label: '可见'},
                    {value: '1', label: '不可见'}
                ],
                $_file_$: [],
                baseUrl: this.$_global_$.imgPath,
                imageList: [], // 编辑回显图片列表
                $_columns7_$: [
                    {
                        title: '服务分类名称',
                        key: 'name',
                        align: 'center',
                        width: 300,
                    },
                    {
                        title: '排序号',
                        key: 'sortNum',
                        align: 'center'
                    },
                    {
                        title: '缩略图',
                        key: 'image',
                        align: 'center',
                        render: (h, params) => {
                            return h("img", {
                                attrs: {
                                    src: this.$_global_$.imgPath + params.row.image,
                                    width: "60px",
                                    height: "40px"
                                }
                            })
                        }
                    },
                    {
                        title: '状态',
                        key: status,
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.visible == 0 ? "上架" : "下架";
                            return h(
                                "span",
                                {},
                                text
                            )
                        }
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        render: (h, params) => {
                            var text = this.FormatAllDate(params.row.createTime);
                            return h(
                                "span",
                                {},
                                text
                            );
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                            let text = params.row.visible == 0 ? "下架" : "上架";
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
                                            this.$_remove_$(params.row.id)
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
                                            let a = JSON.parse(JSON.stringify(params.row));
                                            this.$_edit_$(a)
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
                                            this.$_changestatus_$(params.row)
                                        }
                                    }
                                }, text),
                            ]);
                        }
                    }
                ],
                $_formValidate_$: {
                    sortName: '',
                    number: '',
                },
                $_editForm_$: {
                    file: '',
                },
                $_addRuleValidate_$: {
                    name: [
                        {required: true, message: '请输入分类名称', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'},
                        {max: 20, message: '长度不能超过20', trigger: 'change'},
                    ],
                    level: [
                        {required: true, message: '请选择分类级别', trigger: 'change'}],
                    visible: [
                        {required: true, message: '请选择是否可见', trigger: 'change'},
                    ],
                    sortNum: [
                        {required: true, message: '请输入排序码', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'}
                    ],
                    info: [
                        {max: 100, message: '长度不能超过100', trigger: 'change'},
                    ]
                },
                $_ruleValidate_$: {
                    name: [
                        {required: true, message: 'The name cannot be empty', trigger: 'blur'}
                    ]
                },
                showTable: true
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.zoneId = JSON.parse(cookie).zoneId
            this.parent = this.$_row_$;
            this.$_list_$();
            this.$_flist_$();
        },
        watch: {
            showTable: function () {
                if (this.$_row_$.length == 0) {
                    return false
                } else {
                    return true
                }
            }

        },
        methods: {
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
            //获取一级分类
            $_flist_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/catalog/queryCatalogList`,
                    data: {
                        zoneId: this.zoneId,
                        level: '1',
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (let i = 0; i < arr.length; i++) {
                                var temp = {
                                    value: arr[i].id + '',
                                    label: arr[i].name
                                }
                                this.catlogList.push(temp)
                            }
                        } else {
                            this.$Message.error('获取一级分类失败!');
                        }
                    }
                })
            },
            // 获取分类列表
            $_list_$() {
                this.$_querycfg_$.mod = 'operate/catalog/queryCatalogList';
                this.$_querycfg_$.params.zoneId = this.zoneId
                this.$_querycfg_$.params.parent = this.parent;
                this.$_querycfg_$.params.level = '2';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data7_$ = rsp.data.data
                            // this.total = rsp.data.data.total

                        }
                    }
                })
            },
            // 编辑保存
            $_addEdit_$() {
                this.$_editForm_$.image = this.$_file_$.join(';')
                if (this.$_editForm_$.parent == null) {
                    this.$_editForm_$.parent = ''
                }
                if (this.$_editForm_$.bgImage == null) {
                    this.$_editForm_$.bgImage = ''
                }
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/operate/catalog/updateCatalog`,
                            data: {
                                id: this.$_editForm_$.id,
                                name: this.$_editForm_$.name,
                                info: this.$_editForm_$.info,
                                level: this.$_editForm_$.level + '',
                                parent: this.$_editForm_$.parent + '',
                                image: this.$_editForm_$.image,
                                bgimage: this.$_editForm_$.bgimage,
                                visible: this.$_editForm_$.visible + '',
                                sortNum: this.$_editForm_$.sortNum + '',
                                zoneId: this.$_editForm_$.zoneId
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_editmodal_$ = false
                                    this.$_editForm_$ = []
                                    this.$Message.success('数据更新成功!');
                                } else {
                                    this.$Message.error('数据更新失败!');
                                }
                            }
                        })
                    }
                })
            },
            // 上下架
            $_changestatus_$(row) {
                this.id = row.id + '';
                let text = row.visible == 0 ? "下架" : "上架";

                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认${text}该分类吗？</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.visible = 1 - row.visible;
                        this.upDown()
                    },
                    onCancel: () => {

                    }
                })
            },
            // 上下架方法
            upDown() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/catalog/upAndDownCatalog`,
                    data: {
                        id: this.id,
                        visible: this.visible
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_list_$();
                            this.$Message.success(rsp.data.data);
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_addSort_$(index) {
                this.$_modalSort_$ = true;
                for (let a = 0; a < this.$_row_$.length; a++) {
                    this.$_formValidate_$ = this.$_row_$[a];
                }

            },
            $_remove_$(index) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                        <p>确认删除该分类吗</p><br>
                `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/operate/catalog/delCatalog`,
                            data: {
                                id: index
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_list_$()
                                    this.$Message.success(rsp.data.data);
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                        // this.$_row_$.splice(index, 1);
                        // this.$Message.success('确认删除');
                    },
                    onCancel: () => {
                        // this.$Modal.remove()
                    }
                })
            },
            // 编辑
            $_edit_$(row) {
                this.$root.$_Route_$("user", "jump", "bjspfl", {row: row});
                /*this.imageList = []
                var arr = row.image.split(';')
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        this.imageList.push({
                            url: arr[i]
                        })
                    }
                }
                this.$_editForm_$ = row
                this.$_editForm_$.file = '123'    //  如果不选择修改图片时这样可以通过验证
                this.$_editForm_$.level = row.level + ''
                this.$_editForm_$.visible = row.visible + ''
                this.$_file_$ = []
                this.$_file_$ = arr
                this.$_editmodal_$ = true;*/

            },
            beforeuploadEdit(file) {
                return this.isLtMB(file);
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_editForm_$.file = res.data;
                this.fileChangeEdit(fileList);
                this.$refs.file.clearValidate();
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = ''
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
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
            fileRmoveEdit(fileList) {
                let a = ''
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
                // this.$set(this.$_editForm_$, 'images', this.$_file_$)
            },

        }
    }
</script>