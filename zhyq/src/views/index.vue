<style scoped>
    .wrapper {
        /*margin-left:80px;*/
        margin-right: 16px;
    }

    .changetext {
        color: rgb(45, 140, 240);
        font-size: 16px;
    }

    .ivu-cascader {
        margin-top: 15px;
    }

    .layout-ceiling-main {
        color: #000;
    }

    .layout-ceiling-main a {
        padding-right: 10px;
        font-weight: normal;
    }

    .layouter {
        padding-right: 0;

    }

    .menulink {
        padding-right: 0;
        padding-left: 0;
        font-size: 14px;
    }

</style>
<template>
    <div class="wrapper">
        <Menu v-show="isshow" class="top" style="background: #fff" v-if="!$_IsMobile_$" mode="horizontal" theme="dark"
              :active-name="$_GetActionGroup_$()">
            <div class="logo" >企业服务平台</div>
            <!--系统-->
            <!--<MenuItem v-for="TopMenu in $_TopMenuGroup_$" :key="TopMenu.Code" :name="TopMenu.Code">
            <router-link :to="'/'+TopMenu.Code" class="menulink">
                <Icon size="18" :type="TopMenu.Ico"></Icon>
                {{TopMenu.Name}}
            </router-link>
            </MenuItem>-->
            <div v-if="userInfo.zoneName && userInfo.enterpriseName" style=" float: left;margin-left: 40px; color: #666; font-size: 12px;position: relative">
                <span style="position: absolute; top:5px; left: 0"><img src="/static/ct/action.png"></span>
                <span style="margin-left: 30px;">当前位置：{{userInfo.zoneName}}</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <span>公司名称：{{userInfo.enterpriseName}}</span>
            </div>
            <div class="role">
                <div class="layout-ceiling-main">
                    <Dropdown @on-click="$_ChooseFunc_$" placement="bottom">
                        <a href="javascript:void(0)">
                            <img v-if="userInfo.faceUrl" style="width: 40px; height: 40px;border-radius: 100px; border: 1px solid #f1f1f1; float: left;margin-top: 10px;" :src="$_global_$.imgPath + userInfo.faceUrl">
                            <img v-else style="width: 40px; height: 40px;border-radius: 100px; border: 1px solid #f1f1f1; float: left;margin-top: 10px;" src="/static/defaultTX.png" alt="">
                            <span style="float: right">{{userInfo.name}}</span>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="info">个人信息</DropdownItem>
                            <DropdownItem name="pass">密码设置</DropdownItem>
                            <DropdownItem name="logout" divided>退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

            </div>
            <!--<div class="layout-ceiling-main ">-->
                <!--<a href="#">-->
                    <!--<Icon type="help-circled"></Icon>&nbsp;&nbsp;帮助-->
                <!--</a>-->
            <!--</div>-->
            <div class="layout-ceiling-main" v-if="$_Schenma_$ && $_Schenma_$.length>0">
                <Cascader :data="$_Schenma_$" placeholder="选择方案" v-model="$_ThisSchenma_$"></Cascader>
            </div>
            <div class="layout-ceiling-main role" v-for="(TopMenu,index) in $_TopMenuGroup_$"
                 :key="TopMenu.Code"
                 :name="TopMenu.Code">
                <router-link :to="'/'+TopMenu.Code" class="menulink">
                    <div @click="$_ChangeStyle_$(index)" :class="{changetext:index == itemIndex }">
                        <Icon style="font-size: 18px;" v-if="TopMenu.Code == 'users'" type="ios-home"></Icon>
                        <Icon style="font-size: 18px;" v-else-if="TopMenu.Code == 'employers'" type="person"></Icon>
                        <Icon style="font-size: 18px;" v-else-if="TopMenu.Code == 'superadmins'" type="grid"></Icon>
                        <Icon style="font-size: 20px;" v-else-if="TopMenu.Code == 'companys'" type="ios-people"></Icon>
                        &nbsp;{{TopMenu.Name}}
                    </div>
                </router-link>
            </div>
            <div class="layout-ceiling-main layouter" style="color: rgb(135,135,135);font-size: 16px; margin-top: -1px;">角色切换：</div>
        </Menu>
        <router-view></router-view>
    </div>
