<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>TITRE</th>
                <th>MODIFIER</th>
            </tr>
        </thead>
        
    </table>
    <tbody v-for="(result, index) in results">
        <oneQuiz :id="result.id" :titre="result.titre"/> 
    </tbody>
    
  </template>
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import oneQuiz from '@/components/oneQuiz.vue'
  const results = ref({})
  const listingQuiz = async() =>{
    try {
        const response = await fetch('http://localhost:8889/api/quiz/listing', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return  await response.json();
        
    } catch (err) {
         console.error('Error during API call:', err);
    }
  }
  onMounted(()=>{
    listingQuiz().then((e)=>{
        console.log(e)
        results.value = e ;
    })
  })
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