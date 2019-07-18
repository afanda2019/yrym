<template>
  <v-page :title="title" :rightIcon='rightIcon' @right-click="openPage('buycar')" :numCart="num">
    <div class="content">
      <div class="audio-wrap">
        <img  :src='productinfo.cover_pic_url' style='width:100%;display:block'>

        <audio :src="productinfo.mp3_url" controls="controls" v-if='productinfo.mp3_url'>
          Your browser does not support the audio element.
        </audio>
        <div  style='width:100%;position:relative'  v-if='productinfo.model==1&&productinfo.mp3_url==""'>
          <div  @click="stared()" style='position:absolute;left:0;top:0;width:100%;height:100%;z-index:9999999'></div>
          <audio :src="productinfo.mp3_url" controls="controls">
            Your browser does not support the audio element.
          </audio>
          <p style='color:#999;font-size:12px;padding: 0 0 15px;'>购买后就可以开始学习了</p>
        </div>
      </div>
      <div class="course-info">
        <div class="title">
          {{productinfo.title}}
        </div>
        <div class="price">
          <span>
            <small>￥</small>
            <b>{{productinfo.directbuy_price}}</b>
          </span>
          <span>购买人数:{{productinfo.totalsalenum}}</span>
        </div>
        
        
      </div>
      <div v-if='productinfo.model==2' style='padding:5px 15px;background:#fff;border-bottom:10px solid #f7f7f7;color:#3c3c3c;font-size:14px'>
          <div class="title" style='padding:5px 0'>
          上课地址：{{productinfo.course_address}}
          </div>
          <div class="title" style='padding:5px 0'>
            联系人{{productinfo.course_name}}&nbsp;&nbsp;&nbsp;电话：<span>{{productinfo.course_mobile}}</span>
          </div>
      </div>
      <!--<van-tabs sticky  color="#fff" title-active-color="#333" style='z-index:0'>
        <van-tab title="详情">
          <div class='cont' v-html='productinfo.content_txt'>
          </div>
        </van-tab>
        <van-tab title="目录">
          目录
        </van-tab>
        <van-tab title="讲师介绍">
          讲师介绍
        </van-tab>
      </van-tabs>-->
      <div class='xiangqingtitle'>详情</div>
      <div class='cont' v-html='productcont'></div>
      <div style='height:50px'></div>
      <!-- <van-goods-action>
         <van-goods-action-mini-btn
           icon="chat-o"
           text="咨询"
         />
         <van-goods-action-mini-btn
           icon="star-o"
           text="收藏"
         />
         <van-goods-action-mini-btn
           icon="cart-o"
           text="购物车"
         />

         <van-goods-action-big-btn
           primary
            style=" background: linear-gradient(to right,#4FFD74,#20953F);"
           text="立即预约"
         />
       </van-goods-action>-->
      <!-- 线下 -->
      <van-goods-action style='z-index:99999'  >
        <van-goods-action-mini-btn
          icon="chat-o"
          text="咨询"
          @click='call'
        />
        <van-goods-action-mini-btn v-if='productinfo.is_history==0' @click='collection'
          icon="star-o"
          text="收藏"
        />
        <van-goods-action-mini-btn style='color:red' v-else @click='delcollection'
          icon="star-o"
          text="收藏"
        />
        <van-goods-action-mini-btn style='color:red' v-if='productinfo.model==0' @click='addcart'
          icon="cart-o"
          text="购物车"
        />
        <van-goods-action-big-btn
          primary
          text="开始学习"
          @click="stared()"
          style=" background: linear-gradient(to right,#F59C3F,#F38611);" v-if='productinfo.model==1'
        />
        <van-goods-action-big-btn
          primary
          text="立即预约"
          @click="stared1()"
          v-if='productinfo.model==2'
          style=" background: linear-gradient(to right,#50ff76,#20923d);"
        />
        <van-goods-action-big-btn
          primary
          text="立即购买"
          @click="stared2()"
          v-if='productinfo.model==0'
          style=" background: linear-gradient(to right,#50ff76,#20923d);"
        />
      </van-goods-action>
    </div>
    <van-dialog
      v-model="show"
      :showConfirmButton="false"
    >
      <div class="explain-wrap">
        <div class="explain-content-wrap" >
          <div class="explain-content" v-html='configget'>
          </div>
        </div>
        <div class="checkbox-wrap">
          <van-checkbox v-model="agree">我已同意并阅读</van-checkbox>
        </div>
        <van-button size="large" v-if='agree' @click="showfalse">确认</van-button>
        <van-button size="large" style='background: #cacaca' v-else>确认</van-button>

      </div>
    </van-dialog>
    <div class="tcbox" id="fuli">
  <div id="beijing" v-if='showMask' @click='showMask=false'></div>
  <div class="tankuang" v-if='showMask'>
    <div class="db_tc">
        <div class="db_tc_left"><img :src="productinfo.cover_pic_url"></div>
          <div class="db_tc_right">
            <span>{{productinfo.title}}</span>
              ￥88.00
          </div>
          <div class="an_gb"><a href="javascript:void(0)" onclick="closeBox()"><img src="images/an_gb.png"></a></div>
      </div>
      <div class="db_tc_sx">
        <div class="db_tc_sx_left">有效期：</div>
          <div class="db_tc_sx_right">
            <ul>
                <li>永久</li>
              </ul>
          </div>
      </div>
      <div class="ljgm" @click='showfalse'>立即购买</div>
  </div>  
