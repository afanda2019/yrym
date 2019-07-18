<template>
    <v-page title="实名认证">
      <div class="page-content">
        <img src="@/assets/smrz.jpg" alt="">
        <van-button size="large">确定</van-button>
      </div>
    </v-page>
</template>

<script>
  export default {
    name: 'realname_auth'
  }
</script>

<style scoped>
  .page-content{
    width: 100%;
    background: #F0EFF4;
  }
  .page-content img{
    width: 100%;
  }
  .van-button--large{
    width: 90%;
    margin-left: 5%;
    border-radius: 5px;
    color: #fff;
    background: #04BC02;
    margin-top: 80px;
  }
</style>
