import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import { profileGuard, loginGuard, signupGuard } from "../router/guards";

const routes = [
	{
		path: "/signup",
		name: "SignupView",
		component: SignupView,
		beforeEnter: signupGuard,
	},
	{
		path: "/login",
		name: "LoginView",
		component: LoginView,
		beforeEnter: loginGuard,
	},
	{
		path: "/profile",
		name: "ProfileView",
		component: ProfileView,
		beforeEnter: profileGuard,
	},
	{
		path: "/",
		component: HomeView,
		name: "HomeView",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
