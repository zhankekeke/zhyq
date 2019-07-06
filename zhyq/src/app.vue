<template>
    <div class="layout">
        <transition name="fade" mode="out-in" >
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import Vue from 'vue';
import $_Login_$ from './views/login';
export default {
    components: { $_Login_$},
    data() {
        return {
        	linkOpen:false,
            $_user_$:null,
        };
    },
    mounted() {
        let me = this;
        Vue.mixin({
            methods: {
                $_GoPage_$(e) {
                    this.$router.push(e);
                }
            }
        });
        Vue.prototype.$_Login_$ = () => {
            localStorage.removeItem('$_User_$');
            this.$refs.$_Login_$.$_OpenLogin_$();
        };
    }
};
</script>