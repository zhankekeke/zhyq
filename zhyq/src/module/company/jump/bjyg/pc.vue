<style scoped>
    .Row {
        padding: 15px 0;
    }

    .Row button {
        margin-left: 20px;
    }

    .right {
        text-align: right;
    }

    .center {
        text-align: center;
    }

    .modal {
        font-size: 16px;
    }

    .modal p {
        line-height: 30px;
    }

    .title {
        display: inline-block;
        width: 100px;
        text-align: right;
    }

    .ivu-modal-footer {
        padding: 0px;
        border: none;
    }

    .add .ivu-form-item button {
        margin-right: 20px;
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

    >>> .ivu-tree-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
    }

    /* .portrait >>>.ivu-form-item-label:before{
         content: "*";
         display: inline-block;
         margin-right: 4px;
         line-height: 1;
         font-family: SimSun;
         font-size: 12px;
         color: #ed3f14;
     }*/
</style>
<template>
    <div>
        <!-- 编辑员工 -->
        <!-- <Modal class='add' v-model="$_editModal_$" title="员工基本信息" :mask-closable="false"> -->
        <Form ref="editForm" :model="$_editForm_$" :label-width="120" :rules="$_ruleValidate_$">
            <FormItem label="头像" prop="file" class="portrait">
                <el-upload
                        class="avatar-uploader"
                        :action="this.$_global_$.imgUploadPath"
                        list-type="picture-card"
                        ref="uploadxls"
                        :show-file-list="false"
                        :before-upload="beforeuploadEdit"
                        :on-remove="handleRemoveEdit"
                        :on-success="uploadSuccessEdit"
                                        accept="image/png,image/gif,image/jpg,image/jpeg">
                    <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
                    <img v-if="$_file_$.length>0" :src="$_global_$.imgPath + $_file_$[0]" class="avatar"/>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span style="color: #f00">建议图片尺寸：100*100</span>
            </FormItem>
            <FormItem label="员工姓名：" prop="name">
                <Input v-model="$_editForm_$.name" placeholder="请输入员工姓名"></Input>
            </FormItem>
            <FormItem label="员工性别：" prop="sex">
                <RadioGroup v-model="$_editForm_$.sex">
                    <Radio label="0">男</Radio>
                    <Radio label="1">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="联系方式：" prop="phoneNumber">
                <Input v-model="$_editForm_$.phoneNumber" placeholder="请输入联系方式" disabled></Input>
            </FormItem>
            <FormItem label="邮箱：" prop="emailUrl">
                <Input v-model="$_editForm_$.emailUrl"></Input>
            </FormItem>
            <FormItem label="生日：" prop="brithday">
                <!-- <DatePicker type="date" placeholder="Select date" v-model="$_addForm_$.brithday"></DatePicker> -->
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择一个日期" style="width: 200px"
                            v-model="$_editForm_$.brithday"></DatePicker>
            </FormItem>
            <FormItem label="所属部门：">
                <Tree :data="$_treeData1_$"
                      @on-select-change="$_choiceDepartment_$" :multiple="false"></Tree>
            </FormItem>
            <FormItem label="职务：" prop="position">
                <Input v-model="$_editForm_$.position" placeholder="请输入职务"></Input>
            </FormItem>
            <FormItem label="入职时间：" prop="createDate">
                <!-- <DatePicker type="date" format="yyyy-MM-dd" placeholder="Select date" v-model="$_addForm_$.createDate"></DatePicker> -->
                <DatePicker
                        format="yyyy-MM-dd"
                        type="date" placeholder="选择一个日期"
                        v-model="$_editForm_$.createDate"
                        style="width: 200px"></DatePicker>
            </FormItem>
        </Form>
        <div slot="footer">
            <center>
                <Button type="ghost" @click='$_quxiao_$()'>取消</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" @click="$_editok_$()">保存</Button>
            </center>
            <!-- <Button type="ghost" @click='$_quxiao_$()'>取消</Button>
            <Button type="primary" @click='$_editok_$()'>确定</Button> -->
        </div>
        <!-- </Modal> -->
    </div>

