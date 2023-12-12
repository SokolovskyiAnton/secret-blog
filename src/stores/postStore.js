import { defineStore } from "pinia";
import api from "../api";

export const usePostStore = defineStore("posts", {
	state: () => ({
		posts: [],
	}),
	getters: {
		getPosts: ({ posts }) => posts,
	},
	actions: {
		async getPostList() {
			try {
				const res = await api.get("/posts");
				this.posts = res.data;
			} catch (error) {
				throw error;
			}
		},
	},
});
