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
			} catch (error) {
				console.log(error);
			}
		},
		async signup(email, password, name) {
			try {
				const response = await api.post("/users/", {
					email,
					password,
					name,
				});

				// if request status:200, return true
				return response.status === 200;
			} catch (error) {
				console.log(error);
			}
		},
	},
});
