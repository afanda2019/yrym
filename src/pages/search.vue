<template>
  <div>
    <div class="sy_ss">
      <van-icon name="arrow-left"  @click='$router.back()' />
      <div class='search'>
        <img src="@/assets/ss.png">
        <input type='text' v-model='searchkey' placeholder='请输入搜索内容'>
        <span @click='seach'>搜索</span>
      </div>
    </div>

    <div class="list-wrap">
    <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad">
      <div class="list-item" v-for='(item,index) in list' :key="index" @click='openPage("course_detail",item.id)'>
        <div class="list-l">
          <img class="class-preview"  :src="item.cover_pic_url">
          <div class="people" v-if='model==0'>{{item.totalsalenum}}购买</div>
          <div class="people" v-else>{{item.totalsalenum}}人学习</div>
        </div>
        <div class="list-r">
          <div class="title">{{item.title}}</div>
          <div class="price">
            <small>￥</small>
            <b>{{item.directbuy_price}}</b></div>
        </div>
      </div>
    </van-list>
      

    </div>
  </div>
</template>

<script>
  export default {
  name: 'search',
    props: {
      title: {
        type: String,
        default: '标题'
      },
      rightIcon: {
        type: String,
        default: ''
      }
    },
  components: {
    
  },
  data () {
    return {
      list:[],
      page:1,
      loading: false,
      finished: false,
      model:'',
      searchkey:'',
      loadflg:false,
    }
  },
  mounted(){
     
  },
  methods:{
    openPage(str,id){
      this.$router.push({name:str,query:{type_id: id}});
    },
    seach(){
      if(this.searchkey==''){
        this.$toast('请输入搜索内容');
      }else{
        this.loading=false;
        this.finished= false;
        this.page = 1;
        this.loadflg = true;
        this.list = [];
      }
      

    },
    shoplist(){
       const params = {
        'token':this.$getStorage('token'),
        'title':this.searchkey,
        'model':0,
        'type_id':'',
        'page':this.page,
        'pagesize':10
      }
      this.$ajax('product/getList',params).then((res) => {
        this.$toast.clear()
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
      if(this.loadflg){
        // 异步更新数据
        setTimeout(() => {
          this.shoplist();
          
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length + 1);
          // }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      }else{
        this.finished = true;
        this.loading = false;
      }
      
    }
  }
}
</script>

<style scoped>
.van-icon{color:#fff;font-size:20px;line-height:55px;padding-left:15px}
.sy_ss{width: 100%; overflow: hidden; z-index:99;background:#0E4548;display: flex;}
.search{
  width:70%; margin:2% auto;
   padding:10px 3% 10px 3%;
  background:rgba(255,255,255,0.7); outline:none; border-radius:18px;
  display: flex;
  
}
.list-wrap{
  height:calc(100vh - 55px);
  overflow: scroll;
}
.search span{font-size:12px;line-height:20px;color:#0E4548}
.search input{
  background:none;
  border:none;
  width:calc(100% - 60px);
  height:20px;
  line-height:20px;
  font-size:0.6rem;
  padding-left:10px
  
}
.search img{width:20px;height:20px;}
.list-item{
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f5f5;
  }
  .list-l{
    flex: 1 0 35%;
    position: relative;
  }
  .list-l .class-preview{
    width: 100%;
  }
  .list-l .people{
    color: #fff;
    background: rgba(0,0,0,0.35);
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    font-size: 14px;
    padding: 0 3px;
  }
  .list-r{
    flex: 1 0 65%;
    padding-left: 15px;
  }
  .list-r .title{
    padding-top: 10px;
    margin-bottom: 10px;
    padding-right: 15px;
  }
  .list-r .price{
    color: red;
  }
</style>
