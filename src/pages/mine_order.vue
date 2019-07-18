<template>
  <v-page title="我的订单">
    <van-tabs color="#F59C3F" v-model="active" title-active-color="#F59C3F" @click="vantab()">
      <van-tab title="全部订单"/>
      <van-tab title="待付款"/>
      <van-tab title="待发货"/>
      <van-tab title="待收货"/>
      <van-tab title="已完成"/>
    </van-tabs>
    <div class="line"></div>
    <div class="tab-content">
      <div class="classes-list">
        <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad" >
          <div class="classes-item"   v-for='(item,index) in list' :key="index">
            <p class='orderno'>订单号：{{item.orderno}}</p>
            <div v-for='(itemlist,index) in item.order_info' :key="index"   @click='openPage("course_detail",itemlist.product_id)'>
              <van-card
                :price="itemlist.product_price"
                :title="itemlist.product_title">
                <div slot="thumb">
                  <img class="thumb-img" :src="itemlist.product_tumbpic"  alt="">
                </div>
                
              </van-card>
            </div>
            <div class='footer clearfix' slot="num">
              <span class="tag tag-success" v-if='item.pay_status==0' @click.stop='gopay(item.id)'>去支付</span>

              <span class="tag tag-success" v-if='item.pay_status==1&&item.wuliu_status==0'>已付款</span>
              <span class="tag tag-success" v-if='item.pay_status==1&&item.wuliu_status==2'>已完成</span>
              <span class="tag tag-success" v-if='item.pay_status==1&&item.wuliu_status==1' @click.stop='shouhuo(item.id)'>确认收货</span>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </v-page>

</template>

<script>
  import wx from "weixin-js-sdk"
  export default {
    name: 'mine_order',
    data () {
      return {
        list:[],
        page:1,
        loading: false,
        finished: false,
        status:this.$route.query.type_id||0,
        active:this.$route.query.type_id||0
      }
    },
    mounted(){
      this.$ajax('Wechat/getConfig', {}).then((res) => {
        if (res.errno == this.SUCCESS_CODE) {
          wx.config(res.data); 
        }
      }, (err) => {
        console.log(err)
      })
    },
    methods:{
      
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      vantab(){   
        this.page=1;
        this.list=[];
        this.loading=false;
        this.finished= false;
        this.shoplist()
      },
      gopay(id){
        const params = {
          'token':this.$getStorage('token'),
          'orderid':id,
        }
        this.$ajax('order/repay',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
              let payCfg = res.data;
              payCfg.timestamp = payCfg.timeStamp;
              delete payCfg.timeStamp;
              delete payCfg.appId;
              let _this = this;
              wx.chooseWXPay({
                ...payCfg,
                success(res) {
                  // _this.$toast('支付成功');
                    if( _this.$route.query.shopceat==3){
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付成功'
                    }).then(() => {
                      // _this.$router.replace({name: 'mine_order'});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付成功'
                    }).then(() => {
                      // _this.$router.replace({name: 'mine_course'});
                    });
                  }
                },
                fail: function(ret) {
                  if( _this.$route.query.shopceat==3){
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败'
                    }).then(() => {
                    // _this.$router.replace({name: 'mine_order'});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败'
                    }).then(() => {
                    // _this.$router.replace({name: 'mine_course'});
                    });
                    
                  }
                },
                cancel: function(ret) {
                  if( _this.$route.query.shopceat==3){
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败，稍后重试'
                    }).then(() => {
                    // _this.$router.replace({name:'mine_order'});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败，稍后重试'
                    }).then(() => {
                    // _this.$router.replace({name: 'mine_course',query: {oid: oid}});
                    });
                  
                  }
                  
                }
              });
            



            
          }
          
        }, (err) => {
          console.log(err)
        })
      },
      shouhuo(id){
        const params = {
          'token':this.$getStorage('token'),
          'orderid':id,
        }
        this.$ajax('order/checksign',params).then((res) => {
          console.log(res)
          if (res.errno == 1000) {
              this.page=1;
              this.list=[];
              this.loading=false;
              this.finished= false;
          }
          
        }, (err) => {
          console.log(err)
        })
      },
      shoplist(){
        const params = {
          'token':this.$getStorage('token'),
          'page':this.page,
          'pagesize':10,
          'type':0,
          'status':this.active
        }
        this.$ajax('order/getList',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            if(res.data.list.length==0){
                this.finished = true;
                this.loading = false;
                return;
            }else{
              this.page++
              this.list.push.apply(this.list, res.data.list);
              
            }
            
          }
          
        }, (err) => {
          console.log(err)
        })
      },

      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          this.shoplist();
          
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length + 1);
          // }
          // 加载状态结束
          this.loading = false;

          
        }, 500);
      },
      
    }
  }
</script>

<style scoped>

  .line {
    background : #f5f5f5;
  }

  .tab-content {
    height     : calc(100% - 44px);
    overflow-y : scroll;
  }

  .thumb-img {
    border-radius : 3px;
    width:90px;
    height:90px;
  }

  .van-card {
    background    : #fff;
    padding       : 15px;
    border-bottom : 1px solid #f5f5f5;
  }

  .van-card__title {
    padding-top : 5px;
    font-size   : 15px;
    color       : #333;
    font-weight : unset;
  }

  .van-card__bottom {
    margin-top : 20px;
    font-size  : 16px;
  }

  .tag {
    border        : 1px solid #F59C3F;
    font-size     : 12px;
    padding       : 3px 10px;
    border-radius : 100px;
    position      : relative;
    top           : -3px;
    color         : #F59C3F;
  }

  .tag-success {
    border-color : #A6E0D1;
    color        : #A6E0D1;
    float:right;
    margin-right:5px

  }
  .footer{padding:10px;border-bottom:1px solid #f1f1f1;height:20px}
  .orderno{color:#3c3c3c;font-size:14px;border-bottom:1px solid #f1f1f1;margin:0;padding:8px 15px}
</style>
