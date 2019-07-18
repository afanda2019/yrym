<template>
  <div class="hello">
      <div class="header">
        <div class="header_left"><img src="@/assets/sy_01.jpg"></div>
          <div class="header_right" @click='openPage("products_category")'><img src="@/assets/sy_02.jpg"></div>
      </div>
      <div style='height:2.9rem'></div>
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white" >
          <van-swipe-item v-for='(imgurl,index) in banner_list' :key="index"><img :src="imgurl.pic_url"></van-swipe-item>
        </van-swipe>
        <div class="sy_ss" @click='openPage("search",1)'>
          <div class='search'>
            <img src="@/assets/ss.png">
            <input type='text' placeholder='请输入搜索内容' readonly>
          </div>
        </div>
      </div>
    <div class='navcont'>
      <div class='nav nav1'>
        <div  @click='openPage("products_category",2,"","课程列表")'>
          <img src='@/assets/nav6.png'>
          <p>全部课程</p>
        </div>
        <div @click='openPage("course_list",1,"","课程列表")'>
          <img src='@/assets/nav0.png'>
          <p>在线课程</p>
        </div>
        <div  @click='openPage("course_list",2,"","课程列表")'>
          <img src='@/assets/nav1.png'>
          <p>线下课程</p>
        </div>
        <div  @click='openPage("famous_teacher")'>
          <img src='@/assets/nav2.png'>
          <p>名师风采</p>
        </div>
      </div>
      <div class='nav nav1'>
        <div @click='openPage("about_us")'>
          <img src='@/assets/nav4.png'>
          <p>关于我们</p>
        </div>
        <div @click='openPage("qualification_certificate",12)'>
          <img src='@/assets/nav5.png'>
          <p>资质证书</p>
        </div>
        <div>
          <img @click='openPage("news_center")' src='@/assets/nav3.png'>
          <p>新闻动态</p>
        </div>
        <div  @click='call'>
          <img src='@/assets/nav7.png'>
          <p>联系我们</p>
        </div>
      </div>
    </div>
    <div style='height:8px;background:#ebf8f5'></div>      
    <div class='notice'  @click='openPage("gonggaolist")' style='position:relative' >
    <div style='position:absolute;left:0;top:0;width:100%;height:2.9rem;z-index:9999;'></div>
      <div class='left'>
        <img src="@/assets/sy_12.jpg">
      </div>
      <van-swipe :autoplay="3000" indicator-color="rgba(0,0,0,0)" vertical id='swipeVan'>
          <van-swipe-item v-for='(item,index) in latest_list' :key="index"class='swipeVanItem'>{{item.title}}</van-swipe-item>
      </van-swipe>
    </div>
    <div style='height:8px;background:#ebf8f5'></div>
    <div class='nav' style='padding:20px 10px'>
      <div v-for='(category,index) in ptype_list' :key="index" @click='openPage("course_list",1,category.id)'>
        <img :src='category.logo'>
        <p>{{category.title}}</p>
      </div>
      <div @click='openPage("products_category",1,"课程列表")'>
        <img src='@/assets/sy_18.png'>
        <p>商品</p>
      </div>
    </div>
    <div style='height:8px;background:#ebf8f5'></div>
    <div class='zxkc'>
      <img class='title' src='@/assets/sy_19.jpg'>
      <div v-for='(item,index) in latestcourse_list' :key="index" >
        <div class='congt1' @click='openPage("course_detail",item.id)' v-if='index==0'>
            <div class='congt1img'>
              <img class='congt1imgs' :src='item.cover_pic_url'>
              <p><img src='@/assets/yp.png'>{{item.title}}</p>
            </div>
            <p class='price'>
              <span class='price1'>￥<span style='font-size:20px'>{{item.directbuy_price}}</span></span>
              <span class='num'><span style='color:#f58612'>{{item.totalsalenum}}</span>人学习</span>
            </p>
        </div>
      </div>
      <div class='cont'>
        <div class='contlist' v-for='(item,index) in latestcourse_list' :key="index" v-if='index!=0'   @click='openPage("course_detail",item.id)'>
          <div class='congt1img'>
            <img class='congt1imgs' :src='item.cover_pic_url' v-auto-height>
            <p><img src='@/assets/yp.png'>{{item.title}}</p>
          </div>
          <p class='price'>
            <span class='price1'>￥<span style='font-size:20px'>{{item.directbuy_price}}</span></span>
            <span class='num'><span style='color:#f58612'>{{item.totalsalenum}}</span>人学习</span>
          </p>
        </div>
      </div>
      <img  @click='openPage("course_list",0)' class='viewmore' src='@/assets/viewmore.png'>
    </div>
    <div class='rdtj'>
      <img class='title' src='@/assets/sy_22.jpg'>
      <div>
        <div class='rdtjfirst'  v-for='(item,index) in hotsopt_list' :key="index" v-if='index==0' @click='openPage("course_detail",item.id)'>
          <img :src='item.cover_pic_url'>
          <p>{{item.title}}</p>
        </div>
        <div class='rdtjlist' >
          <div class='rdtjitem'  v-for='(item,index) in hotsopt_list' :key="index" v-if='index>0' @click='openPage("course_detail",item.id)'>
            <img :src='item.cover_pic_url' v-auto-height>
            <p class='rdtjitime'>{{item.create_time}}</p>
            <p class='rdtjitest' >{{item.title}}</p>
          </div>
        </div>
      </div>
      <img @click='openPage("course_list",0)' class='viewmore' src='@/assets/viewmore.png'>
    </div>
    <div class="sy_06" v-if='teacher_list.length>0'>
      <img class='title' src="@/assets/sy_25.jpg">
      <div class='sy_06cont'>
        <div class="sy_06_ls_01" style='width:50%'  @click='openPage("teacher_detail",teacher_list[0].id)'>
          <img :src="teacher_list[0].list_img_url">
          <div class="sy_06_ls_fd">{{teacher_list[0].name}}</div>
        </div>
        <div class="sy_06_ls_01 sy_06_ls_01s"  style='width:50%' v-if='teacher_list.length>1'  @click='openPage("teacher_detail",teacher_list[1].id)'>
            <img src="@/assets/bj_ls_01.png">
            <img class='imgbg'  :src="teacher_list[1].list_img_url">
            <div class="sy_06_ls_fd1">{{teacher_list[1].name}}</div>
        </div>
      </div>
      <div style='height:0.5rem'></div>
      <div class='sy_06cont' v-if='teacher_list.length>2'>
        <div class="sy_06_ls_01 sy_06_ls_01s"  style='width:50%' v-if='teacher_list.length>1'  @click='openPage("teacher_detail",teacher_list[2].id)'>
            <img src="@/assets/bj_ls_01.png">
            <img class='imgbg'  :src="teacher_list[2].list_img_url">
            <div class="sy_06_ls_fd1">{{teacher_list[2].name}}</div>
        </div>
        <div class="sy_06_ls_01" style='width:50%' @click='openPage("teacher_detail",teacher_list[3].id)'>
          <img :src="teacher_list[3].list_img_url">
          <div class="sy_06_ls_fd">{{teacher_list[3].name}}</div>
        </div>
      </div>
      <div style='height:3rem'></div>
      <img @click='openPage("famous_teacher")' class='viewmore' src='@/assets/viewmore.png'>
    </div>
  <div class="sy_07">
      <div style='width:100%;padding:30px 15% 10px'><img class="title" src="@/assets/sy-xwzx.png"></div>
        <div class="sy_07_xw"   v-for='(item,index) in journalismlist' :key="index" @click='openPage("info_us",item.id)'>
          <div class='clearfix'>
              <div class="sy_07_left">
                <span>{{item.publish_time_txt.substr(0,4)}}</span>
                  {{item.publish_time_txt.substr(5,2)}}-{{item.publish_time_txt.substr(8,2)}}
              </div>
              <div class="sy_07_right">
                <p>{{item.title}}</p>
              </div>
            </div>
            <div style='height:10px'></div>
        </div>
    </div>
    <div style='height:50px'></div>
  </div>
