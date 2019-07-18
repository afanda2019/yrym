<template>
  <v-page title="确认下单">
    <div v-if='shopceat==3' class='address' @click='openPage("address_list")'>
    <van-icon v-if='addressxianshi' name="location-o" style='padding-top:12px' />
    
    <div v-if='addressxianshi'>
      姓名:{{address.cnname}} 电话:{{address.mobile}}<br>
      地址:{{address.province_name}}-{{address.city_name}}-{{address.area_name}}-{{address.regiontxt}}
    </div>
    <p v-else>点击添加地址</p>
    
    </div>
    <div class="page-content">
       <!-- <van-panel><div slot="header" class="card-header">
          <img src="@/assets/logo_x.png" class="logo" alt="">
          嫣然亿美讲师团体讲师
        </div>
      </van-panel>-->
        <div class="order-content" v-for='(item,index) in shopInfo' :key="index">
          <div class="left">
            <img :src="item.tumb_pic_url" v-auto-height alt="">
          </div>
          <div class="right">
            <div class="title">{{item.title}}</div>
            <div class="type">规格：长期有效&nbsp;&nbsp;&nbsp;<span v-if='item.num'>数量x{{item.num}}</span></div>
          </div>
        </div>
       
      <div class="line"></div>
      <van-cell-group>
        <van-cell :border="false" title="课程金额" :value="'￥'+price"/>
      </van-cell-group>
      <van-button size="large" @click='submit()'>立即支付</van-button>
    </div>

  </v-page>
</template>

