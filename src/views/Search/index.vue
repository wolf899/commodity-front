<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyWord">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(":")[1]}}
              <i @click="removeTradeMark">x</i>
            </li>
            <!-- 商品属性的面包屑-->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">
              {{attrValue.split(":")[1]}}
              <i @click="removeAttrValue(index)">x</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder(1)">
                  <a href="#">
                    综合
                    <i v-show="isOne">
                      <img v-if="isDesc" src="./SearchSelector/images/down.png" class="sortImg">
                      <img v-if="isAsc" src="./SearchSelector/images/up.png" class="sortImg" >
                      <!-- <img :src="{'./SearchSelector/images/down.png':isDesc,'./SearchSelector/images/up.png':isAsc}" class="sortImg"> -->
                    </i>
                  </a>
                </li>
                <li :class="{active: isTwo}" @click="changeOrder(2)">
                  <a href="#">
                    价格
                    <i v-show="isTwo">
                      <img v-if="isDesc" src="./SearchSelector/images/down.png" class="sortImg">
                      <img v-if="isAsc" src="./SearchSelector/images/up.png" class="sortImg" >
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import { mapGetters,mapState } from 'vuex'
  export default {
    name: 'Search',
    data(){
      return{
        //发给服务器的参数
        searchParams:{
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          "categoryName": "",
          //搜索关键字
          "keyword": "",
          //排序
          "order": "1:desc",
          "pageNo": 1,
          "pageSize": 10,
          //筛选条件
          "props": [],
          //品牌
          "trademark": ""
        }
      }
    },
    components: {
    SearchSelector
},
    beforeMount(){
      //将这些参数整理成一个对象
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted(){
      //获取搜索数据
      this.getSearchData()
    },
    computed:{
      ...mapGetters(['goodsList']),
      isOne(){
        return this.searchParams.order.indexOf('1') != -1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2') != -1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') != -1
      },
      ...mapState({
        total:state => state.search.searchList.total
      })
    },
    methods:{
      //向服务器发请求获取search数据
      getSearchData(){
        this.$store.dispatch('getSearchList',this.searchParams)
      },
      //移除分类面包屑
      removeCategoryName(){
        //如果把发送给服务器的参数全部设置为空，还需要向服务器发送请求
        //如果把参数设置为undefined,则不会把当前的字段发送给服务器
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.searchParams.categoryName = undefined
        this.getSearchData()
        //地址栏也需要修改，进行路由跳转
        this.$router.push({
          name:"search",
          params:this.$route.params
        })
      },
      //移除搜索关键字面包屑
      removeKeyWord(){
        this.searchParams.keyword = undefined
        this.getSearchData()
        this.$bus.$emit("clear")
        this.$router.push({
          name:"search",
          query: this.$route.query
        })
      },
      //自定义事件回调trademark函数
      trademarkInfo(trademark){
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        this.getSearchData()
      },
      //移除品牌面包屑
      removeTradeMark(){
        this.searchParams.trademark = undefined
        this.getSearchData()
      },
      //自定义事件回调attr,attrValue函数
      attrInfo(attr,attrValue){
        //整理参数格式
        let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
        //includes方法判断是否包含,没有包含才能添加并发送ajax请求
        if(!this.searchParams.props.includes(props)){
          this.searchParams.props.push(props)
          this.getSearchData()
        }
      },
      //移除商品属性面包屑
      removeAttrValue(index){
        this.searchParams.props.splice(index,1)
        this.getSearchData()
      },
      //排序操作
      changeOrder(flag){
        //先将order属性分割开
        let orginFlag = this.searchParams.order.split(":")[0]
        let orginSort = this.searchParams.order.split(":")[1]
        //判断如果点击的是相同标签
        if(flag == orginFlag){
          //如果升序就降序，如果降序就升序
          this.searchParams.order = `${orginFlag}:${orginSort == "desc"?"asc":"desc"}`
        }else{
          //不同的标签直接默认降序
          this.searchParams.order = `${flag}:desc`
        }
        //再次发送请求
        this.getSearchData()
      },
      //自定义事件，获取当前第几页
      getPageNo(pageNo){
        this.searchParams.pageNo = pageNo
        this.getSearchData()
      }
    },
    watch:{
      //监听路由信息是否发生变化，发生变化就再次发请求给服务器
      $route(){
        //搜索时先清空id的搜索条件
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        //再整合搜索参数
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        //发送请求
        this.getSearchData()
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                  position: relative;
                }
                
                .sortImg{
                  width: 15px;
                  position: relative;
                  top: 3px;
                }
                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>