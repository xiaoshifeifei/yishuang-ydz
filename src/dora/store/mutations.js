import  * as types from './mutation-type'

const mutations = {
    [types.SET_IS_LOGIN](state,flag) {
        state.isLogin = flag
    },
    [types.SET_API_SAFETOP](state,flag) {
        state.safeTop = flag
    },
    [types.SET_API_SAFEBOT](state,flag) {
        state.safeBottom = flag
    },
    [types.SET_ROUTER](state,flag) {
        state.router = flag;
    },
    [types.PUSH_ROUTER](state,flag) {
        let routeIndex = state.router.some((item)=>{
            return flag.name == item.name;
        });
        if(!routeIndex){
            state.router.push(flag);
        }  
    },
    [types.REMOVE_ROUTER](state,flag) {
        let routeIndex = state.router.findIndex((item)=>{
            return flag == item;
        })
        state.router.slice(routeIndex,1);
    },
    [types.CLEAR_ROUTER](state) {
        state.router = [];
    },
}

export default mutations