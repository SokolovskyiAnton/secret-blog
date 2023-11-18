<template>
	<div class="header">
		<div class="header__navbar">
			<div class="header__navbar--container">
				<img
					src="../assets/images/circle-icon.svg"
					alt="Logo of the unlogged user"
					class="header__navbar--logo"
					@click.prevent=""
					v-if="userStore.isAuth"
				/>
				<img
					src="../assets/images/header-unlogged-icon.svg"
					alt="Logo of the unlogged user"
					class="header__navbar--logo"
					@click.prevent="goToHome"
				/>
				<button
					type="button"
					class="header__navbar--login-button"
					@click.prevent="goToLogin"
				>
					Log In
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";

export default {
	setup() {
		return { userStore: useUserStore() };
	},
	methods: {
		goToHome() {
			this.$router.push({ name: "HomeView" });
		},
		goToLogin() {
			this.$router.push({ name: "LoginView" });
		},
	},
};
</script>

<style>
.header__navbar--container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 15px;
}

.header__navbar--logo {
	width: 60px;
	height: 70px;
	padding: 10px 0;
}

.header__navbar--logo:hover {
	cursor: pointer;
}

.header__navbar--login-button {
	padding: 8px 20px;
	border: none;
	border-radius: 19px;
	font-size: 18px;
	background-color: var(--container-color);

	display: inline-block;
	position: relative;
	transition: 0.5s;
}

.header__navbar--login-button:after {
	content: url("../src/assets/images/black-arrow.svg");
	position: absolute;
	opacity: 0;
	top: 12px;
	right: -10px;
	transition: 0.5s;
}

.header__navbar--login-button:hover {
	cursor: pointer;
	padding-right: 30px;
	padding-left: 10px;
}

.header__navbar--login-button:hover:after {
	opacity: 1;
	right: 10px;
}
</style>
