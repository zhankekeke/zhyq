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
        width: 148px;
        height: 148px;
        display: block;
    }

    >>>.ivu-tree-title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:80%;
        font-size: 14px;
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
        <Row>
            <Col span="4" style="border-right: 1px solid #f5f5f5;height: 530px;overflow: auto;">
                <Tree :data="$_treeData_$"
                      @on-select-change="$_choice_$"></Tree>
            </Col>
            <Col span="19" style="margin-left: 20px;">
                <Row class='Row' style="background-color: #f5f5f5;padding-left: 15px;font-size: 14px;">
                    员工姓名：<Input v-model='$_searchMes_$' placeholder="请输入员工姓名" style="width: 200px;margin-right: 28px;"></Input>
                    员工手机号：<Input v-model='$_searchphone_$' placeholder="请输入员工手机号" style="width: 200px"></Input>
                    <Button type="primary" style="margin-left: 20px" @click="search">搜索</Button>
                </Row>
                <Row class='Row'>
                    <Table :columns="$_columns_$" :data="$_data_$" ref="selection"></Table>
                </Row>
                <Row class='Row right'>
                    <Col style="text-align: left" span="12">共有{{total}}条数据</Col>
                    <Page align="right" :total="total"
                          show-elevator show-sizer
                          :page-size="$_pageSize_$"
                          @on-page-size-change="$_pageNum_$"
                          @on-change="$_changePage_$"/>
                </Row>
            </Col>
        </Row>
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
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validatephone = (rule, value, callback) => {
                if (!(/^1[345789]\d{9}$/.test(value))) {
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
                $_columns_$: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 100,
                        align: 'center',
                    }, {
                        title: '姓名',
                        key: 'name',
                        align: 'center',
                    }, {
                        title: '性别',
                        key: 'sex',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if(params.row.sex ==0 ){
                               a = '男'
                           }else{
                               a = '女'
                           }
                            return h("span", {}, a);
                        }
                    }, {
                        title: '联系方式',
                        key: 'phoneNumber',
                        align: 'center',
                    }, {
                        title: '部门',
                        key: 'departmentName',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if(params.row.departmentName){
                               a = params.row.departmentName
                           }else{
                               a = '未分配员工'
                           }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '职务',
                        key: 'position',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if(params.row.position){
                               a = params.row.position
                           }else{
                               a = '员工'
                           }
                            return h("span", {}, a);
                        }
                    }, {
                        title: '邮箱',
                        key: 'emailUrl',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if(params.row.emailUrl){
                               a = params.row.emailUrl
                           }else{
                               a = '-'
                           }
                            return h("span", {}, a);
                        }
                    }, 
                    {
                        title: '生日',
                        key: 'brithday',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if(params.row.brithday){
                               a = params.row.brithday.substr(0,10) 
                           }else{
                               a = '-'
                           }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '注册时间',
                        key: 'regDate',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if(params.row.regDate){
                               a = params.row.regDate.substr(0,10) 
                           }else{
                               a = params.row.regDate
                           }
                            return h("span", {}, a);
                        }
                    }
                ],
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
                uurl:'',
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
                    $_password_$:'',
                    createDate: '',
                },
                $_file_$: [],
                baseUrl: 'http://img.yhcode.com:88/',
                $_editModal_$: false,
                $_editForm_$: {},
                // imageList: [],
                $_bumenName_$: '', // 所属部门

            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            this.$_list_$();
            this.$_listbum_$();
        },
        methods: {
            // 切换部门
            $_choice_$(rep) {
                if(!rep[0].id){
                   rep[0].id = 0
                }
                if(rep[0].id==0 && rep[0].parentId=='top'){
                        this.$_list_$();        
                }else{
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
                                this.total = rsp.data.data.total*1;
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
            $_dg_$(data,bianji=false) {
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
                        if(bianji){
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
            // 加载数据
            $_list_$() {
                this.$_querycfg_$.mod = 'company/company/' + this.userInfo.enterpriseId + '/employee/search';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data_$ = rsp.data.data.records;
                            this.total = rsp.data.data.total*1;
                            // if (this.$_data_$ != null)
                            //     this.$_drMes_$ = this.$_data_$[0]
                        }
                    }
                })
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
            $_listbum_$(){
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
                    } else {
                        this.$Message.error(rsp.data.message);
                    }
                }
            })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_list_$();
            },
            // 搜索
            search() {
                if (this.$_searchMes_$) {
                    this.$_querycfg_$.params.name = this.$_searchMes_$;
                    this.$_list_$();
                }else{
                    delete this.$_querycfg_$.params.name;
                    this.$_list_$();
                }
                if (this.$_searchphone_$) {
                    this.$_querycfg_$.params.phoneNum = this.$_searchphone_$;
                    this.$_list_$();
                }else{
                    delete this.$_querycfg_$.params.phoneNum;
                    this.$_list_$();
                }
            },
            $_drcancel_$() {
                this.$Message.info('已取消');
            },
            $_modal2_$(){
                this.$_jsfpModal_$ = false;
            },

            $_render1_$(item) {
                return item.label;
            },
            $_quxiao_$(){
                this.$_editModal_$ = false;
                // this.$_list_$();

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
            // 新增选择树形
            $_choiceDepartment_$(rep) {
                this.$_addForm_$.departmentId = rep[0].id;
                this.$_editForm_$.departmentId = rep[0].id;
            },
            $_exportData_$() {
                this.$refs.selection.exportCsv({
                    filename: '员工信息'
                });
            },
        }
    }
</script>

