<style scoped>
    .container {
        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 25px;
    }

    .box {
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 20px 30px;
    }

    .title {
        font-size: 14px;
        font-weight: 600;
    }
    .con{
        font-size: 14px;
        font-weight: 600;
    }
    .colp{
        margin-top: 10px;
    }

    .row1 {
        margin-bottom: 10px;
    }

    .ltjl {
        margin: 30px 20px;
    }

    .ltjl li {
        box-sizing: border-box;
        padding: 30px 100px 20px 100px;
        background: #f2f2f2;
        margin-bottom: 10px;
        position: relative;
    }

    .ltjl .right {
        text-align: right;
    }

    .ltjl .right .touxiang{
        position: absolute;
        right: 20px;
        top: 20px;
        width: 48px;
    }

    .ltjl .left {
        text-align: left;
    }

    .ltjl .left .touxiang{
        position: absolute;
        left: 20px;
        top: 20px;
        width: 48px;
    }

    .fankui {
        border: 1px solid #cccccc;
        box-sizing: border-box;
        padding: 20px;
        margin: 0 20px;
        line-height: 30px;
    }

    .icon {
        color: #FF0000;
        font-size: 12px;
    }

    .fankui img {
        vertical-align: middle;
    }

    .textarea {
        width: 800px;
        margin: 10px 0;
    }

    .button {
        margin: 20px 200px;
        width: 80px;
    }

    .f12 {
        font-size: 12px;
    }

    .ivu-upload {
        display: inline-block;
    }

    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .gj {
        background: #F2F2F2;
        width: 80%;
        margin: 0 auto 8px;
        padding: 20px 30px 30px 0;
        box-sizing: border-box;
    }

    .gj .gjimg {
        float: right;
        margin-left: 20px;
    }

    .gj .gjcont {
        float: right;
    }

    .gj .gjcont .name {
        text-align: right;
    }

    .gj .gjcont .deal {
        text-align: right;
    }

    .yh {
        background: #f7f7f7;
        width: 80%;
        margin: 0 auto 8px;
        padding: 20px 0 30px 30px;
        box-sizing: border-box;
    }

    .yh .yhimg {
        float: left;
        margin-right: 20px;
    }

    .yh .yhcont {
        float: left;
    }

    .name {
        margin-bottom: 10px;
    }

    .img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: #f00;
    }
    .fujian {
        margin-top: 15px;
    }

    .fujian img {
        width: auto;
        height: 100px;
    }
