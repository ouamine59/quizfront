<template>
        <tr>
            <td>{{props.id}} </td>
            <td>{{props.titre}} </td>
            <td><a :href="index" >MODIFIER </a></td>
        </tr>
</template>
<script setup lang="ts">
import { ref, defineEmits, defineExpose, onMounted} from 'vue';
const index = ref("")
 const props = defineProps({
     id : Number,
    titre : String,
 })
 onMounted(()=>{
    index.value = `/modifier-quiz/${props.id}`
 })
</script>

<style>
</style>