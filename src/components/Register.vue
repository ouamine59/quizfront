<template>
    <div class="user-form">
      <h2>Inscription</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="name">Prenom</label>
          <input
            type="text"
            id="prenom"
            v-model="name"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="lastname">Nom</label>
          <input
            type="text"
            id="lastname"
            v-model="lastname"
            required
          />
        </div>
  
        <button type="submit" >S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script setup >
    import { ref } from 'vue';
    const username = ref('')
    const password  = ref('')
    const name = ref('')
    const lastname = ref('')
 
    
      const handleSubmit = () => {
        fetch('http://localhost:8889/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: username.value,
    password: password.value,
    name:name.value ,
    lastname : lastname.value}),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
 
    

  </script>
  
  <style scoped>
  .user-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #38a773;
  }
  </style>
