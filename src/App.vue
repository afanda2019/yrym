<template>
  <div id="app">


    <div class="main">
        <router-view  />

    </div>
    <van-tabbar style='background:#0f4549'>
      <van-tabbar-item to="/">
        <span style='color:#fff'>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="icon.normal0"
        >
      </van-tabbar-item>
      <van-tabbar-item to="mine_course">
        <span style='color:#fff'>我的课程</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="icon.normal1"
        >
      </van-tabbar-item>
      <van-tabbar-item @click='openPage("products_category",2,"","课程列表")'>
        <span style='color:#fff'>全部课程</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="icon.normal2"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="user_center">
        <span style='color:#fff'>会员中心</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="icon.normal3"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>


export default {

  name: 'app',
  provide(){
      return{
        reload:this.reload
      }
    },
  data() {
    return {
      // headerNav,
      active: 0,
      isRouterAlive:true,
      icon: {
        normal0: require('@/assets/footerbar0.png'),
        normal1: require('@/assets/footerbar1.png'),
        normal2: require('@/assets/footerbar2.png'),
        normal3: require('@/assets/footerbar3.png'),

      }
    }
    
  },
  created() {

    //监听键盘收起，然后滚动顶部
    document.body.addEventListener('focusout', () => {
      document.body.scrollTop = 0;
    })


  },
  methods:{
    openPage(str,id,type,title){
      this.$router.push({name:str,query: {type_id: id,type:type,title:title}});
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      });
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: hidden;
}
.van-tabbar-item{
  color: #fff!important;
}
/* 底部样式 */

</style>
