<template>
	<header-component></header-component>
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
};
</script>

<style></style>
