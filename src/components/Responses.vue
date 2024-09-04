<template>
    <div>
        <h2>Les réponses <button @click="emit('addResponse')">+</button></h2>
        <div v-for="(response, index) in props.nResponses" :key="index">
            <input class="response"  @blur="emit('recupValue', $event.target.value)" v-model="response.text" placeholder="Réponse"/>
            <input type="checkbox" :value="index" @click="emit('recupCheckbox', $event.target.value)" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose, watch, ref } from 'vue';

const props = defineProps({
    nResponses: Object,

});

const emit = defineEmits(['addResponse', 'recupValue', 'recupCheckbox']);



</script>

<style scoped>
/* Ajoutez ici les styles pour votre composant */
</style>





<!-- <template>
    <div>
        <h2>Les réponses <button @click="emit('addResponse')">+</button></h2>
        <div v-for="(response, index) in props.responses" :key="index">
            <input class="response"  @input="emit('recupValue')" :v-model="internalValues[index].text" placeholder="Réponse"/>
            <input type="checkbox" :value="response.text" v-model="props.correctAnswers"/>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose, watch, ref } from 'vue';

const props = defineProps({
    responses: {
        type: Array,
        required: true
    },
    correctAnswers: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['addResponse', 'update:modelValue']);
const internalValues = ref([...props.modelValue]);

// Watcher pour émettre des mises à jour lorsque les valeurs internes changent
watch(internalValues, (newValues) => {
    emit('update:modelValue', newValues);
}, { deep: true });

defineExpose({
    internalValues
});
</script>

<style scoped>
/* Ajoutez ici les styles pour votre composant */
</style> -->
