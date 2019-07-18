<template>
    <v-page title="关于我们">
        <p class='title'>{{cont.title}}</p>
        <div id='cont' v-html='content'></div>
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
      aboutUs(){
        const params = {
        }
        this.$ajax('Content/getinfo',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.cont =res.data ;
            this.content =this.formatImg(this.cont.content);
            
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
.title{margin-bottom:0;text-align:center;color:#333;font-size:20px;font-family:'微软雅黑'}
#cont{width:90%;padding:0 5%}
</style>
