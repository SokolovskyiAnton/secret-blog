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
				const response = await api.post("/auth/", {
					email,
					password,
				});

				return response.data.token;
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
	},
});
