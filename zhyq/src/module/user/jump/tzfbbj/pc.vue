<style scoped>
.left{
    width: 60%;
    float:left;
}
.right{
    width: 30%;
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
</style>
<template>
   <div>
       <!-- 表单 -->
       <div class="left">
           <Form ref="addForm" :rules="addFormValidate" :model="$_addForm_$" :label-width="80">
                <FormItem label="接收人" prop="users">
                    <Input v-model="$_addForm_$.users"></Input>
                </FormItem>
                <FormItem label="通知类型" prop="types">
                    <Select v-model="$_addForm_$.types" placeholder>
                        <Option value="0">普通通知</Option>
                        <Option value="1">活动通知</Option>
                    </Select>
                </FormItem>
                <FormItem label="文章标题" prop="title">
                    <Input v-model="$_addForm_$.title"></Input>
                </FormItem>
                <FormItem label="摘要">
                    <Input v-model="$_addForm_$.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
                <FormItem label="内容">
                    <Input v-model="$_addForm_$.content" type="textarea" :autosize="{minRows: 5,maxRows: 8}"></Input>
                </FormItem>
                <FormItem label="附件">
                    <Upload v-model='$_addForm_$.files' action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost">上传</Button>
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
           <div class="wrap">
               <p class="title">选择收件人</p>
               <Input v-model="$_name_$" icon="ios-search" 
                    placeholder="Enter something..." style="width: 200px"
                    @on-click="$_searchName_$()"></Input>
               <Tree ref='tree' :data="data1" show-checkbox @on-check-change='$_change_$'></Tree>
           </div>
       </div>
   </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_name_$: '',
           $_addForm_$: {
               users: '',
               types: 0,
               title: '',
               description: '',
               content: '',
               files:'',
               zoneId:1,//园区id
               enterpriseId:1//企业id
           },
           addFormValidate: {
               users: [
                { required: true, message: '必填', trigger: 'blur' }
                ],types: [
                { required: true, message: '必填', trigger: 'blur' }
                ],title: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
            },
           data1: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            $_ind_$:0
                
        }

        
    },
    created() {
        this.$_global_$.serverPath;
        this.$_bianji_$();
    },
    methods: {
       $_bianji_$() {
        this.$root.inparams.data
        this.$_ind_$ = this.$root.inparams.data.id;
        this.$_addForm_$ = this.$root.inparams.data;
      },
        //   发送
        $_send_$(){
            this.$refs.addForm.validate((valid) => {
                if(valid){
                    //console.log(this.$_addForm_$.description)
                    	this.$_sendQuery_$({
                            method:"PUT",
                            url:this.$_global_$.serverPath+`/company/notice`,
                            data:{
                                "description": this.$_addForm_$.description,
                                "zoneId": 1,
                                "files": this.$_addForm_$.files,
                                "enterpriseId": 1,
                                "title": this.$_addForm_$.title,
                                "type": Number(this.$_addForm_$.types),
                                "content": this.$_addForm_$.content,
                                "users": this.$_addForm_$.users,
                                "id":this.$_ind_$
                            },
                            headers:{
                            "Content-type":"application/json"
                            }
                        }).then((rsp)=>{
                            //console.log(rsp)
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    this.$_editModal_$ = false
                                    this.$Message.success('编辑数据成功!');
                                    this.$root.$_Route_$('user','informManage','inform',{})
                                }else{
                                    this.$Message.error('编辑数据失败失败!');
                                }
                            }
                        })
                }else{
                    this.$Message.error('Fail!');
                }    
            })
        },
        $_change_$(){
            const checkedNodes = this.$refs.tree.getCheckedNodes();
            if(checkedNodes.length>0){
                this.$_addForm_$.users  = checkedNodes[0].title;
            }else{
            }
        }
    }
}
</script>