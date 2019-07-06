<style scoped>
    .MainContent {
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        width: 100%
    }

    .MainContent ul {
        max-width: 200px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    body {
        background: #e9e9e9;
        position: static;
    }

    #ModuleContent {
        position: relative;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        margin-top: 16px;
    }

    #Content {
        margin: 0 !important;
        padding: 0 !important;
    }

    .Main {
        top: 0 !important;
    }

    .rightbox {
        border: 10px solid #f5f5f5;
        border-bottom: none;
        width: 100%;
        overflow-y: auto;
        /*overflow-x: hidden;*/
    }

    .rightbox .desc {
        font-size: 10px;
        margin-left: 5px;
        color: #b7b7b7;
    }

    .rightbox .title {
        padding: 10px 10px 10px 20px;
        height: 50px;
        -moz-box-shadow: 0px 3px 5px #efefef;
        -webkit-box-shadow: 0px 3px 5px #efefef;
        box-shadow: 0px 3px 5px #efefef;
    }

    .ivu-breadcrumb {
        margin-top: 5px;
    }

    .rightbox span {
        font-size: 12px;
    }

    .ivu-breadcrumb a {
        color: #989898
    }

    .breadcrumb {
        padding: 0;
    }

    .hideleft {
        position: absolute;
        bottom: 20px;
        left: 0px;
        width: 100%;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
    }

    .shouye {
        color: #c8cbcf;
        padding-top: 20px;
        padding-left: 38px;
        font-size: 14px;
        cursor: pointer;
    }

    .shouye:hover {
        color: #fff;
    }

    .rightbox {
        padding: 0 20px;
    }


