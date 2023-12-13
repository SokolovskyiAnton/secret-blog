import { defineStore } from "pinia";
import api from "../api";

export const usePostStore = defineStore("posts", {
	state: () => ({
		posts: [],
		isLoaded: false,
	}),
	getters: {
		getPosts: ({ posts }) => posts,
	},
	actions: {
		async getPostList() {
			try {
				this.posts = (await api.get("/posts")).data;
			} catch (error) {
				throw error;
			}
		},
	},
});
