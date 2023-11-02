<template>
	<ul v-for="post in posts" :key="post.id">
		<li>{{ post.title }} {{ post.description }}</li>
		<li>{{ post.dateCreated }}</li>
	</ul>
</template>

<script>
import api from './api'

export default {
	data() {
		return {
      posts: [],
		};
	},
	async mounted() {
    const response = (await api.get('/posts')).data;
    this.posts = response.data;      
	},
};
</script>

<style></style>
