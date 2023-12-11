import { defineStore } from "pinia";
import api from "../api";

export const usePostStore = defineStore("posts", {
	state: () => ({
		posts: {},
	}),
	getters: {
		getPosts(state) {
			const gottenPost = state.posts;
			console.log("gottenPostData:", gottenPost.data);
			return gottenPost.data;
		},
	},
	actions: {
		async getPost() {
			try {
				const postData = await api.get("/posts");
				this.posts = postData;
			} catch (error) {
				throw error;
			}
		},
	},
});
