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
        font-size: 18px;
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

    .ltjl .right img {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 48px;
    }

    .ltjl .left {
        text-align: left;
    }

    .ltjl .left img {
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

    .fankui .button {
        margin: 20px 200px;
        width: 80px;
    }

    .f12 {
        font-size: 12px;
    }

    .ivu-upload {
        float: left;
        margin-left: 10px;
    }
</style>
<template>
    <div class='container'>
        <!-- 事项概况 -->
        <Row class='box'>
            <Row class="row1">
                <span class="title">事项概况</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>单号：{{row.id}}</span>
            </Row>
            <Row>
                <Col span='6'>
                    <p>事项分类：{{row.recordTypeCode | formatrecordTypeCode}}</p>
                    <p>事项名称：{{row.recordTitle}}</p>
                    <p>事项描述：{{row.recordDesc}}</p>
                </Col>
                <Col span='6'>
                    <p>管家名称：{{row.stewardName}}</p>
                    <p>联系方式：{{row.stewardPhoneNumber}}</p>
                </Col>
                <Col span='12'>
                    <p>提交时间：{{row.commiterPubtime.replace("T"," ")}} &nbsp;&nbsp;&nbsp;&nbsp; 状态：{{row.recordStatus |
                        statusFormat}}</p>
                        <p >完成时间:{{row.handlerCompletime}}</p>
                    <p >受理时间:{{row.handlerRecvtime}}</p>
                </Col>
            </Row>
        </Row>
        <!-- 聊天记录 -->
        <Row>
            <ul class="ltjl">
                <li v-for="item in list" :class="{right:true,left:item.itemRoler=='c'}">
                    <span v-if="item.image">
                        <img :src="$_global_$.imgPath+item.image" alt=""></span>
                        <span v-else><img src="../../../../../static/defaultTX.png" alt=""></span>
                    <!-- <img :src="item.image" alt=""> -->
                    <div>
                        <p>{{item.name}}：{{item.itemPubdate.replace("T"," ")}}</p>
                        <p>{{item.itemInfo}}</p>
                        <div  v-if="item.itemAttachment.length > 0">附件：
                            <div v-for="(tmp,index) in item.itemAttachment">
                                <a v-if="tmp" :href="$_global_$.imgPath+tmp" >附件{{index+1}}</a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </Row>
        <Row v-if="row.recordStatus!=3" class="fankui">
            <Row>
                <Icon type="asterisk" class="icon"></Icon>
                问题处理：
            </Row>
            <Row><Input v-model="desc" :rows="5" class="textarea" type="textarea"></Input></Row>
            <Row><p style="float:left">附件：</p>
                <Upload
                        :before-upload="handleUploadFile"
                        :on-remove="handleRemoveFile"
                        :on-success="uploadSuccessFile"
                        :default-file-list="uploadList"
                        :action='this.$_global_$.imgUploadPath'>
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                </Upload>
            </Row>
            <Row>
                <Button class="button" type="primary" @click="send()">提交</Button>
            </Row>

        </Row>
    </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    filters: {
        statusFormat(val) {
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
        formatrecordTypeCode(val){
            if(val==1){
                return '物业保修'
            }else if(val==2){
                return '投诉建议'
            }else if(val==3){
                return '企业服务咨询'
            }else{
                return '留言'
            }
        }
    },
    data() {
        return {
            hfaceurl: '',//管家头像
             list: {},
            $_querycfg_$: {
                mod: '',
                params: {}
            },
            baseUrl: this.$_global_$.imgPath,
            row: {},
            files: [],
            uploadList: [],
            desc: ''

        }
    },
    created() {
        this.$_remove_$()
        this.servicelist();
    },
    methods: {
        //获取服务咨询列表
        servicelist() {
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/steward/steward/queryServiceItemByRecodeId`,
                data: {
                    record_id: this.row.id
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.list = rsp.data.data;
                        for (var key in this.list) {
                            for (var tmp in this.list[key]) {
                                if (tmp == 'itemAttachment') {
                                    if(this.list[key][tmp].length>0){
                                        this.list[key][tmp] = this.list[key][tmp].split(';');
                                    }
                                }
                            }

                        }
                    }
                }
            })
        },
        downloadFile(url) {
            try {
                var elemIF = document.createElement("iframe");
                elemIF.src = url;
                elemIF.style.display = "none";
                document.body.appendChild(elemIF);
            } catch (e) {

            }
        },
        $_remove_$() {
            this.row = this.$root.inparams.row;
            this.hfaceurl = this.$root.inparams.hfaceurl;
            // this.ids = this.$root.inparams.row.id;
            // this.id = this.$root.inparams.id;
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/steward/steward/queryRecordDetails`,
                data: {
                    recordId: this.row.id,
                    role:"h"
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.row = rsp.data.data;    
                        if(this.row.handlerRecvtime){
                            this.row.handlerRecvtime = this.row.handlerRecvtime.replace("T"," ");
                        }   
                        if(this.row.handlerCompletime){
                            this.row.handlerCompletime = this.row.handlerCompletime.replace("T"," ");
                        }                  
                    }
                }
            })
            // this.$_test_$()
        },
        send() {
            if (this.desc.length == 0) {
                this.$Message.warning('请填写问题处理内容');
                return;
            }
            if (this.files.length > 0) {
                this.files = this.files.join(';')
            }else{
                this.files = '';
            }
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/steward/steward/createServiceItem`,
                data: {
                    recordId: this.row.id,
                    itemRoler: "h",
                    name: this.row.stewardName,
                    phoneNumber: this.row.stewardPhoneNumber,
                    itemTitle: "",
                    itemInfo: this.desc,
                    itemAttachment: this.files,
                    image: this.hfaceurl
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                 if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$root.$_Route_$('employer', 'fwsl', 'fwjl', {id: 1})
                    }
                }
            })
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