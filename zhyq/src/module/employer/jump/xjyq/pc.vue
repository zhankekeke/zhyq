<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .zkkInform {
        margin: 0 auto;
        width: 500px;
    }
</style>
<template>
    <div class="zkkInform">
        <h2>访客信息</h2>
        <div class="zkkName">
            <Form ref="$_Validate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$" :label-width="110">
                <FormItem label="姓名" prop="name">
                    <Input v-model.trim="$_formValidate_$.name" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="联系方式" prop="mobile">
                    <Input v-model="$_formValidate_$.mobile" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="单位名称" prop="dwname">
                    <Input v-model.trim="$_formValidate_$.dwname" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="所在部门" prop="part">
                    <Input v-model.trim="$_formValidate_$.part" placeholder="请输入"></Input>
                </FormItem>
                <!--邀请信息-->
                <h2>邀请信息</h2>
                <FormItem label="来访事由" prop="thing">
                    <Input v-model.trim="$_formValidate_$.thing" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="来访日期" prop="date">
                    <DatePicker type="date" format="yyyy-MM-dd" placement="bottom-end"
                                placeholder="选择一个日期" style="width: 200px"
                                v-model="$_formValidate_$.date"></DatePicker>
                    <!-- <DatePicker type="daterange"
                                :value="$_formValidate_$.date"
                                @on-change="selectTime"
                                @on-clear="clearTime"
                                format="yyyy-MM-dd"
                                :start-date="new Date(new Date().getFullYear(),
                            new Date().getMonth()+1, new Date().getDate())"
                                placement="bottom-end"
                                placeholder="开始时间-结束时间"
                                style="width:390px;"
                    ></DatePicker> -->
                </FormItem>
                <FormItem label="是否选择会议室">
                    <RadioGroup v-model="ifmeeting" @on-change="ifmeetingchose">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="选择会议室" v-show="showmeeting">
                    <Select v-model="$_formValidate_$.xzhy" @on-change="choseHys" placeholder="请选择会议室"
                            :label-in-value="true">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>

            </Form>
            <Button type="primary" align="center" style="margin-left:181px;" @click="$_handleSubmit_$()">生成邀请</Button>
        </div>

    </div>
