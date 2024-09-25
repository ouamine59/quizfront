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
      user: (state) => state.user,
      token: (state) => state.token,
      isLoggedIn: (state) => !!state.token, // Si le token existe, l'utilisateur est connecté
      isAdmin: (state) => state.user.role === 'admin'
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
