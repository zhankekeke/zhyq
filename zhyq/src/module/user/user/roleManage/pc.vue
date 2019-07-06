<style scoped>
    .lm {
        color: red;
        font-size: 20px;
    }

    .zdtb {
        font-size: 12px;
        /* padding:0px 5% 0px 5%; */
        color: #666;
        line-height: 18px;
        font-family: "MicrosoftYaHei", "Microsoft YaHei";
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

    .mt300 {
        margin-top: 300px;
    }
</style>
<template>
    <div class="zdtb">
        <!-- <div class="company-manabge bg">
            角色层级：&nbsp;
            <Select v-model="$_modelsle_$" style="width:200px" placeholder="全部">
                <Option v-for="item in $_cityList_$" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="primary" @click="$_handleSearch_$()">搜索</Button>
        </div> -->
        <Row>
            <Col span="4" offset="20" align="right" pull="1">
                <Button type="primary" @click="$_addRole_$" class="mt10">+ 新增角色</Button>
                <!-- 创建角色 -->
                <Modal v-model="$_modelRole_$" title="角色信息" :mask-closable="false">
                    <Form ref="$_newRolev_$" :model="$_newRole_$" :rules="$_ruleValidate_$" :label-width="80">
                        <FormItem label="角色名称" prop="name">
                            <Input v-model="$_newRole_$.name" placeholder="请输入角色名称"></Input>
                        </FormItem>

                        <FormItem label="角色层级" prop="type">
                            <Select v-model="$_newRole_$.type" placeholder="请选择层级">
                                <Option value="2">园区级</Option>
                                <Option value="3">企业级</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="角色描述" prop="description">
                            <Input v-model="$_newRole_$.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入角色描述"></Input>
                        </FormItem>
                    </Form>
                    <div slot="footer">
                        <Button size="large" @click="$_quit_$">取消</Button>
                        <Button type="primary" size="large" @click="$_createNew_$">确定</Button>
                    </div>
                </Modal>
            </Col>
        </Row>
        <!--编辑角色 -->
        <Modal v-model="$_rmModelEdit_$" title="角色信息" :mask-closable="false">
            <Form ref="$_bjRole1_$" :model="$_bjRole_$" :rules="ruleValidate" :label-width="80">
                <FormItem label="角色名称" prop="name">
                    <Input v-model="$_bjRole_$.name" placeholder="请输入角色名称"></Input>
                </FormItem>

                <FormItem label="角色层级" prop="type" >
                    <Select v-model="$_bjtype_$" disabled placeholder="选择角色层级 ">
                        <Option   v-for="item in $_cityList_$" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="角色描述" prop="description">
                    <Input v-model="$_bjRole_$.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入角色描述"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button size="large" @click="$_quit_$">取消</Button>
                <Button type="primary" size="large" @click="$_bjNew_$">确定</Button>
            </div>
        </Modal>
        <!-- tablebox -->
        <Row class="mt10">
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
            <!-- 模态框 -->

            <!-- 树形控件 -->
            <Modal v-model="$_treeSetting_$" title="权限设置" :mask-closable="false">
                <span v-show='$_tree1_$'>
                <el-tree
                        :data="treeData"
                        :props="treeProps"
                        ref="rightsTree"
                        show-checkbox
                        :default-expand-all="false"
                        node-key="id"
                        highlight-current
                        :default-checked-keys="treeCheckedKeys">
                </el-tree></span>
                <!-- <span v-show='$_tree2_$'>
                <Tree
                        :data="treeData"
                        ref="rightsTree2"
                        :load-data="loadData"
                        show-checkbox>
                </Tree></span> -->
                <div slot="footer" >
                    <Button size="large" @click="editRightDialog()">取消</Button>
                    <Button v-if="this.qx.flag==1" type="primary" size="large" @click="handleEditRights()">确定</Button>
                </div>
            </Modal>
        </Row>
        <br>
        <br>
        <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_total_$}}条数据</span>
        <!-- page分页 -->
        <!-- <Row>
            <Col span="12" offset="12">
                <Page align='right' :total="$_total_$"
                      show-elevator show-sizer
                      :page-size="$_pageSize_$"
                      @on-page-size-change="$_pageNum_$"
                      @on-change="$_changePage_$"/>
            </Col>
        </Row> -->
    </div>