</style>
<template>
    <div class='container'>
        <!-- 事项概况 -->
        <Row class='box'>
            <Row class="row1">
                <span class="title">事项概况</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>单号：{{row.orderNumber}}</span>
            </Row>
            <Row>
                <Col span='6'>
                    <p class="colp">事项分类：<span class="con">{{row.recordTypeCode | formatType}}</span></p>
                    <p class="colp">事项名称：<span class="con">{{row.recordTitle}}</span></p>
                    <p class="colp">事项描述：<span class="con">{{row.recordDesc}}</span></p>
                </Col>
                <Col span='6'>
                    <p class="colp">管家名称：<span class="con">{{row.stewardName}}</span></p>
                    <p class="colp">联系方式：<span class="con">{{row.stewardPhoneNumber}}</span></p>
                    <p class="colp">用户单位：<span class="con">{{row.commiterEnterpriseName}}</span></p>
                </Col>
                <Col span='6'>
                    <p class="colp">提交时间：<span style="color:#01A0FB">{{row.commiterPubtime | formatDate}}</span></p>
                    <p >完成时间：<span style="color:#01A0FB">{{row.handlerCompletime | formatDate}}</span></p>
                    <p >受理时间：<span style="color:#01A0FB">{{row.handlerRecvtime | formatDate}}</span></p>
                    <p class="colp">状态：<span style="color:#FFCC01">{{row.recordStatus | formatStatus}}</span></p>
                        
                </Col>
                <Col span='6'>
                <div >
                    <Row>服务评价：</Row>
                    <Row class="f12">服务及时 &nbsp;&nbsp;&nbsp;&nbsp;
                        <Rate allow-half disabled v-model="this.row.commiterTimelinessStar"></Rate>
                    </Row>
                    <Row class="f12">流畅高效 &nbsp;&nbsp;&nbsp;&nbsp;
                        <Rate allow-half disabled v-model="this.row.commiterEfficiencyStar"></Rate>
                    </Row>
                    <Row class="f12">专业可靠 &nbsp;&nbsp;&nbsp;&nbsp;
                        <Rate allow-half disabled v-model="this.row.commiterReliableStar"></Rate>
                    </Row>
                    <Row class="f12">积极周到 &nbsp;&nbsp;&nbsp;&nbsp;
                        <Rate allow-half disabled v-model="this.row.commiterConsiderateStar"></Rate>
                    </Row>
                    <Row class="f12"><span style="display:block;float:left;">评价</span> &nbsp;&nbsp;&nbsp;&nbsp;
                        {{this.row.commiterEvaluate}}
                    </Row>
                </div>
            </Col>
            </Row>
        </Row>
        <!-- 聊天记录 -->
        <br>
        <div v-show="!recordShow">
            <p style="text-align:center;font-size:20px;line-height:40px;">暂无记录!</p>
        </div>
        <Row v-show="recordShow">
            <div class="record">
                <ul class="ltjl">
                    <li  style="height: 182px;" v-for="item in data" :class="{right:true,left:item.itemRoler!='c'}">
                        <span v-if="item.image">
                        <img class="touxiang"  :src="$_global_$.imgPath+item.image" alt=""></span>
                        <span v-else><img src="/static/defaultTX.png" alt=""></span>
                        <div>
                            <p>{{item.name}}：{{item.itemPubdate.replace("T"," ")}}</p>
                            <p v-if="item.itemInfo !=='zpyqmm00aa'">{{item.itemInfo}}</p>
                            <p v-if="item.itemAttachment" class="fujian">
                                <a v-if="!item.isImg" :href="$_global_$.imgPath + item.itemAttachment">附件下载</a>
                                <img v-if="item.isImg" :src="$_global_$.imgPath + item.itemAttachment">
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </Row>
        <Row v-if="row.recordStatus!=3" class="fankui">
            <div v-show="repeat">
                <Form :rules="formValidate" ref="form" :model="$_Form_$">
                    <FormItem label="我要反馈：" prop="desc">
                        <!-- <Row ><Icon type="asterisk" class="icon"></Icon> 我要反馈： </Row> -->
                        <Row>
                            <Input placeholder="请输入反馈信息"
                                   v-model.trim="$_Form_$.desc"
                                   :rows="5"
                                   type="textarea"></Input>
                        </Row>
                    </FormItem>
                    <FormItem label="附件：">
                        <Upload
                        :before-upload="handleUploadFile"
                        :on-remove="handleRemoveFile"
                        :on-success="uploadSuccessFile"
                        :default-file-list="uploadList"
                        :action='this.$_global_$.imgUploadPath'>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                    </Upload>
                    </FormItem>
                </Form>
                <Row>
                    <Button @click="fktj()" class="button" type="primary">提交</Button>
                </Row>
            </div>
            <!-- 服务评价 -->
            <div v-show="pingjia">
                <Row>服务评价：</Row>
                <Row class="f12">服务及时 &nbsp;&nbsp;&nbsp;&nbsp;
                    <Rate allow-half v-model="commiterTimelinessStar"></Rate>
                </Row>
                <Row class="f12">流畅高效 &nbsp;&nbsp;&nbsp;&nbsp;
                    <Rate allow-half v-model="commiterEfficiencyStar"></Rate>
                </Row>
                <Row class="f12">专业可靠 &nbsp;&nbsp;&nbsp;&nbsp;
                    <Rate allow-half v-model="commiterReliableStar"></Rate>
                </Row>
                <Row class="f12">积极周到 &nbsp;&nbsp;&nbsp;&nbsp;
                    <Rate allow-half v-model="commiterConsiderateStar"></Rate>
                </Row>
                <Row class="f12"><span style="display:block;float:left;">评价</span> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Input placeholder="请输入评价" v-model.trim="commiterEvaluate" :rows="5" style="width:300px;"
                           type="textarea"></Input>
                </Row>
                <Row style="position:relative;">
                    <Button @click="tjpj()" class="button" type="primary">完结并评价</Button>
                </Row>
            </div>
            <!-- 服务详情 -->
            <div v-show="detail">
                <Row>服务评价：</Row>
                <Row class="f12">服务及时 &nbsp;&nbsp;&nbsp;&nbsp;
                    <Rate allow-half disabled v-model="this.row.commiterTimelinessStar"></Rate>
                </Row>
                <Row class="f12">流畅高效 &nbsp;&nbsp;&nbsp;&nbsp;
                    <Rate allow-half disabled v-model="this.row.commiterEfficiencyStar"></Rate>
                </Row>
                <Row class="f12">专业可靠 &nbsp;&nbsp;&nbsp;&nbsp;
                    <Rate allow-half disabled v-model="this.row.commiterReliableStar"></Rate>
                </Row>
                <Row class="f12">积极周到 &nbsp;&nbsp;&nbsp;&nbsp;
                    <Rate allow-half disabled v-model="this.row.commiterConsiderateStar"></Rate>
                </Row>
                <Row class="f12"><span style="display:block;float:left;">评价</span> &nbsp;&nbsp;&nbsp;&nbsp;
                    {{this.row.commiterEvaluate}}
                </Row>
            </div>
        </Row>
    </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    filters: {
        formatStatus(val) {
            if (val == 0) {
                return '未受理'
            }
            if (val == 1) {
                return '已受理'
            }
            if (val == 2) {
                return '处理中'
            }
            if (val == 3) {
                return '已完成'
            }
        },
        formatType(val) {
            if (val == 1) {
                return '物业保修'
            }
            if (val == 2) {
                return '投诉建议'
            }
            if (val == 3) {
                return '企业服务咨询'
            }
            if (val == 4) {
                return '留言'
            }
        },
        formatDate(val) {
            if (val) {
                var date = new Date(val);
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
            } else {
                return ''
            }
        }
    },
    data() {
        return {
            $_querycfg_$: {
                mod: '',
                params: {}
            },
            $_Form_$: {
                desc: '',
                file: ''
            },
            formValidate: {
                desc: [
                    {required: true, message: '反馈信息不能为空', trigger: 'change'},
                    {type: 'string', max: 1000, message: '反馈信息不能超过1000个字', trigger: 'change'}
                ]
            },
            commiterTimelinessStar: 0,
            commiterEfficiencyStar: 0,
            commiterReliableStar: 0,
            commiterConsiderateStar: 0,
            commiterEvaluate: '',
            id: '',
            ids: '',
            row: {},
            data: [],
            upurl:[],
            baseUrl: this.$_global_$.imgPath,
            files: [],
            filesa: [],
            uploadList: [],
            $_file_$: [],
            recordShow: true,
            repeat: true,
            pingjia: false,
            detail: false,
            userInfo: {},
            hfaceurl: ''
        }
    },
    created() {
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.userInfo = JSON.parse(cookie);
        this.$_zcfkbtn_$();
        this.$_list_$()
    },
    methods: {
        downloadFile(url) {
            // console.log(url);return;
            try {
                var elemIF = document.createElement("iframe");
                elemIF.src =url;
                elemIF.style.display = "none";
                document.body.appendChild(elemIF);
            } catch (e) {

            }
        },
        $_test_$() {
            if (this.id == 1) {
                this.repeat = true
            }
            if (this.id == 2) {
                this.repeat = false
                this.pingjia = true
            }
            if (this.id == 3) {
                this.repeat = false
                this.pingjia = false
                this.detail = true
                this.row.commiterTimelinessStar = Number(this.row.commiterTimelinessStar) / 20
                this.row.commiterConsiderateStar = Number(this.row.commiterConsiderateStar) / 20
                this.row.commiterEfficiencyStar = Number(this.row.commiterEfficiencyStar) / 20
                this.row.commiterReliableStar = Number(this.row.commiterReliableStar) / 20
            }
        },
        // 再次反馈 服务评价 服务详情
        $_zcfkbtn_$() {
            this.ids = this.$root.inparams.row.id;
            this.id = this.$root.inparams.id;
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/steward/steward/queryRecordDetails`,
                data: {
                    recordId: this.ids,
                    role:"c"
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.row = rsp.data.data;                        
                    }
                }
            })
            this.$_test_$()
        },
        isInArray(arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (value == arr[i]) {
                    return true;
                }
            }
            return false;
        },
        // 服务咨询列表
        $_list_$() {
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/steward/steward/queryServiceItemByRecodeId`,
                data: {
                    record_id: this.ids,

                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.data = rsp.data.data;
                        for (let i = 0; i < this.data.length; i++) {
                            let arr = this.data[i].itemAttachment.split('.');
                            let dataArr = ['jpg', 'png', 'gif', 'jpeg'];
                            if (this.isInArray(dataArr,arr[1])) {
                                this.data[i].isImg = 1
                            } else {
                                this.data[i].isImg = 0
                            }
                        }
                        if (this.data.length == 0) {
                            this.recordShow = false
                        }
                    }
                }
            })
        },
        // 反馈提交
        fktj() {
            if (this.files.length > 0) {
                this.$_Form_$.file = this.files.join(';')
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/steward/steward/createServiceItem`,
                        data: {
                            "recordId": this.row.id,
                            "itemRoler": "c",
                            "name": this.row.commiterName,
                            "phoneNumber": this.row.commiterPhoneNumber,
                            "itemTitle": "",
                            "itemInfo": this.$_Form_$.desc,
                            "itemAttachment": this.$_Form_$.file,
                            "image": this.userInfo.faceUrl
                        }
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$Message.success(rsp.data.data)
                                this.$root.$_Route_$('employer', 'help', 'gjfw', {id: 1})
                            }
                        }
                    })
                }
            })
        },
        // 评价提交
        tjpj() {
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/steward/steward/evaluateServiceRecord`,
                data: {
                    "serviceRecordId": this.row.id,
                    "recordTitle": this.row.recordTitle,
                    "commiterTimelinessStar": this.commiterTimelinessStar * 20,
                    "commiterEfficiencyStar": this.commiterEfficiencyStar * 20,
                    "commiterReliableStar": this.commiterReliableStar * 20,
                    "commiterConsiderateStar": this.commiterConsiderateStar * 20,
                    "commiterEvaluate": this.commiterEvaluate
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$Message.success(rsp.data.data)
                        this.$root.$_Route_$('employer', 'help', 'gjfw', {id: 1})
                    } else {
                        this.$Message.error(rsp.data.message)
                    }
                }
            })
        },
        beforeupload() {
        },
        // 移除
        handleRemove(file, fileList) {
            this.fileRmove(fileList);
        },
        // 上传图片成功
        uploadSuccess(res, file, fileList) {
            this.fileChange(fileList);
        },
        // 设置photo值
        fileChange(fileList) {
            let a = {}
            if (fileList.length > 0) {
                for (let i = 0; i < fileList.length; i++) {
                    let temp_str = '';

                    if (fileList[i].response) {
                        if (fileList[i].response.code === 0) {
                            temp_str += fileList[i].response.data;
                            a = this.baseUrl + temp_str

                        }
                    }
                }
            }
            this.$_file_$.push(a)
        },
        // 移除设置photo值
        fileRmove(fileList) {
            let a = {}
            if (fileList.length > 0) {
                for (let i = 0; i < fileList.length; i++) {
                    let temp_str = '';
                    if (fileList[i].response) {
                        if (fileList[i].response.code === 0) {
                            temp_str += fileList[i].name;
                            a = this.baseUrl + temp_str
                        }
                    }
                }
            }
            this.$_file_$.pop(a)
        },
        // 文件上传
            handleUploadFile(file) {
                return this.isLtMB1(file);
            },
            // 上传成功
            uploadSuccessFile(response, file, fileList) {
                this.successFileChange(fileList);
            },
            // 设置photo值
            successFileChange(fileList) {
                let a = '';
                let b = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.$_global_$.imgPath + temp_str;
                                b = temp_str;
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.files.push(b);
                this.uploadList.push({
                    name: b,
                    url: a,
                    response:{code:0,data:b,message:""}
                })
            },
            // 移除
            handleRemoveFile(file, fileList) {
                this.fileRmoveFile(fileList);
            },
            // 移除设置photo值
            fileRmoveFile(fileList) {
                let a = '';
                let b = '';
                this.files = [];
                this.uploadList = [];

                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = this.$_global_$.imgPath + temp_str;
                                b = temp_str;
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                            this.files.push(b);
                            this.uploadList.push({
                                name: b,
                                url: a,
                                response:{code:0,data:b,message:""}
                            })
                        }
                    }
                }
            },
    }
}
</script>