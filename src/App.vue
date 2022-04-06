<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //考虑性能，只需发送一次请求读取首页三级连表数据就行
    this.$store.dispatch("categoryList")
  }
}
</script>

<style>

</style>
