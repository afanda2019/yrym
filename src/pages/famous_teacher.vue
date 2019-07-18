<template>
  <v-page title="名师风采">
    <div class="content">
      <div class="page-title">
        <img class="title" src="@/assets/sy_25.jpg" alt="">
      </div>
      <div class="teacher-list">
      <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad">
        <div class="teacher-item"  v-for='(item,index) in list' :key="index" @click='openPage("teacher_detail",item.id)'>

          <div class="teacher-avatar">
            <img :src="item.list_img_url" class="avatar" alt="">
          </div>
          <div class="teacher-info">
            <div class="teacher-name">
              <span>{{item.name}}</span>
              <van-icon v-if='item.is_history==0' name="star" class="star-icon del" @click.stop='collection(item.id,index)' />
              <van-icon v-else name="star" class="star-icon"  @click.stop='delcollection(item.id,index)'  />
            </div>
            <div class="teacher-desc">{{item.introduce}}</div>
          </div>
        </div>
      </van-list>
      </div>
    </div>
  </v-page>
</template>

<script>
  export default {
    name: 'famous_teacher',
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
          'pagesize':10
        }
        this.$ajax('teacher/getlist',params).then((res) => {
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
      collection(id,index){
        const params = {
          'token':this.$getStorage('token'),
          'data_id':id,
          'group_flag':'teacher'
        }
        this.$ajax('member/addHistory',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
           this.list[index].is_history=1
            // this.list = [];
            // this.page = 1;
            // this.loading=false;
            // this.finished= false;
            // this.onLoad()
          }
          
        }, (err) => {
          console.log(err)
        })
      },
      formatImg:function(html){
                var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
            var match = match.replace(/<img/gi,'<img/style="display:none"');
            return match;
        });
        return newContent;
      },
      delcollection(id,index){
        const params = {
          'token':this.$getStorage('token'),
          
         
          'data_id':id,
          'group_flag':'teacher'
        }
        this.$ajax('member/delHistory',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            this.list[index].is_history=0
            // this.onLoad()
            
          }
          
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
p{margin:0;padding:0}
  .content .page-title {
    text-align    : center;
    margin-bottom : 10px;
  }

  .content .page-title .title {
    width : 100%;
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
    display: flex;
    justify-content:space-between;
    color: #F28921;
  }
  .teacher-list .teacher-item .teacher-info .teacher-name .del{
    color: #ddd;
  }
  .teacher-list .teacher-item .teacher-info .teacher-desc{
    font-size: 14px;
    color: #333;
    margin-top: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
