<template>
	<header-component></header-component>
	<router-view />
</template>

<script>
import router from "./router";
import { useVuelidate } from "@vuelidate/core";
import HeaderComponent from "./components/HeaderComponent.vue";
import { useUserStore } from "./stores/userStore";

export default {
	setup() {
		return { v$: useVuelidate(), userStore: useUserStore() };
	},
	name: "App",
	components: {
		router,
		HeaderComponent,
	},
	async created() {
		const token = localStorage.getItem('authToken');
		if (!token) return
		await this.userStore.getUser();
	}

};
</script>

<style></style>
