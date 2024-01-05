<template>
	<div class="signup">
		<div class="signup__content">
			<div class="signup__content__header">
				<h1 class="signup__content__header__title">Create account</h1>
				<span class="signup__content__header__subtitle"
					>Already have an account?
					<router-link
						class="signup__content__header__subtitle__link"
						:to="{ name: 'LoginView' }"
						>Log In</router-link
					>
				</span>
			</div>
			<form @submit.prevent="handleSubmit" class="signup__content__form">
				<div class="signup__content__form__fullName">
					<div class="signup__content__form__fullName__firstName">
						<input
							type="text"
							class="signup__content__form__fullName__firstName__input"
							placeholder="First name"
							v-model.trim="form.firstName"
							:class="{
								'signup__content__form__fullName__firstName__input-error':
									v$.form.firstName.$error,
							}"
						/>
						<span
							v-if="v$.form.firstName.$error"
							class="signup__content__form__fullName__firstName__error"
						>
							{{ v$.form.firstName.$errors[0].$message }}
						</span>
					</div>
					<div class="signup__content__form__fullName__lastName">
						<input
							type="text"
							class="signup__content__form__fullName__lastName__input"
							placeholder="Last name"
							v-model.trim="form.lastName"
							:class="{
								'signup__content__form__fullName__lastName__input-error':
									v$.form.lastName.$error,
							}"
						/>
						<span
							v-if="v$.form.lastName.$error"
							class="signup__content__form__fullName__lastName__error"
						>
							{{ v$.form.lastName.$errors[0].$message }}
						</span>
					</div>
				</div>
				<div class="signup__content__form__item">
					<input
						type="text"
						class="signup__content__form__item__input"
						placeholder="Email"
						v-model.trim="form.email"
						:class="{
							'signup__content__form__item__input-error': v$.form.email.$error,
						}"
					/>
					<span
						v-if="v$.form.email.$error"
						class="signup__content__form__item__error"
					>
						{{ v$.form.email.$errors[0].$message }}
					</span>
				</div>

				<div class="signup__content__form__item">
					<input
						type="password"
						class="signup__content__form__item__input"
						placeholder="Password"
						v-model.trim="form.password"
						:class="{
							'signup__content__form__item__input-error':
								v$.form.password.$error,
						}"
					/>
					<span
						v-if="v$.form.password.$error"
						class="signup__content__form__item__error"
					>
						{{ v$.form.password.$errors[0].$message }}
					</span>
				</div>

				<div class="signup__content__form__submit">
					<button
						class="signup__content__form__submit__btn"
						@click.prevent="handleSubmit"
					>
						Sign up
					</button>
					<img
						src="../assets/images/arrow.svg"
						alt="Arrow to the right"
						class="signup__content__form__submit__arrow"
					/>
				</div>
				<div class="signup__content__form__footer">
					<div class="signup__content__form__footer__item">
						<input
							type="checkbox"
							class="signup__content__form__footer__item__checkbox"
							v-model.trim="checked"
						/>
						<p class="signup__content__form__footer__item__terms">
							I have read and agree to
							<span class="signup__content__form__footer__terms__link"
								>Terms of Service</span
							>
						</p>
					</div>
					<span
						v-if="v$.checked.$error"
						class="signup__content__form__footer__error"
					>
						Please read and agree to Terms of Service
					</span>
				</div>
			</form>
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

				await this.userStore.signup(this.form);

				this.$router.push({ name: "LoginView" });
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style lang="scss">
@mixin inputStyles {
	width: 100%;
	height: 46px;
	padding: 0 12px;
	border-radius: 12px;
	border: none;
	background-color: var(--input-background-color);
	box-sizing: border-box;
}

@mixin errorStyles {
	color: var(--red-color);
	font-size: 16px;
	display: flex;
	margin-top: 8px;
}

@mixin borderStyle {
	border: 1px solid var(--red-color);
}

@mixin topMargin {
	margin-top: 16px;
}

.signup {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	background: var(--background-gradient);

	&__content {
		border: none;
		border-radius: 24px;
		padding: 72px 96px 96px;
		background-color: var(--content-color);

		&__header {
			display: flex;
			flex-direction: column;
			align-items: center;

			&__title {
				color: var(--title-color);
				font-size: 36px;
				font-weight: bold;
			}
			&__subtitle {
				&__link {
					text-decoration: none;
					color: var(--blue-color);
					cursor: pointer;
				}
			}
		}

		&__form {
			&__fullName {
				display: flex;
				margin-top: 16px;

				&__firstName,
				&__lastName {
					&__input {
						@include inputStyles;
						&:placeholder-shown {
							font-style: italic;
						}
						&-error {
							@include borderStyle;
						}
					}
					&__error {
						@include errorStyles;
					}
				}
			}

			&__item {
				@include topMargin;
				&__input {
					@include inputStyles;
					&:placeholder-shown {
						font-style: italic;
					}
					&-error {
						@include borderStyle;
					}
				}
				&__error {
					@include errorStyles;
				}
			}

			&__submit {
				position: relative;
				margin-top: 16px;
				&__btn {
					background-color: var(--blue-color);
					color: var(--content-color);
					padding: 12px;
					border-radius: 12px;
					width: 100%;
					border: none;
					cursor: pointer;
				}
				&__arrow {
					width: 46px;
					height: 56px;
					position: absolute;
					top: -4px;
					left: -12px;
				}
			}

			&__footer {
				@include topMargin;

				&__item {
					display: flex;

					&__checkbox {
						margin-right: 4px;
						&:hover {
							cursor: pointer;
						}
					}
				}
				&__terms {
					&__link {
						color: var(--blue-color);
					}
				}
				&__error {
					@include errorStyles;
				}
			}
		}
	}
}

@media (max-width: 375px) {
	.signup__content__form__fullName {
		display: flex;
		flex-direction: column;
	}
	.signup__content__form__fullName div {
		margin-top: 18px;
	}
}

@media (max-width: 425px) {
	.signup-content {
		padding: 36px;
	}
}

@media (max-width: 768px) {
	.signup {
		width: 100%;
		height: 100%;
	}
}
</style>
