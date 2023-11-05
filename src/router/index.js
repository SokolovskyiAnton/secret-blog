import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

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
		{ path: "/", component: SignupView, alias: "/signup" },
	],
});

export default router;