</style>
<template>
    <div class="MainContent">
        <Menu :style="{width:$_left_width_$+'px'}"
              theme="dark"
              ref="$_leftMenu_$"
              :accordion="$_Accordion_$"
              :open-names="$_OpenName_$"
              :active-name="$_ActiveName_$"
              v-if="$_MenuGroup_$.length>0"
              @on-select="$_MenuSelect_$"
              @on-open-change="$_OnChange_$">
            <div v-if="$_CatalogName_$[0] == 'user' || $_CatalogName_$[0] == 'employer' "
                 @click="$_Index_$" class="shouye">首页
            </div>
            <Submenu
                    v-if="$_left_width_$ > 50 && Menu.Code != 'jump' && Menu.Code =='fwsl' && Menu.SubMenus.length > 1 "
                    v-for="Menu in $_MenuGroup_$"
                    :name="Menu.Code" :key="Menu.Code">
                <template slot="title">
                    <Icon :type="Menu.Ico"></Icon>
                    {{Menu.Name}}
                </template>
                <MenuItem v-if="subMenu.Code != 'index'"
                          v-for="subMenu in Menu.SubMenus"
                          :name="Menu.Code+'.'+subMenu.Code"
                          :key="Menu.Code+'.'+subMenu.Code">
                    {{subMenu.Name}}
                </MenuItem>
            </Submenu>
            <Submenu v-if="$_left_width_$ > 50 && Menu.Code != 'jump' && Menu.Code !=='fwsl'"
                     v-for="Menu in $_MenuGroup_$"
                     :name="Menu.Code" :key="Menu.Code">
                <template slot="title">
                    <Icon :type="Menu.Ico"></Icon>
                    {{Menu.Name}}
                </template>
                <MenuItem v-if="subMenu.Code != 'index'"
                          v-for="subMenu in Menu.SubMenus"
                          :name="Menu.Code+'.'+subMenu.Code"
                          :key="Menu.Code+'.'+subMenu.Code">
                    {{subMenu.Name}}
                </MenuItem>
            </Submenu>
            <div class="hideleft" @click="$_HideLeft_$">
                <i v-if="$_left_width_$ > 50" class="ivu-icon ivu-icon-ios-arrow-left"></i>
                <i v-if="$_left_width_$ < 50" class="ivu-icon ivu-icon-ios-arrow-right"></i>
            </div>
        </Menu>
        <div class="rightbox ">
            <div id="ModuleContent">
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
    import $_Vue_$ from 'vue';

    export default {
        data() {
            return {
                //临时参数
                $_mobil_$: true,
                $_Content_$: {},
                $_History_$: [],
                $_left_width_$: 250,
                // Title: '应用名称',
                // Desc: '描述',
                $_Accordion_$: true,
                $_ActiveName_$: '',
                $_OpenName_$: [''],
                $_CatalogName_$: [''],
                $_HelpNode_$: '',
                $_MenuGroup_$: [],
                $_IsMobile_$: false,
                $_IsSuperAdmin_$: true,
                MenuData: require('../data/menu.json')
            };
        },
        created() {
            let power = this.$_getLocalStorage_$('power');
            //权限数据整理
            let userPower = [];
            let companyPower = [];
            let superadminPower = [];
            for (let data in power) {
                if (data == "company") {
                    for (let key1 = 0; key1 < power[data].length; key1++) {
                        companyPower.push(power[data][key1]);
                        if (power[data][key1].child.length > 0) {
                            for (let key2 = 0; key2 < power[data][key1].child.length; key2++) {
                                companyPower.push(power[data][key1].child[key2]);
                            }
                        }
                    }
                }
                if (data == "platform") {
                    for (let key1 = 0; key1 < power[data].length; key1++) {
                        superadminPower.push(power[data][key1]);
                        if (power[data][key1].child.length > 0) {
                            for (let key2 = 0; key2 < power[data][key1].child.length; key2++) {
                                superadminPower.push(power[data][key1].child[key2]);
                            }
                        }
                    }
                }
                if (data == "zone") {
                    for (let key1 = 0; key1 < power[data].length; key1++) {
                        userPower.push(power[data][key1]);
                        if (power[data][key1].child.length > 0) {
                            for (let key2 = 0; key2 < power[data][key1].child.length; key2++) {
                                userPower.push(power[data][key1].child[key2]);
                            }
                        }
                    }
                }
            }
            //判断员工、管理员权限
            if (typeof(power) !== 'undefined') {
                let HYS = 0;
                if (power.company) {
                    power.company.forEach(item => {
                        if (item.value == 'HYS_QY') {
                            HYS = 1
                        }
                    });
                }
                if (!power.steward) {
                    this.MenuData.employers[0].employer[0].SubMenus.splice(1);
                }
                if (!HYS) {
                    this.MenuData.employers[1].works[0].SubMenus.splice(2, 1);
                }
            } else {
                this.MenuData.employers[0].employer[0].SubMenus.splice(1);
                this.MenuData.employers[1].works[0].SubMenus.splice(2, 1);
            }
            //判断其他权限
            for (let menu in this.MenuData) {
                if (menu == "users") {
                    let newdata = [];
                    for (let i = 0; i < this.MenuData[menu].length; i++) {
                        for (let menu2 in this.MenuData[menu][i]) {
                            for (let j = 0; j < userPower.length; j++) {
                                if (this.MenuData[menu][i][menu2][0].Value === userPower[j].value) {
                                    let newdata2 = [];
                                    if (this.MenuData[menu][i][menu2][0].SubMenus.length > 0) {
                                        for (let k = 0; k < this.MenuData[menu][i][menu2][0].SubMenus.length; k++) {
                                            for (let m = 0; m < userPower.length; m++) {
                                                if (this.MenuData[menu][i][menu2][0].SubMenus[k].Value === userPower[m].value) {
                                                    newdata2.push(this.MenuData[menu][i][menu2][0].SubMenus[k]);
                                                }
                                            }
                                        }
                                    }
                                    if (menu2 == 'user') {
                                        newdata2.unshift({
                                            "Name": "首页",
                                            "Code": "index",
                                            "Desc": "我的首页",
                                            "Value": "XT_QY"
                                        })
                                    }
                                    this.MenuData[menu][i][menu2][0].SubMenus = newdata2;
                                    newdata.push(this.MenuData[menu][i]);
                                }
                            }
                        }
                    }
                    this.MenuData[menu] = newdata;
                }
                if (menu == "companys") {
                    let newdata = [];
                    for (let i = 0; i < this.MenuData[menu].length; i++) {
                        for (let menu2 in this.MenuData[menu][i]) {
                            for (let j = 0; j < companyPower.length; j++) {
                                if (this.MenuData[menu][i][menu2][0].Value === companyPower[j].value) {
                                    let newdata2 = [];
                                    if (this.MenuData[menu][i][menu2][0].SubMenus.length > 0) {
                                        for (let k = 0; k < this.MenuData[menu][i][menu2][0].SubMenus.length; k++) {
                                            for (let m = 0; m < companyPower.length; m++) {
                                                if (this.MenuData[menu][i][menu2][0].SubMenus[k].Value === companyPower[m].value) {
                                                    newdata2.push(this.MenuData[menu][i][menu2][0].SubMenus[k]);
                                                }
                                            }
                                        }
                                    }
                                    this.MenuData[menu][i][menu2][0].SubMenus = newdata2;
                                    newdata.push(this.MenuData[menu][i]);
                                }
                            }
                        }
                    }
                    this.MenuData[menu] = newdata;
                }
                if (menu == "superadmins") {
                    let newdata = [];
                    for (let i = 0; i < this.MenuData[menu].length; i++) {
                        for (let menu2 in this.MenuData[menu][i]) {
                            let isset = 0;
                            for (let j = 0; j < superadminPower.length; j++) {
                                if (this.MenuData[menu][i][menu2][0].Value === superadminPower[j].value) {
                                    let newdata2 = [];
                                    if (this.MenuData[menu][i][menu2][0].SubMenus.length > 0) {
                                        for (let k = 0; k < this.MenuData[menu][i][menu2][0].SubMenus.length; k++) {
                                            for (let m = 0; m < superadminPower.length; m++) {
                                                if (this.MenuData[menu][i][menu2][0].SubMenus[k].Value === superadminPower[m].value) {
                                                    newdata2.push(this.MenuData[menu][i][menu2][0].SubMenus[k]);
                                                }
                                            }
                                        }
                                    }
                                    this.MenuData[menu][i][menu2][0].SubMenus = newdata2;
                                    newdata.push(this.MenuData[menu][i]);
                                }
                            }
                        }
                    }
                    this.MenuData[menu] = newdata;
                }
            }
            this.$_IsMobile_$ = this.$_isMobile_$();
            this.$_FetchData_$();
        },
        methods: {
            $_Index_$() {
                if (this.$_CatalogName_$[0] == 'user') {
                    this.$_LoadAction_$('user', 'user', 'index')
                }
                if (this.$_CatalogName_$[0] == 'employer') {
                    this.$_LoadAction_$('employer', 'fwsl', 'index')
                }
            },
            $_HideLeft_$() {
                this.$_left_width_$ = this.$_left_width_$ > 50 ? 30 : 200;
            },
            $_FetchData_$() {
                let Data = this.MenuData[this.$route.params.menu];
                if (Data) {
                    let Ms = this.$_InitMenuStatus_$();
                    let item = this.$_FindMenu_$(Ms.$_ActiveName_$);
                    this.Title = item.title;
                    this.Desc = item.desc;
                    let Open = Ms.$_ActiveName_$.split('.');
                    this.$_MenuGroup_$ = this.$_Recdata_$(Data);
                    this.$_ActiveName_$ = Ms.$_ActiveName_$;
                    this.$_CatalogName_$ = [Ms.$_CatalogName_$.toString()];
                    //this.$_OpenName_$ = [Ms.$_OpenName_$.toString()];
                    this.$_OpenName_$ = Open[0];
                    this.$nextTick(function () {
                        if (this.$refs.$_leftMenu_$) {
                            this.$refs.$_leftMenu_$.updateOpened();
                            this.$refs.$_leftMenu_$.updateActiveName();
                        }
                        this.$_LoadAction_$(this.$_CatalogName_$, this.$_OpenName_$, this.$route.params.action || Ms.Code);
                    });
                }
            },
            $_LoadAction_$(cname, gname, name, params = {}) {
                let token = this.$_getCookie_$('m-cjdiirppoem');
                if (token) {
                    let me = this;
                    let last = '';
                    this.$_HelpNode_$ = `${cname}/${gname}/${name}`;
                    let platform = this.$_IsMobile_$ ? 'mobile' : 'pc';
                    require.ensure([], function (require) {
                        require(`../module/${cname}/${gname}/${name}/${platform}.vue`);
                        let App = (resolve) => {
                            require([`../module/${cname}/${gname}/${name}/${platform}.vue`], resolve);
                        };
                        if (me.$_Content_$.$destroy) {
                            me.$_Content_$.$destroy();
                        }
                        me.$root.$emit('$_router_load_$', `/${cname}/${gname}/${name}`);
                        me.$_Content_$ = new $_Vue_$({
                            el: '#ModuleContent div',
                            data() {
                                return {
                                    inparams: params,
                                    modname: me.Title
                                }
                            },
                            methods: {
                                $_Route_$(scname, sgname, sname, sparams, title) {
                                    me.$_History_$.push({
                                        title: me.Title,
                                        cname: cname,
                                        gname: gname,
                                        name: name,
                                        params: params
                                    });
                                    if (title != '') {
                                        me.Title += " - " + title;
                                    }
                                    me.$_LoadAction_$(scname, sgname, sname, sparams);
                                },
                                $_GoToPage_$(path, blank) {
                                    if (blank) {
                                        !(a => {
                                            a.target = '_blank';
                                            a.href = path;
                                            a.click();
                                        })(document.createElement('a'));
                                    } else {
                                        this.$router.push(path);
                                    }
                                },
                                $_GoBack_$() {
                                    let p = me.$_History_$.pop();
                                    me.Title = p.title;
                                    me.$_LoadAction_$(p.gname, p.name, p.params);
                                },
                                $_SetStore_$(key, info) {
                                    me.$store.commit(key, info);
                                },
                                $_GetStore_$(key) {
                                    return me.$store.state[key];
                                }
                            },
                            render: h => h(App)
                        });
                    });
                } else {
                    window.location.href = '/login';
                }
            },
            $_InitMenuStatus_$() {
                let params = this.$route.params;
                let name = params.menu;
                if (!this.$parent.$_MenuStatus_$[name]) {
                    let Md = this.MenuData[name];
                    let nextname = '';
                    for (let key in Md[0]) {
                        nextname = key;
                        break;
                    }
                    Md = Md[0][nextname];
                    let Ac = {};
                    if (params.group && params.action) {
                        Ac = {
                            Code: params.action,
                            $_OpenName_$: params.group,
                            $_ActiveName_$: params.group + '.' + params.action
                        };
                        if (Md[0].Pcode) {
                            Ac.$_CatalogName_$ = Md[0].Pcode
                        } else {
                            Ac.$_CatalogName_$ = [nextname]
                        }
                    } else {
                        Ac = {
                            Code: Md[0].SubMenus[0].Code,
                            $_OpenName_$: [Md[0].Code],
                            $_ActiveName_$: Md[0].Code + '.' + Md[0].SubMenus[0].Code
                        };
                        if (Md[0].Pcode) {
                            Ac.$_CatalogName_$ = Md[0].Pcode
                        } else {
                            Ac.$_CatalogName_$ = [nextname]
                        }
                    }
                    this.$parent.$_MenuStatus_$[name] = Ac;
                    this.Title = Md[0].Name + " - " + Md[0].SubMenus[0].Name;
                    this.Desc = Md[0].SubMenus[0].Desc;
                }
                if (params.group && params.action) {
                    this.$parent.$_MenuStatus_$[name] = {
                        Code: params.action,
                        $_CatalogName_$: params.menu.slice(0, -1),
                        $_OpenName_$: params.group,
                        $_ActiveName_$: params.group + '.' + params.action
                    };
                }
                return this.$parent.$_MenuStatus_$[name];
            },
            $_MenuSelect_$(e) {
                let item = this.$_FindMenu_$(e);
                this.Title = item.title;
                this.Desc = item.desc;
                this.$parent.$_MenuStatus_$[this.$route.params.menu].Code = item.action;
                this.$parent.$_MenuStatus_$[this.$route.params.menu].$_ActiveName_$ = e;
                this.$_LoadAction_$(item.Catalog, item.group, item.action);
            },
            $_OnChange_$(e) {
                this.$parent.$_MenuStatus_$[this.$route.params.menu].$_OpenName_$ = [e];
            },
            $_FindMenu_$(code) {
                for (let c in this.MenuData) {
                    for (let key in this.MenuData[c]) {
                        for (let g in this.MenuData[c][key]) {
                            for (let item in this.MenuData[c][key][g]) {
                                let group = this.MenuData[c][key][g][item];
                                for (let subitem in group.SubMenus) {
                                    let action = group.SubMenus[subitem];
                                    let nodecode = group.Code + '.' + action.Code;
                                    if (nodecode == code) {
                                        return {
                                            Catalog: group.Pcode,
                                            group: group.Code,
                                            action: action.Code,
                                            title: group.Name + " - " + action.Name,
                                            desc: action.Desc
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
            },
            $_Breadcrumb_$(e) {
                switch (e) {
                    case 'service':
                        this.$Message.success('打开客服');
                        break;
                    case 'help':
                        this.$Message.success(this.$_HelpNode_$);
                        break;
                }
            },
            $_Recdata_$(data) {
                let newdata = '';
                for (let c in data) {
                    for (let g in data[c]) {
                        newdata += JSON.stringify(data[c][g][0]) + ',';
                    }
                }
                newdata = newdata.slice(0, -1);
                newdata = '[' + newdata + ']';
                return JSON.parse(newdata);
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

        },
        watch: {
            '$route': '$_FetchData_$'
        }
    };
</script>