<template>
	<div class="post">
		<div class="post__content">
			<h1>{{ post.title }}</h1>
			<img
				src="../assets/images/post-picture.svg"
				alt="mountains"
			/>
			<div class="post__content__description">
				<p>{{ post.description }}</p>
			</div>
			<small>{{ formattedDate }}</small>
		</div>
	</div>
</template>

<script setup>
import { useDateFormat } from "@/composables/date";
import { computed } from "vue";

const props = defineProps({
	post: {
		type: Object,
		required: true,
	},
});

const { format } = useDateFormat();

const formattedDate = computed(() => format(props.post.dateCreated));
</script>

<style lang="scss">
.post {
	display: flex;
	justify-content: center;
	margin-right: 24px;
	margin-top: 24px;
	&__content {
		&__description {

		}
	}
}
</style>
