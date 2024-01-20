<template>
	<form @submit.prevent="handleSubmit" class="postForm">
		<h1 class="postForm__greeting">Create your own post!</h1>
		<div class="postForm__addPicture">
			<button type="button" class="postForm__addPicture__btn">
				<u>Add a picture</u>
			</button>
		</div>
		<div class="postForm__item">
			<InputComponent
				v-model="form.title"
				placeholder="Enter the Title"
				:error="validate.form.title.$error && validate.form.title.$touched"
			/>
			<span v-if="validate?.form.title?.$error" class="postForm__item__error">
				{{ validate?.form.title?.$errors[0].$message }}
			</span>
		</div>
		<div class="postForm__item">
			<InputComponent
				v-model="form.fullText"
				placeholder="Enter the Text"
				:error="
					validate.form.fullText.$error && validate.form.fullText.$touched
				"
			/>
			<span
				v-if="validate?.form.fullText?.$error"
				class="postForm__item__error"
			>
				{{ validate?.form.fullText?.$errors[0].$message }}
			</span>
		</div>
		<div class="postForm__item">
			<InputComponent
				v-model="form.description"
				placeholder="Enter the Description"
				:error="
					validate.form.fullText.$error && validate.form.description.$touched
				"
			/>
			<span
				v-if="validate?.form.description?.$error"
				class="postForm__item__error"
			>
				{{ validate?.form.description?.$errors[0].$message }}
			</span>
		</div>
		<div class="postForm__save">
			<button type="submit" class="postForm__save__btn">Save</button>
		</div>
	</form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import InputComponent from "@/components/InputComponent.vue";

const form = ref({
	title: "",
	fullText: "",
	description: "",
});

const validations = computed(() => ({
	form: {
		title: {
			required,
			minLength: minLength(3),
		},
		fullText: {
			required,
			minLength: minLength(10),
		},
		description: {
			required,
			minLength: minLength(10),
		},
	},
}));

const validate = useVuelidate(validations, { form });

const handleSubmit = async () => {
	try {
		await validate.value.$validate();
	} catch (error) {
		console.log(error);
	}
};
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.postForm {
	&__greeting {
		display: flex;
		justify-content: center;
	}
	&__input {
		padding: var(--grid-12);
		border-radius: var(--grid-12);
		border: 2px solid var(--black-color-5);
		width: 100%;
		margin: 16px 0 16px;
	}
	&__addPicture {
		display: flex;
		justify-content: center;
		margin-top: 16px;
		&__btn {
			border: none;
			background: none;
			cursor: pointer;
		}
	}
	&__item {
		margin: 16px 0 16px;
		&__error {
			color: var(--red-color);
			font-size: var(--grid-16);
			display: flex;
			margin-top: var(--grid-8);
		}
	}
	&__save {
		display: flex;
		justify-content: center;
		&__btn {
			font-weight: bold;
			color: var(--green-color-2);
			height: 48px;
			padding: 0 24px;
			border-radius: 24px;
			border: 2px solid var(--green-color-2);
			background-color: transparent;
			box-sizing: border-box;
			&:hover {
				cursor: pointer;
				color: var(--green-color-1);
				border: 2px solid var(--green-color-1);
			}
		}
	}
}
</style>