</template>
<script>import controler from './controler.js';
//import axios from 'axios'
export default {
    mixins: [controler],
    data() {
        const validateData = (rule, value, callback) => {
            var date = new Date(value[0]);
            var time1 = date.getTime();
            // var d= new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(),new Date().getHours(),new Date().getMinutes()+1,new Date().getSeconds())
            var timetamp = (new Date()).getTime();
            if (time1 < timetamp) {
                callback('日期开始时间不能在当前时间之前')
            }
            callback()

        };
        return {
            // arr: "",
            cityList: '',
            // xzhys:'',
            mettingId: 0,
            ifmeeting: '1',  //是否选择会议室
            showmeeting: true,  //是否显示选择会议室
            $_formValidate_$: {
                //id:'',
                date: '',
                name: '',
                mobile: '',
                dwname: '',
                startTime: '',
                endTime: '',
                part: '',
                thing: '',
                xzhy: '',
                xzhys: '',
                startVisitDate: '',
                endVisitDate: '',

            },
            date: [],
            // date:[],
            $_scyq_$: '',
            $_ruleValidate_$: {
                name: [
                    {required: true, message: "请输入会议室名称", trigger: "blur"},
                    {type: 'string', max: 20, message: '名称不能超过20字', trigger: 'change'},
                    //特殊字符验证
                    {validator: this.$_validatestr_$, trigger: 'change'}
                ],
                mobile: [
                    // {required: true, type: 'number', trigger: 'blur'},
                    {required: true, validator: this.$_validatephone_$, trigger: 'change'}

                ],
                dwname: [
                    // {required: true, message: "请输入单位名称", trigger: "blur"},
                    {type: 'string', max: 20, message: '单位名称不能超过20字', trigger: 'change'},
                    //特殊字符验证
                    {validator: this.$_validatestr_$, trigger: 'change'}
                ],
                part: [
                    // {required: true, message: "所在部门不能为空", trigger: "blur"},
                    {type: 'string', max: 20, message: '部门名称不能超过20字', trigger: 'change'},
                    //特殊字符验证
                    {validator: this.$_validatestr_$, trigger: 'change'}
                ],
                thing: [
                    {required: true, type: 'string', message: '请填写来访是由', trigger: 'change'},
                    {type: 'string', max: 200, message: '不能超过200字', trigger: 'change'},
                ],
                date: [
                    {validator: validateData, trigger: 'change', type: 'date', required: true},
                    //             {
                    //           type: 'array',
                    //           required: true,
                    //           fields: {
                    //             0: { required: true, message: '请选择全天/时间范围', trigger: 'blur' },
                    //             1: { required: true, message: '请选择全天/时间范围', trigger: 'blur' }
                    //             }
                    //         }
                ]
            }
        }
    },
    created() {
        this.$_global_$.serverPath,
            this.yyhys()
    },
    methods: {
        yyhys() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            let userInfo = JSON.parse(cookie);
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/zone/zone/${userInfo.zoneId}/meeting/self/reserves`,
                data: {
                    status: 6
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        let arr = rsp.data.data.records;
                        this.cityList = [];
                        for (let i = 0; i < arr.length; i++) {
                            let temp = {};
                            temp = {
                                label: arr[i].meetingTheme,
                                value: {
                                    meetingId: arr[i].meetingId,
                                    meetingReserveId: arr[i].id,
                                }
                            };
                            this.cityList.push(temp)
                        }
                    }
                }
            })
        },
        FormatAllDate(sDate) {
            var date = new Date(sDate);
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            //月
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            //日
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            //时
            if (hours >= 0 && hours <= 9) {
                hours = "0" + hours;
            }
            //分
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            //秒
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            //格式化后日期为：yyyy-MM-dd HH:mm:ss
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + hours + seperator2 + minutes + seperator2 + seconds;
            return currentdate;
        },
        selectTime(event) {
            this.$_formValidate_$.date = event

        },
        //是否选择会议室
        ifmeetingchose(){
            if(this.ifmeeting==0){
                this.showmeeting = false;
            }else{
                this.showmeeting = true;
            }
        },
        choseHys(value) {
            this.$_formValidate_$.xzhys = value.label;
        },
        clearTime() {
            this.$_formValidate_$.date = []
        },
        $_handleSubmit_$() {
            this.$refs.$_Validate_$.validate((valid) => {
                if (valid) {
                    let sendData = {
                        // "id":this.$_formValidate_$.id,
                        "visitorName": this.$_formValidate_$.name,
                        "visitorMobile": this.$_formValidate_$.mobile,
                        "visitorCompany": this.$_formValidate_$.dwname,
                        "visitorOrg": this.$_formValidate_$.part,
                        "visitReason": this.$_formValidate_$.thing,
                        "visitDate": this.FormatAllDate(this.$_formValidate_$.date).substr(0,10),
                        "startTime": this.FormatAllDate(this.$_formValidate_$.date).substr(0,10),
                        "endTime": this.FormatAllDate(this.$_formValidate_$.date).substr(0,10),
                    };
                    if(this.showmeeting){
                        sendData.meetingId = this.$_formValidate_$.xzhy.meetingId;
                        sendData.meetingReserveId = this.$_formValidate_$.xzhy.meetingReserveId;
                    }
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/company/visitor/employee/create`,
                        data: sendData,
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        
                        this.$_scyq_$ = rsp.data.data;

                        this.$root.$_Route_$('employer', 'jump', 'scyq', { row: this.$_scyq_$})
                        //this.$_fquery_$()
                    })
                } else {
                    return false;
                }
            })
        },
        $_newInvite_$() {
            this.$root.inparams.id
        },

    }
}
</script>