</div>


    
  
  </v-page>
</template>

<script>
  export default {
    name: 'course_detail',
    data () {
      return {
        show: false,
        showMask:false,
        agree:true,
        productinfo:[],
        productcont:'',
        configget:[],
        showloc:'',
        userinfo:[],
        userflg:false,
        rightIcon:'cart-o',
        num:'0',
        title:'课程详情',
        kefu:''
      }
    },
    mounted(){
      // if(this.$route.query.title){
      //   this.title=this.$route.query.title
      // }
        
        this.course_detail();
        this.getConfig();
        this.shop_cart()
    },
    methods:{
      
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      // 商品信息
      course_detail(){
        const params = {
          'token':this.$getStorage('token'),
          'id':this.$route.query.type_id
        }
        this.$ajax('product/getDetail',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.productinfo = res.data;
            this.productcont = this.formatImg(this.productinfo.content_txt);
            this.kefu = res.data.mobile
          }
        }, (err) => {
          console.log(err)
        })
      },
      shop_cart(){
        const params = {
          'token':this.$getStorage('token'),
        }
        this.$ajax('Buycar/get_buycar_list',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.num = res.data.length.toString();
            if(this.num=='0'){
              this.num = ''
            }
          }
        }, (err) => {
          console.log(err)
        })
      },
      //购买课程
      stared(){
        const params = {
          'token':this.$getStorage('token')
        }
        this.$ajax('member/getinfo',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.userinfo = res.data;
             if (this.userinfo.is_perfect== 0) {
                this.$router.push({ name: 'perfect_data', query: { type_id: 1 } });
              }else{
                if(this.$getStorage('showloc')){
                  this.show = false;
                  this.$router.push({name:'confirm_order',query: {id: this.productinfo.id,shopceat:1,is_buycart:0}});
                }else{
                  this.show = true;
                }
              }
            
          }
        }, (err) => {
          console.log(err)
        })
      },
      //购买课程线下显示弹层
      stared1(){
        const params = {
          'token':this.$getStorage('token')
        }
        this.$ajax('member/getinfo',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.userinfo = res.data;
             if (this.userinfo.is_perfect== 0) {
                this.$router.push({ name: 'perfect_data', query: { type_id: 1 } });
              }else{
                this.showMask = true
              }
            
          }
        }, (err) => {
          console.log(err)
        })       
        
      },
      stared2(){
        const params = {
          'token':this.$getStorage('token')
        }
        this.$ajax('member/getinfo',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.userinfo = res.data;
             if (this.userinfo.is_perfect== 0) {
                this.$router.push({ name: 'perfect_data', query: { type_id: 1 } });
              }else{
                    this.$router.push({name:'confirm_order',query: {id: this.productinfo.id,shopceat:3,is_buycart:0}});
              }
            
          }
        }, (err) => {
          console.log(err)
        })  
        
      },
      // 商品购买条款
      showfalse(){
        this.show = false;
        this.$setStorage('showloc', true);
        this.$router.push({name:'confirm_order',query: {id: this.productinfo.id,shopceat:2,is_buycart:0}});

      },
      //添加购物车
      addcart(){


        const params = {
          'token':this.$getStorage('token')
        }
        this.$ajax('member/getinfo',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.userinfo = res.data;
             if (this.userinfo.is_perfect== 0) {
                this.$router.push({ name: 'perfect_data', query: { type_id: 1 } });
              }else{
                    const params1 = {
                      'token':this.$getStorage('token'),
                      'product_id':this.productinfo.id,
                      'num':1
                    }
                    this.$ajax('Buycar/add',params1).then((ret) => {
                      this.$toast.clear()
                      if (ret.errno == 1000) {
                        this.$toast('加入购物车成功');
                        this.shop_cart();
                      }
                      
                    }, (err) => {
                      console.log(err)
                    })
              }
            
          }
        }, (err) => {
          console.log(err)
        })  
        
      },
      
      // 、、收藏商品
      collection(id){
        const params = {
          'token':this.$getStorage('token'),
          'data_id':this.productinfo.id,
          'group_flag':'product'
        }
        this.$ajax('member/addHistory',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            this.productinfo.is_history = 1
            // this.onLoad()
            
          }
          
        }, (err) => {
          console.log(err)
        })
      },
      // 取消收藏
      delcollection(id){
        const params = {
          'token':this.$getStorage('token'),
          'data_id':this.productinfo.id,
          'group_flag':'product'
        }
        this.$ajax('member/delHistory',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            this.productinfo.is_history = 0
            
          }
          
        }, (err) => {
          console.log(err)
        })
      },
      getConfig(id){
        const params = {
          'field':'read_text'
        }
        this.$ajax('Config/getConfig',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            this.configget = res.data
          }
          
        }, (err) => {
          console.log(err)
        })
      },
      formatImg:function(html){
                var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
            var match = match.replace(/<img/gi,'<img/style="width:100%"');
            return match;
        });
        return newContent;
      },
      call() { //拨打电话
        window.location.href = 'tel:' + this.kefu;
      },
      
    },
  }
