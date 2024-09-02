<template lang="">
    <div>
        <h1>Créer une question</h1>
        <input v-model="form.question" placeholder="question"/>
        
        <h2>Les réponses <button @click="addResponse">+</button></h2>

        <div v-for="(response, index) in form.responses" :key="index">
            <input class="response" v-model="response.text" placeholder="response"/>
            <input type="checkbox" :value="index" v-model="form.correctAnswers"/>
        </div>

        <button @click="create">Créer</button>
    </div>
</template>
    
    <script setup>
        import { reactive, ref } from 'vue';
        import { required, minLength } from '@vuelidate/validators';
        import { useVuelidate } from '@vuelidate/core';
    
        const form = reactive({
            question: '',
            responses: [{ text: '' }],
            correctAnswers: []
        });
    
        const rules = {
            question: { required, minLength: minLength(3) }
        };
    
        const validations = useVuelidate(rules, form);
        
        const addResponse = () => {
            form.responses.push({ text: '' });
        };
    
    const create = async () => {
        let checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let checkedValues = [];
        checkedCheckboxes.forEach(function(checkbox) {
            checkedValues.push(checkbox.value);
        });
        const questionData = {
            question: form.question,
            responses: form.responses.map(r => r.text),
            correctAnswers: checkedValues
        };
        //appel a API pour creation question
        try {
            const response = await fetch('http://localhost:8889/api/quiz/create-question', {
                method: 'POST',
                body: JSON.stringify(questionData),
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
            console.error('Error during login:', err);
        }
    };
    </script>
    
    <style lang="scss">
    </style>
    