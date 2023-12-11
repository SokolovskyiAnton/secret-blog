<template>
	<div class="post-wrapper">
		<PostComponent
			v-for="post in postsData"
			:key="post.id"
			:post="post"
		></PostComponent>
	</div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePostStore } from "../stores/postStore";
import PostComponent from "../components/PostComponent.vue";

const postStore = usePostStore();
const posts = ref([]);

onMounted(async () => {
	const postData = await postStore.getPost();
	posts.value = postData;
});

const postsData = computed(() => {
	const data = postStore.getPosts;
	return data;
});
</script>

<style>
.home-title {
	display: flex;
	justify-content: center;
}

@media (min-width: 768px) {
	.post-wrapper {
		display: flex;
	}
}
</style>
