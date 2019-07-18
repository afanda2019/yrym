<template>
  <v-page :title="title">
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
  </v-page>
</template>

<script>
  export default {
  name: 'classes_list',
  components: {
    
  },
  data () {
    return {
      list:[],
      page:1,
      loading: false,
      finished: false,
      model:this.$route.query.type_id,
      title:'课程列表'
      
    }
  },
  mounted(){
    if(this.$route.query.type_id==3){
        this.title = '商品列表'
    }
    this.model=this.$route.query.type_id
  },
  methods:{
    openPage(str,id){
      this.$router.push({name:str,query: {type_id: id}});
    },
    shoplist(){
       const params = {
        'token':this.$getStorage('token'),
        'model':this.model,
        'type_id':this.$route.query.type||'',
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
    }
  }
}
</script>

<style scoped>
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
