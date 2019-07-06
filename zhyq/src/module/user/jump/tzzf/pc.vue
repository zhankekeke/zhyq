<style scoped>
    .left{
        width: 60%;
        float:left;
    }
    .right{
        width: 35%;
        float: right;
    }
    .wrap{
        margin-top: 15px;
        width: 80%;
        border-radius: 6px;
        border: 1px solid #dddee1;
        padding: 15px;
    }
    .wrap .title{
        line-height: 25px;
    }
    .box1 {
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #e4e4e3;
        border-radius: 5px;
        line-height: 30px;
    }

    .line25 {
        line-height: 25px;
    }



    >>>.el-input__inner{
        height:32px;
        line-height: 1.5;
    }
    >>>.el-tree-node{
        margin: 8px 0;
    }
    >>>.el-tree-node__label{
        font-size: 12px;
    }
</style>
<template>
    <div>
        <!-- 表单 -->
        <div class="left">
            <Form ref="addForm" :rules="addFormValidate" :model="$_addForm_$" :label-width="80">
                <FormItem label="接收人" prop="users">
                    <Input v-model="$_usernamelist_$" disabled></Input>
                </FormItem>
                <FormItem label="文章标题" prop="title">
                    <Input v-model="$_addForm_$.title"></Input>
                </FormItem>
                <FormItem label="摘要" prop="description">
                    <Input v-model="$_addForm_$.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
                <FormItem label="文章内容" prop="content">
                    <quill-editor ref="myTextEditor" v-model="$_addForm_$.content" :options="quillOption"></quill-editor>

                </FormItem>
                <br><br>
                <FormItem label="附件">
                    <Upload
                            :before-upload="handleUpload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            :default-file-list="defaultFiles"
                            :action="this.$_global_$.filePath">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                    </Upload>
                </FormItem>
                <FormItem align="center">
                    <Button type="primary" @click="$_send_$()">发送</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="$_cancel_$()">取消</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 选择框 -->
        <div class="right">
            <div class="box1 line25" ref="step1">
                <div>
                    <el-input
                            placeholder="请输入企业名称"
                            v-model="$_title_$">
                    </el-input>
                </div>
                <div style="float:left; width:45%">
                    企业列表：
                    <el-tree
                            ref="tree"
                            class="filter-tree"
                            :data="$_data_$"
                            :props="defaultProps"
                            :filter-node-method="$_search_$"
                            :show-checkbox="true"
                            :expand-on-click-node="false"
                            @node-click="$_choice_$"
                            @check="$_check_$"
                            style="height: 520px;overflow: auto"
                    >
                    </el-tree>
                </div>
                <div style="float: left; margin-left:10%; width: 35%; font-weight: normal;">
                    <span style="font-size: 14px;">部门员工列表：</span>
                    <span v-if="$_ygList_$.length == 0" style="font-size: 12px;"><br/>请选择部门查看</span>
                    <span v-else style="height: 520px;overflow: auto">
                        <CheckboxGroup @on-change="$_newData_$" style="margin-top: 8px;overflow-y:auto;height:400px;"
                                       v-model="checkAllGroup">
                            <Checkbox v-for="item in $_ygList_$" :label="item.id">
                                <span>{{item.name}}</span>
                            </Checkbox>
                        </CheckboxGroup>
                        </span>
                </div>
                <div style="clear: both"></div>
            </div>

        </div>
    </div>
