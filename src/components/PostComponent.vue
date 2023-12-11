<template>
	<div class="post">
		<div class="post__content">
			<h1>{{ post.title }}</h1>
			<img
				src="../assets/images/post-picture.svg"
				alt="a woman decorating a christmas tree"
			/>
			<p>{{ post.description }}</p>
			<small>{{ formatDate(post.dateCreated) }}</small>
		</div>
	</div>
</template>

<script setup>
import dayjs from "dayjs";

const props = defineProps({
	post: {
		type: Object,
		required: true,
	},
});

const formatDate = (dateString) => {
	const date = dayjs(dateString);
	return date.format("dddd, MMMM D, YYYY");
};
</script>

<style>
.post {
	display: flex;
	justify-content: center;
	margin: 20px 20px;
}



</style>
