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
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
    }

    .bg {
        background: #f5f5f5;
        padding: 20px;
        margin-bottom: 35px;
        font-size: 14px;
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

    .btclass {
        background: #3399ff;

    }

    .ml28 {
        margin-left: 28px;
    }

    .mt40 {
        margin-top: 40px;
    }


</style>
<template>
    <div class="zdtb">
        <div class="company-manabge bg">
            <span>用户名称：</span>
            <Input v-model="$_userName_$" placeholder="请输入用户姓名" style="width:150px"></Input>
            <span class="ml28">手机号：</span>
            <Input v-model="$_phone_$" placeholder="请输入用户手机号" style="width:150px"></Input>
            <Button style="margin-left: 20px" type="primary" @click="$_search_$()">搜索</Button>
        </div>

        <!-- 首行框 -->

        <Row>
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
            <Modal v-model="$_modal2_$"
                   title="角色授予" :mask-closable="false">
                <Transfer
                        class="mt10"
                        :data="$_data1_$"
                        :target-keys="$_targetKeys1_$"
                        :render-format="$_render1_$"
                        :titles="['系统角色','已授予角色']"
                        :operations="['解除','分配']"
                        @on-change="$_handleChange1_$">
                </Transfer>
                <div slot="footer">
                    <Button type="ghost" @click="$_modal2_$ = false">取消</Button>
                    <Button type="primary" @click="userRoler()">确定</Button>
                </div>
            </Modal>
        </Row>

        <Row class="mt40">
            <div style="float: left; font-size: 14px; color: #000">共{{total}}条数据</div>

            <Page align="right" :total="total"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>

</template>

<script>
    import controler from './controler.js';

    export default {
        mixins: [controler],
        data() {
            return {
                $_role_$: '',
                $_userName_$: '',
                $_phone_$: '',
                $_selected_$: "全部", // 默认选中
                $_statusList_$: [
                    // 状态值
                    {
                        value: "手动输入",
                        label: "手动输入"
                    },
                    {
                        value: "地址关联",
                        label: "地址关联"
                    }
                ],
                $_modal2_$: false,
                $_data1_$: [],
                $_targetKeys1_$: [],
                yjfpRole: [],
                selected: [],
                del: [],
                //传api
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_formValidate_$: {
                    $_parkName_$: "",
                    $_address_$: "",
                    $_fullAddress_$: "",
                },
                $_ruleValidate_$: {},
                pageNum: 1,
                $_columns7_$: [
                    {
                        title: '编号',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + (this.pageNum - 1) * this.$_pageSize_$ + 1);
                        }
                    },
                    {
                        title: '用户名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if (params.row.sex == 0) {
                                a = "男";
                            } else {
                                a = "女";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '手机号',
                        key: 'phoneNumber',
                        align: 'center',
                    },
                    // {
                    //     title: '所属公司',
                    //     key: 'enterpriseName',
                    //     align: 'center',
                    // },
                    {
                        title: '已授权角色',
                        key: 'roleNames',
                        align: 'center',
                        ellipsis: true,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }
                            }, params.row.roleNames)
                        }
                    },
                    {
                        title: '注册时间',
                        key: 'regDate',
                        width: 120,
                        align: 'center',//time_str.substr(0,10)
                        render: (h, params) => {
                            var a;
                            if (params.row.regDate) {
                                a = params.row.regDate.substr(0, 10)
                            } else {
                                a = params.row.regDate
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
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
                                            this.$_allot_$(params.row.id)
                                        }
                                    }
                                }, '角色授予'),
                            ]);
                        }
                    }
                ],
                $_data6_$: [],  // 表格数据
                $_pageSize_$: 10,
                total: 0,
                userId: 0,
            }
        },
        created() {
            this.$_global_$.serverPath
            this.$_list_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        watch: {
            model() {
                //console.log(this.model);
            }
        },
        methods: {
            // 列表
            $_list_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_querycfg_$.mod = `company/company/${userInfo.enterpriseId}/employee/search`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.pageNum = rsp.data.data.current;
                                this.$_data6_$ = rsp.data.data.records;
                                this.total = rsp.data.data.total * 1;
                            } else {
                                this.$_data6_$ = [];
                                this.total = 0
                            }
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
            $_search_$() {
                if (this.$_userName_$) {
                    this.$_querycfg_$.params.name = this.$_userName_$;
                } else {
                    delete this.$_querycfg_$.params.name;
                }
                if (this.$_phone_$) {
                    this.$_querycfg_$.params.phoneNum = this.$_phone_$;
                } else {
                    delete this.$_querycfg_$.params.phoneNum;
                }
                this.$_list_$();
            },
            // 角色授予源数据
            $_getMockData_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                let $_mockData_$ = [];
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/user/role/enterprise/${userInfo.enterpriseId}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    key: arr[i].id,
                                    label: arr[i].name
                                }
                                $_mockData_$.push(temp)
                            }
                        }
                        this.$_data1_$ = $_mockData_$

                    }
                })
            },
            $_getTargetKeys_$() {
                this.yjfpRole = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/user/role/user/${this.userId}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            //本身拥有的admin
                            var role = rsp.data.data
                            if (role.length == 0) {
                                this.$Message.success('没有已经分配的')
                            } else {
                                for (var i = 0; i < role.length; i++) {
                                    this.yjfpRole.push(role[i].id)

                                }

                            }
                            this.$_targetKeys1_$ = this.yjfpRole
                        }
                    }
                })
            },
            $_render1_$(item) {
                return item.label;
            },
            $_handleChange1_$(newTargetKeys, direction, moveKeys) {
                if (direction == 'right') {
                    this.$_targetKeys1_$ = newTargetKeys;
                    if (this.$_targetKeys1_$.length != 0 && this.del.length != 0) {
                        for (var i = 0; i < this.$_targetKeys1_$.length; i++) {
                            let flag = false;
                            let k;
                            for (let j = 0; j < this.del.length; j++) {
                                // debugger
                                if (this.$_targetKeys1_$[i].id == this.del[j].id) {
                                    k = j;
                                    flag = true;
                                }
                            }
                            if (flag) {
                                this.del.splice(k, 1)
                            }
                        }

                    }
                } else {
                    var moveKey = []
                    if (this.yjfpRole.length != 0 && this.del.length == 0) {
                        for (var i = 0; i < moveKeys.length; i++) {
                            let flag = false;
                            for (let j = 0; j < this.yjfpRole.length; j++) {
                                if (moveKeys[i] == this.yjfpRole[j]) {
                                    flag = true;
                                }
                            }
                            if (flag) {
                                moveKey.push({id: moveKeys[i]})
                                this.del = moveKey
                            }
                        }
                    }
                    if (moveKey.length != 0 && this.del.length != 0) {
                        for (var i = 0; i < moveKey.length; i++) {
                            let flag = true;
                            for (let j = 0; j < this.del.length; j++) {
                                if (moveKey[i] == this.del[j]) {
                                    flag = false;
                                }
                            }
                            if (flag) {
                                var te = {}
                                te = {
                                    id: moveKey[i]
                                }

                                this.del.push(te)
                            }
                        }
                    } else if (moveKey.length != 0 && this.del.length == 0) {
                        for (var b = 0; b < moveKey.length; b++) {
                            var temped = {}
                            temped = {
                                id: moveKey[b]
                            }
                            this.del.push(temped)
                        }

                        this.del = moveKey
                    }
                    this.$_targetKeys1_$ = newTargetKeys;
                }

            },
            $_allot_$(id) {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);

                this.$_modal2_$ = true;
                this.userId = id
                this.del = []
                this.$_getMockData_$()
                this.$_getTargetKeys_$()
            },
            userRoler() {
                this.selected = []
                if (this.yjfpRole.length != 0) {
                    for (let i = 0; i < this.$_targetKeys1_$.length; i++) {
                        let flag = true
                        for (let j = 0; j < this.yjfpRole.length; j++) {
                            if (this.$_targetKeys1_$[i] == this.yjfpRole[i]) {
                                flag = false
                            }
                        }
                        if (flag) {
                            var tem = {}
                            tem = {
                                id: this.$_targetKeys1_$[i]
                            }
                            this.selected.push(tem)
                        }
                    }

                }
                else {
                    //循环目的列表所有的
                    for (var i = 0; i < this.$_targetKeys1_$.length; i++) {
                        var te = {}
                        te = {
                            id: this.$_targetKeys1_$[i]
                        }

                    }
                    this.selected.push(te)
                }
                //var userid = this.selected.join(',')
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/user/user/${this.userId}/roles`,
                    data: {
                        add: this.selected,
                        del: this.del
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {

                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success("授予成功!")
                            this.$_getMockData_$()
                            this.$_modal2_$ = false
                            this.$_list_$()
                        } else {
                            this.$Message.error("授予失败!")
                        }
                    }
                })
            }

        },


    }
</script>







