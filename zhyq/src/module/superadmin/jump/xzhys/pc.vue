<style scoped>
    .step {
        width: 700px;
        height: 60px;
        margin: 0 auto 20px;
        position: relative;
    }

    .step .stepcont {
        position: absolute;
        top: 0;
        left: 18%;
    }

    .basic {
        width: 600px;
        margin: 0 auto;
    }

    .title {
        line-height: 50px;
        font-weight: bold;
    }

    .complete {
        padding-top: 100px;
    }

    .img {
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }

    .completeTitle {
        font-size: 20px;
        line-height: 50px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 150px;
    }

    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .tagList{
        height: 32px;
        line-height: 32px;
    }
    .input-new-tag{
        width: 90px;
        margin-left: 10px;
        height: 32px;
        vertical-align: bottom;
    }
</style>
<template>
    <div>
        <!-- 步骤条 -->
        <div class="step">
            <Steps class="stepcont" :current="current" size="small">
                <Step content="会议室基本信息"></Step>
                <Step content="会议室配置"></Step>
                <Step content="完成"></Step>
            </Steps>
        </div>
        <!-- 会议室基本信息 -->
        <div class="basic" v-show="$_basic_$">
            <p class="title">会议室基本信息</p>
            <Form
                    ref="addAssembForm"
                    :rules="addAssembFormValidate"
                    :model="$_addAssembForm_$"
                    :label-width="90"
            >
                <FormItem label="所属园区:" prop="zoneId">
                    <Select v-model="$_addAssembForm_$.zoneId"
                            @on-change="chosezone" placeholder="园区"
                            class="input" style="width:240px">
                        <Option v-for="(item,index) in zones"
                                :label="item.label"
                                :value="item.value"
                                :key="index"></Option>
                    </Select>
                </FormItem>
                <FormItem label="预览图:" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            ref="uploadxls"
                            :show-file-list="true"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            accept="image/png, image/gif, image/jpg, image/jpeg"
                    >
                        <el-dialog :visible.sync="dialogVisible" append-to-body>
                            <img width="100%" :src="dialogImageUrl" alt>
                        </el-dialog>
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span style="color: #f00">建议图片尺寸：500*300</span>
                </FormItem>
                <FormItem label="会议室名称:" prop="name">
                    <Input v-model="$_addAssembForm_$.name"></Input>
                </FormItem>
                <FormItem label="地址关联" prop="add">
                    <Select :label-in-value="true"
                            v-model="$_addAssembForm_$.building"
                            @on-change="building"
                            placeholder="建筑" class="input" style="width:20%;">
                        <Option v-for="(item,index) in buildings"
                                :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select :label-in-value="true"
                            v-model="$_addAssembForm_$.floorId"
                            @on-change="chosefloor" placeholder="楼层" class="input" style="width:20%">
                        <Option v-for="(item,index) in floors" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select :label-in-value="true"
                            @on-change="choseroom"  multiple
                            v-model="$_addAssembForm_$.roomIds" placeholder="房间" class="input" style="width:58%;">
                        <Option v-for="(item,index) in rooms" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="会议室地址:" prop="address">
                    <Input v-model="$_addAssembForm_$.address"></Input>
                </FormItem>
                <FormItem label="在线预约:" >
                    <Switch size="large" v-model="$_addAssembForm_$.onlineBooking">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </Switch>
                </FormItem>
                <FormItem label="非标准化服务">
                    <Tag v-for="item in dynamicTags" class="tagList" :key="item" closable @on-close="handleClose(item)">{{item}}</Tag>
                    <input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            @blur="handleInputConfirm"></input>
                    <Button v-else icon="ios-plus-empty" type="dashed" @click="handleAdd">添加服务</Button>
                </FormItem>
                <FormItem label="标准化服务">
                    <CheckboxGroup v-model="choosetags">
                        <Checkbox v-for="item in tagsList" :label="item.id">{{item.tagName}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="面积:" prop="area">
                    <Input v-model="$_addAssembForm_$.area"></Input>
                </FormItem>
                <FormItem label="容纳人数:" prop="peopleNumber">
                    <Input v-model="$_addAssembForm_$.peopleNumber"></Input>
                </FormItem>
                <FormItem label="会议室描述:" prop="description" style="width:600px">
                    <quill-editor ref="myTextEditor" v-model="$_addAssembForm_$.description" :options="quillOption"></quill-editor>

                </FormItem>
                <FormItem label="对接对象:" prop="configDescription">
                    <Input
                            type="textarea"
                            :autosize="{minRows: 2,maxRows: 5}"
                            v-model="$_addAssembForm_$.configDescription"
                    ></Input>
                </FormItem>
                <FormItem align="center">
                    <!-- <Button type="ghost" style="margin-right: 8px" @click="$_zSave_$()">暂存</Button> -->
                    <Button v-if="repeat" type="primary" @click="$_next_$()">下一步</Button>
                    <Button v-if="!repeat" type="primary" @click="$_secondNext_$()">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 会议室配置 -->
        <div class="basic" v-show="$_setting_$">
            <p class="title">会议室配置</p>
            <Form
                    ref="assembSeting"
                    :rules="assembSetingValidate"
                    :model="$_assembSeting_$"
                    :label-width="130"
            >
                <Row>
                    <Col span="24">
                        <FormItem label="需提前多久预约:" prop="advanceTime">
                            <Row>
                                <Col span="20">
                                    <Input v-model="$_assembSeting_$.advanceTime1" style="width:95%"></Input>
                                </Col>
                                <Col span="4" align="center" style="line-height: 32px;">小时</Col>
                            </Row>
                            <Row>
                                <Col span="20">
                                    <Input v-model="$_assembSeting_$.advanceTime2" style="width:95%"></Input>
                                </Col>
                                <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>

                <FormItem label="开放时间:" prop="opentime">
                    <TimePicker
                            v-model="Time"
                            format="HH:mm"
                            type="timerange"
                            placement="bottom-end"
                            :steps="[1,5]"
                            style="width: 168px"
                    ></TimePicker>
                </FormItem>
                <Row>
                    <Col span="20">
                        <FormItem label="起订时间:" prop="baseTime">
                            <Input v-model="$_assembSeting_$.baseTime"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="最小增加时间单位:" prop="intervalTime">
                            <Input v-model="$_assembSeting_$.intervalTime"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="最小退订时间:" prop="cancelTime">
                            <Input v-model="$_assembSeting_$.cancelTime"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="会议室打扫时间:" prop="clearTime">
                            <Input v-model="$_assembSeting_$.clearTime"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="消费:" prop="price">
                            <Input v-model="$_assembSeting_$.price"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">元/分钟</Col>
                </Row>
                <FormItem label="退订返还比例:" prop="refundScale">
                    <Input v-model="$_assembSeting_$.refundScale"></Input>
                    <p>例如：预约会议室使用100积分，退订返还70积分</p>
                </FormItem>
                <FormItem align="center">
                    <!-- <Button type="primary" @click="$_zancun_$()">暂存</Button> -->
                    <Button type="primary" @click="$_sStep_$()">上一步</Button>
                    <Button type="primary" @click="$_nextStep_$()">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 完成 -->
        <div class="complete" v-show="$_complete_$">
            <!-- <img src="" alt=""> -->
            <div class="img"></div>
            <p class="completeTitle">添加成功</p>
            <Row>
                <Col span="24" align="center">
                    <Button type="primary" @click="$_goList_$()">返回列表</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import ElementUI from "element-ui";
    import "element-ui/lib/theme-chalk/index.css";
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config';

    import {
        Button,
        Select,
        Option,
        Table,
        TableColumn,
        Upload,
        Dialog,
        Form,
        FormItem
    } from "element-ui";

    export default {
        mixins: [controler],
        components: {
            quillEditor,
            [Select.name]: Select,
            [Button.name]: Button,
            [Option.name]: Option,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Upload.name]: Upload,
            [Dialog.name]: Dialog,
            [Form.name]: Form,
            [FormItem.name]: FormItem
        },

        data() {
            const validateimg = (rule, value, callback) => {
                if (this.file != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validateaddr = (rule, value, callback) => {
                if (this.$_addAssembForm_$.building != "" && this.$_addAssembForm_$.floorId != "") {
                    callback();
                } else {
                    callback('请选择地址');
                }
            };
            const number = (rule, value, callback) => {
                if (/^[0-9]*[1-9][0-9]*$/.test(Number(value))) {
                    callback()
                } else {
                    callback(new Error('容纳人数应为正整数!'))
                }
            };
            const num = (rule, value, callback) => {
                if (/^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/.test(Number(value))) {
                    callback()
                } else {
                    callback(new Error('面积应为数字类型!'))
                }
            };
            const price = (rule, value, callback) => {
                if (/^[0-9]*[1-9][0-9]*$/.test(Number(value))) {
                    callback()
                } else {
                    callback(new Error('价格应为正整数!'))
                }
            };
            const advanceTime = (rule, value, callback) => {
                let time1 = this.$_assembSeting_$.advanceTime1; //提前预约时间  小时
                let time2 = this.$_assembSeting_$.advanceTime2; //提前预约时间  分钟
                let reg = /^\+?[0-9]*$/;

                if( time1 || time2){
                    if (reg.test(Number(time1)) && time1 && !time2) {
                        this.$_assembSeting_$.advanceTime = Number(time1)*60;
                        callback()
                    } else if (reg.test(Number(time2)) && time2 && !time1){
                        if(time2<=60){
                            this.$_assembSeting_$.advanceTime = Number(time2);
                            callback()
                        }else{
                            callback(new Error('分钟数不能超过60'))
                        }
                    } else if (reg.test(Number(time1)) && reg.test(Number(time2))){
                        if(time2<60){
                            this.$_assembSeting_$.advanceTime = Number(time1)*60+Number(time2);
                            callback()
                        }else{
                            callback(new Error('分钟数不能超过60'))
                        }
                    } else {
                        callback(new Error('提前预约时间应为正整数!'))
                    }
                }else{
                    callback(new Error('请填写提前多久预约时间!'))
                }
            };
            const baseTime = (rule, value, callback) => {
                if(Number(value)%15 === 0){
                    if(Number(value)>=30){
                        callback()
                    }else{
                        callback(new Error('最小时间应为30'))
                    }
                }else{
                    callback(new Error('最小时间应为15的倍数!'))
                }
                // if((Number(value)%15 === 0) || (Number(value)===30)){
                //   callback()
                // }else{
                //   callback(new Error('最小时间应为30且为15的倍数!'))
                // }
            };
            const baseTime2 = (rule, value, callback) => {
                if(Number(value)%5 === 0){
                    callback()
                }else{
                    callback(new Error('最小时间应为5的倍数!'))
                }
            };
            const baseTime1 = (rule, value, callback) => {
                if(Number(value)%15 === 0){
                    callback()
                }else{
                    callback(new Error('最小时间应为15的倍数!'))
                }
            };

            const refundScale = (rule, value, callback) => {
                if (/^\d+$/.test(Number(value)) && Number(value) >= 1 && Number(value) <= 100) {
                    callback()
                } else {
                    callback(new Error('退订比例应为1-100之间的整数!'))
                }
            };
            return {
                quillOption: quillConfig,

                editorOption: {modules: {toolbar: '#toolbar'}},
                current: 0, // 步骤条
                id: "", //传参
                zoneId: 0,
                buildId: 0,
                floorId: 0,
                zones: [],
                $_basic_$: true,
                $_setting_$: false,
                $_complete_$: false,
                imgName: "",
                dialogVisible: false,
                dialogImageUrl: "",
                file: [],
                buildings: [],
                floors: [],
                rooms: [],
                dynamicTags: [], //非标准化服务
                inputVisible: false, // 非标准化服务标签输入框可见性
                inputValue: '', // 非标准化服务标签输入绑定
                tagsList: [], //标准化服务列表
                choosetags: [], //选择的标准化服务
                $_addAssembForm_$: {
                    // 会议室基本信息
                    zoneId: '',
                    name: '',
                    building: '',
                    floorId: '',
                    images: [],
                    file: [],
                    roomIds: '',
                    area: '',
                    peopleNumber: '',
                    configDescription: "",
                    description: "",
                    address: "",
                    onlineBooking: false,  //是否开启在线预约
                },
                //配置信息
                $_assembSeting_$: {
                    // 会议室配置
                    price: "",
                    opentime: '开放时间',
                    startTime: "",
                    endTime: "",
                    advanceTime: "",
                    baseTime: "",
                    intervalTime: "",
                    clearTime: "",
                    cancelTime: "",
                    refundScale: ""
                },
                addAssembFormValidate: {
                    //基本信息表单验证
                    // zoneId: [{required: true, message: "请选择园区", trigger: "change"}],
                    name: [
                        {required: true, message: "请输入会议室名称", trigger: "blur"},
                        {type: 'string', max: 20, message: '名称不能超过20字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    address: [
                        {required: true, type: 'string', message: '请填写园区详细地址', trigger: 'change'},
                        {type: 'string', max: 100, message: '地址不能超过100字', trigger: 'change'},
                    ],
                    peopleNumber: [
                        {required: true, message: '请填写容纳人数', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {max: 7, message: '不能超过7位数', trigger: 'change'},
                    ],
                    add: [{required: true, validator: validateaddr, trigger: 'change'}],
                    file: [
                        {required: true, validator: validateimg, trigger: 'change'}
                    ],
                    area: [
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {max: 7, message: '不能超过7位数', trigger: 'change'},
                    ]
                },
                assembSetingValidate: {
                    //会议室配置表单验证
                    price: [
                        {required: true, validator: price, trigger: "change"}
                    ],
                    opentime: [
                        {required: true, message: "请填写开放时间", trigger: "blur"},
                    ],
                    advanceTime: [
                        {required: true,validator: advanceTime, trigger: "change"},
                    ],
                    baseTime: [
                        {required: true, message: "请填写起订时间", trigger: "change"},
                        {validator: baseTime, trigger: "change"}
                    ],
                    intervalTime: [
                        {required: true, message: "请填写最小增加时间", trigger: "change"},
                        {validator: baseTime1, trigger: "change"}
                    ],
                    clearTime: [
                        {required: true, message: "请填写打扫时间", trigger: "change"},
                        {validator: baseTime1, trigger: "change"}
                    ],
                    cancelTime: [
                        {required: true, message: "请填写最小退订时间", trigger: "change"},
                        {validator: baseTime2, trigger: "change"}
                    ],
                    refundScale: [
                        {required: true, message: "请输入比例", trigger: "change"},
                        {validator: refundScale, trigger: "change"}
                    ]
                },
                Time: [],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                userInfo: '',
                repeat: true, // 上一步
                disable: false,
            };

        },
        created() {
            this.$_global_$.serverPath
            // this.zList();
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);

            //默认选中当前要添加会议室的园区
            this.zones = this.$root.inparams.zoneList;
            this.$_addAssembForm_$.zoneId = this.$root.inparams.zoneId;
            this.zoneId = this.$root.inparams.zoneId;

            //获取相关地址
            this.bList();

            //获取会议室标签列表
            this.meetingTags();
        },
        mounted() {
            // this.$_addAssembForm_$ = {};
        },
        methods: {
            // 图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // upload的自己上传
            beforeupload(file) {
                this.$set(this.$_addAssembForm_$, "images", this.file); // 向表单数据中添加图片数组
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
                let a = {};
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }

                    }
                }
                this.file.push(a);
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {};
                this.file = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = {imageUrl: this.$_global_$.imgPath + temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                            this.file.push(a);
                        }

                    }
                }
            },

            $_addAssemb_$() {
                this.$root.inparams.id;
            },
            //获取园区信息
            /*zList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {
                        pageSize: 9999999
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records;
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id + ''
                                };
                                this.zones.push(temp)
                            }
                        }
                    }
                })
            },*/
            bList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };
                                this.buildings.push(temp)
                            }
                        }
                    }
                })
            },
            fList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };
                                this.floors.push(temp)
                            }
                        }
                    }
                })
            },
            rList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            for (var i = 0; i < arr.length; i++) {
                                if(arr[i].used==0) {
                                    //used 为0时，代表该房间未被绑定，可以显示
                                    var temp = {};
                                    temp = {
                                        label: arr[i].name,
                                        value: arr[i].id
                                    };
                                    this.rooms.push(temp)
                                }
                            }
                        }
                    }
                })
            },
            //更改园区
            chosezone(value) {
                this.$_addAssembForm_$.zoneId = value;
                this.$_addAssembForm_$.building = '';
                this.$_addAssembForm_$.floorId = '';
                this.$_addAssembForm_$.roomIds = '';
                this.zoneId = value;
                this.buildings = [];
                this.floors = [];
                this.rooms = [];
                this.bList()

            },
            building(value) {
                if (value) {
                    this.$_addAssembForm_$.floorId = '';
                    this.$_addAssembForm_$.roomIds = '';
                    this.buildId = value.value;
                    this.floors = [];
                    this.rooms = [];
                    this.fList()
                }
            },
            chosefloor(value) {
                if (value) {
                    this.$_addAssembForm_$.roomIds = '';
                    this.floorId = value.value;
                    this.rooms = [];
                    this.rList()
                }
            },
            choseroom(value) {
            },

            //非标准化服务增加和减少
            handleAdd(){
                this.inputVisible = true;
                this.$nextTick(function() {
                    this.$refs.saveTagInput.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            handleClose (tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            //获取会议室标签列表
            meetingTags(){
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/meeting/tags`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if(rsp.status === 200){
                        if (rsp.data.code === 0) {
                            this.tagsList = rsp.data.data;
                        }else{
                            this.$Message.error(rsp.data.message)
                        }
                    }
                }).catch((error)=>{
                    this.$Message.error(error.response.data.message);
                })
            },

            //基础暂存
            $_zSave_$() {
            },
            // 基础下一步
            $_next_$() {
                let choosetags = [];
                for(let i=0;i<this.choosetags.length;i++){
                    choosetags.push({"id":this.choosetags[i]})
                }
                this.$_addAssembForm_$.images = this.file;
                this.$refs.addAssembForm.validate(valid => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_addAssembForm_$.zoneId}/meeting`,
                            data: {
                                name: this.$_addAssembForm_$.name,
                                buildingId: Number(this.$_addAssembForm_$.building),
                                floorId: Number(this.$_addAssembForm_$.floorId),
                                roomIds: this.$_addAssembForm_$.roomIds.join(","),
                                area: Number(this.$_addAssembForm_$.area),
                                images: this.$_addAssembForm_$.images,
                                peopleNumber: this.$_addAssembForm_$.peopleNumber,
                                configDescription: this.$_addAssembForm_$.configDescription,
                                description: this.$_addAssembForm_$.description,
                                address: this.$_addAssembForm_$.address,
                                onlineBooking: this.$_addAssembForm_$.onlineBooking?1:0,
                                tags: this.dynamicTags.join(","),
                                standardTags: choosetags,
                            },
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.id = rsp.data.data.id;
                                    this.zoneId = rsp.data.data.zoneId;
                                    this.current++;
                                    this.$_basic_$ = false;
                                    this.$_setting_$ = true;
                                }else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        });

                    } else {
                        this.$Message.error("请填写正确的会议室信息");
                    }
                });
            },
            // 返回上一步再下一步
            $_secondNext_$() {
                this.$_addAssembForm_$.images = this.file;

                this.$refs.addAssembForm.validate(valid => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_addAssembForm_$.zoneId}/meeting`,
                            data: {
                                name: this.$_addAssembForm_$.name,
                                buildingId: Number(this.$_addAssembForm_$.building),
                                floorId: Number(this.$_addAssembForm_$.floorId),
                                roomIds: this.$_addAssembForm_$.roomIds,
                                area: Number(this.$_addAssembForm_$.area),
                                images: this.$_addAssembForm_$.images,
                                peopleNumber: this.$_addAssembForm_$.peopleNumber,
                                configDescription: this.$_addAssembForm_$.configDescription,
                                description: this.$_addAssembForm_$.description,
                                address: this.$_addAssembForm_$.address,
                                id: this.id
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.current++;
                                    this.$_basic_$ = false;
                                    this.$_setting_$ = true;
                                } else {
                                    this.$Message.error('请填写正确的信息')
                                }
                            }
                        })
                    }
                })
            },
            // 配置暂存
            $_zancun_$() {
            },
            // 配置上一步
            $_sStep_$() {
                this.current--;
                this.$_basic_$ = true;
                this.$_setting_$ = false;
                this.repeat = false
                this.disable = true
            },
            // 配置下一步
            $_nextStep_$() {
                if (this.Time[0] != '' && this.Time[1] != '') {
                    this.$_assembSeting_$.startTime = this.Time[0]
                    this.$_assembSeting_$.endTime = this.Time[1]
                    this.$refs.assembSeting.validate(valid => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/meeting/${this.id}/config`,
                                data: {
                                    price: Number(this.$_assembSeting_$.price),
                                    startTime: this.$_assembSeting_$.startTime,
                                    endTime: this.$_assembSeting_$.endTime,
                                    advanceTime: Number(this.$_assembSeting_$.advanceTime),
                                    baseTime: Number(this.$_assembSeting_$.baseTime),
                                    intervalTime: Number(this.$_assembSeting_$.intervalTime),
                                    clearTime: Number(this.$_assembSeting_$.clearTime),
                                    cancelTime: Number(this.$_assembSeting_$.cancelTime),
                                    refundScale: Number(this.$_assembSeting_$.refundScale)
                                },
                                headers: {"Content-type": "application/json"}
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.current++;
                                        this.$_setting_$ = false;
                                        this.$_complete_$ = true;
                                    } else {
                                        this.$Message.error(rsp.data.message)
                                    }
                                }
                            })
                        }
                    })
                } else {
                    this.$Message.error('请填写开放时间!')
                }
            },
            // 返回列表
            $_goList_$() {
                this.$root.$_Route_$("superadmin", "sssManage", "assembManage", {zoneId:this.zoneId});
            },
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
    };
</script>