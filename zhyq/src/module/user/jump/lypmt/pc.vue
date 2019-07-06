<style >
  .title{background: #d7d7d7;color:#000;font-size: 20px;text-align: center;padding:10px 0;margin: 20px;}
  .row{box-sizing: border-box;padding: 0 40px;}
  .ivu-table th{background: #fff;}
  .ivu-table td.green{background-color: #32cc00!important;}
  .ivu-table td.red{background-color: #ef6900!important;}
</style>
<template>
    <div>
      <Row>
        <Col span='12' class="row">
          <p class="title">南塔2号楼</p>
          <Table border :columns="$_columns_$" :data="$_data_$"></Table>
        </Col>
        <Col span='12'>
          <p class="title">南塔1号楼</p>
          <Table border :columns="$_columns_$" :data="$_data_$"></Table>
        </Col>
      </Row>
      <Row  class="row" style='margin:30px 0;padding-right:0; '>
       
          <Table border :columns="$_bottomColumns_$" :data="$_bottomData_$"></Table>
      </Row>
	</div>
</template>

<script>
import controler from "./controler.js";
export default {
  mixins: [controler],
  data() {
    return {
        $_querycfg_$: {
          mod: "module",
          params: {}
        },
        $_columns_$: [
            {
                title: '房号',
                key: 'fanghao',
                align:'center'
            },
            {
                title: '1',
                key: 'one',
                align:'center',
            },
            {
                title: '2',
                key: 'two',
                align:'center'
            },
            {
                title: '3',
                key: 'three',
                align:'center'
            },
            {
                title: '4',
                key: 'four',
                align:'center'
            }
        ],
        $_data_$: [
          {
              fanghao: '21层',
              one: '',
              two: '',
              three: '',
              four:'',
             
          },{
              fanghao: '20层',
              one: '',
              two: '',
              three: '',
              four:''
          },{
              fanghao: '19层',
              one: '',
              two: '',
              three: '',
              four:'',
              cellClassName: {
                  one:'green',
                  two:'green',
                  three:'green',
                  four:'green',
              }
          },{
              fanghao: '18层',
              one: '',
              two: '',
              three: '',
              four:'',
                cellClassName: {
                  three:'red',
                 }
          },
          {
              fanghao: '17层',
              one: '',
              two: '',
              three: '',
              four:''
          },{
              fanghao: '16层',
              one: '',
              two: '',
              three: '',
              four:''
          },
        ],
        $_bottomColumns_$:[
            {title:'序号',key:'index',align:'center'},
            {title:'1',key:'one',align:'center'},
            {title:'2',key:'two',align:'center'},
            {title:'3',key:'three',align:'center'},
            {title:'4',key:'four',align:'center'},
            {title:'5',key:'five',align:'center'},
            {title:'6',key:'six',align:'center'},
            {title:'7',key:'six',align:'center'},
            {title:'8',key:'six',align:'center'},
            {title:'9',key:'six',align:'center'},
            {title:'10',key:'six',align:'center'},
            {title:'11',key:'six',align:'center'},
            {title:'12',key:'six',align:'center'},
        ],
        $_bottomData_$:[
            {index:'4层',},
            {index:'3层',},
            {index:'2层',},
            {index:'1层',},
        ]
    };
  },
  created() {
      this.$_fquery_$();
  },
  methods: {
      $_pmt_$(){
            this.$root.inparams.id
        },
    $_receive_$(rsp) {
      if (rsp.status === 200) {
        if (rsp.data.status === 0) {
        }
      }
    },
   

  }
};
</script>