<template>
	<div class="login">
		<div class="login__login-content">
			<div class="login__login-content__login-header">
				<h1 class="login__login-content__login-header__title">Log In</h1>
			</div>
			<div class="login__login-content__login-form">
				<div class="login__login-content__login-form__input-box">
					<input
						autofill
						type="text"
						class="login__login-content__login-form__input-box__input-field"
						placeholder="Email"
						v-model.trim="email"
						:class="{ errorBorder: v$.email.$error }"
					/>
				</div>
				<span v-if="v$.email.$error" class="login-form__error-span">
					{{ v$.email.$errors[0].$message }}
				</span>
				<div class="login__login-content__login-form__input-box">
					<input
						type="password"
						class="login__login-content__login-form__input-box__input-field"
						placeholder="Password"
						v-model.trim="password"
						:class="{ errorBorder: v$.password.$error }"
						@keyup.enter="handleSubmit"
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

				await this.userStore.login(this.email, this.password);

				await this.userStore.getUser();

				this.$router.push({ name: "HomeView" });
			} catch (error) {
				console.log("The user does not exist!");
			}
		},
	},
};
</script>

<style lang="scss">
%login-inputs-styles {
	&__input-box {
		margin: 24px 0;
		display: flex;

		&__input-field {
			width: 100%;
			height: 46px;
			padding: 0 12px;
			border-radius: 12px;
			border: none;
			background-color: var(--input-background-color);
			box-sizing: border-box;
		}
	}
}

.login {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	background: var(--background-gradient);

	&__login-content {
		border: none;
		border-radius: 24px;
		padding: 72px 96px 96px;
		background-color: var(--content-color);

		&__login-header {
			display: flex;
			flex-direction: column;
			align-items: center;

			&__title {
				color: var(--title-color);
				font-size: 36px;
				font-weight: bold;
			}
		}

		&__login-form {
			@extend %login-inputs-styles;
			
		}
	}
}

// .login-header__title {
// 	color: var(--title-color);
// 	font-size: 36px;
// 	font-weight: bold;
// }

// .login {
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	width: 100%;
// 	min-height: 100vh;
// 	background: var(--background-gradient);
// }

// .login-content {
// 	border: none;
// 	border-radius: 24px;
// 	padding: 72px 96px 96px;
// 	background-color: var(--content-color);
// }

// .login-header {
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// }

// .login-form__input-box {
// 	margin: 24px 0;
// 	display: flex;
// }

.login-form__input-field,
.login-form__button {
	width: 100%;
	height: 46px;
	padding: 0 12px;
	border-radius: 12px;
	border: none;
	background-color: var(--input-background-color);
	box-sizing: border-box;
}

.login-form__button--blue {
	background-color: var(--blue-color);
	color: var(--content-color);
}

.login-form__button {
	position: relative;
	margin-top: 16px;
}

.login-form__button--blue:hover {
	cursor: pointer;
}

input:placeholder-shown {
	font-style: italic;
}

.login-footer__create-one {
	color: var(--blue-color);
}

.login-footer__create-one:hover {
	cursor: pointer;
}

.login-footer__plain-link {
	text-decoration: none;
	color: var(--blue-color);
	cursor: pointer;
}

.login-form__error-span {
	color: var(--red-color);
	font-size: 16px;
	display: flex;
	margin-top: -16px;
}

.errorBorder {
	border: 1px solid var(--red-color);
}

@media (max-width: 425px) {
	.login-content {
		padding: 32px;
	}
}

@media (max-width: 768px) {
	.login {
		width: 100%;
		height: 100%;
	}
}
</style>
