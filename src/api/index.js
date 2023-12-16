import axios from "axios";
import router from "../router/index";
import { useUserStore } from "../stores/userStore";

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.data.statusCode === 401) {
			const userStore = useUserStore();
			userStore.logout();
			router.push("/login");
		}
		return Promise.reject(error);
	}
);


export default api;
