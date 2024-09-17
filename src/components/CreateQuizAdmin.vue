 <template>
    <div id='recherche'>
        <div>
             <label for='titre'>Titre
                <input id='titre' v-model='form.titre' />         
            </label> 
            <Question 
            :nQuestion ="nQuestion"
            @set-question="setQuestionValue"
            :qvalue="changeValueQuestion"
            />      
        </div>
        <h2>Les réponses <button @click="addForm">+</button></h2>
            
         <Responses 
            v-for="(response, index) in form.nResponses"
            :index="index" 
            @set-response="setResponse"
            @set-answer="goodResponses"
            :rvalue="updateResponses"
        />
        <!-- Answer = reponse donc tu changeras-->
        <button @click="previous">Précedent</button>
        <button @click="create">Créer</button>
        <button @click="addQuestion">Nouvelle question</button>
    </div>
</template>

<script setup  lang="ts">
import { reactive, ref } from 'vue';
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useRouter } from 'vue-router';
import Question from './Question.vue';
import Responses from './Responses.vue';
import   {Quiz} from '../type/config'
const updateResponses = ref<string[]>([])
const router = useRouter()
const nQuestion = ref(1)
const changeValueQuestion = ref("")
const form = reactive({
    titre:"",
    nResponses : []
});
let quizz : Quiz = {
    titre: "",
    questions: []
};
let currentQuestion = {
    text: "",
    responses: [""],
    answer: [""]
} 
const previous = ()=>{
    //modification  nombre de question
    form.nResponses = []
    if(nQuestion.value > 1){
        --nQuestion.value
        //affichage de la question
        const val = quizz.questions[nQuestion.value-1].question
        changeValueQuestion.value = val
        quizz.questions[nQuestion.value-1].reponse.forEach((res, index) => {
            form.nResponses.push({ text: '' }); 
            updateResponses.value[index] = res; // Remplit les réponses dans le tableau
        });
    }
    console.log(quizz)
}
const goodResponses = (value: string, index : number)=>{
    currentQuestion.answer[index] = value;
}
const setResponse = (value: string, index: number) => {
    currentQuestion.responses[index] = value[index];
}



const addForm = () => {
    form.nResponses.push({ text: '' });
};
let createTitle = 0
const setQuestionValue = (value: string) => {
     currentQuestion.text = value;
 }

const addQuestion = () => {
    const valueIndex = nQuestion.value- 1 ;
    form.nResponses=  []
    let a = nQuestion.value-1
    console.log(quizz.questions.length +'=='+ a)
     if(quizz.questions.length == nQuestion.value-1|| quizz.questions.length== 0){
        console.log('zzz')
        nQuestion.value++;
        changeValueQuestion.value = " "
        updateResponses.value = []
     }else{
        nQuestion.value++;
        quizz.questions[valueIndex+1].reponse.forEach((res, index) => {
            updateResponses.value[index] = res; // Remplit les réponses dans le tableau
            form.nResponses.push({ text: '' }); 
        });
     }
        
        // Si la question n'existe pas, on l'initialise
        if (!quizz.questions[valueIndex]) {
            quizz.questions[valueIndex] = {
                question: '',
                reponse: [],
                checkbox: []
            };
        }
        console.log("test : "+currentQuestion.responses)
        quizz.questions[valueIndex].question = currentQuestion.text;
        quizz.questions[valueIndex].reponse  =  currentQuestion.responses//currentQuestion.responses;
        quizz.questions[valueIndex].checkbox =  currentQuestion.answer //currentQuestion.answer;
        console.log(quizz)
        
        // //remise a zero du formulaire
        // form.nResponses=  [] 
        currentQuestion = {
            text: "",
            responses: [""],
            answer: [""]
        } 
    
};
const create = async () => {
    quizz.titre= form.titre 
    quizz.questions.push( {
         'question': currentQuestion.text, 
         'reponse' :currentQuestion.responses,
         'checkbox' : currentQuestion.answer
     })
console.log(quizz)
    try {
        const response = await fetch('http://localhost:8889/api/quiz/create', {
            method: 'POST',
            body: JSON.stringify(quizz),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // //remise a zero du formulaire
        form.nResponses=  [{ text: '' }]
        //updateResponses.value.setEmptyInput()
       // emptyQuestion.value.emptyQuestion()
        router.push("/tableau-de-bord")
    } catch (err) {
         console.error('Error during API call:', err);
    }
    
}

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

#containerResult {
    display: flex;
    border: 1px solid black;
    flex-wrap: wrap;
}

.resultQuestion {
    width: 300px;
    border: 1px solid black;
}
</style> 
