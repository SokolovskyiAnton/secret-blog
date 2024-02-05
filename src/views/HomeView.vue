<template>
	<section class="homeView">
		<div class="container">
			<button v-if="isLoggedIn" @click="openModal" class="homeView__createPost">
				Create a Post
			</button>
			<div class="homeView__postWrapper">
				<PostComponent
					v-for="post in posts"
					:key="post._id"
					:post="post"
					@postClicked="toPostDetail"
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
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const postStore = usePostStore();
const modalStore = useModalStore();
const userStore = useUserStore();
const { posts } = storeToRefs(postStore);

onMounted(async () => {
	await postStore.getPosts();
});

const openModal = () => {
	modalStore.openModal({
		component: PostFormComponent,
	});
};

const isLoggedIn = computed(() => {
	return userStore.isAuth;
});

const router = useRouter();

const toPostDetail = (postId) => {
	router.push({ name: "PostDetail", params: { postId } });
};
</script>

<style lang="scss">
.homeView {
	padding: 16px;
	&__createPost {
		background-color: var(--blue-color-2);
		color: var(--white-color-1);
		padding: 12px;
		border-radius: 12px;
		width: 100%;
		border: none;
		margin-top: 16px;
		&:hover {
			cursor: pointer;
			background-color: var(--blue-color-1);
		}
	}
	&__postWrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 48px 20px;
		margin: 20px 0px 20px;
	}
}

@media (max-width: 425px) {
	.homeView__postWrapper {
		grid-template-columns: 1fr;
	}
}
</style>
