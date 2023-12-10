<template>
	<header-view></header-view>
	<router-view />
</template>

<script>
import api from "./api";
import router from "./router";
import { useVuelidate } from "@vuelidate/core";
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
	setup() {
		return { v$: useVuelidate() };	
	},
	name: "App",
	components: {
		router,
		HeaderComponent,
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