</template>
<script>
    import controler from './controler.js';
    import quillEditor from '../../../public/quillEditor/index';
    import {Input, Tree} from 'element-ui';
    import quillConfig from '../../../public/quillEditor/quill-config'

    export default {
        mixins: [controler],
        components: {
            quillEditor,
            [Input.name]: Input,
            [Tree.name]: Tree
        },
        data() {
            const validatetime = (rule, value, callback) => {
                let regEn = /[`~!@#$%^&*_+<>:{}.\/'[\]]/im;
                let regCn = /[#￥ |]/im;
                if (regEn.test(value) || regCn.test(value)) {
                    callback('输入包含非法字符');
                } else {
                    callback();
                }
            };
            const validaReceiver = (rule, value, callback) => {
                if(this.$_ygInfo_$.length==0){
                    callback('请选择接收人');
                }else{
                    callback()
                }
            };
            return {
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                quillOption: quillConfig,
                editorOption: {modules: {toolbar: '#toolbar'}},
                row: {},   //要转发的内容
                $_name_$: '',
                $_addForm_$: {
                    users: '',
                    types: '',
                    title: '',
                    description: '',
                    content: '',
                    files:''
                },
                addFormValidate: {
                    users: [
                        { required: true, validator: validaReceiver, trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请填写文章标题', trigger: 'change' },
                        //长度验证
                        {type: 'string', max: 100, message: '文章标题不能超过50字', trigger: 'change'},
                        //特殊字符验证
                        {validator: validatetime, trigger: 'change'}
                    ],
                    description:[
                        //长度验证
                        {type: 'string', max: 500, message: '摘要不能超过500字', trigger: 'change'}
                        //特殊字符验
                    ],
                    content:[
                        //长度验证
                        // {type: 'string', max: 1000, message: '内容不能超过1000字', trigger: 'change'}
                        //特殊字符验
                    ]
                },
                $_data_$: [],
                $_title_$: '',  //企业名称
                checkAllGroup: [],
                $_ygNum_$: 0,  //员工数量
                $_ygInfo_$: [],
                $_ygList_$: [],
                userInfo:{},
                $_bumen_$:[],
                $_usernamelist_$: '',
                $_current_$: 0,
                companyId:0,
                user:[],
                files:[],
                defaultFiles: [],
            }

        },
        created(){
            // this.$_global_$.serverPath
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_detail_$();
            this.getAllCompany()
        },
        methods: {
            $_addTz_$() {
                this.$root.inparams.id
            },
            $_detail_$() {
                this.files = [];
                this.defaultFiles = [];
                this.row = this.$root.inparams.row;
                if(this.row.files){
                    this.files = JSON.parse(this.row.files);
                    for(let i=0;i<this.files.length;i++){
                        this.defaultFiles.push({'name': this.files[i].fileName,'url': this.$_global_$.imgPath+this.files[i].filePath,'response': {'code':0,data:this.files[i].fileName,message:''}});
                        // this.files.push(this.files[i]);
                    }
                }else{
                    this.files = [];
                }
                let userslist = JSON.parse(this.row.users);
                let receivers = [];
                for(let j=0;j<userslist.length;j++){
                    receivers.push(userslist[j].name);
                    this.row.receivers=receivers.join('；');
                }
                if(this.row.description!=null){
                    this.$_addForm_$.description = '转发：'+this.row.description;
                }
                this.$_addForm_$.title = '转发：'+this.row.title;
                this.$_addForm_$.content = '<p>--------------------&nbsp;原始通知&nbsp;--------------------</p><p><strong>发件人:</strong>&nbsp;"'+this.row.createUserName+'";</p><p><strong>发送时间:</strong>&nbsp;'+this.row.createDate+'</p><p><strong>收件人:</strong>&nbsp;"'+this.row.receivers+'";</p><p><strong>标题:</strong>&nbsp;'+this.row.title+'</p><p><br></p>'+this.row.content;
            },


            //右侧获取企业、员工列表 start
            $_choice_$(rep,a,c) {
                this.$_ygList_$ = [];
                this.$_ygInfo_$ = [];
                this.$_usernamelist_$ = '';

                if (rep) {
                    if(rep.parentId != 'top'){
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/company/company/${rep.enterpriseId}/department/${rep.id}/employee`,
                            data: {}
                        }).then(rsp => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.checkAllGroup = [];
                                    if (rsp.data.data.records.length > 0) {
                                        for (let j = 0; j < rsp.data.data.records.length; j++) {
                                            this.$_ygList_$.push(rsp.data.data.records[j]);
                                        }
                                    }
                                }
                            }
                        });

                    }else{
                        alert('请选择部门进行查看')
                    }
                }
            },
            //展开树形菜单
            $_selectTree_$(rep) {
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
                                    this.$_data_$[rep.index].children = bumen;
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
                        id: 0,
                        parentId: arr[i].parentId,
                    };
                    if(arr[i].id){
                        temp.id = arr[i].id;
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
            $_check_$(a,checked) {
                let e = checked.checkedNodes;
                this.checkAllGroup = [];
                this.$_ygList_$ = [];
                this.$_ygInfo_$ = [];
                this.$_usernamelist_$ = '';

                if (e.length > 0) {
                    this.$_current_$ = 1;
                    let resData = [];
                    for (let i = 0; i < e.length; i++) {
                        //选择的是部门
                        if (e[i].parentId != "top" && e[i].title != "暂无数据") {
                            resData.push(
                                e[i]
                            )
                        }
                    }

                    for (let i = 0; i < resData.length; i++) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/company/company/${resData[i].enterpriseId}/department/${resData[i].id}/employee`,
                            data:{}
                        }).then(rsp => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    let arr = [];
                                    if (rsp.data.data.records.length > 0) {
                                        for (let j = 0; j < rsp.data.data.records.length; j++) {
                                            this.$_ygList_$.push(rsp.data.data.records[j]);
                                        }
                                        this.$_ygInfo_$ = this.$_ygList_$;

                                        for(let i=0;i<this.$_ygInfo_$.length;i++){
                                            arr.push(this.$_ygInfo_$[i].name);
                                        }
                                        this.$_usernamelist_$ = arr.join(';');
                                    }
                                }
                            }
                        });
                    }
                } else {
                    this.$_current_$ = 0;
                }
            },
            //json数据去重
            UniquePay(paylist) {
                let payArr = [paylist[0]];
                for (let i = 1; i < paylist.length; i++) {
                    let payItem = paylist[i];
                    let repeat = false;
                    for (let j = 0; j < payArr.length; j++) {
                        if (payItem.id == payArr[j].id) {
                            repeat = true;
                            break;
                        }
                    }
                    if (!repeat) {
                        payArr.push(payItem);
                    }
                }
                return payArr;
            },
            //右侧获取企业、员工列表 end


            // 获取全部公司
            getAllCompany(){
                //园区企业列表
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.userInfo.zoneId}/enterprise/search`,
                    data:{
                        pageSize: 99999,
                        orderByName: true
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$_data_$ = [];
                            for (let i = 0; i < res.data.data.records.length; i++) {
                                let info = {
                                    title: res.data.data.records[i].name,
                                    id: res.data.data.records[i].id,
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
                                this.$_data_$.push(info);

                                this.$_sendQuery_$({
                                    method: "GET",
                                    url: `${this.$_global_$.serverPath}/company/company/${info.id}/department`,
                                    data: {},
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
                                                    if (arr[i].parentId == null) {
                                                        arr[i].parentId = 0;
                                                    }
                                                    if (!arr[i].enterpriseId) {
                                                        arr[i].enterpriseId = info.id;
                                                    }
                                                    this.$_bumen_$.push(arr[i]);
                                                    if (arr[i].child) {
                                                        this.$_hy_$(arr[i]);
                                                    }
                                                }

                                                let bumenarr = [];
                                                // 删除 所有 children,以防止多次调用
                                                for (let i = 0; i < this.$_bumen_$.length; i++) {
                                                    if (this.$_bumen_$[i].parentId == 0) {
                                                        bumenarr.push(this.$_bumen_$[i]);
                                                    }
                                                }
                                                bm = this.$_digui_$(bumenarr);
                                                this.$_data_$[i].children = bm;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            },
            $_search_$(value, data) {
                if (!value) return true;
                return data.title.indexOf(value) !== -1;
            },

            // 文件上传
            handleUpload(file){
                return this.isLtMB1(file);
            },
            // 上传成功
            uploadSuccess(response,file,fileList){
                this.successFileChange(response);
                console.log(response);
                console.log(file);
                console.log(fileList);
                /*this.files = [];
                for(let i= 0; i<fileList.length;i++){
                    let temp = fileList[i].name;
                    this.files.push(temp)
                }*/
            },
            // 设置photo值
            successFileChange(response,) {
                console.log(this.files);
                let a = '';
                let b = '';
                let c = '';
                let d = '';
                let f = {};
                f = {
                    fileName:response.data.fileName,
                    filePath:response.data.filePath,
                    fileSize:response.data.fileSize
                };
                this.files.push(f);
                this.defaultFiles = [];
                for(let i=0;i<this.files.length;i++){
                    this.defaultFiles.push({
                        name:this.files[i].fileName,
                        url:this.$_global_$.imgPath+this.files[i].filePath,
                        response:{code:0,data:this.files[i].fileName,message:""}
                    })
                }
                // this.defaultFiles.push({
                //     name: response.data.fileName,
                //     url: this.$_global_$.imgPath+response.data.filePath,
                //     response:{code:0,data:response.data.fileName,message:""}
                // })
                // this.defaultFiles = [];
                // if (fileList.length > 0) {
                //     for (let i = 0; i < fileList.length; i++) {
                //         let temp_str = '';
                //         let name = '';
                //         let size = '';
                //         if (fileList[i].response) {
                //             if (fileList[i].response.code === 0) {
                //                 temp_str = fileList[i].response.data.filePath;
                //                 name = fileList[i].response.data.fileName;
                //                 size = fileList[i].response.data.fileSize;
                //                 a = this.$_global_$.imgPath + temp_str;
                //                 b = name;
                //                 c = temp_str;
                //                 d = size;
                //                 f = {
                //                     fileName:b,
                //                     filePath:c,
                //                     fileSize:d,
                //                 }
                //             }else{
                //                 this.$Message.error(fileList[i].response.message);
                //             }
                //         }
                //     }
                    
                // }
                
            },
            // 移除
            handleRemove(file,fileList){
                this.fileRmoveFile(file);
                /*let temp = file.name;
                this.files.pop(temp)*/
            },
            // 移除设置photo值
            fileRmoveFile(file) {
                if (file.response) {
                    if (file.response.code === 0) {
                        for(let j=0;j<this.files.length;j++){
                            if(file.response.data==this.files[j].fileName){
                                this.files.splice(j,1);
                            }
                        }
                        
                    }
                }
            },
            //   发送
            $_send_$(){
                // console.log(this.files);return;
                // this.$set(this.$_addForm_$, 'files', JSON.stringify(this.files));
                if(this.files){
                    this.$set(this.$_addForm_$, 'files', JSON.stringify(this.files));
                }else{
                    this.$_addForm_$.files=this.files;
                }
                // this.$_addForm_$.files = this.files.join(",");
                this.$refs.addForm.validate((valid) => {
                    if(valid){
                        this.user = [];
                        
                        for(let i=0;i<this.$_ygInfo_$.length;i++){
                            let thuser = {"uid":0,"read":0,"name":''};
                            thuser.uid = this.$_ygInfo_$[i].id;
                            thuser.name = this.$_ygInfo_$[i].name;
                            this.user.push(thuser);
                        }

                        this.$_sendQuery_$({
                            method:"POST",
                            url:`${this.$_global_$.serverPath}/company/notice`,
                            data:{
                                "description": this.$_addForm_$.description,
                                "zoneId": this.userInfo.zoneId,
                                "files": this.$_addForm_$.files,
                                "enterpriseId": this.userInfo.enterpriseId,
                                "title": this.$_addForm_$.title,
                                "type": Number(this.row.type),
                                "activityId": Number(this.row.activityId),
                                "content": this.$_addForm_$.content,
                                "users": JSON.stringify(this.user)
                            },
                            headers:{
                                "Content-type":"application/json"
                            }
                        }).then((rsp)=>{
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    this.$root.$_Route_$('user','informManage','inform',{})
                                }else{
                                    this.$Message.error('通知转发失败!');
                                }
                            }
                        })
                    }
                })
            },
            // 取消
            $_cancel_$() {
                this.$root.$_Route_$('user','informManage','inform',{})
            },
            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange() {//内容改变事件
            },
            /*点击上传图片按钮*/
            imgClick() {
                /*内存创建input file*/
                var input = document.createElement('input');
                input.type = 'file';
                input.name = this.fileName;
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
                input.onchange = this.onFileChange;
                input.click()
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var self = this;
                var fileInput = e.target;
                if (fileInput.files.length == 0) {
                    return
                }
                this.editor.focus();
                if (fileInput.files[0].size > 1024 * 1024 * 100) {
                    this.$alert('图片不能大于600KB', '图片尺寸过大', {confirmButtonText: '确定', type: 'warning',})
                }
                let data = new FormData;
                data.append('file', fileInput.files[0]);
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.imgUploadPath,
                    data: data
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            self.editor.insertEmbed(self.editor.getSelection().index, 'image', this.$_global_$.imgPath + rsp.data.data);
                        }
                    }
                });
            },
            $_newData_$(e){
                let arr = [];
                let arr1 = [];
                for (let i = 0; i < e.length; i++) {
                    for (let j = 0; j < this.$_ygList_$.length; j++) {
                        if (e[i] === this.$_ygList_$[j].id) {
                            arr.push(this.$_ygList_$[j]);
                        }
                    }
                }
                this.$_ygInfo_$ = arr;
                for(let i=0;i<this.$_ygInfo_$.length;i++){
                    arr1.push(this.$_ygInfo_$[i].name);
                }
                this.$_usernamelist_$ = arr1.join(';');
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
        watch: {
            $_title_$(val) {
                this.$refs.tree.filter(val);
            },
            /*checkAllGroup(curVal, oldVal) {
                if (curVal.length > 0) {
                    this.$_current_$ = 1;
                    this.$_ygNum_$ = 0;
                    this.$_ygNum_$ = curVal.length;
                } else {
                    this.$_ygNum_$ = 0;
                    this.$_current_$ = 0;
                }
            },*/
            $_ygList_$(newData, oldData) {
                if (newData.length > 0) {
                    this.$_ygNum_$ = 0;
                    let res = this.UniquePay(newData);
                    this.checkAllGroup = [];
                    if(this.$_ygInfo_$.length>0){
                        this.$_ygNum_$ = res.length;
                        for (let k = 0; k < res.length; k++) {
                            this.checkAllGroup.push(res[k].id);
                        }
                    }
                }
            }

        },
    }
</script>