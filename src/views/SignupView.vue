<template>
	<div class="signup-wrapper">
		<div class="signup-container">
			<div class="signup-header">
				<h1 class="signup-header__title">Create account</h1>
				<span class="signup-header__subtitle"
					>Already have an account?
					<router-link
						class="signup-header__plain-link"
						:to="{ name: 'LoginView' }"
						>Log In</router-link
					>
				</span>
			</div>
			<div class="signup-form">
				<div class="signup-form__input-box">
					<input
						type="text"
						class="signup-form__input-field"
						placeholder="Username"
						v-model.trim="userName"
						:class="{ errorBorder: v$.userName.$error }"
					/>
				</div>
				<span v-if="v$.userName.$error" class="signup-form__error-span">
					{{ v$.userName.$errors[0].$message }}
				</span>
				<div class="signup-form__input-box">
					<input
						type="text"
						class="signup-form__input-field"
						placeholder="Email"
						v-model.trim="email"
						:class="{ errorBorder: v$.email.$error }"
					/>
				</div>
				<span v-if="v$.email.$error" class="signup-form__error-span">
					{{ v$.email.$errors[0].$message }}
				</span>
				<div class="signup-form__input-box">
					<input
						type="password"
						class="signup-form__input-field"
						placeholder="Password"
						v-model.trim="password"
						:class="{ errorBorder: v$.password.$error }"
					/>
				</div>
				<span v-if="v$.password.$error" class="signup-form__error-span">
					{{ v$.password.$errors[0].$message }}
				</span>
				<div class="signup-form__button--arrow">
					<button
						class="signup-form__button signup-form__button--blue"
						@click.prevent="handleSubmit"
					>
						Sign up
					</button>
					<img
						src="../assets/images/arrow.svg"
						alt="Arrow to the right"
						class="signup-form__button--arrow-right-icon"
					/>
				</div>
				<div class="signup-footer signup-form__input-box">
					<input
						type="checkbox"
						class="signup-footer__checkbox-terms"
						v-model.trim="checked"
					/>
					<p class="signup-footer__terms-agree">
						I have read and agree to
						<span class="signup-footer__terms-of-service"
							>Terms of Service</span
						>
					</p>
				</div>
				<span v-if="v$.checked.$error" class="signup-form__error-span">
					Please read and agree to Terms of Service
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useUserStore } from "@/stores/userStore";

export default {
	setup() {
		return { v$: useVuelidate(), userStore: useUserStore() };
	},
	data() {
		return {
			userName: "",
			email: "",
			password: "",
			checked: "",
		};
	},
	validations() {
		return {
			userName: { required, minLength: minLength(4) },
			email: { required, email },
			password: { required },
			checked: { sameAs: sameAs(true) },
		};
	},
	methods: {
		async handleSubmit() {
			try {
				if (this.v$.$invalid) {
					this.v$.$touch();
					return;
				}

				await this.userStore.signup(this.email, this.password, this.userName);

				this.$router.push({ name: "LoginView" });
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
