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
tbody{
    width:80%;
    display:flex;
    justify-content:space-between;
    margin-left:auto;
    margin-right: auto;
}
tr{
    display:flex;
    justify-content:space-between;
 
}
</style>