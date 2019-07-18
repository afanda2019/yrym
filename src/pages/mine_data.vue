<template>
    <v-page title="我的资料">
      <div class="content">
        <van-cell title="我的注册资料" @click='openPage("perfect_data")'  is-link />
        <van-cell title="我的收货地址"  @click='openPage("address_list")' is-link />
      </div>
    </v-page>
</template>

<script>
  export default {
    name: 'mine_data',
    data () {
      return {
        
        datas: {},
        username:this.$getStorage('nickname'),
        userimg:this.$getStorage('headerimg')
      }
    },
    methods: {
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      }
    }
  }
</script>

<style scoped>
  .content {
    height     : 100%;
    background : #f7f7f7;
    padding-top: 10px;
    box-sizing: border-box;
  }
</style>
