<template>
	<input :style="styles" v-model="text" />
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
	color: {
		type: String,
		default: "black",
	},
	bgColor: {
		type: String,
		default: "transparent",
    },
   
});

const styles = computed(() => {
	return {
		color: props.color,
        backgroundColor: props.bgColor,
        
	};
});
const text = ref("hello");
</script>

<style>
</style>
