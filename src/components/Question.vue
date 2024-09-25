<template lang="">
    <div>
        <p>Question n° {{props.nQuestion}}</p>
        <input v-model="question" @input="setQuestionValue" placeholder="question"/>
    </div>
</template>
<script setup lang="ts">
    import { ref, defineEmits, defineExpose, defineProps, onMounted, watch} from 'vue';
    const question = ref<string |undefined>("")
    const emit = defineEmits(['set-question']);
    const props = defineProps({
        nQuestion : Number,
        qvalue: String

    })
     // Utilisation de watch pour surveiller les props et initialiser la valeur de question
     watch(() => props.qvalue,
        (newValue) => {
            question.value = newValue; // Met à jour la valeur de question quand qvalue change
        },
        { immediate: true } // Cela permet de déclencher immédiatement la fonction avec la valeur initiale
    );
    onMounted(()=>{
        question.value = props.qvalue ;
    })
    const setQuestionValue = ():void => {
        emit('set-question', question.value)
    }


</script>
<style lang="">
    
</style>