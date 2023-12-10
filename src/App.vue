<template>
	<header-view></header-view>
	<router-view />
</template>

<script>
import api from "./api";
import router from "./router";
import { useVuelidate } from "@vuelidate/core";
import HeaderView from "./components/HeaderView.vue";

export default {
	setup() {
		return { v$: useVuelidate() };	
	},
	name: "App",
	components: {
		router,
		HeaderView,
	},
	data() {
		return {
			posts: [],

		};
	},
	async mounted() {
		const response = (await api.get("/posts")).data;
		this.posts = response.data;
	},
};
</script>

<style></style>
