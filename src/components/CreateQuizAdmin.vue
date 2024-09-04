 <template>
    <div id='recherche'>
        <div>
            <label for='titre'>Titre
                <input id='titre' v-model='form.titre' />         
            </label>
           <Question 
            @recupQuestion="recupQuestion($event)" />     
        </div>
         <Responses 
        :nResponses="form.nResponses" 
        @addResponse="addResponse" 
        @recupValue="recupResponse( $event)"
        @recupCheckbox="recupCheckbox($event)"/>

        <button @click="create">Créer</button>
        <button @click="addQuestion">Nouvelle question</button>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Question from './Question.vue';
import Responses from './Responses.vue';
const questionsArray = ref([]);
const form = reactive({
    titre: '',
    question:[],
    responses: [],
    correctAnswers: [],
    nResponses : [{ text: '' }]
});
const recupQuestion = ($event)=>{
    if($event!=''){
        form.question.push ($event)
    }
}
const recupCheckbox = ($event)=>{
    if($event!=''){
        form.correctAnswers.push ($event)
    }
}
const recupResponse =( $event) =>{
    if($event!=''){
        form.responses.push (   $event)
    }
}








const addResponse = () => {
    form.nResponses.push({ text: '' });
};
const addQuestion = () => {
    if(questionsArray.value.title==0){
        questionsArray.value.push({title:form.title}) 
    }
    questionsArray.value.push({
        question: form.question,
        responses: form.responses,
        correctAnswers: form.correctAnswers,
    });
    console.log(questionsArray)
    // Reset form after adding the question
    form.question = "";
    form.nResponses = [{ text: '' }];
    form.response = [];
    form.correctAnswers = [];


};
const create = async () => {
    questionsArray.value.push({
        title: form.titre,
        question: form.question,
        responses: form.responses,
        correctAnswers: form.correctAnswers,
    });
        try {
        const response = await fetch('http://localhost:8889/api/quiz/create', {
            method: 'POST',
            body: JSON.stringify({ tab: questionsArray.value }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        // Clear form and questions array after successful creation
        questionsArray.value = [];
        form = [];

    } catch (err) {
        console.error('Error during API call:', err);
    }
}
// const create = async () => {
//     // validations.value.$touch();

//     // if (validations.value.$invalid) {
//     //     console.error('Form has validation errors');
//     //     return;
//     // }

//     try {
//         const response = await fetch('http://localhost:8889/api/quiz/create', {
//             method: 'POST',
//             body: JSON.stringify({ tab: questionsArray.value }),
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log(result);

//         // Clear form and questions array after successful creation
//         questionsArray.value = [];
//         form = [];

//     } catch (err) {
//         console.error('Error during API call:', err);
//     }
// };

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

<!-- <template>
    <div id='recherche'>
        <div>
            <label for='titre'>Titre
                <input id='titre' v-model='form.titre'/>         
            </label>
            <Question :responses="form.question" />      
        </div>
        <Responses 
        :responses="form.responses" 
        @addResponse="addResponse" 
        @recupValue="recup(value, $event)"
        v-model="parentValues" 
        ref="childComp"/>
        <button @click="create">Créer</button>
        <button @click="addQuestion">Nouvelle question</button>
    </div>
</template>

<script setup>
const recup =(value, $event) =>{
    alert($event)
}
import { reactive, ref } from 'vue';
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Question from './Question.vue';
import Responses from './Responses.vue';

const parentValues = ref(['Item 1', 'Item 2', 'Item 3']);
const childComp = ref(null);

const form = reactive({
    titre: '',
    question: [],
    responses: [{ text: '' }],
    correctAnswers: [],
});

// const rules = {
//     question: { required, minLength: minLength(3) },
//     titre: { required, minLength: minLength(3) }
// };

//const validations = useVuelidate(rules, form);

const questionsArray = ref([]);

const addResponse = () => {
    form.responses.push({ text: '' });
};

const addQuestion = () => {
    // validations.value.$touch();

    // if (validations.value.$invalid) {
    //     console.error('Form has validation errors');
    //     return;
    // }

    if (questionsArray.value.length === 0) {
        questionsArray.value.push({ title: form.titre });
        questionsArray.value.push({ nombre: 2 });
    }

    questionsArray.value.push({
        question: form.question,
        responses: form.responses.map(r => r.text),
        correctAnswers: form.correctAnswers,
    });

    // Reset form after adding the question
    form.question = "";
    form.responses = [{ text: '' }];
    form.correctAnswers = [];
    form.titre = "";
};

const create = async () => {
    // validations.value.$touch();

    // if (validations.value.$invalid) {
    //     console.error('Form has validation errors');
    //     return;
    // }

    try {
        const response = await fetch('http://localhost:8889/api/quiz/create', {
            method: 'POST',
            body: JSON.stringify({ tab: questionsArray.value }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        // Clear form and questions array after successful creation
        questionsArray.value = [];
        form.question = "";
        form.titre = "";
        form.responses = [{ text: '' }];
        form.correctAnswers = [];

    } catch (err) {
        console.error('Error during API call:', err);
    }
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

#containerResult {
    display: flex;
    border: 1px solid black;
    flex-wrap: wrap;
}

.resultQuestion {
    width: 300px;
    border: 1px solid black;
}
</style> -->
