<style scoped>
    .lm {
        margin-left: 100px;
        width: 550px;
    }
    .list{
        width: 440px;
        padding-top: 10px;
        overflow: scroll;
    }
    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }

    >>>.avatar-uploader{
        width: 520px;
    }

    >>> .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }

    >>> .el-upload--picture-card {
        width: 148px;
        height: 148px;
        line-height: 148px;
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
        width: 146px;
        height: 146px;
        display: block;
    }

</style>
<template>
    <div class="lm">
        编辑企业
        <br/>
        <div>
            <Form ref="$_formValidate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                <FormItem label="所属园区：">
                    <Input v-model="$_thisZoneInfo_$.name" disabled></Input>
                </FormItem>
                <FormItem label="企业名称：" prop="name">
                    <Input v-model="$_formValidate_$.name" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="注册地址：" prop="registerAddress">
                    <Input v-model.trim="$_formValidate_$.registerAddress" placeholder="请输入企业地址"></Input>
                </FormItem>
                <FormItem label="注册资金：" prop="registeredCapital">
                    <Input style="width: 90%" v-model="$_formValidate_$.registeredCapital" placeholder="请输入注册资金"></Input>&nbsp;&nbsp;&nbsp;万元
                </FormItem>
                <FormItem label="法人名称：" prop="legalPerson">
                    <Input v-model="$_formValidate_$.legalPerson" placeholder="请输入法人名称"></Input>
                </FormItem>
                <FormItem label="经营范围：" prop="businessScope">
                    <Input v-model="$_formValidate_$.businessScope" type="textarea" :rows="4"
                           placeholder="请输入经营范围"></Input>
                </FormItem>
                <FormItem label="行业类别：" prop="sectors">
                    <Select v-model.trim="$_formValidate_$.sectors" placeholder="请选择">
                        <Option v-for="(item,index) in industry" :label="item.label" :value="item.value"
                                :key="index">
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="营业执照：" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            ref="uploadxls"
                            :show-file-list="false"
                            :before-upload="beforeuploadEdit"
                            :on-success="uploadSuccessEdit"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <img v-if="$_file_$" :src="$_global_$.imgPath + $_file_$" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </FormItem>
                <FormItem label="企业地址：" prop="addressType">
                    <Select v-model="$_formValidate_$.addressType" placeholder="地址类型" class="input"
                            style="width:100px;">
                        <Option v-for="item in addressList" :value="item.value" :key="item.value">{{item.label}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem v-if="$_formValidate_$.addressType  == 0" label="注册地址：">
                    <Input v-model="$_formValidate_$.address" placeholder="请输入园区名称"></Input>
                </FormItem>
                <FormItem v-if="$_formValidate_$.addressType  == 1" label="企业地址关联">
                    <Select :label-in-value="true" :value="$_formValidate_$.building" @on-change="building"
                            placeholder="建筑" class="input" style="width:100px;">
                        <Option v-for="(item,index) in buildings" :key="index" :label="item.label"
                                :value="item.value">
                        </Option>
                    </Select>
                    <Select :label-in-value="true" :value="$_formValidate_$.floorId" @on-change="chosefloor"
                            placeholder="楼层" class="input" style="width:140px">
                        <Option v-for="(item,index) in floors" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select ref="rooms" :label-in-value="true" :value="$_formValidate_$.roomIds" @on-change="choseroom"
                            placeholder="房间" class="input" style="width:120px;">
                        <Option v-for="(item,index) in rooms" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>

                    <Button type="primary" style="height:39px;" @click="addRoom">添加</Button>
                    <div style="width:450px;height:200px;overflow-y:scroll;">
                        <ul class="list">
                            <li style="height:39px;line-height:39px; margin-bottom:5px;"
                                v-for="(item,index) in positions" :key="index">
                                楼：{{item.build}}
                                <span v-if="!item.floor == ''">层：{{item.floor}}</span>
                                <span v-if="!item.room == ''">房间：{{item.room}}</span>
                                <Button type="primary" style="height:39px; float:right" @click="delRoom(index)">删除
                                </Button>
                            </li>
                        </ul>
                    </div>
                </FormItem>
            </Form>
            <div style="text-align: center">
                <Button type="ghost" @click="onBack">取消</Button>
                <Button type="primary" @click="editOk()" style="margin-left: 8px">确定</Button>
            </div>
        </div>
    </div>
</template>
<script>

    import {Button, Select, Option, Table, TableColumn, Upload} from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
        components: {
            [Select.name]: Select,
            [Button.name]: Button,
            [Option.name]: Option,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Upload.name]: Upload,
        },
        data() {
            const $_validatenum_$ = (rule, value, callback) => {
                var reg = /^([1-9]\d*)|0$/
                var reg1 = /[\u4e00-\u9fa5]/
                if (!reg.test(value)) {
                    callback("请输入正整数!")
                } else if (reg1.test(value)) {
                    callback("不能包含汉字!")
                } else {
                    callback()
                }
            };
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                $_thisUserInfo_$: '', //当前账号信息
                $_thisZoneInfo_$: {}, //当前园区信息
                zoneId: '',
                $_file_$: '',   //企业执照
                buildings: [],
                positionsubmit: [],
                positions: [],
                floors: [],
                rooms: [],
                buildId: '',
                floorId: '',
                showList: {
                    build: '',
                    floor: '',
                    room: ''
                },
                submitList: {
                    floorId: null,
                    roomIds: null,
                    buildingId: null
                },
                industry: [  // 行业类别
                    {label: '农、林、牧、渔业', value: '1'},
                    {label: '采矿业', value: '2'},
                    {label: '制造业', value: '3'},
                    {label: '电力、热力、燃气及水生产和供应业', value: '4'},
                    {label: '建筑业', value: '5'},
                    {label: '批发和零售业', value: '6'},
                    {label: '交通运输、仓储和邮政业', value: '7'},
                    {label: '住宿和餐饮业', value: '8'},
                    {label: '信息传输、软件和信息技术服务业', value: '9'},
                    {label: '金融业', value: '10'},
                    {label: '房地产业', value: '11'},
                    {label: '租赁和商务服务业', value: '12'},
                    {label: '科学研究和技术服务业', value: '13'},
                    {label: '水利、环境和公共设施管理业', value: '14'},
                    {label: '居民服务、修理和其他服务业', value: '15'},
                    {label: '教育', value: '16'}, {label: '卫生和社会工作', value: '17'}, {
                        label: '文化、体育和娱乐业',
                        value: '18'
                    }, {label: '公共管理、社会保障和社会组织', value: '19'}, {label: '国际组织', value: '20'}
                ],
                addressList: [  // 地址类型
                    {value: 0, label: "手动输入"},
                    {value: 1, label: "地址关联"}
                ],
                // 表单数据绑定
                $_formValidate_$: {
                    floorId: '',
                    roomIds: '',
                },
                // 表单验证
                $_ruleValidate_$: {
                    file: [
                        {required: true, validator: validateimg, trigger: "change"},
                    ],
                    name: [
                        {required: true, message: '请填写企业名称', trigger: 'blur'},
                        {type: 'string', max: 50, message: '企业名称不能超过50个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    registerAddress: [
                        {required: true, type: 'string', message: '请输入注册地址', trigger: 'change'},
                        {type: 'string', max: 100, message: '注册地址不能超过100个字', trigger: 'change'}
                    ],
                    registeredCapital: [
                        {required: true, message: '请填写注册资金', trigger: 'change'},
                        {validator: $_validatenum_$, trigger: 'change'},
                        {max: 9, message: '注册资金不能超过9位数', trigger: 'change'},
                    ],
                    legalPerson: [
                        {required: true, message: '请填写法人姓名', trigger: 'blur'},
                        {type: 'string', max: 20, message: '法人姓名不能超过20个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    businessScope: [
                        {required: true, message: '请填写经营范围', trigger: 'blur'},
                        {type: 'string', max: 200, message: '经营范围不能超过200个字', trigger: 'change'},
                    ],
                    sectors: [
                        {required: true, message: '请选择行业类别', trigger: 'blur'}
                    ],

                },
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_thisUserInfo_$ = JSON.parse(cookie);
            this.getZoneInfo(); //获取当前园区的基本信息

        },
        methods: {
            onBack() {
                this.$root.$_Route_$("user", "user", "company");
            },
            //获取当前园区基本信息
            getZoneInfo() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}`,
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_thisZoneInfo_$ = rsp.data.data;

                            //获取要编辑的企业的信息
                            let row = this.$root.inparams.row;
                            this.$_formValidate_$ = row;
                            var posiarr = this.$_formValidate_$.positions;
                            var positions = [];

                            if (posiarr) {
                                for (var j = 0; j < posiarr.length; j++) {
                                    let buildingId = posiarr[j].buildingId * 1;
                                    let floorId = posiarr[j].floorId * 1;
                                    let roomIds = posiarr[j].roomIds * 1;

                                    this.$_sendQuery_$({
                                        method: "GET",
                                        url: this.$_global_$.serverPath + `/zone/zone/${this.$_thisUserInfo_$.zoneId}/building`,
                                        data: {},
                                        headers: {"Content-type": "application/json"}
                                    }).then((rsp1) => {
                                        if (rsp1.status === 200) {
                                            if (rsp1.data.code === 0) {
                                                let arr1 = rsp1.data.data;
                                                let name1 = '';
                                                this.buildings = [];
                                                for (let i = 0; i < arr1.length; i++) {
                                                    let temp = {};
                                                    temp = {
                                                        label: arr1[i].name,
                                                        value: arr1[i].id
                                                    };
                                                    this.buildings.push(temp);

                                                    if(arr1[i].id==buildingId){
                                                        for(let k=0;k<posiarr.length;k++){
                                                            if(posiarr[k].buildingId==buildingId){
                                                                name1 = arr1[i].name;
                                                                positions[k]={build:name1,floor:'',room:''}
                                                            }
                                                        }
                                                    }
                                                }
                                                this.$_formValidate_$.building = buildingId;
                                                this.buildId = buildingId;
                                                this.submitList.buildingId = buildingId;
                                                this.showList.build = name1;

                                                this.$_sendQuery_$({
                                                    method: "GET",
                                                    url: this.$_global_$.serverPath + '/zone/zone/' + this.$_thisUserInfo_$.zoneId + '/building/' + buildingId + '/floor',
                                                    data: {},
                                                    headers: {"Content-type": "application/json"}
                                                }).then((rsp2) => {
                                                    if (rsp2.status === 200) {
                                                        if (rsp2.data.code === 0) {
                                                            let arr2 = rsp2.data.data;
                                                            let name2 = '';
                                                            this.floors = [];
                                                            for (let i = 0; i < arr2.length; i++) {
                                                                let temp = {};
                                                                temp = {
                                                                    label: arr2[i].name,
                                                                    value: arr2[i].id
                                                                };
                                                                this.floors.push(temp);

                                                                if(arr2[i].id==floorId){
                                                                    for(let k=0;k<posiarr.length;k++){
                                                                        if(posiarr[k].floorId==floorId){
                                                                            name2 = arr2[i].name;
                                                                            positions[k].floor=name2;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            this.$_formValidate_$.floorId = floorId;
                                                            this.floorId = floorId;
                                                            this.submitList.floorId = floorId;
                                                            this.showList.floor = name2;

                                                            this.$_sendQuery_$({
                                                                method: "GET",
                                                                url: this.$_global_$.serverPath + '/zone/zone/' + this.$_thisUserInfo_$.zoneId + '/building/' + buildingId + '/floor/' + floorId + '/room',
                                                                data: {},
                                                                headers: {"Content-type": "application/json"}
                                                            }).then((rsp3) => {
                                                                if (rsp3.status === 200) {
                                                                    if (rsp3.data.code === 0) {
                                                                        let arr3 = rsp3.data.data;
                                                                        let name3 = '';
                                                                        this.rooms = [];
                                                                        for (let i = 0; i < arr3.length; i++) {
                                                                            let temp = {};
                                                                            temp = {
                                                                                label: arr3[i].name,
                                                                                value: arr3[i].id
                                                                            };
                                                                            this.rooms.push(temp);

                                                                            if(arr3[i].id==roomIds){
                                                                                for(let k=0;k<posiarr.length;k++){
                                                                                    if(posiarr[k].roomIds==roomIds){
                                                                                        name3 = arr3[i].name;
                                                                                        positions[k].room=name3;
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        this.$_formValidate_$.roomIds = roomIds;
                                                                        this.submitList.roomIds = roomIds;
                                                                        this.showList.room = name3;
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });


                                }
                            }
                            this.$_file_$ = [];
                            this.$_file_$ = row.businessLicense;
                            this.positionsubmit = [];
                            this.positions = [];
                            if (row.addressType == 0) { //手动输入
                                this.positionsubmit = []
                            } else {
                                this.positionsubmit = row.positions;   //地址关联
                                this.positions = positions;
                            }
                            this.zoneId = row.zoneId;
                            this.bList()
                        }
                    }
                })
            },
            //获取楼宇列表
            bList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_thisUserInfo_$.zoneId}/building`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            this.buildings = [];
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
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
            //   获取楼层信息
            fList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_thisUserInfo_$.zoneId}/building/${this.buildId}/floor`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            this.floors = [];
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };
                                this.floors.push(temp)
                            }
                            this.chosefloor(this.floors[0]);
                        }
                    }
                })
            },
            // 获取房间信息
            rList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_thisUserInfo_$.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            this.rooms = [];
                            for (let i = 0; i < arr.length; i++) {
                                if(arr[i].used==0){
                                    //used 为0时，代表该房间未被绑定，可以显示
                                    var temp = {};
                                    temp = {
                                        label: arr[i].name,
                                        value: arr[i].id
                                    };
                                    this.rooms.push(temp)
                                }
                            }
                            this.$refs.rooms.reset();
                            // this.choseroom(this.rooms[0]);
                        }
                    }
                })
            },
            //更改建筑
            building(value) {
                this.buildId = value.value;
                this.floors = [];
                this.rooms = [];
                this.showList.build = value.label;
                this.submitList.buildingId = value.value;
                this.$_formValidate_$.floorId = '';
                this.fList();
            },
            //更改楼层
            chosefloor(value) {
                if(value){
                    this.floorId = value.value;
                    this.rooms = [];
                    this.$_formValidate_$.floorId = value.value;
                    this.showList.floor = value.label;
                    this.submitList.floorId = value.value;
                    this.rList();
                }else{
                    this.$_formValidate_$.roomIds = '';
                    this.showList.room = '';
                    this.submitList.roomIds = '';
                }
            },
            // 更改房间
            choseroom(value) {
                if(value){
                    this.showList.room = value.label;
                    this.submitList.roomIds = value.value;
                    this.$_formValidate_$.roomIds = value.value;
                }else{
                    this.showList.room = '';
                    this.submitList.roomIds = '';
                    this.$_formValidate_$.roomIds = '';
                }

            },
            //添加地址信息
            addRoom() {
                //楼宇、楼层、房间必须都存在才可以保存
                if (this.submitList.buildingId && this.submitList.floorId && this.submitList.roomIds) {
                    let addsure = true;  //默认可以进行添加
                    if(this.positionsubmit.length>0){
                        for(let i=0;i<this.positionsubmit.length;i++){
                            //验证房间号是否相同
                            if(this.positionsubmit[i].roomIds==this.submitList.roomIds){
                                //房间号相同，不能添加
                                addsure = false;
                                break;
                            }
                            //房间号不同，继续进行循环
                        }
                    }
                    if(addsure){
                        var sublist = JSON.parse(JSON.stringify(this.submitList));
                        var list = JSON.parse(JSON.stringify(this.showList));
                        this.positionsubmit.push(sublist);
                        this.positions.push(list)
                    }
                } else {
                    this.$Message.error("请正确选择地址!")
                }
            },
            // 删除地址信息
            delRoom(index) {
                this.positions.splice(index, 1);
                this.positionsubmit.splice(index, 1)
            },

            // 编辑企业确定
            editOk() {
                this.$_formValidate_$.businessLicense = this.$_file_$;
                if (this.$_formValidate_$.addressType == 0) {
                    this.$refs.$_formValidate_$.validate((valid) => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "PUT",
                                url: `${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise`,
                                data: {
                                    businessLicense: this.$_formValidate_$.businessLicense,
                                    sectors: this.$_formValidate_$.sectors,
                                    registerAddress: this.$_formValidate_$.registerAddress,
                                    address: this.$_formValidate_$.address,
                                    city: this.$_formValidate_$.city,
                                    county: this.$_formValidate_$.county,
                                    businessScope: this.$_formValidate_$.businessScope,
                                    scale: this.$_formValidate_$.scale,
                                    positions: [
                                        {floorId: null, roomIds: null, buildingId: null}
                                    ],
                                    province: this.$_formValidate_$.province,
                                    registeredCapital: this.$_formValidate_$.registeredCapital,
                                    legalPerson: this.$_formValidate_$.legalPerson,
                                    name: this.$_formValidate_$.name,
                                    id: this.$_formValidate_$.id,
                                    addressType: this.$_formValidate_$.addressType
                                },
                                headers: {"Content-type": "application/json"}
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("更新企业成功!")
                                        this.$_file_$ = [];
                                        this.onBack();
                                    } else {
                                        this.$Message.error("更新企业失败!")
                                    }
                                }
                            })
                        }
                    })
                } else if (this.$_formValidate_$.addressType == 1) {
                    this.$refs.$_formValidate_$.validate((valid) => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "PUT",
                                url: `${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise`,
                                data: {
                                    businessLicense: this.$_formValidate_$.businessLicense,
                                    sectors: this.$_formValidate_$.sectors,
                                    address: "",
                                    registerAddress: this.$_formValidate_$.registerAddress,
                                    city: this.$_formValidate_$.city,
                                    county: this.$_formValidate_$.county,
                                    businessScope: this.$_formValidate_$.businessScope,
                                    scale: this.$_formValidate_$.scale,
                                    positions: this.positionsubmit,
                                    province: this.$_formValidate_$.province,
                                    registeredCapital: this.$_formValidate_$.registeredCapital,
                                    legalPerson: this.$_formValidate_$.legalPerson,
                                    name: this.$_formValidate_$.name,
                                    id: this.$_formValidate_$.id,
                                    addressType: this.$_formValidate_$.addressType
                                },
                                headers: {"Content-type": "application/json"}
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("更新企业成功!");
                                        this.$_file_$ = [];
                                        this.onBack();
                                    } else {
                                        this.$Message.error("更新企业失败!")
                                    }
                                }
                            })
                        }
                    })
                }
            },

            uploadexceed(file, fileList) {
                if (file.length == 1) {
                    this.$Message.error("营业执照只能上传一张!")
                }
            },
            beforeuploadEdit(file) {
                return this.isLtMB(file);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_file_$ = res.data
            },
        },

    };
</script>