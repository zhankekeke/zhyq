<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .message {
        font-size: 20px;
        color: #666;
        font-weight: 500;
        box-sizing: border-box;
        padding: 0 30px;
    }

    .style1 {
        font-size: 12px;
        line-height: 42px;
    }

    .style2 {
        font-size: 18px;
        color: #ff9900;
        margin: 0 10px;
    }<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .zdtb {
        font-size: 12px;
        /* padding:0px 5% 0px 5%; */
        color: #666;
        line-height: 18px;
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

    .top-height {
        height: 76px;
    }


</style>
<template>
    <div class="zdtb">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="问题名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入问题名称"></Input>
                </FormItem>

                <FormItem label="问题分类" prop="classifyId">
                    {{classify}}
                </FormItem>

                <FormItem label="问题描述" prop="info">
                    <quill-editor ref="myTextEditor" v-model="formValidate.info" :options="quillOption"></quill-editor>

                </FormItem>
            </Form>
            <div slot="footer" class="dialog-footer">
                <Button size="large" @click="$_quit_$">取消</Button>
                <Button type="primary" size="large" @click="$_upDataQuestion_$()">确定</Button>
            </div>
    </div>


</template>


<script>
    import {
        Button,
        Form,
        Dialog,
        Input,
        FormItem,
        Select,
        Upload,
        Option,
        Radio
    }
        from "element-ui";
    import controler from "./controler.js";
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config'


    export default {
        mixins: [controler],
        components: {
            quillEditor,
            // expandTable,
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Select.name]: Select,
            [Upload.name]: Upload,
            [Option.name]: Option,
            [Radio.name]: Radio
        },
        data() {
            return {
                classify:'选择分类',
                secondselect:[],
                quillOption: quillConfig,

                editorOption: {modules: {toolbar: '#toolbar'}},
                $_modelQuestion_$: false,
                $_modelQuestionUP_$: false,
                $_userInfo_$: '',
                total: 0,
                parentSelect: [], // 一级分类列表
                parent: [],
                $_questionList_$: [],
                $_querycfg_$: {
                    mod: 'module',
                    params: {
                        //hcuancan
                    }
                },
                $_data2_$: [
                    {
                        title: '问题分类',
                        expand: true,
                        children: []
                    }
                ],
                $_columns7_$: [
                    {
                        title: '序号',
                        key: 'number',
                        width: 100,
                        align: 'center',
                    },
                    {
                        title: '问题名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '排序号',
                        key: 'sortNum',
                        align: 'center',
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            var a = params.row.putaway == 0 ? '上架' : '下架';
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 250,
                        render: (h, params) => {
                            var a = params.row.putaway == 1 ? '上架' : '下架';
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
                                            this.$_editQuestion_$(params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#67c23a"

                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params.row)
                                        },
                                    }
                                }, '删除'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            this.$_downShelf_$(params.row)
                                        }
                                    }
                                }, a)
                            ]);
                        }
                    }
                ],
                $_params_$: '',
                formValidate: {
                    classifyId: null,
                    classifyName: '',
                    name: '',
                    id: '',
                    info: ''
                },

                ruleValidate: {
                    name: [
                        {required: true,message: '问题名称不能为空', trigger: 'change'},
                        // {type: 'string',validator:this.$_validatestr_$, trigger: 'change'},
                        {
                          type:'string', max: 20,message: '问题名称不能超过20字',trigger: 'change'
                        }
                    ],
                    classifyId: [
                        {required: true, message: '不能为空', trigger: 'change'}
                    ]
                }
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.formValidate = this.$root.inparams.row;
            this.classify=this.formValidate.classifyName
            // this.$_queryClassifyList_$();
        },
        methods: {
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_queryCommonProblemsPageList_$();
            },
            $_sortManage_$() {
                this.$root.$_Route_$('user', 'jump', 'bzzxflgl', {id: 1})
            },
            $_addQuestion_$() {
                this.formValidate = {};
                this.$_modelQuestion_$ = true
            },
            $_editQuestion_$(params) {
                this.formValidate = params;
                this.$_modelQuestionUP_$ = true
            },
            $_quit_$() {
                this.$root.$_Route_$('user', 'bzzx', 'question', {})
            },
            $_remove_$(params) {
                this.$Modal.confirm({
                    title: '提示',
                    content: ` <p>确认删除该问题吗</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_delQuestion_$(params.id);
                    },
                    onCancel: () => {
                        this.$Modal.remove();
                    }
                })
            },
            $_downShelf_$(params) {
                var a = params.putaway == 1 ? '上架' : '下架';
                this.$Modal.confirm({
                    title: '提示',
                    content: ` <p>确认${a}问题吗</p><br> `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_upAndDownQuestion_$(params);
                    },
                    onCancel: () => {
                        this.$Modal.remove();
                    }
                });
            },

            $_createQuestion_$() {

                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/commonProblems/createCommonProblems`,
                            data: {
                                name: this.formValidate.name,
                                info: this.formValidate.info,
                                classifyId: this.formValidate.classifyId,
                                // classifyName: this.$_getClassifyName_$(this.formValidate.classifyId),
                                classifyName:this.classify,
                                putaway: "0",
                                zoneId: this.$_userInfo_$.zoneId,
                                sortNum: "1"
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$root.$_Route_$('user', 'bzzx', 'question', {})
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    }
                })

            },
            $_upDataQuestion_$() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/commonProblems/updateCommonProblems`,
                            data: {
                                id: this.formValidate.id,
                                name: this.formValidate.name,
                                info: this.formValidate.info,
                                classifyId: this.formValidate.classifyId,
                                // classifyName: this.$_getClassifyName_$(this.formValidate.classifyId),
                                classifyName:this.classify,
                                putaway: "0",
                                zoneId: this.$_userInfo_$.zoneId,
                                sortNum: "1"
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$root.$_Route_$('user', 'bzzx', 'question', {})
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    }
                })
            },
            $_delQuestion_$(id) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/steward/commonProblems/delCommonProblems`,
                    data: {id: id},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success('删除成功');
                            this.$_queryCommonProblemsPageList_$();
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_upAndDownQuestion_$(params) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/steward/commonProblems/upAndDownCommonProblems`,
                    data: {id: params.id, putaway: 1 - params.putaway},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success('操作成功');
                            this.$_queryCommonProblemsPageList_$();
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_queryClassifyList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/steward/classify/queryClassifyList`,
                    data: {zoneId: this.$_userInfo_$.zoneId, level: 1},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                var select = {}
                                var a = {}
                                temp = {
                                    title: arr[i].name,
                                    id: arr[i].id,
                                    zoneId: arr[i].zoneId,
                                    loading: false,
                                    children: []
                                };
                                select = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                };
                                a = {
                                    id: arr[i].id,
                                    zoneId: arr[i].zoneId
                                };
                                this.$_data2_$[0].children.push(temp)
                                this.parentSelect.push(select)
                                this.parent.push(a)
                            }
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            // 获取子分类
            $_loadsec_$(val) {
                val=val.split(',');
                this.classify=val[1];
                this.formValidate.classifyId=val[0];
                this.secondselect=[];
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/steward/classify/queryClassifyList`,
                    data: {zoneId: this.$_userInfo_$.zoneId, level: 2, parentId: val[0],putaway:0},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            var data = [];
                            if (arr.length == 0) {
                                // this.$Message.success("该分类下暂无子分类!")
                            } else {
                                for (var i = 0; i < arr.length; i++) {
                                    var temp = {};
                                    temp = {
                                        id: arr[i].id,
                                        title: arr[i].name,
                                        parentId: arr[i].parentId,
                                        zoneId: arr[i].zoneId
                                    }
                                    data.push(temp)
                                }
                                this.secondselect=data;
                            }
                            // callback(data)
                        }
                    }
                })
            },
            // 获取一级子分类
            loadData(item, callback) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/steward/classify/queryClassifyList`,
                    data: {zoneId: this.$_userInfo_$.zoneId, level: 2, parentId: item.id},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            var data = [];
                            if (arr.length == 0) {
                                this.$Message.success("该分类下暂无子分类!")
                            } else {
                                for (var i = 0; i < arr.length; i++) {
                                    var temp = {};
                                    temp = {
                                        id: arr[i].id,
                                        title: arr[i].name,
                                        parentId: arr[i].parentId,
                                        zoneId: arr[i].zoneId
                                    }
                                    data.push(temp)
                                }
                            }
                            callback(data)
                        }
                    }
                })
            },
            $_queryCommonProblemsPageList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/steward/commonProblems/queryCommonProblemsPageList`,
                    data: {
                        zoneId: this.$_userInfo_$.zoneId,
                        classifyId: null,
                        current: this.$_querycfg_$.params.pageNum
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let rtmp = rsp.data.data.records;
                            for (let i = 0; i < rtmp.length; i++) {
                                rtmp[i].number = i + 1;
                            }
                            this.$_questionList_$ = rtmp;
                            this.total = rsp.data.data.total
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_queryCommonProblemsPageLists_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/steward/commonProblems/queryCommonProblemsPageList`,
                    data: {
                        zoneId: this.$_userInfo_$.zoneId,
                        classifyId: this.formValidate.classifyId,
                        current: this.$_querycfg_$.params.pageNum
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let rtmp = rsp.data.data.records;
                            for (let i = 0; i < rtmp.length; i++) {
                                rtmp[i].number = i + 1;
                            }
                            this.$_questionList_$ = rtmp;
                            this.total = rsp.data.data.total
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_checkItem_$(e) {
                this.formValidate.classifyId = e[0].id;
                this.$_queryCommonProblemsPageLists_$()
            },
            $_getClassifyName_$(classifyId) {
                for (var i = 0; i < this.parentSelect.length; i++) {
                    if (this.parentSelect[i].value == classifyId) {
                        return this.parentSelect[i].label
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
