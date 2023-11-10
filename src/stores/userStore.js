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
				debugger;
				const token = (
					await api.post("/auth/", {
						email,
						password,
					})
				).data.token;
				return token;
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
		async getUser(token) {
			await api.get("/auth/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
	},
});
