import { createRouter, createWebHistory } from "vue-router";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/signup",
			name: "SignUp",
			component: SignUp,
		},
		{
			path: "/login",
			name: "LogIn",
			component: LogIn,
		},
	],
});

export default router;
