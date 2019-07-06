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
        <!--编辑角色 -->
        <div>
            <Form ref="$_bjRole1_$" :model="$_bjRole_$" :rules="$_ruleValidate_$" :label-width="80">
                <FormItem label="角色名称" prop="name">
                    <Input v-model="$_bjRole_$.name" placeholder="请输入角色名称"></Input>
                </FormItem>

                <FormItem label="角色层级" prop="type">
                    <Select v-model="$_bjtype_$" disabled placeholder="选择角色层级">
                        <Option v-for="item in $_cityList_$" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="角色描述" prop="description">
                    <Input v-model="$_bjRole_$.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入角色描述"></Input>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" size="large" @click="$_back_$">取消</Button>
                <Button type="primary" size="large" @click="$_bjNew_$">确定</Button>
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
                $_bjRole_$: {
                    name: "",
                    description: '',
                    type: 0
                },
                $_bjtype_$: 1,
                $_cityList_$: [
                    {
                        value: 1,
                        label: '平台级'
                    }, {
                        value: 2,
                        label: '园区级'
                    }

                ],

                // 新建角色验证规则
                $_ruleValidate_$: {
                    name: [
                        {required: true, type: 'string', message: '请输入角色名称', trigger: 'change'},
                        {type: 'string', max: 50, message: '角色名称不能超过50个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'},

                    ],
                    type: [
                        {required: true, type:'number',message: '角色层级不能为空', trigger: 'change'}
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
            let row = this.$root.inparams.row;
            //console.log(row)
            this.$_bjRole_$ = row;

            if (row.type == 2) {
                this.$_bjtype_$ = 2;
            } else if (row.type == 1) {
                this.$_bjtype_$ = 1;
            }

        }
        ,
        methods: {
            // 编辑确定
            $_bjNew_$() {
                // console.log(this.$_bjRole_$);return;
                this.$refs.$_bjRole1_$.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: this.$_global_$.serverPath + `/user/role`,
                            data: {
                                "name": this.$_bjRole_$.name,
                                "description": this.$_bjRole_$.description,
                                "id": this.$_bjRole_$.id,
                                "type": this.$_bjtype_$,
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('编辑角色成功!');
                                    this.$_back_$();
                                } else {
                                    this.$Message.error('编辑角色失败!');
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