</script>

<style scoped>
  .checkbox-wrap{
    padding: 15px 0;
  }
  .cont{padding:10px 15px 50px;}
  .explain-wrap >>> .van-checkbox__icon--checked .van-icon {
    border-color     : #FA6835;
    background-color : #FA6835;
  }
  .van-button--large {
    border-radius : 5px;
    color         : #fff;
    background    : #0E4548;
  }
  .cont{}
  .van-dialog {
    width : 90%;
  }

  .explain-wrap {
    padding : 15px;
    margin  : 10px;
  }
.btn-audio{
        margin: 90px auto;
        width: 186px;
        height: 186px;
        background:url('../assets/grzx_03.jpg') no-repeat center bottom;
        background-size:cover;
    }
  .explain-wrap .title {
    margin  : 0;
    padding : 5px 0;
  }

  .explain-content-wrap {
    background  : #E7F8F2;
    padding     : 15px;
    font-size   : 15px;
    line-height : 24px;
    color       : #333;
  }

  .explain-content {
    text-indent : 20px;
  }

  .explain-content-wrap .date {
    text-align : right;
    color      : #000;
  }

  .content >>> .van-button--danger {
    background   : linear-gradient(to right, #4FFD74, #20953F);
    border-width : 0;
  }

  .course-info {
    background    : #fff;
    padding       : 15px;
    margin-bottom : 10px;
  }

  .course-info .title {
    font-size : 15px;
    color     : #333;
  }

  .price {
    display         : flex;
    margin          : 8px 0 0 0;
    justify-content : space-between;
  }

  .price span:first-child {
    color : #F59C3F;
  }

  .price span:last-child {
    font-size : 14px;
    color     : #999;
  }

  .content {
    height:100vh;
    background : #f7f7f7;
  }

  .audio-wrap {
    text-align    : center;
    margin-bottom : 10px;
    box-shadow    : #999 0 0 18px;
  }
  .van-dialog{
    height: 80%;
    overflow: scroll;
    -webkit-overflow-scrolling:touch
  }
#beijing{width: 100%;height:100%;left:0;top:0;position: fixed;z-index:199;background:rgba(0,0,0,0.5);}
#fuli{position:relative;}
#dhcg img{width: 80% !important;}
#guanbi{ height:20px;width:20px;background:#ff0000;z-index:999;}
.tankuang{background:#fff; position:fixed;width:100%;bottom:0;left:0;z-index:999999; overflow:hidden;}
.db_tc{ clear:both; position:relative; padding:10px; overflow:hidden;}
.db_tc_left{ float:left; width:30%; border-radius:5px;}
.db_tc_left img{width:100%}
.db_tc_right{ float:left; width:55%; padding:5px 0 0 5%; color:#df1614;}
.db_tc_right span{ height:52px; line-height:26px; overflow:hidden; color:#000; display:block;}
.an_gb{ position:absolute; z-index:99; right:10px; top:10px; width:15px;}
.db_tc_sx{ clear:both; padding:10px; overflow:hidden;}
.db_tc_sx_left{float:left; width:25%; text-align:center;}
.db_tc_sx_right{ float:left; width:75%;}
.db_tc_sx_right ul li{ float:left; width:30%; text-align:center; color:#df1614; border:1px #df1614 solid; line-height:26px; margin:-3px 2% 0 0; border-radius:5px;}
.ljgm{ clear:both; margin-top:10px;}
.ljgm{ background:#0f4549; color:#FFF; text-align:center; line-height:40px;width:100%}
.xiangqingtitle{
  padding:10px;
  text-align:center;
  background:#fff;
  border-bottom:2px solid #f1f1f1
}
.cont{padding:0 15px;}
p{margin:0}
</style>
