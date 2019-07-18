<template>
  <v-page title="详情">
    <div class="content">
      <div id="list" >
        <p v-html='content'></p>
      </div>
    </div>
  </v-page>
</template>

<script>
  export default {
    name: 'qualification_certificate',
    data () {
      return {
        cont:[],
        content:''
      }
    },
    mounted(){
      this.shoplist();
      settimeout(function(){
        document.getElementsByTagName("img").style.width='100%';

      },300)
    },
    methods:{
      openPage(str,id){
        this.$router.push({name:str,query: {type_id: id}});
      },
      shoplist(){
        const params = {
          'token':this.$getStorage('token'),
          'id':this.$route.query.type_id,
        }
        this.$ajax('content/getinfo',params).then((res) => {
          console.log(res)
          if (res.errno == 1000) {
              this.cont = res.data;
              this.content = this.formatImg(this.cont.content)
              
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
  .content{padding:5%;width:90%}
</style>
