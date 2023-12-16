import { defineStore } from "pinia";
import api from "../api";

export const useUserStore = defineStore("users", {
	state: () => ({
		users: {},
		isAuth: false,
	}),
	actions: {
		async login(email, password) {
			try {
				const token = (
					await api.post("/auth/", {
						email,
						password,
					})
				).data.token;

				localStorage.setItem("authToken", token);
			} catch (error) {
				throw error;
			}
		},
		async signup(email, password, name) {
			try {
				await api.post("/users/", {
					email,
					password,
					name,
				});
			} catch (error) {
				throw error;
			}
		},
		async getUser() {
			const userData = await api.get("/auth/user");
			this.users = userData;	
			// this.isAuth = true;
		},
		logout() {
			debugger
			this.isAuth = false;
			localStorage.removeItem("authToken");
		}
	},
});



