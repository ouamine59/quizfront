<template>
    <div>
        <input  v-model="currentAnswerValue[index]" @input="setResponseValue(props.index)" class="response"    placeholder="Réponse"/>
        <input type="checkbox"  :value="currentAnswerValue"  @click="setAnswerValue(props.index)" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from 'vue';

// Props
const props = defineProps({
    index: Number,
    rvalue: Array
});

const emit = defineEmits(['set-response', 'set-answer']);

// Ref pour stocker les valeurs courantes des réponses
const currentAnswerValue = ref([]);

// Utiliser computed pour récupérer les valeurs des props (rvalue) et initialiser currentAnswerValue
const answerValue = computed(() => {
    return props.rvalue ? [...props.rvalue] : [];  // Faire une copie de rvalue
});

// Initialisation de currentAnswerValue à partir des props
watch(
    answerValue,
    (newValue) => {
        currentAnswerValue.value = [...newValue];  // Faire une copie pour éviter les mutations directes
    },
    { immediate: true }
);

// Méthodes d'émission d'événements
const setResponseValue = (index) => {
    emit('set-response', currentAnswerValue.value, index);
}

const setAnswerValue = (index) => {
    emit('set-answer', currentAnswerValue.value, index);
}
</script>


<style scoped>
/* Ajoutez ici les styles pour votre composant */
</style>
