<template>
	<div class="container">
		<div class="profile-form">
			<div class="profile-form__content">
				<div class="profile-form__content__avatar-box">
					<img
						class="profile-form__content__avatar-box__avatar-image"
						:src="prorfilePictureUrl ? prorfilePictureUrl : '../assets/images/default-user-icon.svg'"
						alt="User photo"
					/>
					<div class="profile-form__content__avatar-box__edit-image">
						<label
							class="profile-form__content__avatar-box__edit-image__icon"
							@click.prevent="openImageInput"
						>
						</label>
						<input
							class="profile-form__content__avatar-box__edit-image__input"
							ref="imageInput"
							type="file"
							@change="handleImageChange"
						/>
					</div>
				</div>
				<form class="profile-form__content__user-data">
					<div class="profile-form__content__user-data__user-details">
						<label
							class="profile-form__content__user-data__user-details__user-label"
							for="nickname"
							>Nickname</label
						>
						<input
							class="profile-form__content__user-data__user-details__user-input"
							type="text"
							v-model="usersData.nickname"
							@keyup="handleInput"
						/>
					</div>
					<div class="profile-form__content__user-data__user-fullName">
						<div
							class="profile-form__content__user-data__user-fullName__user-details"
						>
							<label
								class="profile-form__content__user-data__user-fullName__user-details__user-label"
								for="fname"
								>First name</label
							>
							<input
								disabled="disabled"
								class="profile-form__content__user-data__user-fullName__user-details__user-input-disabled"
								type="text"
								v-model="usersData.firstName"
							/>
						</div>
						<div class="profile-form__content__user-data__user-details">
							<label
								class="profile-form__content__user-data__user-details__user-label"
								for="lname"
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
					<div class="profile-form__content__user-data__user-details">
						<label
							class="profile-form__content__user-data__user-details__user-label"
							for="email"
							>Email</label
						>
						<input
							class="profile-form__content__user-data__user-details__user-input"
							type="text"
							v-model="form.email"
							@keyup="handleInput"
						/>
					</div>
					<div class="profile-form__content__user-data__user-details">
						<label
							class="profile-form__content__user-data__user-details__user-label"
							for="email"
							>Profession</label
						>
						<input
							class="profile-form__user-input"
							type="text"
							v-model="usersData.profession"
							@keyup="handleInput"
						/>
					</div>

					<div class="profile-form__content__user-data__user-details">
						<label
							class="profile-form__content__user-data__user-details__user-label"
							for="email"
							>Skills</label
						>
						<input
							class="profile-form__user-input"
							type="text"
							v-model="usersData.skills"
							@keyup="handleInput"
						/>
					</div>

					<div
						class="profile-form__content__user-data__buttons"
						:class="{ invisibleButtons: !hasChanges }"
					>
						<button
							type="button"
							class="profile-form__content__user-data__buttons__cancel-button"
						>
							Cancel
						</button>
						<button
							type="button"
							class="profile-form__content__user-data__buttons__save-button"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import api from "../api";


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
	avatar: "",
});

onMounted(async () => {
	const response = await userStore.getUserData;
	form.value = response;
	console.log(response);
});

const imageInput = ref(null);

const openImageInput = () => {
	imageInput.value.click();
};

const prorfilePictureUrl = ref(null);

const handleImageChange = async (event) => {
	const file = event.target.files[0];
	prorfilePictureUrl.value = URL.createObjectURL(file);

	const formData = new FormData();
	formData.append('profileImage', file);

	const response = await api.post('uploadImage', formData);
	



};
</script>

<style lang="scss">
%user-details-styles {
	display: flex;
	flex-direction: column;
	align-items: start;
	margin-bottom: 16px;

	label {
		font-size: 24px;
	}

	input {
		padding: 12px;
		border-radius: 12px;
		background-color: #91b9ce12;
		border: 2px solid rgb(190, 184, 184);
		width: 100%;
	}
}

.profile-form {
	display: flex;
	justify-content: center;
	margin-top: 16px;
	position: realtive;

	&__content {
		&__avatar-box {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			&__avatar-image {
				width: 200px;
				height: 200px;
				border-radius: 50%;
				object-fit: cover;
			}

			&__edit-image {
				position: absolute;
				right: 148px;
    			top: 168px;

				&__icon {
					padding-left: 28px;
					background-image: url("../assets/images/edit-icon.svg");
					background-repeat: no-repeat;
					background-position: 2px center;
					background-size: 28px;

					&:hover {
						cursor: pointer;
					}
				}
				&__input {
					display: none;
				}
			}
		}

		&__user-data {
			&__user-details {
				@extend %user-details-styles;
			}

			&__user-fullName {
				display: flex;
				justify-content: space-between;

				&__user-details {
					@extend %user-details-styles;

					&__user-input-disabled {
						padding: 12px;
						border-radius: 12px;
						color: rgb(137, 137, 160);
						background-color: #91b9ce12;
					}
				}
			}

			&__buttons {
				&__cancel-button {
					font-weight: bold;
					color: rgb(107, 142, 201);
					height: 48px;
					padding: 0 24px;
					border-radius: 24px;
					border: 2px solid rgb(107, 142, 201);
					background-color: transparent;
					box-sizing: border-box;

					&:hover {
						cursor: pointer;
						color: var(--profile-cancel-button-color);
						border: 2px solid var(--profile-cancel-button-color);
					}
				}
				&__save-button {
					font-weight: bold;
					color: rgb(97, 169, 97);
					height: 48px;
					padding: 0 24px;
					border-radius: 24px;
					border: 2px solid rgb(97, 169, 97);
					background-color: transparent;
					box-sizing: border-box;

					&:hover {
						cursor: pointer;
						color: var(--profile-save-button-color);
						border: 2px solid var(--profile-save-button-color);
					}
				}
			}
		}
	}
}

@media (max-width: 768px) {
	.profile-form__user-data {
	}
	.profile-form__content__user-data__user-fullName {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
	}
}
</style>
