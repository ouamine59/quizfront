<template lang="">
    <div id='recherche'>
        <div>
            <label for='titre'>Titre
                <input id='titre' v-model='form.titre'/>         
            </label>
            <div v-if="validations.titre.$error" class="error">azazaz
                <span v-if="!validations.titre.required">Question is required.</span>
                <span v-if="!validations.titre.minLength">Question must be at least 3 characters long.</span>
            </div>
            
        </div>
        <h2>Question n° </h2>
        <input v-model="form.question" placeholder="question"/>
        <div v-if="validations.question.$error" class="error">azazaz
            <span v-if="!validations.question.required">Question is required.</span>
            <span v-if="!validations.question.minLength">Question must be at least 3 characters long.</span>
        </div>
        <h2>Les réponses <button @click="addResponse">+</button></h2>

        <div v-for="(response, index) in form.responses" :key="index">
            <input class="response" v-model="response.text" placeholder="response"/>
            <input type="checkbox" :value="index" v-model="form.correctAnswers"/>
        </div>

        <button @click="create">Créer</button>
        <button @click="addQuestion">Nouvelle question</button>
     <!---   <div id='containerResearch'>
            <label for='search'>Rechercher de question
                <input id='search' v-model='search' @input='recherche'/>
            </label>          
        </div>-->
        <div id="containerResult">
            <div class="resultQuestion"  v-for="(n, index) in result.message" :key="index">
                <a href="">{{n.question}}</a>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
const form = reactive({
    titre:'',
    question: [],
    responses: [{ text: '' }],
    correctAnswers: [],
});
    
const rules = {
    question: { required, minLength: minLength(3) },
    titre:{ required, minLength: minLength(3) }
};
const addResponse = () => {
    form.responses.push({ text: '' });
};
const validations = useVuelidate(rules, form);
const search = ref("")
const result = ref({ message: [] })
const nbreQuestion = ref(1);
const recherche = async () => {
    try {
        const response = await fetch('http://localhost:8889/api/quiz/list-quiz', {
            method: 'POST',
            body: JSON.stringify({ question: search.value }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        result.value = await response.json();
    } catch (err) {
        console.error('Error during API call:', err);
    }
    
}
let checkedValues = [];
const create = async () => {
    validations.value.$touch();  // Marquer tous les champs comme "touchés" pour afficher les erreurs

    if (validations.value.$invalid) {
        console.error('Form has validation errors');
        return;
    }
    let checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
 
    checkedCheckboxes.forEach(function(checkbox) {
        checkedValues.push(checkbox.value);
    });
   
    const questionData = {
        titre: form.titre,
        question: form.question,
        responses: form.responses.map(r => r.text),
        correctAnswers: checkedValues
    };
    try {
        //appel a API pour creation question
        if(checkedValues.length == 0){
            throw new Error(`pas de reponse: ${response.status}`);
        } 
        if(form.titre==''){
            questionsArray.value.push({title:form.titre});
            questionsArray.value.push({nombre:2}); 
        }
        

        questionsArray.value.push({
            question: form.question,
            responses: form.responses.map(r => r.text), // Map responses to their text
            correctAnswers: form.correctAnswers,
        });
        console.log(questionsArray.value)
        const response = await fetch('http://localhost:8889/api/quiz/create', {
            method: 'POST',
            body: JSON.stringify({tab : questionsArray}),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();   
    } catch (err) {
        console.error('Error dur:', err);
    }
};
let tab = {
    title:"",
    question :{
        correctAnswers:{},
        titre :"",
        response:{}
    },  
}
const questionsArray = ref([]);
const addQuestion = () => {
  // Trigger validation
  validations.value.$touch();

  // If the form is invalid, log an error and exit the function
  if (validations.value.$invalid) {
    console.error('Form has validation errors');
    return;
  }

  // Check if the tab title is empty, if so, assign form.titre to the title in the questionsArray
  if (tab.title === "") {
    questionsArray.value.push({title:form.titre});
    questionsArray.value.push({nombre:2});
  }

  // Ensure form.responses is initialized as an array
  if (!Array.isArray(form.responses)) {
    form.responses = [{ text: '' }]; // Initialize with an array containing one empty object
  }

  // Handle checkbox inputs
  const elem = document.querySelectorAll('input[type="checkbox"]:checked');
  if (elem.length > 0) {
    elem[0].checked = false; // Uncheck the first checked checkbox
  }

  // Add the question object to the questionsArray
  questionsArray.value.push({
    question: form.question,
    responses: form.responses.map(r => r.text), // Map responses to their text
    correctAnswers: form.correctAnswers,
  });

  // Clear the form's question field after adding it to the questionsArray
  form.question = "";
  form.responses = [{ text: '' }]; // Reset responses to an empty array with one object

  // Log the current state of questionsArray
  console.log(questionsArray.value);
};

</script>

<style lang="scss">
#recherche {
    display: flex;
    align-items: center;
    flex-direction: column;
}

#containerResearch {
    border: 1px solid black;
    padding: 30px;
    border-radius: 10px;
}
#containerResult{
    display:flex;
    border:1px solid black ;
    flex-wrap: wrap;
}
.resultQuestion{
    width:300px;
    border:1px solid black;
}
</style>
