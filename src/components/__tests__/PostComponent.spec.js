import { describe, it, expect, beforeEach } from "vitest";
import PostComponent from "@/components/PostComponent.vue";
import { mount } from "@vue/test-utils";

const post = {
	title: "Title",
	description: "Description",
	dateCreated: "2023-12-10T18:24:43.907Z",
};
describe("PostComponent", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(PostComponent, {
			props: {
				post,
			},
		});
	});
	it("check title", () => {
		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe(post.title);
	});

	it("check description", () => {
		const desc = wrapper.find("p");
		expect(desc.text()).toEqual(post.description);
	});

	it("check date format", () => {
		const date = wrapper.find("small");
		expect(date.text()).toBe(
			new Date(post.dateCreated).toLocaleDateString()
		);
	});
});

