<template>
	<header-component></header-component>
	<router-view />
</template>

<script>
import router from "./router";
import HeaderComponent from "./components/HeaderComponent.vue";
import { useUserStore } from "./stores/userStore";

export default {
	setup() {
		return { userStore: useUserStore() };
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
