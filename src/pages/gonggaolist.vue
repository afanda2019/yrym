<template>
    <v-page title="公告">
        <van-cell-group>
          <van-cell v-for='(item,index) in cont' :key="index"  :title="item.title" :value="item.publish_time_txt" :label="item.short_description" @click='openPage("info_us",item.id)'/>
        </van-cell-group>
    </v-page>
</template>

<script>
  export default {
    name: 'about_us',
    data () {
      return {
        cont:'',
        content:''
      }
    },
    mounted(){
        
        this.aboutUs();
    },
    methods: {
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      aboutUs(){
        const params = {
        'token':this.$getStorage('token'),
        'istop':'',
        'type_id':5
        }
        this.$ajax('content/getlist',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.cont =res.data.list ;
            
          }
        }, (err) => {
          console.log(err)
        })
      },
      formatImg:function(html){
                var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
            var match = match.replace(/<img/gi,'<img/style="width:100%"');
            return match;
        });
        return newContent;
      }
    }
  }
</script>
<style scoped>
.title{margin-bottom:0;text-align:center;color:#333;font-size:20px;font-family:'微软雅黑';overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
#cont{width:90%;padding:0 5%}
.swipeVanItem{
  
}
</style>
