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

	it("render correctly", () => {
		expect(wrapper).toBeDefined();
	});

	it("check title", () => {
		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe("Title");
	});

	it("check description", () => {
		const desc = wrapper.find("p");
		expect(desc.text()).toEqual("Description");
	});

	it("check description", () => {
		const date = wrapper.find("small");
		expect(date.text()).toBe(
			new Date("2023-12-10T18:24:43.907Z").toLocaleDateString()
		);
	});
});

