<template>
  <v-page :title="title">
    <div class="page-warp">
      <div class="badge-wrap">
        <div class="badge-left">
          <van-badge-group :active-key="activeKey" @change="onChange">
            <van-badge v-for='(categoryitem,index) in category'  :key="index" :title="categoryitem.title" />
          </van-badge-group>
        </div>
        <div class="badge-content">
          <div class="classes-list">
            <div class="classes-list-item" v-for='(item,index) in list'  @click='openPage("course_detail",item.id,"商品详情")'  :key="index">
              <van-row>
                <van-col span="8">
                  <div class="classes-preview">
                    <img class="preview" :src="item.cover_pic_url" alt="">

                  </div>
                </van-col>
                <van-col span="16">
                  <div class="classes-info">
                    <h3 class="classes-title van-ellipsis">{{item.title}}</h3>
                    <p class="classes-desc van-ellipsis">
                      已经有{{item.totalsalenum}}人购买

                      <van-icon name="arrow" size="14px" class="arrow-icon"/>
                    </p>
                    <div class="classes-price">
                      <small>￥</small>
                      <b>{{item.directbuy_price}}</b>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class='showmore' v-if='showmore'>
            暂无数据
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-page>
</template>

<script>
  export default {
    name: 'products_category',
     data () {
      return {
        type_id:'',
        category:[],
        activeKey: 0,
        list:[],
        showmore:false,
        title:this.$route.query.title
      }
    },
    mounted(){
      this.index_info();
    },
    methods:{
    
      openPage(str,id,title){
        this.$router.push({name:str,query: {type_id: id,title:title}});
      },
      onChange(key) {
        this.activeKey = key;
        this.index_list(this.category[this.activeKey].id)
      },
      index_info(){
        const params = {
          'token':this.$getStorage('token'),
          'type_id':this.$route.query.type_id||1
        }
        this.$ajax('product/gettypetree',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {

            this.category = res.data;
            this.index_list(this.category[0].id)
            console.log(res.data)
          }
        }, (err) => {
          console.log(err)
        })
      },
      index_list(typeid){
        const params = {
          'token':this.$getStorage('token'),
          'type_id':this.$route.query.type_id||2,
          'model':0,
          'type_id':typeid
        }
        this.$ajax('product/getList',params).then((res) => {
          console.log(JSON.stringify(res))
          this.$toast.clear()
          if (res.errno == 1000) {

            if(res.data.list.length==0){
              this.showmore = true;
              this.list=res.data.list
              return;
            }else{
              this.list = res.data.list;
              this.showmore = false;
              
            }
            
            
          }
        }, (err) => {
          console.log(err)
        })
      },
    },

  }
</script>

<style scoped>
.page-warp{
  height: 100%;

}
  .badge-wrap {
    display : flex;
  }

  .badge-wrap .badge-left {
    flex : 1 0 25%;
    height: calc(100vh - 50px);
    background: #fff;
  }

  .badge-wrap .badge-content {
    flex       : 1 0 75%;
    height: calc(100vh - 50px);
    overflow-y: scroll;
  }

  .badge-wrap .badge-left .van-badge {
    color      : #333;
    text-align : center;
  }

  .badge-wrap .badge-left .van-badge--select {
    border-color : #F59C3F;
  }

  .badge-wrap .badge-content .classes-list-item {
    background : #fff;
    margin     : 10px;
    padding    : 10px;
  }

  .badge-wrap .badge-content .classes-list-item .classes-preview .preview {
    width         : 80px;
    height        : 80px;
    border-radius : 5px;
  }

  .badge-wrap .badge-content .classes-list-item .classes-title {
    padding   : 0;
    margin    : 0;
    font-size : 15px;
    width     : 95%;
  }

  .badge-wrap .badge-content .classes-list-item .classes-info {
    
    padding-left : 5px;
    
  }

  .badge-wrap .badge-content .classes-list-item .classes-desc {
    font-size     : 13px;
    color         : #666;
    background    : #F5F5F5;
    border-radius : 3px;
    padding       : 4px;
    line-height   : 20px;
    margin        : 5px 0;
    width         : 98%;
  }

  .badge-wrap .badge-content .classes-list-item .classes-desc .arrow-icon {
    position : relative;
    top      : 2px;
  }

  .badge-wrap .badge-content .classes-list-item .classes-info .classes-price {
    color : red;
  }

  .badge-wrap .badge-content .classes-list-item .classes-info .icon-cart {
    float : right;
    color : #F59C3F;
  }

  .badge-wrap .badge-content .classes-list-item .classes-preview {
    position : relative;
     width         : 80px;
  }

  .badge-wrap .badge-content .classes-list-item .classes-preview .hot {
    position : absolute;
    left     : 0;
    width    : 60%;
    top      : 0;
  }
  .showmore{
    line-height:50px;
    text-align:center;
    color:#7d7d7d
  }
</style>
