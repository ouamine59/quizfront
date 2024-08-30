
    <template>
  <div>
    <input v-model="form.username" placeholder="username" />
    <div v-if="validations.username.$error" class="error">gjgjjh
      <span v-if="!validations.username.required">Username is required.</span>
      <span v-if="!validations.username.minLength">Username must be at least 3 characters long.</span>
      <span v-if="!validations.username.regex">Username must start with at least 3 alphabetic characters.</span>
    </div>

    <input type="password" v-model="form.password" placeholder="password" />
    <span v-if="validations.password.$error"></span>

    <button @click.prevent="login">Valider</button>
  </div>
</template>


<script setup>
import { reactive} from 'vue';
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email , helpers} from '@vuelidate/validators'

const form = reactive({
  username: '',
  password: ''
})
// Custom regex validator
const regex = helpers.withMessage(
  'Username must start with at least 3 alphabetic characters.',
  helpers.regex(/^[a-zA-Z]{3,}/)
);
const rules = {
  username: { required, minLength: minLength(3), regex},
  password: { required, minLength: minLength(3) }
}
const validations = useVuelidate(rules, form);
const router      = useRouter()
const store       = useStore();


const setTokenStore = (token)=>{
  const user = JSON.parse(atob(token.token.split('.')[1]))
  store.commit('setUser', user)
  store.commit('setToken', token.token)
  store.dispatch('createToken', token.token)
  console.log(user.role)
  //redirect vers page tableau de bord
  router.push({name:'tableau'})
}


const login = async () => { 
  validations.value.$touch();  // Marquer tous les champs comme "touchés" pour afficher les erreurs

  if (validations.value.$invalid) {
    console.error('Form has validation errors');
    return;
  }
  const data = {
    username: form.username,
    password: form.password,
  };
  const store     = useStore();
  try {
    const response = await fetch('http://localhost:8889/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    setTokenStore(result);  
  } catch (err) {
    console.error('Error during login:', err);
  }
 };
</script>

<style lang="scss">
.error{
  color: red;
  font-weight: bold;
}
input {
  border: 2px solid black;
  height: 40px;
}
</style>


