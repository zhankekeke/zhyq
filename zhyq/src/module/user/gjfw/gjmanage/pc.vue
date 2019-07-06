<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 20px 0 20px 15px;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        background-color: #f5f5f5;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .title {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #333;
    }

    .wrap {
        border-bottom: 1px solid #e7e7e7;
        overflow: hidden;
        padding-bottom: 10px;
        padding-top: 5px;
    }

    .imgWrap,
    .text {
        float: left;
        font-size: 14px;
    }

    .rat {
        margin-top: 14px;
        float: right;
        margin-right: -8px;
    }

    .wrap .imgWrap {
        width: 50px;
        height: 50px;
        background: #f5f5f5;
        border-radius: 6px;
        margin-right: 15px;
    }

    .wrap .imgWrap img {
        width: 50px;
        height: 50px;
        margin: 0 auto;
    }

    .bottom {
        padding: 10px 0;
    }

    .bottom .cz {
        display: block;
        float: right;
    }

    .bottom button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .button {
        width: 40px;
        height: 40px;
        margin: 30px auto 0;
        color: #e5e4e3;
    }

    >>>.ivu-card-bordered {
        float: left;
        margin: 15px 15px 0 0;
    }

    .mwrap {
        padding: 15px;
        border: 1px solid #f5f5f5;
        border-radius: 6px;
        margin: 0 auto;
    }

    .mtitle {
        line-height: 30px;
        font-weight: bold;
    }
    .content .left,.right{
        display: inline-block;
        height: 245px;
        overflow-y: auto;
    }
    .content .right{
        width: 40%;
        text-align: center;
        margin-left: 15px;
    }
    .content .right ul li{
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        margin: 8px 0;
    }
    .myCard{
        box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
        border: none;
    }
    .classify{
        color: #545454;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            管家名称：
            <Input v-model="$_orderName_$" placeholder="请输入管家名称" style="width: 210px;margin-right: 2%" ></Input>
            &nbsp;&nbsp;手机号：
            <Input v-model="$_phoneNumber_$" placeholder="请输入手机号" style="width: 210px;;margin-right: 2%"></Input>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <br>
        <!--<Row>共{{$_totalSize_$}}条数据</Row>-->
        <!--<br>-->
        <!-- 卡片 -->
        <div>
            <Row>
                <Card class="myCard" style="width:340px;height: 150px" v-for="(item,index) in $_info_$" :key="index">
                    <a href="#" slot="extra" @click="$_del_$(item.id)">
                        <Icon type="close-round"></Icon>
                    </a>
                    <div class="wrap">
                        <div class="imgWrap">
                            <span v-if="item.image"><img :src="$_global_$.imgPath + item.image" alt=""></span>
                            <span v-else><img src="/static/defaultTX.png" alt=""></span>
                        </div>
                        <div class="text">
                            <p>
                                <span class="name" style="color:#000;">{{item.name}}</span>&nbsp;&nbsp;
                                <span class="classify">{{item.refDeptName}}</span>
                            </p>
                            <p>
                                <span style="color: #ccc" v-if="item.sex == 1" class="sex">女</span>
                                <span style="color: #ccc" v-else class="sex">男</span>
                                <span class="phone">{{item.phoneNumber}}</span>
                            </p>
                        </div>
                        <div class="rat">
                            <Rate allow-half v-model="item.star-0" disabled></Rate>
                        </div>
                    </div>
                    <div class="bottom">
                        <span style="color:#ccc;" class="time">{{item.createDate.replace("T"," ")}}</span>
                        <span class="cz">
                            <button style="color: #059BFA" @click="$_record_$(item.id,item.zoneId)">服务记录</button>&nbsp;<span style="color:#059BFA;">|</span>&nbsp;
                            <button style="color: #059BFA"  @click="$_edit_$(item.id,item.refEmployee,item.refDepartment,)">编辑</button>&nbsp;<span style="color:#059BFA;">|</span>&nbsp;
                      <button style="color: #059BFA"  @click="$_allot_$(item)">分配</button>
                  </span>
                    </div>
                </Card>
                <Card class="myCard"  style="width:340px;height: 150px">
                    <div class="button" style="text-align: center" @click="$_add_$()"><Icon type="plus" size="60"></Icon></div>
                </Card>
            </Row>
        </div>
        <!-- 添加的弹框 -->
        <Modal v-model="$_modal1_$" title="管家调入" :closable="true" :mask-closable="false">
            <div class="mwrap">
                <p class="mtitle">从运营公司调入</p>
                <div class="content">
                    <div class="left">
                       <!--  <Input v-model="$_name_$" icon="ios-search"
                               placeholder="请输入姓名搜索" style="width: 200px"
                               @on-change="$_searchName_$"></Input> -->
                        <Tree :data="$_tree_$" @on-select-change="$_choice_$" style="width: 200px"></Tree>
                    </div>
                    <div class="right">
                        <p>请在左侧选择部门查看</p>
                        <ul>
                            <li v-for="(item,index) in searchdata" :key="index" @click="$_transferStaff_$(item,searchdata.bmname)">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="$_cancel_$">取消</Button>
            </div>
        </Modal>
        <!-- 管家分配 -->
        <Modal v-model="$_modal2_$" title="管家分配">
            <Transfer
                    :data="$_data1_$"
                    :target-keys="$_targetKeys1_$"
                    :render-format="render1"
                    :operations="['解除','分配']"
                    :titles="['待分配企业','已分配企业']"
                    @on-change="handleChange1"></Transfer>
            <div slot="footer">
                <Button type="primary" @click="$_delivery_$()">确认</Button>
            </div>
        </Modal>
        <!-- 编辑 -->
        <Modal v-model="$_modal3_$" title="管家">
            <Form ref="editform" :rules="editFormValidate" :model="$_editform_$" :label-width="80">
                <FormItem label="头像">
                    <img :src="$_global_$.imgPath + $_editform_$.img" style="width:50px;height: 50px;background: #f7f7f7;">
                </FormItem>
                <FormItem label="员工姓名">
                    {{this.$_editform_$.name}}
                </FormItem>
                <FormItem label="员工性别">
                    <RadioGroup v-model="$_editform_$.sex">
                        <Radio label="女" disabled></Radio>
                        <Radio label="男" disabled></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机号" prop="phoneNumber">
                    <Input type="text" v-model="$_editform_$.phoneNumber" placeholder="请输入手机号码"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input type="text" v-model="$_editform_$.email" placeholder="请输入邮箱"></Input>
                </FormItem>
                <FormItem label="所属部门" >
                    {{this.$_editform_$.ssbm}}
                    <!--<Input type="text" v-model="$_editform_$.ssbm" placeholder="请输入部门名称"></Input>-->
                </FormItem>
                <FormItem label="职务">
                    {{this.$_editform_$.zw}}
                    <!--<Input type="text" v-model="$_editform_$.zw" placeholder="请输入职务"></Input>-->
                </FormItem>
                <FormItem label="管家详情" >
                    <quill-editor ref="myTextEditor" v-model="$_editform_$.detail" :options="quillOption"></quill-editor>

                </FormItem>
            </Form>
            <div slot="footer" align="center">
                <Button type="primary" @click="$_save_$($_editform_$.id)">保存</Button>
            </div>
        </Modal>
    </div>

</template>
<script>
    import controler from "./controler.js";
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config'

    export default {
        mixins: [controler],
        components: {
            quillEditor
        },
        data() {
            const validatephone = (rule, value, callback) => {
                if (!(/^1[345789]\d{9}$/.test(value))) {
                    callback('请输入正确的手机号');
                } else {
                    callback();
                }
            };
            const validateemail = (rule, value, callback) => {
                if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value) || value=='') {
                    callback();
                } else {
                    callback('请输入正确的邮箱格式');
                }
            };
            return {
                quillOption: quillConfig,

                editorOption: {modules: {toolbar: '#toolbar'}},
                $_totalSize_$: 0, // 数据条数
                $_phoneNumber_$: "", // 手机号
                $_orderName_$: "", // 管家名称
                $_modal1_$: false, // 添加弹框是否显示
                $_modal2_$: false, // 管家分配弹窗
                $_modal3_$: false, // 管家编辑弹窗
                $_thisUserInfo_$: '', //当前账号信息
                $_tree_$: [],
                $_bumen_$: [],  //部门数据
                $_staffList_$: [], //员工列表
                $_staffInformation_$: '', //要分配的管家的信息
                $_name_$: "", // 输入姓名搜索
                searchdata: {},  //搜索结果
                $_info_$: "",
                $_data1_$: [],
                $_targetKeys1_$: [],
                $_dqfpEnterprise_$: [], //分配给当前管家的入住企业
                $_allWfpEnterprise_$: "", //未分配管家的企业信息
                //表单传递字段
                $_otherInfo_$: {
                    refEmployee:'',
                    refDepartment:''
                },
                $_editform_$: { //编辑表单
                    img: '',
                    name: '',
                    sex: '',
                    phoneNumber: '',
                    email: '',
                    ssbm: '',
                    zw: '',
                    detail: ''
                },
                editFormValidate: {
                    /*name: [
                        {required: true, message: '请填写员工姓名', trigger: 'blur'}
                    ],*/
                    /*sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ],*/
                    email:[
                        {validator: validateemail,trigger: 'change'}
                    ],
                    phoneNumber: [
                        {required: true, message: '请填写手机号码', trigger: 'change'},
                        //手机号验证
                        {validator: validatephone,trigger: 'change'}
                    ],
                   /* zw: [
                        {required: true, message: '请填写职务', trigger: 'blur'}
                    ]*/
                },
                $_querycfg_$: ""
            };
        },
        methods: {
            // 搜索
            $_search_$() {
                this.$_querycfg_$.params = {};
                this.$_querycfg_$.params.zone_id = this.$_thisUserInfo_$.zoneId;
                if (this.$_orderName_$) {
                    this.$_querycfg_$.params.name = this.$_orderName_$;
                }
                if (this.$_phoneNumber_$) {
                    this.$_querycfg_$.params.phone_number = this.$_phoneNumber_$;
                }
                this.$_fquery_$();
            },
            // 服务记录
            $_record_$(id,zoneId) {
                this.$root.$_Route_$('user', 'jump', 'fwjl', {id:id,zoneId:zoneId})
            },
            // 编辑
            $_edit_$(id,refEmployee,refDepartment) {
                this.$refs.editform.resetFields();
                this.$_otherInfo_$.refEmployee = refEmployee;
                this.$_otherInfo_$.refDepartment = refDepartment;
                for (let i = 0; i < this.$_info_$.length; i++) {
                    if (this.$_info_$[i].id == id) {
                        this.$_editform_$.id = this.$_info_$[i].id;
                        this.$_editform_$.name = this.$_info_$[i].name;
                        this.$_editform_$.img = this.$_info_$[i].image;
                        this.$_editform_$.sex = this.$_info_$[i].sex == 1 ? '女' : '男';
                        this.$_editform_$.phoneNumber = this.$_info_$[i].phoneNumber;
                        this.$_editform_$.email = this.$_info_$[i].emailUrl;
                        this.$_editform_$.ssbm = this.$_info_$[i].refDeptName;
                        this.$_editform_$.zw = this.$_info_$[i].position;
                        this.$_editform_$.detail = this.$_info_$[i].intro;
                        this.$_editform_$.star = this.$_info_$[i].star;
                        break;
                    }
                }
                this.$_modal3_$ = true;
            },
            // 分配
            $_allot_$(sta) {
                //sta当前管家的信息
                this.$_staffInformation_$ = '';
                this.$_staffInformation_$ = sta;
                this.$_modal2_$ = true;
                this.$_targetKeys1_$ = [];
                this.$_data1_$ = this.getMockData();
            },
            $_del_$(id){
                this.$Modal.confirm({
                title: "提示",
                content: "<p>是否确认删除?</p>",
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/steward/steward/deleteSteward",
                    data:{id:id}
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                  this.$Message.success(rsp.data.data);
                                  this.$_fquery_$()
                                }else{
                                    this.$Message.error(rsp.data.message);
                                  this.$_fquery_$()
                                }
                            }
                        
                    })
                },
                onCancel: () => {
                  // this.$Message.info("数据删除失败!");
                }
              });
                
            },
            // 添加
            $_add_$() {
                this.$_modal1_$ = true;

                //获取所有运营企业列表
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/zone/zone/"+this.$_thisUserInfo_$.zoneId+"/enterprise/manager",
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_tree_$ = [];
                            for (let i = 0; i < rsp.data.data.records.length; i++) {
                                let info = {
                                    title: rsp.data.data.records[i].name,
                                    id: rsp.data.data.records[i].id,
                                    index: i,
                                    parentId: "top",
                                    expand: false,
                                    children: [
                                        {
                                            disabled: true,
                                            title: "暂无数据"
                                        }
                                    ]
                                };
                                this.$_tree_$.push(info);

                                this.$_sendQuery_$({
                                    method: "GET",
                                    url: `${this.$_global_$.serverPath}/company/company/${info.id}/department`,
                                    data:{},
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                }).then(resp => {
                                    if (resp.status === 200) {
                                        if (resp.data.code === 0) {
                                            let bm = [];
                                            if (resp.data.data) {
                                                let arr = resp.data.data;

                                                this.$_bumen_$ = [];
                                                for (let i = 0; i < arr.length; i++) {
                                                    if(arr[i].parentId==null){
                                                        arr[i].parentId = 0;
                                                    }
                                                    if(!arr[i].enterpriseId){
                                                        arr[i].enterpriseId = info.id;
                                                    }
                                                    this.$_bumen_$.push(arr[i]);
                                                    if (arr[i].child) {
                                                        this.$_hy_$(arr[i]);
                                                    }
                                                }

                                                let bumenarr = [];
                                                // 删除 所有 children,以防止多次调用
                                                for (let i=0;i<this.$_bumen_$.length;i++){
                                                    if(this.$_bumen_$[i].parentId==0){
                                                        bumenarr.push(this.$_bumen_$[i]);
                                                    }
                                                }
                                                bm = this.$_digui_$(bumenarr);
                                                this.$_tree_$[i].children = bm;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                })
            },
            //获取运营企业树形机构
            $_loadData_$(rep){
                if (rep.parentId == 'top') {
                    this.$_sendQuery_$({
                        method: "GET",
                        url: `${this.$_global_$.serverPath}/company/company/${rep.id}/department`,
                    }).then(res => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                if (res.data.data) {
                                    this.$_bumen_$ = [];
                                    for (let i = 0; i < res.data.data.length; i++) {
                                        this.$_bumen_$.push(res.data.data[i]);
                                        if (res.data.data[i].child) {
                                            this.$_hy_$(res.data.data[i]);
                                        }
                                    }
                                    let bumen = this.$_dg_$(this.$_bumen_$);
                                    this.$_tree_$[rep.index].children = bumen;
                                }
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
            //菜单递归
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
            //菜单递归
            $_dg_$(data) {
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
            //部门下人员列表
            $_choice_$(rec){
                if (rec.length > 0) {
                    if (rec[0].parentId == 'top') {
                        alert('请选择部门');
                    }else{
                        if(rec[0].enterpriseId == null){
                             rec[0].enterpriseId = this.$_thisUserInfo_$.enterpriseId
                        }
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/company/company/${rec[0].enterpriseId}/department/${rec[0].id}/employee`,
                            data: {}
                        }).then(res => {
                            if (res.status === 200) {
                                if (res.data.code === 0) {

                                    if (res.data.data.records.length > 0) {
                                        this.$_staffList_$ = res.data.data.records;
                                        this.searchdata = res.data.data.records;
                                        for(let j=0;j<this.$_info_$.length;j++){
                                            for(let i=0;i<this.searchdata.length;i++){
                                                if(this.$_info_$[j].refEmployee==this.searchdata[i].id){
                                                     this.searchdata.splice(i,1);
                                                }
                                            }
                                        }                                     
                                        this.searchdata.bmname = rec[0].name;
                                    }else{
                                        this.searchdata = [{name:'暂无数据'}];
                                    }
                                }
                            }
                        });
                    }
                }else{
                    alert('暂无数据');
                }

            },
            //新建管家
            $_transferStaff_$ (rec,bmname){
                // var newDate = new Date(rec.createDate);
                let sendData = {
                    "name": rec.name,
                    "sex": rec.sex,
                    "phoneNumber":rec.phoneNumber,
                    "emailUrl": rec.emailUrl,
                    "refEmployee":rec.userId,
                    "refDepartment":rec.departmentId,
                    "refDeptName":bmname,
                    "image":rec.faceUrl,
                    "zoneId":this.$_thisUserInfo_$.zoneId,
                    "position":rec.position,
                    "entryDate":rec.createDate,
                };
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/createSteward`,
                    data: sendData
                }).then(res => {
                    if(res.status==200){
                        if(res.data.code==0){
                            this.$Message.success('调入成功');
                            this.$_fquery_$();
                        } else{
                            this.$Message.error(res.data.message);
                        }
                    } else{
                        this.$Message.error('网络繁忙，请稍后再试');
                    }
                });
                this.$_modal1_$ = false;
            },
            //按姓名搜索员工
            $_searchName_$(){
                this.searchdata = this.$_staffList_$;
                this.searchdata = this.search(this.searchdata, {name: this.$_name_$});
            },
            search(data,argumentObj){
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                if(res.length==0){
                    res = [{name:'无结果'}]
                }
                return res;
            },
            // 取消
            $_cancel_$() {
                this.$_modal1_$ = false;
                this.$_staffList_$ = [];
                this.searchdata = [];
            },
            // 分配弹窗确认
            $_delivery_$() {
                let enterprise = this.$_targetKeys1_$; //要分配管家的企业（只有id） 
                let sendEnterprise = [];  //要分配管家的企业（请求参数）
                let result = [];  //当前管家分配的企业
                //需要分配给当前管家的企业
                for (let i=0;i<enterprise.length;i++){
                    let nowName='';
                    for (let j=0;j<this.$_allWfpEnterprise_$.length;j++){

                        if(this.$_allWfpEnterprise_$[j].id === enterprise[i]){
                            nowName = this.$_allWfpEnterprise_$[j].name;
                            break;
                        }

                    }
                    sendEnterprise.push({"enterpriseId":enterprise[i],"enterpriseName":nowName});
                }
                sendEnterprise.pop(sendEnterprise);
                let sendData2 = {
                    "stewardId": this.$_staffInformation_$.id,
                    "stewardName": this.$_staffInformation_$.name,
                    "stewardSex": this.$_staffInformation_$.sex,
                    "stewardPhoneNumber": this.$_staffInformation_$.phoneNumber,
                    "zoneId": this.$_thisUserInfo_$.zoneId,
                    "enterpriseList": sendEnterprise
                };

                if(this.$_dqfpEnterprise_$.length==1){
                    //没有需要解绑管家的企业

                    //企业分配管家
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/steward/enterprise/assign`,
                        data: sendData2
                    }).then(res => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                this.$Message.success(res.data.data);
                            }else{
                                this.$Message.error(res.data.message);
                            }
                        }else{
                            this.$Message.error("网络繁忙，请稍后再试");
                        }
                    });

                }else{
                    //需要解绑当前管家的企业
                    for(let i=0;i<this.$_dqfpEnterprise_$.length-1;i++){
                        result.push({"enterpriseId":this.$_dqfpEnterprise_$[i]});
                    }
                    let sendData1={
                        "stewardId": this.$_staffInformation_$.id,
                        "zoneId": this.$_thisUserInfo_$.zoneId,
                        "enterpriseList": result
                    };

                    //先解绑当前管家分配的所有企业
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/steward/enterprise/remove`,
                        data: sendData1
                    }).then(rec => {
                        if (rec.status === 200) {
                            if (rec.data.code === 0) {
                                //解绑当前管家分配的所有企业成功
                                if(enterprise.length==1){
                                    //解绑成功
                                    this.$Message.success('企业解绑管家成功');
                                } else{
                                    //分配给当前管家新的企业

                                    //企业分配管家
                                    this.$_sendQuery_$({
                                        method: "POST",
                                        url: `${this.$_global_$.serverPath}/steward/enterprise/assign`,
                                        data: sendData2
                                    }).then(res => {
                                        if (res.status === 200) {
                                            if (res.data.code === 0) {
                                                this.$Message.success(res.data.data);
                                            }else{
                                                this.$Message.error("企业分配管家失败");
                                            }
                                        }else{
                                            this.$Message.error("网络繁忙，请稍后再试");
                                        }
                                    });
                                }
                            }else{
                                this.$Message.error("企业分配管家失败");
                            }
                        }else{
                            this.$Message.error("网络繁忙，请稍后再试");
                        }
                    });
                }

                this.$_modal2_$ = false;  //关闭弹窗

            },

            handleChange1(newTargetKeys, direction, moveKeys) {
                this.$_targetKeys1_$ = newTargetKeys;
            },
            //获取所有未分配的入住企业列表
            getMockData() {

                //获取所有入住企业列表
                let allcompany = [];  //所有入住企业列表
                let yfpcompany = [];  //已分配管家的入住企业列表
                let dqfpcompany = [];  //分配给当前管家的入住企业列表
                let mockData = [];  //未分配管家的入住企业列表

                //获取当前园区的所有入住企业列表
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise/search`,
                }).then(res1 => {
                    if (res1.status === 200) {
                        if (res1.data.code === 0) {
                            allcompany = res1.data.data.records;
                            //获取已分配管家的入住企业列表
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/steward/enterprise/queryAssignedEnterpriseByCondition`,
                                data:{"zone_id":this.$_thisUserInfo_$.zoneId}
                            }).then(res2 => {
                                if (res2.status === 200) {
                                    if (res2.data.code === 0) {
                                        yfpcompany = res2.data.data;
                                        //获取分配给当前管家的入住企业列表
                                        this.$_sendQuery_$({
                                            method: "POST",
                                            url: `${this.$_global_$.serverPath}/steward/enterprise/queryAssignedEnterpriseByCondition`,
                                            data:{"zone_id":this.$_thisUserInfo_$.zoneId,"steward_id":this.$_staffInformation_$.id}
                                        }).then(res3 => {
                                            if (res3.status === 200) {
                                                if (res3.data.code === 0) {
                                                    dqfpcompany = res3.data.data;
                                                    this.$_dqfpEnterprise_$ = [];

                                                    //除去当前管家的其他管家分配的企业列表
                                                    for (let i=0;i<dqfpcompany.length;i++){
                                                        this.$_dqfpEnterprise_$.push(Number(dqfpcompany[i].enterpriseId));
                                                        for (let j=0;j<yfpcompany.length;j++){
                                                            if(dqfpcompany[i].enterpriseId==yfpcompany[j].enterpriseId){
                                                                yfpcompany.splice(j,1);
                                                                break;
                                                            }
                                                        }

                                                    }
                                                    this.$_dqfpEnterprise_$.push("");

                                                    //分配给当前管家和未分配管家的企业列表
                                                    for (let i=0;i<yfpcompany.length;i++){
                                                        for (let j=0;j<allcompany.length;j++){
                                                            if(yfpcompany[i].enterpriseId==allcompany[j].id){
                                                                allcompany.splice(j,1);
                                                                break;
                                                            }
                                                        }

                                                    }

                                                    this.$_allWfpEnterprise_$ = allcompany;
                                                    for (let i=0;i<allcompany.length;i++){
                                                        mockData.push({
                                                            key: allcompany[i].id,
                                                            label: allcompany[i].name
                                                        });
                                                    }

                                                    this.$_targetKeys1_$ = this.getTargetKeys();

                                                }
                                            }

                                        });
                                    }
                                }
                            });
                        }
                    }
                });

                return mockData;

            },
            getTargetKeys() {

                return this.$_dqfpEnterprise_$;
            },
            render1(item) {
                return item.label;
            },
            // 加载更多
            $_more_$() {
            },
            // 编辑保存
            $_save_$(userid) {
                this.$refs.editform.validate((valid) => {
                    if (valid) {
                        this.$_querycfg_$.mod = 'steward/steward/updateSteward';//新地址
                        this.$_querycfg_$.params = {};//参数清空
                        this.$_querycfg_$.params.id = userid;
                        this.$_querycfg_$.params.zoneId = this.$_thisUserInfo_$.zoneId;
                        this.$_querycfg_$.params.name = this.$_editform_$.name;//添加新参数
                        this.$_querycfg_$.params.sex = this.$_editform_$.sex == '女' ? '1' : '0';
                        this.$_querycfg_$.params.phoneNumber = this.$_editform_$.phoneNumber;
                        this.$_querycfg_$.params.emailUrl = this.$_editform_$.email;
                        this.$_querycfg_$.params.refDeptName = this.$_editform_$.ssbm;
                        this.$_querycfg_$.params.star = this.$_editform_$.star;
                        this.$_querycfg_$.params.intro = this.$_editform_$.detail;

                        this.$_querycfg_$.params.refEmployee = this.$_otherInfo_$.refEmployee;
                        this.$_querycfg_$.params.refDepartment = this.$_otherInfo_$.refDepartment;
                        this.$_querycfg_$.params.image = '1.png';
                        let that = this;
                        this.$_fquery_$(function (rsp) {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    that.$Message.success('编辑成功');

                                    that.$_sendQuery_$({
                                        method: "POST",
                                        url: `${that.$_global_$.serverPath}/steward/steward/queryStewardByCondition`,
                                        data: {"zone_id":that.$_thisUserInfo_$.zoneId}
                                    }).then(rs => {
                                        if (rs.status === 200) {
                                            if (rs.data.code === 0) {
                                                that.$_info_$ = rs.data.data;
                                            }
                                        }
                                    });
                                }
                            }
                        });
                        this.$_modal3_$ = false;
                    } else {
                        this.$Message.error('请按照要求填写相关内容');
                    }
                });
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    //搜索清零
                    delete this.$_querycfg_$.params.name;
                    delete this.$_querycfg_$.params.phone_number;
                    if (rsp.data.code === 0) {
                        this.$_info_$ = rsp.data.data;
                        this.$_totalSize_$ = this.$_info_$.length;
                    }
                }
            },

        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_thisUserInfo_$ = JSON.parse(cookie);

            this.$_querycfg_$ = {
                mod: "steward/steward/queryStewardByCondition",
                params: {
                    zone_id:this.$_thisUserInfo_$.zoneId
                }
            };

        },
        mounted() {
            this.$_fquery_$();
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
    };
</script>