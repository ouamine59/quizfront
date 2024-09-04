<template lang="">
    <div>
        <h2>Question n° </h2>
        <input :v-model="question" @blur="emit('recupQuestion', $event.target.value)" placeholder="question"/>
        <!-- <div v-if="props.validations.titre.$error" class="error">azazaz
            <span v-if="!validations.titre.required">Question is required.</span>
            <span v-if="!validations.titre.minLength">Question must be at least 3 characters long.</span>
        </div> -->
    </div>
</template>
<script setup >
    import { ref, defineEmits, defineProps} from 'vue';
    const props = defineProps({
        thereponse: String
    })
    const question = ref(props.thereponse)
    const emit = defineEmits(['recupQuestion'])
</script>
<style lang="">
    
</style>