</template>
<script>
    import {Tree} from "element-ui";
    import controler from './controler.js';
    import "element-ui/lib/theme-chalk/index.css";

    export default {
        mixins: [controler],
        components: {
            [Tree.name]: Tree
        },
        data() {
            return {
                $_tree1_$:false,
                $_tree2_$:false,
                userInfo:{},
                $_total_$: 0,//总数
                id: '',
                $_pageSize_$: 12,//一页1条数据
                $_rmModelEdit_$: false,
                $_modelsle_$: "",          //头部的select   搜索
                $_treeSetting_$: false,    //tree
                $_modelRole_$: false,
                $_querycfg_$: {
                    mod: '',
                    params: {
                        //hcuancan
                    }
                },
                $_cityList_$: [
                    {
                        value: 2,
                        label: '园区级'
                    }, {
                        value: 3,
                        label: '企业级'
                    }

                ],
                $_columns7_$: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                    },
                    {
                        title: '角色名称',
                        key: 'name',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if(params.row.flag == 1){
                                  a= params.row.name
                                }
                            if(params.row.flag == 0){
                                a = params.row.name+'   (默认)'
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '角色层次',
                        key: 'type',
                        align: 'center',
                    },
                    {
                        title: '角色描述',
                        key: 'description',
                        align: 'center',
                    },
                    // {
                    //     title: '资源',
                    //     key: 'resources',
                    //     align: 'center',
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            var a; var b;
                                if(params.row.flag == 0){
                                  a=""
                                }
                                if(params.row.flag == 1){
                                  a="编辑  "
                                }
                                if(params.row.flag == 0){
                                  b=""
                                }
                                if(params.row.flag == 1){
                                  b="删除  "
                                }
                            return h('div', [
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
                                            let a = JSON.parse( JSON.stringify(params.row) );
                                            this.$_bianji_$(a)
                                        }
                                    }
                                }, a),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#f56c6c"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params.row.id)
                                        },
                                    }
                                }, b),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_allot_$(params.row)
                                        }
                                    }
                                }, '权限设置'),
                            ]);
                        }
                    }
                ],
                //列表数据
                $_data6_$: [],
                // 树形控件
                treeData: [],
                $_bumen_$: [],
                qx:'',
                $_dq_$: [],
                treeProps: {
                    children: 'child', // 子节点数组名
                    label: 'name' // 节点文本属性名
                },
                treeCheckedKeys: [],
                currentRole: null, // 用来存储当前被授权的角色
                // 新建角色
                $_newRole_$: {
                    name: "",
                    description: '',
                    type: 0
                }, // 编辑角色
                $_bjRole_$: {
                    name: "",
                    description: '',
                    type: 0
                },
                // 新建角色验证规则
                $_ruleValidate_$: {
                    name: [
                        {required: true,message: '角色名称不能为空', trigger: 'change'},
                        {type: 'string',validator:this.$_validatestr_$, trigger: 'change'},
                        {
                          type:'string', max: 20,message: '名称不能超过20字',trigger: 'change'
                        }
                    ],
                    type: [
                        {required: true, message: '角色层级不能为空', trigger: 'change'}
                    ],
                    description: [
                        // {required: true, message: '请输入描述', trigger: 'change'},
                        {type: 'string', max: 200, message: '描述不能超过200字', trigger: 'change'}
                    ]
                },
                ruleValidate: {
                    name: [
                        {required: true,message: '角色名称不能为空', trigger: 'change'},
                        {type: 'string',validator:this.$_validatestr_$, trigger: 'change'},
                        {
                          type:'string', max: 20,message: '名称不能超过20字',trigger: 'change'
                        }
                    ],
                    type: [
                        {required: true, message: '角色层级不能为空', trigger: 'change'}
                    ],
                    description: [
                        // {required: true, message: '请输入描述', trigger: 'change'},
                        // {type: 'string', min: 20, message: '描述不能少于20字', trigger: 'change'},
                        {type: 'string', max: 200, message: '描述不能超过200字', trigger: 'change'}
                    ]
                },
                $_bjid_$: 0,//编辑id
                tergetId: '',//编辑id
                $_bjtype_$: '',
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_List_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            this.$_global_$.serverPath;
        },
        methods: {
            // 获取列表数据
            $_List_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/user/role/zone/`+this.userInfo.zoneId,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_editModal_$ = false;
                            this.$_data6_$ = rsp.data.data;
                            this.$_total_$ = rsp.data.data.length;
                            for (var i = 0; i < rsp.data.data.length; i++) {
                                if (rsp.data.data[i].type == 0) {
                                    this.$_data6_$[i].type = '访客级'
                                } else if (rsp.data.data[i].type == 1) {
                                    this.$_data6_$[i].type = '平台级'
                                } else if (rsp.data.data[i].type == 2) {
                                    this.$_data6_$[i].type = '园区级'
                                } else if (rsp.data.data[i].type == 3) {
                                    this.$_data6_$[i].type = '企业级'
                                } else if(rsp.data.data[i].type == 5){
                                    this.$_data6_$[i].type = '园区级'
                                }

                            }

                            // this.$Message.success('数据更新成功!');
                        } else {
                            this.$Message.error('数据更新失败!');
                        }
                    }
                })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_List_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_List_$();
            },
            //新建角色取消
            $_quit_$() {
                this.$_modelRole_$ = false;
                this.$_rmModelEdit_$ = false;
                this.$Message.error('已取消!');
            },
            // 新建角色成功
            $_createNew_$() {
                this.$refs.$_newRolev_$.validate((valid) => {
                    if (valid) {
                        var ind = 0;
                        if (this.$_newRole_$.type == '0') {
                            ind = 0;
                        } else if (this.$_newRole_$.type == '1') {
                            ind = 1;
                        } else if (this.$_newRole_$.type == '2') {
                            ind = 2;
                        } else if (this.$_newRole_$.type == '3') {
                            ind = 3;
                        }
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/user/role/create/zone/`+this.userInfo.zoneId,
                            data:{
                                name:this.$_newRole_$.name,
                                description:this.$_newRole_$.description,
                                type:ind
                                },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('角色创建成功!');
                                    this.$_List_$();
                                     this.$_modelRole_$ = false;
                                } else {
                                    this.$Message.error('角色创建失败!');
                                }
                            }
                        })

                    } else {
                        // this.$Message.error('角色创建失败!');
                    }
                })
            },

            $_addRole_$() {
                this.$_modelRole_$ = true;
                this.$_newRole_$ = {}
            },
            // 搜索
            $_handleSearch_$() {
                if (this.$_modelsle_$) {
                    if (this.$_modelsle_$ == '0') {
                        this.$_querycfg_$.params.type = 0;
                    } else if (this.$_modelsle_$ == '1') {
                        this.$_querycfg_$.params.type = 1;
                    } else if (this.$_modelsle_$ == '2') {
                        this.$_querycfg_$.params.type = 2;
                    } else if (this.$_modelsle_$ == '3') {
                        this.$_querycfg_$.params.type = 3;
                    }
                }
                this.$_List_$();
            },
            //编辑
            $_bianji_$(row) {
                this.$_rmModelEdit_$ = true,
                this.$_bjRole_$ = row;
                if(row.type=="园区级"){
                    this.$_bjtype_$ = 2;
                }else if(row.type=="企业级"){
                    this.$_bjtype_$ = 3;
                }
                this.$_bjid_$ = row.id;
            },
            // 编辑确定
            $_bjNew_$() {
                this.$refs.$_bjRole1_$.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: this.$_global_$.serverPath + `/user/role`,
                            data: {
                                "name": this.$_bjRole_$.name,
                                "description": this.$_bjRole_$.description,
                                "id": this.$_bjid_$,
                                "type": this.$_bjtype_$
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_rmModelEdit_$ = false;
                                    this.$Message.success('编辑角色成功!');
                                    this.$_List_$();
                                } else {
                                    this.$Message.error('编辑角色失败!');
                                }
                            }
                        })
                    }
                })

            },
            // 删除
            $_remove_$(index) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                            <p>确认删除该角色吗</p><br>
                    `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: this.$_global_$.serverPath + `/user/role/${index}`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_editModal_$ = false;
                                    this.$Message.success('删除角色成功!');
                                    this.$_List_$();
                                } else {
                                    this.$Message.error('删除角色失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Modal.remove()
                        this.$Message.error('删除取消!');
                    }

                })

            },
            //点击权限
            $_allot_$(role) {
                this.qx = role
                this.id = role.id
                this.$_treeSetting_$ = true;
                this.treeData = [];
                this.$_bumen_$ = []
                this.treeCheckedKeys=[]
                //当前角色资源
                if(role.type == '园区级'){                   
                    this.$_tree1_$ =true
                    this.$_sendQuery_$({
                        method: "GET",
                        url: this.$_global_$.serverPath + `/user/role/${role.id}/resource`,
                        data: {},
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                for (let i = 0; i < rsp.data.data.length; i++) {
                                    this.$_dq_$.push(rsp.data.data[i]);
                                    if (rsp.data.data[i].child) {
                                        this.$_hy2_$(rsp.data.data[i]);
                                    }
                                }
                                //点击授权弹框，保存当前被授权的角色，
                                this.$_sendQuery_$({
                                    method: "GET",
                                    url: this.$_global_$.serverPath + `/user/user/resources`,
                                    data: {},
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                }).then((rsp) => {
                                    if (rsp.status === 200) {
                                        if (rsp.data.code === 0) {
                                            for (let i = 0; i < rsp.data.data.zone.length; i++) {
                                                this.$_bumen_$.push(rsp.data.data.zone[i]);
                                                if (rsp.data.data.zone[i].child) {
                                                    this.$_hy_$(rsp.data.data.zone[i]);
                                                }
                                            }
                                            this.treeData = this.$_dg_$(this.$_bumen_$, this.$_dq_$,this,role);
                                        }
                                    }
                                });
                            }
                        }
                    })
                }    
                if(role.type == '企业级'){
                    this.$_tree1_$ = true
                    this.tergetId = 2
                    this.$_sendQuery_$({
                        method: "GET",
                        url: this.$_global_$.serverPath + `/user/role/${role.id}/resource`,
                        data: {},
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                for (let i = 0; i < rsp.data.data.length; i++) {
                                    this.$_dq_$.push(rsp.data.data[i]);
                                    if (rsp.data.data[i].child) {
                                        this.$_hy2_$(rsp.data.data[i]);
                                    }
                                }
                                //点击授权弹框，保存当前被授权的角色，
                                this.$_sendQuery_$({
                                    method: "GET",
                                    url: this.$_global_$.serverPath + `/user/resource/menu/all/`+this.tergetId,
                                    data: {},
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                }).then((rsp) => {
                                    if (rsp.status === 200) {
                                        if (rsp.data.code === 0) {
                                            var arr = rsp.data.data
                                            if (rsp.data.code === 0) {
                                            for (let i = 0; i < arr.length; i++) {
                                                this.$_bumen_$.push(arr[i]);
                                                if (arr[i].child) {
                                                    this.$_hy_$(arr[i]);
                                                }
                                            }
                                            this.treeData = this.$_dg_$(this.$_bumen_$, this.$_dq_$,this,role);
                                        }
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            },
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
            $_hy2_$(node, num = 0) {
                if (!node) {
                    return;
                }
                if (num !== 0) {
                    this.$_dq_$.push(node);
                }
                num++;
                if (node.child && node.child.length > 0) {
                    let i = 0;
                    for (i = 0; i < node.child.length; i++) {
                        this.$_hy2_$(node.child[i], num);
                    }
                }

            },
            $_dg_$(data, info = '',that,role) {
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
                    //判断id是否相等，如果相等默认选中
                    for (let i = 0; i < info.length; i++) {
                        if(info[i].parentId){
                                if (info[i].id == item.id){
                                    that.treeCheckedKeys.push(item.id);
                                }
                            }
                    }
                    if(role.flag==0){
                        item.disabled = true;
                    }
                    item.title = item.name;
                    item.children = [];
                    // 以当前遍历项，parentId,去map对象中找到索引的id
                    let parent = map[item.parentId];
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item);
                    } else {
                        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶
                        val.push(item);
                    }
                });
                return val;
            },
            loadData(item, callback) {
                this.$_sendQuery_$({
                    method: 'GET',
                    url: this.$_global_$.serverPath + `/user/resource/menu/${item.id}/child`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                var data = []
                                var arr = rsp.data.data
                                if (arr.length == 0) {
                                    this.$Message.success('该分类下无子分类')
                                } else {
                                    for (let i = 0; i < arr.length; i++) {
                                        let temp = {
                                            id: arr[i].id,
                                            title: arr[i].name,
                                            loading: false,
                                            checked: false,
                                            children: []
                                        };
                                        for (let j = 0; j < this.$_dq_$.length; j++) {
                                            if (this.$_dq_$[j].id === temp.id) {
                                                // temp.checked = true;
                                            }
                                        }
                                        // if(item.disableCheckbox){
                                        //     temp.disableCheckbox = true;
                                        // }
                                        data.push(temp)
                                    }
                                }
                                callback(data)
                            }
                        }
                    }
                )
            },
            //权限确定

            handleEditRights() {
                this.$_treeSetting_$ = false
                let checkedNodes = ''
                if(this.tergetId==2){
                     checkedNodes = this.$refs.rightsTree.getCheckedNodes()
                }else{
                     checkedNodes = this.$refs.rightsTree.getCheckedNodes()
                }
                let data = [];
                for (let i = 0; i < checkedNodes.length; i++){
                    data.push({
                        resourceId: checkedNodes[i].id,
                    })
                }
                this.$_sendQuery_$({
                    method: 'PUT',
                    url: this.$_global_$.serverPath + `/user/role/${this.id}/resource`,
                    data: data
                }).then((res) => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$Message.success('授权成功');
                            this.$_treeSetting_$ = false;
                            this.$root.$_Route_$("user", "user", "roleManage");
                        }
                    }
                })
            },
            //权限取消
            editRightDialog() {
                this.$_treeSetting_$ = false
            }
        }
    }
</script>