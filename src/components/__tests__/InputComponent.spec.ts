import { describe, it, expect, beforeEach } from "vitest";
import InputComponent from "@/components/InputComponent.vue";
import { mount } from "@vue/test-utils";


const input = {
	color: "colorrrr",
	bgColor: "bground",
	disabled: false,
	error: false,
};

describe("InputComponent", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(InputComponent, {
            props: {
                color: input.color,
                bgColor: input.bgColor,
                disabled: input.disabled,
                error: input.error,
            },
        });
    });

    it("check for color", () => {
        const inputElement = wrapper.find(".InputComponent");

        const styleAttribute = inputElement.attributes("style");
        expect(styleAttribute).not.toBeDefined();

        if (styleAttribute) {
            expect(styleAttribute).toContain("color: var(--black-color-2)");
        }
    });

    it("check for bgColor", () => {
        const inputElement = wrapper.find(".InputComponent");
        const styleAttribute = inputElement.attributes("style");

        if (styleAttribute)
            expect(styleAttribute).toContain("bgColor: var(--white-color-2");
    });

    it("check for disabled", () => {
        const inputElement = wrapper.find(".InputComponent");
        const disabledAttribute = inputElement.attributes("disabled");

        if (disabledAttribute) expect(disabledAttribute.toBe(false));
    });

    it("check for no error", () => {
        const inputElement = wrapper.find(".InputComponent");
        expect(inputElement.classes("InputComponent__error")).toBe(false);
    });
})