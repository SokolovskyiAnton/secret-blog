import { defineStore } from "pinia";
import api from "../api";

export const useUserStore = defineStore("users", {
	state: () => ({
		user: {},
		isAuth: false,
	}),
	getters: {
		getUserData: (state) => state.user
	},
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
		async signup(email, password) {
			try {
				await api.post("/users/", {
					email,
					password,
					
				});
			} catch (error) {
				throw error;
			}
		},
		async getUser() {
			const userData = (await api.get("/auth/user")).data;
			console.log("userData:", userData);
			this.user = userData;
			this.isAuth = true;
			
		},
		logout() {
			this.isAuth = false;
			localStorage.removeItem("authToken");
		}
	},
});



