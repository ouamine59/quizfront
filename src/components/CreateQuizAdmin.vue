 <template>
    <div id='recherche'>
        <div id="containerTitreQuestion">
            <div>
             <p>Titre</p>
                <input id='titre' v-model='form.titre' />         
            </div> 
            <Question 
            :nQuestion ="numberQuestion"
            @set-question="setQuestionValue"
            :qvalue="changeValueQuestion"
            />      
        </div>
        <h2>Les réponses <button @click="addForm">+</button></h2>

        <Responses 
            v-for="(response, index) in form.nResponses"
            :index="index" 
            @set-response="setResponse"
            @set-good-response="goodResponses"
            :rvalue="updateResponses"
            :isChecked="boolCheckbox[index]"
        />

       <div id="containerBTN">
            <button @click="previous">Précedent</button>
            <button @click="create">Créer</button>
            <button @click="addQuestion">{{(numberQuestion<=quizz.questions.length-1)?"Question suivante": "Nouvelle question"}}</button>
       </div>
        
    </div>
</template>

<script setup  lang="ts">
import { reactive, ref , toRaw, watch} from 'vue';
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useRouter } from 'vue-router';
import Question from './Question.vue';
import Responses from './Responses.vue';
import   {Quiz} from '../type/config'

const boolCheckbox  = ref<boolean[]>([])
const updateResponses = ref<string[]>([])
const router = useRouter()
const numberQuestion = ref(1)
const changeValueQuestion = ref("")

const form = reactive({
    titre:"",
    nResponses: [],
    isChanged:[]
});
let start = 0 ;
let quizz : Quiz = {
    titre: "",
    questions: []
};
let currentQuestion = reactive({
    text: "",
    responses: [""],
    answer: []
} )
const previous = () => {
    form.nResponses = [];
    boolCheckbox.value = [];
    if (numberQuestion.value-1 >0) {
        numberQuestion.value--;
        const currentQuestionData = quizz.questions[numberQuestion.value-1];
        if (currentQuestionData) {
            currentQuestionData.reponse.forEach((res, index) => {
                form.nResponses.push({ text: res });
                updateResponses.value[index] = res;
                boolCheckbox.value[index] = currentQuestionData.checkbox.includes(res);
            });
        }
    }
};
watch(
  () => form.isChanged, 
  (newResponses) => {
    let i =0;
    if(quizz.questions[numberQuestion.value-1]){
        i = quizz.questions[numberQuestion.value-1].reponse.length
    }
    for(let a = 0;a<boolCheckbox.value.length;a++){
        boolCheckbox.value[a] = false ;
    }
    updateResponses.value[i]= ""
  },
  { deep: true } // Pour surveiller les changements profonds des objets
);
const goodResponses = (value: string, index: number) => {
    const isInArray = currentQuestion.answer.indexOf(value);
    if (isInArray !== -1) {
        currentQuestion.answer.splice(isInArray, 1); // Supprime si déjà présent
    } else {
        currentQuestion.answer.push(value); // Ajoute si non présent
    }
}

const setResponse = (value: string, index: number) => {
    // Mets à jour la réponse à l'index spécifié
    form.nResponses[index].text = value;
    currentQuestion.responses[index] = value; // Mets à jour la question actuelle
}

const addForm = () => {
    form.nResponses.push({ text: '' });
    form.isChanged.push({text:""})
};

const setQuestionValue = (value: string) => {
     currentQuestion.text = value;
 }
const checkCheckbox = (currentCheckbox: number)=>{
    quizz.questions[currentCheckbox].checkbox = []
    let checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedCheckboxes.forEach(function(checkbox) {
        quizz.questions[currentCheckbox].checkbox.push(checkbox .value);
    });
}
const fieldBlank = ()=>{
    changeValueQuestion.value = " "
    updateResponses.value = [] 
}

