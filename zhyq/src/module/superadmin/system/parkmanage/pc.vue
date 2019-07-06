<style scoped>

    .search {
        font-size: 14px;
        background-color: #f5f5f5;
        padding: 20px;
        margin-bottom: 35px;
    }

    .mt10 {
        margin-top: 10px;
    }

    >>> .el-input__inner {
        height: 30px;
    }

    >>> .el-input {
        font-size: 12px;
    }

    >>> .ivu-transfer-list {
        text-align: left;
    }

    >>> .ivu-table-cell {
        padding: 0;
    }
</style>
<template>
    <div>

        <div class="search">
            <span style="font-size: 14px">园区名称：</span>
            <Input v-model="$_companyName_$" placeholder="请输入园区名称" style="width:210px;margin-right: 25px"></Input>
            <Button type="primary" @click="$_search_$()">查询</Button>
        </div>

        <Button type="primary" @click="$_addCompany_$" style="float: right">+ 新增园区</Button>
        <p style="clear: both"></p>

        <!-- 首行框 -->
        <Table class="mt10" :columns="managerColumns" :data="managerList"></Table>

        <Modal v-model="$_modalTree_$" title="管理员分配" :mask-closable="false">
            <Transfer
                    style="text-align: center;margin-top: 10px"
                    :data="$_data1_$"
                    :operations="['','']"
                    :titles="['未分配','已分配']"
                    :target-keys="$_targetKeys1_$"
                    :render-format="$_render1_$"
                    @on-change=" $_handleChange1_$">
            </Transfer>
            <div slot="footer" class="dialog-footer">
                <Button @click="$_false_$()">取消</Button>
                <Button type="primary" @click="$_ok_$()">确定</Button>
            </div>
        </Modal>
        <Modal v-model="$_modalEdit_$" title="园区基本信息" :mask-closable="false">
            <Form ref="formValidate" :model="$_formValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                <FormItem label="园区名称" prop="$_parkName_$">
                    <Input v-model="$_formValidate_$.$_parkName_$" placeholder="请输入园区名称"></Input>
                </FormItem>
                <FormItem label="园区地址" prop="$_address_$">
                    <el-select v-model="$_formValidate_$.sheng" @change="choseProvince" placeholder="省级地区"
                               class="input" style="width:140px">
                        <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_formValidate_$.shi" @change="choseCity" placeholder="市级地区" class="input"
                               style="width:120px;">
                        <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_formValidate_$.qu" @change="choseBlock" placeholder="区级地区" class="input"
                               style="width:100px;">
                        <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </FormItem>
                <FormItem label="详细地址" prop="$_fullAddress_$">
                    <Input v-model="$_formValidate_$.$_fullAddress_$" placeholder="请填写详细地址" class="detail"></Input>
                </FormItem>
            </Form>
            <div slot="footer" class="dialog-footer">
                <Button @click="cancelEditPark()">取消</Button>
                <Button type="primary" @click="handleEditPark()">确定</Button>
            </div>
        </Modal>

        <br>
        <Row>
            <br>
            <div style="font-size: 14px; color: black; margin-left: 10px;float: left">共{{total}}条数据</div>
            <Page style="float: right"
                  :total="total"
                  show-elevator
                  @on-change="$_changePage_$"
                  @on-page-size-change="$_changePageSize_$"
                  show-sizer/>
        </Row>
    </div>


</template>

