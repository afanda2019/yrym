

export default [
    {
        path: '/user_center',
        name: 'user_center',
        component: resolve => require(['@/pages/user_center'],resolve) 
    },
    {
        path: '/info_us',
        name: 'info_us',
        component: resolve => require(['@/pages/info_us'], resolve)
    },
    {
        path: '/gonggaolist',
        name: 'gonggaolist',
        component: resolve => require(['@/pages/gonggaolist'], resolve)
    },
    {
        path: '/eid_address',
        name: 'eid_address',
        component: resolve => require(['@/pages/eid_address'], resolve)
    },
    
]