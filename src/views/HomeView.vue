<template>
	<h1>Home page</h1>
</template>

<script>
import { usePostStore } from "../stores/postStore";

export default {
    setup() {
        return { postStore: usePostStore()}
    },
	async mounted() {
		await this.postStore.getPost();
	},
};
</script>
