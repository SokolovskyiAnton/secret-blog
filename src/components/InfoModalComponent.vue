<template>
	<div class="inner">
		<h2>This is a modal window!</h2>
		<p>{{ text }}</p>

		<ModalCloseButton />
	</div>
</template>

<script setup>
import ModalCloseButton from "./ModalCloseButton.vue";

const props = defineProps({
	text: String,
});
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.inner > h2 {
	font-size: 3rem;
	font-weight: bold;
}

.inner > p {
	font-size: 1.8rem;
	font-weight: 300;
}
</style>
