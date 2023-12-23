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
				<div class="signup-form__input-box__fullName">
					<div class="signup-form__input-box-firstName">
						<input
							type="text"
							class="signup-form__input-field"
							placeholder="First name"
							v-model.trim="form.firstName"
							:class="{ errorBorder: v$.form.firstName.$error }"
						/>
					</div>
					<span v-if="v$.form.firstName.$error" class="signup-form__error-span">
						{{ v$.form.firstName.$errors[0].$message }}
					</span>
					<div class="signup-form__input-box-lastName">
						<input
							type="text"
							class="signup-form__input-field"
							placeholder="Last name"
							v-model.trim="form.lastName"
							:class="{ errorBorder: v$.form.lastName.$error }"
						/>
					</div>
					<span v-if="v$.form.lastName.$error" class="signup-form__error-span">
						{{ v$.form.lastName.$errors[0].$message }}
					</span>
				</div>
				<div class="signup-form__input-box">
					<input
						type="text"
						class="signup-form__input-field"
						placeholder="Email"
						v-model.trim="form.email"
						:class="{ errorBorder: v$.form.email.$error }"
					/>
				</div>
				<span v-if="v$.form.email.$error" class="signup-form__error-span">
					{{ v$.form.email.$errors[0].$message }}
				</span>
				<div class="signup-form__input-box">
					<input
						type="password"
						class="signup-form__input-field"
						placeholder="Password"
						v-model.trim="form.password"
						:class="{ errorBorder: v$.form.password.$error }"
					/>
				</div>
				<span v-if="v$.form.password.$error" class="signup-form__error-span">
					{{ v$.form.password.$errors[0].$message }}
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
// ToDo Create notification service
// ToDo Create loading button component
export default {
	setup() {
		return { v$: useVuelidate(), userStore: useUserStore() };
	},
	data() {
		return {
			form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
			checked: "",
		};
	},
	validations() {
		return {
			form: {
        firstName: { required, minLength: minLength(4) },
        lastName: { required, minLength: minLength(4) },
        email: { required, email },
        password: { required },
      },
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

				await this.userStore.signup(
					this.form
				);

				this.$router.push({ name: "LoginView" });
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
