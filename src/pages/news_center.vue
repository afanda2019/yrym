<template>
  <v-page title="新闻中心">
    <div class="content">
      <div class="sy_07">
      <van-list v-model="loading" :finished="finished"  finished-text="没有更多了" @load="onLoad">
        <div class="sy_07_xw"  v-for='(item,index) in list' :key="index" @click='openPage("info_us",item.id)'>
          
            <div class='clearfix' >
                <div class="sy_07_left">
                  <span>{{item.publish_time_txt.substr(0,4)}}</span>
                    {{item.publish_time_txt.substr(5,2)}}-{{item.publish_time_txt.substr(8,2)}}
                </div>
                <div class="sy_07_right">
                  <p>{{item.title}}{{item.title}}</p>
                  
                </div>
              </div>
              <div style='height:10px'></div>
          
        </div>
      </van-list>
    </div>
 
        


       
      </div>
    </div>
  </v-page>
</template>

<script>
  export default {
    name: 'news_center',
    data () {
      return {
        list:[],
        page:1,
        loading: false,
        finished: false,
        model:this.$route.query.type_id
      }
    },
    methods:{
      openPage(str,id,type){
      this.$router.push({name:str,query: {type_id: id,type:type}});
    },
      //获取新闻列表
      shoplist(){
       
        const params = {
          'token':this.$getStorage('token'),
          'page':this.page,
          'pagesize':10,
          'istop':'',
          'type_id':3
        }
        this.$ajax('content/getlist',params).then((res) => {
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
          this.loading = false;
        }, 500);
      }
    }
  }
</script>

<style scoped>
*{
  box-sizing:border-box;
}
.page-wrap{
background:#f1f1f1!important
}
.news-banner img{width:100%}
 .sy_07{ margin-top:20px}
.sy_07_bt{ width:76%; margin:0 auto; padding:30px 0 20px 0;}
.sy_07_xw{ padding:0 3%; overflow:hidden;width:100%}
.sy_07_xw a{ padding-bottom:10px; overflow:hidden;}
.sy_07_left{ float:left; width:24%; border:1px #f58612 solid; background:#f7f7f7; text-align:center; padding:10px 0; color:#f58612; line-height:24px;}
.sy_07_left span{ display:block; font-size:1.6rem; padding-top:5px;}
.sy_07_right{ float:right; width:73%; background:#FFF; padding:12px 3%; line-height:24px; color:#000;  min-height: 74px; }
.sy_07_right p{margin:0;overflow:hidden; 

text-overflow:ellipsis;

display:-webkit-box; 

-webkit-box-orient:vertical;

-webkit-line-clamp:2;}
.sy_07_right span{ display:block; color:#626262; height:26px; overflow:hidden;}
.clearfix:after { content: " "; display:block; clear:both; height:0; overflow:hidden; visibility:hidden;}

</style>
