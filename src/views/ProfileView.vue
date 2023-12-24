<template>
	<div class="container">
	<div class="profile-form__wrapper">
		<div class="profile-form__content">
			<img
				class="profile-form__user-icon"
				src="../assets/images/user-icon.svg"
				alt="User photo"
			/>
			<input
				type="file"
				ref="file"
				class="profile-form__edit-icon"
				@click.prevent="handleFileUpload"
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
						@keyup="handleInput"
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
						v-model="form.email"
						@keyup="handleInput"
					/>
				</div>
				<div class="profile-form__user-details">
					<label class="profile-form__user-label" for="email">Profession</label>
					<input
						class="profile-form__user-input"
						type="text"
						v-model="usersData.profession"
						@keyup="handleInput"
					/>
				</div>

				<div class="profile-form__user-details">
					<label class="profile-form__user-label" for="email">Skills</label>
					<input
						class="profile-form__user-input"
						type="text"
						v-model="usersData.skills"
						@keyup="handleInput"
					/>
				</div>

				<div
					class="profile-form__buttons"
					:class="{ invisibleButtons: !hasChanges }"
				>
					<button type="button" class="profile-form__cancel-button">
						Cancel
					</button>
					<button type="button" class="profile-form__save-button">Save</button>
				</div>
			</form>
		</div>
	</div>
	</div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const usersData = computed(() => {
	return userStore.getUserData;
});

const hasChanges = ref(false);

const form = ref({
	email: "",
	nickname: "",
	profession: "",
	skills: "",
});

onMounted(async () => {
	const response = await userStore.getUserData;
	form.value = response;
	console.log(response);
});

const handleFileUpload = () => {};

// const handleInput = () => {
// 	if (usersData.email === "" && usersData.nickname === ""
// 		&& usersData.profession === "" && usersData.skills === "") {
// 		console.log(usersData.profession);
// 		hasChanges.value = false;
// 	} else {
// 		hasChanges.value = true;
// 	}

// }
</script>

<style>
.profile-form__edit-icon {
	padding-left: 28px;
	background-image: url("../assets/images/edit-icon.svg");
	background-repeat: no-repeat;
	background-position: 4px center; 
	background-size: 24px;
}

.invisibleButtons {
	/* visibility: hidden; */
}

.profile-form__wrapper {
	display: flex;
	justify-content: center;
	margin-top: 16px;
}

.profile-form__user-icon {
	width: 200px;
	height: 260px;
}

.profile-form__user-details {
	display: flex;
	flex-direction: column;
	align-items: start;
	margin-bottom: 16px;
}

.profile-form__user-fullName {
	display: flex;
	justify-content: space-between;
}

.profile-form__user-input-disabled {
	padding: 12px;
	border-radius: 12px;
	color: rgb(137, 137, 160);
	background-color: #91b9ce12;
}
.profile-form__user-input {
	padding: 12px;
	border-radius: 12px;
	background-color: #91b9ce12;
	border: 2px solid rgb(190, 184, 184);
	width: 100%;
}

.profile-form__user-label {
	font-size: 24px;
}

.profile-form__cancel-button {
	font-weight: bold;
	color: rgb(107, 142, 201);
	height: 48px;
	padding: 0 24px;
	border-radius: 24px;
	border: 2px solid rgb(107, 142, 201);
	background-color: transparent;
	box-sizing: border-box;
}

.profile-form__save-button {
	font-weight: bold;
	color: rgb(97, 169, 97);
	height: 48px;
	padding: 0 24px;
	border-radius: 24px;
	border: 2px solid rgb(97, 169, 97);
	background-color: transparent;
	box-sizing: border-box;
}

.profile-form__cancel-button:hover {
	cursor: pointer;
	color: var(--profile-cancel-button-color);
	border: 2px solid var(--profile-cancel-button-color);
}

.profile-form__save-button:hover {
	cursor: pointer;
	color: var(--profile-save-button-color);
	border: 2px solid var(--profile-save-button-color);
}

@media (max-width: 768px) {
	.profile-form__user-data {
	}
	.profile-form__user-fullName {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
	}
}
</style>
