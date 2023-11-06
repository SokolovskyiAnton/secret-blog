<template>
	<div class="login-wrapper">
		<div class="login-container">
			<div class="login-header">
				<h1 class="login-header__title">Log In</h1>
			</div>
			<div class="login-form">
				<div class="login-form__input-box">
					<input
						type="text"
						class="login-form__input-field"
						placeholder="First name"
						v-model.trim="firstName"
						:class="{ errorBorder: v$.firstName.$error }"
					/>
				</div>
				<span v-if="v$.firstName.$error" class="login-form__error-span">
					{{ v$.firstName.$errors[0].$message }}
				</span>
				<div class="login-form__input-box">
					<input
						type="text"
						class="login-form__input-field"
						placeholder="Last name"
						v-model.trim="lastName"
						:class="{ errorBorder: v$.lastName.$error }"
					/>
				</div>
				<span v-if="v$.lastName.$error" class="login-form__error-span">
					{{ v$.lastName.$errors[0].$message }}
				</span>
				<div class="login-form__input-box">
					<input
						type="text"
						class="login-form__input-field"
						placeholder="Email"
						v-model.trim="email"
						:class="{ errorBorder: v$.email.$error }"
					/>
				</div>
				<span v-if="v$.email.$error" class="login-form__error-span">
					{{ v$.email.$errors[0].$message }}
				</span>
				<div class="login-form__button-arrow">
					<button
						class="login-form__button login-form__button--blue"
						@click.prevent="handleSubmit"
					>
						Log in
					</button>
				</div>
				<div class="login-footer login-form__input-box">
					<p>
						Don't have an account?
						<span
							><router-link
								class="login-footer__plain-link"
								:to="{ name: 'SignupView' }"
								>Create one</router-link
							></span
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
	setup() {
		return { v$: useVuelidate() };
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			isInvalid: false,
		};
	},
	validations() {
		return {
			firstName: { required },
			lastName: { required },
			email: { required, email },
		};
	},
	methods: {
		handleSubmit() {
			if (this.v$.$invalid) {
				this.v$.$touch();
				return;
			}
		},
	},
};
</script>
