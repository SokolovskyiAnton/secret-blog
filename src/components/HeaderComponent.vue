<template>
	<div class="header">
		<div class="header__navbar">
			<div class="header__navbar--container">
				<router-link to="/">
					<img
					src="../assets/images/blog-logo.svg"
					alt="Logo"
					class="header__navbar--logo"
				/></router-link>
				<div v-if="isAuth">
					<div class="header__navbar--dropdown">
						<div class="header__navbar--dropdown-dropbtn">
							<img :src="logoIcon" alt="Dropdown" />
						</div>
						<div class="header__navbar--dropdown-content">
							<router-link to="/profile">Profile</router-link>
							<a href="#" @click.prevent="logOut"> Log Out</a>
						</div>
					</div>
				</div>
			<router-link v-else :to="{ name: 'LoginView' }" class="header__navbar--login-button">
				Log In
			</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { computed } from "vue";

const userStore = useUserStore();
const router = useRouter();

const logOut = () => {
	userStore.logout();
	router.push({ name: "HomeView" });
};

const logoIcon = computed(() => {
	return userStore.isAuth
		? "./icons/header-logged-icon.svg"
		: "./icons/header-unlogged-icon.svg";
});

const isAuth = computed(() => userStore.isAuth);
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
	text-decoration: none;

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

.header__navbar--dropdown-dropbtn {
	background-color: var(--header-color);
    cursor: pointer;
}

.header__navbar--dropdown {
	position: relative;
	display: inline-block;
}

.header__navbar--dropdown-content {
	display: none;
	position: absolute;
	background-color: #f9f9f9;
	min-width: 104px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	border-radius: 5px;
	right: 0;
}

.header__navbar--dropdown-content a {
	color: var(--text-color);
	padding: 12px 16px;
	text-decoration: none;
	display: block;
}

.header__navbar--dropdown-content a:hover {
	background-color: #f1f1f1;
}

.header__navbar--dropdown:hover .header__navbar--dropdown-content {
	display: block;
}

.header__navbar--dropdown:hover .header__navbar--dropdown-dropbtn {
	background-color: var(--header-color-hover);
}
</style>
