import { describe, it, expect, forEach, beforeEach, vitest } from "vitest";
import PostFormComponent from "@/components/PostFormComponent.vue";
import { usePostStore } from "../../stores/postStore";
import { flushPromises, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { VuelidatePlugin } from "@vuelidate/core";

describe("PostFormComponent", () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = mount(PostFormComponent, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vitest.fn,
					}),
					VuelidatePlugin,
				],
			},
		});
	});

	it("if validation works", async () => {
		const postStore = usePostStore();

		const button = wrapper.find("button");
		
        await button.trigger("submit");

		// Wait for Vue to process the click event and update the component state
		await wrapper.vm.$nextTick();

		await flushPromises();

		const inputComponentError = wrapper.find("#postFormInput1");

		const classes = inputComponentError.classes();

		expect(classes).toContain("InputComponent__error");
	});
});