</template>
<script>
    import controler from './controler.js';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import {Upload} from 'element-ui';

    export default {
        components: {
            [Upload.name]: Upload
        },
        mixins: [controler],
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$.length > 0) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validatephone = (rule, value, callback) => {
                if (!(/^1[3456789]\d{9}$/.test(value))) {
                    callback('请输入正确的手机号');
                } else {
                    callback();
                }
            };
            return {
                userInfo: {},
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_treeData_$: [
                    {
                        title: "所有部门",
                        expand: true,
                        parentId: 'top',
                        children: []
                    }
                ], // 树形数据
                $_treeData1_$: [
                    {
                        title: "所有部门",
                        expand: true,
                        parentId: 'top',
                        disabled: true,
                        children: []
                    }
                ], // 编辑员工时的树形数据
                //部门数据
                $_bumen_$: [],
                //编辑员工时，用到的部门数据
                $_bumen1_$: [],
                $_searchMes_$: '',
                $_searchnum_$: '',
                $_searchphone_$: '',
                $_data_$: [],
                total: 0,
                $_pageSize_$: 10,
                $_drModal_$: false,//调入
                $_drMes_$: '',
                $_jsfpModal_$: false,//角色分配
                $_data1_$: [],
                $_targetKeys1_$: [],
                del: [],
                $_array_$: ['系统角色', '已授予角色'],
                employed: '',
                uurl: '',
                yjfpRole: [],
                selected: [],
                $_addModal_$: false,//新增员工
                $_addForm_$: {
                    faceUrl: '',
                    name: '',
                    sex: '',
                    phoneNumber: '',
                    brithday: '',
                    emailUrl: '',
                    departmentId: '',
                    roleName: '',
                    $_password_$: '',
                    createDate: '',
                },
                $_file_$: [],
                baseUrl: 'http://img.yhcode.com:88/',
                $_ruleValidate_$: {
                    name: [
                        {required: true, message: '员工姓名不能为空', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'},
                        {max: 20, message: '员工姓名不能超过20字', trigger: 'change'}
                    ],
                    sex: [
                        {required: true, message: '性别不能为空', trigger: 'blur'}
                    ],
                    phoneNumber: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {validator: validatephone, trigger: 'change'}
                    ],
                    emailUrl: [
                        // {required: true,message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不对！', trigger: 'blur'}
                    ],
                    position: [
                        {required: true, message: '职务不能为空', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'},
                        {max: 20, message: '员工职务不能超过20字', trigger: 'change'}
                    ],
                },
                $_editModal_$: false,
                $_editForm_$: {},
                row: {},
                // imageList: [],
                $_bumenName_$: '', // 所属部门

            }
        },
        created() {
            this.row = this.$root.inparams.row;
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            // this.$_list_$();
            this.$_listbum_$();
        },
        methods: {
            // 切换部门
            $_choice_$(rep) {
                if (!rep[0].id) {
                    rep[0].id = 0
                }
                if (rep[0].id == 0 && rep[0].parentId == 'top') {
                    this.$_list_$();
                } else {
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/company/company/` + this.userInfo.enterpriseId + `/department/${rep[0].id}/allemployee`,
                        data: {},
                        headers: {"Content-type": "application/json"}
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_data_$ = [];
                                this.$_data_$ = rsp.data.data.records;
                                this.total = rsp.data.data.total * 1;
                            }
                        }
                    })
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
            $_dg_$(data, bianji = false) {
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
                    /*if(choiceId !=0 && item.id==choiceId){
                        item.selected = true;
                    }*/
                    item.expand = true;
                    item.title = item.name;
                    item.children = [];
                    // 以当前遍历项，parentId,去map对象中找到索引的id
                    let parent = map[item.parentId];
                    if (parent) {
                        if (bianji) {
                            parent.disabled = true;
                        }
                        (parent.children || (parent.children = [])).push(item);
                    } else {
                        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶
                        val.push(item);
                    }
                });
                return val;
            },
            $_digui_$(arr) {
                var children = [];
                for (var i = 0; i < arr.length; i++) {
                    var temp = {
                        title: arr[i].name,
                        enterpriseId: arr[i].enterpriseId,
                        id: arr[i].id,
                        parentId: arr[i].parentId,
                    };
                    if (arr[i].child != null) {
                        temp.children = this.$_digui_$(arr[i].child)
                    }
                    children.push(temp)
                }
                return children;
            },
            $_listbum_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/company/company/${this.userInfo.enterpriseId}/department`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            this.$_bumen_$ = [];
                            for (let i = 0; i < arr.length; i++) {
                                this.$_bumen_$.push(arr[i]);
                                if (arr[i].child) {
                                    this.$_hy_$(arr[i]);
                                }
                            }
                            this.$_treeData_$[0].children = this.$_digui_$(arr);
                            this.$_bianji_$();
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            // 详情
            $_xiangqing_$(row) {
                this.$root.$_Route_$('company', 'jump', 'glxq', {row: row})
            },

            // 编辑
            $_bianji_$() {
                this.$_bumen1_$ = JSON.parse(JSON.stringify(this.$_bumen_$));
                for (let i = 0; i < this.$_bumen1_$.length; i++) {
                    if (this.$_bumen1_$[i].name == '未分配员工') {
                        this.$_bumen1_$.splice(i, 1);
                    }
                }
                let bumen = this.$_dg_$(this.$_bumen1_$, true);
                this.$_treeData1_$[0].children = bumen;

                //增加选中项
                let idStr = '\"id\":' + this.row.departmentId + ',';
                let str = JSON.stringify(this.$_treeData1_$);
                let reg = new RegExp('\"id\":' + this.row.departmentId + ',', 'g');
                let news = str.replace(reg, idStr + '\"selected\": true,');
                this.$_treeData1_$ = JSON.parse(news);

                // this.imageList = [];
                this.$_editForm_$ = this.row;
                // this.imageList.push({url: row.faceUrl});
                this.$_file_$ = [];
                if (this.row.faceUrl) {
                    this.$_file_$.push(this.row.faceUrl);
                }

                this.$_editForm_$.sex = '' + this.row.sex;
                if (!this.$_editForm_$.position) {
                    this.$_editForm_$.position = '员工'
                }
                this.$_editlist_$();
                this.$_editModal_$ = true
            },
            $_quxiao_$() {
                this.$root.$_Route_$('company', 'orginza', 'ygmanage', {});
            },
            // 编辑确定
            $_editok_$() {

                this.$_editForm_$.faceUrl = this.$_file_$[0];

                if (this.$_editForm_$.brithday) {
                    this.$_editForm_$.brithday = this.FormatAllDate(this.$_editForm_$.brithday)
                } else {
                    this.$_editForm_$.brithday = null
                }
                if (this.$_editForm_$.createDate) {
                    this.$_editForm_$.createDate = this.FormatAllDate(this.$_editForm_$.createDate)
                } else {
                    this.$_editForm_$.createDate = null
                }
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: `${this.$_global_$.serverPath}/company/company/` + this.userInfo.enterpriseId + `/employee`,
                            data: {
                                faceUrl: this.$_editForm_$.faceUrl,
                                phoneNumber: this.$_editForm_$.phoneNumber,
                                code: this.$_editForm_$.code,
                                sex: Number(this.$_editForm_$.sex),
                                name: this.$_editForm_$.name,
                                id: this.$_editForm_$.id,
                                brithday: this.$_editForm_$.brithday,
                                emailUrl: this.$_editForm_$.emailUrl,
                                departmentId: this.$_editForm_$.departmentId,
                                position: this.$_editForm_$.position,
                                createDate: this.$_editForm_$.createDate
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("更新成功!");
                                    this.$root.$_Route_$('company', 'orginza', 'ygmanage', {});
                                } else {
                                    this.$Message.error("更新失败!")
                                }
                            }
                        })
                    } else {

                    }
                })
            },
            $_editlist_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/company/` + this.userInfo.enterpriseId + `/department`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i].id == this.$_editForm_$.departmentId) {
                                    this.$_bumenName_$ = arr[i].name
                                } else {
                                    if (arr[i].child === null) {

                                    } else {
                                        this.$_editdg_$(arr[i].child)
                                    }
                                }
                            }
                        }
                    }
                })
            },
            //菜单递归 编辑用
            $_editdg_$(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == this.$_editForm_$.departmentId) {
                        this.$_bumenName_$ = data[i].name
                    } else {
                        if (data[i].child === null) {

                        } else {
                            this.$_editdg_$(data[i].child)
                        }
                    }
                }
            },
            // 格式化时间
            FormatAllDate(sDate) {

                var date = new Date(sDate);
                var seperator1 = "-";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                //月
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                //日
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }

                return date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + '00:00:00';
            },
            //取消新增框
            addModalCancel() {
                this.$refs['addForm'].resetFields();
            },
            // 新增按钮
            addBtn() {
                this.$root.$_Route_$('company', 'jump', 'zxyg', {});
            },
            // 新增选择树形
            $_choiceDepartment_$(rep) {
                this.$_addForm_$.departmentId = rep[0].id;
                this.$_editForm_$.departmentId = rep[0].id;
            },
            // upload的自己上传
            beforeupload(file) {
                // this.$set(this.$_addForm_$, 'images',this.$_file_$) // 向表单数据中添加图片数组
            },
// 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_addForm_$.file = res.data;
                this.fileChange(fileList);
                // this.$_file_$ = URL.createObjectURL(file.raw);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = '';
                this.$_file_$ = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = temp_str

                            }
                        }
                    }
                }

                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.$_global_$.imgPath + temp_str
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
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
                // this.$refs.file.clearValidate();
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = '';
                this.$_file_$ = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = temp_str

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
                let a = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = temp_str
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
            },
            $_exportData_$() {
                this.$refs.selection.exportCsv({
                    filename: '员工信息'
                });
            },
        }
    }
</script>