</template>
<script>
    import {EventBus} from '@/libs/eventbus';
    import $_axios_$ from 'axios';
    import apiUrl from '../libs/api';
    import Vue from 'vue'

    export default {
        data() {
            return {
                $_TopMenuGroup_$: [],
                $_Menu_$: require('../data/top.json'),
                $_MenuStatus_$: [],
                $_querycfg_$: {
                    mod: 'login',
                    params: {
                        cmd: '1',
                    }
                },
                $_ThisSchenma_$: [],
                $_Schenma_$: [],
                $_IsMobile_$: false,
                isshow: false,
                userInfo:''
            };
        },
        computed: {
            $_UserName_$() {
                return this.$store.state.$_user_$ && this.$store.state.$_user_$.name
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            let menu = this.$route.params.menu;
            let menuindex = '';
            let power = this.$_getLocalStorage_$('power');
            let token11 = this.$_getCookie_$('m-cjdiirppoem');
            if (token11) {
                this.isshow = true;
            }
            this.$_TopMenuGroup_$.push({
                "Name": "员工",
                "Code": "employers",
                "key": "employer"
            });
            for (let i = 0; i < this.$_Menu_$.length; i++) {
                for (name in power) {
                    if (this.$_Menu_$[i].key == name) {
                        this.$_TopMenuGroup_$.push(this.$_Menu_$[i])
                    }
                }
            }
            if(power['platform'] && this.userInfo.isAdmin){
                this.$_TopMenuGroup_$.splice(0,1);
            }
            for (let g in this.$_TopMenuGroup_$) {
                menuindex++;
                for (let item in this.$_TopMenuGroup_$[g]) {
                    if (menu == this.$_TopMenuGroup_$[g][item]) {
                        this.itemIndex = menuindex - 1;
                    }
                }
            }
            this.$_IsMobile_$ = this.$_isMobile_$();
            if (!this.$route.params.menu) {
                //跳转页面
                this.$_GoPage_$('/users');
            }
            this.$_GetSchenma_$();
            EventBus.$on('$_RefreshScheme_$', this.$_GetSchenma_$);
        },
        beforeDestroy() {
            EventBus.$off('$_RefresScheme_$', this.$_GetSchenma_$);
        },
        watch: {
            $_ThisSchenma_$(val) {
                this.$_ChageSchenma_$(val[0]);
                EventBus.$emit('$_RefreshPage_$');
            }
        },
        methods: {
            $_GetActionGroup_$() {
                return this.$route.params.menu ? this.$route.params.menu : 'home';
            },
            $_ChooseFunc_$(val) {
                if (val == 'info') {
                    this.$_GoPage_$('/myinfo');
                } else if (val == 'pass') {
                    this.$_GoPage_$('/mypass');
                } else {
                    this.$Modal.confirm({
                        title: '操作提示',
                        content: '您真的要退出吗?',
                        onOk: () => {
                            localStorage.removeItem('power');
                            this.delCookie('m-cjdiirppoem');
                            this.delCookie('m-sjwdnnaiowm');
                            window.location.href = '/login';
                        },
                        onCancel: () => {
                        }
                    });
                }
            },
            $_GetSchenma_$() {
                // $_axios_$({
                //     baseURL: apiUrl.$_BaseUrl_$,
                //     method: 'GET',
                //     timeout: 5000,
                //     url: 'homeinfo/GetSolutionInstance',
                //     withCredentials: true,
                // }).then(({status, data}) => {
                //     if (status === 200 && data && data.state === 0) {
                //         if (data.res.length >= 0) {
                //             let schenmaList = [];
                //             data.res.map((n) => {
                //                 schenmaList.push({'value': n.id, 'label': n.title});
                //             });
                //             // this.$set(this,'$_Schenma_$',data);
                //             this.$_Schenma_$ = schenmaList;
                //         }
                //     }
                // });
            },
            $_ChangeStyle_$(index) {
                this.itemIndex = index;
            },
            delCookie(key) {
                var date = new Date();
                date.setTime(date.getTime() - 1);
                var delValue = this.$_getCookie_$(key);
                if (!!delValue) {
                    document.cookie = key + '=' + delValue + ';expires=' + date.toGMTString();
                }
            },
            $_getCookie_$(cname) {
                let name = cname + "=";
                let ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim();
                    if (c.indexOf(name) == 0) {
                        return decodeURIComponent(c.substring(name.length, c.length));
                    }
                }
                return "";
            },
        }
    };
</script>