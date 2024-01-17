<template>
	<div class="inner">
		<h1>Create your own post!</h1>
		<p>{{ text }}</p>
		<textarea
			rows="20"
			cols="100"
			placeholder="What's on your mind?"
			class="inner__text"
		></textarea>

		<ModalCloseButton />
	</div>
</template>

<script setup>
import ModalCloseButton from "./ModalCloseButton.vue";

const props = defineProps({
	text: String,
});
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.inner {
	h1 {
		font-weight: bold;
	}
	&__text {
		width: 500px;
		height: 200px;
		padding: 24px;
		margin: 18px 0 18px;
	}
}

@media (max-width: 425px) {
	.inner__text {
		width: fit-content;
		max-width: 100%;
	}
}
</style>
