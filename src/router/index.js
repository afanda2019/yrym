import Vue from 'vue'
import Router from 'vue-router'
import other from './other'
import home from '@/pages/home'
import course_list from '@/pages/course_list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        keepAlive: true //此组件需要被缓存
      }
    },
    {
      path: '/Pulldown',
      name: 'Pulldown',
      component: resolve => require(['@/components/Pulldown'], resolve)
    },
    {
      path: '/teacher_detail',
      name: 'teacher_detail',
      component: resolve => require(['@/pages/teacher_detail'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/search'], resolve)
    },    
    {
      path: '/products_category',
      name: 'products_category',
      component: resolve => require(['@/pages/products_category'], resolve)
    },
    {
      path: '/about_us',
      name: 'about_us',
      component: resolve => require(['@/pages/about_us'], resolve)
    },
    {
      path: '/perfect_data',
      name: 'perfect_data',
      component: resolve => require(['@/pages/perfect_data'], resolve)
    },
    {
      path: '/realname_auth',
      name: 'realname_auth',
      component: resolve => require(['@/pages/realname_auth'], resolve)
    },
    {
      path: '/latest_classes',
      name: 'latest_classes',
      component: resolve => require(['@/pages/latest_classes'], resolve)
    },
    {
      path: '/mine_classes',
      name: 'mine_classes',
      component: resolve => require(['@/pages/mine_classes'], resolve)
    },
    {
      path: '/mine_collection',
      name: 'mine_collection',
      component: resolve => require(['@/pages/mine_collection'], resolve)
    },
    {
      path: '/course_list',
      name: 'course_list',
      component: course_list,
      meta: {
        keepAlive: false //此组件需要被缓存
      }
    },
    {
      path: '/confirm_order',
      name: 'confirm_order',
      component: resolve => require(['@/pages/confirm_order'], resolve)
    },
    {
      path: '/confirm_order_pay',
      name: 'confirm_order_pay',
      component: resolve => require(['@/pages/confirm_order_pay'], resolve)
    },
    {
      path: '/contact_us',
      name: 'contact_us',
      component: resolve => require(['@/pages/contact_us'], resolve)
    },
    {
      path: '/famous_teacher',
      name: 'famous_teacher',
      component: resolve => require(['@/pages/famous_teacher'], resolve)
    },
    {
      path: '/teacher_collection',
      name: 'teacher_collection',
      component: resolve => require(['@/pages/teacher_collection'], resolve)
    },
    {
      path: '/mine_order',
      name: 'mine_order',
      component: resolve => require(['@/pages/mine_order'], resolve)
    },
    {
      path: '/mine_course',
      name: 'mine_course',
      component: resolve => require(['@/pages/mine_course'], resolve)
    },
    {
      path: '/add_address',
      name: 'add_address',
      component: resolve => require(['@/pages/add_address'], resolve)
    },
    {
      path: '/address_list',
      name: 'address_list',
      component: resolve => require(['@/pages/address_list'], resolve)
    },
    {
      path: '/mine_data',
      name: 'mine_data',
      component: resolve => require(['@/pages/mine_data'], resolve)
    },
    {
      path: '/news_center',
      name: 'news_center',
      component: resolve => require(['@/pages/news_center'], resolve)
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: resolve => require(['@/pages/feedback'], resolve)
    },
    {
      path: '/qualification_certificate',
      name: 'qualification_certificate',
      component: resolve => require(['@/pages/qualification_certificate'], resolve)
    },
    {
      path: '/course_detail',
      name: 'course_detail',
      component: resolve => require(['@/pages/course_detail'], resolve)
    },
    {
      path: '/buycar',
      name: 'buycar',
      component: resolve => require(['@/pages/buycar'], resolve)
    },
    ...other
  ]
})
