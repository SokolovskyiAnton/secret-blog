<template>
	<div>
		<router-link :to="{ name: 'SignUp' }">Sign Up</router-link> |
		<router-link :to="{ name: 'LogIn' }">Log In</router-link> 
	</div>
	<router-view />

</template>

<script>
import api from './api'
import router from './router';

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
    components: { router }
};
</script>

<style></style>
