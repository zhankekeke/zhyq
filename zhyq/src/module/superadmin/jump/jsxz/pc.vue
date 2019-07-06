<style scoped>
    .lm {
        margin-left: 100px;
        width: 400px;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }

</style>
<template>
    <div class="lm">
        角色信息
        <br/>
        <br/>
        <br/>
        <!-- 新增包间 -->
        <div>
            <Form ref="$_newRolev_$" :model="$_newRole_$" :rules="$_ruleValidate_$" :label-width="80">
                <FormItem label="角色名称" prop="name">
                    <Input v-model="$_newRole_$.name" placeholder="请输入角色名称"></Input>
                </FormItem>

                <FormItem label="角色层级" prop="type">
                    <Select v-model="$_newRole_$.type" placeholder="请选择层级">
                        <Option value="1">平台级</Option>
                        <Option value="2">园区级</Option>
                    </Select>
                </FormItem>

                <FormItem label="角色描述" prop="description">
                    <Input v-model="$_newRole_$.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入角色描述"></Input>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" size="large" @click="$_back_$">取消</Button>
                <Button type="primary" size="large" @click="$_createNew_$">确定</Button>
            </div>
        </div>
    </div>
</template>
<script>

    import controler from "./controler.js";

    export default {
        mixins: [controler],

        data() {

            return {
                // 新建角色
                $_newRole_$: {
                    name: "",
                    description: '',
                    type: 0
                },
                // 新建角色验证规则
                $_ruleValidate_$: {
                    name: [
                        {required: true, type: 'string', message: '请输入角色名称', trigger: 'change'},
                        {type: 'string', max: 50, message: '角色名称不能超过50个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'},

                    ],
                    type: [
                        {required: true, message: '角色层级不能为空', trigger: 'change'}
                    ],
                    description: [
                        // {required: true, message: '请输入角色描述', trigger: 'change'},
                        {type: 'string', max: 500, message: '角色描述不能多于500字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'},
                    ]
                },
            };
        },
        created() {
        },
        methods: {
            // 新建角色成功
            $_createNew_$() {
                this.$refs.$_newRolev_$.validate((valid) => {
                    if (valid) {
                        let ind = 0;
                        if (this.$_newRole_$.type == '0') {
                            ind = 0;
                        } else if (this.$_newRole_$.type == '1') {
                            ind = 1;
                        } else if (this.$_newRole_$.type == '2') {
                            ind = 2;
                        } else if (this.$_newRole_$.type == '3') {
                            ind = 3;
                        }
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/user/role`,
                            data: {
                                "name": this.$_newRole_$.name,
                                "description": this.$_newRole_$.description,
                                "type": ind
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('角色创建成功!');
                                    // this.$Message.success(rsp.data.message);
                                    this.$_back_$();
                                } else {
                                    this.$Message.error(rsp.data.message);

                                }

                            }
                        })
                    }
                })
            },
            $_back_$() {
                this.$root.$_Route_$("superadmin", "system", "rolemanage");
            }
        },

    };
</script>