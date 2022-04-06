import {reqGetSearchInfo} from '@/api'

//search模块小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({commit},params = {}){
        let result = await reqGetSearchInfo(params) 
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
const getters = {
    //这个state是当前仓库中的state
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}