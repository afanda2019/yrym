<template>
  <v-page title="我的收藏">
    <div class="classes-list">
      <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad">
        <div class="classes-item"  v-for='(item,index) in list' :key="index"  @click='openPage("course_detail",item.info.id)'>
          <van-card
            :price="item.info.directbuy_price"
            :title="item.info.title">
            <div slot="thumb">
              <img class="thumb-img" :src="item.info.pic_url">
            </div>
          </van-card>
        </div>
      </van-list>
    </div>
  </v-page>

</template>

<script>
  export default {
    name: 'mine_collection',
     data () {
        return {
          list:[],
          page:1,
          loading: false,
          finished: false,
        }
      },
      methods:{
        openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      shoplist(){
        const params = {
          'token':this.$getStorage('token'),
          'page':this.page,
          'pagesize':10,
          'group_flag':'product'
        }
        this.$ajax('member/getFavProduct',params).then((res) => {
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

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      delcollection(id){
        const params = {
          'token':this.$getStorage('token'),
          'data_id':id,
          'group_flag':'teacher'
        }
        this.$ajax('member/delHistory',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            this.list = [];
            this.page = 1;
            this.loading=false;
            this.finished= false;
            
          }
          
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .thumb-img {
    border-radius : 3px;
    width:90px;
    height:90px
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
</style>
