<template>
	<div class="signup-wrapper">
		<div class="signup-container">
			<div class="signup-header">
				<h1 class="create-account-title">Create account</h1>
				<span class="create-account-subtitle"
					>Already have an account?
					<router-link class="plain-link" :to="{ name: 'LoginView' }"
						>Log In</router-link
					>
				</span>
			</div>
			<div class="input-box">
				<input
					type="text"
					class="input-field"
					placeholder="Username"
					v-model.trim="userName"
					:class="{ errorBorder: shouldApplyErrorBorder('userName') }"
				/>
			</div>
			<span v-if="v$.userName.$error" class="error-span">
				{{ v$.userName.$errors[0].$message }}
			</span>
			<div class="input-box first-last-name-input">
				<input
					type="text"
					class="input-field firstname-input"
					placeholder="First name"
					v-model.trim="firstName"
					:class="{ errorBorder: shouldApplyErrorBorder('firstName') }"
				/>

				<input
					type="text"
					class="input-field"
					placeholder="Last name"
					v-model.trim="lastName"
					:class="{ errorBorder: shouldApplyErrorBorder('lastName') }"
				/>
			</div>
			<div
				class="error-span-last-first-name"
				v-if="v$.firstName.$error || v$.lastName.$error"
			>
				<span v-if="v$.firstName.$error" class="error-span">
					{{ v$.firstName.$errors[0].$message }}
				</span>
				<span v-if="v$.lastName.$error" class="error-span">
					{{ v$.lastName.$errors[0].$message }}
				</span>
			</div>
			<div class="input-box">
				<input
					type="text"
					class="input-field"
					placeholder="Email"
					v-model.trim="email"
					:class="{ errorBorder: shouldApplyErrorBorder('email') }"
				/>
			</div>
			<span v-if="v$.email.$error" class="error-span">
				{{ v$.email.$errors[0].$message }}
			</span>
			<div class="button-arrow">
				<button class="signup-button button-blue" @click.prevent="signUp">
					Sign up
				</button>
				<img
					src="../assets/images/arrow.svg"
					alt="Arrow to the right"
					class="arrow-right-icon"
				/>
			</div>
			<div class="checkbox-terms-agree input-box">
				<input type="checkbox" class="checkbox-terms" v-model.trim="checked" />
				<p class="terms-agree">
					I have read and agree to
					<span class="terms-of-service">Terms of Service</span>
				</p>
			</div>
			<span v-if="v$.checked.$error" class="error-span">
				Please read and agree to Terms of Service
			</span>
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
				alert("You successfully signed up!");
			} else {
				this.isInvalid = true;
			}
			console.log(this.isInvalid);
		},
	},
};
</script>
