<style scoped>
    .left {
        width: 60%;
        float: left;
    }

    .right {
        width: 35%;
        float: right;
    }

    .wrap {
        margin-top: 15px;
        width: 80%;
        border-radius: 6px;
        border: 1px solid #dddee1;
        padding: 15px;
    }

    .wrap .title {
        line-height: 25px;
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

    >>> .ivu-btn-ghost {
        color: #5AA7FF;
        border-color: #5AA7FF;
    }

    >>> .ivu-tree-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
        font-size: 14px;
    }

    >>> .ivu-checkbox + span {
        font-size: 14px;
    }
</style>
<template>
    <div>
        <!-- 表单 -->
        <div class="left">
            <Form ref="addForm" :rules="addFormValidate" :model="$_addForm_$" :label-width="80">
                <FormItem label="接收人" prop="users">
                    <Input v-model="$_usernamelist_$" disabled></Input>
                </FormItem>
                <FormItem label="通知类型" prop="types">
                    <Select v-model="$_addForm_$.types" @on-change="$_changeOption_$" style="width: 40%;">
                        <Option value="0">普通通知</Option>
                        <!-- <Option value="1">活动通知</Option> -->
                    </Select>
                    <Button v-show="$_modal1_$" type="primary" @click="$_choiceHd_$">选择活动</Button>
                    <div v-show="$_modal3_$">已选择活动“{{this.$_hdInfo_$.title}}”</div>
                </FormItem>
                <FormItem label="标题" prop="title">
                    <Input v-model="$_addForm_$.title"></Input>
                </FormItem>
                <FormItem label="摘要" prop="description">
                    <Input v-model="$_addForm_$.description" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
                <FormItem label="详情">
                    <quill-editor ref="myTextEditor" v-model="$_addForm_$.content" :options="quillOption"></quill-editor>

                </FormItem>
                <br><br>
                <FormItem label="通知附件">
                    <Upload
                            :before-upload="handleUploadFile"
                            :on-remove="handleRemoveFile"
                            :on-success="uploadSuccessFile"
                            :default-file-list="uploadList"
                            :action='this.$_global_$.filePath'>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                    </Upload>
                </FormItem>
                <!--                 <FormItem label="附件">
                                    <Upload
                                            :before-upload="handleUpload"
                                            :on-remove="handleRemove"
                                            :on-success="uploadSuccess"
                                            action="http://api.yhcode.com:88/oss/file/upload/form">
                                        <Button type="ghost" style="width: 85px">上传</Button>
                                    </Upload>
                                </FormItem> -->
                <FormItem align="center">
                    <Button type="primary" style="width: 85px" @click="$_send_$()">发送</Button>
                    <Button type="ghost" style="margin-left: 8px;width: 85px" @click="$_cancel_$()">取消</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 选择框 -->
        <div class="right">
            <div class="box1 line25" ref="step1">
                <div style="float:left; width:45%">
                    <span style="font-size:14px">部门列表：</span>
                    <Tree ref="tree"
                          :data="$_data_$"
                          @on-select-change="$_choice_$"
                          @on-check-change="$_check_$"
                          show-checkbox style="height: 520px;overflow: auto">
                    </Tree>
                </div>
                <div style="float: left; margin-left:10%; width: 35%; font-weight: normal;">
                    <span style="font-size: 14px;">部门员工列表：</span>
                    <span v-if="$_ygList_$.length == 0" style="font-size: 14px;"><br/>请选择部门查看</span>
                    <span v-else style="height: 520px;overflow: auto">
                        <CheckboxGroup @on-change="$_newData_$" style="margin-top: 8px;overflow-y:auto;height:400px;"
                                       v-model="checkAllGroup">
                            <Checkbox v-for="item in $_ygList_$" :label="item.id">
                                <span>{{item.name}}</span>
                            </Checkbox>
                        </CheckboxGroup>
                        </span>
                </div>
                <div style="clear: both"></div>
            </div>

        </div>
        <!-- 添加的弹框 -->
        <Modal v-model="$_modal2_$" title="选择活动" @on-cancel="$_cancel2_$" width="650">
            <Table border :columns="$_columns_$" :data="$_data2_$"></Table>
            <div slot="footer">
                <Button type="ghost" @click="$_cancel2_$">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import controler from './controler.js';
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config'

    // import * as Quill from 'quill'  //引入编辑器
    // //quill图片可拖拽改变大小
    // import ImageResize from 'quill-image-resize-module'
    //
    // Quill.register('modules/imageResize', ImageResize)


    export default {
        mixins: [controler],
        components: {
            quillEditor
        },
        mounted(){
            // quillConfig.initButton();
        },
        data() {

            const validatetime = (rule, value, callback) => {
                let regEn = /[`~!@#$%^&*_+<>:{}.\/'[\]]/im;
                let regCn = /[#￥ |]/im;
                if (regEn.test(value) || regCn.test(value)) {
                    callback('输入包含非法字符');
                } else {
                    callback();
                }
            };
            const validaReceiver = (rule, value, callback) => {
                if (this.$_ygInfo_$.length == 0) {
                    callback('请选择接收人');
                } else {
                    callback()
                }
            };
            return {
                quillOption: quillConfig,

                editorOption: {
                    modules:
                        {
                            // imageResize: {},
                            toolbar: '#toolbar',
                        }
                },
                $_modal1_$: false,   //选择活动按钮
                $_modal2_$: false,   //选择活动列表弹窗
                $_modal3_$: false,   //选择活动后显示已选择内容
                $_columns_$: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        width: 60
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: 'center',
                        width: 200
                    },
                    {
                        title: '有效期',
                        key: 'beginDate',
                        align: 'center',
                        render: (h, params) => {
                            let text = `${params.row.beginDate}--${params.row.endDate}`;
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
                        width: 80,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.choiceThis(params.row)
                                        }
                                    }
                                }, '选择'),
                            ]);
                        }
                    }
                ],
                $_data2_$: [],   //弹窗列表
                uploadList: [],
                $_name_$: '',
                $_hdInfo_$: {},
                $_addForm_$: {
                    users: '',
                    types: '',
                    title: '',
                    description: '',
                    content: '',
                    files: ''
                },
                addFormValidate: {
                    users: [
                        {required: true, validator: validaReceiver, trigger: 'change'}
                    ],
                    types: [
                        {required: true, message: '请选择通知类型', trigger: 'change'}
                    ],
                    title: [
                        {required: true, message: '请填写标题', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 100, message: '标题不能超过100字', trigger: 'change'},
                        //特殊字符验证
                        {validator: validatetime, trigger: 'change'}
                    ],
                    description: [
                        //长度验证
                        {type: 'string', max: 500, message: '摘要不能超过500字', trigger: 'change'},
                        //特殊字符验证
                        {validator: validatetime, trigger: 'change'}
                    ]
                },
                $_data_$: [],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                checkAllGroup: [],
                $_ygNum_$: 0,  //员工数量
                $_ygInfo_$: [],
                $_ygList_$: [],
                baseUrl: this.$_global_$.imgPath,
                userInfo: {},
                $_bumen_$: [],
                $_usernamelist_$: '',
                $_current_$: 0,
                companyId: 0,
                user: [],
                files: []
            }

        },
        created() {
            this.$_global_$.serverPath
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            // this.$_list_$();
            this.$_list_$();
            // this.getResources()
        },
        methods: {
            //右侧获取企业、员工列表 start
            $_choice_$(rep) {
                this.$_ygList_$ = [];
                this.$_ygInfo_$ = [];
                this.$_usernamelist_$ = '';

                if (rep.length > 0) {
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/company/company/${this.userInfo.enterpriseId}/department/${rep[0].id}/employee`,
                        data: {}
                    }).then(rsp => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.checkAllGroup = [];
                                if (rsp.data.data.records.length > 0) {
                                    for (let j = 0; j < rsp.data.data.records.length; j++) {
                                        this.$_ygList_$.push(rsp.data.data.records[j]);
                                    }
                                }
                            }
                        }
                    });
                }
            },
            $_choice1_$(rep) {
                this.checkAllGroup = [];
                if (rep.length > 0) {
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/company/company/${rep[0].enterpriseId}/department/${rep[0].id}/employee`,
                        data: {}
                    }).then(rsp => {
                        // this.$_djqForm_$.recvCount = rsp.data.data.records.length;
                        this.$_ygNum_$ = rsp.data.data.records.length;
                        if (rsp.data.data.records.length > 0) {

                            if (rep[0].isNoQX) {
                                let arr = [];

                                for (let j = 0; j < rsp.data.data.records.length; j++) {
                                    this.$_ygList_$.push(rsp.data.data.records[j]);
                                }
                                this.$_ygInfo_$ = this.$_ygList_$;

                                for (let i = 0; i < this.$_ygInfo_$.length; i++) {
                                    arr.push(this.$_ygInfo_$[i].name);
                                }
                                this.$_usernamelist_$ = arr.join(';');
                            } else {
                                this.$_ygInfo_$ = rsp.data.data.records;
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
                    ;
                    if (arr[i].child != null) {
                        temp.children = this.$_digui_$(arr[i].child)
                    }
                    children.push(temp)
                }
                return children;
            },
            $_check_$(e) {
                this.checkAllGroup = [];
                this.$_ygList_$ = [];
                this.$_ygInfo_$ = [];
                this.$_usernamelist_$ = '';

                if (e.length > 0) {
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
                    for (let i = 0; i < resData.length; i++) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/company/company/${this.userInfo.enterpriseId}/department/${resData[i].id}/employee`,
                            data: {}
                        }).then(rsp => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    let arr = [];
                                    if (rsp.data.data.records.length > 0) {
                                        for (let j = 0; j < rsp.data.data.records.length; j++) {
                                            this.$_ygList_$.push(rsp.data.data.records[j]);
                                        }
                                        this.$_ygInfo_$ = this.$_ygList_$;

                                        for (let i = 0; i < this.$_ygInfo_$.length; i++) {
                                            arr.push(this.$_ygInfo_$[i].name);
                                        }
                                        this.$_usernamelist_$ = arr.join(';');
                                    }
                                }
                            } else {
                                this.$Message.error("获取失败，请重试！！！！");
                            }
                        })
                    }
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
            //右侧获取企业、员工列表 end


            //选择通知类型
            $_changeOption_$(vl) {
                this.$_modal3_$ = false;
                this.$_hdInfo_$ = {};
                if (vl == 1) {
                    //活动通知，应弹出活动列表勾选
                    this.$_modal1_$ = true;
                } else {
                    //普通通知
                    this.$_modal1_$ = false;
                }

            },
            //选择活动按钮
            $_choiceHd_$() {
                this.$_modal2_$ = true;
                this.$_data2_$ = [];

                //请求活动列表
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/company/activity/search`,
                    data: {
                        pageNum: 1,
                        pageSize: 99999,
                    },
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data.records.length > 0) {
                                //有活动
                                let list = rsp.data.data.records;

                                //获取当前时间的时间戳
                                let nowtime = new Date().getTime();

                                for (let i = 0; i < list.length; i++) {
                                    //活动必须为上架的活动
                                    if (list[i].status == 1) {
                                        //获取当前活动结束时间的时间戳
                                        let et = Date.parse(new Date(list[i].endDate));

                                        //需要满足结束时间必须长于当前时间点至少一个小时
                                        if ((et - nowtime) >= 1000 * 60 * 60) {
                                            this.$_data2_$.push(list[i]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                })

            },
            //取消活动列表弹窗
            $_cancel2_$() {
                this.$_modal2_$ = false;
                this.$_modal3_$ = false;
                this.$_hdInfo_$ = {};
            },
            //选择该活动
            choiceThis(item) {
                this.$_hdInfo_$ = item;
                this.$_modal2_$ = false;
                this.$_modal3_$ = true;
            },
            // 获取当前公司信息
            $_list_$() {
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

            // 文件上传
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
            //   发送
            $_send_$() {
                if(this.files){
                    this.$set(this.$_addForm_$, 'files', JSON.stringify(this.files));
                }else{
                    this.$_addForm_$.files=this.files;
                }
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        if (this.$_addForm_$.types == 1) {
                            if (!this.$_hdInfo_$.id) {
                                this.$Message.error('请选择一个活动');
                                return false;
                            }
                        }
                        this.user = [];
                        for (let i = 0; i < this.$_ygInfo_$.length; i++) {
                            let thuser = {"uid": 0, "read": 0, "name": ''};
                            thuser.uid = this.$_ygInfo_$[i].id;
                            thuser.name = this.$_ygInfo_$[i].name;
                            this.user.push(thuser);
                        }
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/company/notice`,
                            data: {
                                "description": this.$_addForm_$.description,
                                "zoneId": this.userInfo.zoneId,
                                "files": this.$_addForm_$.files,
                                "enterpriseId": this.userInfo.enterpriseId,
                                "title": this.$_addForm_$.title,
                                "type": Number(this.$_addForm_$.types),
                                "activityId": Number(this.$_hdInfo_$.id),
                                "content": this.$_addForm_$.content,
                                "users": JSON.stringify(this.user),
                                "sendType": 1
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$root.$_Route_$('employer', 'work', 'tzfb', {})
                                } else {
                                    this.$Message.error('通知发布失败!');
                                }
                            }
                        })
                    }
                })
            },
            // 取消
            $_cancel_$() {
                this.$root.$_Route_$('employer', 'work', 'tzfb', {})
            },

            $_newData_$(e) {
                let arr = [];
                let arr1 = [];
                for (let i = 0; i < e.length; i++) {
                    for (let j = 0; j < this.$_ygList_$.length; j++) {
                        if (e[i] === this.$_ygList_$[j].id) {
                            arr.push(this.$_ygList_$[j]);
                        }
                    }
                }
                this.$_ygInfo_$ = arr;
                for (let i = 0; i < this.$_ygInfo_$.length; i++) {
                    arr1.push(this.$_ygInfo_$[i].name);
                }
                this.$_usernamelist_$ = arr1.join(';');
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
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