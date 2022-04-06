import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'

//home模块小仓库
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    },
}
const actions = {
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            //把第16个后的数据删除,三级联动只能展示16个
            result.data.splice(16)
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}) {
        //mock模拟向服务器拿数据
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },
    async getFloorList({commit}) {
        //mock模拟向服务器拿数据
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    },
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}