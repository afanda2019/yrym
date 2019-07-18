<template>
  <v-page title="完善资料">
    <div class="data-form" id="data-form">
      <van-cell-group>
        <van-field label="姓名" v-model='userInfo.cnname' required  placeholder="请输入姓名"/>
        <van-field label="地区" v-model='userInfo.address' required  placeholder="请输入您的地址"/>
        <van-field label="手机号" type="tel" v-model='userInfo.mobile' required  placeholder="请输入您的手机号"/>
        <van-field label="身份证" v-model='userInfo.idcard'  placeholder="请输入您的身份证号"/>
      </van-cell-group>
      <van-button size="large" @click='tijiao_info'>确定</van-button>

    </div>
    <van-popup v-model="showmask" class='mask' :close-on-click-overlay='false'>
    <p>温馨提示</p>
    <p style='border-bottom:1px solid #fff;line-height:60px'>绑定成功</p>
    <p @click='cfim'>确定</p>
    </van-popup>
  </v-page>
</template>

<script>
  export default {
    name: 'perfect_data',
    data () {
      return {
        userInfo:{
          cnname:'',
          address:'',
          mobile:'',
          idcard:''
        },
        showmask:false
      }
    },
    mounted(){
        this.chaxun_info();
    },
    methods:{
      chaxun_info(){
        const params = {
          'token':this.$getStorage('token'),
        }
        this.$ajax('member/getinfo',params).then((res) => {
          this.$toast.clear()
          console.log(JSON.stringify(res))
          if (res.errno == 1000) {
            if(res.data){
              this.userInfo.cnname = res.data.nickname;
              this.userInfo.address = res.data.address;
              this.userInfo.mobile = res.data.mobile;
              this.userInfo.idcard = res.data.idcard;
            }
            
          }
        }, (err) => {
          console.log(err)
        })
      },
      tijiao_info(){
        if(this.userInfo.cnname==''){
          this.$toast('输入您的姓名');
          return
        }
        if(this.userInfo.address==''){
          this.$toast('输入您的地址');
          return
        }
        if(this.userInfo.mobile==''){
          this.$toast('输入您的手机号');
          return
        }
        const params = {
          'token':this.$getStorage('token'),
          'cnname':this.userInfo.cnname,
          'address':this.userInfo.address,
          'mobile':this.userInfo.mobile,
          'idcard':this.userInfo.idcard,
        }
        this.$ajax('member/setUser',params).then((res) => {
          this.$toast.clear()
          console.log(JSON.stringify(res))
          if (res.errno == 1000) {
            this.$setStorage('is_perfect', 1);
            this.showmask = true;
            // 
          }
        }, (err) => {
          console.log(err)
        })
      },
      cfim(){
        this.showmask = false;
        this.$router.go(-1);
      }
    },
    
 
  }
</script>

<style scoped>
  .data-form{
    margin-top: 30px;

  }
  .mask{border-radius:8px;width:80%;margin:0 auto;}
  .mask p{margin:0 auto;line-height:40px;border-bottom:1px solid #f1f1f1;text-align:center}
  #data-form >>> .van-button--large{
    width: 90%;
    margin-left: 5%;
    border-radius: 5px;
    color: #fff;
    background: #0E4548;
    margin-top: 100px;
  }
</style>
