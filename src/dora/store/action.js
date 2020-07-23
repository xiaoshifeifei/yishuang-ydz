import * as types from './mutation-type'

const setIsLogin = function ({commit},flag){
    commit (types.SET_IS_LOGIN, flag)
}

const setSafeTop = function ({commit},flag){
    commit (types.SET_API_SAFETOP,flag)
}
const setSafeBottom = function ({commit},flag){
    commit (types.SET_API_SAFEBOT,flag)
}
const pushRouter = function ({commit},flag){
    commit (types.PUSH_ROUTER, flag)
}
const setRouter = function ({commit},flag){
    commit (types.SET_ROUTER, flag)
}
const removeRouter = function ({commit},flag){
    commit (types.REMOVE_ROUTER, flag)
}
const clearRouter = function ({commit}){
    commit (types.CLEAR_ROUTER)
}
export {
    setIsLogin,
    setSafeTop, 
    setSafeBottom,
    setRouter,
    pushRouter,
    removeRouter,
    clearRouter
}