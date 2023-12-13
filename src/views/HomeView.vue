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
import { onMounted, computed } from "vue";
import { usePostStore } from "../stores/postStore";
import PostComponent from "../components/PostComponent.vue";

const postStore = usePostStore();

onMounted(async () => {
	if (postStore.isLoaded) return

	await postStore.getPostList();
	postStore.isLoaded = true;
	
});

const postsData = computed(() => postStore.getPosts);
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
