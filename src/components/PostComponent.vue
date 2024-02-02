<template>
	<div class="post">
		<div class="post__content">
			<div class="post__content__dropdown">
				<button
					class="post__content__dropdown__btn"
					@click.prevent="openDropdpown"
				>
					<img
						src="../assets/images/more-icon.svg"
						alt="more icon"
						class="post__content__dropdown__btn__icon"
					/>
				</button>
				<div
					class="post__content__dropdown__content"
					:class="{
						post__content__dropdown__content__visible: isDropdownVisible,
					}"
				>
					<a href="#" @click.prevent="editPost"> Edit Post</a>
				</div>
			</div>
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
		});

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

const isDropdownVisible = ref(false);

const openDropdpown = () => {
	isDropdownVisible.value = !isDropdownVisible.value;
};
</script>

<style lang="scss">
.post {
	&__content {
		display: flex;
		flex-direction: column;
		&__dropdown {
			width: 40px;
			height: 40px;
			margin-left: auto;
			position: relative;
			display: inline-block;
			&__btn {
				border-radius: 90%;
				border: none;
				background-color: transparent;
				&:hover {
					background-color: var(--black-color-7);
					cursor: pointer;
				}
			}

			&__content {
				display: none;
				position: absolute;
				right: 0;
				background-color: #f9f9f9;
				min-width: 160px;
				box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
				z-index: 1;
				&__visible {
					display: block;
					border-radius: 8px;
				}

				a {
					color: var(--black-color-2);
					padding: 12px 14px;
					text-decoration: none;
					display: block;

					&:hover {
						background-color: #f1f1f1;
						border-radius: 8px;
					}
				}
			}
		}
		&__img {
			margin: 16px 0 32px;
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
</style>
