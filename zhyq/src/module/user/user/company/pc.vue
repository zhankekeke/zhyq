<style scoped>
    .zdtb {
        font-size: 12px;
        /* padding:0px 5% 0px 5%; */
        color: #666;
        line-height: 18px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
    }

    .bg {
        padding: 20px;
        background-color: #f5f5f5;
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

</style>
<template>
    <div class="zdtb">
        <div class="company-manabge bg">
            <span style=" color: black;font-size: 14px">企业名称：</span>
            <Input v-model.trim="$_companyName_$" placeholder="请输入企业名称" style="width:210px;margin-right: 20px;"></Input>
            <Button type="primary" @click="$_cNameSearch_$">搜索</Button>
        </div>
        <Row type="flex" align="middle">
            <Col span="16" offset="8" align="right" pull="1">
                <Button type="primary" @click="$_addCompany_$" class="mt10">+ 新增企业</Button>
                <!-- <Button type="primary" @click="$_companyExport_$" class="mt10">导出</Button> -->
            </Col>
        </Row>
        <!-- 首行框 -->

        <Row class="mt10">
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
            <br>
            <br>
            <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{total}}条数据</span>
            <Page align="right" :total="total"
                  style="float: right"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>

            <!-- 管理员分配 -->
            <Modal v-model="$_modal2_$" title="管理员分配" :mask-closable="false">
                <Transfer
                        class="mt10"
                        :data="$_data2_$"
                        :operations="['解除','分配']"
                                           :titles="['未分配','已分配']"
                        :target-keys="$_targetKeys2_$"
                        :render-format="$_render2_$"
                        @on-change="$_handleChange2_$">
                </Transfer>
                <div slot="footer" align="center">
                    <Button type="ghost" @click="$_modal2_$ = false">取消</Button>
                    <Button type="primary" @click="$_handleManager_$()">确定</Button>
                </div>
            </Modal>
            <!-- 管家分配 -->
            <Modal v-model="$_modal3_$"
                   title="管家分配" :mask-closable="false">
                <Transfer
                        class="mt10"
                        :data="$_data1_$"
                        :target-keys="$_targetKeys1_$"
                        :render-format="$_render1_$"
                        :operations="['解除','分配']"
                        :titles="['管家列表','已分配的管家']"
                        @on-change="$_handleChange1_$">
                </Transfer>
                <div slot="footer" align="center">
                    <Button type="ghost" @click="$_modal3_$ = false">取消</Button>
                    <Button type="primary" @click="$_handleGj_$()">确定</Button>
                </div>
            </Modal>
        </Row>
        <br>


    </div>
</template>

