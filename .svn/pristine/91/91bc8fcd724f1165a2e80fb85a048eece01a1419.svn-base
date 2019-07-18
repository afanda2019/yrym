<template>
  <v-page title="确认订单">
    <div class="page-content">
      <van-cell-group title="订单详情">
        <van-cell title="订单名称" value="购买[嫣然美容]课程"/>
        <van-cell title="订单编号" value="564897456241657465"/>
        <van-cell title="商家名称" value="嫣然美容"/>
        <van-cell title="商品价格">
          <div class="classes-price">￥50</div>
        </van-cell>
      </van-cell-group>
      <van-cell-group title="支付方式">
        <van-cell>
          <div slot="title">
            <van-icon name="wechat" color="#00C700" size="30px" class="pay-icon"/>
            <span class="title">微信</span>

          </div>
          <van-checkbox class="checkbox" v-model="checked" disabled checked-color="#FA6835"/>
        </van-cell>
      </van-cell-group>
      <van-button size="large">支付</van-button>
    </div>

  </v-page>
</template>

<script>
  export default {
    name: 'confirm_order',
    data () {
      return {
        checked: true
      }
    },
  }
</script>

<style scoped>
  .pay-icon {
    position : relative;
    top      : 3px;
  }

  .title {
    position : relative;
    top      : -7px;
  }

  .page-content {
    background : #F5F5F5;
  }

  .checkbox {
    position : relative;
    top      : 3px;
  }

  .page-content .van-cell-group__title {
    padding-bottom : 15px;
  }

  .classes-price {
    color : #FB561B;
  }

  .page-content >>> .van-checkbox__icon--disabled .van-icon {
    border-color     : #FA6835;
    background-color : #FA6835;
  }

  .page-content >>> .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color : white;
  }

  .van-button--large {
    width         : 90%;
    margin-left   : 5%;
    border-radius : 5px;
    color         : #fff;
    background    : #0E4548;
    margin-top    : 100px;
  }
</style>