</template>
<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      scrollY: 0,
      swipeHei: document.body.offsetWidth + 25,
      banner_list:[],
      latest_list:[],
      latestcourse_list:[],
      hotsopt_list:[],
      teacher_list:[],
      ptype_list:[],
      datas: {},
      journalismlist:[],//新闻
      kefu:''
    }
  },
  mounted(){
      this.index_info();
      this.journalism();
      this.getconfig()
  },

  methods:{
    openPage(str,id,type,title){
      this.$router.push({name:str,query: {type_id: id,type:type,title:title}});
    },
    call() { //拨打电话
      window.location.href = 'tel:' + this.kefu;
    },
    index_info(){
       const params = {
        'token':this.$getStorage('token')
      }
      this.$ajax('product/index',params).then((res) => {
        this.$toast.clear()
        if (res.errno == 1000) {
          this.banner_list = res.data.banner_list;//广告图
          this.latestcourse_list = res.data.latestcourse_list;// 最新的model = 0 商品 ； 1 线上 2 线下
          this.hotsopt_list = res.data.hotsopt_list;
          this.teacher_list = res.data.teacher_list;
          this.latest_list = res.data.latest_list;
          this.ptype_list = res.data.ptype_list;
          console.log(res.data)
        }
      }, (err) => {
        console.log(err)
      })
    },
    getconfig(){
       const params = {
        'field':'kefu_mobile'
      }
      this.$ajax('Config/getConfig',params).then((res) => {
        if (res.errno == 1000) {
          this.kefu = res.data
        }
      }, (err) => {
        console.log(err)
      })
    },
    journalism(){
       const params = {
        'token':this.$getStorage('token'),
        'istop':1,
        'type_id':3
      }
      this.$ajax('content/getlist',params).then((res) => {
        this.$toast.clear()
        if (res.errno == 1000) {
          console.log(res.data.list)
          this.journalismlist = res.data.list
          console.log(res.data)
        }
      }, (err) => {
        console.log(err)
      })
    },
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clearfix:after { content: " "; display:block; clear:both; height:0; overflow:hidden; visibility:hidden;}
.sy_06cont{
  display: flex;
  padding:10px
}
.sy_06_ls_01{padding:10px}
.sy_06_ls_01 img{
  width:100%
}
.sy_06_ls_fd{line:25px;text-align:center;font-size:14px}
.sy_06_ls_fd1{line:25px;text-align:center;background:rgba(60,112,106,0.6);color:#fff;line-height:25px;font-size:14px;width:60%;margin:0 20%;position:absolute;bottom:25px;left:0}
.sy_06_ls_01s{position:relative;padding-right:0}
.sy_06_ls_01s .imgbg{
  position:absolute;
  top:20%;right:12px;
  width:90%
}
html,body{
  background:#f7f7f7
}
*{
  box-sizing:border-box;
}
.header{display: flex;position:fixed;top:0;left:0;z-index:9999;width:100%;}
.header_left{width:80%;}
.header img{width:100%;height:100%;display:block}
.header_right{width:20%;}
.banner{width:100%;position: relative;overflow: hidden;}
.banner img{width:100%;display: block;height:15rem}
.sy_ss{width: 100%; overflow: hidden; position:absolute; z-index:99; top:7%; left:0;}
.search{
  width:94%; margin:3% auto;
   padding:10px 3% 10px 3%;
  background:rgba(255,255,255,0.7); outline:none; border-radius:18px;
  display: flex;
  
}
.search input{
  background:none;
  border:none;
  width:calc(100% - 20px);
  height:20px;
  line-height:20px;
  font-size:0.6rem;
  padding-left:10px
  
}
.sy_06_ls_01 img{height:16.5rem}
.search img{width:20px;height:20px;}
.navcont{
  padding:20px 10px 10px;
}
.nav{display: flex;justify-content:space-around;padding:5px 0}
.nav img{width:76%;margin:0 12%;}
.nav1 img{width:60%;margin:0 20%;}
.nav p{
  margin:0;
  font-size:14px;
  text-align:center;
  color:#494949
}
.van-notice-bar{
      background-color: #fff;
      color:#6f6f6f
}

.notice{
  display: flex;
}
.notice .left{width:80px}
.notice img{width:100%}
.van-notice-bar[data-v-56b687e3]{
  width:calc(100% - 80px)
}
.title{
  width:100%;
  display:block;
}
.congt1{padding:10px;background:#fff}
.congt1img{position:relative;overflow:hidden}
.congt1imgs{width:100%;display:block;}
.congt1img p{
  position:absolute;
  bottom:0;
  left:0;
  background:rgba(0,0,0,0.4);
  color:#fff;
  width:100%;
  margin:0;
  line-height:35px;
  font-size:14px;
  padding-left:10px;
  overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.congt1img p img{
  height:15px;
  margin:2px 10px 0 0 
}
.price{
   display: flex;
   justify-content:space-between;
   margin:5px 0;
   line-height:30px
}
.price1{
  color:#df1614;
  font-size:14px
}
.num{
  color:#7d7c83;
  font-size:14px
}
.zxkc{background:#f7f7f7}
.cont {
  display: flex;
  flex-wrap: wrap ;
  padding:10px 1%
}
.contlist{width:48%;background:#fff;padding:10px;margin:6px 1%}
.viewmore{width:40%;height:1.8rem;margin:10px 30%;}

.rdtj{
  background:#7fd3bf;
}
.rdtjfirst{
  background:#0f4549;
  padding:12px;
  position:relative;
}
.rdtjfirst img{width:100%}
.rdtjfirst p{position:absolute;right:7px;bottom:40px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;width:50%;background:#fdb161;padding:5px;font-size:12px;color:#fff}
.rdtjlist{
  display: flex;
  flex-wrap: wrap ;
  padding:10px 1%
}
.rdtjitem{width:50%;padding:10px}
.rdtjitem img{width:100%}
.rdtjitime{margin:0 15%;font-size:14px;color:#fff;width:70%;text-align:center;border-bottom:1px solid #fff;line-height:25px;}
.rdtjitest{
  text-align:center;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
margin:5px 0;
font-size:16px;
color:#fff
}
.sy_07{ background:#f1f1f1}
.sy_07_bt{ width:76%; margin:0 auto; padding:30px 0 20px 0;}
.sy_07_xw{ padding:0 3%; overflow:hidden;width:100%}
.sy_07_xw a{ padding-bottom:10px; overflow:hidden;}
.sy_07_left{ float:left; width:24%; border:1px #f58612 solid; background:#f7f7f7; text-align:center; padding:10px 0; color:#f58612; line-height:24px;}
.sy_07_left span{ display:block; font-size:1.6rem; padding-top:5px;}
.sy_07_right{ float:right; width:73%; background:#FFF; padding:12px 3%; line-height:24px; color:#000;    min-height: 74px; }
.sy_07_right p{
  margin:0;
  height: 50px;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp:2;
}
.sy_07_right span{display:block; color:#626262; height:26px; overflow:hidden;}
#swipeVan{height:40px;width:calc(100% - 80px);line-height:43px}
.swipeVanItem{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  padding-left:15px;
  font-size:14px;
  color :#191919
}
</style>
