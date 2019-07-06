<style scoped>
    .step {
        width: 900px;
        height: 60px;
        margin: 0 auto 20px;
        position: relative;
    }

    .step .stepcont {
        position: absolute;
        top: 0;
        left: 12%;
    }

    .stepBox {
        width: 500px;
        margin: 0 auto;
    }

    .info {
        font-size: 20px;
        color: #666;
        margin: 10px 0px 10px 0px
    }
    .meetinginfo{
        display: inline-block;
    }
    .meetinginfo .div-label{
        width: 100px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #495060;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
    }
    .meetinginfo .div-content{
        display: inline-block;
        position: relative;
        line-height: 32px;
        font-size: 12px;
        margin-left: 40px;
        vertical-align: middle;
    }
</style>
<template>
    <div>
        <div class="step">
            <Steps :current="current" class="stepcont">
                <Step title="会议室基本信息"></Step>
                <Step title="支付信息"></Step>
                <Step title="预约成功"></Step>
            </Steps>
        </div>
        <!--会议室基本信息-->
        <div v-show="$_show1_$" class="stepBox">
            <div class="info">
                会议室信息
            </div>
            <div>
                <div>
                    <div class="meetinginfo" style="width: 50%">
                        <label class="div-label" >会议室名称：</label>
                        <div class="div-content">{{this.$_thisBoardroomInfo_$.name}}</div>
                    </div>
                    <div class="meetinginfo">
                        <label class="div-label" >会议室地址：</label>
                        <div class="div-content">{{this.$_thisBoardroomInfo_$.address}}</div>
                    </div>
                </div>
                <div>
                    <div class="meetinginfo" style="width: 50%">
                        <label class="div-label" >容纳人数：</label>
                        <div class="div-content">{{this.$_thisBoardroomInfo_$.peopleNumber}}人</div>
                    </div>
                    <div class="meetinginfo">
                        <label class="div-label" >单价：</label>
                        <div class="div-content"><span style="font-size: 18px;color: red">{{this.$_thisBoardroomInfo_$.price*60}}</span>元/小时</div>
                    </div>
                </div>
            </div>

            <div class="info">
                预约信息
            </div>
            <Form ref="$_addFormValidate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$"
                  :label-width="100" style="width:106%;">

                <FormItem label="会议时间：" prop="$_mtime_$">
                    <TimePicker v-model="$_formValidate_$.$_mtime_$"
                                :editable="false"
                                type="timerange" format="HH:mm"
                                :steps="[1,15]"
                                hide-disabled-options
                                :disabled-hours="this.$_noShowTime_$"
                                placeholder="会议时间"
                    ></TimePicker>
                </FormItem>
                <FormItem label="会议主题：" prop="$_theme_$">
                    <Input v-model="$_formValidate_$.$_theme_$" placeholder="请输入会议主题"></Input>
                </FormItem>
                <FormItem label="预约人：">
                    <Input v-model="$_thisUserInfo_$.name" disabled></Input>
                </FormItem>
                <FormItem label="联系方式：" >
                    <Input v-model="$_thisUserInfo_$.phoneNumber" disabled></Input>
                </FormItem>
                <FormItem label="所属部门：">
                    <Input v-model="$_thisUserInfo_$.departmentName" style="width:100px" disabled></Input>
                </FormItem>
                <FormItem label="请选择参会人员：">
                    <Button type="primary" @click="$_modal1_$ = true">选择</Button>
                </FormItem>
                <FormItem label="参会人数：" prop="$_num_$">
                    <Input v-model="$_formValidate_$.$_num_$" style="width:100px" disabled></Input>&nbsp;人
                </FormItem>
                <FormItem label="备注：">
                    <Input v-model="$_formValidate_$.$_remarks_$" type="textarea" placeholder="请输入备注信息"></Input>
                </FormItem>
                <FormItem align="center">
                    <Button type="primary" @click="$_next_$" style="margin:0 auto">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 支付信息 -->
        <div v-show="$_show2_$" class="stepBox">
            <div class="info">
                支付信息
            </div>
            <Form :label-width="100">
                <div>
                    <div class="meetinginfo" style="width: 50%">
                        <label class="div-label" >预约时长：</label>
                        <div class="div-content" style="margin-left: 15px">{{this.$_paymentInfo_$.timediff}}分钟</div>
                    </div>
                </div>
                <div>
                    <div class="meetinginfo" style="width: 50%">
                        <label class="div-label" >需支付：</label>
                        <div class="div-content" style="margin-left: 15px">{{Math.floor(this.$_paymentInfo_$.paycash*100)/100}}元</div>
                    </div>
                </div>
                <div>
                    <div class="meetinginfo" style="width: 80%">
                        <label class="div-label" >代金券抵扣：</label>
                        <div class="div-content" style="margin-left: 15px">
                            <Select v-model="$_checkdjq_$"  @on-change="$_selectDJQ_$" placeholder="请选择代金券" style="width:270px">
                                <Option v-for="item in $_djqList_$" :value="item.id" >{{item.name}}<span v-if="item.threshold==0">（无消费限制）</span><span v-else-if="item.threshold==1">（满{{item.quota}}元减{{item.denomination}}）</span></Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="meetinginfo" style="width: 50%">
                        <label class="div-label"><Checkbox v-model="$_single_$" @on-change="$_checkDK_$"></Checkbox>积分抵扣：</label>
                        <div class="div-content" style="margin-left: 15px">需要花费{{this.$_paymentInfo_$.dkjf}}积分</div>
                    </div>
                    <div class="meetinginfo">
                        <label class="div-label" >积分余额：</label>
                        <div class="div-content" style="margin-left: 15px">{{this.$_thisEnterpriseJfInfo_$.staffjf}}积分</div>
                    </div>
                </div>

                <FormItem align="center">
                    <Button type="primary" @click="$_last_$" style="margin:0 auto">上一步</Button>
                    <Button type="primary" @click="$_next_$" style="margin:0 auto">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 完成 -->
        <div v-show="$_show3_$" class="stepBox">
            <div align="center">
                <Icon type="checkmark-circled" style="font-size:40px"></Icon>
                <br>
                <div style="font-size:24px">预订成功</div>
                <br>
                <Button type="primary" @click="$_goBack_$">返回列表</Button>
            </div>
        </div>

        <!-- 选择参会人员弹窗 -->
        <Modal v-model="$_modal1_$" title="选择参会人员" :mask-closable="false" @on-ok="$_ok_$" @on-cancel="$_cancel_$">
            <div class="mwrap">
                <p class="mtitle">选择参会人员</p>
                <div class="content">
                    <Tree :data="$_tree_$" show-checkbox ref="getData"></Tree>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import controler from './controler.js';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import { Button, Select, Option, Table, TableColumn,Upload} from 'element-ui';
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
            const validatetime = (rule, value, callback) => {
                if (this.$_formValidate_$.$_mtime_$[0] && this.$_formValidate_$.$_mtime_$[1]) {
                    let date1 = this.$_formValidate_$.$_mtime_$[0].split(":");
                    let date2 = this.$_formValidate_$.$_mtime_$[1].split(":");
                    let date3 = (date2[0]-date1[0])*60+(date2[1]-date1[1]);
                    let date4 = date3-this.baseTime;
                    if(date4<0){
                        callback('会议室最小预订时间为'+this.baseTime+'分钟');
                    }else{
                        if(Number(date4)%this.intervalTime===0){
                            callback();
                        }else{
                            callback('会议室最小预订时间为'+this.baseTime+'分钟，'+'每次增加时间为'+this.intervalTime+'分钟');
                        }
                    }
                } else {
                    callback('请选择会议时间');
                }
            };
            return {
                current: 0,
                $_show1_$: true,
                $_show2_$: false,
                $_show3_$: false,
                $_modal1_$: false,
                $_thisUserInfo_$: {}, //当前账号信息
                $_thisBoardroomInfo_$: {},  //当前会议室信息
                $_noShowTime_$: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],   //不能显示的小时数
                $_thisEnterpriseJfInfo_$: {},  //当前企业积分账户信息
                $_tree_$: [],  //树形结构数据
                $_getParticipants_$: [],  //获取参会人员id
                $_sendMeetingInfo_$: {},  //会议室预约提交接口
                $_paymentInfo_$: {djq:[]},   //支付信息相关内容
                $_single_$:false,  //是否需要积分抵扣
                $_checkdjq_$: '',  //选择的代金券的值
                $_djqList_$: [],   //代金券列表
                intervalTime:'',   //最小增加时间
                baseTime:'',   //起订时间
                $_bumen_$: [],  //部门列表
                //企业信息表单
                $_formValidate_$: {
                    $_mtime_$: '', //会议时间
                    $_theme_$:'',  //会议主题
                    $_remarks_$:'', //备注信息
                    $_num_$:'', //参会人数
                },
                $_ruleValidate_$: {
                    //企业信息
                    $_theme_$: [
                        { required: true, type: 'string', message: '请输入会议主题', trigger: 'change' },
                        {type: 'string', max: 50, message: '会议主题不能超过50字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger:'change'}

                    ],
                    $_num_$: [
                        { required: true, type: 'number', message: '参会人数至少为1人',min: 1}
                    ],
                    $_mtime_$: [
                        {required: true, validator: validatetime}
                    ]
                }
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_thisUserInfo_$ = JSON.parse(cookie);

            this.getBoardroomInfo(); //获取要预约的会议室的信息
            this.getxjInfo();  //获取当前企业的现金账户信息和员工当前的积分
            this.$_choicestaff_$();  //选择参会人员列表
        },
        methods: {

            //获取会议室基本信息 处理能预约的时间
            getBoardroomInfo(){
                this.$_thisBoardroomInfo_$ = this.$root.inparams.row;

                let arr = [];
                for(let i=0;i<this.$_noShowTime_$.length;i++){
                    if(this.$_noShowTime_$[i]<this.$_thisBoardroomInfo_$.starttime[0] || this.$_noShowTime_$[i]>this.$_thisBoardroomInfo_$.endtime[0]){
                        arr.push(this.$_noShowTime_$[i]);
                    }
                }

                this.$_noShowTime_$ = arr;
                this.$_sendQuery_$({
                    method:"POST",
                    url:this.$_global_$.serverPath+"/zone/zone/"+this.$_thisBoardroomInfo_$.zoneId+"/meeting/"+this.$_thisBoardroomInfo_$.id+"/detail",
                    data: {
                    },
                    headers:{"Content-type":"application/json"}
                }).then((rsp)=>{
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            this.intervalTime = rsp.data.data.meetingRoom.meetingConfig.intervalTime
                            this.baseTime = rsp.data.data.meetingRoom.meetingConfig.baseTime
                        }
                    }
                })

            },

            //获取公司账户信息
            getxjInfo(){
                this.$_sendQuery_$({
                    method:"POST",
                    url:`${this.$_global_$.serverPath}/operate/account/accountInfo`,
                    data: {
                        "enterpriseId": this.$_thisUserInfo_$.enterpriseId,
                        "accountType": 0
                    },
                    headers:{"Content-type":"application/json"}
                }).then((rsp)=>{
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            this.$_thisEnterpriseJfInfo_$ = rsp.data.data;

                            //获取个人积分信息
                            this.$_sendQuery_$({
                                method:"POST",
                                url:`${this.$_global_$.serverPath}/operate/account/accountInfo`,
                                data: {
                                    "refId": this.$_thisUserInfo_$.id,
                                    "accountType": 1
                                },
                                headers:{"Content-type":"application/json"}
                            }).then((rsc)=>{
                                if(rsc.status === 200){
                                    if(rsc.data.code === 0){
                                        this.$_thisEnterpriseJfInfo_$.staffjf = rsc.data.data.credits;
                                    }
                                }
                            })
                        }
                    }
                })
            },
            //选择参会人员
            $_choicestaff_$(){
                //获取公司所有部门列表
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/company/${this.$_thisUserInfo_$.enterpriseId}/department`,
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
                                this.$_tree_$ = this.$_digui_$(arr);
                            }
                        }
                    }
                });

                /*this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + "/company/company/"+this.$_thisUserInfo_$.enterpriseId+"/department",
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            // this.$_tree_$ = [];
                            if(this.$_tree_$.length==0){
                                this.$_tree_$ = this.$_digui_$(rsp.data.data);
                            }
                        }
                    }
                })*/

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
                        id: arr[i].id,
                        parentId: arr[i].parentId,
                        // disableCheckbox: true,
                        children: [],
                    };
                    if (arr[i].child != null) {
                        temp.children = this.$_digui_$(arr[i].child);
                    }

                    if(arr[i].employeeList){
                        //员工列表
                        let employeeList = arr[i].employeeList;

                        if(employeeList.length>0){
                            let ls = {};
                            for (let k = 0; k < employeeList.length; k++) {
                                ls = {
                                    title: employeeList[k].name,
                                    enterpriseId: arr[i].enterpriseId,
                                    id: employeeList[k].employeeId,
                                    parentId: arr[i].id,
                                    type: "staff"
                                };
                                if(ls.id != this.$_thisUserInfo_$.id){
                                    temp.children.push(ls);
                                }
                            }
                        }

                    }

                    children.push(temp);
                }
                return children;
            },
            //下级部门
            /*$_digui_$(arr) {
                let children = [];
                for (let i = 0; i < arr.length; i++) {
                    let temp = {
                        title: arr[i].name,
                        enterpriseId: arr[i].enterpriseId,
                        id: arr[i].id,
                        parentId: arr[i].parentId,
                        disableCheckbox: true,

                    };
                    if (arr[i].child != null) {
                        temp.children = this.$_digui_$(arr[i].child);
                    }else{

                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + "/company/company/"+this.$_thisUserInfo_$.enterpriseId+"/department/"+arr[i].id+"/employee",
                            data:{}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    let people = [];
                                    let ls = {};
                                    for (let k = 0; k < rsp.data.data.records.length; k++) {
                                        ls = {
                                            title: rsp.data.data.records[k].name,
                                            enterpriseId: rsp.data.data.records[k].enterpriseId,
                                            id: rsp.data.data.records[k].id,
                                            parentId: arr[i].id,
                                            type: "staff"
                                        };
                                        if(ls.id != this.$_thisUserInfo_$.id){
                                            people.push(ls);
                                        }
                                    }
                                    temp.children = people;
                                }
                            }
                        })
                    }
                    children.push(temp)
                }
                return children;
            },*/
            //确定参会人员
            $_ok_$(){
                let item = this.$refs.getData.getCheckedNodes();
                this.$_getParticipants_$ = [];
                for(let i=0;i<item.length;i++){
                    if(item[i].type && item[i].type=='staff'){
                        this.$_getParticipants_$.push(item[i].id);
                    }
                    /*if(!(item[i].children)){
                        this.$_getParticipants_$.push(item[i].id);
                    }*/
                }
                this.$_formValidate_$.$_num_$ = this.$_getParticipants_$.length;
            },
            //取消选择
            $_cancel_$(){
                this.$_modal1_$ = false;
            },

            $_next_$() {
                //第一步内容整理
                if(this.current == 0) {

                    this.$refs.$_addFormValidate_$.validate((valid) => {
                        if(valid){
                            this.$_sendMeetingInfo_$ = {};
                            this.$_paymentInfo_$ = {};

                            this.$_getParticipants_$.push(this.$_thisUserInfo_$.id);  //预约会议室的人默认要参加会议
                            if(this.$_formValidate_$.$_num_$ > this.$_thisBoardroomInfo_$.peopleNumber){
                                this.$Message.error("不能超过会议室容纳人数上限");
                            }else{
                                this.$_sendMeetingInfo_$.meetingTheme = this.$_formValidate_$.$_theme_$;
                                this.$_sendMeetingInfo_$.employeeIds = this.$_getParticipants_$.join(",");
                                this.$_sendMeetingInfo_$.description = this.$_formValidate_$.$_remarks_$;
                                this.$_sendMeetingInfo_$.reserveDate = this.$_thisBoardroomInfo_$.nowDay;
                                this.$_sendMeetingInfo_$.startTime = this.$_formValidate_$.$_mtime_$[0];
                                this.$_sendMeetingInfo_$.endTime = this.$_formValidate_$.$_mtime_$[1];
                                this.current++;


                                //计算会议室预约时长
                                this.$_timeDiff_$();
                                //计算需支付的金额
                                this.$_sendQuery_$({
                                    method:"GET",
                                    url:`${this.$_global_$.serverPath}/operate/creditsRule/info?zoneId=${this.$_thisUserInfo_$.zoneId}`,

                                }).then((rsp)=>{
                                    if(rsp.status === 200){
                                        if(rsp.data.code === 0){
                                            this.$_paymentInfo_$.exRate = rsp.data.data.exRate;  //1元能兑换多少积分（兑换率）
                                            this.$_paymentInfo_$.payjf = this.$_thisBoardroomInfo_$.price*this.$_paymentInfo_$.timediff*this.$_paymentInfo_$.exRate;  //预约会议室需要支付的积分
                                            this.$_paymentInfo_$.totaljf = this.$_paymentInfo_$.payjf;  //不使用任何优惠要支付的积分数（数值不更改）
                                            this.$_paymentInfo_$.paycash = this.$_paymentInfo_$.payjf/this.$_paymentInfo_$.exRate;  //需要花费的现金
                                            this.$_paymentInfo_$.dkjf = 0;

                                            //获取代金券列表
                                            this.$_sendQuery_$({
                                                method:"POST",
                                                url:`${this.$_global_$.serverPath}/operate/voucherUser/list`,
                                                data:{
                                                    "receiverId": this.$_thisUserInfo_$.id,
                                                    "useType": "1"
                                                },
                                                headers:{"Content-type":"application/json"}
                                            }).then((rsc)=>{
                                                if(rsc.status === 200){
                                                    if(rsc.data.code === 0){
                                                        let list = rsc.data.data;
                                                        this.$_djqList_$ = [];
                                                        for (let i=0;i<list.length;i++){
                                                            if(list[i].threshold==1){
                                                                //需要满足满减条件
                                                                if(this.$_paymentInfo_$.paycash>=list[i].quota){
                                                                    this.$_djqList_$.push(list[i]);
                                                                }
                                                            }else{
                                                                //没有限制
                                                                this.$_djqList_$.push(list[i]);
                                                            }
                                                        }
                                                        this.$_show1_$ = false;
                                                        this.$_show2_$ = true;
                                                    }
                                                }
                                            });

                                        }
                                    }
                                })
                            }

                        }
                    });


                }
                //第二步内容整理
                else if(this.current == 1){
                    //是否使用积分
                    if(this.$_single_$){
                        this.$_sendMeetingInfo_$.usePoint = 1;
                    }else{
                        this.$_sendMeetingInfo_$.usePoint = 0;
                    }
                    //使用代金券
                    if(this.$_checkdjq_$){
                        this.$_sendMeetingInfo_$.couponId = this.$_checkdjq_$;
                    }

                    this.$_sendQuery_$({
                        method:"POST",
                        url:`${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/meeting/${this.$_thisBoardroomInfo_$.id}/reserve`,
                        data:this.$_sendMeetingInfo_$,
                        headers:{"Content-type":"application/json"}
                    }).then((rsp)=>{
                        if(rsp.status === 200){
                            if(rsp.data.code === 0){
                                this.current++;
                                this.$_show2_$ = false;
                                this.$_show3_$ = true
                            }else{
                                this.$Message.error(rsp.data.message);
                            }
                        }
                    });



                }
            },
            $_last_$() {
             this.$_show1_$ = true;
             this.$_show2_$ = false;
             this.current = 0;
           },
            //计算时间差
            $_timeDiff_$() {
                let date1 = this.$_sendMeetingInfo_$.startTime.split(":");
                let date2 = this.$_sendMeetingInfo_$.endTime.split(":");
                let date3 = (date2[0]-date1[0])*60+(date2[1]-date1[1]);
                this.$_paymentInfo_$.timediff = date3;

            },

            //是否需要代金券
            $_selectDJQ_$(vl){
                this.$_checkdjq_$ = vl;
                //找到代金券信息
                let djqtojf = 0;
                //先将代金券换算成积分
                for(let i=0;i<this.$_djqList_$.length;i++){
                    if(vl==this.$_djqList_$[i].id){
                        djqtojf = this.$_djqList_$[i].denomination*this.$_paymentInfo_$.exRate;
                        break;
                    }
                }

                //使用优惠券之后需要支付的积分
                if(djqtojf < this.$_paymentInfo_$.totaljf){
                    this.$_paymentInfo_$.payjf = this.$_paymentInfo_$.totaljf-djqtojf;
                }else{
                    this.$_paymentInfo_$.payjf = 0;
                }

                //将积分转换为现金
                this.$_paymentInfo_$.paycash = this.$_paymentInfo_$.payjf/this.$_paymentInfo_$.exRate;

                //积分抵扣变为默认不抵扣状态
                this.$_single_$ = false;
                this.$_paymentInfo_$.dkjf = 0;

            },

            //是否需要积分抵扣
            $_checkDK_$(){

                if(this.$_single_$){
                    //可以进行抵扣的积分
                    if(this.$_paymentInfo_$.payjf > this.$_thisEnterpriseJfInfo_$.staffjf){
                        this.$_paymentInfo_$.dkjf = this.$_thisEnterpriseJfInfo_$.staffjf;
                    }else{
                        this.$_paymentInfo_$.dkjf = this.$_paymentInfo_$.payjf;
                    }

                    //积分抵扣的金额
                    this.$_paymentInfo_$.payjf = this.$_paymentInfo_$.payjf-this.$_paymentInfo_$.dkjf;
                }else{
                    //取消积分抵扣
                    this.$_paymentInfo_$.payjf = this.$_paymentInfo_$.payjf+this.$_paymentInfo_$.dkjf;
                    this.$_paymentInfo_$.dkjf = 0;
                }
                this.$_paymentInfo_$.paycash = this.$_paymentInfo_$.payjf/this.$_paymentInfo_$.exRate;
            },

            $_goBack_$() {
                this.$root.$_Route_$('employer', 'work', 'hysyd');
            },
        }
    }
</script>