<script>
    import controler from './controler.js';
    import 'element-ui/lib/theme-chalk/index.css';
    import {Button, Select, Option, Table, TableColumn} from 'element-ui';
    import mapJson from '../../../../data/map.json';

    export default {
        mixins: [controler],
        components: {
            [Select.name]: Select,
            [Button.name]: Button,
            [Option.name]: Option,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        data() {
            const validateaddr = (rule, value, callback) => {
                if (this.$_formValidate_$.sheng != "" && this.$_formValidate_$.shi != "" && this.$_formValidate_$.qu != "") {
                    callback();
                } else {
                    callback('请选择地址');
                }
            };
            return {
                scope: {
                    $index: 1,
                },
                pageNo: 1,
                $_pageSize_$: 10,
                originList: [],
                //   mapJson:Data,
                $_modalEdit_$: false,
                total: 0,
                managerList: [],
                $_modalTree_$: false,
                $_modal3_$: false,
                $_companyName_$: "",
                yqId: '',
                select: [],
                //已分配管理员
                yfpadmin: [],
                yjfpAdmin: '',
                //暂存源列表
                $_mockData_$: [],
                allAdmin: [],
                //源列表
                $_data1_$: [],
                //目的列表
                $_targetKeys1_$: [],
                //分配给当前园区的员工
                del: [],
                lxr: '',
                tel: '',
                //传api
                province: '',
                sheng: '',
                shi: '',
                shi1: [],
                qu: '',
                qu1: [],
                city: '',
                block: '',
                targeter: [],
                $_formValidate_$: {
                    sheng: '',
                    shi: '',
                    qu: '',
                    $_id_$: "",
                    $_parkName_$: "",
                    $_address_$: "",
                    $_fullAddress_$: "",
                },
                $_ruleValidate_$: {
                    $_parkName_$: [
                        {required: true, type: 'string', message: '请填写园区名称', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '园区名称不能超过50字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_address_$: [
                        {required: true, validator: validateaddr, trigger: 'blur'}
                    ],
                    $_fullAddress_$: [
                        {required: true, type: 'string', message: '请填写园区详细地址', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 100, message: '园区详细地址不能超过100字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ]
                },
                $_querycfg_$: {
                    mod: 'zone/zone/search',
                    params: {}
                },
                userInfo: {},
                managerColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                    }, {
                        title: '名称',
                        key: 'name',
                        align: 'center',
                    }, {
                        title: '省',
                        key: 'province',
                        align: 'center',
                    }, {
                        title: '市',
                        key: 'city',
                        align: 'center',
                    }, {
                        title: '区',
                        key: 'county',
                        align: 'center',
                    }, {
                        title: '详细地址',
                        key: 'address',
                        align: 'center',
                    }, {
                        title: '管理员',
                        align: 'center',
                        render: (h, params) => {
                            let text = '暂无数据';
                            if (params.row.admin) {
                                text = params.row.admin.name;
                            }
                            return h('div', {}, text)
                        }
                    }, {
                        title: '联系电话',
                        align: 'center',
                        render: (h, params) => {
                            let text = '暂无数据';
                            if (params.row.admin) {
                                text = params.row.admin.phoneNumber;
                            }
                            return h('div', {}, text)
                        }
                    }, {
                        title: '创建时间',
                        key: 'createDate',
                        align: 'center',
                        width: 115,
                    }, {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 150,
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleEdit(params.row.id)
                                        }
                                    }
                                }, '编辑 | '),
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        color: '#f56c6c',
                                    },
                                    on: {
                                        click: () => {
                                            this.handleDelete(params.row.id)
                                        }
                                    }
                                }, '删除'),
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.allot(params.row)
                                        }
                                    }
                                }, ' | 管理员分配'),
                            ])
                        }
                    },
                ]
            }
        },
        created() {
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            this.$_fquery_$();
        },
        methods: {
            formatgly: function (row, column, cellValue) {
                if (cellValue !== null) {
                    return cellValue.name;
                } else {
                    return '';
                }
            },
            formattel: function (row, column, cellValue) {
                if (cellValue !== null) {
                    return cellValue.phoneNumber;
                } else {
                    return '';
                }
            },
            $_changePageSize_$(e) {
                this.$_querycfg_$.params.pageNum = 0;
                this.$_querycfg_$.params.pageSize = e;
                this.$_fquery_$();
            },
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_fquery_$();
            },
            $_search_$() {
                if (this.$_companyName_$) {
                    this.$_querycfg_$.params.name = this.$_companyName_$;
                    this.$_querycfg_$.params.pageNum = 1;
                }
                this.$_fquery_$();
            },
            //得到表格数据
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    //搜索清空
                    delete this.$_querycfg_$.params.recordTitle;
                    if (rsp.data.code === 0) {
                        //加载省市县
                        if(!this.province){
                            this.getCityData()
                        }
                        this.pageNo = rsp.data.data.current;
                        if (rsp.data.data.records.length > 0) {
                            this.managerList = rsp.data.data.records;
                        } else {
                            this.managerList = []
                        }
                        for (let i = 0; i < rsp.data.data.records.length; i++) {

                            for (let j = 0; j < this.province.length; j++) {
                                if (rsp.data.data.records[i].province) {
                                    if (this.province[j].id == rsp.data.data.records[i].province) {
                                        rsp.data.data.records[i].province = this.province[j].value;
                                        rsp.data.data.records[i].provinceid = this.province[j].id
                                    }
                                }
                            }
                            for (let m = 0; m < this.city.length; m++) {
                                if (rsp.data.data.records[i].city) {
                                    if (this.city[m].id == rsp.data.data.records[i].city) {
                                        rsp.data.data.records[i].city = this.city[m].value;
                                        rsp.data.data.records[i].cityid = this.city[m].id
                                    }
                                }
                            }
                            for (let k = 0; k < this.block.length; k++) {
                                if (rsp.data.data.records[i].county) {
                                    if (this.block[k].id == rsp.data.data.records[i].county) {
                                        rsp.data.data.records[i].county = this.block[k].value;
                                        rsp.data.data.records[i].countyid = this.block[k].id;
                                    }
                                }
                            }
                        }

                        this.total = rsp.data.data.total;
                        delete  this.$_querycfg_$.params.name;
                    }
                }
            },
            //搜索页
            //新建园区，跳页面
            $_addCompany_$(index) {

                this.$root.$_Route_$('superadmin', 'jump', 'addpark', {id: index})

            },
            allot(row) {
                this.yqName = ''
                this.yqName = row
                this.yqId = row.id
                this.del = []
                this.select = []
                this.$_modalTree_$ = true;
                this.$_getMockData_$()
                this.$_getTargetKeys_$()
            },
            //源列表
            $_getMockData_$() {
                this.$_mockData_$ = []
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.yqId}/employee`,
                    data: {
                        name: ''
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                //获取所有的员工
                                var arr = rsp.data.data.records
                                if (arr.length === 0) {
                                    this.$Message.success('没有已分配')
                                } else {
                                    for (var i = 0; i < arr.length; i++) {
                                        var temp = {}
                                        temp = {
                                            key: arr[i].id,
                                            label: arr[i].name,

                                        }
                                        this.$_mockData_$.push(temp)

                                    }
                                }
                            }

                            this.$_data1_$ = this.$_mockData_$
                        }
                    }
                })
            },
            //目的列表
            $_getTargetKeys_$() {
                this.yfpadmin = []
                //获取已经拥有的管理员
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.yqId}/admin`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            //本身拥有的admin
                            var admin = rsp.data.data
                            if (admin) {
                                for (var i = 0; i < admin.length; i++) {
                                    this.yfpadmin.push(admin[i].id)
                                }
                            } else {
                                this.$Message.success("园区必须有一个管理员")
                            }

                            this.$_targetKeys1_$ = this.yfpadmin
                        }
                    }

                })


            },
            $_render1_$(item) {
                return item.label;
            },
            $_handleChange1_$(newTargetKeys, direction, moveKeys) {
                //moveKeys:目标id
                if (direction == 'right') {
                    this.$_targetKeys1_$ = newTargetKeys;
                    if (this.$_targetKeys1_$.length != 0 && this.del.length != 0) {
                        for (var i = 0; i < this.$_targetKeys1_$.length; i++) {
                            let flag = true;
                            let k;
                            for (let j = 0; j < this.del.length; j++) {
                                if (this.$_targetKeys1_$[i] == this.del[j]) {
                                    k = j
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
                    if (this.yfpadmin.length != 0 && this.del.length == 0) {
                        for (var i = 0; i < moveKeys.length; i++) {
                            var flag = false
                            for (var j = 0; j < this.yfpadmin.length; j++) {
                                if (moveKeys[i] == this.yfpadmin[i]) {
                                    flag = true
                                }
                            }
                            if (flag) {
                                moveKey.push(moveKeys[i])
                                this.del = moveKey
                            }

                        }
                    }
                    if (moveKey.length != 0 && this.del.length != 0) {
                        for (var i = 0; i < moveKey.length; i++) {
                            var flag = true
                            for (var j = 0; j < this.del.length; j++) {
                                if (moveKey[i] == this.del[i]) {
                                    flag = false
                                }
                            }
                            if (flag) {
                                this.del.push(moveKey[i])
                            }

                        }
                    } else if (moveKey.length != 0 && this.del.length == 0) {
                        this.del = moveKey
                    }
                    this.$_targetKeys1_$ = newTargetKeys;

                }
            },
            //弹框确认
            $_ok_$() {
                this.select = []
                if (this.yfpadmin.length != 0) {
                    for (let i = 0; i < this.$_targetKeys1_$.length; i++) {
                        let flag = true
                        for (let j = 0; j < this.yfpadmin.length; j++) {
                            if (this.$_targetKeys1_$[i] == this.yfpadmin[j]) {
                                flag = false
                            }
                        }
                        if (flag) {
                            this.select.push(this.$_targetKeys1_$[i])
                        }
                    }

                } else {
                    this.select = this.$_targetKeys1_$
                }
                if (this.$_targetKeys1_$.length != 0) {
                    //管理员获取接口
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + `/zone/zone/${this.yqId}/admin`,
                        data: {
                            add: this.select,
                            del: this.del
                        },
                        headers: {
                            "Content-type": "application/json"
                        }

                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$Message.success("分配成功!")
                                //this.$_fquery_$()
                            }
                            this.$_modalTree_$ = false
                        }

                    })
                } else {
                    this.$Message.error('企业至少有一个管理员')
                }
            },
            $_false_$() {
                this.$_modalTree_$ = false
            },
            //处理被编辑时的表单
            handleEdit(id) {
                this.$refs.formValidate.resetFields();
                for (let i = 0; i < this.managerList.length; i++) {
                    if (this.managerList[i].id == id) {

                        this.choseProvince(this.managerList[i].provinceid);
                        this.choseCity(this.managerList[i].cityid);
                        this.choseCity(this.managerList[i].countyid);

                        this.$_formValidate_$.$_parkName_$ = this.managerList[i].name;
                        this.$_formValidate_$.$_fullAddress_$ = this.managerList[i].address;
                        this.$_formValidate_$.sheng = this.managerList[i].provinceid;
                        this.$_formValidate_$.shi = this.managerList[i].cityid;
                        this.$_formValidate_$.qu = this.managerList[i].countyid;
                        this.$_formValidate_$.$_id_$ = this.managerList[i].id;

                        break;
                    }
                }
                this.$_modalEdit_$ = true
            },
            //取消编辑按钮
            cancelEditPark() {
                this.$_modalEdit_$ = false
            },
            //点击编辑确定按钮
            handleEditPark(id) {
                this.$refs.formValidate.validate((valid) => {
                    let that = this;
                    if (valid) {
                        this.$_sendQuery_$({
                            method: 'PUT',
                            url: this.$_global_$.serverPath + '/zone/zone',
                            data: {
                                "id": that.$_formValidate_$.$_id_$,
                                "name": that.$_formValidate_$.$_parkName_$,
                                "province": that.$_formValidate_$.sheng,
                                "city": that.$_formValidate_$.shi,
                                "county": that.$_formValidate_$.qu,
                                "address": that.$_formValidate_$.$_fullAddress_$,
                                "principal": null,
                                "tel": null
                            }
                        }).then(function (res) {
                        });
                        this.$_fquery_$();
                        this.$_modalEdit_$ = false
                    }
                })

            },
            handleDelete(id) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                        <p>确认删除该园区吗</p><br>
                `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        let that = this;
                        this.$_sendQuery_$({
                            method: 'DELETE',
                            url: this.$_global_$.serverPath + '/zone/zone/' + id,
                            data: {}
                        }).then(function (res) {
                            if (res.status === 200) {
                                if (res.data.code === 0) {
                                    if (res.data.data === 1) {
                                        that.$Message.success('删除成功');
                                        that.$_fquery_$();
                                    }
                                }
                            }
                        }).catch((error) => {
                            this.$Message.error(error.response.data.message);
                        })
                    },
                    onCancel: () => {
                        this.$Modal.remove()
                        this.$Message.error('取消删除');
                    }
                })
            },

            //省市区三级联动
            getCityData() {
                //调用外面的this
                var that = this
                var data = mapJson
                that.province = []
                that.city = []
                that.block = []
                // 省市区数据分类
                for (var item in data) {
                    if (item.match(/0000$/)) {//省
                        that.province.push({id: item, value: data[item], children: []})
                    } else if (item.match(/00$/)) {//市
                        that.city.push({id: item, value: data[item], children: []})
                    } else {//区
                        that.block.push({id: item, value: data[item]})
                    }
                }
                //分类市级
                for (var index in that.province) {
                    for (var index1 in that.city) {
                        if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                            that.province[index].children.push(that.city[index1])
                        }
                    }
                }
                // 分类区级
                for (var item1 in that.city) {
                    for (var item2 in that.block) {
                        if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                            that.city[item1].children.push(that.block[item2])
                        }
                    }
                }

            },
            choseProvince: function (e) {
                this.$_formValidate_$.shi = ''
                this.$_formValidate_$.qu = ''
                for (var index2 in this.province) {
                    if (e === this.province[index2].id) {
                        this.shi1 = this.province[index2].children
                        this.shi = this.province[index2].children[0].value
                        this.qu1 = this.province[index2].children[0].children
                        this.qu = this.province[index2].children[0].children[0].value
                        this.E = this.qu1[0].id
                    }
                }
            },
            //   // 选市
            choseCity: function (e) {
                this.$_formValidate_$.qu = ''
                for (var index3 in this.city) {
                    if (e === this.city[index3].id) {
                        this.qu1 = this.city[index3].children
                        this.qu = this.city[index3].children[0].value
                        this.E = this.qu1[0].id;
                    }
                }
            },
            //   // 选区
            choseBlock: function (e) {
                this.E = e;
            }

        }


    }
</script>








