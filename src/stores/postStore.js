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
				this.posts = response.posts;
			} catch (error) {
				throw error;
			}
		},
		async createPost(formData) {
			try {
				await api.post("/posts", formData);
			} catch (error) {
				throw error;
			}
		},
		async like(postId) {
			try {
				await api.post(`/posts/like/${postId}`);
			} catch (error) {
				throw error;
			}
		},
		async unlike(postId) {
			try {
				await api.delete(`/posts/like/${postId}`);
			} catch (error) {
				throw error;
			}
		},
	},
});
