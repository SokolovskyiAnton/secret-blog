<template>
	<section class="section">
		<div class="container">
			<button v-if="isLoggedIn" @click="openModal" class="section__postBtn">
				Create a Post
			</button>
			<div class="section__postWrapper">
				<PostComponent
					v-for="post in postsData"
					:key="post.id"
					:post="post"
				></PostComponent>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { usePostStore } from "../stores/postStore";
import PostComponent from "../components/PostComponent.vue";
import PostFormComponent from "../components/PostFormComponent.vue";
import { useModalStore } from "../stores/modalStore";
import { useUserStore } from "../stores/userStore";

const postStore = usePostStore();

const modalStore = useModalStore();

const userStore = useUserStore();

onMounted(async () => {
	if (postStore.isLoaded) return;
	await postStore.getPosts();
	postStore.isLoaded = true;
});

const postsData = computed(() => postStore.postsList);

const openModal = () => {
	modalStore.openModal({
		component: PostFormComponent,
	});
};

const isLoggedIn = computed(() => {
	return userStore.isAuth;
});
</script>

<style lang="scss">
.section {
	&__postBtn {
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
	&__postWrapper {
		display: flex;
		flex-wrap: wrap;
	}
}

@media (max-width: 425px) {
	.section__postWrapper {
		flex-direction: column;
	}
}
</style>
