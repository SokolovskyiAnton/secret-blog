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
						placeholder="Email"
						v-model.trim="email"
						:class="{ errorBorder: v$.email.$error }"
					/>
				</div>
				<span v-if="v$.email.$error" class="login-form__error-span">
					{{ v$.email.$errors[0].$message }}
				</span>
				<div class="login-form__input-box">
					<input
						type="password"
						class="login-form__input-field"
						placeholder="Password"
						v-model.trim="password"
						:class="{ errorBorder: v$.password.$error }"
					/>
				</div>
				<span v-if="v$.password.$error" class="login-form__error-span">
					{{ v$.password.$errors[0].$message }}
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
import { useUserStore } from "@/stores/userStore";

export default {
	setup() {
		return { v$: useVuelidate(), userStore: useUserStore() };
	},
	data() {
		return {
			email: "",
			password: "",
			isInvalid: false,
		};
	},
	validations() {
		return {
			email: { required, email },
			password: { required },
		};
	},
	methods: {
		async handleSubmit() {
			try {
				if (this.v$.$invalid) {
					this.v$.$touch();
					return;
				} 

				const response = await this.userStore.login(this.email, this.password);
				console.log(response);
			} catch (error) {
				console.log("The user does not exist!");
			}
		},
	},
};
</script>
