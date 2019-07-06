const routers = [
    {
        path: '/myinfo',
        component: (resolve) => require(['./views/my/myinfo.vue'], resolve),
    },
    {
        path: '/mypass',
        component: (resolve) => require(['./views/my/mypass.vue'], resolve),
    },
    {
        path: '/login',
        component: (resolve) => require(['./views/login.vue'], resolve),
    },
    {
        path: '/',
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [{
            path: ':menu',
            component: (resolve) => require(['./views/subindex.vue'], resolve),
            children: [{
                path: ':group',
                component: (resolve) => require(['./views/subindex.vue'], resolve),
                children: [{
                    path: ':action',
                    component: (resolve) => require(['./views/subindex.vue'], resolve),
                }]
            }]
        }]
    }
];
export default routers;