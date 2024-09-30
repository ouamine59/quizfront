<!-- <template>
    <div>
        <input 
            v-model="currentAnswerValue[index]" 
            @input="setValue(index)" 
            class="response" 
            placeholder="Réponse"
            :class="{ 'is-invalid': v$.currentAnswerValue.$invalid && v$.currentAnswerValue.$dirty }"
        />
        <div v-if="v$.currentAnswerValue.$invalid && v$.currentAnswerValue.$dirty" class="error">
            <p v-if="!v$.currentAnswerValue.required">La réponse est requise.</p>
        </div>
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
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
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
 -->
 <template>
    <div>
        <input 
            v-model="currentAnswerValue" 
            @input="setValue" 
            class="response" 
            placeholder="Réponse"
            :class="{ 'is-invalid': v$.currentAnswerValue.$invalid && v$.currentAnswerValue.$dirty }"
        />
        <span v-if="!validation.value.$pending && !validation.value.required">Ce champ est requis.</span>
        
        <input 
            type="checkbox"   
            :checked="isChecked"
            :value="currentAnswerValue"
            @change="setAnswerValue" 
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

// Props
const props = defineProps({
    index: Number,
    rvalue: String, // Utilisation d'une réponse unique
    isChecked: Boolean,
    validation: Object
});

// Emissions d'événements
const emit = defineEmits(['set-response', 'set-good-response']);

// Ref pour stocker la valeur courante de la réponse
const currentAnswerValue = ref(props.rvalue);

// Initialisation de Vuelidate
const formData = ref({
    currentAnswerValue: currentAnswerValue.value
});

// Règles de validation
const rules = {
    currentAnswerValue: { required }
};

// Utilisation de Vuelidate
const v$ = useVuelidate(rules, formData);
touch () {
  this.$v.formData.$touch()
}
// Synchronisation des props avec currentAnswerValue quand rvalue change
watch(
    () => props.rvalue,
    (newValue) => {
        currentAnswerValue.value = newValue;
        formData.value.currentAnswerValue = newValue; // Assure la mise à jour de formData également
    },
    { immediate: true }
);

// Méthode pour émettre l'événement lors de la modification de la réponse
const setValue = () => {
    emit('set-response', currentAnswerValue.value, props.index);
    v$.value.$touch(); // Marque le champ comme "touché" pour activer les messages d'erreur
};

// Méthode pour émettre l'événement lors de la modification de la réponse correcte
const setAnswerValue = () => {
    emit('set-good-response', currentAnswerValue.value, props.index);
};
</script>

<style scoped>
.is-invalid {
    border-color: red;
}
.error {
    color: red;
    font-size: 0.875em;
}
</style>
