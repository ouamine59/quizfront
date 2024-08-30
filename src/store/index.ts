import { createStore } from 'vuex'

export default createStore({
  state: {
    token : 1,
    user:{
      id:0,
      username:"",
      role: 'user',
      connected: false
    },
  },
  getters: {
    // getToken(state){
    //   return state.token  ;
    // },
    // getUser(state){
    //   return state.user
    // }
  },
  mutations: {
    setToken(state, token){
      state.token= token ;
    },
    setUser(state, user ){
      state.user = user
    }
  },
  actions: {
    createToken(state, token){
      localStorage.setItem('token', token)
    },
    readToken(state, nodeToken){
      const local = localStorage.getItem('token')
      if( local == nodeToken){
          return true ;
      }
      return false ;
    },
    logout(){
        localStorage.removeItem('token');
        this.state.user ={
          id:0,
          username:"",
          role: 'user',
          connected: false
        } ;
        this.state.token = 1;
    }
  },
  modules: {
  }
})
