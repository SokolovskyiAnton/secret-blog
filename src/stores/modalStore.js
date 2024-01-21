import { defineStore } from "pinia";

const basicState = { component: null, props: {} };

export const useModalStore = defineStore("modal-store", {
	state: () => ({ modalState: basicState }),
	actions: {
		openModal(payload) {
			const { props, component } = payload;

			const body = document.body;

			if (body) body.style.overflow = "hidden";

			this.modalState = { component, props: props || {} };
		},

		closeModal() {
			this.modalState = basicState;

			const body = document.body;

			if (body) body.style.overflow = "auto";
		},
	},
	getters: {},
});
