<template>
	<div class="container">
		<button @click="openInfoModal" class="postBtn">Create a Post</button>
		<div class="post-wrapper">
			<PostComponent
				v-for="post in postsData"
				:key="post.id"
				:post="post"
			></PostComponent>
		</div>
	</div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { usePostStore } from "../stores/postStore";
import PostComponent from "../components/PostComponent.vue";
import InfoModalComponent from "../components/InfoModalComponent.vue";
import { useModalStore } from "../stores/modalStore";

const postStore = usePostStore();

const modalStore = useModalStore();

onMounted(async () => {
	if (postStore.isLoaded) return;
	await postStore.getPosts();
	postStore.isLoaded = true;
});

const postsData = computed(() => postStore.postsList);

const openInfoModal = () => {
	modalStore.openModal({
		component: InfoModalComponent,
		props: { text: "Props have been successfully passed!" },
	});
};
</script>

<style lang="scss">
.post-wrapper {
	display: flex;
	flex-wrap: wrap;
}

.postBtn {
	background-color: var(--blue-color-2);
    color: var(--white-color-1);
    padding: 12px;
    border-radius: 12px;
    width: 100%;
    border: none;
    margin-top: 16px;
    &:hover {
		cursor: pointer;
	}
}

.postModal__wrapper {
	display: none;
	position: fixed;
	z-index: 1000;
	padding-top: 100px;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.4);
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	&__content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
		height: 200px;
		background-color: white;
		padding: 20px;
	}
}

@media (min-width: 768px) {
	.post-wrapper {
		display: flex;
	}
}
</style>
