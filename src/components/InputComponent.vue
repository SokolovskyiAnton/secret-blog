<template>
	<!-- <label :class="{ smallLabel: isInputFocused }">{{ label }}</label> -->
	<input
        class="InputComponent"
		:style="styles"
        :class="classes"
		:value="modelValue"
		:disabled="disabled"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script setup>
import { ref, computed } from "vue";



defineEmits(["update:modelValue", "close"]);

const props = defineProps({
	color: {
		type: String,
		default: "var(--black-color-2)",
	},
	bgColor: {
		type: String,
		default: "transparent",
	},
	label: {
		type: String,
		default: "",
	},
	placeholder: {
		type: String,
		default: "",
	},
	modelValue: {
		type: [String, Number, null],
		required: true,
	},
	disabled: {
		type: Boolean,
		default: false,
    },
    borderless: {
        type: Boolean,
		default: false,
    },
    password: {
        type: String,
        default: "",
    }
});

const styles = computed(() => {
	return {
		color: props.color,
		backgroundColor: props.bgColor,
		
	};
});

const classes = computed(() => {
    return [
        props.borderless ? "InputComponent__borderless" : "",

    ];
})
</script>

<style lang="scss" scoped>
.InputComponent {
	padding: 12px;
	border-radius: 12px;
	border: 2px solid var(--black-color-5);
    
	width: 100%;
    &__borderless {
        border: none;
    }
}

.smallLabel {
	font-size: 0.8em;
	position: absolute;
	top: 5px;
	left: 5px;
}


</style>