<script>
    import controler from './controler.js';
    import {Button, Select, Option, Table, TableColumn, Upload} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            [Select.name]: Select,
            [Button.name]: Button,
            [Option.name]: Option,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Upload.name]: Upload,
        },
        data() {
            return {
                $_modalEdit_$: false,
                $_modal2_$: false,
                $_modal3_$: false,
                //穿梭框id和name
                $_stewardId_$: '',
                $_stewardName_$: '',
                //
                $_relationModel2_$: "",
                $_relationModel3_$: "",
                $_relationModel4_$: "",
                $_companyName_$: "",

                $_thisUserInfo_$: '', //当前账号信息
                $_thisZoneInfo_$: {}, //当前园区信息
                $_allGjInfo_$: {},  //所有管家的信息
                $_EnterpriseGj_$: [], //当前公司管家id
                //
                $_data1_$: [],
                $_targetKeys1_$: [],
                $_data2_$: [],
                $_targetKeys2_$: [],
                select: [],
                originManagerList: [], // 源列表
                targetList: [], // 目的列表
                yfpList: [], // 已经拥有的管理员

                // 表格数据
                $_columns7_$: [
                    {
                        title: '序号',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + (this.pageNum - 1) * this.$_pageSize_$ + 1);
                        }
                    },
                    {
                        title: '企业名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '所在地址',
                        key: 'address',
                        align: 'center',
                        render: (h, params) => {
                            var g;
                            if (params.row.addressType == 0) {
                                g = params.row.address;
                            }
                            if (params.row.addressType == 1) {
                                g = params.row.registerAddress;
                            }
                            return h("span", {}, g);
                        }
                    },
                    {
                        title: '地址类型',
                        key: 'addressType',
                        align: 'center',
                        render: (h, params) => {
                            var g;
                            if (params.row.addressType == 0) {
                                g = "手动输入";
                            }
                            if (params.row.addressType == 1) {
                                g = "地址关联";
                            }
                            return h("span", {}, g);
                        }
                    },
                    {
                        title: '注册资金',
                        key: 'registeredCapital',
                        align: 'center',
                    },
                    {
                        title: '法人名称',
                        key: 'legalPerson',
                        align: 'center',
                    }, {
                        title: '行业类别',
                        key: 'sectors',
                        align: 'center',
                        render: (h, params) => {
                            let a;
                            switch (params.row.sectors) {
                                case "1":
                                    a = '农、林、牧、渔业';
                                    break;
                                case "2":
                                    a = '采矿业';
                                    break;
                                case "3":
                                    a = '制造业';
                                    break;
                                case "4":
                                    a = '电力、热力、燃气及水生产和供应业';
                                    break;
                                case "5":
                                    a = '建筑业';
                                    break;
                                case "6":
                                    a = '批发和零售业';
                                    break;
                                case "7":
                                    a = '交通运输、仓储和邮政业';
                                    break;
                                case "8":
                                    a = '住宿和餐饮业';
                                    break;
                                case "9":
                                    a = '信息传输、软件和信息技术服务业';
                                    break;
                                case "10":
                                    a = '金融业';
                                    break;
                                case "11":
                                    a = '房地产业';
                                    break;
                                case "12":
                                    a = '租赁和商务服务业';
                                    break;
                                case "13":
                                    a = '科学研究和技术服务业';
                                    break;
                                case "14":
                                    a = '水利、环境和公共设施管理业';
                                    break;
                                case "15":
                                    a = '居民服务、修理和其他服务业';
                                    break;
                                case "16":
                                    a = '教育';
                                    break;
                                case "17":
                                    a = '卫生和社会工作';
                                    break;
                                case "18":
                                    a = '文化、体育和娱乐业';
                                    break;
                                case "19":
                                    a = '公共管理、社会保障和社会组织';
                                    break;
                                case "20":
                                    a = '国际组织';
                                    break;
                                default:
                                    a = params.row.sectors;
                            }
                            return h("span", {}, a);
                        }
                    },
                    // {
                    //     title: '企业人数',
                    //     key: 'scale',
                    //     align: 'center',
                    // },
                    {
                        title: '经营范围',
                        key: 'businessScope',
                        align: 'center',
                        render: (h, params) => {
                            return h("span", {
                                style:{
                                    overflow: "hidden", 
                                    textOverflow:'ellipsis', 
                                    whiteSpace: 'nowrap'
                                }
                            }, 
                            params.row.businessScope);
                        }
                    },
                    {
                        title: '入驻时间',
                        key: 'createDate',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 250,
                        render: (h, params) => {
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
                                            let a = JSON.parse(JSON.stringify(params.row));
                                            this.$_bianji_$(a)
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
                                        color: "#f56c6c"

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
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_allot_$(params.row)
                                        }
                                    }
                                }, '管理员分配'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_mangerAllot_$(params.row)
                                        }
                                    }
                                }, '管家分配')
                            ]);
                        }
                    }
                ],
                $_data6_$: [],  // 表格数据
                total: 0, // 数据条数
                $_pageSize_$: 12,
                zones: [],

                $_list_$: '',
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                originList: [],
                enterpriseInfo: 0,  //当前企业信息
                obj: {},
                originManagerList: [],
                companyId: '',
                zoneId: '',
                del: [],
                pageNum: 1,
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_thisUserInfo_$ = JSON.parse(cookie);

            this.$_List_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        mounted() {

        },
        watch: {
            model() {
            },

        },
        methods: {
            // 表格数据
            $_List_$() {
                this.$_querycfg_$.mod = `zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise/search`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.name;
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data.records;
                            this.total = rsp.data.data.total
                            this.pageNum = rsp.data.data.current
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
            $_addCompany_$() {
                this.$root.$_Route_$('user', 'jump', 'xzqy', {})

            },
            // 导出
            $_companyExport_$() {

            },
            // 搜索
            $_cNameSearch_$() {
                if (this.$_companyName_$) {
                    this.$_querycfg_$.params.name = this.$_companyName_$;
                }
                this.$_List_$()
            },
            //穿梭框,获取管家列表数据
            $_getStewardData_$() {

                //获取当前园区所有管家列表
                let $_mockData_$ = []; //要返回的管家列表
                let arr = []; //所有管家的列表
                let now = []; //当前公司的管家

                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/queryStewardByCondition`,
                    data: {"zone_id": this.$_thisUserInfo_$.zoneId}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            arr = rsp.data.data;
                            this.$_allGjInfo_$ = arr;
                            //获取当前公司的管家
                            this.$_targetKeys1_$ = this.$_getStewardKeys_$();

                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
                                    key: arr[i].id,
                                    label: arr[i].name,
                                    phone: arr[i].phoneNumber,
                                    sex: arr[i].sex

                                };
                                $_mockData_$.push(temp)
                            }
                            this.originList = $_mockData_$
                        }
                    }
                });

                return $_mockData_$;
            },
            //当前公司的管家数据
            $_getStewardKeys_$() {
                let target = [];

                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/enterprise/queryAssignedEnterpriseByCondition`,
                    data: {"zone_id": this.$_thisUserInfo_$.zoneId, "enterprise_id": this.enterpriseInfo.id}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            for (let i = 0; i < arr.length; i++) {
                                let temp = '';
                                temp = arr[i].stewardId;
                                target.push(temp)
                            }
                        }
                    }
                });
                this.$_EnterpriseGj_$ = target;
                return target
            },
            // 管家
            $_render1_$(item) {
                return item.label;
            },
            // 管家
            $_handleChange1_$(newTargetKeys, direction, moveKeys) {
                if (newTargetKeys.length > 1) {
                    this.$Message.error("只允许选择一个管家!")
                } else {
                    this.$_targetKeys1_$ = newTargetKeys;
                }

            },
            //穿梭框实现,管理员源列表数据
            $_getManagerData_$() {
                this.originManagerList = []
                this.$_data2_$ = []
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/company/${this.companyId}/employee/search`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if(rsp.data.data){
                                var te = rsp.data.data.records
                                                       
                            if (te) {
                                for (var i = 0; i < te.length; i++) {
                                    var temp = {}
                                    temp = {
                                        key: te[i].id,
                                        label: te[i].name

                                    }
                                    this.originManagerList.push(temp)
                                }
                            } else {

                            }

                            this.$_data2_$ = this.originManagerList
                            }
                        }
                    }
                })


            },
            //管理员目的列表数据
            $_getManagerKeys_$() {
                this.yfpList = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/company/${this.companyId}/employee/admin`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            if (arr) {
                                for (var i = 0; i < arr.length; i++) {
                                    this.yfpList.push(arr[i].id)
                                }
                            } else {

                            }
                            this.$_targetKeys2_$ = this.yfpList
                        }
                    }
                })
            },
            // 管理员
            $_render2_$(item) {
                return item.label;
            },
            // 管理员
            $_handleChange2_$(newTargetKeys, direction, moveKeys) {
                if (direction == 'right') {
                    this.$_targetKeys2_$ = newTargetKeys;
                    if (this.$_targetKeys2_$.length != 0 && this.del.length != 0) {
                        for (var i = 0; i < this.$_targetKeys2_$.length; i++) {
                            let flag = false;
                            let k;
                            for (let j = 0; j < this.del.length; j++) {
                                // debugger
                                if (this.$_targetKeys2_$[i] == this.del[j]) {
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
                    if (this.yfpList.length != 0 && this.del.length == 0) {
                        for (var i = 0; i < moveKeys.length; i++) {
                            let flag = false;
                            for (let j = 0; j < this.yfpList.length; j++) {
                                if (moveKeys[i] == this.yfpList[j]) {
                                    flag = true;
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
                            let flag = true;
                            for (let j = 0; j < this.del.length; j++) {
                                if (moveKey[i] == this.del[j]) {
                                    flag = false;
                                }
                            }
                            if (flag) {
                                this.del.push(moveKey[i])
                            }
                        }
                    } else if (moveKey.length != 0 && this.del.length == 0) {
                        this.del = moveKey

                    }
                    this.$_targetKeys2_$ = newTargetKeys;
                }

            },

            // 管理员分配确认
            $_handleManager_$() {
                this.select = []
                //已经分配的管理员
                if (this.yfpList.length != 0) {  // 如果已经有管理员
                    // 把穿梭框右侧的列表新增的部分筛选出来
                    for (let i = 0; i < this.$_targetKeys2_$.length; i++) {
                        let flag = true;
                        for (let j = 0; j < this.yfpList.length; j++) {
                            if (this.$_targetKeys2_$[i] == this.yfpList[j]) {
                                flag = false
                            }
                        }
                        if (flag) {
                            this.select.push(this.$_targetKeys2_$[i])
                        }
                    }
                } else {
                    this.select = this.$_targetKeys2_$
                }
                if (this.$_targetKeys2_$.length != 0) {
                    // 管理员设置接口
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise/${this.companyId}/admin`,
                        data: {
                            add: this.select,
                            del: this.del
                        },
                        headers: {"Content-type": "application/json"}
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_modal2_$ = false
                                this.$Message.success("分配成功!")
                            }
                        }
                    })
                } else {
                    this.$Message.error("企业必须有一个管理员!")
                }


            },
            // 编辑企业信息
            $_bianji_$(row) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/company/${row.id}/employee/search`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if(rsp.data.data){
                                this.$root.$_Route_$("user", "jump", "bjqy", {row:row});
                            }else{
                                this.$root.$_Route_$("user", "jump", "xzqy", {id:row.id,count:1});
                            }                           
                        }
                    }
                })
            },
            // 删除
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                        <p>确认删除该企业吗</p><br>        
                    `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise/${row.id}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("删除公司成功!")
                                    this.$_List_$()
                                } else {
                                    this.$Message.error("删除公司失败!")
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                })
            },

            // 管理员分配
            $_allot_$(row) {
                this.$_modal2_$ = true;
                this.enterpriseInfo = row;
                this.companyId = row.id;
                this.zoneId = row.zoneId;
                this.del = []
                this.select = []
                this.$_getManagerData_$()
                this.$_getManagerKeys_$()
            },
            //管家分配
            $_mangerAllot_$(row) {
                this.$_modal3_$ = true;
                this.enterpriseInfo = row;
                this.$_targetKeys1_$ = [];  //清空穿梭框右侧数据
                this.$_data1_$ = this.$_getStewardData_$();  //获取管家列表
            },
            //管家分配确定
            $_handleGj_$() {
                let sendSteward = {};   //要分配的管家的信息

                for (let i = 0; i < this.$_allGjInfo_$.length; i++) {
                    if (this.$_allGjInfo_$[i].id == this.$_targetKeys1_$[0]) {
                        sendSteward = this.$_allGjInfo_$[i];
                        break;
                    }
                }
                let sendData2 = {
                    "stewardId": sendSteward.id,
                    "stewardName": sendSteward.name,
                    "stewardSex": sendSteward.sex,
                    "stewardPhoneNumber": sendSteward.phoneNumber,
                    "zoneId": this.$_thisUserInfo_$.zoneId,
                    "enterpriseList": [{
                        "enterpriseId": this.enterpriseInfo.id,
                        "enterpriseName": this.enterpriseInfo.name
                    }]
                };

                if (this.$_EnterpriseGj_$.length === 0) {
                    //当前企业没有管家
                    this.allotSteward(sendData2);

                } else {
                    //当前企业有管家
                    //需要解绑当前管家的企业

                    let sendData1 = {
                        "stewardId": this.$_EnterpriseGj_$[0],
                        "zoneId": this.$_thisUserInfo_$.zoneId,
                        "enterpriseList": [{"enterpriseId": this.enterpriseInfo.id}]
                    };
                    //需要先解绑当前管家
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/steward/enterprise/remove`,
                        data: sendData1
                    }).then(rec => {
                        if (rec.status === 200) {
                            if (rec.data.code === 0) {
                                //解绑当前管家成功
                                if (this.$_targetKeys1_$.length === 0) {
                                    //解绑成功
                                    this.$Message.success('企业解绑管家成功');
                                } else {
                                    //分配新管家
                                    this.allotSteward(sendData2);
                                }

                            } else {
                                this.$Message.error("企业分配管家失败");
                            }
                        } else {
                            this.$Message.error("网络繁忙，请稍后再试");
                        }

                    })
                }
                this.$_modal3_$ = false;
            },
            //给企业分配管家
            allotSteward(sendData) {
                //企业分配管家
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/enterprise/assign`,
                    data: sendData
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$Message.success(res.data.data);
                        } else {
                            this.$Message.error("企业分配管家失败");
                        }
                    } else {
                        this.$Message.error("网络繁忙，请稍后再试");
                    }
                });
            },


        }


    }
</script>