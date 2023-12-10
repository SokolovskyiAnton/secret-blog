import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/signup",
			name: "SignupView",
			component: SignupView,
		},
		{
			path: "/login",
			name: "LoginView",
			component: LoginView,
		},
		{
			path: "/home",
			name: "HomeView",
			component: HomeView,
		},
		{ path: "/", component: HomeView, alias: "/home" },
	],
});

export default router;
