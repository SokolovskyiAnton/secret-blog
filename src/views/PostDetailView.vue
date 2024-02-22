<template>
	<div v-if="loading">
		<h1>Loading</h1>
	</div>
	<div v-else class="post">
		<div v-if="postData">
			<div class="post__main">
				<div class="post__main__picture">
					<img
						:src="postPicture"
						alt="mountains"
						class="post__main__picture__img"
					/>
				</div>
				<h1 class="mb-8">{{ postData.title }}</h1>
				<p class="mb-8">{{ postData.description }}</p>
				<p class="mb-8">Posted by: {{ postData.postedBy.nickname }}</p>
			</div>
			<div class="post__footer">
				<small>{{ formattedDate }}</small>
			</div>

			<CreateComment @createComment="createComment" />

			<CommentsList :commentsDataProp="commentsData.comments" />
		</div>

		<div v-else>
			<h1>Post not found</h1>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { usePostStore } from "../stores/postStore";
import { useCommentStore } from "../stores/commentStore";
import { onMounted, ref, computed } from "vue";
import { useDateFormat } from "@/composables/date";
import CreateComment from "@/components/CreateComment.vue";
import CommentsList from "@/components/CommentsList.vue";

const route = useRoute();
const postId = route.params.postId;
const postStore = usePostStore();
const commentStore = useCommentStore();
const postData = ref(null);
const commentsData = ref(null);
const loading = ref(true);

// 1.виводимо title, description, img, fullText, creatorName, dateCreated  ( підказка в PostComponent )
// 2. блок з коментарями. можуть писати тільки залогінені юзери. якщо ні - комент залогіньтесь. коментар створюється за допомогоаю emit
// cтворити компонент CreateComment, по кліку - emit

onMounted(async () => {
	try {
		loading.value = true;

		postData.value = await postStore.getPostById(postId);
		commentsData.value = await commentStore.getCommentsByPostId(postId);
	} catch (error) {
		console.error(error);
	} finally {
		loading.value = false;
	}
});

const createComment = async (message) => {
	const data = {
		postId,
		payload: {
			text: message,
		},
	};
	await commentStore.createPostComment(data);
};

const postPicture = computed(() => {
	return !postData.value.image ||
		postData.value.image.toLowerCase().endsWith(".svg")
		? "src/assets/images/post-picture.svg"
		: postData.value.image;
});

const { format } = useDateFormat();

const formattedDate = computed(() => format(postData.value.dateCreated));
</script>

<style lang="scss"></style>
