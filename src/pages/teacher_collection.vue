<template>
    <v-page title="收藏讲师">
      <div class="teacher-list">
        <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad">
          <div class="teacher-item" v-for='(item,index) in list' :key="index">
            <div class="teacher-avatar">
              <img :src="item.info.pic_url" class="avatar" alt="">
            </div>
            <div class="teacher-info">
              <div class="teacher-name">
                <span>{{item.info.name}}</span>

                <van-icon name="star" class="star-icon"  @click='delcollection(item.info.id)' />
              </div>
              <div class="teacher-desc" v-html='item.info.description' ></div>
            </div>
          </div>
        </van-list>
      </div>
    </v-page>
</template>

<script>
  export default {
    name: 'teacher_collection',
    data () {
        return {
          list:[],
          page:1,
          loading: false,
          finished: false,
        }
      },
    methods:{
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
      shoplist(){
        const params = {
          'token':this.$getStorage('token'),
          'page':this.page,
          'pagesize':10,
          'group_flag':'teacher'
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
  .star-icon{
   position: relative;
    top : 3px;
  }
  .teacher-name{
    display: flex;
    justify-content: space-between;
  }
  .teacher-list{

  }
  .teacher-list .teacher-item{
    display: flex;
    padding: 10px 15px;
    border-bottom: 1px solid #efefef;
  }
  .teacher-list .teacher-item .teacher-avatar{
    flex: 1 0 30%;
  }
  .teacher-list .teacher-item .teacher-avatar .avatar{
    width: 100%;
  }
  .teacher-list .teacher-item .teacher-info{
    flex: 1 0 70%;
    padding: 10px 5px 0 10px;
    box-sizing: border-box;

  }
  .teacher-list .teacher-item .teacher-info .teacher-name{
    color: #F28921;
  }
  .teacher-list .teacher-item .teacher-info .teacher-desc{
    font-size: 14px;
    color: #333;
    margin-top: 5px;

  }
</style>
