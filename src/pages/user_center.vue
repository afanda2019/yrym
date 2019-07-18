<template>
  <div class="hello">
    <div class="ny_tb">
        会员中心
    </div>	
    <!-- 头部 -->
    <!-- 导航按钮 -->
    <div style='height:50px'></div>
    <div class="grzx_01">
      <div class="grzx_tx"><img :src="userimg"></div>
      <p>{{username}}</p>
        
    </div>
    <div class="grzx_02">
      <div class='grzx_02item' @click='openPage("teacher_collection")'>
        <img src="@/assets/grzx_04.jpg">
      </div>
      <div class='grzx_02item' @click='openPage("mine_collection")'>
        <img src="@/assets/grzx_05.jpg">
      </div>
    </div>
    <div class="grzx_03">
      <div  @click='openPage("about_us")'>
        <img src="@/assets/grzx_06.png">
      </div>
      <div  @click='call'>
        <img src="@/assets/grzx_07.png">
      </div>
      <div @click='openPage("address_list")'>
        <img src="@/assets/grzx_08.png">
      </div>
      <div  @click='openPage("feedback")'>
        <img src="@/assets/grzx_09.png">
      </div>
    </div>
 
    <div class="grzx_05">
      <van-cell-group>
        <van-cell title="我的订单" value="查看更多订单" @click='openPage("mine_order",0)' />
      </van-cell-group>
      <div class='dd'>
        <div class='dditem'  @click='openPage("mine_order",1)'>
          <img src="@/assets/wddd1.png">
          <div class="grzx_fd_09">待付款</div>
        </div>
        <div class='dditem' @click='openPage("mine_order",2)'>
          <img src="@/assets/wddd2.png">
            <div class="grzx_fd_10">待发货</div>
        </div>
        <div class='dditem'  @click='openPage("mine_order",3)'>
          <img src="@/assets/wddd3.png">
            <div class="grzx_fd_11">待收货</div>
        </div>
        <div class='dditem'  @click='openPage("mine_order",4)'>
          <img src="@/assets/wddd4.png">
            <div class="grzx_fd_14">已完成</div>
        </div>
      </div>
      
    </div>
    <div style='height:1rem'></div>
    <div style='height:8px;background:#efefef'></div>
    <div class="grzx_06" @click='openPage("mine_data")'>
      <van-icon style='line-height:34px;padding-left:15px;' color='#f1c941' name="manager" />
      <van-cell title="我的资料" is-link />
    </div>
    <div class="grzx_06" @click='openPage("buycar")'>
      <van-icon style='line-height:34px;padding-left:15px;' color='#fc8530' name="cart" />
      <van-cell title="购物车" is-link />
    </div>
    <div class="grzx_06" @click='openPage("mine_course")'>
      <van-icon style='line-height:34px;padding-left:15px;' color='#fc8530' name="balance-list" />
      <van-cell title="我的课程" is-link />
    </div>
   <div style='height:55px'></div>
  </div>
</template>

<script>
export default {
  name: 'user_center',
  components: {
    
  },
  data () {
    return {
      
      datas: {},
      username:this.$getStorage('nickname'),
      userimg:this.$getStorage('headerimg'),
      kefu:''
    }
  },
  mounted(){
      this.getconfig()
  },
  methods: {
    openPage(str,id){
      this.$router.push({name:str,query: {type_id: id}});
    },
    call() { //拨打电话
      window.location.href = 'tel:' + this.kefu;
    },
    getconfig(){
       const params = {
        'field':'kefu_mobile'
      }
      this.$ajax('Config/getConfig',params).then((res) => {
        if (res.errno == 1000) {
          this.kefu = res.data
        }
      }, (err) => {
        console.log(err)
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{background:#fdfefe}
.ny_tb{ background:#0f4549; line-height:50px; position:fixed;top:0;width:100%;z-index:9999; text-align:center; color:#FFF;}
.ny_fh{ width:12px; position:absolute; z-index:99; top:15px; left:15px;}
.grzx_01{background:url('../assets/grzx_03.jpg') no-repeat left top;background-size:100% 100%;width:100%;padding:20px 0;border-top:1px solid #296e73}
.grzx_tx{
  width:4.5rem;
  height:4.5rem;
  border-radius:50%;
  overflow:hidden;
  border:2px solid #fff;
  margin:0 auto
}
.grzx_tx img{width:100%}
.grzx_01 p{margin:5px;text-align:center;color:#fff}
.grzx_02{
  display: flex;
}
.grzx_02item{width:50%;position:relative} 
.grzx_02item img{width:100%} 
.grzx_03{
  display: flex;
}
.grzx_03 div{width:25%}
.grzx_03 img{width:100%}
.grzx_05{width:94%;margin:20px 3% 0;box-shadow:0 0 10px 0 #f1f1f1;border-radius:8px;    overflow: hidden;}
.van-cell{
      padding: 5px 15px;

}
.dd{
   display: flex;
}
.dditem{width:25%;margin:15px 0 15px 0 ;text-align:center;font-size:14px}
.dditem img{width:60%;margin:0 20%}
.grzx_06{padding:5px 0;border-top:1px solid #f1f1f1;display: flex;}
</style>
