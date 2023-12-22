import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import { loginSignupGuard } from "../router/guards";
import { useUserStore } from "../stores/userStore";

const routes = [
	{
		path: "/signup",
		name: "SignupView",
		component: SignupView,
		beforeEnter: loginSignupGuard,
	},
	{
		path: "/login",
		name: "LoginView",
		component: LoginView,
		beforeEnter: loginSignupGuard,
	},
	{
		path: "/profile",
		name: "ProfileView",
		component: ProfileView,
		meta: { auth: true },
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

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	if (to.meta?.auth && !userStore.isAuth) {
		next("/login");
	} else {
		next();
	}
});
export default router;
