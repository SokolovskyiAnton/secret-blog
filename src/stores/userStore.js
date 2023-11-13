import { defineStore } from "pinia";
import api from "../api";

export const useUserStore = defineStore("users", {
	state: () => ({
		firstName: "",
		lastName: "",
		email: "",
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
			await api.get("/auth/user");
		},
	},
});
