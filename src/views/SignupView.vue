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
						:class="{ errorBorder: shouldApplyErrorBorder('userName') }"
					/>
				</div>
				<span v-if="v$.userName.$error" class="signup-form__error-span">
					{{ v$.userName.$errors[0].$message }}
				</span>
				<div class="signup-form__input-box signup-form__input-box--first-last-name-input">
					<div class="signup-form__input-error-box">
						<input
							type="text"
							class="signup-form__input-field signup-form__input-field--firstname-input"
							placeholder="First name"
							v-model.trim="firstName"
							:class="{ errorBorder: shouldApplyErrorBorder('firstName') }"
						/>
						<span
							v-if="v$.firstName.$error"
							class="signup-form__error-span signup-form__error-span--first-last-name"
						>
							{{ v$.firstName.$errors[0].$message }}
						</span>
					</div>
					<div class="signup-form__input-error-box">
						<input
							type="text"
							class="signup-form__input-field signup-form__input-field--firstname-input"
							placeholder="Last name"
							v-model.trim="lastName"
							:class="{ errorBorder: shouldApplyErrorBorder('lastName') }"
						/>
						<span
							v-if="v$.lastName.$error"
							class="signup-form__error-span signup-form__error-span--first-last-name"
						>
							{{ v$.lastName.$errors[0].$message }}
						</span>
					</div>
				</div>
				<div class="signup-form__input-box">
					<input
						type="text"
						class="signup-form__input-field"
						placeholder="Email"
						v-model.trim="email"
						:class="{ errorBorder: shouldApplyErrorBorder('email') }"
					/>
				</div>
				<span v-if="v$.email.$error" class="signup-form__error-span">
					{{ v$.email.$errors[0].$message }}
				</span>
				<div class="signup-form__button--arrow">
					<button class="signup-form__button signup-form__button--blue" @click.prevent="signUp">
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
						<span class="signup-footer__terms-of-service">Terms of Service</span>
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

export default {
	setup() {
		return { v$: useVuelidate() };
	},
	data() {
		return {
			userName: "",
			firstName: "",
			lastName: "",
			email: "",
			minLength: "",
			checked: "",
			isInvalid: false,
		};
	},
	validations() {
		return {
			userName: { required, minLength: minLength(4) },
			firstName: { required },
			lastName: { required },
			email: { required, email },
			checked: { sameAs: sameAs(true) },
		};
	},
	computed: {
		shouldApplyErrorBorder() {
			return (field) => {
				return this.isInvalid && this.v$[field].$error;
			};
		},
	},
	methods: {
		signUp() {
			this.v$.$validate();
			if (!this.v$.$error) {
				this.isInvalid = false;
			} else {
				this.isInvalid = true;
			}
			console.log(this.isInvalid);
		},
	},
};
</script>
