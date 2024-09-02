<template lang="">
    <div id='recherche'>
        <label for='titre'>Titre
            <input id='titre' v-model='titre'/>
        </label>
        <div id='containerResearch'>
            <label for='search'>Rechercher de question
                <input id='search' v-model='search' @input='recherche'/>
            </label>          
        </div>
        <div id="containerResult">
            <div class="resultQuestion"  v-for="(n, index) in result.message" :key="index">
                <a  href="">{{n.question}}</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const titre = ref("")
const search = ref("")
const result = ref({ message: [] })
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