const addQuestion = () => {  
    const valueIndex = numberQuestion.value- 1 ;
    form.nResponses=  []
    
    if(quizz.questions.length-1 ){
        fieldBlank()
    }
    if(start ===0 ){
        fieldBlank()
        start = 1
    }
     if(quizz.questions.length == numberQuestion.value-1|| quizz.questions.length== 0){
        numberQuestion.value++;
        if(start ===0 ){
            fieldBlank()
            start = 1
        }  
       
     }else{
        numberQuestion.value++;
        if(valueIndex+1 < quizz.questions.length ){
            //changement du titre 
            changeValueQuestion.value = (valueIndex+1 < quizz.questions.length )?quizz.questions[valueIndex+1].question :""
            //affichage des input response
            quizz.questions[valueIndex+1].reponse.forEach((res, index) => {
                updateResponses.value[index] = res; 
                form.nResponses.push({ text: '' }); 
            });
        } 
     }
    if (!quizz.questions) {
        quizz.questions = [];
    }
        // Si la question n'existe pas, on l'initialise
    if (!quizz.questions[valueIndex]) {
        quizz.questions.push({
            'question': currentQuestion.text,
            'reponse' : toRaw(currentQuestion.responses),
            'checkbox' : toRaw(currentQuestion.answer)
        })
        
    }else{
       if( quizz.questions[valueIndex].question != currentQuestion.text && currentQuestion.text != ""){
            quizz.questions[valueIndex].question  =  currentQuestion.text
        }
        //changement du titre 
        changeValueQuestion.value = (valueIndex+1 < quizz.questions.length )?quizz.questions[valueIndex+1].question :""
        const currentCheckbox = (valueIndex+1 < quizz.questions.length )?valueIndex+1 :quizz.questions.length-1 ;
        const currentQuestionData = quizz.questions[currentCheckbox];
        //ajout des reponse quand  la question existe deja
        if(quizz.questions[valueIndex].reponse.length != form.nResponses.length){
            for(let i = 0; i<currentQuestion.responses.length;i++){
                if(currentQuestion.responses[i]!="" && currentQuestion.responses[i]!= undefined){
                    quizz.questions[valueIndex].reponse.push(currentQuestion.responses[i])
                }
            }
        }
     
        //affichage des checkbox selectionné
        quizz.questions[currentCheckbox].reponse.forEach((res, index1) => {
            boolCheckbox.value[index1] = currentQuestionData.checkbox.includes(res);
        });
        for(let i =0; i <quizz.questions[valueIndex].reponse.length; i ++){
             if(currentQuestion.responses[i]!=undefined ){
                if( quizz.questions[valueIndex].reponse[i]!=  currentQuestion.responses[i] && currentQuestion.responses[i] !=""){
                   quizz.questions[valueIndex].reponse[i]   =  currentQuestion.responses[i]
                }
            }
        }
        for(let i =0; i <quizz.questions[valueIndex].checkbox.length; i ++){
            if(currentQuestion.answer[i]!=undefined){
                if( quizz.questions[valueIndex].checkbox[i] != currentQuestion.answer[i]  && currentQuestion.answer[i]  !=""){
                    quizz.questions[valueIndex].checkbox[i]  =  currentQuestion.answer[i]
                }
            }
        }
        
        
    }
    checkCheckbox(valueIndex)
    //remise a zero du formulaire
    currentQuestion = {
        text: "",
        responses: [""],
        answer: []
    } 
    
};
const create = async () => {
    quizz.titre= form.titre 
    quizz.questions.push( {
         'question': currentQuestion.text, 
         'reponse' :currentQuestion.responses,
         'checkbox' : currentQuestion.answer
     })
     checkCheckbox(quizz.questions.length-1)
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
        router.push("/liste-quiz")
    } catch (err) {
         console.error('Error during API call:', err);
    }
    
}

</script>

<style lang="scss">


#containerTitreQuestion{
    display:flex;
    flex-direction:row;
    align-items: center;
    width:80%;
    margin-left: auto;
    margin-right: auto;
    border:1px solid black;
    justify-content: center;
}


.resultQuestion {
    width: 300px;
    border: 1px solid black;
}

#containerBTN{
    width:80%;
    display:flex;
    justify-content: space-around;
    border:1px solid black;
    margin-left: auto;
    margin-right: auto;
}
</style> 