<script>
  // import {wxConfig} from "@/utils/index"
  import wx from "weixin-js-sdk"
  // 微信配置

  export default {
    name: 'confirm_order',
    data () {
      return {
        is_buycart: this.$route.query.is_buycart,	//是否购物车：0否，1是	
        buycart_ids:this.$route.query.buycart_ids||'',//购车ids，已字符串逗号分隔	
        product_id:this.$route.query.id||'',//
        shopceat:this.$route.query.shopceat,//商品还是课程。商品 需要填写地址；课程不需要填写地址
        shopInfo:[],
        address:[],
        price:'',
        pro_type:'',
        addressxianshi:false
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
        this.is_buycart=this.$route.query.is_buycart,	//是否购物车：0否，1是	
        this.buycart_ids=this.$route.query.buycart_ids||'',//购车ids，已字符串逗号分隔	
        this.product_id=this.$route.query.id||'',//
        this.shopceat=this.$route.query.shopceat//商品还是课程。商品 需要填写地址；课程不需要填写地址
        this.order_list();
        this.address_list();
    },
    methods: {
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
      config(url){
        
      },
      // 订单列表
      address_list(){
        const params = {
          'token':this.$getStorage('token'),
        }
        this.$ajax('Address/getOrderUsed',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.address = res.data
            if(this.address.length==[]){
              
            }else{
              this.addressxianshi = true
            }
          }
        }, (err) => {
          console.log(err)
        })
      },

      submit() { //提交支付
        if(this.$route.query.shopceat==3){
          if(this.address == '') {
            alert('请选择地址')
            // this.$toast();
            return;
          }
        }
        if(this.$route.query.shopceat==3){
          this.pro_type = 0
        }else{
          this.pro_type = 1
        }
        let _this = this;
       const params = {
            'token':this.$getStorage('token'),
            'product_id': this.$route.query.id||'',//单个商品id	
            'is_buycart': this.$route.query.is_buycart,//0单个商品购买，1购物车购买	
            'addressid': this.address.id||0,//商品传地址id，
            'pro_type':this.pro_type,
            'buycart_ids':this.$route.query.buycart_ids||''
        }


        this.$ajax('order/create', params).then(({errno, errmsg, data}) => {
          // this.$closeLoading();
          // setTimeout(function(){
          // setTimeout((function(){
            if (this.SUCCESS_CODE == errno) {
              let payCfg = data.pay;
              let oid = data.orderid;
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
                      _this.$router.replace({name: 'mine_order',query: {oid: oid}});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付成功'
                    }).then(() => {
                      _this.$router.replace({name: 'mine_course',query: {oid: oid}});
                    });
                  }
                },
                fail: function(ret) {
                  if( _this.$route.query.shopceat==3){
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败'
                    }).then(() => {
                    _this.$router.replace({name: 'mine_order',query: {oid: oid}});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败'
                    }).then(() => {
                    _this.$router.replace({name: 'mine_course',query: {oid: oid}});
                    });
                    
                  }
                },
                cancel: function(ret) {
                  if( _this.$route.query.shopceat==3){
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败，稍后重试'
                    }).then(() => {
                    _this.$router.replace({name:'mine_order',query: {oid: oid}});
                    });
                    
                  }else{
                    _this.$dialog.alert({
                      title: '温馨提示',
                      message: '支付失败，稍后重试'
                    }).then(() => {
                    _this.$router.replace({name: 'mine_course',query: {oid: oid}});
                    });
                  
                  }
                  
                }
              });
              
            } else {
              // this.$toast(errmsg);
            }
          // },300)
        });





        // this.$ajax('order/create',params).then((res) => {
        //   console.log(res)
        //   if(res.errno == 1000) {
        //     let oid = res.data.orderid;
        //     let wx_sign = res.data.pay;
        //     wx.chooseWXPay({
        //       timestamp: wx_sign.timeStamp,
        //       nonceStr: wx_sign.nonceStr,
        //       package: wx_sign.package,
        //       signType: wx_sign.signType,
        //       paySign: wx_sign.paySign,
        //       success: function(ret) {
        //         // alert(JSON.stringify(ret))
        //         if( _this.$route.query.shopceat==3){
        //           _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付成功'
        //           }).then(() => {
        //             _this.$router.replace({name: 'mine_order',query: {oid: oid}});
        //           });
                  
        //         }else{
        //           _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付成功'
        //           }).then(() => {
        //              _this.$router.replace({name: 'mine_course',query: {oid: oid}});
        //           });
        //         }
        //       },
        //       fail: function(ret) {
        //          if( _this.$route.query.shopceat==3){
        //            _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付失败'
        //           }).then(() => {
        //            _this.$router.replace({name: 'mine_order',query: {oid: oid}});
        //           });
                  
        //         }else{
        //            _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付失败'
        //           }).then(() => {
        //           _this.$router.replace({name: 'mine_course',query: {oid: oid}});
        //           });
                  
        //         }
        //       },
        //       cancel: function(ret) {
        //          if( _this.$route.query.shopceat==3){
        //            _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付失败，稍后重试'
        //           }).then(() => {
        //           _this.$router.replace({name: 'mine_order',query: {oid: oid}});
        //           });
                  
        //         }else{
        //           _this.$dialog.alert({
        //             title: '温馨提示',
        //             message: '支付失败，稍后重试'
        //           }).then(() => {
        //            _this.$router.replace({name: 'mine_course',query: {oid: oid}});
        //           });
                 
        //         }
                 
        //       }
        //     });
        //   }else {
        //     // this.$toast(res.errmsg);
        //   }
        // }, (err) => {
        //   console.log(err)
        // })
     
    },
      // 订单列表
      order_list(){
        const params = {
          'token':this.$getStorage('token'),
          'is_buycart':this.is_buycart,//	string	是	是否购物车：0否，1是	
          'buycart_ids':this.buycart_ids,	//string	否	购车ids，已字符串逗号分隔	
          'product_id':this.product_id,//	string	否	商品id
        }
        this.$ajax('Order/beforeOrderCreate',params).then((res) => {

          this.$toast.clear()
          if (res.errno == 1000) {
            this.shopInfo = res.data.list;
            this.price = res.data.total
            
          }
        }, (err) => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>

  .page-content {
    background : #f5f5f5;
  }

  .page-content .card-header .logo {
    position : relative;
    top      : 5px;

  }

  .page-content .card-header {
    height        : 50px;
    line-height   : 50px;
    border-bottom : 1px solid #f5f5f5;
    padding       : 0 15px;

  }

  .page-content .classes-price {
    color : #FB561B;
  }

  .page-content .line {
    height : 8px;
  }

  .page-content .order-content {
    border-top:1px solid #f1f1f1;
    display : flex;
    padding : 15px;
    background:#fff
  }

  .page-content .left {
    flex : 1 0 25%;
  }

  .page-content .right {
    flex         : 1 0 75%;
    padding-left : 15px;
    padding-top  : 15px;
  }

  .page-content .left img {
    width         : 100%;
    border-radius : 5px;
  }

  .page-content .type {
    color      : #9d9d9d;
    margin-top : 10px;
  }

  .van-button--large {
    width         : 90%;
    margin-left   : 5%;
    border-radius : 5px;
    color         : #fff;
    background    : #0E4548;
    margin-top    : 100px;
  }
  .address{padding:10px 15px;line-height:40px;display:flex}
</style>
