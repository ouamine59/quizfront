 <template>
  <nav >
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div v-if="store.state.user.role=='user'" id="menuuser">
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/s-enregistrer">creer compte</router-link>
    </div>
    
    
    <div v-if="store.state.user.role=='admin'" id="menuadmin">
      
      <router-link to="/liste-quiz">liste quiz</router-link>

      <router-link to="/creer-quiz">Creer QUIZ</router-link>
      <div @click="logout" id="logout">X</div>
    </div>
  </nav>
  <router-view/>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';


const store = useStore();
const local = localStorage.getItem('token')
const router = useRouter();
const logout = ()=>{
  store.dispatch('logout')
  
  router.push({name:'login'})
}
const isConnected = async( )=>{
  try {
    const response =await  fetch('http://localhost:8889/api/users/token', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization' :"Barear "+ local
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
   const res = result;
   return res ;
  } catch (err) {
    console.error('Error during login:', err);
    return false ;
  }
}
isConnected().then((res) => {
  if (res) {
    const tok = JSON.parse(atob(local.split('.')[1]))
    store.commit('setUser', tok)
    console.log(store.state.user)
  } 
}).catch((err) => {
  console.error('Error occurred:', err);
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
nav, #menuadmin, #menuuser{
  display:flex;
  justify-content: space-around;
}
#logout{
  background-color: red;
  color:white;
  width:20px;
  height:
  20px;
  display:flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
#logout:hover{
  cursor:pointer;
}
</style>
<!--<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div v-if="store.state.user.role === 'user'">
      <router-link to="/login">Se connecter</router-link>
      <router-link to="/s-enregistrer">Créer Compte</router-link>
    </div>
    
    <div v-if="store.state.user.role === 'admin'">
      <router-link to="/admin">ADMIN</router-link>
      <a href="#" @click.prevent="logout">Logout</a>
    </div>
  </nav>
  <router-view/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const localToken = localStorage.getItem('token');

const isConnected = async () => {
  if (!localToken) return false;

  try {
    const response = await fetch('http://localhost:8889/api/users/token', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localToken
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.isValid; // Assuming the API returns { isValid: true/false }
  } catch (err) {
    console.error('Error during token validation:', err);
    return false;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  store.commit('setUser', { role: '' }); // Reset the user state
  // Optionally, redirect to login page or home
};

onMounted(async () => {
  const connected = await isConnected();
  if (connected) {
    const decodedToken = JSON.parse(atob(localToken.split('.')[1]));
    store.commit('setUser', decodedToken);
  } else {
    store.commit('setUser', { role: '' }); // Reset the user state if not connected
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
-->