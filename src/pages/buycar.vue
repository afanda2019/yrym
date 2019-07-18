<template>
  <v-page title="购物车" right-icon="delete" @right-click="deleteBuycar" :numCart="num">
    <div class="content">
      <div class="buycar-list">
        <div class="buycar-item" v-for='(item,key) in cartInfo' :key='key'>
          <div class="checked-box">
            <van-checkbox v-model='item.checked' @change='addcourse(key)'/>
          </div>
          <div class="goods-preview">
            <img :src="item.tumb_pic_url" v-auto-height alt="">
          </div>
          <div class="goods-info">
            <div class="title">
              {{item.title}}
            </div>
            <div class="price">
              <b>￥{{item.directbuy_price}}</b>
              <van-stepper class="stepper" v-model="item.num" @change='addcart(item.buy_car_id,item.num)'/>
            </div>
          </div>
        </div>
      </div>
      <p class='moredata'>已经没有数据了</p>
      <van-submit-bar :price="allprice" button-text="提交订单" @submit="gwc()">
       <!--  <van-checkbox v-model="quanxuan" @change='quanxuans(key)'>全选</van-checkbox>-->

      </van-submit-bar>
    </div>


  </v-page>
</template>

<script>
  export default {
    name: 'buycar',
    data () {
      return {
        value: 0,
        cartInfo:[],
        quanxuan:false,
        allprice:0,
        ids:'',
        num:""
      }
    },
    mounted(){
        this.course_detail();
    },
    methods: {
      // 购物车列表
      course_detail(){
        const params = {
          'token':this.$getStorage('token'),
        }
        this.$ajax('Buycar/get_buycar_list',params).then((res) => {

          this.$toast.clear()
          if (res.errno == 1000) {
            this.cartInfo = res.data;
            
          }
        }, (err) => {
          console.log(err)
        })
      },
      // 购物车购买商品
      
      gwc(){
        this.ids = ''
        for(var m = 0;m<this.cartInfo.length;m++){
          if(this.cartInfo[m].checked){
            this.ids+=this.cartInfo[m].buy_car_id+','
          }
          
        }
        this.ids = this.ids.substring(0, this.ids.length - 1);  
        if(this.ids==''){
          this.$toast('选中您要购买的商品');
          return;
        }else{
          this.$router.push({name:'confirm_order',query: {buycart_ids: this.ids,shopceat:3,is_buycart:1}});
        }
      },
      // 删除购物车商品
      deleteBuycar(){
        this.ids = ''
        for(var m = 0;m<this.cartInfo.length;m++){
          if(this.cartInfo[m].checked){
            this.ids+=this.cartInfo[m].buy_car_id+','
          }
          
        }
        this.ids = this.ids.substring(0, this.ids.length - 1);  
        if(this.ids==''){
          this.$toast('选中您要删除的商品');
          return;
        }else{
          const params = {
          'token':this.$getStorage('token'),
          'buy_car_id':this.ids
          }
          this.$ajax('Buycar/delete_bucar',params).then((res) => {
            if (res.errno == 1000) {
              this.cartInfo=[];
              this.course_detail();
            }
          }, (err) => {
            console.log(err)
          })
        }
      },
      // 购物车++
      addcart(id,num){
        const params = {
          'token':this.$getStorage('token'),
          'buy_car_id':id,
          'num':num
        }
        this.$ajax('Buycar/update_buycar_num',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            
            this.allprice = 0
            for(var i = 0;i<this.cartInfo.length;i++){
              if(this.cartInfo[i].checked){
                this.allprice =Number(this.allprice) + Number((this.cartInfo[i].directbuy_price*this.cartInfo[i].num)*100);
              }
            }
            
          }
          
        }, (err) => {
          console.log(err)
        })
       
      },
      
      addcourse(index){
        this.allprice = 0
        for(var i = 0;i<this.cartInfo.length;i++){
          if(this.cartInfo[i].checked){
            this.allprice =Number(this.allprice) + Number((this.cartInfo[i].directbuy_price*this.cartInfo[i].num)*100);
          }
        }
      },
    }
  }
</script>

<style scoped>
  .van-submit-bar {
    border-top : 1px solid #f7f7f7;
  }
  
  .van-submit-bar__bar {
    padding-left : 15px;
  }

  .van-button--danger {
    background   : linear-gradient(to right, #FEB463, #F48612);
    border-width : 0;
  }

  .buycar-list {
    margin-bottom : 20px;
  }

  .content {
    padding-top : 10px;
    height      : calc(100% - 50px);
    overflow-y  : scroll;
    background  : #f7f7f7;
    box-sizing  : border-box;
  }

  .stepper {
    position : relative;
    top      : -3px;
  }

  .buycar-item {
    background    : #fff;
    display       : flex;
    padding       : 10px 15px;
    border-bottom : 1px solid #f7f7f7;
  }

  .buycar-item:last-child {
    border-bottom : unset;
  }

  .buycar-item .checked-box {
    flex        : 1 0 5%;
    display     : flex;
    align-items : center;
  }

  .buycar-item .goods-preview {
    flex       : 1 0 30%;
    box-sizing : border-box;
    padding    : 5px;
  }

  .buycar-item .goods-preview img {
    width : 100%;
  }

  .buycar-item .goods-info {
    flex         : 1 0 65%;
    padding-left : 10px;
    box-sizing   : border-box;
    padding-top  : 10px;
  }

  .buycar-item .goods-info .title {
    font-size : 15px;
    color     : #333;
  }

  .buycar-item .goods-info .price {
    color           : #FD8561;
    margin-top      : 13px;
    display         : flex;
    justify-content : space-between;
  }
  .moredata{
    text-align:center;
    color:#a9a9a9;
    margin:5px
  }
</style>
