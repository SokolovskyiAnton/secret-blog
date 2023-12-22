<template>
	<div class="profile-form__wrapper">
		<div class="profile-form__content">
			<img
				class="profile-form__user-icon"
				src="../assets/images/user-icon.svg"
				alt="User photo"
			/>

			<form class="profile-form__user-data">
				<div class="profile-form__user-details">
					<label class="profile-form__user-label" for="nickname"
						>Nickname</label
					>
					<input
						class="profile-form__user-input"
						type="text"
						v-model="usersData.nickname"
					/>
				</div>
				<div class="profile-form__user-fullName">
					<div class="profile-form__user-details">
						<label class="profile-form__user-label" for="fname"
							>First name</label
						>
						<input
							disabled="disabled"
							class="profile-form__user-input-disabled"
							type="text"
							v-model="usersData.firstName"
						/>
					</div>
					<div class="profile-form__user-details">
						<label class="profile-form__user-label" for="lname"
							>Last name</label
						>
						<input
							disabled="disabled"
							class="profile-form__user-input-disabled"
							type="text"
							v-model="usersData.lastName"
						/>
					</div>
				</div>
				<div class="profile-form__user-details">
					<label class="profile-form__user-label" for="email">Email</label>
					<input
						class="profile-form__user-input"
						type="text"
						v-model="usersData.email"
					/>
				</div>
				<div class="profile-form__user-details">
					<label class="profile-form__user-label" for="email">Profession</label>
					<input
						class="profile-form__user-input"
						type="text"
						v-model="usersData.profession"
					/>
				</div>

				<div class="profile-form__user-details">
					<label class="profile-form__user-label" for="email">Skills</label>
					<input
						class="profile-form__user-input"
						type="text"
						v-model="usersData.skills"
					/>
				</div>

				<div class="profile-form__buttons">
					<button type="button" class="profile-form__cancel-button">
						Cancel
					</button>
					<button type="button" class="profile-form__save-button">Save</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();



const usersData = computed(() => {
	return userStore.getUserData;
});
console.log(usersData);
</script>

<style>
.profile-form__wrapper {
	display: flex;
	justify-content: center;
	text-align: center;
	margin-top: 5%;
	/* border: 2px solid black; */
	margin: 5% 10%;
}

.profile-form__user-icon {
	width: 200px;
	height: 250px;
}

.profile-form__user-details {
	display: flex;
	flex-direction: column;
	align-items: start;
	margin-bottom: 20px;
}

.profile-form__user-fullName {
	display: flex;
	justify-content: space-around;
}

.profile-form__user-input-disabled {
	font-size: 18px;
	padding: 10px;
	border-radius: 10px;
	color: rgb(137, 137, 160);
	background-color: #91b9ce12;
}
.profile-form__user-input {
	font-size: 18px;
	padding: 10px;
	border-radius: 10px;
	background-color: #91b9ce12;
	border: 2px solid rgb(190, 184, 184);
	width: 100%;
}

.profile-form__user-label {
	font-size: 20px;
}

.profile-form__cancel-button {
	font-size: 18px;
	font-weight: bold;
	color: rgb(107, 142, 201);
	height: 44px;
	padding: 0 30px;
	border-radius: 20px;
	border: 2px solid rgb(107, 142, 201);
	background-color: transparent;
	box-sizing: border-box;
}

.profile-form__save-button {
	font-size: 18px;
	font-weight: bold;
	color: rgb(97, 169, 97);
	height: 44px;
	padding: 0 40px;
	border-radius: 20px;
	border: 2px solid rgb(97, 169, 97);
	background-color: transparent;
	box-sizing: border-box;
}

.profile-form__cancel-button:hover {
	cursor: pointer;
	color: blue;
	border: 2px solid blue;
}

.profile-form__save-button:hover {
	cursor: pointer;
	color: green;
	border: 2px solid green;
}

@media (max-width: 768px) {
	.profile-form__user-data {
		
	}
	.profile-form__user-fullName{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
	}
}
</style>
