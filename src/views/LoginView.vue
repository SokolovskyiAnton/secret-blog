<template>
	<div class="login-wrapper">
		<div class="login-container">
			<div class="login-header">
				<h1 class="login-title">Log In</h1>
			</div>
			<div class="input-box">
				<input
					type="text"
					class="input-field"
					placeholder="First name"
					v-model.trim="firstName"
					:class="{ errorBorder: shouldApplyErrorBorder('firstName') }"
				/>
			</div>
			<span v-if="v$.firstName.$error" class="error-span">
				{{ v$.firstName.$errors[0].$message }}
			</span>
			<div class="input-box">
				<input
					type="text"
					class="input-field"
					placeholder="Last name"
					v-model.trim="lastName"
					:class="{ errorBorder: shouldApplyErrorBorder('lastName') }"
				/>
			</div>
			<span v-if="v$.lastName.$error" class="error-span">
				{{ v$.lastName.$errors[0].$message }}
			</span>
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
				<button class="login-button button-blue" @click.prevent="logIn">
					Log in
				</button>
			</div>
			<div class="checkbox-terms-agree input-box">
				<p class="terms-agree">
					Don't have an account?
					<span class="create-one"
						><router-link class="plain-link" :to="{ name: 'SignupView' }"
							>Create one</router-link
						></span
					>
				</p>
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
	computed: {
		shouldApplyErrorBorder() {
			return (field) => {
				return this.isInvalid && this.v$[field].$error;
			};
		},
	},
	methods: {
		logIn() {
			this.v$.$validate();
			if (!this.v$.$error) {
				alert("You successfully logged in!");
				this.isInvalid = false;
			} else {
				this.isInvalid = true;
			}
		},
	},
};
</script>
