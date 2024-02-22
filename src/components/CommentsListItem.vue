<template>
	<div class="comments">
		<p class="comments__nickname">
			{{ commentsDataProp.commentedBy.nickname }}
		</p>
		<p class="comments__text">{{ commentsDataProp.text }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	commentsDataProp: {
		type: Object,
		default: () => {},
	},
});
</script>

<style lang="scss">
.comments {
	display: flex;
    gap: 4px;
	&__nickname {
		font-weight: bold;
	}
}
</style>
