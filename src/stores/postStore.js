import { defineStore } from "pinia";
import api from "../api";

export const usePostStore = defineStore("posts", {
	state: () => ({
		posts: [],
		isLoaded: false,
	}),
	getters: {
		postsList: ({ posts }) => posts,
	},
	actions: {
		async getPosts() {
			try {
				const response = (await api.get("/posts")).data;
				this.posts = response.posts
			} catch (error) {
				throw error;
			}
		},
	},
});
