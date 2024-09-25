<!-- <template>
    <div>
        <input 
            v-model="currentAnswerValue[index]" 
            @input="setValue(index)" 
            class="response" 

            placeholder="Réponse"
        />
        <input 
            type="checkbox"   
            :checked="isChecked"
            :value="currentAnswerValue[index]"
            @change="setAnswerValue(index)" 
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

// Props
const props = defineProps({
    index: Number,
    rvalue: Array,
    isChecked: Boolean,
    isChanged : Array
});
const checkedValues = ref([]);
const emit = defineEmits(['set-response', 'set-good-response']);

// Ref pour stocker les valeurs courantes des réponses
const currentAnswerValue = ref([]);

// Initialisation de currentAnswerValue à partir des props
watch(
    () => props.rvalue,
    (newValue) => {
        if (Array.isArray(newValue)) {
            currentAnswerValue.value = [...newValue];
           // checkedValues.value = newValue.map(() => false);
        }
        for(let i = 0 ; i<checkedValues.value.length;i++){     
            if(props.isChecked[i]){
                checkedValues.value[i] =props.isChecked[i]  ;
            }
        }
    },
    { immediate: true, deep: true }
);

// Méthodes d'émission d'événements
const setValue = (index) => {
    emit('set-response', currentAnswerValue.value[index], index);
}

const setAnswerValue = (index) => {
    emit('set-good-response', currentAnswerValue.value[index], index);
}
</script> -->

<template>
    <div>
        <input 
            v-model="currentAnswerValue[index]" 
            @input="setValue(index)" 
            class="response" 
            placeholder="Réponse"
        />
        <input 
            type="checkbox"   
            :checked="isChecked"
            :value="currentAnswerValue[index]"
            @change="setAnswerValue(index)" 
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

// Props
const props = defineProps({
    index: Number,
    rvalue: Array,
    isChecked: Boolean
});

const emit = defineEmits(['set-response', 'set-good-response']);

// Ref pour stocker les valeurs courantes des réponses
const currentAnswerValue = ref([]);

// Initialisation de currentAnswerValue à partir des props
watch(
    () => props.rvalue,
    (newValue) => {
        if (Array.isArray(newValue)) {
            currentAnswerValue.value = [...newValue];
        }
    },
    { immediate: true, deep: true }
);

// Méthodes d'émission d'événements
const setValue = (index) => {
    emit('set-response', currentAnswerValue.value[index], index);
}

const setAnswerValue = (index) => {
    emit('set-good-response', currentAnswerValue.value[index], index);
}
</script>

