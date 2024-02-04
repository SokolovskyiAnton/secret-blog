<template>
	<div class="post">
		<div class="post__content">
			<div
				class="post__content__main"
				@click.prevent="toPostDetailing"
				title="Click anywhere to expand the post"
			>
				<!--EDIT BUTTON-->
				<!-- <div class="post__content__main__dropdown">
					<button
						class="post__content__main__dropdown__btn"
						@click.prevent="openDropdpown"
					>
						<img
							src="../assets/images/more-icon.svg"
							alt="more icon"
							class="post__content__main__dropdown__btn__icon"
						/>
					</button>
					<div
						class="post__content__main__dropdown__content"
						:class="{
							post__content__main__dropdown__content__visible:
								isDropdownVisible,
						}"
					>
						<div class="post__content__main__dropdown__content__editBtn">
							<img
								src="../assets/images/edit-post-icon.svg"
								alt="edit post icon"
							/>
							<a href="#" @click.prevent="openModal"> Edit Post</a>
						</div>
						<div class="post__content__main__dropdown__content__deleteBtn">
							<img
								src="../assets/images/trash-icon.svg"
								alt="delete post icon"
							/>
							<a href="#" @click.prevent="openModal"> Delete Post</a>
						</div>
					</div>
				</div> -->
				<div class="post__content__main__picture">
					<img
						:src="postPicture"
						alt="mountains"
						class="post__content__main__picture__img"
					/>
				</div>

				<h1>{{ post.title }}</h1>
				<div class="post__content__main__description">
					<p>{{ post.description }}</p>
				</div>
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
import { computed, ref, onMounted } from "vue";
import { usePostStore } from "../stores/postStore";
import { useUserStore } from "../stores/userStore";
import { useModalStore } from "../stores/modalStore";
import WarningModalComponent from "./WarningModalComponent.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const props = defineProps({
	post: {
		type: Object,
		required: true,
	},
});

const { format } = useDateFormat();

const formattedDate = computed(() => format(props.post.dateCreated));

const postStore = usePostStore();
const userStore = useUserStore();
const modalStore = useModalStore();
const { isAuth } = storeToRefs(userStore);

const liked = ref(props.post.isLiked);
const count = ref(props.post.likes);
const isLoading = ref(false);
const image = ref(props.post.image);

const router = useRouter();

const handleLike = async (postId) => {
	if (!isAuth.value) {
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
	return liked.value && isAuth.value
		? "src/assets/images/like-icon.svg"
		: "src/assets/images/unlike-icon.svg";
});

const postPicture = computed(() => {
	return !image.value || image.value.toLowerCase().endsWith(".svg")
		? "src/assets/images/post-picture.svg"
		: image.value;
});

const toPostDetailing = () => {
	router.push("/postdet");
};

// const isDropdownVisible = ref(false);

// const openDropdpown = () => {
// 	isDropdownVisible.value = !isDropdownVisible.value;
// };

// const openModal = () => {
// 	modalStore.openModal({
// 		component: EditPostComponent,
// 	});
// };
</script>

<style lang="scss">
.post {
	box-shadow: 10px 10px 5px var(--black-color-8);
	padding: 14px;
	border-radius: 12px;
	&__content {
		&__main {
			display: flex;
			flex-direction: column;
			cursor: pointer;
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
					padding: 4px 4px 0;
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
					z-index: 1;
					&__editBtn,
					&__deleteBtn {
						display: flex;
						padding: 0 8px 0;
						&:hover {
							background-color: #f1f1f1;
							border-radius: 8px;
							cursor: pointer;
						}
					}

					&__visible {
						display: block;
						border-radius: 8px;
					}

					a {
						color: var(--black-color-2);
						padding: 12px 14px;
						text-decoration: none;
						display: block;
					}
				}
			}
			&__picture {
				// width: 352px;
				max-width: 100%;
				height: 360px;
				// max-height: 100%;
				// padding: 12px 0;
				// max-height: 360px; /* Set a maximum height for the image container */
				// overflow: hidden; /* Hide any overflow content */
				// width: 100%;
				// height: 100%;
				position: relative;
				padding: 12px 0;
				&__img {
					// display: block;
					// height: auto;
					// object-fit: cover;
					width: 100%;
					// max-height: 360px;
					height: 100%;
					// max-width: 100%; /* Ensure image doesn't exceed the width of its container */
					// height: auto; /* Maintain aspect ratio */
					object-fit: cover;
				}
			}

			h1,
			p {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&__description {
				margin: 16px 0 16px;
			}
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
