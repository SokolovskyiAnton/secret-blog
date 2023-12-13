<template>
	<div class="post">
		<div class="post__content">
			<h1>{{ post.title }}</h1>
			<img
				src="../assets/images/post-picture.svg"
				alt="mountains"
			/>
			<p>{{ post.description }}</p>
			<small>{{ formattedDate }}</small>
		</div>
	</div>
</template>

<script setup>
import { useDateFormat } from "../composables/date";
import { computed } from "vue";

const props = defineProps({
	post: {
		type: Object,
		required: true,
	},
});

const { format } = useDateFormat();

const formattedDate = computed(() => {
    return format(props.post.dateCreated);
});
</script>

<style>
.post {
	display: flex;
	justify-content: center;
	margin: 20px 20px;
}
</style>
