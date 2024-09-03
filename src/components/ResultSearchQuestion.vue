<template lang="">
    <div>
        <a class="resultSearch" href="">{{props.question}}</a>
    </div>
</template>
<script setup>
    import { DefineProps } from 'vue';
    const props = DefineProps({
        question : String
    })
</script>
<style lang="">
    
</style>