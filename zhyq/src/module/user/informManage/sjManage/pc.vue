<style scoped>
.lm {
  color: blue;
  font-size: 30px;
}
.search {
  padding: 15px 0 15px 15px;
  background: #f7f7f7;
  margin-bottom: 15px;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  color: #404040;
}
.ivu-btn {
  font-size: 14px;
}
.bg-lp{
background:rgba(230, 243, 252, 1);
padding:5px;
border:1px solid rgba(212, 240, 252, 1);
font-size: 12px;
}
.mt10{
margin-top:10px;
}
</style>
<template>
    <div>
      <!-- 搜索 -->
        <div class="search">
            事项名称:&nbsp;&nbsp;
            <Input v-model="$_title_$" placeholder="请输入" style="width: 210px"></Input>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <br>
        <!-- 内容 -->
        <div>
          <Row>
              <Col span="12" class="title">共{{$_totalSize_$}}条数据</Col>
              <Col span="12" align="right">
                  <!-- <Button type="primary" icon="plus" @click="$_add_$()">新增</Button>   -->
              </Col>
          </Row>
          <br>
          <Row>
              <Table border ref="selection" :columns="$_sjTable_$" :data="$_sjInfo_$"></Table>
          </Row>
          <br>
          <Button type="primary" @click="handleSelectAll(true)">设置全选</Button>&nbsp;&nbsp;
          <Button type="primary" @click="handleSelectAll(false)">取消全选</Button>
          <br>
          <Page align="right" :total="$_totalSize_$" show-sizer show-elevator></Page>
        </div>
        <!-- 模板编辑弹窗 -->
        <Modal title="模板编辑" v-model="$_editModal_$">
          <Form ref="editform" :rules="editFormValidate" :model="$_editForm_$">
            <FormItem prop="content">
                <Input v-model="$_editForm_$.content" type="textarea" :autosize="{minRows: 5,maxRows: 5}"></Input>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="ghost" @click="$_editCancel_$()">取消</Button>
            <Button type="primary" style="margin-left: 8px"  @click="$_editOK_$()">确定</Button>
        </div>
        </Modal>
    </div>
</template>
<script>
import controler from "./controler.js";
export default {
  mixins: [controler],
  data() {
    return {
      $_editModal_$: false,
      $_editForm_$: {}, //模板编辑form表单
      $_title_$: "", // 事项名称
      $_totalSize_$: 122, //数据条数
      $_sjTable_$: [
        //数据表头
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "事件编号",
          key: "num",
          align: "center"
        },
        {
          title: "事件名称",
          key: "title",
          align: "center"
        },
        {
          title: "事件内容",
          key: "content",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$_edit_$(params.index);
                    }
                  }
                },
                "模板编辑"
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$_grouping_$(params.index);
                    }
                  }
                },
                "上架"
              )
            ]);
          }
        }
      ],
      $_sjInfo_$: [
        //虚拟表格数据
        {
          num: "01231089",
          title: "生日提醒",
          content: "王乐乐,您好,生日快乐!",
          createTime: "2018-9-10"
        }
      ],
      editFormValidate: {
        content: [
                { required: true, message: '必填', trigger: 'blur' }
            ]
      },
      $_querycfg_$: {
        mod: "module",
        params: {}
      }
    };
  },
  created() {
    this.$_fquery_$();
  },
  methods: {
    // 搜索
    $_search_$() {},
    // 模板编辑
    $_edit_$(index) {
      this.$refs.editform.resetFields()
      this.$_editModal_$ = true
      this.$_editForm_$ = this.$_sjInfo_$[index]
      //console.log(this.$_editForm_$)
    },
    // 全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    // 弹窗取消
    $_editCancel_$(){
      this.$_editItem_$ = {}
      this.$_editModal_$ = false
    },
    // 弹窗确定
    $_editOK_$(){
      this.$refs.editform.validate((valid) => {
                if(valid){
                    this.$_editModal_$ = false
                }else{
                    this.$Message.error('Fail!');
                }    
            })
      
    },
    $_receive_$(rsp) {
      if (rsp.status === 200) {
        if (rsp.data.status === 0) {
        }
      }
    }
  }
};
</script>