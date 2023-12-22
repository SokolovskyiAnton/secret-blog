import { useUserStore } from "../stores/userStore";

// export const profileGuard = (to, from, next) => {
// 	const userStore = useUserStore();

// 	if (userStore.isAuth) {
// 		next();
// 	} else {
// 		next("/");
// 	}
// };
export const loginSignupGuard = (to, from, next) => {
	const userStore = useUserStore();

	if (userStore.isAuth) {
		next(from);
	} else {
		next();
	}
};
