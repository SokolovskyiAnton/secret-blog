<template>
	<div class="post">
		<div class="post__content">
			<img
				src="../assets/images/post-picture.svg"
				alt="mountains"
				class="post__content__img"
			/>
			<h1>{{ post.title }}</h1>
			<div class="post__content__description">
				<p>{{ post.description }}</p>
			</div>
			<div class="post__content__footer">
				<small>{{ formattedDate }}</small>
				<div class="post__content__footer__likeBtn">
					<button
						class="post__content__footer__likeBtn__toggle"
						:disabled="isLoading"
						@click.prevent="handleLike(post._id)"
					>
						<img
							:src="likeIcon"
							alt="like icon"
							class="post__content__footer__likeBtn__toggle__likeIcon"
						/>
					</button>
					<div>{{ count }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useDateFormat } from "@/composables/date";
import { computed, ref } from "vue";
import { usePostStore } from "../stores/postStore";
import { useUserStore } from "../stores/userStore";
import { useModalStore } from "../stores/modalStore";
import WarningModalComponent from "./WarningModalComponent.vue";

const props = defineProps({
	post: {
		type: Object,
		required: true,
	},
	likedPosts: {
		type: Array,
		required: true,
	},
});

const { format } = useDateFormat();

const formattedDate = computed(() => format(props.post.dateCreated));

const postStore = usePostStore();
const userStore = useUserStore();
const modalStore = useModalStore();

const liked = ref(props.post.isLiked);
const count = ref(props.post.likes);
const isLoading = ref(false);

const handleLike = async (postId) => {
	if (!userStore.isAuth) {
		modalStore.openModal({
			component: WarningModalComponent,
		})

		return;
	}

	try {
		isLoading.value = true;

		if (!liked.value) {
			await postStore.like(postId);
			count.value++;
		} else {
			await postStore.unlike(postId);
			count.value--;
		}

		liked.value = !liked.value;
	} catch (error) {
		throw error;
	} finally {
		isLoading.value = false;
	}
};

const likeIcon = computed(() => {
	return liked.value
		? "src/assets/images/like-icon.svg"
		: "src/assets/images/unlike-icon.svg";
});
</script>

<style lang="scss">
.post {
	display: flex;
	justify-content: center;
	flex: 1 1 calc(33.33% - 16px);
	&__content {
		&__img {
			margin: 32px 0 32px;
			display: block;
			height: auto;
			width: 100%;
		}
		&__description {
			margin: 16px 0 16px;
		}
		&__footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			&__likeBtn {
				display: flex;
				align-items: center;
				gap: 5px;
				&__toggle {
					background-color: transparent;
					border: none;
					padding: 0;
					align-items: center;
					display: flex;
					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}
}

@media (max-width: 768px) {
	.post {
		flex: 1 1 calc(50% - 16px);
	}
}
</style>
