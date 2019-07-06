<style scoped>
    .basic {
        width: 50%;
        margin: 0 auto;
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
    <div class="basic">
        <p class="title">会议室基本信息</p>
        <Form
                ref="addAssembForm"
                :rules="addAssembFormValidate"
                :model="$_addAssembForm_$"
                :label-width="90"
        >
            <FormItem label="所属园区:" prop="zoneId">
                <Select disabled v-model="$_addAssembForm_$.zoneId"
                        placeholder="园区"
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
                        ref="uploadxls"
                        :show-file-list="true"
                        :before-upload="beforeupload"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :file-list="imageList"
                        accept="image/png, image/gif, image/jpg, image/jpeg">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span style="color: #f00">建议图片尺寸：500*300</span>
            </FormItem>
            <FormItem label="会议室名称:" prop="name">
                <Input v-model="$_addAssembForm_$.name"></Input>
            </FormItem>
            <FormItem label="地址关联" prop="add">
                <Select :label-in-value="true"
                        v-model="$_addAssembForm_$.buildingId"
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
                <Select :label-in-value="true" multiple
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

            <FormItem label="面积:">
                <Input v-model="$_addAssembForm_$.area"></Input>
            </FormItem>
            <FormItem label="容纳人数:" prop="peopleNumber">
                <Input v-model="$_addAssembForm_$.peopleNumber"></Input>
            </FormItem>
            <FormItem label="会议室描述:" prop="description">
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
                <Button type="primary" @click="$_secondNext_$()">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import controler from './controler.js';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import {Upload} from 'element-ui';
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config';

    export default {
        components: {
            quillEditor,
            [Upload.name]: Upload
        },
        mixins: [controler],
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validateaddr = (rule, value, callback) => {
                if (this.$_addAssembForm_$.buildingId != "" && this.$_addAssembForm_$.floorId != "") {
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
            return {
                quillOption: quillConfig,
                editorOption: {modules: {toolbar: '#toolbar'}},
                row: {},
                dynamicTags: [], //非标准化服务
                inputVisible: false, // 非标准化服务标签输入框可见性
                inputValue: '', // 非标准化服务标签输入绑定
                tagsList: [], //标准化服务列表
                choosetags: [], //选择的标准化服务
                $_addAssembForm_$: {},
                addAssembFormValidate: {
                    //基本信息表单验证
                    building: [{
                        required: true, message: "必填", trigger: "blur"
                    }],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}],
                    name: [
                        {required: true, message: "请输入会议室名称", trigger: "change"},
                        {type: 'string', max: 20, message: '名称不能超过20字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    add: [{required: true, validator: validateaddr, trigger: 'change'}],
                    address: [
                        {required: true, type: 'string', message: '请填写园区详细地址', trigger: 'change'},
                        {type: 'string', max: 100, message: '地址不能超过100字', trigger: 'change'},
                    ],
                    peopleNumber: [
                        {required: true, validator: this.$_validatepostiveint_$, trigger: 'change'}
                    ],
                },
                zoneId: 0,
                buildId: 0,
                floorId: 0,
                zones: [],
                buildings: [],
                floors: [],
                rooms: [],
                imageList: [],
                $_file_$: []
            }
        },
        methods: {
            $_edit_$() {
                this.$_addAssembForm_$ = this.$root.inparams.row;
                this.row = this.$root.inparams.row;

                //已经选择的标准化服务
                this.choosetags = [];
                for(let i=0;i<this.row.standardTags.length;i++){
                    this.choosetags.push(this.row.standardTags[i]["id"]);
                }
                this.dynamicTags = this.row.tags.split(",");
                this.zoneId = this.row.zoneId;
                this.buildId = this.row.buildingId;
                this.floorId = this.row.floorId;

                this.$_addAssembForm_$.onlineBooking = this.row.onlineBooking==1?true:false;  //是否开启在线预约
                this.$_addAssembForm_$.roomIds = this.row.roomIds.split(",");
                this.$_addAssembForm_$.roomIds = this.$_addAssembForm_$.roomIds.map(Number);
                this.$_addAssembForm_$.zoneId = '' + this.row.zoneId;
                this.$_addAssembForm_$.buildingId = this.row.buildingId;
                for (let i = 0; i < this.$_addAssembForm_$.images.length; i++) {
                    this.imageList[i] = {};
                    this.imageList[i].url = this.$_global_$.imgPath + this.$_addAssembForm_$.images[i].imageUrl;
                    this.imageList[i].response={code:0,data:this.$_addAssembForm_$.images[i].imageUrl,message:""};
                    this.$_file_$[i] = {imageUrl: ''};
                    this.$_file_$[i].imageUrl = this.$_addAssembForm_$.images[i].imageUrl;
                }
            },
            // 保存
            $_secondNext_$() {
                let choosetags = [];
                for(let i=0;i<this.choosetags.length;i++){
                    choosetags.push({"id":this.choosetags[i]})
                }

                this.$_addAssembForm_$.images = this.$_file_$;
                this.$set(this.$_addAssembForm_$, "images", this.$_file_$);
                this.$refs.addAssembForm.validate(valid => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_addAssembForm_$.zoneId}/meeting`,
                            data: {
                                name: this.$_addAssembForm_$.name,
                                buildingId: Number(this.$_addAssembForm_$.buildingId),
                                floorId: Number(this.$_addAssembForm_$.floorId),
                                roomIds: this.$_addAssembForm_$.roomIds.join(","),
                                area: Number(this.$_addAssembForm_$.area),
                                images: this.$_addAssembForm_$.images,
                                peopleNumber: this.$_addAssembForm_$.peopleNumber,
                                configDescription: this.$_addAssembForm_$.configDescription,
                                description: this.$_addAssembForm_$.description,
                                address: this.$_addAssembForm_$.address,
                                id: this.row.id,
                                onlineBooking: this.$_addAssembForm_$.onlineBooking?1:0,
                                tags: this.dynamicTags.join(","),
                                standardTags: choosetags,
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$root.$_Route_$("superadmin", "sssManage", "assembManage", {zoneId: this.zoneId});
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    }
                })

            },
            //获取园区信息
            zList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {},
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
            },
            // 获取大楼信息
            bList() {
                // this.$_addAssembForm_$.buildingId=''
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
            // 获取楼层信息
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
            // 获取房间信息
            rList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            for (let i = 0; i < arr.length; i++) {
                                 let temp = {};
                                
                                // for(let j=0;j<this.$_addAssembForm_$.roomIds.length;j++){
                                        if(arr[i].used==0) {
                                            //used 为0时，代表该房间未被绑定，可以显示
                                           
                                            temp = {
                                                label: arr[i].name,
                                                value: arr[i].id
                                            };
                                           
                                        }else{
                                            temp = {
                                                label: arr[i].name+'(已占用)',
                                                value: arr[i].id
                                            };
                                         
                                        }
                                    
                                // }
                            
                                this.rooms.push(temp)
                            }
                        }
                    }
                })
            },
            // 切换大楼
            building(value) {
                this.$_addAssembForm_$.floorId = '';
                this.$_addAssembForm_$.roomIds = '';
                this.buildId = value.value;
                this.floors = [];
                this.rooms = [];
                this.fList()
            },
            // 切换楼层
            chosefloor(value) {
                this.$_addAssembForm_$.roomIds = '';
                this.floorId = value.value;
                this.rooms = [];
                this.rList()
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

            beforeupload(file) {
                return this.isLtMB(file);
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_addAssembForm_$.file = res.data;
                this.fileChange(fileList);
                // this.$refs.file.clearValidate();
            },
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
                this.$_file_$.push(a);
            },
            fileRmove(fileList) {
                let a = {};
                this.$_file_$ = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = {imageUrl:temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                            this.$_file_$.push(a);
                        }
                    }
                }
            },
        },
        created() {
            this.$_global_$.serverPath
            this.$_edit_$();
            this.zList();
            this.bList();
            this.fList();
            this.rList();

            //获取会议室标签列表
            this.meetingTags();
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        }
    }

</script>